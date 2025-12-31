"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextReveal } from "@/components/ui/extension/TextReveal"
import { Magnetic } from "@/components/ui/extension/Magnetic"
import { ShineBorder } from "@/components/ui/extension/ShineBorder"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

import { usePathname } from "next/navigation"

export function Footer() {
    const pathname = usePathname()

    if (pathname?.startsWith("/checkout") || pathname?.startsWith("/admin")) {
        return null
    }

    const navigationLinks = [
        {
            title: "Shop",
            links: [
                { name: "Whiskey", href: "/shop/whiskey" },
                { name: "Vodka", href: "/shop/vodka" },
                { name: "Wine", href: "/shop/wine" },
                { name: "Gin", href: "/shop/gin" },
                { name: "All Products", href: "/shop" },
            ]
        },
        {
            title: "Customer Care",
            links: [
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faq" },
                { name: "Shipping Policy", href: "/shipping" },
                { name: "Delivery Info", href: "/delivery" },
                { name: "Returns & Refunds", href: "/refund" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Journal", href: "/journal" },
                { name: "Recipes", href: "/recipes" },
            ]
        }
    ]

    return (
        <footer className="relative bg-background text-muted-foreground border-t border-border overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10">
                {/* Brand & Socials Section */}
                <div className="flex flex-col items-center md:items-start mb-12 md:mb-16">
                    <div className="overflow-hidden mb-4">
                        <TextReveal text="Balisan Spirits" className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight" />
                    </div>
                    <p className="text-base text-center md:text-left leading-relaxed max-w-lg mb-8 opacity-80">
                        Crafting journeys through the world's finest distilleries.
                        Premium spirits, curated with expertise, delivered with elegance.
                    </p>
                    <div className="flex gap-6">
                        {[
                            { icon: Facebook, label: "Facebook", href: "https://facebook.com/balisanspirits" },
                            { icon: Instagram, label: "Instagram", href: "https://instagram.com/balisanspirits" },
                            { icon: Twitter, label: "Twitter", href: "https://twitter.com/balisanspirits" }
                        ].map((social) => (
                            <Magnetic key={social.label} strength={0.3}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center p-3 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-border/50"
                                >
                                    <social.icon className="h-5 w-5" />
                                    <span className="sr-only">{social.label}</span>
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8 mb-16">
                    {/* Navigation - Mobile (Accordion) */}
                    <div className="md:hidden space-y-2">
                        <Accordion type="single" collapsible className="w-full">
                            {navigationLinks.map((section) => (
                                <AccordionItem key={section.title} value={section.title} className="border-border/50">
                                    <AccordionTrigger className="text-base font-medium py-4 hover:no-underline">
                                        {section.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pb-4">
                                            {section.links.map((link) => (
                                                <li key={link.name}>
                                                    <Link href={link.href} className="text-sm hover:text-primary transition-colors block py-1">
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Navigation - Desktop */}
                    {navigationLinks.map((section) => (
                        <div key={section.title} className="hidden md:block space-y-6">
                            <h4 className="font-semibold text-foreground tracking-wide uppercase text-xs">{section.title}</h4>
                            <ul className="space-y-4 text-sm">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-primary transition-colors inline-block relative group">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="lg:col-span-2 md:col-span-1">
                        <ShineBorder
                            className="p-8 rounded-2xl bg-secondary/30 border border-border/50"
                            shineColor={["#f59e0b", "#d97706", "#b45309"]}
                            duration={10}
                        >
                            <div className="relative z-10">
                                <h4 className="font-bold text-foreground text-xl mb-3">The Connoisseur's Club</h4>
                                <p className="text-sm mb-6 opacity-75 leading-relaxed">
                                    Join our mailing list for exclusive previews of rare batches and early access to limited collections.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        placeholder="your@email.com"
                                        type="email"
                                        className="h-12 bg-background/50 border-border/50 focus-visible:ring-amber-500/50"
                                    />
                                    <Magnetic strength={0.1}>
                                        <Button className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-black font-bold shrink-0 shadow-lg shadow-amber-500/10">
                                            Join Now
                                        </Button>
                                    </Magnetic>
                                </div>
                            </div>
                        </ShineBorder>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-sm uppercase tracking-widest font-medium">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p>&copy; {new Date().getFullYear()} Balisan. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-muted-foreground/60">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Encrypted & Secure Checkout</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="/privacy" className="hover:text-primary transition-all">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary transition-all">Terms</Link>
                        <Link href="/refund" className="hover:text-primary transition-all">Refunds</Link>
                    </div>
                </div>

                {/* Age Verification Notice */}
                <div className="mt-8 text-center">
                    <p className="text-[10px] text-muted-foreground/50 max-w-md mx-auto leading-loose uppercase tracking-[0.2em]">
                        Enjoy Responsibly. You must be 21+ to purchase.
                        Drinking distilled spirits, beer, coolers, wine and other alcoholic beverages may increase cancer risk, and, during pregnancy, can cause birth defects.
                    </p>
                </div>
            </div>
        </footer>
    )
}
