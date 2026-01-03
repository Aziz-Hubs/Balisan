"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NoiseBackgroundProps {
    children?: React.ReactNode
    className?: string
    containerClassName?: string
    gradientColors?: string[]
    noiseIntensity?: number
    speed?: number
    backdropBlur?: boolean
    animating?: boolean
}

export function NoiseBackground({
    children,
    className,
    containerClassName,
    gradientColors = ["rgb(217, 119, 6)", "rgb(180, 83, 9)", "rgb(146, 64, 14)"],
    noiseIntensity = 0.15,
    speed = 4,
    backdropBlur = true,
    animating = true,
}: NoiseBackgroundProps) {
    const gradientStyle = React.useMemo(() => {
        const colors = gradientColors.join(", ")
        return {
            background: `linear-gradient(-45deg, ${colors})`,
            backgroundSize: "400% 400%",
        }
    }, [gradientColors])

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            {/* Animated Gradient Layer */}
            <motion.div
                className="absolute inset-0"
                style={gradientStyle}
                animate={
                    animating
                        ? {
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                        : undefined
                }
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: noiseIntensity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Backdrop Blur Layer */}
            {backdropBlur && (
                <div className="absolute inset-0 backdrop-blur-[1px]" />
            )}

            {/* Content */}
            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    )
}
