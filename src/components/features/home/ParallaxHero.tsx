'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="/bottle.png"
                    alt="Premium Spirits"
                    className="h-[120%] w-full object-cover"
                />
            </motion.div>

            {/* Floating Elements / Decoration */}
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 right-20 w-64 h-64 border border-white/20 rounded-full flex items-center justify-center -z-0 pointer-events-none"
            >
                <div className="w-32 h-32 border border-white/10 rounded-full animate-pulse" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 md:px-6 relative z-20 text-center"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block text-primary font-medium tracking-[0.3em] uppercase mb-6"
                >
                    Est. 2024 • Premium Selection
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-8xl font-display text-white mb-8 leading-tight"
                >
                    The Art of <br /> <span className="italic text-primary">Distilled</span> Perfection
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl mb-12 font-light"
                >
                    Discover exceptional craft spirits, fine wines, and artisanal beverages.
                    Expertly curated for the sophisticated palate.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Button asChild size="lg" className="min-w-[200px] h-14 text-lg">
                        <Link href="/shop">Explore Collection</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="min-w-[200px] h-14 text-lg border-white/30 text-white hover:bg-white/10">
                        <Link href="/about">Our Philosophy</Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce" />
            </motion.div>
        </section>
    );
}
