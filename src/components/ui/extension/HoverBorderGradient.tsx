"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HoverBorderGradient = ({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    ...props
}: React.PropsWithChildren<
    {
        as?: React.ElementType;
        containerClassName?: string;
        className?: string;
        duration?: number;
        clockwise?: boolean;
    } & React.HTMLAttributes<HTMLElement>
>) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<string>("TOP");

    const rotateDirection = (currentDirection: string) => {
        const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
    };

    const movingMap: Record<string, string> = {
        TOP: "radial-gradient(20% 50% at 50% 0%, #F5A623 0%, rgba(255, 255, 255, 0) 100%)",
        LEFT: "radial-gradient(50% 20% at 0% 50%, #F5A623 0%, rgba(255, 255, 255, 0) 100%)",
        BOTTOM: "radial-gradient(20% 50% at 50% 100%, #78350F 0%, rgba(255, 255, 255, 0) 100%)",
        RIGHT: "radial-gradient(50% 20% at 100% 50%, #78350F 0%, rgba(255, 255, 255, 0) 100%)",
    };

    const highlight = "radial-gradient(50% 50% at 50% 50%, #F5A623 0%, rgba(255, 255, 255, 0) 100%)";

    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [hovered]);

    return (
        <Tag
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/20 decoration-clone p-px transition duration-500 hover:bg-black/10 dark:bg-white/10",
                containerClassName
            )}
            {...props}
        >
            <div
                className={cn(
                    "z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white",
                    className
                )}
            >
                {children}
            </div>
            <motion.div
                className={cn(
                    "absolute inset-0 z-0 h-full w-full flex-none overflow-hidden rounded-[inherit]"
                )}
                style={{
                    filter: "blur(2px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ background: movingMap[direction] }}
                animate={{
                    background: hovered
                        ? [movingMap[direction], highlight]
                        : movingMap[direction],
                }}
                transition={{ ease: "linear", duration: duration ?? 1 }}
            />
            <div className="bg-black absolute inset-[2px] flex-none rounded-[inherit]" />
        </Tag>
    );
};
