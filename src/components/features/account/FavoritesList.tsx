"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Trash2 } from "lucide-react"
import { useCollectionsStore } from "@/lib/stores/collections"
import { useCartStore } from "@/lib/stores/cart"
import { PRODUCTS } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

export function FavoritesList() {
    const { items, removeItem } = useCollectionsStore()
    const addToCart = useCartStore((state) => state.addItem)

    // Get full product data for saved items
    const favorites = items
        .map(item => PRODUCTS.find(p => p.id === item.productId))
        .filter(Boolean)

    const handleAddToCart = (product: any) => {
        addToCart(product)
        toast.success("Added to cart", {
            description: `${product.name} has been added to your cart.`,
            className: "bg-zinc-900 border-amber-500/50 text-white"
        })
    }

    const handleRemove = (productId: string, productName: string) => {
        removeItem(productId)
        toast.success("Removed from collection", {
            description: `${productName} has been removed from your collection.`,
            className: "bg-zinc-900 border-zinc-700 text-white"
        })
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p>No favorites yet. Start adding products to your collection!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((item: any) => (
                <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative bg-muted/50">
                        <Link href={`/products/${item.slug}`} className="block w-full h-full">
                            <div className="relative w-full h-full bg-secondary/20">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        </Link>
                        {!item.inStock && (
                            <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
                        )}
                    </div>
                    <CardContent className="p-4 flex-1">
                        <Link href={`/products/${item.slug}`}>
                            <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-amber-500 transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-muted-foreground ml-1">({item.reviewCount})</span>
                        </div>
                        <div className="mt-3 text-xl font-bold">${item.price.toFixed(2)}</div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2">
                        <Button
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                            disabled={!item.inStock}
                            onClick={() => handleAddToCart(item)}
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
                            onClick={() => handleRemove(item.id, item.name)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
