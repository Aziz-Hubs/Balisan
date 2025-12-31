'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WavyBackground } from './WavyBackground';
import ShimmerButton from './ShimmerButton';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return <div className="h-screen w-full bg-background" />;

    const isLight = resolvedTheme === 'light';

    return (
        <div className={cn("relative h-screen w-full overflow-hidden bg-background", className)}>
            <WavyBackground
                className="max-w-4xl mx-auto pb-40"
                colors={isLight
                    ? ["#F5A623", "#fca5a5", "#fbbf24", "#e5e5e5", "#ffffff"]
                    : ["#F5A623", "#B45309", "#FFFFFF", "#1A1A1A", "#333333"]
                }
                backgroundFill={isLight ? "white" : "#0c0a09"}
                waveOpacity={isLight ? 0.3 : 0.5}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center text-foreground p-4"
                >
                    <div className="mb-6 flex flex-col items-center gap-2">
                        <div className="h-[1px] w-12 bg-amber-500/50" />
                        <span className="text-amber-500/80 font-medium tracking-[0.3em] text-xs uppercase">
                            Est. 2024
                        </span>
                        <div className="h-[1px] w-12 bg-amber-500/50" />
                    </div>

                    <h1 className={cn(
                        "text-3xl md:text-5xl lg:text-7xl font-serif tracking-tighter font-medium bg-clip-text text-transparent mb-6 drop-shadow-2xl",
                        isLight ? "bg-gradient-to-b from-zinc-900 to-zinc-600" : "bg-gradient-to-b from-white to-white/60"
                    )}>
                        Balisan
                    </h1>

                    <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-light tracking-wide mb-10 leading-relaxed">
                        Curated spirits for the <span className="text-amber-500 font-normal italic">distinguished palate</span>.
                        Experience the art of fine drinking delivered to your door.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/shop">
                            <ShimmerButton
                                className="h-14 px-8 shadow-xl"
                                background={isLight ? "#18181b" : "#0c0a09"}
                                shimmerColor={isLight ? "#ffffff" : undefined}
                            >
                                <span className="flex items-center gap-2 text-base text-white">
                                    Explore Collection
                                </span>
                            </ShimmerButton>
                        </Link>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-border hover:bg-muted font-medium tracking-wide text-base backdrop-blur-sm transition-all text-foreground">
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
