"use client"

import * as React from "react"
import { useFilterStore } from "@/lib/stores/filters"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AppliedFilters() {
    const {
        category,
        brands,
        priceRange,
        setFilter,
        resetFilters
    } = useFilterStore()

    const hasFilters = category !== null || brands.length > 0 || (priceRange[0] > 0 || priceRange[1] < 2000)

    if (!hasFilters) return null

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {category && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Category: {category}
                    <button onClick={() => setFilter("category", null)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {brands.map((brand) => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Brand: {brand}
                    <button
                        onClick={() => setFilter("brands", brands.filter(b => b !== brand))}
                        className="hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Price: ${priceRange[0]} - ${priceRange[1]}+
                    <button onClick={() => setFilter("priceRange", [0, 2000])} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            <button
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 ml-1"
            >
                Reset all
            </button>
        </div>
    )
}
