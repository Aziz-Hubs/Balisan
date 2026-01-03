"use client"

import Link from "next/link"
import { Menu, User, ShoppingBag, LogIn, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/stores/auth"
import { useUIStore } from "@/lib/stores/ui"
import { navigationCategories, staticNavLinks } from "@/config/navigation"
import { SearchBar } from "@/components/features/search/SearchBar"
import { AgeVerificationBadge } from "@/components/layouts/AgeVerificationBadge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/ui/Logo"
import ShimmerButton from "@/components/ui/extension/ShimmerButton"
import { RainbowButton } from "@/components/ui/extension/RainbowButton"

export function MobileNav() {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
    const { isAuthenticated, logout } = useAuthStore()
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"
    const [openItem, setOpenItem] = useState<string>("")
    const router = useRouter()

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    }

    const handleLinkClick = (href: string) => {
        closeMobileMenu()
        router.push(href)
    }

    return (
        <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 flex flex-col border-border bg-background backdrop-blur-xl">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4 pr-10">
                        <Link href="/" onClick={closeMobileMenu}>
                            <Logo height={32} rainbow />
                        </Link>
                        <AgeVerificationBadge />
                    </div>
                    <SearchBar mobile />
                </div>


                <ScrollArea className="flex-1">
                    <div className="p-4">
                        <motion.nav
                            className="flex flex-col gap-1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="/"
                                    className="flex items-center justify-between py-3 px-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-foreground/90"
                                    onClick={closeMobileMenu}
                                >
                                    Home
                                </Link>
                            </motion.div>

                            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="w-full">
                                {navigationCategories.map((category) => (
                                    <motion.div variants={itemVariants} key={category.title}>
                                        <AccordionItem value={category.title} className="border-border border-b-0">
                                            <div className="flex items-center gap-1">
                                                <Link
                                                    href={category.href}
                                                    className="flex-1 py-3 px-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-foreground/90"
                                                    onClick={closeMobileMenu}
                                                >
                                                    {category.title}
                                                </Link>
                                                <AccordionTrigger className="w-12 h-11 p-0 flex items-center justify-center hover:bg-accent rounded-md transition-colors border-none [&>svg]:h-4 [&>svg]:w-4" />
                                            </div>
                                            <AccordionContent>
                                                <div className="flex flex-col pl-4 gap-1 border-l-2 border-border ml-2 my-1">
                                                    <Button
                                                        variant="ghost"
                                                        className="justify-start h-auto py-2.5 px-2 text-amber-500 font-bold hover:bg-amber-500/10 hover:text-amber-500"
                                                        onClick={() => handleLinkClick(category.href)}
                                                    >
                                                        Shop All {category.title}
                                                    </Button>
                                                    {category.items.map((item) => (
                                                        <div key={item.title}>
                                                            {item.subcategories ? (
                                                                <div className="flex flex-col gap-0.5">
                                                                    <div className="flex items-center group">
                                                                        <Link
                                                                            href={item.href}
                                                                            className="flex-1 py-2 px-2 font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-all"
                                                                            onClick={closeMobileMenu}
                                                                        >
                                                                            {item.title}
                                                                        </Link>
                                                                    </div>
                                                                    <div className="flex flex-col pl-4 border-l border-border ml-2 my-0.5">
                                                                        {item.subcategories.map((sub) => (
                                                                            <Link
                                                                                key={sub.title}
                                                                                href={sub.href}
                                                                                className="py-1.5 px-2 text-sm text-muted-foreground hover:text-amber-500 transition-colors rounded-md hover:bg-accent/30"
                                                                                onClick={closeMobileMenu}
                                                                            >
                                                                                {sub.title}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    href={item.href}
                                                                    className="flex items-center py-2 px-2 text-sm text-foreground/80 hover:text-amber-500 hover:bg-accent/50 rounded-md transition-colors"
                                                                    onClick={closeMobileMenu}
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {category.featuredBrands && category.featuredBrands.length > 0 && (
                                                        <div className="mt-4 px-2">
                                                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Featured Brands</span>
                                                            <div className="flex flex-wrap gap-2">
                                                                {category.featuredBrands.map(brand => (
                                                                    <Link
                                                                        key={brand.name}
                                                                        href={brand.href}
                                                                        className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border/50 hover:bg-accent hover:text-amber-500 transition-colors"
                                                                        onClick={closeMobileMenu}
                                                                    >
                                                                        {brand.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                ))}
                            </Accordion>

                            {staticNavLinks.filter(link => link.title !== "Home").map((link) => (
                                <motion.div variants={itemVariants} key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center justify-between py-3 px-2 text-sm font-medium hover:bg-accent rounded-md transition-colors text-foreground/90"
                                        onClick={closeMobileMenu}
                                    >
                                        {link.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    </div>
                </ScrollArea>

                <div className="border-t p-6 bg-muted/20 backdrop-blur-sm">
                    {isAuthenticated ? (
                        <div className="space-y-3">
                            <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-base" onClick={() => handleLinkClick("/account")}>
                                <User className="h-5 w-5" />
                                My Account
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-base text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
                                <LogIn className="h-5 w-5 rotate-180" />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link href="/login" className="w-full" onClick={closeMobileMenu}>
                                <ShimmerButton
                                    background={isDark ? "#000000" : "#ffffff"}
                                    shimmerColor="#F5A623"
                                    shimmerSize="0.1em"
                                    shimmerDuration="2s"
                                    className={cn(
                                        "w-full h-12 text-sm font-medium rounded-xl border-amber-500/20",
                                        isDark ? "text-white" : "text-black"
                                    )}
                                >
                                    Login
                                </ShimmerButton>
                            </Link>
                            <Link href="/signup" className="w-full" onClick={closeMobileMenu}>
                                <RainbowButton className="w-full h-12 text-sm font-medium">
                                    Sign Up
                                </RainbowButton>
                            </Link>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
