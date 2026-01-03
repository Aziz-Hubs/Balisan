"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AppliedFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const category = searchParams.get("category")
    const brandParams = searchParams.getAll("brand")
    const countryParams = searchParams.getAll("country")
    const regionParams = searchParams.getAll("region")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")

    const hasFilters = category !== null || brandParams.length > 0 || countryParams.length > 0 || regionParams.length > 0 || minPriceParam !== null || maxPriceParam !== null

    if (!hasFilters) return null

    const updateUrl = (updates: Record<string, string | string[] | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key)
            } else if (Array.isArray(value)) {
                params.delete(key)
                value.forEach(v => params.append(key, v))
            } else {
                params.set(key, value)
            }
        })
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const clearAll = () => {
        router.replace(pathname, { scroll: false })
    }

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {category && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Category: {category}
                    <button onClick={() => updateUrl({ category: null })} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {brandParams.map((brand) => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Brand: {brand}
                    <button
                        onClick={() => updateUrl({ brand: brandParams.filter(b => b !== brand) })}
                        className="hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {countryParams.map((country) => (
                <Badge key={country} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Country: {country}
                    <button
                        onClick={() => updateUrl({ country: countryParams.filter(c => c !== country) })}
                        className="hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {regionParams.map((region) => (
                <Badge key={region} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Region: {region}
                    <button
                        onClick={() => updateUrl({ region: regionParams.filter(r => r !== region) })}
                        className="hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {(minPriceParam || maxPriceParam) && (
                <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-md">
                    Price: ${minPriceParam || 0} - ${maxPriceParam || 2000}+
                    <button onClick={() => updateUrl({ minPrice: null, maxPrice: null })} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 ml-1"
            >
                Reset all
            </button>
        </div>
    )
}
