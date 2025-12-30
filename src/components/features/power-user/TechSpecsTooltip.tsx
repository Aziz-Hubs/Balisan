"use client"

import * as React from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

import { useWorkspaceStore } from "@/lib/stores/workspace"
import { Pin, Layout, Check } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming cn utility is available here

interface TechSpecs {
    abv: string
    region: string
    aging: string
    cask: string
}

interface ProductInfo {
    id: string
    name: string
    slug: string
}

interface TechSpecsTooltipProps {
    specs: TechSpecs
    product?: ProductInfo
    children: React.ReactNode
}

export function TechSpecsTooltip({ specs, product, children }: TechSpecsTooltipProps) {
    const { pinItem, unpinItem, pinnedItems } = useWorkspaceStore()

    // Check if pinned
    const isPinned = product ? pinnedItems.some(i => i.id === product.id) : false

    const handlePin = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!product) return

        if (isPinned) {
            unpinItem(product.id)
        } else {
            pinItem({
                id: product.id,
                type: 'product',
                label: product.name,
                link: `/products/${product.slug}`
            })
        }
    }

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="cursor-help inline-block">
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="p-4 w-64 bg-black/90 text-white backdrop-blur-xl border-white/10">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <div className="flex items-center gap-2">
                                <Info className="h-4 w-4 text-primary" />
                                <span className="font-bold font-display uppercase tracking-widest text-xs">Technical Specs</span>
                            </div>
                            {product && (
                                <button
                                    onClick={handlePin}
                                    className={cn(
                                        "h-6 w-6 flex items-center justify-center rounded-full transition-colors",
                                        isPinned ? "bg-primary text-black" : "bg-white/10 hover:bg-white/20 text-white"
                                    )}
                                    title={isPinned ? "Unpin from Workspace" : "Pin to Workspace"}
                                >
                                    {isPinned ? <Check className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-xs">
                            <span className="text-white/50">ABV</span>
                            <span className="font-mono text-primary font-bold">{specs.abv}</span>

                            <span className="text-white/50">Region</span>
                            <span>{specs.region}</span>

                            <span className="text-white/50">Aging</span>
                            <span>{specs.aging}</span>

                            <span className="text-white/50">Cask Type</span>
                            <span>{specs.cask}</span>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
