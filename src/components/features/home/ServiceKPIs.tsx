"use client";

import React from "react";
import { Truck, Banknote, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/extension/Spotlight";
import NumberTicker from "@/components/ui/extension/NumberTicker";

const kpis = [
    {
        icon: Truck,
        title: "Ultra-Fast Delivery",
        description: "90-minute delivery for local orders within our network.",
        value: 90,
        suffix: "m",
        label: "Delivery Speed",
    },
    {
        icon: Banknote,
        title: "Flexible Payment",
        description: "Cash on Delivery (COD) for your convenience and trust.",
        value: 100,
        suffix: "%",
        label: "Secure Options",
        isTicker: false,
        statOverride: "COD",
    },
    {
        icon: ShieldCheck,
        title: "Authenticity Guaranteed",
        description: "Every bottle is sourced directly from certified distillers.",
        value: 100,
        suffix: "%",
        label: "Genuine Spirits",
    },
];

export function ServiceKPIs() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Amber Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4 tracking-tight">
                        Service Excellence
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Experience premium spirits with a service that matches the quality of our collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {kpis.map((kpi, index) => (
                        <Spotlight
                            key={index}
                            className="p-8 bg-card border-zinc-200 dark:border-white/5 flex flex-col items-center text-center transition-all duration-300 shadow-sm"
                        >
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative z-10 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 group-hover:border-amber-500/50 transition-colors"
                                >
                                    <kpi.icon className="w-8 h-8 text-amber-500" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col items-center gap-2 mb-4">
                                <div className="flex items-baseline gap-1">
                                    {kpi.statOverride ? (
                                        <span className="text-4xl md:text-5xl font-bold text-amber-500 tabular-nums tracking-tighter">
                                            {kpi.statOverride}
                                        </span>
                                    ) : (
                                        <>
                                            <NumberTicker
                                                value={kpi.value}
                                                className="text-4xl md:text-5xl font-bold text-amber-500"
                                            />
                                            <span className="text-2xl font-bold text-amber-500">
                                                {kpi.suffix}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                                    {kpi.label}
                                </span>
                            </div>

                            <h3 className="text-xl font-medium text-foreground mb-3">
                                {kpi.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {kpi.description}
                            </p>
                        </Spotlight>
                    ))}
                </div>
            </div>
        </section>
    );
}
