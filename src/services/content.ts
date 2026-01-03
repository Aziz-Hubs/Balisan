/**
 * Content Service
 * 
 * Provides recipes and journal posts from Supabase.
 */

import { createClient } from '@/lib/supabase/server'
import type { Recipe, BlogPost } from '@/types'

// ============ RECIPES ============

export async function getRecipes(options?: {
    limit?: number
    tag?: string
    productId?: string
}): Promise<Recipe[]> {
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

    // Filtering by productId in ingredients is complex in Supabase simple query
    // If needed, we fetch all and filter or use a specialized query

    if (options?.limit) {
        query = query.limit(options.limit)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error || !data) {
        console.error('Error fetching recipes:', error)
        return []
    }

    return (data as any[]).map(mapDatabaseRecipe)
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
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

    if (error || !data) return null
    return mapDatabaseRecipe(data)
}

// ============ BLOG POSTS / JOURNAL ============

export async function getBlogPosts(options?: {
    limit?: number
    category?: string
    tag?: string
}): Promise<BlogPost[]> {
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

    if (error || !data) {
        console.error('Error fetching blog posts:', error)
        return []
    }

    return (data as any[]).map(mapDatabaseBlogPost)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('journal_posts' as any)
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !data) return null
    return mapDatabaseBlogPost(data)
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
