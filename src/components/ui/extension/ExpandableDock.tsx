"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Search, Home, ShoppingBag, User, Settings, X, Command } from "lucide-react"

interface DockItem {
    id: string
    icon: React.ElementType
    label: string
    onClick: () => void
}

interface ExpandableDockProps {
    className?: string
    items: DockItem[]
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

export function ExpandableDock({ className, items, isOpen, onClose, children }: ExpandableDockProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/40 backdrop-blur-sm z-[100]"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={cn(
                                "pointer-events-auto flex flex-col gap-2 p-2 bg-background/80 backdrop-blur-2xl border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl transition-all duration-300",
                                className
                            )}
                        >
                            <div className="flex items-center gap-1 p-1">
                                {items.map((item) => (
                                    <DockIcon
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        onClick={item.onClick}
                                    />
                                ))}
                                <div className="w-px h-8 bg-border/50 mx-1" />
                                <DockIcon
                                    icon={X}
                                    label="Close"
                                    onClick={onClose}
                                    className="text-muted-foreground hover:text-destructive"
                                />
                            </div>

                            {children && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden border-t border-border/50"
                                >
                                    <div className="p-4 max-h-[60vh] overflow-y-auto w-[600px]">
                                        {children}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

function DockIcon({
    icon: Icon,
    label,
    onClick,
    className
}: {
    icon: React.ElementType,
    label: string,
    onClick: () => void,
    className?: string
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl bg-muted/20 hover:bg-amber-500/10 hover:text-amber-500 transition-colors group",
                className
            )}
        >
            <Icon className="w-5 h-5" />
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 uppercase tracking-tighter">
                {label}
            </span>
        </motion.button>
    )
}
