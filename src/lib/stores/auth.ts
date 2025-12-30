import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
    checkAgeVerification,
    setAgeVerification as setAgeVerificationStorage,
    clearAgeVerification
} from '@/lib/age-verification'

interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isAgeVerified: boolean
    login: (userData: User) => void
    logout: () => void
    setAgeVerified: (verified: boolean) => void
    checkAgeVerification: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAgeVerified: checkAgeVerification(), // Initialize from localStorage
            login: (userData) => set({ user: userData, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            setAgeVerified: (verified) => {
                setAgeVerificationStorage(verified)
                set({ isAgeVerified: verified })
            },
            checkAgeVerification: () => {
                const verified = checkAgeVerification()
                set({ isAgeVerified: verified })
            },
        }),
        {
            name: 'balisan-auth-storage',
            // Don't persist age verification in auth storage - it's handled separately
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
