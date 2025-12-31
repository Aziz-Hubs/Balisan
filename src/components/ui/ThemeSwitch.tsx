"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) setMounted(true);
    }, [mounted]);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <div
            role="switch"
            aria-checked={isDark}
            tabIndex={0}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    setTheme(isDark ? "light" : "dark");
                }
            }}
            className={cn(
                "relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isDark ? "bg-zinc-800" : "bg-zinc-200"
            )}
        >
            <span className="sr-only">Toggle theme</span>
            <span
                className={cn(
                    "pointer-events-none block h-7 w-7 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center",
                    isDark ? "translate-x-7" : "translate-x-0"
                )}
            >
                {isDark ? (
                    <Moon className="h-4 w-4 text-foreground" />
                ) : (
                    <Sun className="h-4 w-4 text-amber-500" />
                )}
            </span>
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                <Sun className={cn("h-4 w-4 text-amber-500 transition-opacity duration-200", isDark ? "opacity-0" : "opacity-0")} />
                <Moon className={cn("h-4 w-4 text-zinc-400 transition-opacity duration-200", isDark ? "opacity-0" : "opacity-0")} />
            </div>
            {/* Background Icons for visual feedback when switch is not covering them */}
            <div className={cn("absolute left-1.5 top-2.5 transition-opacity duration-200", isDark ? "opacity-100" : "opacity-0")}>
                <Sun className="h-4 w-4 text-zinc-500" />
            </div>
            <div className={cn("absolute right-1.5 top-2.5 transition-opacity duration-200", isDark ? "opacity-0" : "opacity-100")}>
                <Moon className="h-4 w-4 text-zinc-400" />
            </div>
        </div>
    );
}
