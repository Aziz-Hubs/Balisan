'use server'

import { getProducts } from "@/services"
import { Product } from "@/types"

export async function loadMoreProducts(
    page: number,
    params: {
        category?: string;
        subcategory?: string; // Added subcategory support while we are at it
        brand?: string | string[];
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        isNew?: boolean;
        isFeatured?: boolean;
        isLimited?: boolean;
        tags?: string[];
    }
): Promise<Product[]> {
    return await getProducts({
        page,
        limit: 12, // Match the initial limit or consistent grid size
        category: params.category,
        subcategory: params.subcategory,
        brands: typeof params.brand === 'string' ? [params.brand] : params.brand,
        minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
        sort: params.sort,
        isNew: params.isNew,
        isFeatured: params.isFeatured,
        isLimited: params.isLimited,
        tags: params.tags
    })
}
