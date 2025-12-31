"use client"

import * as React from "react"
import { useFilterStore } from "@/lib/stores/filters"
import { ProductGrid } from "@/components/features/products/ProductGrid"
import { AppliedFilters } from "@/components/features/filters/AppliedFilters"
import { ProductSort } from "@/components/features/products/ProductSort"
import { FilterSheet } from "@/components/features/filters/FilterSheet"
import { Product } from "@/types"

interface ShopContentProps {
    initialProducts: Product[]
}

export function ShopContent({ initialProducts }: ShopContentProps) {
    const {
        category,
        brands,
        priceRange,
        sortBy,
        resetFilters
    } = useFilterStore()

    const filteredProducts = React.useMemo(() => {
        let result = [...initialProducts]

        // Category Filter
        if (category) {
            result = result.filter(p => {
                const pCat = p.category.toLowerCase()
                const fCat = category.toLowerCase()

                if (fCat === pCat) return true

                // Special case for Whiskey/Whisky
                if ((fCat === "whisky" || fCat === "whiskey") &&
                    (pCat === "whisky" || pCat === "whiskey")) {
                    return true
                }

                return false
            })
        }

        // Brand Filter
        if (brands.length > 0) {
            result = result.filter(p => brands.includes(p.brand))
        }

        // Price Filter
        result = result.filter(p => {
            const price = p.discountPrice || p.price
            return price >= priceRange[0] && price <= priceRange[1]
        })

        // Sorting
        result.sort((a, b) => {
            const priceA = a.discountPrice || a.price
            const priceB = b.discountPrice || b.price

            switch (sortBy) {
                case "price_asc":
                    return priceA - priceB
                case "price_desc":
                    return priceB - priceA
                case "rating":
                    return b.rating - a.rating
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case "relevance":
                default:
                    // Sort by rating then review count as a proxy for relevance
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating
                    }
                    return b.reviewCount - a.reviewCount
            }
        })

        return result
    }, [initialProducts, category, brands, priceRange, sortBy])

    return (
        <div className="flex-1 space-y-6 overflow-visible">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">
                        {category ? category : "Shop All"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Showing {filteredProducts.length} products
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <FilterSheet />
                    <ProductSort />
                </div>
            </div>

            <AppliedFilters />

            <ProductGrid products={filteredProducts} />
        </div>
    )
}
