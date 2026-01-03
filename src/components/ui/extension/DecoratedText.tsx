"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const DecoratedText = ({
    text,
    className,
    decorationColor = "text-amber-500",
}: {
    text: string;
    className?: string;
    decorationColor?: string;
}) => {
    return (
        <div className={cn("relative inline-block group", className)}>
            <span className="relative z-10">{text}</span>
            <div className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full",
                decorationColor
            )} />
            <div className={cn(
                "absolute -top-1 right-0 w-0 h-0.5 bg-current transition-all duration-300 delay-100 group-hover:w-full",
                decorationColor
            )} />
        </div>
    );
};
