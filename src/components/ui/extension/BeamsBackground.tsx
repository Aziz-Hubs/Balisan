"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BeamsBackground = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "relative flex w-full flex-col items-center justify-center overflow-hidden bg-background p-4 md:p-10",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-white/5" />
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[100px]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
};
