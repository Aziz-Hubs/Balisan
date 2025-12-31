"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, X } from "lucide-react"
import { useCartStore, selectSubtotal } from "@/lib/stores/cart"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

export function CartPreview() {
    const { items, removeItem } = useCartStore()
    const subtotal = useCartStore(selectSubtotal)

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="bg-amber-500/10 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-amber-600" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground">Add some spirits to get started</p>
                </div>
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-2 border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-600"
                >
                    <Link href="/shop">Browse Spirits</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">My Cart ({items.length})</h4>
            </div>

            <Separator className="bg-border/50" />

            <ScrollArea className="h-[280px] -mr-3 pr-3">
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={`${item.id}-${item.variant}`} className="flex gap-3 relative group">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border/50 bg-secondary/20">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1">
                                <Link
                                    href={`/products/${item.id}`} // Assuming ID is slug or we can navigate there
                                    className="text-sm font-medium leading-none hover:text-amber-600 transition-colors line-clamp-1"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {item.variant}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-muted-foreground">Qty: {item.quantity}</span>
                                    <span className="text-amber-600 font-medium">
                                        {formatPrice(item.price * item.quantity)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => removeItem(item.id, item.variant)}
                                className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
                                aria-label="Remove item"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <Separator className="bg-border/50" />

            <div className="space-y-3">
                <div className="flex items-center justify-between font-medium">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-amber-600">
                        {formatPrice(subtotal)}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/cart">View Cart</Link>
                    </Button>
                    <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white" size="sm">
                        <Link href="/checkout">Checkout</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
