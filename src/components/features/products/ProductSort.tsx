"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ProductSort() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const sortBy = searchParams.get("sort") || "relevance"

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "relevance") {
            params.delete("sort")
        } else {
            params.set("sort", value)
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <Select
            value={sortBy}
            onValueChange={handleSortChange}
        >
            <SelectTrigger className="w-[140px] sm:w-[180px] h-10 px-4 rounded-xl border bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 font-medium transition-all hover:bg-white dark:hover:bg-zinc-800 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 shadow-sm">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
        </Select>
    )
}
