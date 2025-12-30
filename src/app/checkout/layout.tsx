"use client"

import * as React from "react"
import Link from "next/link"
import { CheckoutNav } from "@/components/features/checkout/CheckoutNav"
import { useCartStore, selectSubtotal } from "@/lib/stores/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const items = useCartStore((state) => state.items)
    const subtotal = useCartStore(selectSubtotal)

    return (
        <div className="container mx-auto min-h-screen py-8 md:py-12 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-baseline justify-between mb-8 border-b pb-8">
                    <Link href="/" className="text-3xl font-display font-bold text-primary">Balisan</Link>
                    <Link href="/cart" className="text-sm font-medium hover:underline">Return to Cart</Link>
                </header>

                <CheckoutNav />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                    <div className="lg:col-span-7">
                        {children}
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="bg-muted/30 border rounded-2xl p-8 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                                        <div className="h-16 w-14 bg-background rounded-lg border overflow-hidden relative flex-shrink-0">
                                            <img src={item.image} alt="" className="h-full w-full object-contain p-1" />
                                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-muted-foreground text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                                        </div>
                                        <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="italic">Step 2: Shipping</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Tax</span>
                                    <span>{formatPrice(subtotal * 0.15)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-xl font-bold pt-2">
                                    <span>Total</span>
                                    <span className="text-primary font-display">{formatPrice(subtotal * 1.15)}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
