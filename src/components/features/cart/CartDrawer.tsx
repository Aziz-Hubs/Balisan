"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, ArrowRight, Gift, Check, Sparkles } from "lucide-react"
import { useCartStore, selectTotalItems, selectSubtotal } from "@/lib/stores/cart"
import { cn, formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CartItem } from "./CartItem"
import { CartProgress } from "./CartProgress"
import { Spotlight } from "@/components/ui/extension/Spotlight"
import ShimmerButton from "@/components/ui/extension/ShimmerButton"
import { MiniMarquee } from "./MiniMarquee"
import { TextReveal } from "@/components/ui/extension/TextReveal"
import { TEQUILA_PRODUCTS } from "@/data/mock/products-spirits"
import { WHISKEY_PRODUCTS } from "@/data/mock/products"

export function CartDrawer() {
    const { items, removeItem, updateQuantity, isOpen, toggleDrawer } = useCartStore()
    const totalItems = useCartStore(selectTotalItems)
    const subtotal = useCartStore(selectSubtotal)
    const [isGifting, setIsGifting] = React.useState(false)
    const [giftMessage, setGiftMessage] = React.useState("")
    const router = useRouter()

    const FREE_SHIPPING_THRESHOLD = 150

    const crossSellItems = [...TEQUILA_PRODUCTS, ...WHISKEY_PRODUCTS]
        .slice(0, 6)
        .map(p => ({
            id: p.id,
            name: p.name,
            brand: p.brand?.name || '',
            image: p.image!,
            price: p.price,
            href: `/shop/${p.slug}`
        }))

    return (
        <Sheet open={isOpen} onOpenChange={toggleDrawer}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group" aria-label="Open Cart">
                    {totalItems > 0 && (
                        <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,var(--primary),55%,transparent)] opacity-30 bg-[length:200%_100%] animate-shimmer" />
                        </div>
                    )}
                    <ShoppingBag className={cn("h-5 w-5 transition-all duration-300 group-hover:scale-110", totalItems > 0 && "text-amber-500")} />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md border-l border-border shadow-2xl bg-background/95 backdrop-blur-2xl p-0 overflow-hidden">
                <Spotlight className="absolute inset-0 pointer-events-none z-0 dark:block hidden" active />

                <div className="relative z-10 flex flex-col h-full text-foreground">
                    <SheetHeader className="px-6 pt-8 pb-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <SheetTitle className="text-3xl font-display font-black text-foreground uppercase tracking-tighter">Your Curation</SheetTitle>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Selected Spirits & Essentials</p>
                            </div>
                            <Badge variant="outline" className="rounded-full px-4 py-1.5 font-bold border-amber-500/30 text-amber-500 bg-amber-500/5">
                                {totalItems} {totalItems === 1 ? 'Vol' : 'Vols'}
                            </Badge>
                        </div>

                        {items.length > 0 && (
                            <CartProgress subtotal={subtotal} threshold={FREE_SHIPPING_THRESHOLD} />
                        )}
                    </SheetHeader>

                    {items.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
                                <div className="relative h-32 w-32 rounded-full bg-card border border-border flex items-center justify-center shadow-2xl">
                                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-display font-bold text-foreground uppercase tracking-tight">
                                    <TextReveal text="The cellar is empty" />
                                </h3>
                                <p className="text-xs text-muted-foreground max-w-[240px] mx-auto leading-relaxed">
                                    Browse our collection of rare spirits and premium refreshments to start your curation.
                                </p>
                            </div>
                            <Button variant="outline" className="h-12 px-8 border-border hover:border-amber-500/50 hover:bg-amber-500/5 text-foreground rounded-full" asChild onClick={() => toggleDrawer()}>
                                <Link href="/shop" className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                    Explore Collection
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 px-6">
                                <div className="space-y-4 py-4">
                                    {items.map((item, index) => (
                                        <CartItem
                                            key={`${item.id}-${item.variant}`}
                                            item={item}
                                            index={index}
                                            updateQuantity={updateQuantity}
                                            removeItem={removeItem}
                                        />
                                    ))}
                                </div>

                                {/* Cross-sell Section */}
                                <div className="mt-8 space-y-4 pb-8">
                                    <h5 className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] px-1">Complete your bar</h5>
                                    <div className="relative overflow-hidden">
                                        <MiniMarquee items={crossSellItems} speed={30} className="py-1" />
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="pt-6 px-6 pb-8 border-t border-border bg-muted/30">
                                {/* Premium Gifting */}
                                <div className={cn(
                                    "rounded-2xl p-4 border transition-all duration-500 mb-6",
                                    isGifting ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]" : "bg-card border-border"
                                )}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                "p-2 rounded-xl transition-colors",
                                                isGifting ? "bg-amber-500 text-black" : "bg-muted text-muted-foreground"
                                            )}>
                                                <Gift className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-bold text-foreground">Boutique Gifting</h5>
                                                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                                                    Premium wrap & custom note included.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsGifting(!isGifting)}
                                            className={cn(
                                                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none",
                                                isGifting ? "bg-amber-500" : "bg-muted-foreground/20"
                                            )}
                                        >
                                            <span className={cn(
                                                "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg transition-transform",
                                                isGifting ? "translate-x-4" : "translate-x-0"
                                            )} />
                                        </button>
                                    </div>
                                    {isGifting && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-4"
                                        >
                                            <textarea
                                                value={giftMessage}
                                                onChange={(e) => setGiftMessage(e.target.value)}
                                                placeholder="Write a personalized message..."
                                                className="w-full min-h-[80px] p-3 text-xs rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none font-medium placeholder:text-muted-foreground"
                                            />
                                        </motion.div>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground font-medium tracking-tight">Inventory Subtotal</span>
                                        <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground font-medium tracking-tight">Concierge Delivery</span>
                                        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                            <span className="font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-tighter">
                                                Comptoir Unlocked <Check className="h-3.5 w-3.5" />
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground font-bold">Calculated at checkout</span>
                                        )}
                                    </div>
                                    <div className="pt-4 border-t border-border flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black block mb-1">Total Valuation</span>
                                            <span className="text-2xl font-display font-black text-amber-500">{formatPrice(subtotal)}</span>
                                        </div>
                                        <ShimmerButton
                                            className="h-14 px-8 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                            shimmerColor="#F5A623"
                                            background="#F5A623"
                                            onClick={() => {
                                                toggleDrawer()
                                                router.push('/checkout')
                                            }}
                                        >
                                            <span className="flex items-center gap-2 text-black font-black uppercase tracking-tight">
                                                Begin Checkout <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </ShimmerButton>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
