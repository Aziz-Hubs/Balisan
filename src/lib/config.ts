/**
 * Application Configuration Utility
 * 
 * Provides centralized access to environment-based configuration.
 */

export const config = {
    /**
     * Whether to skip database calls and use mock data everywhere.
     * Controlled by the NEXT_PUBLIC_USE_MOCK_DATA environment variable.
     */
    useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',

    /**
     * Site metadata and other environment variables
     */
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
}
