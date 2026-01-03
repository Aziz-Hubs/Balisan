"use client"

import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { BlurFade } from "@/components/ui/blur-fade"

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <BlurFade key={pathname} delay={0.1} inView>
                {children}
            </BlurFade>
        </AnimatePresence>
    )
}