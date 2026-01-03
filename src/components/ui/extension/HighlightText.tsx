"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface HighlightTextProps {
    children: React.ReactNode
    className?: string
    highlightColor?: string
    highlightOpacity?: number
    animationDuration?: number
    type?: "wavy" | "zigzag" | "straight"
    triggerOnView?: boolean
}

export function HighlightText({
    children,
    className,
    highlightColor = "rgb(251 191 36)", // amber-400
    highlightOpacity = 0.3,
    animationDuration = 0.5,
    type = "straight",
    triggerOnView = true,
}: HighlightTextProps) {
    const ref = React.useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const shouldAnimate = triggerOnView ? isInView : true

    const getUnderlineStyle = () => {
        switch (type) {
            case "wavy":
                return "bg-[linear-gradient(to_right,transparent_0%,var(--highlight-color)_10%,var(--highlight-color)_90%,transparent_100%)] bg-[length:8px_3px]"
            case "zigzag":
                return "bg-[linear-gradient(135deg,var(--highlight-color)_25%,transparent_25%,transparent_50%,var(--highlight-color)_50%,var(--highlight-color)_75%,transparent_75%)] bg-[length:8px_8px]"
            default:
                return ""
        }
    }

    return (
        <span
            ref={ref}
            className={cn("relative inline-block", className)}
            style={
                {
                    "--highlight-color": highlightColor,
                    "--highlight-opacity": highlightOpacity,
                } as React.CSSProperties
            }
        >
            <span className="relative z-10">{children}</span>
            <motion.span
                className={cn(
                    "absolute inset-0 -z-10 rounded",
                    type !== "straight" && getUnderlineStyle()
                )}
                initial={{ scaleX: 0 }}
                animate={shouldAnimate ? { scaleX: 1 } : {}}
                transition={{ duration: animationDuration, ease: "easeOut" }}
                style={{
                    backgroundColor:
                        type === "straight"
                            ? `color-mix(in srgb, ${highlightColor} ${highlightOpacity * 100}%, transparent)`
                            : undefined,
                    transformOrigin: "left",
                }}
            />
        </span>
    )
}
