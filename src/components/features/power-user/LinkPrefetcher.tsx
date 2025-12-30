"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export function LinkPrefetcher() {
    const router = useRouter()

    React.useEffect(() => {
        // Find all links on the page and attach perfetch listeners
        // This is a simplified "aggressive prefetch" implementation
        // In a clearer Next.js app, Link component does this automatically when in view
        // But for "Power User" feel, we might want to prefetch on hover specifically for heavy data

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a')
            if (target && target.href && target.href.startsWith(window.location.origin)) {
                // Prefetch the route
                router.prefetch(target.href)
            }
        }

        document.addEventListener('mouseover', handleMouseOver)

        return () => {
            document.removeEventListener('mouseover', handleMouseOver)
        }
    }, [router])

    return null
}
