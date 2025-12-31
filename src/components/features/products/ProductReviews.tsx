"use client"

import { Star, ThumbsUp, CheckCircle } from "lucide-react"
import { Rating } from "@/components/ui/rating"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

interface ProductReviewsProps {
    product: Product
}

export function ProductReviews({ product }: ProductReviewsProps) {
    const totalReviews = product.reviewCount || 12
    const averageRating = product.rating || 4.5

    // Mock reviews generator
    const generateReviews = (count: number) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            author: `Reviewer ${i + 1}`,
            date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            rating: Math.max(3, Math.floor(Math.random() * 2) + 4), // Mostly 4-5 stars
            title: ["Exceptional Quality", "Great Taste", "Smooth Finish", "Highly Recommended", "Worth the Price"][i % 5],
            text: "This is a fantastic spirit. The flavor profile is exactly as described. I would definitely buy this again.",
            verified: true,
            helpful: Math.floor(Math.random() * 20)
        }))
    }

    const reviews = generateReviews(3)

    return (
        <div className="py-12 border-t mt-12" id="reviews">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Customer Reviews</h2>

            <div className="grid gap-12 lg:grid-cols-12">
                {/* Summary Column */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold">{averageRating}</div>
                        <div className="space-y-1">
                            <Rating rating={averageRating} size="lg" />
                            <p className="text-sm text-muted-foreground">{totalReviews} verified reviews</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center text-sm gap-2">
                                <span className="w-3">{stars}</span>
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                <Progress value={stars === 5 ? 70 : stars === 4 ? 20 : 5} className="h-2" />
                                <span className="w-8 text-right text-muted-foreground">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Button className="w-full">Write a Review</Button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-8 space-y-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-8 last:border-0">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-sm">{review.author}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{review.date}</span>
                                            {review.verified && (
                                                <span className="flex items-center text-emerald-600 gap-0.5">
                                                    <CheckCircle className="h-3 w-3" /> Verified Purchase
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Rating rating={review.rating} size="sm" />
                            </div>

                            <h5 className="font-bold mb-2">{review.title}</h5>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                {review.text}
                            </p>

                            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="h-3 w-3" />
                                <span>Helpful ({review.helpful})</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
