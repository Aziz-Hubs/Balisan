"use client"

import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface LensProps {
    children: React.ReactNode
    className?: string
    zoomFactor?: number
    lensSize?: number
    lensColor?: string
    duration?: number
    isStatic?: boolean
    defaultPosition?: { x: number; y: number }
    ariaLabel?: string
}

export function Lens({
    children,
    className,
    zoomFactor = 1.5,
    lensSize = 150,
    lensColor = "rgba(255, 255, 255, 0.1)",
    duration = 0.2,
    isStatic = false,
    defaultPosition,
    ariaLabel = "Zoom lens"
}: LensProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = React.useState(false)

    const mouseX = useMotionValue(defaultPosition?.x ?? 0)
    const mouseY = useMotionValue(defaultPosition?.y ?? 0)

    const springConfig = { damping: 20, stiffness: 200 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || isStatic) return

        const rect = containerRef.current.getBoundingClientRect()
        const posX = e.clientX - rect.left
        const posY = e.clientY - rect.top

        mouseX.set(posX)
        mouseY.set(posY)
    }

    const handleMouseEnter = () => {
        if (!isStatic) setIsHovering(true)
    }

    const handleMouseLeave = () => {
        if (!isStatic) setIsHovering(false)
    }

    const showLens = isStatic || isHovering

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={ariaLabel}
        >
            {children}
            <AnimatePresence>
                {showLens && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration }}
                        className="pointer-events-none absolute rounded-full overflow-hidden border-2 border-white/30 shadow-2xl"
                        style={{
                            width: lensSize,
                            height: lensSize,
                            left: x,
                            top: y,
                            transform: "translate(-50%, -50%)",
                            backgroundColor: lensColor,
                        }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                transformOrigin: "center",
                                scale: zoomFactor,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: `translate(-50%, -50%)`,
                                }}
                            >
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
