"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WavyBackground } from "./WavyBackground";
import ShimmerButton from "./ShimmerButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

const HERO_STATES = {
    BASE: "BASE",
    BOTTLE: "BOTTLE",
    POUR: "POUR",
    TOAST: "TOAST",
};

// Simplified SVG Paths for morphing (Placeholders - will refine)
const PATHS = {
    // A elegant wavy horizontal base
    [HERO_STATES.BASE]: "M10,50 C25,40 35,60 50,50 S75,40 90,50",
    // Tall, elegant spirit bottle
    [HERO_STATES.BOTTLE]: "M48,15 L52,15 L52,30 L55,35 L58,45 L58,85 Q50,90 42,85 L42,45 L45,35 L48,30 Z",
    // Pouring action: curved flow into a glass
    [HERO_STATES.POUR]: "M45,20 Q60,20 65,40 L60,85 Q50,90 40,85 L35,40 Q40,20 45,20 Z M65,40 L70,45 L70,55 L65,50 Z",
    // Two highball glasses clinking
    [HERO_STATES.TOAST]: "M30,40 L45,40 L43,80 L32,80 Z M55,40 L70,40 L72,80 L57,80 Z M46,45 L54,45",
};

export function WarpingHero({ className }: { className?: string }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [heroState, setHeroState] = useState(HERO_STATES.BASE);
    const isLight = resolvedTheme === "light";

    useEffect(() => {
        setMounted(true);

        // Sequence Logic: 60s BASE -> 30s Sequence (10s each) -> Repeat
        const runSequence = () => {
            // Start sequence after 60s
            setTimeout(() => {
                setHeroState(HERO_STATES.BOTTLE);
                setTimeout(() => {
                    setHeroState(HERO_STATES.POUR);
                    setTimeout(() => {
                        setHeroState(HERO_STATES.TOAST);
                        setTimeout(() => {
                            setHeroState(HERO_STATES.BASE);
                            runSequence(); // Loop
                        }, 10000);
                    }, 10000);
                }, 10000);
            }, 60000);
        };

        runSequence();
    }, []);

    if (!mounted) return <div className="h-screen w-full bg-background" />;

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
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] text-amber-500/30">
                        <motion.path
                            d={PATHS[heroState]}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            initial={false}
                            animate={{ d: PATHS[heroState] }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center text-foreground p-4 relative z-10"
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
                        {/* Primary CTA: Amber shimmer on rich dark background */}
                        <Link href="/shop" className="w-full sm:w-auto">
                            <ShimmerButton
                                className="h-14 w-full px-8 shadow-2xl"
                                background={isLight ? "#27272a" : "#1c1917"}
                                shimmerColor="#F5A623"
                            >
                                <span className="flex items-center gap-2 text-base font-semibold text-amber-50">
                                    Explore Collections
                                </span>
                            </ShimmerButton>
                        </Link>
                        {/* Secondary CTA: Warm amber glass effect */}
                        <Button asChild variant="outline" size="lg" className={cn(
                            "h-14 w-full sm:w-auto px-8 rounded-full font-medium tracking-wide text-base backdrop-blur-md transition-all",
                            // Light mode: subtle amber border with cream background
                            "border-amber-400/50 bg-amber-50/80 text-amber-900 hover:bg-amber-100 hover:border-amber-500/70",
                            // Dark mode: warm amber-tinted glass effect
                            "dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-900/60 dark:hover:border-amber-400/60"
                        )}>
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
