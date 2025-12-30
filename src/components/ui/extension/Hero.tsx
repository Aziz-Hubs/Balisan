'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WavyBackground } from './WavyBackground';
import ShimmerButton from './ShimmerButton';

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    return (
        <div className={cn("relative h-screen w-full overflow-hidden", className)}>
            <WavyBackground className="max-w-4xl mx-auto pb-40" colors={["#F5A623", "#B45309", "#FFFFFF", "#1A1A1A", "#333333"]}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center text-white p-4"
                >
                    <div className="mb-6 flex flex-col items-center gap-2">
                        <div className="h-[1px] w-12 bg-amber-500/50" />
                        <span className="text-amber-400 font-medium tracking-[0.3em] text-xs uppercase">
                            Est. 2024
                        </span>
                        <div className="h-[1px] w-12 bg-amber-500/50" />
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif tracking-tighter font-medium bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-2xl">
                        Balisan
                    </h1>

                    <p className="max-w-xl text-lg md:text-xl text-white/80 font-light tracking-wide mb-10 leading-relaxed">
                        Curated spirits for the <span className="text-amber-300 font-normal italic">distinguished palate</span>.
                        Experience the art of fine drinking delivered to your door.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/shop">
                            <ShimmerButton className="h-14 px-8 shadow-xl">
                                <span className="flex items-center gap-2 text-base">
                                    Explore Collection
                                </span>
                            </ShimmerButton>
                        </Link>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white font-medium tracking-wide text-base backdrop-blur-sm transition-all hover:border-white/40">
                            <Link href="/about">
                                Our Story
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </WavyBackground>
        </div>
    );
}
