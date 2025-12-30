"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string;
    duration?: string;
    className?: string;
}

export const PulseButton = React.forwardRef<HTMLButtonElement, PulseButtonProps>(
    ({ className, pulseColor = "#F5A623", duration = "1.5s", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-center text-white font-medium transition-transform active:scale-95",
                    className
                )}
                style={
                    {
                        "--pulse-color": pulseColor,
                        "--duration": duration,
                    } as React.CSSProperties
                }
                {...props}
            >
                <div className="relative z-10">{children}</div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full bg-inherit animate-ping opacity-75 duration-[var(--duration)]" />
            </button>
        );
    }
);

PulseButton.displayName = "PulseButton";
