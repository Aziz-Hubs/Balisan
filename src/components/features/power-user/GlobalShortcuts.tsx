"use client"

import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useRouter } from "next/navigation"
import { useSearchStore } from "@/lib/stores/search"
import { useCartStore } from "@/lib/stores/cart"
import { toast } from "sonner"
import {
    Command,
    Home,
    ShoppingBag,
    ShoppingCart,
    Search,
    User,
    HelpCircle
} from "lucide-react"

export function GlobalShortcuts() {
    const router = useRouter()
    const { toggleOpen: toggleSearch } = useSearchStore()
    const { toggleDrawer: toggleCart } = useCartStore()

    // Navigation Shortcuts
    useHotkeys('g+h', () => {
        router.push('/')
        toast("Navigated to Home", { icon: <Home className="h-4 w-4" /> })
    })

    useHotkeys('g+s', () => {
        router.push('/shop')
        toast("Navigated to Shop", { icon: <ShoppingBag className="h-4 w-4" /> })
    })

    useHotkeys('g+c', () => {
        toggleCart()
        toast("Toggled Cart", { icon: <ShoppingCart className="h-4 w-4" /> })
    })

    useHotkeys('g+a', () => {
        router.push('/account')
        toast("Navigated to Account", { icon: <User className="h-4 w-4" /> })
    })

    // Feature Shortcuts
    useHotkeys('meta+k, ctrl+k', (e) => {
        e.preventDefault()
        toggleSearch()
    })

    useHotkeys('?', () => {
        // In a real app, this would open a shortcuts help modal
        toast("Keyboard Shortcuts", {
            description: "G+H: Home | G+S: Shop | G+C: Cart | ⌘+K: Search"
        })
    })

    return null
}
