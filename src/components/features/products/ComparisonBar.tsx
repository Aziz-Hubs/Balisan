"use client"

import * as React from "react"
import { useCompareStore } from "@/lib/stores/compare"
import { X, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function ComparisonBar() {
    const { compareItems, removeFromCompare, clearCompare, setIsComparing } = useCompareStore()

    if (compareItems.length === 0) return null

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4"
        >
            <div className="bg-background/95 backdrop-blur border shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                    <div className="hidden sm:flex items-center gap-2 text-sm font-medium pr-4 border-r">
                        <Scale className="h-4 w-4 text-primary" />
                        <span>Compare ({compareItems.length})</span>
                    </div>
                    <div className="flex -space-x-2 overflow-hidden">
                        {compareItems.map((product) => (
                            <div key={product.id} className="relative group">
                                <div className="h-12 w-12 rounded-lg border-2 border-background bg-muted overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/bottle.png"
                                            e.currentTarget.onerror = null
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={clearCompare} className="text-muted-foreground">
                        Clear
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => setIsComparing(true)}
                        disabled={compareItems.length < 2}
                        className="bg-primary text-white"
                    >
                        Compare Now
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
