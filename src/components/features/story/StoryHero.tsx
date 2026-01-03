"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AmbientBackground } from "@/components/features/content/AmbientBackground"
import { TextReveal } from "@/components/ui/extension/TextReveal"
import { ArrowDown } from "lucide-react"

export function StoryHero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const y = useTransform(scrollY, [0, 300], [0, 100])

    return (
        <section className="relative h-[90vh] min-h-[600px] w-full">
            <AmbientBackground
                posterUrl="/bottle.png" // Using existing asset as placeholder
                className="h-full w-full flex items-center justify-center text-center"
                overlayOpacity={0.6}
            >
                <motion.div
                    style={{ opacity, y }}
                    className="container mx-auto px-4 z-10 flex flex-col items-center gap-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-sm md:text-base font-bold tracking-[0.5em] text-white/80 uppercase">
                            Since 1928
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-tight">
                            <TextReveal text="Legacy" /><br />
                            <span className="text-white/60">
                                <TextReveal text="Redefined." delay={0.4} />
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed font-serif"
                    >
                        More than a store. A curation of the world's finest spirits, crafted for the modern connoisseur.
                    </motion.p>
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
                >
                    <ArrowDown className="w-6 h-6" />
                </motion.div>
            </AmbientBackground>
        </section>
    )
}
