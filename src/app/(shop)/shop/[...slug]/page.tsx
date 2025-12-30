import { ShopContent } from "@/components/features/products/ShopContent"
import { FilterSidebar } from "@/components/features/filters/FilterSidebar"
import { FilterSheet } from "@/components/features/filters/FilterSheet"
import { getProducts } from "@/services"
import { notFound } from "next/navigation"
import { FilterURLSync } from "@/components/features/filters/FilterURLSync"
import { Suspense } from "react"

interface CategoryPageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params

    // Handle potential missing slug
    if (!slug || slug.length === 0) {
        return notFound()
    }

    const categorySlug = slug[0]
    const subcategorySlug = slug[1]

    const categoryName = decodeURIComponent(categorySlug)
    const subcategoryName = subcategorySlug ? decodeURIComponent(subcategorySlug) : null

    // Fetch products from Supabase
    const products = await getProducts({
        category: categorySlug,
        subcategory: subcategorySlug
    })

    const title = subcategoryName
        ? `${subcategoryName} - ${categoryName}`
        : categoryName

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            <Suspense fallback={null}>
                <FilterURLSync />
            </Suspense>
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 capitalize">
                    <span>Home</span>
                    <span>/</span>
                    <span>{categoryName}</span>
                    {subcategoryName && (
                        <>
                            <span>/</span>
                            <span>{subcategoryName}</span>
                        </>
                    )}
                </div>
                <h1 className="text-3xl font-display font-bold capitalize tracking-tight">{subcategoryName || categoryName}</h1>
                <p className="text-muted-foreground mt-2">
                    {subcategoryName
                        ? `Explore our collection of premium ${subcategoryName}.`
                        : `Browse our selection of premium ${categoryName}.`
                    }
                </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                <aside className="hidden w-64 flex-shrink-0 md:block sticky top-24">
                    <FilterSidebar />
                </aside>

                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="block md:hidden">
                            <FilterSheet />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Showing {products.length} results
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <ShopContent initialProducts={products} />
                    ) : (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-medium">No products found</h3>
                            <p className="text-muted-foreground mt-1">Try checking back later for new arrivals.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
