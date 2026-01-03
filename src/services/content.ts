/**
 * Content Service
 * 
 * Provides recipes and journal posts from Supabase.
 */

import { createClient } from '@/lib/supabase/server'
import { config } from '@/lib/config'
import type { Recipe, BlogPost } from '@/types'
import {
    RECIPES,
    getRecipeBySlug as getMockRecipeBySlug,
    getRecipesByTag as getMockRecipesByTag,
    BLOG_POSTS,
    getBlogPostBySlug as getMockBlogPostBySlug,
    getBlogPostsByType as getMockBlogPostsByType
} from '@/data/mock'

// ============ RECIPES ============

export async function getRecipes(options?: {
    limit?: number
    tag?: string
    productId?: string
}): Promise<Recipe[]> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()

        let query = supabase
            .from('recipes')
            .select(`
                *,
                recipe_ingredients (
                    *,
                    products (*)
                )
            `)

        if (options?.tag) {
            query = query.contains('tags', [options.tag])
        }

        if (options?.limit) {
            query = query.limit(options.limit)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error || !data) throw error

        return (data as any[]).map(mapDatabaseRecipe)
    } catch (err) {
        console.error('getRecipes error:', err)
        if (options?.tag) return getMockRecipesByTag(options.tag).slice(0, options.limit || 12) as unknown as Recipe[]
        return RECIPES.slice(0, options?.limit || 12) as unknown as Recipe[]
    }
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('recipes')
            .select(`
                *,
                recipe_ingredients (
                    *,
                    products (*)
                )
            `)
            .eq('slug', slug)
            .single()

        if (error || !data) throw error
        return mapDatabaseRecipe(data)
    } catch (err) {
        console.error('getRecipe error:', err)
        return getMockRecipeBySlug(slug) as unknown as Recipe
    }
}

// ============ BLOG POSTS / JOURNAL ============

export async function getBlogPosts(options?: {
    limit?: number
    category?: string
    tag?: string
}): Promise<BlogPost[]> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()

        let query = supabase
            .from('journal_posts' as any)
            .select('*')
            .not('published_at', 'is', null) // Only published posts

        if (options?.category) {
            query = query.eq('category', options.category)
        }

        if (options?.tag) {
            query = query.contains('tags', [options.tag])
        }

        if (options?.limit) {
            query = query.limit(options.limit)
        }

        const { data, error } = await query.order('published_at', { ascending: false })

        if (error || !data) throw error

        return (data as any[]).map(mapDatabaseBlogPost)
    } catch (err) {
        console.error('getBlogPosts error:', err)
        if (options?.category) return getMockBlogPostsByType(options.category).slice(0, options?.limit || 12) as unknown as BlogPost[]
        return BLOG_POSTS.slice(0, options?.limit || 12) as unknown as BlogPost[]
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        if (config.useMockData) throw new Error('Mock mode enabled')
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('journal_posts' as any)
            .select('*')
            .eq('slug', slug)
            .single()

        if (error || !data) throw error
        return mapDatabaseBlogPost(data)
    } catch (err) {
        console.error('getBlogPost error:', err)
        return getMockBlogPostBySlug(slug) as unknown as BlogPost
    }
}

// ============ MAPPING FUNCTIONS ============

function mapDatabaseRecipe(row: any): Recipe {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        instructions: row.instructions,
        difficulty: row.difficulty,
        prep_time: row.prep_time,
        servings: row.servings,
        image_url: row.image_url,
        category: row.category,
        tags: row.tags,
        glassware: row.glassware,
        garnish: row.garnish,
        ingredients: (row.recipe_ingredients || []).map((ing: any) => ({
            name: ing.name,
            amount: ing.amount,
            product_id: ing.product_id,
            product_name: ing.products?.name,
            price: ing.products?.price,
            image_url: ing.products?.images?.[0]
        }))
    } as Recipe
}

function mapDatabaseBlogPost(row: any): BlogPost {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        category: row.category,
        tags: row.tags,
        image_url: row.image_url,
        published_at: row.published_at,
        author: {
            full_name: 'Balisan Staff',
            avatar_url: null
        }
    } as BlogPost
}

// ============ JOURNAL (alias for blog) ============

export const getJournalPosts = getBlogPosts
export const getJournalPost = getBlogPost
