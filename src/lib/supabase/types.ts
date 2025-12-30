/**
 * Supabase Database Types
 * 
 * These are placeholder types that should be replaced by running:
 * npx supabase gen types typescript --project-id <your-project-id> > src/lib/supabase/types.ts
 * 
 * After connecting to your Supabase project, regenerate these types to get
 * full type safety for your database queries.
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    parent_id: string | null
                    sort_order: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    image_url?: string | null
                    parent_id?: string | null
                    sort_order?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    image_url?: string | null
                    parent_id?: string | null
                    sort_order?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    brand: string
                    sku: string | null
                    price: number
                    discount_price: number | null
                    in_stock: boolean
                    stock_quantity: number
                    category_id: string | null
                    subcategory: string | null
                    tags: string[]
                    description: string | null
                    tasting_notes: string | null
                    ingredients: string | null
                    abv: number | null
                    volume: string | null
                    region: string | null
                    country: string | null
                    image: string | null
                    images: string[]
                    model_url: string | null
                    rating: number
                    review_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    brand: string
                    sku?: string | null
                    price: number
                    discount_price?: number | null
                    in_stock?: boolean
                    stock_quantity?: number
                    category_id?: string | null
                    subcategory?: string | null
                    tags?: string[]
                    description?: string | null
                    tasting_notes?: string | null
                    ingredients?: string | null
                    abv?: number | null
                    volume?: string | null
                    region?: string | null
                    country?: string | null
                    image?: string | null
                    images?: string[]
                    model_url?: string | null
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    brand?: string
                    sku?: string | null
                    price?: number
                    discount_price?: number | null
                    in_stock?: boolean
                    stock_quantity?: number
                    category_id?: string | null
                    subcategory?: string | null
                    tags?: string[]
                    description?: string | null
                    tasting_notes?: string | null
                    ingredients?: string | null
                    abv?: number | null
                    volume?: string | null
                    region?: string | null
                    country?: string | null
                    image?: string | null
                    images?: string[]
                    model_url?: string | null
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            users: {
                Row: {
                    id: string
                    email: string
                    name: string | null
                    phone: string | null
                    age_verified: boolean
                    age_verified_at: string | null
                    customer_type: 'new' | 'regular' | 'vip'
                    preferences: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    name?: string | null
                    phone?: string | null
                    age_verified?: boolean
                    age_verified_at?: string | null
                    customer_type?: 'new' | 'regular' | 'vip'
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string | null
                    phone?: string | null
                    age_verified?: boolean
                    age_verified_at?: string | null
                    customer_type?: 'new' | 'regular' | 'vip'
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            addresses: {
                Row: {
                    id: string
                    user_id: string
                    label: string | null
                    name: string
                    line1: string
                    line2: string | null
                    city: string
                    state: string
                    zip: string
                    country: string
                    phone: string | null
                    is_default: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    label?: string | null
                    name: string
                    line1: string
                    line2?: string | null
                    city: string
                    state: string
                    zip: string
                    country?: string
                    phone?: string | null
                    is_default?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    label?: string | null
                    name?: string
                    line1?: string
                    line2?: string | null
                    city?: string
                    state?: string
                    zip?: string
                    country?: string
                    phone?: string | null
                    is_default?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    subtotal: number
                    tax: number
                    shipping: number
                    total: number
                    payment_method: string | null
                    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
                    shipping_address: Json
                    tracking_number: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    subtotal: number
                    tax?: number
                    shipping?: number
                    total: number
                    payment_method?: string | null
                    payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
                    shipping_address: Json
                    tracking_number?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    subtotal?: number
                    tax?: number
                    shipping?: number
                    total?: number
                    payment_method?: string | null
                    payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
                    shipping_address?: Json
                    tracking_number?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    product_name: string
                    product_image: string | null
                    quantity: number
                    price: number
                    discount_price: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    product_name: string
                    product_image?: string | null
                    quantity: number
                    price: number
                    discount_price?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string | null
                    product_name?: string
                    product_image?: string | null
                    quantity?: number
                    price?: number
                    discount_price?: number | null
                    created_at?: string
                }
            }
            reviews: {
                Row: {
                    id: string
                    product_id: string
                    user_id: string
                    rating: number
                    title: string | null
                    comment: string | null
                    verified_purchase: boolean
                    helpful_count: number
                    is_approved: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    user_id: string
                    rating: number
                    title?: string | null
                    comment?: string | null
                    verified_purchase?: boolean
                    helpful_count?: number
                    is_approved?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    user_id?: string
                    rating?: number
                    title?: string | null
                    comment?: string | null
                    verified_purchase?: boolean
                    helpful_count?: number
                    is_approved?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
