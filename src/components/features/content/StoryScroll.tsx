"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export interface StoryStep {
    id: string
    title: string
    description: string
    image: string
    align?: "left" | "right" | "center"
}

interface StoryScrollProps {
    steps: StoryStep[]
    className?: string
}

export function StoryScroll({ steps, className }: StoryScrollProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <section ref={containerRef} className={cn("relative", className)}>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX: smoothProgress }}
            />

            <div className="space-y-24 py-24">
                {steps.map((step, index) => (
                    <StoryInfo
                        key={step.id}
                        step={step}
                        index={index}
                        total={steps.length}
                    />
                ))}
            </div>
        </section>
    )
}

function StoryInfo({ step, index, total }: { step: StoryStep, index: number, total: number }) {
    const ref = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Parallax for image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            className={cn(
                "container grid md:grid-cols-2 gap-12 items-center min-h-[60vh]",
                isEven ? "" : "md:grid-flow-dense" // Swap columns for visual interest
            )}
            style={{ opacity, scale }}
        >
            <div className={cn("space-y-6", isEven ? "md:order-1" : "md:order-2")}>
                <div className="flex items-center gap-4">
                    <span className="text-6xl font-display font-medium text-primary/20">0{index + 1}</span>
                    <div className="h-px bg-border flex-1" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">{step.title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{step.description}</p>
            </div>

            <div className={cn("relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl", isEven ? "md:order-2" : "md:order-1")}>
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 h-[120%] w-full -top-[10%]"
                >
                    <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    )
}
