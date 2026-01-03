"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedShinyTextProps {
    children: React.ReactNode
    className?: string
    shimmerWidth?: number
}

export function AnimatedShinyText({
    children,
    className,
    shimmerWidth = 100,
}: AnimatedShinyTextProps) {
    return (
        <span
            style={{
                "--shimmer-width": `${shimmerWidth}px`,
            } as React.CSSProperties}
            className={cn(
                "animate-shimmer-text inline-flex items-center justify-center bg-clip-text",
                "bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.8),55%,transparent)]",
                "bg-[length:200%_100%]",
                "[animation:shimmer-text_2s_linear_infinite]",
                className
            )}
        >
            {children}
            <style jsx>{`
                @keyframes shimmer-text {
                    0% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </span>
    )
}
