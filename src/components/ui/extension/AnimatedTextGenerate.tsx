"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextGenerateProps {
    text: string
    className?: string
    textClassName?: string
    blurEffect?: boolean
    speed?: "slow" | "normal" | "fast"
    highlightWords?: string[]
    highlightClassName?: string
    triggerOnView?: boolean
}

const speedMap = {
    slow: 0.06,
    normal: 0.03,
    fast: 0.015,
}

export function AnimatedTextGenerate({
    text,
    className,
    textClassName,
    blurEffect = true,
    speed = "normal",
    highlightWords = [],
    highlightClassName = "text-primary font-bold",
    triggerOnView = true,
}: AnimatedTextGenerateProps) {
    const ref = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const shouldAnimate = triggerOnView ? isInView : true

    const words = text.split(" ")
    const delay = speedMap[speed]

    return (
        <div ref={ref} className={cn("flex flex-wrap", className)}>
            {words.map((word, index) => {
                const isHighlighted = highlightWords.some(
                    (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[.,!?;:]/g, "")
                )

                return (
                    <motion.span
                        key={index}
                        initial={{
                            opacity: 0,
                            y: 10,
                            filter: blurEffect ? "blur(10px)" : "blur(0px)",
                        }}
                        animate={
                            shouldAnimate
                                ? {
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }
                                : {}
                        }
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: index * delay,
                        }}
                        className={cn(
                            "mr-1",
                            textClassName,
                            isHighlighted && highlightClassName
                        )}
                    >
                        {word}
                    </motion.span>
                )
            })}
        </div>
    )
}
