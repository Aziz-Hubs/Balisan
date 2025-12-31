"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Scale, Check, HelpCircle, Heart, ExternalLink, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

import { cn, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/ui/rating"
import { Product } from "@/types"
import { useCompareStore } from "@/lib/stores/compare"
import { useCollectionsStore } from "@/lib/stores/collections"
import { TechSpecsTooltip } from "@/components/features/power-user/TechSpecsTooltip"
import { useCartStore } from "@/lib/stores/cart"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

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
    const router = useRouter()
    const [showPreview, setShowPreview] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            router.push(`/products/${product.slug}`)
        } else {
            setShowPreview(true)
        }
    }

    const { addItem: addToCollection, removeItem: removeFromCollection, hasItem } = useCollectionsStore()
    const isInCollection = hasItem(product.id)

    const handleToggleCollection = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isInCollection) {
            removeFromCollection(product.id)
            toast.success("Removed from collection", {
                description: `${product.name} has been removed from your collection.`,
                className: "bg-zinc-900 border-zinc-700 text-white"
            })
        } else {
            addToCollection(product.id)
            toast.success("Added to collection", {
                description: `${product.name} has been saved to your collection.`,
                className: "bg-zinc-900 border-amber-500/50 text-white"
            })
        }
    }

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
        <CardContainer containerClassName="py-0 w-full" className="group/card w-full" data-testid="product-card">
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
                    <div
                        className="relative aspect-[3/4] overflow-hidden m-2 rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-800/20 cursor-pointer group/image"
                        onClick={handleImageClick}
                    >
                        <CardItem
                            translateZ={60}
                            className="h-full w-full"
                        >
                            <Image
                                src={imageError ? "/bottle.png" : (product.image || "/bottle.png")}
                                alt={product.name}
                                fill
                                onError={() => setImageError(true)}
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
                                            : "bg-white/80 border-black/5 text-zinc-600 hover:bg-white hover:text-black dark:bg-[#0c0a09]/20 dark:border-white/10 dark:text-white/70 dark:hover:bg-[#0c0a09]/40"
                                    )}
                                    title="Compare Product"
                                >
                                    {isCompared ? <Check className="h-4 w-4" /> : <div className="flex items-center gap-1 px-1"><Scale className="h-3 w-3" /><span className="text-[10px] font-bold">VS</span></div>}
                                </button>
                            </CardItem>
                            <CardItem translateZ={80}>
                                <button
                                    onClick={handleToggleCollection}
                                    className={cn(
                                        "p-2 rounded-full backdrop-blur-md border transition-all duration-300",
                                        isInCollection
                                            ? "bg-rose-500 text-white border-rose-400"
                                            : "bg-white/80 border-black/5 text-zinc-600 hover:bg-white hover:text-rose-500 dark:bg-[#0c0a09]/20 dark:border-white/10 dark:text-white/70 dark:hover:bg-[#0c0a09]/40 dark:hover:text-rose-400"
                                    )}
                                    title={isInCollection ? "Remove from Collection" : "Add to Collection"}
                                >
                                    <Heart className={cn("h-4 w-4", isInCollection && "fill-current")} />
                                </button>
                            </CardItem>
                        </div>

                        {/* Top Right Badges */}
                        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                            {!product.inStock && (
                                <CardItem translateZ={80}>
                                    <Badge variant="destructive" className="bg-red-500/80 backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        Sold Out
                                    </Badge>
                                </CardItem>
                            )}

                            {product.discountPrice && product.discountPrice < product.price && (
                                <CardItem translateZ={80}>
                                    <Badge className="bg-emerald-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                    </Badge>
                                </CardItem>
                            )}

                            {(product.isAwardWinner || product.tags?.includes('award-winner')) && (
                                <CardItem translateZ={80}>
                                    <Badge className="bg-amber-500/80 text-black backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        Award Winner
                                    </Badge>
                                </CardItem>
                            )}

                            {(product.isNew || (new Date().getTime() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000)) && (
                                <CardItem translateZ={80}>
                                    <Badge className="bg-blue-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        New
                                    </Badge>
                                </CardItem>
                            )}
                        </div>

                        {/* Mobile Quick Add (Visible on touch or small screens) */}
                        <div className="absolute bottom-4 right-4 z-20 md:hidden">
                            <button
                                onClick={handleAddToCart}
                                aria-label="Add to cart"
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
                                        abv: `${product.abv}%`,
                                        region: product.region || "N/A",
                                        aging: product.tags?.find(t => t.includes('Year')) || "N/A",
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
                                {product.discountPrice ? (
                                    <>
                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-0.5 line-through decoration-red-500/40">{formatPrice(product.price)}</span>
                                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                                            {formatPrice(product.discountPrice)}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-0.5">Price</span>
                                        <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                            {formatPrice(product.price)}
                                        </span>
                                    </>
                                )}
                            </CardItem>

                            {/* Desktop Add to Cart - Shimmering & Animated */}
                            <CardItem translateZ={70} className="hidden md:block">
                                <ShimmerButton
                                    onClick={handleAddToCart}
                                    aria-label="Add to cart"
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
                                    <span className="text-sm font-bold text-amber-600 dark:text-amber-500">{product.abv}% ABV</span>
                                </div>
                                <div className="flex-grow mx-4">
                                    <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(product.abv * 1.5, 100)}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-amber-500"
                                        />
                                    </div>
                                </div>
                                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                    <div className="text-[10px] font-bold text-amber-500">
                                        {product.country?.toLowerCase() === 'ukraine' ? 'LOCAL' : 'IMPORTED'}
                                    </div>
                                </div>
                            </div>
                        </CardItem>
                    </div>
                </Spotlight>

                <Dialog open={showPreview} onOpenChange={setShowPreview}>
                    <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-zinc-200 dark:border-white/5 sm:rounded-[2rem] shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-0 max-h-[85vh] md:max-h-[650px] overflow-hidden">
                            {/* Left: Product Image */}
                            <div className="relative h-64 md:h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-8 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-full max-h-[400px]"
                                >
                                    <Image
                                        src={imageError ? "/bottle.png" : (product.image || "/bottle.png")}
                                        alt={product.name}
                                        fill
                                        onError={() => setImageError(true)}
                                        className="object-contain drop-shadow-xl"
                                        priority
                                    />
                                </motion.div>
                                {/* Brand Badge */}
                                <div className="absolute top-6 left-6">
                                    <Badge variant="outline" className="bg-white/50 dark:bg-[#0c0a09]/50 backdrop-blur-md border-zinc-200 dark:border-white/10 px-3 py-1">
                                        {product.brand}
                                    </Badge>
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div className="flex flex-col h-full bg-white/40 dark:bg-zinc-900/40 p-6 md:p-8 overflow-y-auto">
                                <DialogHeader className="text-left space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Rating rating={product.rating} />
                                            <span className="text-xs text-muted-foreground font-medium">({product.reviewCount} reviews)</span>
                                        </div>
                                        {product.isAwardWinner && (
                                            <Badge className="bg-amber-500 text-black border-none">Award Winner</Badge>
                                        )}
                                    </div>
                                    <div>
                                        <DialogTitle className="text-3xl md:text-4xl font-serif text-zinc-900 dark:text-white mb-2 leading-tight">
                                            {product.name}
                                        </DialogTitle>
                                        <DialogDescription className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                                            {product.description}
                                        </DialogDescription>
                                    </div>
                                </DialogHeader>

                                <div className="flex-1 py-8 space-y-6">
                                    {/* Quick Specs Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {[
                                            { label: "ABV", value: `${product.abv}%` },
                                            { label: "Volume", value: product.volume },
                                            { label: "Country", value: product.country },
                                            { label: "Category", value: product.category }
                                        ].map((spec, i) => (
                                            <div key={i} className="p-3 rounded-2xl bg-zinc-50 dark:bg-[#0c0a09]/20 border border-zinc-100 dark:border-white/5 text-center sm:text-left">
                                                <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block mb-1">{spec.label}</span>
                                                <div className="font-semibold text-zinc-900 dark:text-zinc-200 text-sm">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {product.tastingNotes && (
                                        <div className="space-y-2 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                Tasting Notes
                                            </span>
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                                                "{product.tastingNotes}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Controls */}
                                <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex flex-col items-center sm:items-start">
                                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Price</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                                                {formatPrice(product.discountPrice || product.price)}
                                            </span>
                                            {product.discountPrice && (
                                                <span className="text-sm text-zinc-400 line-through decoration-red-500/50">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full sm:w-auto">
                                        <Link href={`/products/${product.slug}`} className="flex-none">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="h-12 w-12 rounded-full flex items-center justify-center border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors group"
                                                title="View Details"
                                            >
                                                <ExternalLink className="h-5 w-5 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
                                            </motion.button>
                                        </Link>

                                        <ShimmerButton
                                            className="h-12 px-8 rounded-full w-full sm:w-auto"
                                            background="#f59e0b"
                                            shimmerColor="#ffffff"
                                            onClick={(e) => {
                                                handleAddToCart(e)
                                                setShowPreview(false)
                                            }}
                                        >
                                            <div className="flex items-center justify-center gap-2 font-semibold">
                                                <ShoppingCart className="h-4 w-4" />
                                                <span>Add to Cart</span>
                                            </div>
                                        </ShimmerButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardBody>
        </CardContainer>
    )
}
