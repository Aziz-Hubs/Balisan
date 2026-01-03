/**
 * Products Service
 * 
 * Type-safe data fetching for products from Supabase.
 * Falls back to mock data if database is empty or query fails.
 */

import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types'
import {
    ALL_PRODUCTS,
    getProductBySlug as getMockProductBySlug,
    getProductById as getMockProductById,
    getFeaturedProducts as getMockFeaturedProducts,
    getNewArrivals as getMockNewArrivals,
    searchProducts as searchMockProducts,
    getProductsByCategory as getMockProductsByCategory,
    getMockCategories
} from '@/data/mock'

import type { Category } from '@/types'

// ============ EXPORTED FUNCTIONS ============

export async function getProducts(options?: {
    category?: string
    subcategory?: string
    minPrice?: number
    maxPrice?: number
    brands?: string[]
    countries?: string[]
    regions?: string[]
    limit?: number
    page?: number // 1-indexed
    inStock?: boolean
    sort?: string
    tags?: string[]
    isLimited?: boolean
    isFeatured?: boolean
    isNew?: boolean
}): Promise<Product[]> {
    try {
        const supabase = await createClient()
        const page = options?.page || 1
        const limit = options?.limit || 12
        const from = (page - 1) * limit
        const to = from + limit - 1

        let query = supabase
            .from('products')
            .select(`
                *,
                categories (*),
                brands (*)
            `)

        // Apply filters
        if (options?.inStock !== false) {
            query = query.eq('in_stock', true)
        }
        if (options?.minPrice !== undefined) {
            query = query.gte('price', options.minPrice)
        }
        if (options?.maxPrice !== undefined) {
            query = query.lte('price', options.maxPrice)
        }

        // Brand filtering
        if (options?.brands && options.brands.length > 0) {
            // Need to handle if brands are slugs or IDs. Assuming names for now as per current UI.
            // Ideally should be brand_id but current mock/UI uses names.
            // Let's check products.brands.name
            query = query.in('brand', options.brands)
        }

        // Country & Region filtering
        if (options?.countries && options.countries.length > 0) {
            query = query.in('country', options.countries)
        }
        if (options?.regions && options.regions.length > 0) {
            query = query.in('region', options.regions)
        }

        // Category filtering (simplified for now, ideally use !inner join)
        // Note: In a real app with strict RLS/Foreign Keys, you'd filter on the relation.
        // For this demo, we assume the frontend sends valid category slugs or we handle it in application logic if needed.
        // Since we are fetching *all* and filtering in memory for complex relations often in MVPs, 
        // but for 'category' column on products table (if it exists as a denormalized field) or via relation:
        /* 
        if (options?.category) {
             query = query.eq('categories.slug', options.category) // This requires !inner on categories
        } 
        */

        // Boolean flags
        if (options?.isNew) {
            query = query.eq('is_new', true)
        }
        if (options?.isFeatured) {
            query = query.eq('is_featured', true)
        }
        // Assuming 'is_limited' or similar field exists, or we check tags
        if (options?.isLimited) {
            // query = query.eq('is_limited', true) 
            // OR check tags if no explicit column
            query = query.contains('tags', ['Limited Edition'])
        }

        if (options?.tags && options.tags.length > 0) {
            query = query.contains('tags', options.tags)
        }


        // Sorting
        const sort = options?.sort || "relevance"
        switch (sort) {
            case "price_asc": query = query.order('price', { ascending: true }); break;
            case "price_desc": query = query.order('price', { ascending: false }); break;
            case "rating": query = query.order('rating', { ascending: false }); break;
            case "newest": query = query.order('created_at', { ascending: false }); break;
            default: query = query.order('created_at', { ascending: false });
        }

        query = query.range(from, to)

        const { data, error } = await query

        if (error) throw error
        if (!data) return []

        // Cast and map
        return data.map((item: any) => ({
            ...item,
            // Map the FIRST image from the array to the 'image' property expected by UI
            image: item.images?.[0] || '/bottle.png',
            // Ensure brand/category are objects (Supabase join returns objects or arrays depending on relationship)
            brand: Array.isArray(item.brands) ? item.brands[0] : item.brands,
            categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
        })) as Product[]
    } catch (err) {
        console.error('getProducts error:', err)

        // Mock Fallback with detailed filtering
        let results = ALL_PRODUCTS as unknown as Product[];

        if (options?.category) {
            results = results.filter(p => {
                const cat = typeof p.categories === 'object' ? (p.categories as any)?.slug : p.category;
                return cat === options.category;
            });
        }
        if (options?.subcategory) {
            results = results.filter(p => {
                const sub = (p as any).subcategory;
                return sub === options.subcategory;
            });
        }

        if (options?.isNew) {
            results = results.filter(p => p.is_new);
        }
        if (options?.isFeatured) {
            results = results.filter(p => (p as any).is_featured);
        }
        if (options?.isLimited) {
            results = results.filter(p => p.tags?.includes('Limited Edition'));
        }
        if (options?.brands && options.brands.length > 0) {
            results = results.filter(p => {
                const b = typeof p.brand === 'object' ? (p.brand as any)?.name : p.brand;
                return options.brands!.includes(b);
            });
        }
        if (options?.countries && options.countries.length > 0) {
            results = results.filter(p => p.country && options.countries!.includes(p.country));
        }
        if (options?.regions && options.regions.length > 0) {
            results = results.filter(p => p.region && options.regions!.includes(p.region));
        }
        if (options?.tags && options.tags.length > 0) {
            results = results.filter(p => options.tags!.some(tag => p.tags?.includes(tag)));
        }

        return results.slice(0, options?.limit || 12);
    }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .eq('slug', slug)
            .single()

        if (error || !data) throw error

        const productData = data as any
        const product = {
            ...productData,
            image: productData.images?.[0] || '/bottle.png',
            brand: Array.isArray(productData.brands) ? productData.brands[0] : productData.brands,
            categories: Array.isArray(productData.categories) ? productData.categories[0] : productData.categories
        } as unknown as Product

        return product
    } catch (err) {
        console.error('getProductBySlug error:', err)
        return getMockProductBySlug(slug) as unknown as Product
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .eq('id', id)
            .single()

        if (error || !data) throw error

        const productData = data as any
        const product = {
            ...productData,
            image: productData.images?.[0] || '/bottle.png',
            brand: Array.isArray(productData.brands) ? productData.brands[0] : productData.brands,
            categories: Array.isArray(productData.categories) ? productData.categories[0] : productData.categories
        } as unknown as Product

        return product
    } catch (err) {
        console.error('getProductById error:', err)
        return getMockProductById(id) as unknown as Product
    }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .eq('is_featured', true)
            .limit(limit)

        if (error || !data) throw error

        return data.map((item: any) => ({
            ...item,
            image: item.images?.[0] || '/bottle.png',
            brand: Array.isArray(item.brands) ? item.brands[0] : item.brands,
            categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
        })) as Product[]
    } catch (err) {
        return getMockFeaturedProducts(limit) as unknown as Product[]
    }
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .eq('is_new', true)
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error || !data) throw error

        return data.map((item: any) => ({
            ...item,
            image: item.images?.[0] || '/bottle.png',
            brand: Array.isArray(item.brands) ? item.brands[0] : item.brands,
            categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
        })) as Product[]
    } catch (err) {
        return getMockNewArrivals(limit) as unknown as Product[]
    }
}

export async function getProductsByCategory(categorySlug: string, limit = 12): Promise<Product[]> {
    try {
        const supabase = await createClient()
        // Resolve category first
        const { data: cat } = await supabase.from('categories').select('id').eq('slug', categorySlug).single()

        let query = supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .limit(limit)

        if (cat) {
            query = query.eq('category_id', (cat as any).id)
        }

        const { data, error } = await query
        if (error || !data) throw error

        return data.map((item: any) => ({
            ...item,
            image: item.images?.[0] || '/bottle.png',
            brand: Array.isArray(item.brands) ? item.brands[0] : item.brands,
            categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
        })) as Product[]
    } catch (err) {
        return getMockProductsByCategory(categorySlug) as unknown as Product[]
    }
}

export async function searchProducts(query: string): Promise<Product[]> {
    if (!query) return []
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories(*), brands(*)`)
            .textSearch('name', query) // Using Index
            .limit(20)

        if (error || !data) throw error

        return data.map((item: any) => ({
            ...item,
            image: item.images?.[0] || '/bottle.png',
            brand: Array.isArray(item.brands) ? item.brands[0] : item.brands,
            categories: Array.isArray(item.categories) ? item.categories[0] : item.categories
        })) as Product[]
    } catch (err) {
        return searchMockProducts(query) as unknown as Product[]
    }
}

export async function getFacets() {
    try {
        const supabase = await createClient()

        const [
            { data: categoriesData },
            { data: brandsData },
            { data: countriesData },
            { data: regionsData }
        ] = await Promise.all([
            supabase.from('categories').select('name').order('name'),
            supabase.from('brands').select('name').order('name'),
            supabase.from('products').select('country').not('country', 'is', null).order('country'),
            supabase.from('products').select('region').not('region', 'is', null).order('region')
        ])

        // Extract unique values from products table for country/region
        // Since Supabase doesn't have a direct distinct yet, we map and filter
        const uniqueCountries = Array.from(new Set(countriesData?.map(p => p.country).filter(Boolean))) as string[]
        const uniqueRegions = Array.from(new Set(regionsData?.map(p => p.region).filter(Boolean))) as string[]

        return {
            categories: categoriesData?.map(c => c.name) || [],
            brands: brandsData?.map(b => b.name) || [],
            countries: uniqueCountries,
            regions: uniqueRegions
        }
    } catch (err) {
        console.error('getFacets error:', err)
        // Fallback to comprehensive mock data
        return {
            categories: ["Whiskey", "Vodka", "Gin", "Rum", "Tequila", "Wine", "Beer", "Liqueur"],
            brands: ["Macallan", "Grey Goose", "Hendrick's", "Bacardi", "Patron", "Moët & Chandon", "Heineken", "Baileys"],
            countries: ["Scotland", "France", "England", "Puerto Rico", "Mexico", "USA", "Jordan", "Italy"],
            regions: ["Speyside", "Cognac", "London", "Caribbean", "Jalisco", "Kentucky", "Amman", "Tuscany"]
        }
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')

        if (error || !data) throw error
        return data as Category[]
    } catch (err) {
        console.error('getCategories error:', err)
        return getMockCategories() as Category[]
    }
}
