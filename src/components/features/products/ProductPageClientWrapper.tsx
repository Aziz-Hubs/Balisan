"use client"

import { useRef } from "react"
import { Product } from "@/types"
import { MobileStickyFooter } from "./MobileStickyFooter"

interface ProductPageClientWrapperProps {
    product: Product
    children: (heroRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode
}

export function ProductPageClientWrapper({ product, children }: ProductPageClientWrapperProps) {
    const heroRef = useRef<HTMLDivElement>(null)

    return (
        <>
            {children(heroRef)}
            <MobileStickyFooter product={product} heroRef={heroRef} />
        </>
    )
}
