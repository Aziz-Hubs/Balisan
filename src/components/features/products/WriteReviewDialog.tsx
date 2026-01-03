"use client"

import { useState } from "react"
import { Star, X, Send, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Product } from "@/types"

interface WriteReviewDialogProps {
    product: Product
    children: React.ReactNode
}

export function WriteReviewDialog({ product, children }: WriteReviewDialogProps) {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0 || !review.trim() || !name.trim() || !email.trim()) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // In a real app, you'd send this to your backend
        console.log({
            productId: product.id,
            rating,
            title,
            review,
            name,
            email,
        })

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset and close after showing success
        setTimeout(() => {
            setOpen(false)
            setIsSubmitted(false)
            setRating(0)
            setTitle("")
            setReview("")
            setName("")
            setEmail("")
        }, 2000)
    }

    const displayRating = hoveredRating || rating

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-amber-200/50 dark:border-amber-800/50">
                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-16 px-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="mb-6 p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                            >
                                <CheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                            <p className="text-muted-foreground">
                                Your review has been submitted successfully. We appreciate your feedback!
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-b border-amber-200/50 dark:border-amber-800/50">
                                <DialogTitle className="text-xl font-display">Write a Review</DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                    Share your experience with <span className="font-semibold text-foreground">{product.name}</span>
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Star Rating */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        Your Rating <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-sm"
                                            >
                                                <Star
                                                    className={cn(
                                                        "h-8 w-8 transition-colors duration-150",
                                                        star <= displayRating
                                                            ? "fill-amber-500 text-amber-500"
                                                            : "fill-none text-zinc-300 dark:text-zinc-600"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {displayRating > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            {displayRating === 1 && "Poor"}
                                            {displayRating === 2 && "Fair"}
                                            {displayRating === 3 && "Good"}
                                            {displayRating === 4 && "Very Good"}
                                            {displayRating === 5 && "Excellent"}
                                        </p>
                                    )}
                                </div>

                                {/* Review Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium">
                                        Review Title
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="Summarize your experience"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </div>

                                {/* Review Content */}
                                <div className="space-y-2">
                                    <Label htmlFor="review" className="text-sm font-medium">
                                        Your Review <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="review"
                                        placeholder="Tell others about your experience with this product..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        rows={4}
                                        className="border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:ring-amber-500 resize-none"
                                        required
                                    />
                                </div>

                                {/* Name and Email */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:ring-amber-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:ring-amber-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Your email will not be published. Required fields are marked with <span className="text-red-500">*</span>
                                </p>

                                {/* Submit Button */}
                                <div className="flex gap-3 pt-2">
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" className="flex-1">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        disabled={rating === 0 || !review.trim() || !name.trim() || !email.trim() || isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                Submit Review
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
