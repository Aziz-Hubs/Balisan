"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AnimatedThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <button
            className={cn(
                "relative flex h-9 w-16 cursor-pointer items-center rounded-full border border-border p-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isDark ? "bg-zinc-950" : "bg-zinc-100"
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full shadow-sm",
                    isDark ? "bg-zinc-800" : "bg-white"
                )}
                animate={{
                    x: isDark ? 28 : 0
                }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0,
                        rotate: isDark ? 0 : 180
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <Moon className="h-4 w-4 text-zinc-100" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        scale: !isDark ? 1 : 0,
                        opacity: !isDark ? 1 : 0,
                        rotate: !isDark ? 0 : -180
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                >
                    <Sun className="h-4 w-4 text-amber-500" />
                </motion.div>
            </motion.div>

            {/* Background Icons */}
            <div className="absolute left-2.5 z-0">
                <Sun className={cn("h-4 w-4 text-amber-500/50 transition-opacity", isDark ? "opacity-100" : "opacity-0")} />
            </div>
            <div className="absolute right-2.5 z-0">
                <Moon className={cn("h-4 w-4 text-zinc-400/50 transition-opacity", isDark ? "opacity-0" : "opacity-100")} />
            </div>
        </button>
    );
}
