import { ShopContent } from "@/components/features/products/ShopContent"
import { FilterSidebar } from "@/components/features/filters/FilterSidebar"
import { FilterSheet } from "@/components/features/filters/FilterSheet"
import { getProducts } from "@/services"
import { notFound } from "next/navigation"
import { FilterURLSync } from "@/components/features/filters/FilterURLSync"
import { Suspense } from "react"
import { navigationCategories, CategoryItem } from "@/config/navigation"

interface CollectionsPageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
    const { slug } = await params

    if (!slug || slug.length === 0) {
        return notFound()
    }

    const collectionType = slug[0] // e.g., 'featured', 'occasions', 'curated'
    const collectionSubType = slug[1] // e.g., 'new-arrivals', 'gifts', 'staff-picks'

    // Find metadata from navigation config
    const collectionCategory = navigationCategories.find(c => c.href === '/collections')
    const categoryGroup = collectionCategory?.items.find(item => item.href.includes(collectionType))
    const currentItem = categoryGroup?.subcategories?.find(sub => sub.href.endsWith(collectionSubType || collectionType))

    const title = currentItem?.title || categoryGroup?.title || "Collection"
    const description = currentItem?.description || categoryGroup?.description || "Curated selection"

    // Determine Filters
    const filters: any = {
        limit: 12
    }

    // Map slugs to generic filters
    if (collectionSubType === 'new-arrivals') filters.isNew = true
    if (collectionSubType === 'limited') filters.isLimited = true
    if (collectionSubType === 'best-sellers') filters.sort = 'rating' // or specific field
    if (collectionSubType === 'staff-picks') filters.tags = ['Staff Pick']
    if (collectionSubType === 'rare') filters.tags = ['Rare']
    if (collectionSubType === 'value') filters.maxPrice = 70

    // Occasions mapping (using tags)
    if (collectionType === 'occasions') {
        // Should map to tags, e.g. "Gifts", "Corporate", "Dinner Party"
        // Simple mapping for now based on title
        // If title is "Gifts" -> tag "Gift"
        if (currentItem?.title) filters.tags = [currentItem.title]
    }

    const products = await getProducts(filters)

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <Suspense fallback={null}>
                <FilterURLSync />
            </Suspense>
            <div className="mb-8 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-2 capitalize">
                    <span>Home</span>
                    <span>/</span>
                    <span>Collections</span>
                    <span>/</span>
                    <span className="text-foreground font-medium">{title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">{title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    {description}
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Collections often have less sidebar filters, but we can keep it if needed. 
                     For specific collections like 'New Arrivals', generic filters might be distracting or redundant 
                     if they conflict. But standard e-comm practice allows filtering within a collection.
                 */}

                <div className="w-full">
                    {products.length > 0 ? (
                        <ShopContent initialProducts={products} baseFilters={filters} />
                    ) : (
                        <div className="py-24 text-center bg-muted/30 rounded-xl">
                            <h3 className="text-xl font-medium mb-2">Collection Empty</h3>
                            <p className="text-muted-foreground">We are currently curating this collection. Check back soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
