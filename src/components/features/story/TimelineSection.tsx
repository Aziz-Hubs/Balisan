"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const timelineEvents = [
    {
        year: "1928",
        title: "The Beginning",
        description: "Founded as a small family cellar in the heart of wine country.",
        image: "/bottle.png"
    },
    {
        year: "1985",
        title: "Global Expansion",
        description: "Opening our first international boutique in Tokyo.",
        image: "/bottle.png"
    },
    {
        year: "2010",
        title: "The Digital Era",
        description: "Launching the world's first sommelier-led online marketplace.",
        image: "/bottle.png"
    },
    {
        year: "2024",
        title: "New Heights",
        description: "Redefining luxury spirits delivery for the modern age.",
        image: "/bottle.png"
    }
]

export function TimelineSection() {
    const targetRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-24 px-24">
                    <div className="flex flex-col justify-center min-w-[400px]">
                        <span className="text-sm font-bold tracking-[0.3em] text-primary/60 uppercase mb-4">Our Journey</span>
                        <h2 className="text-6xl font-display font-medium leading-tight">
                            A Century of <br />Excellence/
                        </h2>
                    </div>

                    {timelineEvents.map((event, i) => (
                        <div key={i} className="group relative flex flex-col gap-12 min-w-[600px] h-[70vh] justify-center">
                            <div className="flex items-center gap-12">
                                <div className="relative w-64 h-64 flex-shrink-0 bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5">
                                    <img
                                        src={event.image || "/bottle.png"}
                                        alt={event.title}
                                        className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="border-l border-white/10 pl-12 flex flex-col justify-center h-full transition-colors group-hover:border-primary/50">
                                    <span className="text-8xl font-display font-bold text-white/5 bg-clip-text group-hover:text-white/20 transition-colors">
                                        {event.year}
                                    </span>
                                    <h3 className="text-4xl font-display font-medium mt-4">{event.title}</h3>
                                    <p className="text-xl text-muted-foreground mt-4 max-w-sm">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Ambient Progress Line */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX: scrollYProgress, opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
            />
        </section>
    )
}
