/**
 * Service Layer Exports
 * 
 * Centralized exports for all Supabase-backed services.
 */

// Product Service
export {
    getProducts,
    getProductBySlug,
    getProductById,
    getFeaturedProducts,
    getNewArrivals,
    getProductsByCategory,
    searchProducts,
    getFacets,
    getCategories
} from './products'

// Content Service (Recipes & Blog)
export {
    getRecipes,
    getRecipe,
    getBlogPosts,
    getBlogPost,
    getJournalPosts,
    getJournalPost
} from './content'

// User Service
export {
    getUserProfile,
    getUserOrders,
    getUserAddresses
} from './user'
export type { UserProfile, UserOrder } from './user'
