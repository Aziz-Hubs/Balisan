/**
 * Balisan Mock Data - Central Export
 * 
 * This file aggregates all mock data for the Balisan Liquor Store application.
 * All data maintains referential integrity across entities.
 */

// Import product data
import { WHISKEY_PRODUCTS } from './products'
import { VODKA_PRODUCTS, RUM_PRODUCTS, GIN_PRODUCTS, TEQUILA_PRODUCTS, LIQUEUR_PRODUCTS_EXPANDED } from './products-spirits'
import { WINE_PRODUCTS, BEER_PRODUCTS, LIQUEUR_PRODUCTS } from './products-beverages'
import { EXPANSION_PRODUCTS } from './products-expansion'

// Import other entity data
import { USERS, getUserById, getUserDefaultAddress } from './users'
import { ORDERS, getOrderById, getOrdersByUserId, getOrdersByStatus, ORDER_STATS } from './orders'
import { REVIEWS, getReviewsByProductId, getReviewsByUserId, getAverageRating, REVIEW_STATS } from './reviews'
import { BLOG_POSTS, getBlogPostBySlug, getBlogPostsByType, getFeaturedBlogPosts } from './blog-posts'
import { RECIPES, getRecipeBySlug, getRecipesByDifficulty, getRecipesByTag, getRecipesWithProduct } from './recipes'
import { CATEGORIES, getMockCategories } from './categories'

import type { Product, UserProfile, Order, Review, BlogPost, Recipe, Category } from '@/types'

// ============================================
// PRODUCTS
// ============================================

/**
 * All products combined from all categories
 * Total: 95+ products
 */
export const ALL_PRODUCTS: Product[] = [
    ...WHISKEY_PRODUCTS,
    ...VODKA_PRODUCTS,
    ...RUM_PRODUCTS,
    ...GIN_PRODUCTS,
    ...TEQUILA_PRODUCTS,
    ...WINE_PRODUCTS,
    ...BEER_PRODUCTS,
    ...LIQUEUR_PRODUCTS,
    ...LIQUEUR_PRODUCTS_EXPANDED,
    ...EXPANSION_PRODUCTS
]

/**
 * Products organized by category
 */
export const PRODUCTS_BY_CATEGORY = {
    whiskey: [...WHISKEY_PRODUCTS, ...EXPANSION_PRODUCTS.filter(p => p.category === 'Whiskey')],
    vodka: [...VODKA_PRODUCTS, ...EXPANSION_PRODUCTS.filter(p => p.category === 'Vodka')],
    rum: [...RUM_PRODUCTS, ...EXPANSION_PRODUCTS.filter(p => p.category === 'Rum')],
    gin: GIN_PRODUCTS,
    tequila: TEQUILA_PRODUCTS,
    wine: WINE_PRODUCTS,
    beer: BEER_PRODUCTS,
    liqueur: [...LIQUEUR_PRODUCTS, ...LIQUEUR_PRODUCTS_EXPANDED, ...EXPANSION_PRODUCTS.filter(p => p.category === 'Liqueur')]
}

// ============================================
// USERS & CUSTOMERS
// ============================================

export { USERS, getUserById, getUserDefaultAddress }

// ============================================
// ORDERS
// ============================================

export { ORDERS, getOrderById, getOrdersByUserId, getOrdersByStatus, ORDER_STATS }

// ============================================
// REVIEWS
// ============================================

export { REVIEWS, getReviewsByProductId, getReviewsByUserId, getAverageRating, REVIEW_STATS }

// ============================================
// BLOG POSTS
// ============================================

export { BLOG_POSTS, getBlogPostBySlug, getBlogPostsByType, getFeaturedBlogPosts }

// ============================================
// RECIPES
// ============================================

export { RECIPES, getRecipeBySlug, getRecipesByDifficulty, getRecipesByTag, getRecipesWithProduct }

// ============================================
// CATEGORIES
// ============================================

export { CATEGORIES, getMockCategories }

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get product by ID
 */
export const getProductById = (productId: string): Product | undefined => {
    return ALL_PRODUCTS.find(product => product.id === productId)
}

/**
 * Get product by slug
 */
export const getProductBySlug = (slug: string): Product | undefined => {
    return ALL_PRODUCTS.find(product => product.slug === slug)
}

/**
 * Get products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
    return ALL_PRODUCTS.filter(product => {
        const pCategory = (product as any).category || product.categories?.name;
        return pCategory?.toLowerCase() === category.toLowerCase()
    })
}

/**
 * Get products by brand
 */
export const getProductsByBrand = (brand: string): Product[] => {
    return ALL_PRODUCTS.filter(product => {
        const pBrand = (product as any).brand?.name || (product as any).brand;
        return pBrand?.toLowerCase().includes(brand.toLowerCase())
    })
}

/**
 * Get products in stock
 */
export const getInStockProducts = (): Product[] => {
    return ALL_PRODUCTS.filter(product => product.in_stock)
}

/**
 * Get products on sale (with discount)
 */
export const getDiscountedProducts = (): Product[] => {
    return ALL_PRODUCTS.filter(product => product.discount_price)
}

/**
 * Get featured/popular products (high ratings + review count)
 */
export const getFeaturedProducts = (limit: number = 10): Product[] => {
    return ALL_PRODUCTS
        .filter(p => p.rating >= 4.5 && p.review_count >= 50)
        .sort((a, b) => b.review_count - a.review_count)
        .slice(0, limit)
}

/**
 * Get new arrivals (created in past 3 months)
 */
export const getNewArrivals = (limit: number = 10): Product[] => {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    return ALL_PRODUCTS
        .filter(p => p.created_at && new Date(p.created_at) > threeMonthsAgo)
        .sort((a, b) => {
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, limit)
}

/**
 * Search products by name or description
 */
export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase()
    return ALL_PRODUCTS.filter(product => {
        const pBrand = (product as any).brand?.name || (product as any).brand || "";
        return product.name.toLowerCase().includes(lowerQuery) ||
            (product.description?.toLowerCase().includes(lowerQuery) ?? false) ||
            pBrand.toString().toLowerCase().includes(lowerQuery) ||
            (product.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery)) ?? false)
    })
}

// ============================================
// DATA STATISTICS
// ============================================

export const MOCK_DATA_STATS = {
    products: {
        total: ALL_PRODUCTS.length,
        byCategory: {
            whiskey: WHISKEY_PRODUCTS.length,
            vodka: VODKA_PRODUCTS.length,
            rum: RUM_PRODUCTS.length,
            gin: GIN_PRODUCTS.length,
            tequila: TEQUILA_PRODUCTS.length,
            wine: WINE_PRODUCTS.length,
            beer: BEER_PRODUCTS.length,
            liqueur: LIQUEUR_PRODUCTS.length
        },
        inStock: getInStockProducts().length,
        discounted: getDiscountedProducts().length
    },
    users: {
        total: USERS.length
    },
    orders: ORDER_STATS,
    reviews: REVIEW_STATS,
    blogPosts: {
        total: BLOG_POSTS.length
    },
    recipes: {
        total: RECIPES.length,
        byDifficulty: {
            easy: RECIPES.filter(r => r.difficulty === 'easy').length,
            medium: RECIPES.filter(r => r.difficulty === 'medium').length,
            hard: RECIPES.filter(r => r.difficulty === 'hard').length
        }
    }
}

// ============================================
// DATA VALIDATION
// ============================================

/**
 * Validate referential integrity of mock data
 */
export const validateMockData = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    // Validate order user references
    ORDERS.forEach(order => {
        if (!getUserById(order.user_id)) {
            errors.push(`Order ${order.id} references non-existent user ${order.user_id}`)
        }
    })

    // Validate review product references
    REVIEWS.forEach(review => {
        if (!getProductById(review.product_id)) {
            errors.push(`Review ${review.id} references non-existent product ${review.product_id}`)
        }
        if (!getUserById(review.user_id)) {
            errors.push(`Review ${review.id} references non-existent user ${review.user_id}`)
        }
    })

    // Validate recipe product references
    RECIPES.forEach(recipe => {
        recipe.ingredients?.forEach((ingredient: any) => {
            if (ingredient.product_id && !getProductById(ingredient.product_id)) {
                errors.push(`Recipe ${recipe.id} references non-existent product ${ingredient.product_id}`)
            }
        })
    })

    return {
        valid: errors.length === 0,
        errors
    }
}

// Log statistics in development
if (process.env.NODE_ENV === 'development') {
    console.log('📊 Balisan Mock Data Statistics:', MOCK_DATA_STATS)

    const validation = validateMockData()
    if (validation.valid) {
        console.log('✅ Mock data referential integrity validated')
    } else {
        console.warn('⚠️  Mock data validation errors:', validation.errors)
    }
}
