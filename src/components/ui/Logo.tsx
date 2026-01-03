"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    height?: number
    rainbow?: boolean
}

export function Logo({ className, height = 48, rainbow = false }: LogoProps) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const aspectRatio = 624 / 400
    const width = height * aspectRatio

    // Avoid hydration mismatch
    useEffect(() => {
        if (!mounted) setMounted(true)
    }, [mounted])

    if (!mounted) {
        return <div style={{ height, width }} className={cn("bg-transparent", className)} />
    }

    return (
        <div className={cn("relative flex flex-col items-center overflow-visible group", className)}>
            <div className="relative">
                <Image
                    src="/balisan.svg"
                    alt="Balisan Logo"
                    height={height}
                    width={width}
                    className="object-contain transition-all duration-300 scale-110 relative z-10"
                    priority
                />

                {rainbow && (
                    <>
                        {/* Subtle bottom rainbow glow effect */}
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition duration-500 animate-tilt pointer-events-none"
                        />
                    </>
                )}
            </div>
        </div>
    )
}
