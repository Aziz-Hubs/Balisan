"use client";

import { cn } from "@/lib/utils";

interface ElectricTextProps {
    children: React.ReactNode;
    className?: string;
}

export const ElectricText = ({ children, className }: ElectricTextProps) => {
    return (
        <span className={cn("relative inline-block font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 animate-pulse", className)}>
            {children}
            <span className="absolute inset-0 block opacity-50 blur-lg bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent animate-pulse delay-75 select-none pointer-events-none">
                {children}
            </span>
        </span>
    );
};
