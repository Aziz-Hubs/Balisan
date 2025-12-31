"use client"

import Link from "next/link"
import { toast } from "sonner"
import { LogOut, User, Settings, Package } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spotlight } from "@/components/ui/extension/Spotlight"
import { MovingBorderButton } from "@/components/ui/extension/MovingBorder"
import { LitUpButton } from "@/components/ui/extension/LitUpButton"
import { RainbowButton } from "@/components/ui/extension/RainbowButton"

import { useTheme } from "next-themes"

export function AccountMenu() {
    const { user, isAuthenticated, logout } = useAuthStore()
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    if (!isAuthenticated) {
        return (
            <div className="hidden md:flex items-center gap-3">
                <Link href="/login" className="block">
                    <LitUpButton className="h-10 w-28 text-sm font-medium">
                        Login
                    </LitUpButton>
                </Link>
                <Link href="/signup" className="block">
                    <RainbowButton className="h-10 w-36 shadow-2xl">
                        Sign Up
                    </RainbowButton>
                </Link>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ring-1 ring-border/50 hover:ring-primary/50 hover:bg-amber-500/10 transition-all group">
                    <Avatar className="h-8 w-8 group-hover:scale-105 transition-transform">
                        <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/orders" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/account/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        logout()
                        toast.success("Signed out successfully")
                    }}
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
