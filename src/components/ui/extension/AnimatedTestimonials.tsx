"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
    quote: string
    name: string
    designation: string
    src: string
}

interface AnimatedTestimonialsProps {
    testimonials: Testimonial[]
    autoplay?: boolean
    className?: string
    autoplayInterval?: number
}

export function AnimatedTestimonials({
    testimonials,
    autoplay = false,
    className,
    autoplayInterval = 5000,
}: AnimatedTestimonialsProps) {
    const [active, setActive] = React.useState(0)

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length)
    }

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    React.useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, autoplayInterval)
            return () => clearInterval(interval)
        }
    }, [autoplay, autoplayInterval])

    const randomRotation = () => Math.floor(Math.random() * 21) - 10

    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
                {/* Image Section */}
                <div className="relative h-64 md:h-80 w-full">
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.src}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: randomRotation(),
                                }}
                                animate={{
                                    opacity: index === active ? 1 : 0.7,
                                    scale: index === active ? 1 : 0.95,
                                    z: index === active ? 0 : -100,
                                    rotate: index === active ? 0 : randomRotation(),
                                    zIndex: index === active ? 10 : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: randomRotation(),
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 origin-bottom"
                            >
                                <div className="relative h-full w-full rounded-3xl overflow-hidden">
                                    <Image
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover object-center"
                                        draggable={false}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <h3 className="text-2xl font-bold text-foreground">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {testimonials[active].designation}
                        </p>
                        <motion.p
                            className="mt-6 text-lg text-muted-foreground leading-relaxed"
                        >
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex gap-4 mt-8 md:mt-0">
                        <button
                            onClick={handlePrev}
                            className="h-10 w-10 rounded-full bg-secondary/80 flex items-center justify-center group/button transition-colors hover:bg-secondary"
                        >
                            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover/button:text-foreground transition-colors" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-10 w-10 rounded-full bg-secondary/80 flex items-center justify-center group/button transition-colors hover:bg-secondary"
                        >
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/button:text-foreground transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
