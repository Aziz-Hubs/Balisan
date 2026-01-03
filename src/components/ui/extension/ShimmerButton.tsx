"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "2s",
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                style={
                    {
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    } as CSSProperties
                }
                className={cn(
                    "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 [background:var(--bg)] [border-radius:var(--radius)]",
                    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
                    className,
                )}
                ref={ref}
                {...props}
            >
                {/* container for shimmer */}
                <div
                    className={cn(
                        "absolute inset-0 overflow-hidden [container-type:size] pointer-events-none z-[-1]",
                    )}
                >
                    {/* spark container */}
                    <div className="absolute inset-0 h-full w-full [aspect-ratio:1] animate-[spin-around_var(--speed)_linear_infinite]">
                        {/* spark */}
                        <div className="absolute inset-[-100%] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread,90deg)*0.5)),transparent_0,var(--shimmer-color)_var(--spread,90deg),transparent_var(--spread,90deg))]" />
                    </div>
                </div>
                {children}

                {/* Highlight mask */}
                <div
                    className={cn(
                        "inset-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
                        // transition
                        "transform-gpu transition-all duration-300 ease-in-out",
                        // on hover
                        "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
                        // on click
                        "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
                    )}
                />

                {/* backdrop */}
                <div
                    className={cn(
                        "absolute inset-px z-[-1] rounded-2xl bg-inherit transition-all duration-300 ease-in-out",
                        "group-hover:bg-inherit/80",
                    )}
                />
            </button>
        );
    },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
