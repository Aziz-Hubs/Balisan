"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
    children: React.ReactNode
    className?: string
    speed?: number
    colorFrom?: string
    colorVia?: string
    colorTo?: string
}

export function AnimatedGradientText({
    children,
    className,
    speed = 3,
    colorFrom = "#ffaa40",
    colorVia = "#9c40ff",
    colorTo = "#ffaa40",
}: AnimatedGradientTextProps) {
    return (
        <span
            style={{
                "--speed": `${speed}s`,
                "--color-from": colorFrom,
                "--color-via": colorVia,
                "--color-to": colorTo,
            } as React.CSSProperties}
            className={cn(
                "inline-flex items-center justify-center bg-clip-text text-transparent",
                "bg-[linear-gradient(90deg,var(--color-from),var(--color-via),var(--color-to),var(--color-via),var(--color-from))]",
                "bg-[length:200%_auto]",
                "[animation:gradient-text_var(--speed)_linear_infinite]",
                className
            )}
        >
            {children}
            <style jsx>{`
                @keyframes gradient-text {
                    0% {
                        background-position: 0% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </span>
    )
}
