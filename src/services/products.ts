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
    searchProducts as searchMockProducts
} from '@/data/mock'

const CATEGORY_GROUPS: Record<string, string[]> = {
    'spirits': ['whiskey', 'vodka', 'gin', 'rum', 'tequila', 'brandy', 'cognac', 'mezcal', 'liqueur'],
    'wine': ['red wine', 'white wine', 'rose wine', 'rosé wine', 'sparkling wine', 'champagne', 'dessert wine', 'wine'],
    'accessories': ['glassware', 'bar tools', 'tools', 'accessories', 'books', 'mixers']
};

// ============ HELPER: Map DB row to Product interface ============

function mapDatabaseProduct(row: any): Product {
    const rawImage = row.image || row.images?.[0] || '/bottle.png';
    const name = row.name || '';

    // Helper to sanitize a single image URL
    const sanitizeUrl = (url: string) => {
        if (!url) return '/bottle.png';
        if (url.includes('thecocktaildb.com/images/ingredients/')) {
            const genericImages = [
                'Red%20Wine.png', 'White%20Wine.png', 'Champagne.png', 'Rose%20Wine.png', 'Wine.png',
                'Tequila.png', 'Vodka.png', 'Gin.png', 'Rum.png', 'Whiskey.png', 'Brandy.png'
            ];

            if (genericImages.some(img => url.includes(img))) {
                return '/bottle.png';
            }

            const lowerName = name.toLowerCase();
            const genericMappings = [
                { file: 'Absolut%20Vodka.png', brand: 'absolut' },
                { file: 'Lager.png', brand: 'peroni' },
                { file: 'Black%20Rum.png', brand: 'calico jack' },
                { file: 'Bourbon.png', brand: 'michter' },
                { file: 'Scotch.png', brand: 'johnnie walker' },
                { file: 'Plymouth%20Gin.png', brand: 'plymouth' }
            ];

            for (const mapping of genericMappings) {
                if (url.includes(mapping.file)) {
                    const hasMatch = lowerName.includes(mapping.brand) || (row.brand || '').toLowerCase().includes(mapping.brand);
                    return hasMatch ? url : '/bottle.png';
                }
            }

            // Fallback for other cocktaildb images
            const urlParts = url.split('/');
            const fileName = decodeURIComponent(urlParts[urlParts.length - 1]).toLowerCase().replace('.png', '');

            if (!lowerName.includes(fileName) && !fileName.includes(lowerName.split(' ')[0])) {
                return '/bottle.png';
            }
        }
        return url;
    };

    const sanitizedImage = sanitizeUrl(rawImage);
    const sanitizedImages = (row.images || [rawImage]).map((img: string) => sanitizeUrl(img));

    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        brand: row.brand || 'Unknown',
        price: Number(row.price),
        discountPrice: row.discount_price ? Number(row.discount_price) : undefined,
        rating: Number(row.rating) || 0,
        image: sanitizedImage,
        images: sanitizedImages,
        inStock: row.in_stock ?? true,
        stockQuantity: row.stock_quantity || 0,
        category: row.category || row.categories?.name || 'Spirits',
        subcategory: row.subcategory,
        description: row.description || '',
        tastingNotes: row.tasting_notes,
        ingredients: row.ingredients,
        abv: Number(row.abv) || 0,
        volume: row.volume || '750ml',
        region: row.region || '',
        country: row.country || '',
        sku: row.sku || row.id,
        tags: row.tags || [],
        reviewCount: row.review_count || 0,
        createdAt: row.created_at,
        modelUrl: row.model_url,
        flavorProfile: row.flavor_profile
    }
}

// ============ HELPER: Deduplicate Products ============

/**
 * Ensures a list of products is unique by ID, slug, and name.
 * Also prioritizes products with richer data if duplicates exist.
 */
function deduplicateProducts(products: Product[]): Product[] {
    const seenIds = new Set<string>();
    const seenNames = new Set<string>();
    const seenSlugs = new Set<string>();

    return products.filter(p => {
        if (seenIds.has(p.id) || seenNames.has(p.name.toLowerCase()) || seenSlugs.has(p.slug)) {
            return false;
        }
        seenIds.add(p.id);
        seenNames.add(p.name.toLowerCase());
        seenSlugs.add(p.slug);
        return true;
    });
}

// ============ MOCK FALLBACK HELPERS ============

function getMockProducts(options?: {
    category?: string
    subcategory?: string
    minPrice?: number
    maxPrice?: number
    brands?: string[]
    limit?: number
    inStock?: boolean
}): Product[] {
    let filtered = [...ALL_PRODUCTS]

    if (options?.inStock !== false) {
        filtered = filtered.filter(p => p.inStock)
    }




    if (options?.category) {
        const categoryFilter = options.category.toLowerCase();
        const groupCategories = CATEGORY_GROUPS[categoryFilter];

        filtered = filtered.filter(p => {
            const productCategory = p.category.toLowerCase();

            // Check direct match
            if (productCategory === categoryFilter || productCategory.replace(' ', '-') === categoryFilter) {
                return true;
            }

            // Check if it belongs to a group
            if (groupCategories && groupCategories.some(c => productCategory.includes(c))) {
                return true;
            }

            return false;
        });
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

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Deduplicate before limiting
    filtered = deduplicateProducts(filtered)

    if (options?.limit) {
        filtered = filtered.slice(0, options.limit)
    }

    return filtered
}

// ============ EXPORTED FUNCTIONS ============

export async function getProducts(options?: {
    category?: string
    subcategory?: string
    minPrice?: number
    maxPrice?: number
    brands?: string[]
    limit?: number
    inStock?: boolean
}): Promise<Product[]> {
    try {
        const supabase = await createClient()

        // Build query with category join
        let query = supabase
            .from('products')
            .select(`
                *,
                categories (name, slug)
            `)
            .order('created_at', { ascending: false })

        // Apply in_stock filter
        if (options?.inStock !== false) {
            query = query.eq('in_stock', true)
        }

        // Apply price filters
        if (options?.minPrice !== undefined) {
            query = query.gte('price', options.minPrice)
        }
        if (options?.maxPrice !== undefined) {
            query = query.lte('price', options.maxPrice)
        }

        // Apply a generous limit for deduplication flexibility
        const fetchLimit = options?.limit ? options.limit * 2 : 100;
        query = query.limit(fetchLimit)

        const { data, error } = await query

        if (error) {
            console.error('Supabase getProducts error:', error)
            return getMockProducts(options)
        }

        if (!data || data.length === 0) {
            // Fallback to mock data if DB is empty
            return getMockProducts(options)
        }

        // Map and apply category/subcategory/brand filters (done client-side for flexibility)
        let products = data.map((row: any) => mapDatabaseProduct({
            ...row,
            category: row.categories?.name || row.category
        }))

        // Client-side filtering for category (handles slug matching)
        if (options?.category) {
            const categoryFilter = options.category.toLowerCase();
            const groupCategories = CATEGORY_GROUPS[categoryFilter];

            products = products.filter(p => {
                const productCategory = p.category.toLowerCase();

                // Check direct match
                if (productCategory === categoryFilter || productCategory.replace(' ', '-') === categoryFilter) {
                    return true;
                }

                // Check if it belongs to a group
                if (groupCategories && groupCategories.some(c => productCategory.includes(c))) {
                    return true;
                }

                return false;
            });
        }

        if (options?.subcategory) {
            products = products.filter(p => p.subcategory?.toLowerCase() === options.subcategory?.toLowerCase())
        }

        if (options?.brands && options.brands.length > 0) {
            const brandSet = new Set(options.brands.map(b => b.toLowerCase()))
            products = products.filter(p => brandSet.has(p.brand.toLowerCase()))
        }

        // Deduplicate
        products = deduplicateProducts(products)

        if (options?.limit) {
            products = products.slice(0, options.limit)
        }

        return products
    } catch (err) {
        console.error('getProducts error:', err)
        return getMockProducts(options)
    }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('slug', slug)
            .single()

        if (error || !data) {
            // Fallback to mock
            const mockProduct = getMockProductBySlug(slug)
            return mockProduct || null
        }

        const row = data as Record<string, unknown>
        return mapDatabaseProduct({
            ...row,
            category: (row as any).categories?.name || (row as any).category
        })
    } catch (err) {
        console.error('getProductBySlug error:', err)
        const mockProduct = getMockProductBySlug(slug)
        return mockProduct || null
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('id', id)
            .single()

        if (error || !data) {
            // Fallback to mock
            const mockProduct = getMockProductById(id)
            return mockProduct || null
        }

        const row = data as Record<string, unknown>
        return mapDatabaseProduct({
            ...row,
            category: (row as any).categories?.name || (row as any).category
        })
    } catch (err) {
        console.error('getProductById error:', err)
        const mockProduct = getMockProductById(id)
        return mockProduct || null
    }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
        const supabase = await createClient()
        // Fetch extra to allow for deduplication
        const fetchLimit = limit * 2;

        const { data, error } = await supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('in_stock', true)
            .gte('rating', 4.5)
            .gte('review_count', 50)
            .order('review_count', { ascending: false })
            .limit(fetchLimit)

        if (error || !data || data.length === 0) {
            return getMockFeaturedProducts(limit)
        }

        let products = data.map((row: any) => mapDatabaseProduct({
            ...row,
            category: row.categories?.name || row.category
        }))

        // Deduplicate
        products = deduplicateProducts(products)

        return products.slice(0, limit)
    } catch (err) {
        console.error('getFeaturedProducts error:', err)
        return getMockFeaturedProducts(limit)
    }
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
    try {
        const supabase = await createClient()

        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        // Fetch extra to allow for deduplication
        const fetchLimit = limit * 2;

        const { data, error } = await supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('in_stock', true)
            .gte('created_at', threeMonthsAgo.toISOString())
            .order('created_at', { ascending: false })
            .limit(fetchLimit)

        if (error || !data || data.length === 0) {
            return getMockNewArrivals(limit)
        }

        let products = data.map((row: any) => mapDatabaseProduct({
            ...row,
            category: row.categories?.name || row.category
        }))

        // Deduplicate
        products = deduplicateProducts(products)

        return products.slice(0, limit)
    } catch (err) {
        console.error('getNewArrivals error:', err)
        return getMockNewArrivals(limit)
    }
}

export async function getProductsByCategory(categorySlug: string, limit?: number): Promise<Product[]> {
    try {
        const supabase = await createClient()

        // First try to find the category by slug
        let categoryResult = await supabase
            .from('categories')
            .select('id, name')
            .eq('slug', categorySlug)
            .maybeSingle()

        // If not found by slug, try by name (case-insensitive)
        if (!categoryResult.data) {
            categoryResult = await supabase
                .from('categories')
                .select('id, name')
                .ilike('name', categorySlug)
                .maybeSingle()
        }

        const categoryData = categoryResult.data as { id: string; name: string } | null

        let query = supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('in_stock', true)

        if (categoryData) {
            query = query.eq('category_id', categoryData.id)
        }

        // Fetch extra to allow for deduplication
        const fetchLimit = limit ? limit * 2 : 100;
        query = query.limit(fetchLimit)

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error || !data || data.length === 0) {
            // Fallback to mock with category filter
            let products = ALL_PRODUCTS.filter(p =>
                p.category.toLowerCase() === categorySlug.toLowerCase() ||
                p.category.toLowerCase().replace(' ', '-') === categorySlug.toLowerCase()
            )
            // Deduplicate mock fallback too
            products = deduplicateProducts(products)

            if (limit) {
                products = products.slice(0, limit)
            }
            return products
        }

        let products = data.map((row: any) => mapDatabaseProduct({
            ...row,
            category: row.categories?.name || categoryData?.name || row.category
        }))

        // Deduplicate
        products = deduplicateProducts(products)

        if (limit) {
            products = products.slice(0, limit)
        }

        return products
    } catch (err) {
        console.error('getProductsByCategory error:', err)
        let products = ALL_PRODUCTS.filter(p =>
            p.category.toLowerCase() === categorySlug.toLowerCase() ||
            p.category.toLowerCase().replace(' ', '-') === categorySlug.toLowerCase()
        )
        products = deduplicateProducts(products)
        if (limit) {
            products = products.slice(0, limit)
        }
        return products
    }
}

export async function searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return []

    try {
        const supabase = await createClient()
        const searchTerm = `%${query}%`

        const { data, error } = await supabase
            .from('products')
            .select(`*, categories (name, slug)`)
            .eq('in_stock', true)
            .or(`name.ilike.${searchTerm},brand.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(50) // More than 20 to allow for deduplication

        if (error || !data || data.length === 0) {
            return deduplicateProducts(searchMockProducts(query)).slice(0, 20)
        }

        let products = data.map((row: any) => mapDatabaseProduct({
            ...row,
            category: row.categories?.name || row.category
        }))

        // Deduplicate
        products = deduplicateProducts(products)

        return products.slice(0, 20)
    } catch (err) {
        console.error('searchProducts error:', err)
        return deduplicateProducts(searchMockProducts(query)).slice(0, 20)
    }
}

export async function getFacets(): Promise<{ categories: string[], brands: string[] }> {
    try {
        const supabase = await createClient()

        // Get distinct categories
        const { data: rawCategoryData } = await supabase
            .from('categories')
            .select('name')
            .order('name')

        // Get distinct brands from products
        const { data: rawBrandData } = await supabase
            .from('products')
            .select('brand')
            .eq('in_stock', true)

        // Type cast the results
        const categoryData = rawCategoryData as { name: string }[] | null
        const brandData = rawBrandData as { brand: string }[] | null

        if ((!categoryData || categoryData.length === 0) && (!brandData || brandData.length === 0)) {
            // Fallback to mock
            const categorySet = new Set(ALL_PRODUCTS.map(p => p.category).filter(Boolean))
            const brandSet = new Set(ALL_PRODUCTS.map(p => p.brand).filter(Boolean))
            return {
                categories: Array.from(categorySet).sort(),
                brands: Array.from(brandSet).sort()
            }
        }

        const categories = categoryData?.map(c => c.name).filter(Boolean) || []
        const brands = [...new Set((brandData || []).map(b => b.brand).filter(Boolean))].sort() as string[]

        // If DB has partial data, supplement with mock
        if (categories.length === 0) {
            const categorySet = new Set(ALL_PRODUCTS.map(p => p.category).filter(Boolean))
            categories.push(...Array.from(categorySet))
        }

        return {
            categories: [...new Set(categories)].sort(),
            brands
        }
    } catch (err) {
        console.error('getFacets error:', err)
        const categorySet = new Set(ALL_PRODUCTS.map(p => p.category).filter(Boolean))
        const brandSet = new Set(ALL_PRODUCTS.map(p => p.brand).filter(Boolean))
        return {
            categories: Array.from(categorySet).sort(),
            brands: Array.from(brandSet).sort()
        }
    }
}
