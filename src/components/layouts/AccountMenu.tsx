"use client"

import Link from "next/link"
import { toast } from "sonner"
import { LogOut, User, Settings, Package } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ShimmerButton from "@/components/ui/extension/ShimmerButton"
import { RainbowButton } from "@/components/ui/extension/RainbowButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useTheme } from "next-themes"

export function AccountMenu() {
    const { user, isAuthenticated, logout } = useAuthStore()
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    if (!isAuthenticated) {
        return (
            <div className="hidden md:flex gap-2">
                {/* Login Button - Orange in light mode, White in dark mode */}
                <Link href="/login">
                    <ShimmerButton
                        background={isDark ? "#FFFFFF" : "#F97316"}
                        shimmerColor="transparent"
                        shimmerSize="0.1em"
                        shimmerDuration="0s"
                        className={cn(
                            "h-9 px-4 text-sm font-medium rounded-md",
                            isDark ? "text-stone-900" : "text-white"
                        )}
                    >
                        Login
                    </ShimmerButton>
                </Link>
                {/* Sign Up Button - Dark in light mode, Orange in dark mode */}
                <Link href="/signup">
                    <ShimmerButton
                        background={isDark ? "#F59E0B" : "#1C1917"}
                        shimmerColor={isDark ? "#FDE68A" : "#F5A623"}
                        shimmerSize="0.1em"
                        shimmerDuration="3s"
                        className={cn(
                            "h-9 px-4 text-sm font-medium rounded-md",
                            isDark ? "text-stone-900" : "text-white"
                        )}
                    >
                        Sign Up
                    </ShimmerButton>
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
