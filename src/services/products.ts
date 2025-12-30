/**
 * Products Service
 * 
 * Type-safe data fetching for products.
 * Currently uses local mock data to ensure correct image loading.
 */

// import { createClient } from '@/lib/supabase/server' // Disabled: using mock data
import type { Product } from '@/types'
import {
    ALL_PRODUCTS,
    getProductBySlug as getMockProductBySlug,
    getProductById as getMockProductById,
    getFeaturedProducts as getMockFeaturedProducts,
    getNewArrivals as getMockNewArrivals,
    searchProducts as searchMockProducts
} from '@/data/mock'

export async function getProducts(options?: {
    category?: string
    subcategory?: string
    minPrice?: number
    maxPrice?: number
    brands?: string[]
    limit?: number
    inStock?: boolean
}) {
    // Artificial delay to simulate network
    // await new Promise(resolve => setTimeout(resolve, 100))

    let filtered = [...ALL_PRODUCTS]

    if (options?.inStock !== false) {
        filtered = filtered.filter(p => p.inStock)
    }

    if (options?.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === options.category?.toLowerCase() ||
            p.category.toLowerCase().replace(' ', '-') === options.category?.toLowerCase())
    }

    if (options?.subcategory) {
        filtered = filtered.filter(p => p.subcategory?.toLowerCase() === options.subcategory?.toLowerCase())
    }

    if (options?.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= (options.minPrice as number))
    }

    if (options?.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= (options.maxPrice as number))
    }

    if (options?.brands && options.brands.length > 0) {
        const brandSet = new Set(options.brands.map(b => b.toLowerCase()))
        filtered = filtered.filter(p => brandSet.has(p.brand.toLowerCase()))
    }

    // Sort by created at desc by default (to match DB default)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (options?.limit) {
        filtered = filtered.slice(0, options.limit)
    }

    return filtered
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const product = getMockProductBySlug(slug)
    return product || null
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = getMockProductById(id)
    return product || null
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
    return getMockFeaturedProducts(limit)
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
    return getMockNewArrivals(limit)
}

export async function getProductsByCategory(categorySlug: string, limit?: number): Promise<Product[]> {
    let products = ALL_PRODUCTS.filter(p =>
        p.category.toLowerCase() === categorySlug.toLowerCase() ||
        p.category.toLowerCase().replace(' ', '-') === categorySlug.toLowerCase()
    )

    if (limit) {
        products = products.slice(0, limit)
    }

    return products
}

export async function searchProducts(query: string): Promise<Product[]> {
    return searchMockProducts(query)
}

export async function getFacets(): Promise<{ categories: string[], brands: string[] }> {
    const categorySet = new Set(ALL_PRODUCTS.map(p => p.category).filter(Boolean))
    const brandSet = new Set(ALL_PRODUCTS.map(p => p.brand).filter(Boolean))

    return {
        categories: Array.from(categorySet).sort(),
        brands: Array.from(brandSet).sort()
    }
}
