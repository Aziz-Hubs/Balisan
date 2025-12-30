/**
 * Supabase Browser Client
 * 
 * Use this client for client-side data fetching in React components.
 * This is configured for use with Next.js App Router.
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

/**
 * Creates a Supabase client for browser-side usage.
 * Uses singleton pattern to avoid creating multiple clients.
 */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
    if (browserClient) return browserClient

    browserClient = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    return browserClient
}

/**
 * Export a convenience function for quick access
 */
export const supabase = createClient()
