"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, Star, Sparkles, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/extension/Spotlight"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { CategoryImage } from "./CategoryImage"
import { navigationCategories, staticNavLinks } from "@/config/navigation"
import { usePrefetchOnHover } from "@/lib/utils/prefetchOnHover"
import { PRODUCTS } from "@/lib/mock-data"
import { ALL_PRODUCTS } from "@/data/mock"

const badgeIcons = {
    'new': Sparkles,
    'best-seller': Star,
    'limited': Tag,
}

const badgeColors = {
    'new': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'best-seller': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    'limited': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

export function MegaMenu() {
    const prefetch = usePrefetchOnHover()

    return (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>


                {/* Category Mega Menus */}
                {navigationCategories.map((category) => (
                    <NavigationMenuItem key={category.title}>
                        {category.items.length > 0 ? (
                            <>
                                <NavigationMenuTrigger
                                    className="bg-transparent hover:bg-transparent transition-colors duration-200 focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent p-0"
                                    onMouseEnter={() => prefetch(category.href)}
                                    hideChevron
                                >
                                    <Spotlight className="px-3 py-2 flex items-center gap-0.5">
                                        <span className="text-sm font-medium text-foreground/90 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors relative z-10 uppercase tracking-wide">
                                            {category.title}
                                        </span>
                                        <ChevronDown className="relative top-[1px] h-3 w-3 text-foreground/70 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all duration-300 group-data-[state=open]:rotate-180" />
                                    </Spotlight>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-[800px] p-4 bg-background/98 backdrop-blur-2xl border border-amber-500/10 rounded-xl shadow-2xl"
                                    >
                                        <div className="grid grid-cols-3 gap-4">
                                            {/* Column 1: Category Highlight */}
                                            <div className="col-span-1">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={category.href}
                                                        className="group flex h-full flex-col justify-between rounded-lg bg-gradient-to-br from-amber-500/[0.08] to-amber-500/[0.12] dark:from-primary/5 dark:to-primary/10 p-6 no-underline outline-none transition-all hover:from-amber-500/[0.15] hover:to-amber-500/[0.2] focus:shadow-md border border-amber-500/10"
                                                        onMouseEnter={() => prefetch(category.href)}
                                                    >
                                                        <div>
                                                            <div className="mb-2 text-lg font-semibold text-foreground">
                                                                {category.title}
                                                            </div>
                                                            <p className="text-sm leading-snug text-muted-foreground">
                                                                {category.description}
                                                            </p>
                                                        </div>
                                                        <div className="mt-4 flex items-center text-sm font-medium text-primary">
                                                            Shop All {category.title}
                                                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </div>

                                            {/* Column 2: Subcategories */}
                                            <div className="col-span-2">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {category.items.map((item) => {
                                                        // Dynamic Image Lookup
                                                        const getImage = () => {
                                                            const searchTerm = item.title.toLowerCase();
                                                            const product = ALL_PRODUCTS.find(p => {
                                                                const pCategory = (p as any).category || p.categories?.name;
                                                                const pSubcategory = (p as any).subcategory || (p as any).sub_category;

                                                                return (
                                                                    (pCategory?.toLowerCase() === searchTerm ||
                                                                        pSubcategory?.toLowerCase() === searchTerm ||
                                                                        p.tags?.some((tag: string) => tag.toLowerCase() === searchTerm)) &&
                                                                    !p.image?.includes("bottle.png") &&
                                                                    !p.image?.includes("placeholder.png")
                                                                );
                                                            });
                                                            return product?.image || item.image || "/bottle.png";
                                                        };

                                                        const displayImage = getImage();

                                                        return (
                                                            <div key={item.title} className="group block rounded-md p-3 transition-colors hover:bg-amber-500/10 text-foreground">
                                                                <div className="flex items-start gap-3">
                                                                    {displayImage && (
                                                                        <div className="relative h-12 w-12 flex-shrink-0">
                                                                            <NavigationMenuLink asChild>
                                                                                <Link href={item.href} onMouseEnter={() => prefetch(item.href)}>
                                                                                    <CategoryImage
                                                                                        src={displayImage}
                                                                                        alt={item.title}
                                                                                        category={item.title}
                                                                                        className="h-full w-full"
                                                                                    />
                                                                                </Link>
                                                                            </NavigationMenuLink>
                                                                        </div>
                                                                    )}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <NavigationMenuLink asChild>
                                                                                <Link
                                                                                    href={item.href}
                                                                                    className="flex flex-col hover:text-amber-500 transition-colors"
                                                                                    onMouseEnter={() => prefetch(item.href)}
                                                                                >
                                                                                    <span className="font-bold text-sm tracking-tight">
                                                                                        {item.title}
                                                                                    </span>
                                                                                    {item.description && (
                                                                                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-tight">
                                                                                            {item.description}
                                                                                        </p>
                                                                                    )}
                                                                                </Link>
                                                                            </NavigationMenuLink>
                                                                            {item.badge && (
                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className={cn("h-4 px-1 text-[9px] font-bold uppercase shrink-0", badgeColors[item.badge])}
                                                                                >
                                                                                    {item.badge}
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                        {item.subcategories && item.subcategories.length > 0 && (
                                                                            <div className="mt-3 flex flex-col gap-1.5 border-l-2 border-border/40 pl-3">
                                                                                {item.subcategories.map((sub) => (
                                                                                    <NavigationMenuLink key={sub.title} asChild>
                                                                                        <Link
                                                                                            href={sub.href}
                                                                                            className="group/link flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1"
                                                                                            onMouseEnter={() => prefetch(sub.href)}
                                                                                        >
                                                                                            <span className="w-1 h-1 rounded-full bg-amber-500/0 group-hover/link:bg-amber-500 mr-2 transition-all duration-300 scale-0 group-hover/link:scale-100" />
                                                                                            <span className="group-hover/link:font-medium transition-colors duration-200">{sub.title}</span>
                                                                                        </Link>
                                                                                    </NavigationMenuLink>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                {/* Promotional Callout & Featured Brands */}
                                                {/* Promotional Callout & Featured Brands */}
                                                <div className="mt-6">
                                                    {/* Promo Line */}
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground pb-3">
                                                        <Tag className="h-3.5 w-3.5 text-amber-500" />
                                                        <span>Free shipping on orders over <span className="text-foreground font-medium">100 JOD</span></span>
                                                    </div>

                                                    {/* Featured Brands Row */}
                                                    {category.featuredBrands && category.featuredBrands.length > 0 && (
                                                        <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center gap-3">
                                                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold shrink-0">Featured Brands:</span>
                                                            <div className="flex flex-wrap gap-2">
                                                                {category.featuredBrands.map(brand => (
                                                                    <Link
                                                                        key={brand.name}
                                                                        href={brand.href}
                                                                        className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-muted/40 hover:bg-amber-500/10 hover:text-amber-600 border border-transparent hover:border-amber-500/20 transition-all whitespace-nowrap"
                                                                    >
                                                                        {brand.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={category.href} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-transparent hover:bg-transparent transition-colors duration-200 p-0"
                                    )}
                                    onMouseEnter={() => prefetch(category.href)}
                                >
                                    <Spotlight className="px-4 py-2 text-foreground/90 hover:text-amber-600 dark:hover:text-amber-400">
                                        <span className="text-sm font-medium transition-colors relative z-10 uppercase tracking-wide">
                                            {category.title}
                                        </span>
                                    </Spotlight>
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}

            </NavigationMenuList>
        </NavigationMenu>
    )
}
