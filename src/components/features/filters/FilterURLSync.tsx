"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useFilterStore } from "@/lib/stores/filters"

export function FilterURLSync() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const {
        category,
        brands,
        priceRange,
        sortBy,
        setFilter
    } = useFilterStore()

    const isUpdatingFromURL = useRef(false)
    const hasInitialized = useRef(false)

    // 1. Sync from URL to Store (on mount and URL change)
    useEffect(() => {
        isUpdatingFromURL.current = true

        const urlCategory = searchParams.get("category")
        if (urlCategory !== category) {
            setFilter("category", urlCategory)
        }

        const urlBrands = searchParams.getAll("brand")
        if (JSON.stringify(urlBrands) !== JSON.stringify(brands)) {
            setFilter("brands", urlBrands)
        }

        const minPrice = searchParams.get("minPrice")
        const maxPrice = searchParams.get("maxPrice")
        if (minPrice || maxPrice) {
            const newRange: [number, number] = [
                minPrice ? parseInt(minPrice) : 0,
                maxPrice ? parseInt(maxPrice) : 2000
            ]
            if (JSON.stringify(newRange) !== JSON.stringify(priceRange)) {
                setFilter("priceRange", newRange)
            }
        }

        const urlSort = searchParams.get("sort")
        if (urlSort && urlSort !== sortBy) {
            setFilter("sortBy", urlSort as any)
        }

        isUpdatingFromURL.current = false
        hasInitialized.current = true
    }, [searchParams]) // Only re-run when searchParams change

    // 2. Sync from Store to URL
    useEffect(() => {
        if (isUpdatingFromURL.current || !hasInitialized.current) return

        const params = new URLSearchParams()

        if (category) params.set("category", category)

        brands.forEach(brand => params.append("brand", brand))

        if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
        if (priceRange[1] < 2000) params.set("maxPrice", priceRange[1].toString())

        if (sortBy !== "relevance") params.set("sort", sortBy)

        const queryString = params.toString()
        const newURL = `${pathname}${queryString ? `?${queryString}` : ""}`

        // Use replace to avoid polluting history with every filter change
        router.replace(newURL, { scroll: false })
    }, [category, brands, priceRange, sortBy, pathname, router])

    return null
}
