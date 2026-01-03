/**
 * Centralized Type Definitions
 * 
 * Sourced primarily from Supabase generated types to ensure
 * frontend-backend alignment.
 */

import { Database } from './database.types'

// Helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// ============ DOMAIN TYPES ============
// Catalog
export type Brand = Tables<'brands'>
export type Category = Tables<'categories'>
export type Product = Partial<Database['public']['Tables']['products']['Row']> & {
    id: string
    name: string
    slug: string
    price: number
    brand?: Brand | null | string
    categories?: Category | null
    image?: string
    images?: string[]
    tags?: string[]
    is_award_winner?: boolean
    is_new?: boolean
    category?: string
    subcategory?: string
    rating: number
    review_count: number
    tasting_notes?: string | string[] | null
    flavor_profile?: {
        woodiness: number
        smokiness: number
        sweetness: number
        complexity: number
        peatiness: number
    } | null
}

// Identity
export type UserProfile = Tables<'profiles'>
export type User = UserProfile
export type Address = Tables<'addresses'>
export type UserRole = Enums<'user_role'>

// Commerce
export type OrderStatus = Enums<'order_status'>
export type Order = Tables<'orders'> & {
    items?: OrderItem[]
}
export type OrderItem = Tables<'order_items'>

// Social
export type Review = Partial<Tables<'reviews'>> & {
    id: string
    user_id: string
    product_id: string
    rating: number
    comment: string | null
    title?: string | null
    is_verified_purchase?: boolean
    helpful_count?: number
    user?: { full_name: string; avatar_url: string | null } // Joined profile
}
export type WishlistWithProduct = Tables<'wishlists'> & {
    product: Product
}

// Content
export type ContentType = Enums<'content_type'>
export type BlogPost = Partial<Tables<'content_posts'>> & {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string | null
    image_url?: string | null
    author?: { full_name: string; avatar_url: string | null }
}
export type Recipe = Partial<Tables<'recipes'>> & {
    id: string
    title: string
    slug: string
    ingredients?: RecipeIngredient[]
    author?: { full_name: string; avatar_url: string | null }
}
export type RecipeIngredient = Partial<Tables<'recipe_ingredients'>> & {
    id: string
    recipe_id: string
    name: string
    amount: string
    product?: Product | null
}

// System
export type AuditLog = Tables<'audit_logs'>

// ============ UTILITY TYPES ============

export interface FilterState {
    category: string | null
    subcategory?: string | null
    minPrice: number
    maxPrice: number
    brands: string[]
    sort: string
    inStock?: boolean
}

// Generic API Response
export interface ApiResponse<T> {
    data: T | null
    error: string | null
}

// Cart Types (Client Side mostly)
export interface CartItem {
    id: string
    productId: string
    quantity: number
    product: Product
}
