import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NavigationStore {
    // Current open mega menu category
    activeMegaMenu: string | null
    setActiveMegaMenu: (category: string | null) => void

    // Mobile menu state (integrating with existing useUIStore)
    isMobileMenuOpen: boolean
    toggleMobileMenu: () => void
    closeMobileMenu: () => void

    // Promotional banner dismissal
    dismissedBanners: string[]
    dismissBanner: (bannerId: string) => void

    // Prefetch tracking for hover behavior
    prefetchedRoutes: Set<string>
    addPrefetchedRoute: (route: string) => void
}

export const useNavigationStore = create<NavigationStore>()(
    persist(
        (set) => ({
            // Mega menu state
            activeMegaMenu: null,
            setActiveMegaMenu: (category) => set({ activeMegaMenu: category }),

            // Mobile menu state
            isMobileMenuOpen: false,
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            closeMobileMenu: () => set({ isMobileMenuOpen: false }),

            // Promotional banner state
            dismissedBanners: [],
            dismissBanner: (bannerId) =>
                set((state) => ({
                    dismissedBanners: [...state.dismissedBanners, bannerId],
                })),

            // Prefetch tracking
            prefetchedRoutes: new Set<string>(),
            addPrefetchedRoute: (route) =>
                set((state) => ({
                    prefetchedRoutes: new Set([...state.prefetchedRoutes, route]),
                })),
        }),
        {
            name: 'balisan-navigation-store',
            partialize: (state) => ({
                dismissedBanners: state.dismissedBanners,
            }),
        }
    )
)
