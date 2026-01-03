"use client"

import { Product } from "@/types"
import { ProductCard } from "@/components/features/products/ProductCard"

interface ProductGridProps {
    products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted-foreground">No products found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 p-2 md:p-4 auto-rows-fr">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
