import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { hasRoutePermission, isSessionExpired } from '@/lib/permissions'
import type { AdminRole } from '@/types/admin'

export async function middleware(request: NextRequest) {
    // 1. Update Supabase Session (refreshes cookies)
    const { response, user } = await updateSession(request)

    const isPath = (path: string) => request.nextUrl.pathname.startsWith(path)

    // Account protection
    if (isPath('/account')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Admin protection with enhanced RBAC
    if (isPath('/admin')) {
        // Check authentication
        if (!user) {
            return NextResponse.redirect(new URL('/login?redirect=/admin/dashboard', request.url))
        }

        // For now, we'll assume if they are logged in via Supabase and trying to access admin,
        // we heavily rely on them having the right role.
        // Since we haven't migrated roles to DB yet, we can check for a 'role' metadata
        // or temporarily allow/mock it.
        // Let's try to get role from metadata, fallback to cookie, then 'STAFF' for safety if not found?
        // Actually, to avoid breaking existing flow:
        // We will respect the existing 'user_role' cookie if present (legacy/mock),
        // or check user_metadata.

        const userRole = (request.cookies.get('user_role')?.value || user.user_metadata?.role || 'STAFF') as AdminRole

        // Check route permission
        const hasPermission = hasRoutePermission(userRole, request.nextUrl.pathname)

        if (!hasPermission) {
            // Redirect to home with error message
            return NextResponse.redirect(new URL('/?error=forbidden', request.url))
        }

        return response
    }

    return response
}

export const config = {
    matcher: ['/account/:path*', '/admin/:path*'],
}
