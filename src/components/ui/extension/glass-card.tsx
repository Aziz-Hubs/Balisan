"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export function GlassCard({
    children,
    className,
    title,
    description,
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "relative w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-xl",
                className
            )}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-50" />
            {(title || description) && (
                <div className="relative z-10 flex flex-col gap-2 mb-8 text-center md:text-left">
                    {title && (
                        <h1 className="text-3xl font-serif font-medium text-white tracking-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-sm text-zinc-400">{description}</p>
                    )}
                </div>
            )}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
