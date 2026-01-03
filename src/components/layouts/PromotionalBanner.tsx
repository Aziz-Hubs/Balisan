"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useNavigationStore } from "@/lib/stores/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PromotionalMessage {
    id: string
    text: string
    link?: string
    expiresAt?: Date
}

interface PromotionalBannerProps {
    messages: PromotionalMessage[]
    dismissible?: boolean
    autoRotate?: boolean
    rotationInterval?: number
}

export function PromotionalBanner({
    messages,
    dismissible = true,
    autoRotate = true,
    rotationInterval = 5000,
}: PromotionalBannerProps) {
    const { dismissedBanners, dismissBanner } = useNavigationStore()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (!mounted) setMounted(true)
    }, [mounted])

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (prefersReducedMotion !== mediaQuery.matches) {
            setPrefersReducedMotion(mediaQuery.matches)
        }

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Filter out dismissed and expired banners
    const activeMessages = messages.filter((msg) => {
        if (dismissedBanners.includes(msg.id)) return false
        if (msg.expiresAt && new Date() > msg.expiresAt) return false
        return true
    })

    // Auto-rotate messages
    useEffect(() => {
        if (!autoRotate || activeMessages.length <= 1 || prefersReducedMotion) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeMessages.length)
        }, rotationInterval)

        return () => clearInterval(interval)
    }, [autoRotate, activeMessages.length, rotationInterval, prefersReducedMotion])

    if (!mounted || activeMessages.length === 0) return null

    const currentMessage = activeMessages[currentIndex]

    const handleDismiss = () => {
        if (currentMessage) {
            // Reset index to 0 or prev safe index to prevent crash on re-render if count decreases
            setCurrentIndex(0)
            dismissBanner(currentMessage.id)
        }
    }

    const bannerContent = (
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
            {currentMessage && <span>{currentMessage.text}</span>}
            {activeMessages.length > 1 && (
                <div className="flex gap-1 ml-2">
                    {activeMessages.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentIndex(index)
                            }}
                            className={cn(
                                "h-1.5 w-1.5 rounded-full transition-all",
                                index === currentIndex
                                    ? "bg-balisan-amber w-3"
                                    : "bg-foreground/30 hover:bg-foreground/50"
                            )}
                            aria-label={`Go to message ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <div className="relative z-[60] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-2 px-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1" />

                    {currentMessage.link ? (
                        <Link href={currentMessage.link} className="hover:text-amber-500 transition-colors">
                            {bannerContent}
                        </Link>
                    ) : (
                        bannerContent
                    )}

                    <div className="flex-1 flex justify-end">
                        {dismissible && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDismiss}
                                className="h-6 w-6 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 hover:bg-transparent"
                                aria-label="Dismiss banner"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
