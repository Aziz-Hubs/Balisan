import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { NotificationList } from "@/components/ui/extension/NotificationList";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { PromotionalBanner } from "@/components/layouts/PromotionalBanner";
import { promotionalMessages } from "@/config/navigation";
import { AgeGateModal } from "@/components/features/age-gate/AgeGateModal";
import { SkipNavLink } from "@/components/layouts/SkipNavLink";
import { DesktopSpotlight } from "@/components/ui/desktop-spotlight";
import { ComparisonBar } from "@/components/features/products/ComparisonBar";
import { ComparisonOverlay } from "@/components/features/products/ComparisonOverlay";
import { PageTransition } from "@/components/layouts/PageTransition";
import { GlobalShortcuts } from "@/components/features/power-user/GlobalShortcuts";
import { LinkPrefetcher } from "@/components/features/power-user/LinkPrefetcher";
import { WorkspaceDock } from "@/components/features/power-user/WorkspaceDock";
import { StrobingProgress } from "@/components/layouts/StrobingProgress";
import React from "react";
import ReactDOM from "react-dom";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Balisan | Curated Spirits, Delivered",
    template: "%s | Balisan",
  },
  description: "Discover exceptional craft spirits, fine wines, and artisanal beverages. Premium selection, expert curation, delivered to your door.",
  keywords: ["liquor store", "craft spirits", "wine delivery", "whiskey", "gin"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://balisan.com",
    siteName: "Balisan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  metadataBase: new URL("https://balisan.com"),
  twitter: {
    card: "summary_large_image",
    creator: "@balisan",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Accessibility auditing in development
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    import("@axe-core/react").then((axe) => {
      axe.default(React, ReactDOM, 1000);
    });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GA4 Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Facebook Pixel Script */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalShortcuts />
          <LinkPrefetcher />
          <SkipNavLink />
          <React.Suspense fallback={null}>
            <StrobingProgress />
          </React.Suspense>
          <div className="relative flex min-h-screen flex-col">
            <PromotionalBanner messages={promotionalMessages} />
            <Header />
            <main id="main-content" className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
          <ComparisonBar />
          <ComparisonOverlay />
          <WorkspaceDock />
          <DesktopSpotlight />
          <AgeGateModal />
          <NotificationList />
        </ThemeProvider>
      </body>
    </html>
  );
}
