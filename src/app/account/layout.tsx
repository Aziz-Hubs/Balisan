"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AccountSidebar } from "@/components/features/account/AccountSidebar"
import { Separator } from "@/components/ui/separator"

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { isAuthenticated, isAgeVerified } = useAuthStore()
    const [isLoading, setIsLoading] = useState(true)

    // Protect route
    useEffect(() => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${window.location.pathname}`)
            return
        }
        setIsLoading(false)
    }, [isAuthenticated, router])

    if (isLoading) {
        return null // Or a loading spinner
    }

    return (
        <SidebarProvider>
            <AccountSidebar />
            <SidebarInset className="bg-background min-h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-amber-500 transition-colors" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">My Account</span>
                    </div>
                </header>
                <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
