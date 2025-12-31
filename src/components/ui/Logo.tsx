"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    height?: number
}

export function Logo({ className, height = 40 }: LogoProps) {
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
        <div className={cn("relative flex items-center", className)}>
            <Image
                src="/balisan.svg"
                alt="Balisan Logo"
                height={height}
                width={width}
                className="object-contain transition-all duration-300"
                priority
            />
        </div>
    )
}
