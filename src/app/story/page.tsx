"use client"

import * as React from "react"
import { StoryHero } from "@/components/features/story/StoryHero"
import { TimelineSection } from "@/components/features/story/TimelineSection"
import { PhilosophyGrid } from "@/components/features/story/PhilosophyGrid"
import { CuratorSpotlight } from "@/components/features/story/CuratorSpotlight"

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-background">
            <StoryHero />
            <PhilosophyGrid />
            <TimelineSection />
            <CuratorSpotlight />
        </main>
    )
}
