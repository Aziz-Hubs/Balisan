import { FilterSidebar } from "@/components/features/filters/FilterSidebar"
import { ShopContent } from "@/components/features/products/ShopContent"
import { getProducts, getFacets } from "@/services"
import { BreadcrumbNavigator } from "@/components/layouts/BreadcrumbNavigator"
import { Suspense } from "react"

interface ShopPageProps {
    searchParams: Promise<{
        category?: string
        brand?: string | string[]
        country?: string | string[]
        region?: string | string[]
        minPrice?: string
        maxPrice?: string
        sort?: string
    }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const [products, { categories: facetCategories }] = await Promise.all([
        getProducts({
            category: params.category,
            brands: typeof params.brand === 'string' ? [params.brand] : params.brand,
            countries: typeof params.country === 'string' ? [params.country] : params.country,
            regions: typeof params.region === 'string' ? [params.region] : params.region,
            minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
            maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
            sort: params.sort,
        }),
        getFacets()
    ]);

    // Fallback if no categories in DB yet
    const displayCategories = facetCategories.length > 0
        ? facetCategories
        : ["Whiskey", "Vodka", "Gin", "Rum", "Tequila", "Wine", "Beer", "Liqueur"];

    const breadcrumbItems = [
        { label: "Shop", href: "/shop" },
        {
            label: "All Categories",
            options: displayCategories.map(cat => ({
                label: cat,
                href: `/shop/${cat.toLowerCase()}`
            }))
        }
    ]

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <BreadcrumbNavigator items={breadcrumbItems} />
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                {/* Sidebar - Desktop */}
                <aside className="hidden w-64 flex-shrink-0 md:block sticky top-24">
                    <FilterSidebar />
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <ShopContent initialProducts={products} />
                </div>
            </div>
        </div>
    )
}
