"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { AddToCartButton } from "@/components/features/cart/AddToCartButton"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"

interface ProductHeroClientProps {
    product: Product
    addToCartRef?: React.RefObject<HTMLDivElement | null>
}

export function ProductHeroClient({ product }: ProductHeroClientProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [imageError, setImageError] = useState(false)

    const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name
    const productImage = Array.isArray(product.images) && product.images.length > 0
        ? product.images[0] as string
        : "/bottle.png"

    useEffect(() => {
        const handleScroll = () => {
            // Show the sticky footer when scrolled down more than 500px
            // This ensures it only appears after scrolling past the hero section
            const scrollY = window.scrollY
            const shouldShow = scrollY > 500

            setIsVisible(shouldShow)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll() // Check initial state

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
                >
                    <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                        <div className="flex items-center gap-3 max-w-md mx-auto">
                            {/* Product Thumbnail */}
                            <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
                                <Image
                                    src={imageError ? "/bottle.png" : productImage}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-1"
                                    onError={() => setImageError(true)}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
                                    {brandName}
                                </p>
                                <p className="text-sm font-semibold truncate">{product.name}</p>
                                <div className="flex items-baseline gap-2">
                                    {product.discount_price && product.discount_price < product.price ? (
                                        <>
                                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                {formatPrice(product.discount_price)}
                                            </span>
                                            <span className="text-xs text-muted-foreground line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm font-bold">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <AddToCartButton
                                product={product}
                                size="default"
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/25 px-6 rounded-full flex-shrink-0"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
