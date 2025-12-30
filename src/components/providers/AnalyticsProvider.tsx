'use client'

import { useEffect, ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function AnalyticsProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // This is where you would initialize Google Analytics, Sentry, et.
        // Example: window.gtag('config', 'G-XXXXXXXXXX', { page_path: pathname })
        console.log(`[Analytics] Page view: ${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`)
    }, [pathname, searchParams])

    return <>{children}</>
}
