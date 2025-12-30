"use client"

import { ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function AgeVerificationBadge() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge
                        variant="outline"
                        className="gap-1 cursor-help border-balisan-amber/50 text-balisan-amber hover:bg-balisan-amber/10"
                    >
                        <ShieldCheck className="h-3 w-3" />
                        21+
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Age verification required for purchase</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
