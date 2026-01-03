"use client"

import { Star, ThumbsUp, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Rating } from "@/components/ui/rating"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

interface ProductReviewsProps {
    product: Product
}

// Mock reviews data - in production, fetch from database
const mockReviews = [
    {
        id: "1",
        name: "Ahmad Al-Rashid",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        title: "Exceptional Quality",
        comment: "The selection at Balisan is unparalleled. This bottle exceeded my expectations - smooth, complex, and perfect for special occasions.",
        date: "2 weeks ago",
        verified: true,
        helpful: 12,
    },
    {
        id: "2",
        name: "Fatima Khalil",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        title: "Perfect Gift Choice",
        comment: "Bought this as a gift and it was a hit! The packaging was elegant and the delivery was incredibly fast.",
        date: "1 month ago",
        verified: true,
        helpful: 8,
    },
    {
        id: "3",
        name: "Omar Mansour",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        rating: 4,
        title: "Great Value",
        comment: "Excellent taste for the price point. Would definitely purchase again. The tasting notes were spot on.",
        date: "3 weeks ago",
        verified: false,
        helpful: 5,
    },
]

export function ProductReviews({ product }: ProductReviewsProps) {
    const totalReviews = product.review_count || mockReviews.length
    const averageRating = product.rating || 4.5

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    }

    return (
        <div className="py-12 border-t mt-12" id="reviews">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Customer Reviews</h2>
                    <p className="text-muted-foreground text-sm">What our customers are saying</p>
                </div>
                <Button variant="outline" className="gap-2 w-fit">
                    <Star className="h-4 w-4" />
                    Write a Review
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Summary Column */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-4 space-y-6 bg-secondary/5 p-6 rounded-2xl border border-secondary/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold font-display">{averageRating.toFixed(1)}</div>
                        <div className="space-y-1">
                            <Rating rating={averageRating} size="lg" />
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                {totalReviews} verified reviews
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const percentage = stars === 5 ? 72 : stars === 4 ? 20 : stars === 3 ? 5 : 2
                            return (
                                <div key={stars} className="flex items-center text-sm gap-2">
                                    <span className="w-3 font-medium text-muted-foreground">{stars}</span>
                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                    <Progress value={percentage} className="h-2 flex-1" />
                                    <span className="w-8 text-right text-muted-foreground text-xs">{percentage}%</span>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Reviews List */}
                <motion.div
                    className="lg:col-span-8 space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {mockReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            variants={itemVariants}
                            className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-background">
                                        <AvatarImage src={review.avatar} alt={review.name} />
                                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm">{review.name}</span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                </div>
                                <Rating rating={review.rating} size="sm" />
                            </div>

                            {review.title && (
                                <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                            )}
                            <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>

                            <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    Helpful ({review.helpful})
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
