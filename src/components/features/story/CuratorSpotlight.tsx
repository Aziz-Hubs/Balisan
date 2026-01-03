"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CuratorSpotlight() {
    return (
        <section className="py-32 overflow-hidden border-t">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:order-1 order-2"
                    >
                        <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">The Curator</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1]">
                            "We don't just sell bottles. We tell stories."
                        </h2>
                        <div className="space-y-6 text-xl text-muted-foreground font-serif leading-relaxed">
                            <p>
                                When I founded Balisan, I wanted to create more than just a marketplace.
                                I wanted to build a sanctuary for those who appreciate the finer things in life.
                            </p>
                            <p>
                                Every bottle in our collection has a history, a maker, and a soul.
                                Our mission is to connect you with these stories, one pour at a time.
                            </p>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                            <div className="flex flex-col gap-1">
                                <span className="font-display text-2xl">Elena Balisan</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Founder & Master Sommelier</span>
                            </div>
                            <img
                                src="/signature.png"
                                alt="Signature"
                                className="h-16 opacity-50 contrast-0 grayscale" // Placeholder styling
                                onError={(e) => e.currentTarget.style.display = 'none'} // Hide if missing
                            />
                        </div>

                        <div className="pt-8">
                            <Button size="lg" className="rounded-full px-8 h-14 text-lg" asChild>
                                <Link href="/shop">
                                    Start Your Collection <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <div className="lg:order-2 order-1 relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative aspect-[3/4] rounded-sm overflow-hidden bg-muted"
                        >
                            <img
                                src="/bottle.png" // Placeholder
                                alt="Founder"
                                className="w-full h-full object-contain p-12 grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Inner border frame effect */}
                            <div className="absolute inset-4 border border-white/20" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
