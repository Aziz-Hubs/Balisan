import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/lib/stores/navigation'

/**
 * Hook to prefetch routes on hover (desktop only)
 */
export function usePrefetchOnHover() {
    const router = useRouter()
    const { prefetchedRoutes, addPrefetchedRoute } = useNavigationStore()

    return (href: string) => {
        // Only prefetch if not already prefetched
        if (!prefetchedRoutes.has(href)) {
            router.prefetch(href)
            addPrefetchedRoute(href)
        }
    }
}
