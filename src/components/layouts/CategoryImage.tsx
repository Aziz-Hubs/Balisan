"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryImageProps {
    src: string
    alt: string
    category: string
    priority?: boolean
    className?: string
}

export function CategoryImage({
    src,
    alt,
    category,
    priority = false,
    className,
}: CategoryImageProps) {
    const [imageError, setImageError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Fallback image for missing category images
    const fallbackSrc = `/bottle.png`

    return (
        <div className={cn("relative overflow-hidden rounded bg-secondary/20", className)}>
            <Image
                src={imageError ? fallbackSrc : src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                className={cn(
                    "object-cover transition-all duration-300",
                    isLoading && "blur-sm scale-105",
                    !isLoading && "blur-0 scale-100 group-hover:scale-110"
                )}
                priority={priority}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                    setImageError(true)
                    setIsLoading(false)
                }}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary animate-pulse" />
            )}
        </div>
    )
}
