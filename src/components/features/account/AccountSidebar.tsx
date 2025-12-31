"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    ShoppingBag,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    User,
    Heart,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/stores/auth"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "/account",
        icon: LayoutDashboard,
    },
    {
        title: "My Collection",
        url: "/account/collection",
        icon: Heart,
    },
    {
        title: "Order History",
        url: "/account/orders",
        icon: ShoppingBag,
    },
    {
        title: "Addresses",
        url: "/account/addresses",
        icon: MapPin,
    },
    {
        title: "Payment Methods",
        url: "/account/payment-methods",
        icon: CreditCard,
    },
    {
        title: "Account Settings",
        url: "/account/settings",
        icon: Settings,
    },
]

export function AccountSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuthStore()
    const { isMobile, setOpenMobile } = useSidebar()

    const handleLogout = async () => {
        logout()
        toast.success("Logged out successfully")
        router.push("/login")
    }

    return (
        <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/95 backdrop-blur-xl">
            <SidebarHeader className="p-4 border-b border-border/10">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <div className="bg-amber-500/10 p-2 rounded-full shrink-0">
                        <User className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
                        <span className="font-semibold text-sm truncate">{user?.name || "Account"}</span>
                        <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="hover:bg-amber-500/10 hover:text-amber-500 data-[active=true]:bg-amber-500/10 data-[active=true]:text-amber-500 transition-colors"
                                        onClick={() => isMobile && setOpenMobile(false)}
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-border/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            tooltip="Logout"
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 group-data-[collapsible=icon]:justify-center"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
