import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationList } from "@/components/ui/extension/NotificationList";
import "@/app/globals.css";

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
        default: "Balisan Admin Portal",
        template: "%s | Balisan Admin",
    },
    description: "Internal operations portal for Balisan Liquor Store",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
                <SidebarProvider defaultOpen>
                    <div className="flex min-h-screen w-full">
                        <AdminSidebar />
                        <main className="flex-1 overflow-y-auto">
                            <div className="container mx-auto p-6">
                                {children}
                            </div>
                        </main>
                    </div>
                    <NotificationList />
                </SidebarProvider>
            </body>
        </html>
    );
}
