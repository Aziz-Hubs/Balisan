
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: delay + i * 0.03,
                duration: 0.5,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
            },
        }),
    }

    return (
        <span ref={ref} className={cn("inline-block", className)}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={variants}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    )
}
