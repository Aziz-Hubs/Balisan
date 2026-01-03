"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { LayoutGrid, List as ListIcon, Loader2 } from "lucide-react"

import { ProductGrid } from "@/components/features/products/ProductGrid"
import { ProductList } from "@/components/features/products/ProductList"
import { AppliedFilters } from "@/components/features/filters/AppliedFilters"
import { ProductSort } from "@/components/features/products/ProductSort"
import { FilterSheet } from "@/components/features/filters/FilterSheet"
import { Product } from "@/types"
import { loadMoreProducts } from "@/app/actions/shop"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton, ProductListSkeleton } from "@/components/features/products/skeletons"

interface ShopContentProps {
    initialProducts: Product[]
    baseFilters?: {
        isNew?: boolean
        isFeatured?: boolean
        isLimited?: boolean
        tags?: string[]
        category?: string
    }
}

export function ShopContent({ initialProducts, baseFilters }: ShopContentProps) {
    const searchParams = useSearchParams()

    // Data State
    const [products, setProducts] = React.useState<Product[]>(initialProducts)
    const [page, setPage] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(true)
    const [isLoadingMore, setIsLoadingMore] = React.useState(false)

    // UI State
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

    // Intersection Observer for Infinite Scroll
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "100px",
    })

    // Reset when params change (New Filter = Reset List)
    React.useEffect(() => {
        setProducts(initialProducts)
        setPage(1)
        setHasMore(initialProducts.length >= 12)
    }, [initialProducts, searchParams])

    // Load More Logic
    const loadMore = async () => {
        if (isLoadingMore || !hasMore) return

        setIsLoadingMore(true)
        const nextPage = page + 1

        try {
            // Reconstruct params from URL
            const params = {
                category: searchParams.get("category") || baseFilters?.category || undefined,
                subcategory: searchParams.get("subcategory") || undefined,
                brand: searchParams.getAll("brand"),
                minPrice: searchParams.get("minPrice") || undefined,
                maxPrice: searchParams.get("maxPrice") || undefined,
                sort: searchParams.get("sort") || undefined,
                // Merge base filters
                isNew: baseFilters?.isNew,
                isFeatured: baseFilters?.isFeatured,
                isLimited: baseFilters?.isLimited,
                tags: baseFilters?.tags,
            }

            const newProducts = await loadMoreProducts(nextPage, params)

            if (newProducts.length === 0) {
                setHasMore(false)
            } else {
                setProducts(prev => [...prev, ...newProducts])
                setPage(nextPage)
                if (newProducts.length < 12) {
                    setHasMore(false)
                }
            }
        } catch (error) {
            console.error("Failed to load more products:", error)
        } finally {
            setIsLoadingMore(false)
        }
    }

    // Trigger load more when in view
    React.useEffect(() => {
        if (inView && hasMore) {
            loadMore()
        }
    }, [inView, hasMore])

    return (
        <div className="flex-1 space-y-6 overflow-visible">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">
                        Shop All
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Showing {products.length} products
                    </p>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar sm:pb-0">
                    <FilterSheet />

                    {/* View Toggle */}
                    <div className="flex items-center border rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-zinc-200 dark:border-white/10 p-1 shadow-sm">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-lg transition-all ${viewMode === "grid" ? "bg-amber-500 text-black shadow-sm" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-lg transition-all ${viewMode === "list" ? "bg-amber-500 text-black shadow-sm" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                            onClick={() => setViewMode("list")}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <ProductSort />
                </div>
            </div>

            <AppliedFilters />

            {viewMode === "grid" ? (
                <ProductGrid products={products} />
            ) : (
                <ProductList products={products} />
            )}



            {/* Loading Skeleton / Trigger */}
            <div ref={ref} className="w-full">
                {isLoadingMore ? (
                    viewMode === "grid" ? <ProductGridSkeleton /> : <ProductListSkeleton />
                ) : (
                    /* Invisible trigger area when not loading but has more */
                    hasMore && <div className="h-20 w-full" />
                )}

                {!hasMore && products.length > 0 && (
                    <div className="py-12 flex items-center justify-center gap-4 opacity-50">
                        <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">End of List</span>
                        <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                )}
            </div>

        </div>
    )
}
