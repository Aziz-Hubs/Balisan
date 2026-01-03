"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const CursorHighlight = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        // Double check for mobile/touch environment to be safe
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isTouch || isMobile) return;

        const { left, top } = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - left);
        mouseY.set(event.clientY - top);
    }

    return (
        <div
            className={cn(
                "relative group flex items-center justify-center w-full h-full",
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className={cn("relative h-full", className)}>{children}</div>
        </div>
    );
};
