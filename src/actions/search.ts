"use server"

import { searchProducts as serviceSearchProducts } from "@/services/products"
import { Product } from "@/types"

export async function searchProductsAction(query: string): Promise<Product[]> {
    try {
        return await serviceSearchProducts(query)
    } catch (error) {
        console.error("Search action error:", error)
        return []
    }
}
