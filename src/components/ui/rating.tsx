import * as React from "react"
import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number
    max?: number
    className?: string
}

export function Rating({ rating, max = 5, className, ...props }: RatingProps) {
    return (
        <div className={cn("flex items-center", className)} {...props}>
            {Array.from({ length: max }).map((_, i) => {
                const isFull = i < Math.floor(rating)
                const isHalf = i === Math.floor(rating) && rating % 1 !== 0

                return (
                    <span key={i} className="relative">
                        <Star
                            className={cn(
                                "h-4 w-4",
                                isFull
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-transparent text-muted-foreground"
                            )}
                        />
                        {isHalf && (
                            <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            </div>
                        )}
                    </span>
                )
            })}
        </div>
    )
}
