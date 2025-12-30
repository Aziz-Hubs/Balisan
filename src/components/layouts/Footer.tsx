"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextReveal } from "@/components/ui/extension/TextReveal"
import { Magnetic } from "@/components/ui/extension/Magnetic"
import { cn } from "@/lib/utils"

import { usePathname } from "next/navigation"

export function Footer() {
    const pathname = usePathname()

    if (pathname?.startsWith("/checkout") || pathname?.startsWith("/admin")) {
        return null
    }

    return (
        <footer className="relative bg-[#0a0a0a] text-muted-foreground border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="overflow-hidden">
                            <TextReveal text="Balisan Spirits" className="font-display text-2xl font-bold text-foreground" />
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Premium liquor store offering a curated selection of fine spirits, wines, and beers.
                            Experience the taste of luxury, delivered to your door.
                        </p>
                        <div className="flex gap-4">
                            <Magnetic>
                                <Link href="#" className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="#" className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <Link href="#" className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop/whiskey" className="hover:text-primary transition-colors">Whiskey</Link></li>
                            <li><Link href="/shop/vodka" className="hover:text-primary transition-colors">Vodka</Link></li>
                            <li><Link href="/shop/wine" className="hover:text-primary transition-colors">Wine</Link></li>
                            <li><Link href="/shop/gin" className="hover:text-primary transition-colors">Gin</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Customer Care</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/delivery" className="hover:text-primary transition-colors">Delivery Info</Link></li>
                            <li><Link href="/refund" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/journal" className="hover:text-primary transition-colors">Journal</Link></li>
                            <li><Link href="/recipes" className="hover:text-primary transition-colors">Recipes</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Stay Updated</h4>
                            <p className="text-sm">Subscribe to our newsletter for exclusive offers, new arrivals, and curated recommendations.</p>
                        </div>
                        <div className="flex gap-2 max-w-md lg:ml-auto">
                            <Input placeholder="Enter your email" type="email" className="bg-background/50 border-white/10 focus-visible:ring-amber-500/50" />
                            <Magnetic strength={0.2}>
                                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">Subscribe</Button>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Balisan Liquor Store. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
                    </div>
                </div>

                {/* Age Verification Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground/70">
                        You must be 21 years or older to purchase. Please drink responsibly.
                    </p>
                </div>
            </div>
        </footer>
    )
}
