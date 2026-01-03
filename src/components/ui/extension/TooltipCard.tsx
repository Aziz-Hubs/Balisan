"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TooltipCardProps {
    children: React.ReactNode
    content: React.ReactNode | string
    className?: string
    containerClassName?: string
}

export function TooltipCard({
    children,
    content,
    className,
    containerClassName,
}: TooltipCardProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div
            className={cn("relative inline-block", containerClassName)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute z-50 min-w-[200px] px-4 py-3 mt-2",
                            "bg-popover text-popover-foreground",
                            "rounded-xl border shadow-xl",
                            "backdrop-blur-md",
                            "-translate-x-1/2 left-1/2",
                            className
                        )}
                    >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-popover border-l border-t rounded-tl" />
                        <div className="relative z-10 text-sm">{content}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
