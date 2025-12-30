/**
 * Balisan Mock Data - Central Export
 * 
 * This file aggregates all mock data for the Balisan Liquor Store application.
 * All data maintains referential integrity across entities.
 */

// Import product data
import { WHISKEY_PRODUCTS } from './products'
import { VODKA_PRODUCTS, RUM_PRODUCTS, GIN_PRODUCTS, TEQUILA_PRODUCTS } from './products-spirits'
import { WINE_PRODUCTS, BEER_PRODUCTS, LIQUEUR_PRODUCTS } from './products-beverages'

// Import other entity data
import { USERS, getUserById, getUserDefaultAddress } from './users'
import { ORDERS, getOrderById, getOrdersByUserId, getOrdersByStatus, ORDER_STATS } from './orders'
import { REVIEWS, getReviewsByProductId, getReviewsByUserId, getAverageRating, REVIEW_STATS } from './reviews'
import { BLOG_POSTS, getBlogPostBySlug, getBlogPostsByCategory, getBlogPostsByTag } from './blog-posts'
import { RECIPES, getRecipeBySlug, getRecipesByDifficulty, getRecipesByTag, getRecipesWithProduct } from './recipes'

import type { Product, User, Order, Review, BlogPost, Recipe } from '@/types'

// ============================================
// PRODUCTS
// ============================================

/**
 * All products combined from all categories
 * Total: 75+ products
 */
export const ALL_PRODUCTS: Product[] = [
    ...WHISKEY_PRODUCTS,
    ...VODKA_PRODUCTS,
    ...RUM_PRODUCTS,
    ...GIN_PRODUCTS,
    ...TEQUILA_PRODUCTS,
    ...WINE_PRODUCTS,
    ...BEER_PRODUCTS,
    ...LIQUEUR_PRODUCTS
]

/**
 * Products organized by category
 */
export const PRODUCTS_BY_CATEGORY = {
    whiskey: WHISKEY_PRODUCTS,
    vodka: VODKA_PRODUCTS,
    rum: RUM_PRODUCTS,
    gin: GIN_PRODUCTS,
    tequila: TEQUILA_PRODUCTS,
    wine: WINE_PRODUCTS,
    beer: BEER_PRODUCTS,
    liqueur: LIQUEUR_PRODUCTS
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

export { BLOG_POSTS, getBlogPostBySlug, getBlogPostsByCategory, getBlogPostsByTag }

// ============================================
// RECIPES
// ============================================

export { RECIPES, getRecipeBySlug, getRecipesByDifficulty, getRecipesByTag, getRecipesWithProduct }

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
    return ALL_PRODUCTS.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    )
}

/**
 * Get products by brand
 */
export const getProductsByBrand = (brand: string): Product[] => {
    return ALL_PRODUCTS.filter(product =>
        product.brand.toLowerCase().includes(brand.toLowerCase())
    )
}

/**
 * Get products in stock
 */
export const getInStockProducts = (): Product[] => {
    return ALL_PRODUCTS.filter(product => product.inStock)
}

/**
 * Get products on sale (with discount)
 */
export const getDiscountedProducts = (): Product[] => {
    return ALL_PRODUCTS.filter(product => product.discountPrice)
}

/**
 * Get featured/popular products (high ratings + review count)
 */
export const getFeaturedProducts = (limit: number = 10): Product[] => {
    return ALL_PRODUCTS
        .filter(p => p.rating >= 4.5 && p.reviewCount >= 50)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, limit)
}

/**
 * Get new arrivals (created in past 3 months)
 */
export const getNewArrivals = (limit: number = 10): Product[] => {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    return ALL_PRODUCTS
        .filter(p => new Date(p.createdAt) > threeMonthsAgo)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit)
}

/**
 * Search products by name or description
 */
export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase()
    return ALL_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
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
        total: USERS.length,
        vip: USERS.filter(u => u.customerType === 'vip').length,
        regular: USERS.filter(u => u.customerType === 'regular').length,
        new: USERS.filter(u => u.customerType === 'new').length
    },
    orders: ORDER_STATS,
    reviews: REVIEW_STATS,
    blogPosts: {
        total: BLOG_POSTS.length,
        categories: [...new Set(BLOG_POSTS.map(p => p.category))].length
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
        if (!getUserById(order.userId)) {
            errors.push(`Order ${order.id} references non-existent user ${order.userId}`)
        }
    })

    // Validate review product references
    REVIEWS.forEach(review => {
        if (!getProductById(review.productId)) {
            errors.push(`Review ${review.id} references non-existent product ${review.productId}`)
        }
        if (!getUserById(review.userId)) {
            errors.push(`Review ${review.id} references non-existent user ${review.userId}`)
        }
    })

    // Validate recipe product references
    RECIPES.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (ingredient.productId && !getProductById(ingredient.productId)) {
                errors.push(`Recipe ${recipe.id} references non-existent product ${ingredient.productId}`)
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
