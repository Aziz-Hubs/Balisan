'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShimmerButton from '@/components/ui/extension/ShimmerButton';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/extension/wavy-background';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <WavyBackground className="max-w-4xl mx-auto pb-40">
                <div className="container px-4 relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground"
                        >
                            Curated Spirits, <span className="text-balisan-amber">Delivered</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-lg leading-8 text-muted-foreground"
                        >
                            Discover exceptional craft spirits, fine wines, and artisanal beverages.
                            Premium selection, expert curation, delivered straight to your door.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-10 flex items-center justify-center gap-x-6"
                        >
                            <Button asChild size="lg" className="bg-balisan-amber text-balisan-black hover:bg-balisan-amber/90 transition-colors border-0 font-bold">
                                <Link href="/shop">Shop Now</Link>
                            </Button>
                            <Button variant="ghost" asChild size="lg" className="text-foreground hover:text-balisan-amber hover:bg-foreground/10">
                                <Link href="/about">Our Story</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </WavyBackground>
        </section>
    );
}
