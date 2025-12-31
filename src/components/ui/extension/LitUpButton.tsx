"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const LitUpButton = ({
    className,
    children,
    onClick,
    href,
    as: Component = "button",
    ...props
}: {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    as?: any;
    [key: string]: any;
}) => {
    const gradientRef = useRef<HTMLSpanElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const element = gradientRef.current;
        if (!element) return;

        const animations = element.getAnimations();
        animations.forEach((anim) => {
            // Smoothly transition playback rate without resetting
            anim.playbackRate = isHovered ? 0.25 : 1;
        });
    }, [isHovered]);

    return (
        <Component
            onClick={onClick}
            href={href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-slate-50 transition-transform duration-200",
                className
            )}
            {...props}
        >
            <span
                ref={gradientRef}
                className={cn(
                    "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] transition-[filter] duration-500",
                    "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
                    "dark:bg-[conic-gradient(from_90deg_at_50%_50%,#F5A623_0%,#78350F_50%,#F5A623_100%)]",
                    isHovered && "brightness-150 saturate-125"
                )}
            />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0c0a09] px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-[#0c0a09]/80">
                {children}
            </span>
        </Component>
    );
};
