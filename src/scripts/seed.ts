import { loadEnvConfig } from '@next/env'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { ALL_PRODUCTS, USERS, REVIEWS, ORDERS } from '../data/mock'

// Load environment variables using Next.js loader
loadEnvConfig(process.cwd())

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
    console.log('🌱 Starting seed process...')

    // 1. Seed Categories
    console.log('📦 Seeding categories...')
    const uniqueCategories = Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))

    for (const catName of uniqueCategories) {
        const slug = catName.toLowerCase().replace(/\s+/g, '-')
        const { error } = await supabase
            .from('categories')
            .upsert({ name: catName, slug }, { onConflict: 'slug' })

        if (error) console.error(`Error seeding category ${catName}:`, error)
    }

    // 2. Fetch all categories to create a mapping
    console.log('📦 Fetching categories...')
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('id, name')

    if (catError) {
        console.error('Error fetching categories:', catError)
        process.exit(1)
    }

    const categoryMap = new Map(
        categories.map((c: any) => [c.name.toLowerCase(), c.id])
    )

    // 2. Insert Products
    console.log('🍾 Seeding products...')

    // Transform products to match DB schema
    const dbProducts = ALL_PRODUCTS.map((p) => {
        const categoryId = categoryMap.get(p.category.toLowerCase())
        if (!categoryId) {
            console.warn(`⚠️  Category not found for product: ${p.name} (${p.category})`)
        }

        return {
            // id: p.id, // Let Supabase generate UUIDs or ensure mock IDs are UUIDs. 
            // The schema says id is default uuid_generate_v4(). Mock IDs might be simple strings like '1', '2'.
            // If we keep mock IDs, we must ensure they are UUIDs or update the schema to accept text/int.
            // Schema defines ID as UUID. Mock IDs like "1" will FAIL. 
            // Strategy: Omit ID and let Supabase generate new ones.
            // BUT we need to preserve relationships for Reviews/Orders.
            // SOLUTION: Create a mapping of Old Mock ID -> New UUID.

            name: p.name,
            slug: p.slug,
            brand: p.brand,
            sku: p.sku || `SKU-${Math.random().toString(36).substring(7)}`, // Fallback if missing
            price: p.price,
            discount_price: p.discountPrice,
            in_stock: p.inStock,
            stock_quantity: p.stockQuantity,
            category_id: categoryId,
            subcategory: p.subcategory,
            tags: p.tags,
            description: p.description,
            tasting_notes: p.tastingNotes,
            ingredients: p.ingredients,
            abv: p.abv,
            volume: p.volume,
            region: p.region,
            country: p.country,
            image: p.image,
            images: p.images,
            rating: p.rating,
            review_count: p.reviewCount,
            // created_at: p.createdAt // Let DB set this
        }
    })

    // We need to insert one by one or in batches and get the IDs back to map them.
    // Or upsert using SLUG which is unique.
    const productIdMap = new Map<string, string>() // MockID -> RealUUID

    for (const p of ALL_PRODUCTS) {
        const categoryId = categoryMap.get(p.category.toLowerCase())

        // Construct payload matching actual schema
        const payload = {
            name: p.name,
            slug: p.slug,
            brand: p.brand,
            price: p.price,
            discount_price: p.discountPrice,
            in_stock: p.inStock,
            stock_quantity: p.stockQuantity,
            category_id: categoryId,
            description: p.description,
            abv: p.abv,
            images: p.images || (p.image ? [p.image] : []),
            rating: p.rating,
            review_count: p.reviewCount,
            // Flexible fields stored in attributes JSONB
            attributes: {
                sku: p.sku,
                subcategory: p.subcategory,
                tags: p.tags,
                volume: p.volume,
                region: p.region,
                country: p.country,
                ingredients: p.ingredients
            },
            // Tasting notes as JSONB
            tasting_notes: p.tastingNotes ? { notes: p.tastingNotes } : {}
        }

        const { data, error } = await supabase
            .from('products')
            .upsert(payload, { onConflict: 'slug' })
            .select('id')
            .single()

        if (error) {
            console.error(`Error inserting product ${p.name}:`, error)
        } else {
            productIdMap.set(p.id, data.id)
        }
    }

    // 3. Insert Users
    console.log('👥 Seeding users...')
    const userIdMap = new Map<string, string>() // MockUserID -> RealUUID

    // Note: Users in Supabase are usually in auth.users. 
    // Inserting directly into public.users (which references auth.users) might fail due to FK constraint if auth user doesn't exist.
    // For seeding, we might need to create auth users first using admin API.

    for (const user of USERS) {
        // Create Auth User
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: 'password123', // Default password
            email_confirm: true
        })

        const realUserId = authUser.user?.id

        if (authError) {
            // Use existing if duplicate
            console.warn(`User creation warning for ${user.email}:`, authError.message)
            // Try to fetch existing user if helpful, or skip
            // If "User already registered", proceed to get their ID if possible?
            // Admin API doesn't easily "get user by email" without listing.
            // For now, assume fresh seed or handle gracefully.
            if (authError.message.includes("already registered")) {
                // Skip logic for finding ID for now to keep script simple, or implement listUsers
                console.log('Skipping public.users insert for existing auth user (ID mapping might be broken for reviews)')
                continue;
            }
            continue
        }

        if (realUserId) {
            userIdMap.set(user.id, realUserId)

            // Insert into public.profiles (not 'users')
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: realUserId, // Must match auth.uid
                    full_name: user.name,
                    role: 'customer'
                })

            if (profileError) console.error(`Error creating profile for ${user.email}:`, profileError)
        }
    }

    // 4. Insert Reviews
    console.log('⭐ Seeding reviews...')
    for (const review of REVIEWS) {
        const realProductId = productIdMap.get(review.productId)
        const realUserId = userIdMap.get(review.userId)

        if (realProductId && realUserId) {
            const { error } = await supabase.from('reviews').insert({
                product_id: realProductId,
                user_id: realUserId,
                rating: review.rating,
                title: review.title,
                comment: review.comment,
                verified_purchase: review.verifiedPurchase,
                helpful_count: review.helpfulCount,
                created_at: review.createdAt
            })
            if (error) console.error(`Error inserting review ${review.id}:`, error)
        }
    }

    // 5. Insert Journal Posts
    console.log('📰 Seeding journal posts...')
    const { BLOG_POSTS } = await import('../data/mock')
    for (const post of BLOG_POSTS) {
        const { error } = await supabase.from('journal_posts').upsert({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            tags: post.tags,
            image: post.featuredImage,
            published_at: post.publishedAt
        }, { onConflict: 'slug' })

        if (error) console.error(`Error inserting blog post ${post.title}:`, error)
    }

    // 6. Insert Recipes
    console.log('🍸 Seeding recipes...')
    const { RECIPES } = await import('../data/mock')
    for (const recipe of RECIPES) {
        const { data: dbRecipe, error: recipeError } = await supabase
            .from('recipes')
            .upsert({
                slug: recipe.slug,
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                difficulty: recipe.difficulty,
                prep_time_minutes: recipe.prepTime,
                servings: recipe.servings,
                image: recipe.image,
                tags: recipe.tags,
                category: recipe.category
            }, { onConflict: 'slug' })
            .select('id')
            .single()

        if (recipeError) {
            console.error(`Error inserting recipe ${recipe.title}:`, recipeError)
            continue
        }

        // Insert ingredients
        if (dbRecipe) {
            for (const ing of recipe.ingredients) {
                const realProductId = ing.productId ? productIdMap.get(ing.productId) : null

                await supabase.from('recipe_ingredients').insert({
                    recipe_id: dbRecipe.id,
                    product_id: realProductId,
                    name: ing.name,
                    amount: ing.amount
                })
            }
        }
    }

    console.log('✅ Seed complete!')
}

seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})
