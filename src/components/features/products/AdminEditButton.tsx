"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdminEditButtonProps {
    productSlug: string
    className?: string
}

export function AdminEditButton({ productSlug, className }: AdminEditButtonProps) {
    const { isAdmin } = useAuthStore()

    if (!isAdmin) {
        return null
    }

    return (
        <Button
            asChild
            size="icon"
            variant="outline"
            className={cn(
                "absolute top-0 right-0 z-10",
                "bg-blue-500/90 hover:bg-blue-600 border-blue-600",
                "text-white hover:text-white",
                "shadow-lg backdrop-blur-sm",
                "transition-all duration-200",
                "hover:scale-105",
                className
            )}
            title="Edit Product (Admin)"
        >
            <Link href={`/admin/products/edit/${productSlug}`}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Product</span>
            </Link>
        </Button>
    )
}
