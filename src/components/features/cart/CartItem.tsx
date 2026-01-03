"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { CartItem as CartItemType } from "@/lib/stores/cart"
import Image from "next/image"

interface CartItemProps {
    item: CartItemType
    updateQuantity: (id: string, variant: string | undefined, quantity: number) => void
    removeItem: (id: string, variant?: string) => void
    index: number
}

export function CartItem({ item, updateQuantity, removeItem, index }: CartItemProps) {
    const [imageError, setImageError] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex gap-4 group bg-zinc-900/40 p-3 rounded-xl border border-white/5 hover:border-amber-500/20 transition-colors"
        >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800/50 border border-white/10 group-hover:border-amber-500/30 transition-colors">
                <Image
                    src={imageError ? "/bottle.png" : item.image}
                    alt={item.name}
                    fill
                    onError={() => setImageError(true)}
                    className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-zinc-100 line-clamp-1 group-hover:text-amber-400 transition-colors">{item.name}</h4>
                        <p className="text-sm font-bold text-amber-500">{formatPrice(item.price)}</p>
                    </div>
                    {item.variant && (
                        <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-widest font-medium">{item.variant}</p>
                    )}
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-zinc-800/50 rounded-lg border border-white/5 p-0.5">
                        <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                            className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-700/50 rounded-md transition-all"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-zinc-200">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:bg-zinc-700/50 rounded-md transition-all"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                    <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        aria-label="Remove item"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
