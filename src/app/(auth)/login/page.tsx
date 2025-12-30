"use client"

import { Suspense } from "react"
import { PremiumLoginForm } from "@/components/ui/extension/AuthForms"
import { WavyBackground } from "@/components/ui/extension/WavyBackground"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Reuse WavyBackground for a consistent theme, or just a dark background */}
            <div className="absolute inset-0 z-0">
                <WavyBackground className="max-w-4xl mx-auto" containerClassName="h-screen flex items-center justify-center" colors={["#1A1A1A", "#333333", "#000000"]} waveOpacity={0.3} backgroundFill="black" />
            </div>

            <div className="relative z-10 w-full flex items-center justify-center px-4">
                <Suspense fallback={<div className="text-white">Loading...</div>}>
                    <PremiumLoginForm />
                </Suspense>
            </div>
        </div>
    )
}
