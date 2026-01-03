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
            brands: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    logo_url: string | null
                    country: string | null
                    website: string | null
                    is_featured: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    logo_url?: string | null
                    country?: string | null
                    website?: string | null
                    is_featured?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    logo_url?: string | null
                    country?: string | null
                    website?: string | null
                    is_featured?: boolean | null
                    created_at?: string
                }
                Relationships: []
            }
            categories: {
                Row: {
                    id: string
                    parent_id: string | null
                    name: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    level: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    parent_id?: string | null
                    name: string
                    slug: string
                    description?: string | null
                    image_url?: string | null
                    level?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    parent_id?: string | null
                    name?: string
                    slug?: string
                    description?: string | null
                    image_url?: string | null
                    level?: number
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "categories_parent_id_fkey"
                        columns: ["parent_id"]
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
            products: {
                Row: {
                    id: string
                    brand_id: string | null
                    category_id: string | null
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    discount_price: number | null
                    sku: string | null
                    stock_quantity: number
                    in_stock: boolean
                    is_featured: boolean
                    is_new: boolean
                    is_award_winner: boolean
                    abv: number | null
                    volume: string | null
                    year: number | null
                    serving_suggestion: string | null
                    flavor_profile: Json | null
                    images: string[] | null
                    model_url: string | null
                    tasting_notes: string | null
                    ingredients: string | null
                    region: string | null
                    country: string | null
                    rating: number
                    review_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    brand_id?: string | null
                    category_id?: string | null
                    name: string
                    slug: string
                    description?: string | null
                    price: number
                    discount_price?: number | null
                    sku?: string | null
                    stock_quantity?: number
                    in_stock?: boolean
                    is_featured?: boolean
                    is_new?: boolean
                    is_award_winner?: boolean
                    abv?: number | null
                    volume?: string | null
                    year?: number | null
                    serving_suggestion?: string | null
                    flavor_profile?: Json | null
                    images?: string[] | null
                    model_url?: string | null
                    tasting_notes?: string | null
                    ingredients?: string | null
                    region?: string | null
                    country?: string | null
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    brand_id?: string | null
                    category_id?: string | null
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    discount_price?: number | null
                    sku?: string | null
                    stock_quantity?: number
                    in_stock?: boolean
                    is_featured?: boolean
                    is_new?: boolean
                    is_award_winner?: boolean
                    abv?: number | null
                    volume?: string | null
                    year?: number | null
                    serving_suggestion?: string | null
                    flavor_profile?: Json | null
                    images?: string[] | null
                    model_url?: string | null
                    tasting_notes?: string | null
                    ingredients?: string | null
                    region?: string | null
                    country?: string | null
                    rating?: number
                    review_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "products_brand_id_fkey"
                        columns: ["brand_id"]
                        referencedRelation: "brands"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "products_category_id_fkey"
                        columns: ["category_id"]
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'customer' | 'admin' | 'staff'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'customer' | 'admin' | 'staff'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'customer' | 'admin' | 'staff'
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
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
                    state: string | null
                    postal_code: string
                    country: string
                    phone: string | null
                    is_default: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    label?: string | null
                    name: string
                    line1: string
                    line2?: string | null
                    city: string
                    state?: string | null
                    postal_code: string
                    country: string
                    phone?: string | null
                    is_default?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    label?: string | null
                    name?: string
                    line1?: string
                    line2?: string | null
                    city?: string
                    state?: string | null
                    postal_code?: string
                    country?: string
                    phone?: string | null
                    is_default?: boolean
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "addresses_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    status: string
                    total_amount: number
                    created_at: string
                    updated_at: string
                    items: Json | null
                    shipping_address: Json | null
                    billing_address: Json | null
                    payment_status: string
                    payment_intent_id: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    status?: string
                    total_amount: number
                    created_at?: string
                    updated_at?: string
                    items?: Json | null
                    shipping_address?: Json | null
                    billing_address?: Json | null
                    payment_status?: string
                    payment_intent_id?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    status?: string
                    total_amount?: number
                    created_at?: string
                    updated_at?: string
                    items?: Json | null
                    shipping_address?: Json | null
                    billing_address?: Json | null
                    payment_status?: string
                    payment_intent_id?: string | null
                }
                Relationships: []
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string
                    product_name_snapshot: string | null
                    product_image_snapshot: string | null
                    quantity: number
                    unit_price: number
                    total_price: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id: string
                    product_name_snapshot?: string | null
                    product_image_snapshot?: string | null
                    quantity: number
                    unit_price: number
                    total_price: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    product_name_snapshot?: string | null
                    product_image_snapshot?: string | null
                    quantity?: number
                    unit_price?: number
                    total_price?: number
                    created_at?: string
                }
                Relationships: []
            }
            reviews: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    rating: number
                    title: string | null
                    comment: string | null
                    is_verified_purchase: boolean
                    helpful_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    rating: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    helpful_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    rating?: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    helpful_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            wishlists: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
                Relationships: []
            }
            recipes: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    difficulty: 'easy' | 'medium' | 'hard'
                    prep_time: number
                    servings: number
                    category: string | null
                    glassware: string | null
                    garnish: string | null
                    instructions: string[] | null
                    tags: string[] | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description?: string | null
                    image_url?: string | null
                    difficulty?: 'easy' | 'medium' | 'hard'
                    prep_time?: number
                    servings?: number
                    category?: string | null
                    glassware?: string | null
                    garnish?: string | null
                    instructions?: string[] | null
                    tags?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string | null
                    image_url?: string | null
                    difficulty?: 'easy' | 'medium' | 'hard'
                    prep_time?: number
                    servings?: number
                    category?: string | null
                    glassware?: string | null
                    garnish?: string | null
                    instructions?: string[] | null
                    tags?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            recipe_ingredients: {
                Row: {
                    id: string
                    recipe_id: string
                    product_id: string | null
                    name: string
                    amount: string
                    unit: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    recipe_id: string
                    product_id?: string | null
                    name: string
                    amount: string
                    unit?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    recipe_id?: string
                    product_id?: string | null
                    name?: string
                    amount?: string
                    unit?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            audit_logs: {
                Row: {
                    id: string
                    user_id: string | null
                    action: string
                    details: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    action: string
                    details?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    action?: string
                    details?: Json | null
                    created_at?: string
                }
                Relationships: []
            }
            content_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string | null
                    image_url: string | null
                    type: 'blog' | 'journal'
                    tags: string[] | null
                    author_id: string | null
                    is_published: boolean
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content: string
                    excerpt?: string | null
                    image_url?: string | null
                    type?: 'blog' | 'journal'
                    tags?: string[] | null
                    author_id?: string | null
                    is_published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string | null
                    image_url?: string | null
                    type?: 'blog' | 'journal'
                    tags?: string[] | null
                    author_id?: string | null
                    is_published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            user_role: "customer" | "admin" | "staff"
            order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
            content_type: "blog" | "journal"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}