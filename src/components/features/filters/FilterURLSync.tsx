"use client"

import { useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

export function FilterURLSync() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    useEffect(() => {
        const slug = params?.slug as string[] | undefined

        if (!slug || slug.length === 0) return

        const routeCategory = slug[0]
        const currentCategoryParam = searchParams.get("category")

        if (routeCategory && currentCategoryParam !== routeCategory) {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set("category", routeCategory)

            router.replace(`?${newParams.toString()}`, { scroll: false })
        }
    }, [params, searchParams, router])

    return null
}
