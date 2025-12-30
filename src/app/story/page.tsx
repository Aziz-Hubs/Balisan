"use client"

import * as React from "react"
import { AmbientBackground } from '@/components/features/content/AmbientBackground'
import { StoryScroll, type StoryStep } from '@/components/features/content/StoryScroll'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const storySteps: StoryStep[] = [
    {
        id: "heritage",
        title: "Heritage & Craft",
        description: "Founded in 1928, Balisan began as a small family cellar in the heart of wine country. Our commitment to traditional methods has remained unchanged for nearly a century.",
        image: "/bottle.png",
        align: "left" as const
    },
    {
        id: "selection",
        title: "Curated Excellence",
        description: " Every bottle in our collection is hand-picked by our Master Sommeliers. We travel the globe to find rare vintages and small-batch spirits that define quality.",
        image: "/bottle.png",
        align: "right" as const
    },
    {
        id: "experience",
        title: "The Art of Tasting",
        description: "We believe tasting is an experience, not just a drink. Our flagship boutique offers private tasting rooms and educational workshops for connoisseurs.",
        image: "/bottle.png",
        align: "left" as const
    },
    {
        id: "community",
        title: "A Global Community",
        description: "From Tokyo to New York, the Balisan community shares a passion for exceptional spirits. Join our events and exclusive member gatherings worldwide.",
        image: "/bottle.png",
        align: "right" as const
    }
]

export default function StoryPage() {
    return (
        <main className="min-h-screen">
            <AmbientBackground
                posterUrl="/bottle.png"
                className="h-[80vh] flex items-center justify-center text-center"
                overlayOpacity={0.5}
            >
                <div className="container mx-auto px-4 space-y-6 animate-in fade-in zoom-in duration-1000">
                    <span className="text-sm md:text-base font-bold tracking-[0.3em] text-white/80 uppercase">Est. 1928</span>
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-white leading-tight">
                        The Balisan <br />Legacy.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                        A century of dedication to the finest spirits and wines from around the world.
                    </p>
                </div>
            </AmbientBackground>

            <div className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center mb-24">
                    <h2 className="text-3xl font-display font-semibold">Our Journey</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mt-6" />
                </div>

                <StoryScroll steps={storySteps} className="pb-24" />

                <div className="container mx-auto px-4 py-24 border-t flex flex-col items-center text-center space-y-8">
                    <h2 className="text-4xl font-display font-bold">Experience it Yourself</h2>
                    <p className="text-lg text-muted-foreground max-w-xl">
                        Explore our curated collection or visit our flagship store to taste the legacy.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg" asChild>
                        <Link href="/shop">
                            Shop the Collection <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
