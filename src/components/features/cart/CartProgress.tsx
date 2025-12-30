"use client"

import { Truck, Check } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"

interface CartProgressProps {
    subtotal: number
    threshold: number
}

export function CartProgress({ subtotal, threshold }: CartProgressProps) {
    const progress = Math.min((subtotal / threshold) * 100, 100)
    const remaining = Math.max(threshold - subtotal, 0)

    return (
        <div className="space-y-3 px-1">
            <div className="flex justify-between text-[11px] font-bold tracking-tight uppercase">
                <span className="flex items-center gap-2 text-zinc-400">
                    <Truck className="h-3.5 w-3.5 text-amber-500" />
                    {remaining > 0 ? (
                        <span>
                            Spend <span className="text-amber-500">{formatPrice(remaining)}</span> more for <span className="text-zinc-100">Free Shipping</span>
                        </span>
                    ) : (
                        <span className="text-amber-500 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Free Shipping Unlocked!
                        </span>
                    )}
                </span>
                <span className="text-zinc-500">{Math.round(progress)}%</span>
            </div>

            <div className="relative h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5">
                {/* Shimmer Effect */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.3),55%,transparent)] bg-[length:200%_100%] animate-shimmer" />
                </motion.div>
            </div>
        </div>
    )
}
