"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Trash2 } from "lucide-react"
import { mockFavorites } from "@/lib/mock-data"
import Image from "next/image"

// Safe mock hook in case real store is missing
const useMockCart = () => {
    return {
        addItem: (item: any) => {
            // Try to find the real store in window or just alert
            alert(`[Mock] Added ${item.name} to cart`)
        }
    }
}

export function FavoritesList() {
    const favorites = mockFavorites
    const { addItem } = useMockCart()

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((item) => (
                <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative bg-muted/50">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <div className="relative w-full h-full bg-secondary/20">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        {!item.inStock && (
                            <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
                        )}
                    </div>
                    <CardContent className="p-4 flex-1">
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-muted-foreground ml-1">({item.reviewCount})</span>
                        </div>
                        <div className="mt-3 text-xl font-bold">${item.price.toFixed(2)}</div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2">
                        <Button className="flex-1" disabled={!item.inStock} onClick={() => addItem(item)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon" className="text-muted-foreground hover:text-destructive hover:border-destructive/50">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
