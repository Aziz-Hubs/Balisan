/**
 * Supabase Server Client
 * 
 * Use this client for server-side data fetching in Server Components,
 * Server Actions, and Route Handlers.
 * 
 * This is configured for use with Next.js App Router and handles
 * cookies securely for authentication.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers' // Moved inside functions to prevent client-side bundling errors
import type { Database } from '@/types/database.types'

/**
 * Creates a Supabase client for server-side usage.
 * Must be called within a Server Component, Server Action, or Route Handler.
 * 
 * @example
 * // In a Server Component
 * import { createClient } from '@/lib/supabase/server'
 * 
 * export default async function Page() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('products').select()
 *   return <ProductList products={data} />
 * }
 */
export async function createClient() {
    let cookieStore
    try {
        cookieStore = await require('next/headers').cookies()
    } catch (e) {
        // Fallback for static generation / build time
        return createServerClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return [] },
                    setAll() { },
                },
            }
        )
    }

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

/**
 * Creates a Supabase admin client with service role for elevated permissions.
 * USE WITH CAUTION: This bypasses RLS policies.
 * Only use for admin operations that require elevated access.
 */
export async function createAdminClient() {
    let cookieStore
    try {
        cookieStore = await require('next/headers').cookies()
    } catch (e) {
        // Fallback for build time
        return createServerClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                cookies: {
                    getAll() { return [] },
                    setAll() { },
                },
            }
        )
    }

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Ignored in Server Components
                    }
                },
            },
        }
    )
}
