"use client"

import Link from "next/link"
import { Menu, User, ShoppingBag, LogIn, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
import { LitUpButton } from "@/components/ui/extension/LitUpButton"
import { RainbowButton } from "@/components/ui/extension/RainbowButton"
import { Spotlight } from "@/components/ui/extension/Spotlight"
import { Logo } from "@/components/ui/Logo"

export function MobileNav() {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
    const { isAuthenticated, logout } = useAuthStore()
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
                            <Logo height={32} />
                        </Link>
                        <AgeVerificationBadge />
                    </div>
                    <SearchBar />
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
                                            <AccordionTrigger className="hover:no-underline py-3 px-2 hover:bg-accent rounded-md text-sm text-foreground/90">
                                                {category.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col pl-4 gap-1 border-l-2 border-border ml-2 my-1">
                                                    <Button
                                                        variant="ghost"
                                                        className="justify-start h-auto py-2 px-2 text-amber-500 font-medium hover:bg-transparent hover:text-amber-400"
                                                        onClick={() => handleLinkClick(category.href)}
                                                    >
                                                        Shop All {category.title}
                                                    </Button>
                                                    {category.items.map((item) => (
                                                        <div key={item.title}>
                                                            {item.subcategories ? (
                                                                <div className="flex flex-col">
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="justify-start h-auto py-2 px-2 font-medium text-foreground/80 hover:text-foreground"
                                                                        onClick={() => handleLinkClick(item.href)}
                                                                    >
                                                                        {item.title}
                                                                    </Button>
                                                                    <div className="flex flex-col pl-4 border-l border-border ml-2">
                                                                        {item.subcategories.map((sub) => (
                                                                            <Link
                                                                                key={sub.title}
                                                                                href={sub.href}
                                                                                className="py-2 px-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                                                                    className="flex items-center py-2 px-2 text-sm text-foreground/80 hover:text-amber-500 transition-colors"
                                                                    onClick={closeMobileMenu}
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
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
                                <LitUpButton className="w-full h-12 text-sm font-medium">
                                    Login
                                </LitUpButton>
                            </Link>
                            <Link href="/signup" className="w-full" onClick={closeMobileMenu}>
                                <RainbowButton className="w-full h-12 shadow-2xl text-sm font-medium">
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
