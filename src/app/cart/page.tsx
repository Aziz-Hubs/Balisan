"use client"

import * as React from "react"
import Link from "next/link"
import { useCartStore, selectTotalItems, selectSubtotal } from "@/lib/stores/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ArrowRight, Gift, Archive } from "lucide-react"
import { MultiAddressGiftManager } from "@/components/features/cart/MultiAddressGiftManager"
import { BulkOrderUpload } from "@/components/features/cart/BulkOrderUpload"
import { BreadcrumbNavigator } from "@/components/layouts/BreadcrumbNavigator"
import { CartProgress } from "@/components/features/cart/CartProgress"
import { AuroraBackground } from "@/components/ui/extension/AuroraBackground"

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCartStore()
    const totalItems = useCartStore(selectTotalItems)
    const subtotal = useCartStore(selectSubtotal)
    const FREE_SHIPPING_THRESHOLD = 150

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Archive className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    You haven't added any premium selections to your cart yet. Browse our collection to find something special.
                </p>
                <Button asChild size="lg">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <AuroraBackground>
            <div className="container mx-auto py-8 md:py-12 px-4 md:px-6 relative z-10">
                <BreadcrumbNavigator items={[{ label: "Shopping Cart", href: "/cart" }]} />

                <h1 className="text-4xl font-display font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Cart Items List */}
                        <div className="border rounded-2xl overflow-hidden bg-background shadow-sm">
                            <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
                                <h2 className="font-semibold">Items ({totalItems})</h2>
                                <button className="text-xs text-muted-foreground hover:text-primary transition-colors">Select all</button>
                            </div>
                            <div className="divide-y">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.variant}`} className="p-6 flex flex-col sm:flex-row gap-6">
                                        <div className="h-32 w-28 bg-muted rounded-xl flex-shrink-0 overflow-hidden border">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{item.variant || "Standard Edition"}</p>
                                                </div>
                                                <p className="text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border rounded-lg overflow-hidden bg-background">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                                                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-12 text-center font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                                        className="h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id, item.variant)}
                                                    className="text-muted-foreground hover:text-destructive flex items-center gap-2 text-sm font-medium"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Phase D3 Feature: Multi-Address Gifting Manager */}
                        <MultiAddressGiftManager />
                        <BulkOrderUpload />
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="border rounded-2xl p-6 bg-background shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="mb-6">
                                <CartProgress subtotal={subtotal} threshold={FREE_SHIPPING_THRESHOLD} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping estimate</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Tax estimate</span>
                                    <span>{formatPrice(subtotal * 0.15)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-2xl font-bold pt-2">
                                    <span>Total</span>
                                    <span className="text-primary">{formatPrice(subtotal * 1.15)}</span>
                                </div>
                            </div>

                            <Button className="w-full h-14 text-lg font-display mt-8 shadow-lg shadow-primary/20" asChild>
                                <Link href="/checkout">
                                    Checkout Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-dashed text-xs text-muted-foreground space-y-2">
                                <p className="flex items-center gap-2">
                                    <Gift className="h-3 w-3" />
                                    Gift options available at next step
                                </p>
                                <p>Taxes and shipping calculated based on final destination.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuroraBackground>
    )
}
