"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroVideoDialogProps {
    videoSrc: string
    thumbnailSrc: string
    thumbnailAlt?: string
    className?: string
    animationStyle?: "from-center" | "from-top" | "from-bottom" | "from-left" | "from-right"
}

const animationVariants = {
    "from-center": {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
    },
    "from-top": {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100%", opacity: 0 },
    },
    "from-bottom": {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
    },
    "from-left": {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 },
    },
    "from-right": {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
    },
}

export function HeroVideoDialog({
    videoSrc,
    thumbnailSrc,
    thumbnailAlt = "Video thumbnail",
    className,
    animationStyle = "from-center",
}: HeroVideoDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    const variants = animationVariants[animationStyle]

    // Determine if it's a YouTube video
    const isYouTube = videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be")

    const getYouTubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const videoId = match && match[2].length === 11 ? match[2] : null
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
    }

    return (
        <>
            {/* Thumbnail Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "relative group overflow-hidden rounded-xl cursor-pointer",
                    className
                )}
            >
                <Image
                    src={thumbnailSrc}
                    alt={thumbnailAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-black fill-black ml-1" />
                    </div>
                </div>
            </button>

            {/* Video Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>

                        {/* Video Container */}
                        <motion.div
                            initial={variants.initial}
                            animate={variants.animate}
                            exit={variants.exit}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
                        >
                            {isYouTube ? (
                                <iframe
                                    src={getYouTubeEmbedUrl(videoSrc)}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            ) : (
                                <video
                                    src={videoSrc}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
