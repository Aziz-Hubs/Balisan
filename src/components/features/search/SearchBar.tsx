"use client"

import * as React from "react"
import { ShoppingCart, Search, Info, Phone, Package, ArrowUpRight, BookOpen, Utensils } from "lucide-react"
import { useSearchStore } from "@/lib/stores/search"
import { PRODUCTS } from "@/lib/mock-data"
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
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SmartSearchTrigger } from "@/components/ui/extension/SmartSearchTrigger"

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
                // If mobile, toggle global store. If desktop, focus input.
                // However, we need to know if we are effectively on mobile.
                // This component is rendered twice: once for desktop (hidden on mobile) and once for mobile (hidden on md).
                // So checking `mobile` prop is sufficient.
                if (mobile) {
                    setIsOpen(!isOpen)
                } else {
                    inputRef.current?.focus()
                    openDropdown()
                }
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [setIsOpen, mobile, isOpen, openDropdown])

    const runCommand = React.useCallback((command: () => void) => {
        // Close both to be safe
        setIsOpen(false)
        closeDropdown()
        command()
    }, [setIsOpen, closeDropdown])

    // Filter products
    const filteredProducts = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

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

    const SearchResults = () => (
        <>
            <CommandEmpty>No results found.</CommandEmpty>

            {query.length > 0 && (
                <>
                    {filteredProducts.length > 0 && (
                        <CommandGroup heading="Products">
                            {filteredProducts.map((product) => (
                                <CommandItem
                                    key={product.id}
                                    onSelect={() => {
                                        addRecentSearch(product.name)
                                        runCommand(() => router.push(`/products/${product.slug}`))
                                    }}
                                    className="flex items-center gap-3 p-2 cursor-pointer"
                                >
                                    <div className="relative h-10 w-10 overflow-hidden rounded bg-muted/50 border border-border">
                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-medium truncate">{product.name}</span>
                                        <span className="text-xs text-muted-foreground truncate">{product.brand} • ${product.price}</span>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] h-5 hidden sm:flex">{product.category}</Badge>
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
                                "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            placeholder="Search by brand, product, or category..."
                            value={query}
                            onValueChange={setQuery}
                        />
                    </div>
                    <CommandList>
                        <SearchResults />
                    </CommandList>
                </CommandDialog>
            </>
        )
    }

    return (
        <CommandPrimitive
            shouldFilter={false}
            className={cn(
                "relative w-full overflow-visible bg-transparent transition-all duration-300",
                className,
                desktopIsOpen ? "z-[60]" : "z-auto"
            )}
        >
            <div
                className={cn(
                    "relative transition-all duration-300",
                    desktopIsOpen
                        ? "bg-background/98 backdrop-blur-2xl rounded-t-2xl border-x border-t border-amber-500/25 shadow-[0_-10px_40px_-15px_rgba(245,158,11,0.1)]"
                        : "rounded-full"
                )}
            >
                <div className={cn(
                    "relative flex items-center group",
                    !desktopIsOpen && "overflow-hidden rounded-full"
                )}>
                    {!desktopIsOpen && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent group-hover:via-amber-500/20 group-hover:animate-shimmer z-0 pointer-events-none" />
                    )}
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 z-10" />
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={query}
                        onValueChange={setQuery}
                        onFocus={() => openDropdown()}
                        onBlur={() => {
                            setTimeout(() => closeDropdown(), 200)
                        }}
                        className={cn(
                            "w-full h-12 bg-transparent pl-10 pr-12 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground",
                            desktopIsOpen
                                ? "text-foreground"
                                : "border border-border rounded-full hover:border-amber-500/30 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                        )}
                        placeholder={!desktopIsOpen ? "" : "Search rare whiskies, brands, or categories..."}
                    />

                    {!query && !desktopIsOpen && (
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center pl-10">
                            <SmartSearchTrigger
                                placeholders={[
                                    "Search rare whiskies...",
                                    "Search craft gins...",
                                    "Search 'Japanese Whisky'...",
                                    "What are you looking for?"
                                ]}
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

                {showDropdown && (
                    <div className={cn(
                        "absolute top-full left-[-1px] right-[-1px] bg-background/98 backdrop-blur-2xl border-x border-b border-amber-500/25 rounded-b-2xl shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)] overflow-hidden z-[60] duration-150",
                        isClosing
                            ? "animate-out fade-out slide-out-to-top-1"
                            : "animate-in fade-in slide-in-from-top-1"
                    )}>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent mx-4" />
                        <CommandList className="max-h-[60vh] overflow-y-auto p-2">
                            <SearchResults />
                        </CommandList>
                    </div>
                )}
            </div>
        </CommandPrimitive>
    )
}

