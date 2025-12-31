"use client"

import { useCollectionsStore } from "@/lib/stores/collections"
import { useCartStore } from "@/lib/stores/cart"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Trash2, Heart, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS } from "@/lib/mock-data"
import { toast } from "sonner"

export default function CollectionPage() {
    const { items, removeItem } = useCollectionsStore()
    const addToCart = useCartStore((state) => state.addItem)

    // Get full product data for saved items
    const collectionProducts = items
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

    if (collectionProducts.length === 0) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">
                        My Collection
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Your curated selection of premium spirits.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                        <Heart className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your collection is empty</h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                        Start building your collection by clicking the heart icon on any product you love.
                    </p>
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                        <Link href="/shop">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Browse Products
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">
                        My Collection
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {collectionProducts.length} {collectionProducts.length === 1 ? 'item' : 'items'} in your collection
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/shop">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Continue Shopping
                    </Link>
                </Button>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {collectionProducts.map((item: any) => (
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
                            {item.discountPrice && item.discountPrice < item.price && (
                                <Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
                                    -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                </Badge>
                            )}
                        </div>
                        <CardContent className="p-4 flex-1">
                            <Link href={`/products/${item.slug}`}>
                                <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-amber-500 transition-colors">
                                    {item.name}
                                </h3>
                            </Link>
                            <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
                            <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium">{item.rating}</span>
                                <span className="text-muted-foreground ml-1">({item.reviewCount})</span>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                {item.discountPrice ? (
                                    <>
                                        <span className="text-xl font-bold text-emerald-600">${item.discountPrice.toFixed(2)}</span>
                                        <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                                )}
                            </div>
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
        </div>
    )
}
