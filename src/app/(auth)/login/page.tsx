"use client"

import { Suspense } from "react"
import { useTheme } from "next-themes"
import { PremiumLoginForm } from "@/components/ui/extension/AuthForms"
import { WavyBackground } from "@/components/ui/extension/WavyBackground"

export default function LoginPage() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
            {/* WavyBackground with theme-aware colors */}
            <div className="absolute inset-0 z-0">
                <WavyBackground
                    className="max-w-4xl mx-auto"
                    containerClassName="h-screen flex items-center justify-center"
                    colors={isDark
                        ? ["#F5A623", "#B45309", "#FFFFFF", "#1A1A1A", "#333333"]
                        : ["#F5A623", "#fca5a5", "#fbbf24", "#e5e5e5", "#ffffff"]}
                    waveOpacity={isDark ? 0.5 : 0.3}
                    backgroundFill={isDark ? "black" : "white"}
                />
            </div>

            <div className="relative z-10 w-full flex items-center justify-center px-4">
                <Suspense fallback={<div className="text-foreground">Loading...</div>}>
                    <PremiumLoginForm />
                </Suspense>
            </div>
        </div>
    )
}

