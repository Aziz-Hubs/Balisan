"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function StrobingProgress() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isNavigating, setIsNavigating] = useState(false);
    const [isBackward, setIsBackward] = useState(false);
    const prevPathname = useRef(pathname);

    useEffect(() => {
        // Detect navigation direction (rough heuristic for backward)
        // In a real app, we might use window.history.state or similar
        // For now, we'll trigger the animation on any path/param change

        const handleStart = () => {
            setIsNavigating(true);
            // Simple logic: if the current pathname is "shorter" or strictly different in a way that suggests "back"
            // This is tricky in Next.js without a proper stack. 
            // We'll default to forward unless we can prove otherwise.
        };

        const handleComplete = () => {
            setTimeout(() => setIsNavigating(false), 300);
        };

        if (pathname !== prevPathname.current) {
            setIsNavigating(true);
            // Reset after a delay or based on suspense (handled by PageTransition usually)
            const timer = setTimeout(() => setIsNavigating(false), 800);

            prevPathname.current = pathname;
            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-1">
            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        initial={{ width: 0, x: isBackward ? "100%" : "0%" }}
                        animate={{
                            width: ["0%", "70%", "90%", "100%"],
                            x: isBackward ? "0%" : "0%"
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            width: { duration: 2, times: [0, 0.4, 0.8, 1], ease: "easeInOut" },
                            opacity: { duration: 0.3 }
                        }}
                        className={cn(
                            "h-full bg-amber-500 shadow-[0_0_10px_rgba(245,166,35,0.8)]",
                            isBackward && "right-0 left-auto"
                        )}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
