import React from "react"
import { ProductGrid } from "@/components/features/products/ProductGrid"
import { searchProducts } from "@/services"
import { FilterSidebar } from "@/components/features/filters/FilterSidebar"
import { FilterSheet } from "@/components/features/filters/FilterSheet"

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function SearchResults({ query }: { query: string }) {
    const results = query ? await searchProducts(query) : []

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold tracking-tight">Search Results</h1>
                <p className="text-muted-foreground mt-2">
                    {query ? `Found ${results.length} results for "${query}"` : "Enter a search term"}
                </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                <aside className="hidden w-64 flex-shrink-0 md:block sticky top-24">
                    <FilterSidebar />
                </aside>

                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between md:hidden">
                        <FilterSheet />
                    </div>
                    {results.length > 0 ? (
                        <ProductGrid products={results} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground">
                                {query
                                    ? `No products found matching "${query}"`
                                    : "Search for premium spirits, wines and more."
                                }
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams
    const query = typeof params.q === 'string' ? params.q : ""

    return (
        <React.Suspense fallback={<div className="container mx-auto py-12 text-center">Searching the cellar...</div>}>
            <SearchResults query={query} />
        </React.Suspense>
    )
}
