"use client"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextReveal } from "@/components/ui/extension/TextReveal"
import { Magnetic } from "@/components/ui/extension/Magnetic"
import { ShineBorder } from "@/components/ui/extension/ShineBorder"
import ShimmerButton from "@/components/ui/extension/ShimmerButton"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Hyperlink } from "@/components/ui/hyperlink"
import confetti from "canvas-confetti"
import { toast } from "sonner"


import { usePathname } from "next/navigation"

export function Footer() {
    const pathname = usePathname()
    const [email, setEmail] = useState("")

    // Email validation regex
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleJoinNow = () => {
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address")
            return
        }

        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.9 },
            colors: ['#f59e0b', '#d97706', '#b45309', '#fbbf24']
        })

        toast.success("Welcome to the Connoisseur's Club! 🥂")
        setEmail("")
    }

    if (pathname?.startsWith("/checkout") || pathname?.startsWith("/admin")) {
        return null
    }

    const navigationLinks = [
        {
            title: "Shop",
            links: [
                { name: "All Products", href: "/shop" },
                { name: "Collections", href: "/collections" },
                { name: "Whiskey", href: "/shop/whiskey" },
                { name: "Vodka", href: "/shop/vodka" },
                { name: "Wine", href: "/shop/wine" },
                { name: "Gin", href: "/shop/gin" },
            ]
        },
        {
            title: "Discover",
            links: [
                { name: "Our Story", href: "/story" },
                { name: "Journal", href: "/journal" },
                { name: "Recipes", href: "/recipes" },
                { name: "Education", href: "/education" },
                { name: "Events", href: "/events" },
            ]
        },
        {
            title: "Customer Care",
            links: [
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faq" },
                { name: "Delivery Info", href: "/delivery" },
                { name: "Shipping Policy", href: "/shipping" },
                { name: "Returns & Refunds", href: "/refund" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Concierge", href: "/concierge" },
                { name: "Careers", href: "/careers" },
            ]
        }
    ]

    return (
        <footer className="relative bg-background text-muted-foreground border-t border-border overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10">
                {/* Brand & Socials Section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full mb-12">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                            <div className="overflow-hidden">
                                <TextReveal text="Balisan Spirits" className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight" />
                            </div>

                        </div>
                        <p className="text-base leading-relaxed max-w-lg mb-8 md:mb-0 opacity-80">
                            Crafting journeys through the world's finest distilleries.
                            Premium spirits, curated with expertise, delivered with elegance.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 items-stretch">
                    {/* Navigation Section */}
                    <div className="lg:flex-[1.6] space-y-12 md:space-y-0">
                        {/* Navigation - Mobile (Accordion) */}
                        <div className="md:hidden space-y-2">
                            <Accordion type="single" collapsible className="w-full">
                                {navigationLinks.map((section) => (
                                    <AccordionItem key={section.title} value={section.title} className="border-border/50">
                                        <AccordionTrigger className="text-base font-medium py-4 hover:no-underline text-amber-500">
                                            {section.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-3 pb-4">
                                                {section.links.map((link) => (
                                                    <li key={link.name}>
                                                        <Hyperlink href={link.href} className="text-sm py-1">
                                                            {link.name}
                                                        </Hyperlink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Navigation - Desktop (Condensed Grid) */}
                        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
                            {navigationLinks.map((section) => (
                                <div key={section.title} className="space-y-4">
                                    <h4 className="font-semibold text-amber-500 tracking-wide uppercase text-xs">{section.title}</h4>
                                    <ul className="space-y-2 text-sm">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <Hyperlink href={link.href}>
                                                    {link.name}
                                                </Hyperlink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="relative lg:col-span-2 md:col-span-1 flex flex-col h-full">
                        <div className="flex gap-4 justify-center mb-6 md:absolute md:-top-16 md:left-0 md:w-full md:mb-0 z-20">
                            {[
                                { icon: Facebook, label: "Facebook", href: "https://facebook.com/balisanspirits" },
                                { icon: Instagram, label: "Instagram", href: "https://instagram.com/balisanspirits" },
                                { icon: Twitter, label: "Twitter", href: "https://twitter.com/balisanspirits" }
                            ].map((social) => (
                                <Magnetic key={social.label} strength={0.2}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center p-2.5 rounded-full bg-secondary/50 border border-border/50 hover:bg-amber-500/10 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 group shadow-sm"
                                    >
                                        <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                        <span className="sr-only">{social.label}</span>
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                        <ShineBorder
                            className="p-8 rounded-2xl bg-secondary/30 border border-border/50 h-full flex flex-col justify-between"
                            shineColor={["#f59e0b", "#d97706", "#b45309"]}
                            duration={10}
                        >
                            <div className="relative z-10 w-full">
                                <h4 className="font-bold text-foreground text-xl mb-3">The Connoisseur's Club</h4>
                                <p className="text-sm mb-6 opacity-75 leading-relaxed">
                                    Join our mailing list for exclusive previews of rare batches and early access.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        placeholder="your@email.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleJoinNow()}
                                        className="h-12 bg-background/50 border-border/50 focus-visible:ring-amber-500/50"
                                    />
                                    <Magnetic strength={0.1} className="w-full sm:w-auto">
                                        <ShimmerButton
                                            onClick={handleJoinNow}
                                            className="w-full sm:w-auto h-12 px-8 font-bold shrink-0"
                                            shimmerColor="#f59e0b"
                                            shimmerSize="0.1em"
                                            background="rgba(245, 158, 11, 1)"
                                        >
                                            <span className="text-white dark:text-black font-bold">Join Now</span>
                                        </ShimmerButton>
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
                        <Hyperlink href="/privacy">Privacy</Hyperlink>
                        <Hyperlink href="/terms">Terms</Hyperlink>
                        <Hyperlink href="/refund">Refunds</Hyperlink>
                    </div>
                </div>

                {/* Age Verification Notice */}
                <div className="mt-8 text-center">
                    <p className="text-[10px] text-muted-foreground/50 max-w-md mx-auto leading-loose uppercase tracking-[0.2em]">
                        Enjoy Responsibly. You must be 18+ to purchase.
                        Excessive alcohol consumption is harmful to your health. Please drink responsibly.
                    </p>
                </div>
            </div>
        </footer>
    )
}
