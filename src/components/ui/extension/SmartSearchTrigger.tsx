"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Sparkles } from "lucide-react";

export function SmartSearchTrigger({
    placeholders,
    onChange,
    onSubmit,
    onClick,
    className,
}: {
    placeholders: string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onClick?: () => void;
    className?: string;
}) {
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startAnimation = () => {
        intervalRef.current = setInterval(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        }, 3000);
    };
    const handleVisibilityChange = () => {
        if (document.visibilityState !== "visible" && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else if (document.visibilityState === "visible") {
            startAnimation();
        }
    };

    useEffect(() => {
        startAnimation();
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [placeholders]);

    return (
        <div
            className={cn(
                "w-full relative mx-auto transition-colors rounded-full h-12 overflow-hidden group cursor-text",
                className
            )}
            onClick={onClick}
        >
            {/* Animated Border/Glow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent group-hover:via-amber-500/20 group-hover:animate-shimmer z-0" />

            <div className="absolute inset-0 flex items-center px-4 z-10">
                <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                <div className="relative w-full h-full flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            initial={{
                                y: 5,
                                opacity: 0,
                            }}
                            key={`current-placeholder-${currentPlaceholder}`}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: -5,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "linear",
                            }}
                            className="text-sm text-muted-foreground font-normal truncate"
                        >
                            {placeholders[currentPlaceholder]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Command Hint */}
                <div className="hidden sm:flex items-center gap-1 opacity-50">
                    <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>
        </div >
    );
}
