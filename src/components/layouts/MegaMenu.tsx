"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Star, Sparkles, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
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
                                    className="bg-transparent hover:bg-accent/50 transition-colors duration-200 focus:bg-accent/50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                    onMouseEnter={() => prefetch(category.href)}
                                >
                                    {category.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-[800px] p-4"
                                    >
                                        <div className="grid grid-cols-3 gap-4">
                                            {/* Column 1: Category Highlight */}
                                            <div className="col-span-1">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={category.href}
                                                        className="group flex h-full flex-col justify-between rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-6 no-underline outline-none transition-all hover:from-primary/10 hover:to-primary/15 focus:shadow-md"
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
                                                    {category.items.map((item) => (
                                                        <div key={item.title}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={item.href}
                                                                    className="group block rounded-md p-3 transition-colors hover:bg-accent"
                                                                    onMouseEnter={() => prefetch(item.href)}
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        {item.image && (
                                                                            <div className="relative h-12 w-12 flex-shrink-0">
                                                                                <CategoryImage
                                                                                    src={item.image}
                                                                                    alt={item.title}
                                                                                    category={item.title}
                                                                                    className="h-full w-full"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="flex items-start justify-between gap-2">
                                                                                <div className="flex flex-col">
                                                                                    <span className="font-bold text-sm tracking-tight">
                                                                                        {item.title}
                                                                                    </span>
                                                                                    {item.description && (
                                                                                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-tight">
                                                                                            {item.description}
                                                                                        </p>
                                                                                    )}
                                                                                </div>
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
                                                                                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                                                                    {item.subcategories.map((sub) => (
                                                                                        <span
                                                                                            key={sub.title}
                                                                                            className="text-[10px] font-medium text-muted-foreground/70 hover:text-primary transition-colors"
                                                                                        >
                                                                                            {sub.title}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Promotional Callout */}
                                                <div className="mt-4 pt-4 border-t">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Tag className="h-3.5 w-3.5 text-primary" />
                                                        <span>Free shipping on orders over $150</span>
                                                    </div>
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
                                        "bg-transparent hover:bg-accent/50 transition-colors duration-200"
                                    )}
                                    onMouseEnter={() => prefetch(category.href)}
                                >
                                    {category.title}
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}

            </NavigationMenuList>
        </NavigationMenu>
    )
}
