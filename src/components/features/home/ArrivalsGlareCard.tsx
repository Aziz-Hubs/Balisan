"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { GlareCard } from "@/components/ui/glare-card"
import { Product } from "@/types"
import { formatPrice, cn } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface ArrivalsGlareCardProps {
    product: Product
    className?: string
    priority?: boolean
}

export function ArrivalsGlareCard({ product, className, priority = false }: ArrivalsGlareCardProps) {
    const { items, addItem, updateQuantity, removeItem } = useCartStore()
    const cartItem = items.find(i => i.id === product.id)
    const [imageError, setImageError] = React.useState(false)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({ ...product, image: product.image || '/bottle.png' })
        toast.success("Added to cart", {
            description: `${product.name} has been added to your boutique cart.`,
            className: "bg-zinc-900 border-amber-500/50 text-white"
        })
    }

    const handleUpdateQty = (e: React.MouseEvent, change: number) => {
        e.preventDefault()
        e.stopPropagation()
        if (!cartItem) return

        const newQty = cartItem.quantity + change
        if (newQty <= 0) {
            removeItem(product.id)
        } else {
            updateQuantity(product.id, undefined, newQty)
        }
    }

    return (
        <GlareCard className={cn("w-full h-full min-h-[420px]", className)}>
            <div className="flex flex-col h-full relative z-20 p-6">
                {/* Badges */}
                <div className="flex justify-between items-start w-full relative z-30">
                    {product.is_new && (
                        <Badge className="bg-blue-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-2 py-0.5">
                            New
                        </Badge>
                    )}
                    {!product.in_stock && (
                        <Badge variant="destructive" className="bg-red-500/80 backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-2 py-0.5">
                            Sold Out
                        </Badge>
                    )}
                </div>

                {/* Image */}
                <div className="relative flex-1 w-full min-h-[160px] my-4 transition-transform duration-500 hover:scale-110">
                    <Image
                        src={imageError ? '/bottle.png' : (product.image || '/bottle.png')}
                        alt={product.name}
                        fill
                        onError={() => setImageError(true)}
                        className={cn(
                            "object-contain drop-shadow-2xl",
                            !product.in_stock && "grayscale opacity-50"
                        )}
                        sizes="(max-width: 768px) 100vw, 300px"
                        priority={priority}
                    />
                </div>

                {/* Content */}
                <div className="mt-auto space-y-3">
                    <div>
                        <p className="font-bold text-amber-500 text-[10px] uppercase tracking-[0.2em] mb-1">{(typeof product.brand === 'string' ? product.brand : product.brand?.name)}</p>
                        <Link href={`/products/${product.slug}`} className="block text-white font-serif text-xl sm:text-2xl leading-tight hover:text-amber-400 transition-colors line-clamp-2">
                            {product.name}
                        </Link>
                    </div>

                    <div className="flex items-end justify-between pt-2 border-t border-white/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Price</span>
                            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{formatPrice(product.price)}</span>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="relative z-30">
                            {!product.in_stock ? (
                                <div className="h-10 px-4 flex items-center justify-center bg-white/5 rounded-full border border-white/10 cursor-not-allowed">
                                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Sold Out</span>
                                </div>
                            ) : cartItem ? (
                                <div className="h-10 px-1 bg-amber-500 rounded-full flex items-center shadow-lg shadow-amber-500/20">
                                    <button
                                        onClick={(e) => handleUpdateQty(e, -1)}
                                        className="h-full px-3 hover:bg-black/10 rounded-l-full transition-colors flex items-center justify-center"
                                    >
                                        <Minus className="h-3.5 w-3.5 text-black" />
                                    </button>
                                    <div className="px-1 font-bold text-black min-w-[20px] text-center text-sm tabular-nums">
                                        {cartItem.quantity}
                                    </div>
                                    <button
                                        onClick={(e) => handleUpdateQty(e, 1)}
                                        className="h-full px-3 hover:bg-black/10 rounded-r-full transition-colors flex items-center justify-center"
                                    >
                                        <Plus className="h-3.5 w-3.5 text-black" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="h-10 w-10 md:w-auto md:px-4 rounded-full bg-white text-black flex items-center justify-center gap-2 hover:bg-amber-500 transition-colors shadow-lg group"
                                    aria-label="Add to cart"
                                >
                                    <ShoppingCart className="h-4 w-4 transition-transform group-hover:scale-110" />
                                    <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Add</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GlareCard>
    )
}
