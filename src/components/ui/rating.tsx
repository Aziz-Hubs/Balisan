import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number
    max?: number
    className?: string
    size?: "sm" | "default" | "lg"
}

export function Rating({ rating, max = 5, className, size = "default", ...props }: RatingProps) {
    const sizeClasses = {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5"
    }
    const starSize = sizeClasses[size]

    return (
        <div className={cn("flex items-center", className)} {...props}>
            {Array.from({ length: max }).map((_, i) => {
                const isFull = i < Math.floor(rating)
                const isHalf = i === Math.floor(rating) && rating % 1 !== 0

                return (
                    <span key={i} className="relative">
                        <Star
                            className={cn(
                                starSize,
                                isFull
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-transparent text-muted-foreground"
                            )}
                        />
                        {isHalf && (
                            <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
                                <Star className={cn(starSize, "fill-amber-400 text-amber-400")} />
                            </div>
                        )}
                    </span>
                )
            })}
        </div>
    )
}
