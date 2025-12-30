"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { MobileNav } from "./MobileNav"
import { SearchBar } from "@/components/features/search/SearchBar"
import { MegaMenu } from "./MegaMenu"
import { AccountMenu } from "./AccountMenu"
import { ShoppingBag } from "lucide-react"
import { useCartStore, selectTotalItems } from "@/lib/stores/cart"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { Spotlight } from "@/components/ui/extension/Spotlight"
import { staticNavLinks } from "@/config/navigation"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function Header() {
    const pathname = usePathname()
    const { scrollDirection, scrollY } = useScrollDirection()
    const isScrolled = scrollY > 50
    const [hidden, setHidden] = useState(false)
    const totalItems = useCartStore(selectTotalItems)

    useEffect(() => {
        if (scrollDirection === "down" && isScrolled) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    }, [scrollDirection, isScrolled])

    if (pathname?.startsWith("/checkout") || pathname?.startsWith("/admin")) {
        return null
    }


    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
                    hidden ? "-translate-y-full" : "translate-y-0",
                    isScrolled
                        ? "bg-background/90 backdrop-blur-xl border-b border-border py-1 shadow-2xl"
                        : "bg-transparent border-b border-transparent py-3"
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6 h-full gap-8">
                    {/* Left: Logo & Reduced Mega Menu */}
                    <div className="flex items-center gap-6 shrink-0">
                        <MobileNav />
                        <Link href="/" className="flex items-center gap-2 group relative z-10" aria-label="Balisan Home">
                            <Logo height={isScrolled ? 64 : 80} className="md:block hidden transition-all duration-300" />
                            <Logo height={48} className="md:hidden block" />
                        </Link>

                        <div className="hidden lg:block">
                            <MegaMenu />
                        </div>
                    </div>

                    {/* Center: Focal Search Bar */}
                    <div className="flex-1 max-w-xl hidden md:block group">
                        <SearchBar className={cn(
                            "w-full transition-all duration-300",
                            isScrolled
                                ? "h-10 bg-muted/40 border-border text-foreground placeholder:text-muted-foreground focus:bg-muted/60"
                                : "h-12 bg-muted/80 text-foreground shadow-lg border-border"
                        )} />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <div className="hidden lg:flex items-center gap-2 mr-2">
                            {staticNavLinks.slice(0, 1).map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="block"
                                >
                                    <Spotlight className="px-4 py-2">
                                        <span className="text-sm font-medium text-foreground/90 group-hover:text-amber-400 transition-colors relative z-10">
                                            {link.title}
                                        </span>
                                    </Spotlight>
                                </Link>
                            ))}
                        </div>


                        {/* Mobile Search Trigger */}
                        <div className="md:hidden">
                            <SearchBar mobile className="w-9 px-0 border-none bg-transparent hover:bg-transparent" />
                        </div>

                        <ModeToggle />
                        <ModeToggle />

                        <Button variant="ghost" size="icon" className="relative group" asChild aria-label="Open Cart">
                            <Link href="/cart">
                                {totalItems > 0 && (
                                    <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
                                        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,var(--primary),55%,transparent)] opacity-30 bg-[length:200%_100%] animate-shimmer" />
                                    </div>
                                )}
                                <ShoppingBag className={cn("h-5 w-5 transition-all duration-300 group-hover:scale-110", totalItems > 0 && "text-amber-500")} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </Button>

                        <AccountMenu />
                    </div>
                </div>
            </header>
        </>
    )
}
