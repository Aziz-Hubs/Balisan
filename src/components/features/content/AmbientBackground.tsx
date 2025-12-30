"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AmbientBackgroundProps {
    videoUrl?: string
    posterUrl?: string
    overlayOpacity?: number
    className?: string
    children?: React.ReactNode
}

export function AmbientBackground({
    videoUrl,
    posterUrl,
    overlayOpacity = 0.4,
    className,
    children
}: AmbientBackgroundProps) {
    const videoRef = React.useRef<HTMLVideoElement>(null)

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75 // Slow down slightly for ambient feel
        }
    }, [])

    return (
        <div className={cn("relative w-full overflow-hidden isolate", className)}>
            {/* Background Video Layer */}
            <div className="absolute inset-0 -z-20">
                {videoUrl ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={posterUrl}
                        className="h-full w-full object-cover transition-opacity duration-1000"
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                ) : (
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${posterUrl})` }}
                    />
                )}
            </div>

            {/* Overlay Layer for Text Readability */}
            <div
                className="absolute inset-0 -z-10 bg-black transition-opacity duration-500"
                style={{ opacity: overlayOpacity }}
            />

            {/* Content Content content */}
            <div className="relative z-0 h-full w-full">
                {children}
            </div>
        </div>
    )
}
