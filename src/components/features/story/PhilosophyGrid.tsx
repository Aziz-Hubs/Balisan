"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Wine, Globe, Sparkles } from "lucide-react"

const philosophies = [
    {
        id: "craft",
        title: "Uncompromising Craft",
        description: "We partner exclusively with independent distillers who value tradition over mass production.",
        icon: Wine,
        color: "bg-amber-500/10 text-amber-500"
    },
    {
        id: "curation",
        title: "Expert Curation",
        description: "Every bottle is taste-tested by our panel of Master Sommeliers before it touches our shelves.",
        icon: Sparkles,
        color: "bg-purple-500/10 text-purple-500"
    },
    {
        id: "sustainability",
        title: "Sustainable Future",
        description: "Dedicated to reducing our carbon footprint through eco-friendly packaging and ethical sourcing.",
        icon: Globe,
        color: "bg-emerald-500/10 text-emerald-500"
    }
]

export function PhilosophyGrid() {
    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">Our Values</span>
                    <h2 className="text-5xl font-display font-bold mt-6 mb-6">The Art of Selection</h2>
                    <p className="text-xl text-muted-foreground font-light">
                        We believe that true luxury lies in the details. Our philosophy is built on three pillars that define everything we do.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {philosophies.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-2xl border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-500 flex flex-col gap-6"
                        >
                            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-colors", item.color)}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-display font-medium mb-3 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
