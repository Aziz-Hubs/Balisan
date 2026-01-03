"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types"
import { ProductCard } from "@/components/features/products/ProductCard"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface RelatedProductsCarouselProps {
    products: Product[]
    title?: string
}

export function RelatedProductsCarousel({ products, title = "Related Products" }: RelatedProductsCarouselProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)

    const updateScrollButtons = React.useCallback(() => {
        if (!scrollContainerRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 5)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }, [])

    React.useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        updateScrollButtons()
        container.addEventListener("scroll", updateScrollButtons)
        window.addEventListener("resize", updateScrollButtons)

        return () => {
            container.removeEventListener("scroll", updateScrollButtons)
            window.removeEventListener("resize", updateScrollButtons)
        }
    }, [updateScrollButtons])

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return
        const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        })
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="mt-24 relative">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

                {/* Navigation Buttons - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={cn(
                            "h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-800",
                            "transition-all duration-200",
                            !canScrollLeft && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={cn(
                            "h-10 w-10 rounded-full border-zinc-200 dark:border-zinc-800",
                            "transition-all duration-200",
                            !canScrollRight && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Edge Fade - Left */}
                <div
                    className={cn(
                        "absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
                        !canScrollLeft && "opacity-0"
                    )}
                />

                {/* Edge Fade - Right */}
                <div
                    className={cn(
                        "absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-200",
                        !canScrollRight && "opacity-0"
                    )}
                />

                {/* Scrollable Area */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 touch-pan-x"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch"
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] snap-start"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Navigation Dots (optional indicator) */}
            <div className="flex justify-center gap-1 mt-4 md:hidden">
                {products.slice(0, Math.min(products.length, 5)).map((_, index) => (
                    <div
                        key={index}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                    />
                ))}
            </div>
        </div>
    )
}
