"use client"

import * as React from "react"
import { ProductGrid } from "@/components/features/products/ProductGrid"
import { useFilterStore } from "@/lib/stores/filters"
import { ALL_PRODUCTS } from "@/data/mock"

export function ShopContent() {
    const {
        category,
        priceRange,
        brands,
        minRating,
        sortBy
    } = useFilterStore()

    const filteredProducts = React.useMemo(() => {
        return ALL_PRODUCTS.filter(product => {
            // Category filter
            if (category && product.category.toLowerCase() !== category.toLowerCase()) {
                // Special case for Whiskey/Whisky
                if (category.toLowerCase() === "whisky" || category.toLowerCase() === "whiskey") {
                    if (product.category.toLowerCase() !== "whiskey" && product.category.toLowerCase() !== "whisky") {
                        return false
                    }
                } else {
                    return false
                }
            }

            // Price filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false
            }

            // Brand filter
            if (brands.length > 0 && !brands.includes(product.brand)) {
                return false
            }

            // Rating filter
            if (product.rating < minRating) {
                return false
            }

            return true
        }).sort((a, b) => {
            switch (sortBy) {
                case "price_asc":
                    return a.price - b.price
                case "price_desc":
                    return b.price - a.price
                case "rating":
                    return b.rating - a.rating
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                default:
                    return 0
            }
        })
    }, [category, priceRange, brands, minRating, sortBy])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-bold tracking-tight">
                    {category || "Shop All"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} results
                </p>
            </div>
            <ProductGrid products={filteredProducts} />
        </div>
    )
}
