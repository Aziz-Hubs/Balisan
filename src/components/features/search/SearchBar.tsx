"use client"

import * as React from "react"
import { ShoppingCart, Search, Info, Phone, Package, ArrowUpRight, BookOpen, Utensils, Home, ShoppingBag, User, Settings, Loader2 } from "lucide-react"
import { useSearchStore } from "@/lib/stores/search"
import { searchProductsAction } from "@/actions/search"
import { navigationCategories, staticNavLinks } from "@/config/navigation"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SmartSearchTrigger } from "@/components/ui/extension/SmartSearchTrigger"
import { ExpandableDock } from "@/components/ui/extension/ExpandableDock"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import type { Product } from "@/types"


interface SearchBarProps {
    mobile?: boolean
    className?: string
    trigger?: React.ReactNode
}

export function SearchBar({ mobile, className, trigger }: SearchBarProps) {
    const { isOpen, setIsOpen, query, setQuery, recentSearches, addRecentSearch } = useSearchStore()
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = React.useState(false)

    const [desktopIsOpen, setDesktopIsOpen] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [productResults, setProductResults] = React.useState<Product[]>([])
    const [isSearching, setIsSearching] = React.useState(false)

    // Debounce search query to avoid excessive API calls
    const debouncedQuery = useDebouncedValue(query, 300)

    // Handle opening with animation
    const openDropdown = React.useCallback(() => {
        setIsClosing(false)
        setDesktopIsOpen(true)
        setShowDropdown(true)
    }, [])

    // Handle closing with animation
    const closeDropdown = React.useCallback(() => {
        setIsClosing(true)
        // Wait for animation to complete before hiding
        setTimeout(() => {
            setDesktopIsOpen(false)
            setShowDropdown(false)
            setIsClosing(false)
        }, 150) // Match animation duration
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(!isOpen)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [setIsOpen, isOpen])

    // Fetch search results from API when debounced query changes
    React.useEffect(() => {
        if (debouncedQuery.length < 2) {
            setProductResults([])
            return
        }
        setIsSearching(true)
        searchProductsAction(debouncedQuery)
            .then(results => {
                setProductResults(results)
            })
            .catch(() => {
                setProductResults([])
            })
            .finally(() => {
                setIsSearching(false)
            })
    }, [debouncedQuery])

    // Use API results instead of static filtering
    const filteredProducts = productResults.slice(0, 5)

    // Filter pages
    const filteredPages = staticNavLinks.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase())
    )

    // Filter categories
    const filteredCategories = navigationCategories.flatMap(cat =>
        [cat, ...cat.items.flatMap(item => [item, ...(item.subcategories || [])])]
    ).filter(item =>
        item.title && item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)


    const runCommand = React.useCallback((command: () => void) => {
        // Close both to be safe
        setIsOpen(false)
        closeDropdown()
        command()
    }, [setIsOpen, closeDropdown])

    const searchResults = (
        <>
            {isSearching && (
                <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
                    <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                </div>
            )}
            <CommandEmpty>No results found.</CommandEmpty>

            {query.length > 0 && (
                <>
                    {filteredProducts.length > 0 && (
                        <CommandGroup heading="Products">
                            {filteredProducts.map((product) => (
                                <CommandItem
                                    key={product.id}
                                    onSelect={() => {
                                        if (product.slug) {
                                            addRecentSearch(product.name)
                                            runCommand(() => router.push(`/products/${product.slug}`))
                                        }
                                    }}
                                    className="flex items-center gap-3 p-2 cursor-pointer"
                                >
                                    <div className="relative h-10 w-10 overflow-hidden rounded bg-muted/50 border border-border">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "/bottle.png"
                                                e.currentTarget.onerror = null
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-medium truncate">{product.name}</span>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {(product.brand as any)?.name || (product.brand as any) || 'Balisan'} • {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] h-5 hidden sm:flex">
                                        {(product.categories as any)?.name || (product as any).category || 'Premium'}
                                    </Badge>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    {filteredCategories.length > 0 && (
                        <CommandGroup heading="Categories">
                            {filteredCategories.map((cat, idx) => (
                                <CommandItem
                                    key={`${cat.title}-${idx}`}
                                    onSelect={() => runCommand(() => router.push(cat.href))}
                                >
                                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {cat.title}
                                    <ArrowUpRight className="ml-auto h-3 w-3 text-muted-foreground opacity-50" />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    {filteredPages.length > 0 && (
                        <CommandGroup heading="Pages">
                            {filteredPages.map((page) => (
                                <CommandItem
                                    key={page.title}
                                    onSelect={() => runCommand(() => router.push(page.href))}
                                >
                                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {page.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </>
            )}

            {recentSearches.length > 0 && query.length === 0 && (
                <CommandGroup heading="Recent Searches">
                    {recentSearches.map((search) => (
                        <CommandItem
                            key={search}
                            onSelect={() => setQuery(search)}
                        >
                            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                            {search}
                        </CommandItem>
                    ))}
                </CommandGroup>
            )}

            <CommandSeparator />

            <CommandGroup heading="Quick Links">
                <CommandItem onSelect={() => runCommand(() => router.push("/shop"))}>
                    <Package className="mr-2 h-4 w-4" />
                    Browse All Products
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/cart"))}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Shopping Cart
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/recipes"))}>
                    <Utensils className="mr-2 h-4 w-4" />
                    Cocktail Recipes
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
                </CommandItem>
            </CommandGroup>
        </>
    )

    const dockItems = [
        { id: "search", icon: Search, label: "Search", onClick: () => { setIsOpen(false); inputRef.current?.focus(); if (!mobile) openDropdown(); } },
        { id: "home", icon: Home, label: "Home", onClick: () => runCommand(() => router.push("/")) },
        { id: "shop", icon: Package, label: "Shop", onClick: () => runCommand(() => router.push("/shop")) },
        { id: "cart", icon: ShoppingBag, label: "Cart", onClick: () => runCommand(() => router.push("/cart")) },
        { id: "account", icon: User, label: "Account", onClick: () => runCommand(() => router.push("/account")) },
    ]

    if (mobile) {
        return (
            <>
                <div onClick={() => setIsOpen(true)} className={className}>
                    {trigger}
                </div>
                <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandPrimitive.Input
                            ref={inputRef}
                            className={cn(
                                "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            placeholder="Search by brand, product, or category..."
                            value={query}
                            onValueChange={setQuery}
                        />
                    </div>
                    <CommandList>
                        {searchResults}
                    </CommandList>
                </CommandDialog>
            </>
        )
    }

    return (
        <div className={cn("relative w-full", className)}>
            <CommandPrimitive shouldFilter={false}>
                <div className="relative flex items-center group overflow-hidden rounded-full transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent group-hover:via-amber-500/20 group-hover:animate-shimmer z-0 pointer-events-none" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 z-10" />
                    <CommandPrimitive.Input
                        value={query}
                        onValueChange={setQuery}
                        // Removed onFocus to prevent popup on click for desktop as requested
                        className="w-full h-12 bg-transparent pl-10 pr-12 py-3 text-sm outline-none border border-border rounded-full hover:border-amber-500/30 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                        placeholder=""
                    />
                    {!query && (
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center pl-10">
                            <SmartSearchTrigger
                                placeholders={["Search rare whiskies...", "Search craft gins...", "Search 'Japanese Whisky'..."]}
                                className="border-none bg-transparent shadow-none h-auto p-0 w-auto"
                            />
                        </div>
                    )}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-50 pointer-events-none z-10">
                        <kbd className="h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground flex">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                <ExpandableDock
                    items={dockItems}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="w-auto min-w-[300px]"
                >
                    <div className="space-y-4">
                        <div className="flex items-center px-4 py-3 bg-muted/30 rounded-3xl border border-border/50 focus-within:border-amber-500/30 transition-colors">
                            <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                            <CommandPrimitive.Input
                                autoFocus
                                value={query}
                                onValueChange={setQuery}
                                className="flex h-10 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground/50"
                                placeholder="What are you looking for?"
                            />
                        </div>
                        <CommandList className="max-h-[50vh] overflow-y-auto rounded-3xl border border-white/5 bg-zinc-950/50 backdrop-blur-xl p-2">
                            {searchResults}
                        </CommandList>
                    </div>
                </ExpandableDock>
            </CommandPrimitive>
        </div>
    )
}

