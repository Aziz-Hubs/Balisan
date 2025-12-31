"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    playSpeed?: number;
    className?: string;
    children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "#0c0a09",
            playSpeed = 1,
            className,
            children,
            ...props
        },
        ref,
    ) => {

        const containerRef = React.useRef<HTMLDivElement>(null);
        const sparkRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const animations = [
                ...(containerRef.current?.getAnimations() || []),
                ...(sparkRef.current?.getAnimations() || [])
            ];

            animations.forEach((anim) => {
                anim.playbackRate = playSpeed;
            });
        }, [playSpeed]);

        return (
            <button
                ref={ref}
                style={
                    {
                        "--spread": "90deg",
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    } as React.CSSProperties
                }
                className={cn(
                    "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
                    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
                    className,
                )}
                {...props}
            >
                {/* container for shimmer */}
                <div
                    className={cn(
                        "-z-30Blur absolute inset-0 overflow-visible [container-type:size]",
                    )}
                >
                    {/* spark container */}
                    <div
                        ref={containerRef}
                        className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]"
                    >
                        {/* spark */}
                        <div
                            ref={sparkRef}
                            className="absolute inset-[-100%] w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
                        />
                    </div>
                </div>

                {/* backdrop */}
                <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />

                {/* Content */}
                <div className="relative z-10 font-medium tracking-tight text-white dark:text-white">
                    {children}
                </div>

            </button>
        );
    },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
