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
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SmartSearchTrigger } from "@/components/ui/extension/SmartSearchTrigger"

interface SearchBarProps {
    mobile?: boolean
    className?: string
}

export function SearchBar({ mobile, className }: SearchBarProps) {
    const { isOpen, setIsOpen, query, setQuery, recentSearches, addRecentSearch } = useSearchStore()
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(!isOpen)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [setIsOpen])

    const runCommand = React.useCallback((command: () => void) => {
        setIsOpen(false)
        command()
    }, [setIsOpen])

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

    return (
        <>
            <SmartSearchTrigger
                placeholders={[
                    "Search rare whiskies...",
                    "Search craft gins...",
                    "Search 'Japanese Whisky'...",
                    "Search 'Mezcal'...",
                    "What are you looking for?"
                ]}
                onClick={() => setIsOpen(true)}
                className={cn(mobile ? "w-full" : "w-full", className)}
            />
            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                <CommandInput
                    placeholder="Search by brand, product, or category..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
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
                </CommandList>
            </CommandDialog>
        </>
    )
}
