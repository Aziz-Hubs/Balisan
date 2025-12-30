
"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: React.ReactNode
    active?: boolean
}

export function Spotlight({ className, children, active, ...props }: SpotlightProps) {
    const radius = 120 // Radius of the spotlight
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            className={cn(
                "group relative border border-white/10 overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 transition-colors duration-500 hover:border-white/20",
                active && "border-amber-500/50 bg-amber-500/10",
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          ${radius}px circle at ${mouseX}px ${mouseY}px,
                          rgba(245, 158, 11, 0.15),
                          transparent 80%
                        )
                      `,
                }}
            />
            {children}
        </div>
    )
}
