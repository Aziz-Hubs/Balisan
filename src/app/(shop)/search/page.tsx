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

                <div className="flex-1 space-y-6 overflow-visible">
                    <div className="flex items-center justify-between md:hidden">
                        <FilterSheet />
                    </div>
                    {results.length > 0 ? (
                        <ProductGrid products={results} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-zinc-200 dark:border-white/5 rounded-3xl bg-zinc-50/50 dark:bg-white/5 backdrop-blur-sm">
                            <div className="bg-amber-500/10 p-6 rounded-full mb-6">
                                <svg
                                    className="w-12 h-12 text-amber-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white mb-2">
                                {query ? `No results for "${query}"` : "Discover our collection"}
                            </h3>
                            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                                {query
                                    ? "We couldn't find any spirits matching your search. Try different keywords or browse our categories."
                                    : "Search for premium whiskies, rare wines, and artisanal spirits."
                                }
                            </p>
                            <a
                                href="/shop"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                Return to Shop
                            </a>
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
