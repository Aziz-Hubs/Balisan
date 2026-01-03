"use client"

import * as React from "react"
import { useCompareStore } from "@/lib/stores/compare"
import { X, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface FlavorBarProps {
    label: string
    value: number
    color?: string
}

function FlavorBar({ label, value, color = "bg-amber-500" }: FlavorBarProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between mb-1 text-xs font-medium">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    )
}

export function ComparisonOverlay() {
    const { isComparing, setIsComparing, compareItems, removeFromCompare, clearCompare } = useCompareStore()

    if (!isComparing) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/98 backdrop-blur-xl overflow-y-auto"
        >
            <div className="container mx-auto py-12 px-4 md:px-6 min-h-screen flex flex-col">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-foreground">Compare Products</h2>
                        <p className="text-muted-foreground mt-2 text-lg">Evaluate your premium selection side-by-side.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={clearCompare} className="text-muted-foreground hover:text-amber-600">Clear All</Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsComparing(false)}
                            className="rounded-full h-12 w-12 border-amber-500/20 hover:bg-amber-500/10"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_1fr_1fr] gap-0 border rounded-2xl overflow-hidden bg-card shadow-2xl">
                        {/* Attributes Column */}
                        <div className="hidden md:flex flex-col bg-muted/10">
                            <div className="h-[300px] border-b p-6 flex items-end font-semibold text-muted-foreground uppercase tracking-wider text-xs">Product</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">Brand</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">Price</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">ABV</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">Origin</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">Rating</div>
                            <div className="p-6 border-b font-medium text-muted-foreground">Flavor Profile</div>
                            <div className="p-6 font-medium text-muted-foreground">Action</div>
                        </div>

                        {/* Product Columns */}
                        {compareItems.map((product) => (
                            <div key={product.id} className="flex flex-col border-l relative group bg-background/50 hover:bg-background transition-colors">
                                <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute top-4 right-4 z-10 p-1 bg-destructive/10 text-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {/* Product Image & Name */}
                                <div className="h-[300px] border-b p-6 flex flex-col items-center justify-center text-center gap-4">
                                    <div className="relative h-40 w-full group/image">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-contain transition-transform duration-500 group-hover/image:scale-110"
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
                                </div>

                                {/* Brand */}
                                <div className="p-6 border-b text-center md:text-left h-[73px] flex items-center">
                                    <span className="md:hidden font-semibold mr-2 text-muted-foreground">Brand:</span>
                                    {typeof product.brand === 'string' ? product.brand : product.brand?.name}
                                </div>

                                {/* Price */}
                                <div className="p-6 border-b text-center md:text-left h-[73px] flex items-center font-bold text-amber-500 text-lg">
                                    <span className="md:hidden font-semibold mr-2 text-muted-foreground">Price:</span>
                                    {formatPrice(product.price)}
                                </div>

                                {/* ABV */}
                                <div className="p-6 border-b text-center md:text-left h-[73px] flex items-center">
                                    <span className="md:hidden font-semibold mr-2 text-muted-foreground">ABV:</span>
                                    {product.abv}%
                                </div>

                                {/* Origin */}
                                <div className="p-6 border-b text-center md:text-left h-[73px] flex items-center">
                                    <span className="md:hidden font-semibold mr-2 text-muted-foreground">Origin:</span>
                                    {product.region}, {product.country}
                                </div>

                                {/* Rating */}
                                <div className="p-6 border-b text-center md:text-left h-[73px] flex items-center">
                                    <span className="md:hidden font-semibold mr-2 text-muted-foreground">Rating:</span>
                                    <div className="flex items-center gap-1 justify-center md:justify-start">
                                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                        <span className="font-medium">{product.rating}</span>
                                    </div>
                                </div>

                                {/* Flavor Profile */}
                                <div className="p-6 border-b text-center md:text-left flex flex-col gap-4">
                                    <span className="md:hidden font-semibold mb-2 text-muted-foreground">Flavor Profile:</span>
                                    {product.flavor_profile ? (
                                        <>
                                            <FlavorBar label="Woodiness" value={product.flavor_profile.woodiness || 0} />
                                            <FlavorBar label="Smokiness" value={product.flavor_profile.smokiness || 0} />
                                            <FlavorBar label="Sweetness" value={product.flavor_profile.sweetness || 0} />
                                            <FlavorBar label="Complexity" value={product.flavor_profile.complexity || 0} color="bg-zinc-500" />
                                            <FlavorBar label="Peatiness" value={product.flavor_profile.peatiness || 0} color="bg-emerald-600" />
                                        </>
                                    ) : (
                                        <span className="text-muted-foreground italic text-sm text-center w-full py-4">Profile data unavailable</span>
                                    )}
                                </div>

                                {/* Action */}
                                <div className="p-6 text-center md:text-left mt-auto">
                                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2 h-11">
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* Empty Slots */}
                        {[...Array(Math.max(0, 4 - compareItems.length))].map((_, i) => (
                            <div key={`empty-${i}`} className="hidden md:flex flex-col border-l bg-muted/5 items-center justify-center text-muted-foreground italic text-sm">
                                <div className="p-6 text-center">
                                    <p>Select another product</p>
                                    <p>to compare</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center text-muted-foreground text-sm">
                    Limited to 4 products for optimal side-by-side comparison on desktop screens.
                </div>
            </div>
        </motion.div>
    )
}
