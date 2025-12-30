'use client';

import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ShimmerButton from '@/components/ui/extension/ShimmerButton';

export function CTA() {
    return (
        <section className="py-32 relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center text-center">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Join the Inner Circle</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-12 text-lg font-light">
                    Unlock exclusive access to limited releases, member-only tastings, and expert curation.
                    Elevate your collection today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/signup">
                        <ShimmerButton className="shadow-2xl">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Become a Member
                            </span>
                        </ShimmerButton>
                    </Link>
                    {/* <MagneticButton>View Benefits</MagneticButton> */}
                </div>
            </div>
        </section>
    );
}

// Magnetic Button Implementation (simplified for speed)
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set((clientX - centerX) / 3);
        y.set((clientY - centerY) / 3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn("px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors", className)}
        >
            {children}
        </motion.button>
    );
}
