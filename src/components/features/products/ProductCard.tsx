"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus, Scale, Check, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"

import { cn, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/ui/rating"
import { Product } from "@/types"
import { useCompareStore } from "@/lib/stores/compare"
import { TechSpecsTooltip } from "@/components/features/power-user/TechSpecsTooltip"
import { useCartStore } from "@/lib/stores/cart"
import { toast } from "sonner"

// UI Extensions
import { Spotlight } from "@/components/ui/extension/Spotlight"
import { CardContainer, CardBody, CardItem } from "@/components/ui/extension/3d-card"
import ShimmerButton from "@/components/ui/extension/ShimmerButton"

interface ProductCardProps {
    product: Product
    className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addToCompare, removeFromCompare, compareItems } = useCompareStore()
    const isCompared = compareItems.some(p => p.id === product.id)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem(product)
        toast.success("Added to cart", {
            description: `${product.name} has been added to your boutique cart.`,
            className: "bg-zinc-900 border-amber-500/50 text-white"
        })
    }

    return (
        <CardContainer containerClassName="py-0 w-full" className="group/card w-full">
            <CardBody className="relative h-full w-full">
                <Spotlight className={cn(
                    "relative flex flex-col h-full w-full overflow-hidden rounded-[2rem] border transition-all duration-500 shadow-sm hover:shadow-md",
                    "bg-white border-zinc-200", // Light mode
                    "dark:bg-zinc-900/40 dark:border-white/5 dark:backdrop-blur-xl dark:shadow-2xl dark:hover:border-amber-500/20", // Dark mode
                    className
                )}>
                    {/* Visual Background Glow */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Image Section */}
                    <div className="relative aspect-[3/4] overflow-hidden m-2 rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-800/20">
                        <CardItem
                            translateZ={60}
                            className="h-full w-full"
                        >
                            <Image
                                src={product.image || "/placeholder.png"}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            />
                        </CardItem>

                        {/* Badges & Overlays */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <CardItem translateZ={80}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        isCompared ? removeFromCompare(product.id) : addToCompare(product)
                                    }}
                                    className={cn(
                                        "p-2 rounded-full backdrop-blur-md border transition-all duration-300",
                                        isCompared
                                            ? "bg-amber-500 text-white border-amber-400"
                                            : "bg-white/80 border-black/5 text-zinc-600 hover:bg-white hover:text-black dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:bg-black/40"
                                    )}
                                    title="Compare Product"
                                >
                                    {isCompared ? <Check className="h-4 w-4" /> : <div className="flex items-center gap-1 px-1"><Scale className="h-3 w-3" /><span className="text-[10px] font-bold">VS</span></div>}
                                </button>
                            </CardItem>
                        </div>

                        {!product.inStock && (
                            <div className="absolute top-4 right-4 z-20">
                                <CardItem translateZ={80}>
                                    <Badge variant="destructive" className="bg-red-500/80 backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3">
                                        Out of Stock
                                    </Badge>
                                </CardItem>
                            </div>
                        )}

                        {/* Mobile Quick Add (Visible on touch or small screens) */}
                        <div className="absolute bottom-4 right-4 z-20 md:hidden">
                            <button
                                onClick={handleAddToCart}
                                className="p-3 rounded-full bg-amber-500 text-black shadow-xl border border-amber-400/50 active:scale-95 transition-transform"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-6 pt-2 space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                            <CardItem translateZ={30} className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.2em]">{product.brand}</span>
                                <TechSpecsTooltip
                                    specs={{
                                        abv: "40%",
                                        region: "Highlands",
                                        aging: "12 Years",
                                        cask: "Oak"
                                    }}
                                    product={product}
                                >
                                    <HelpCircle className="h-3 w-3 text-zinc-600 hover:text-amber-500 transition-colors cursor-help" />
                                </TechSpecsTooltip>
                            </CardItem>
                            <CardItem translateZ={30}>
                                <Rating rating={product.rating} className="scale-75 origin-right" />
                            </CardItem>
                        </div>

                        <CardItem translateZ={40} className="min-h-[3rem]">
                            <Link
                                href={`/products/${product.slug}`}
                                className="block font-serif text-xl font-medium leading-tight text-zinc-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-500 transition-colors line-clamp-2"
                            >
                                {product.name}
                            </Link>
                        </CardItem>

                        <div className="flex items-end justify-between pt-2">
                            <CardItem translateZ={50} className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-0.5">Price</span>
                                <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                    {formatPrice(product.price)}
                                </span>
                            </CardItem>

                            {/* Desktop Add to Cart - Shimmering & Animated */}
                            <CardItem translateZ={70} className="hidden md:block">
                                <ShimmerButton
                                    onClick={handleAddToCart}
                                    className="h-10 px-4 text-xs uppercase tracking-widest rounded-xl"
                                    background="#f59e0b"
                                    shimmerColor="#ffffff"
                                    shimmerDuration="2s"
                                >
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Add</span>
                                    </div>
                                </ShimmerButton>
                            </CardItem>
                        </div>

                        {/* Interactive Alcohol Percentage Display */}
                        <CardItem translateZ={20} className="pt-2">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-100/50 border border-zinc-200 dark:bg-white/5 dark:border-white/5 overflow-hidden group/abv">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase text-zinc-500 font-bold tracking-widest">Alcohol Strength</span>
                                    <span className="text-sm font-bold text-amber-600 dark:text-amber-500">40% ABV</span>
                                </div>
                                <div className="flex-grow mx-4">
                                    <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "40%" }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-amber-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                    <div className="text-[10px] font-bold text-amber-500">PREMIUM</div>
                                </div>
                            </div>
                        </CardItem>
                    </div>
                </Spotlight>
            </CardBody>
        </CardContainer>
    )
}
