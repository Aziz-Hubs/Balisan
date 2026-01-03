"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    ShieldCheck,
    ChevronRight,
    Store,
    Layers,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
    {
        title: "General",
        items: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Catalog",
        items: [
            {
                title: "Products",
                url: "/admin/products",
                icon: Package,
            },
            {
                title: "Categories",
                url: "/admin/categories",
                icon: Layers,
            },
            {
                title: "Orders",
                url: "/admin/orders",
                icon: ShoppingBag,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Customers",
                url: "/admin/customers",
                icon: Users,
            },
            {
                title: "Compliance",
                url: "/admin/compliance",
                icon: ShieldCheck,
            },
        ],
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar variant="sidebar" className="border-r border-border bg-balisan-black text-white">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-white/10">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-balisan-amber rounded flex items-center justify-center">
                        <span className="text-balisan-black font-bold text-xl">B</span>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-white">
                        BALISAN <span className="text-balisan-amber text-xs align-top ml-1">ADMIN</span>
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="py-4">
                {navItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-white/40 text-[10px] uppercase tracking-wider px-6 mb-2">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.url}
                                            className={cn(
                                                "px-6 h-10 transition-colors hover:bg-white/10 hover:text-white",
                                                pathname === item.url ? "bg-balisan-amber/10 text-balisan-amber" : "text-white/70"
                                            )}
                                        >
                                            <Link href={item.url} className="flex items-center gap-3">
                                                <item.icon className={cn("w-4 h-4", pathname === item.url ? "text-balisan-amber" : "text-white/60")} />
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="text-white/60 hover:text-white hover:bg-white/10 px-4"
                        >
                            <Link href="/" className="flex items-center gap-3">
                                <Store className="w-4 h-4" />
                                <span>Back to Store</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
