"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWorkspaceStore } from "@/lib/stores/workspace"
import { Button } from "@/components/ui/button"
import {
    Pin,
    X,
    ChevronUp,
    ChevronDown,
    Layout,
    Wine
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function WorkspaceDock() {
    const { pinnedItems, unpinItem, isDockOpen, toggleDock } = useWorkspaceStore()
    const pathname = usePathname()

    // Don't show on checkout or admin
    if (pathname?.startsWith("/checkout") || pathname?.startsWith("/admin")) {
        return null
    }

    if (pinnedItems.length === 0 && !isDockOpen) return null

    return (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">

            {/* Main Dock Content */}
            <div className={cn(
                "bg-background/80 backdrop-blur-xl border shadow-2xl rounded-xl overflow-hidden transition-all duration-300 origin-bottom-right w-64",
                isDockOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none h-0"
            )}>
                <div className="p-3 border-b bg-muted/50 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Layout className="h-4 w-4" /> Workspace
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleDock}>
                        <X className="h-3 w-3" />
                    </Button>
                </div>

                <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                    {pinnedItems.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                            Pin products or categories here for quick access.
                        </div>
                    ) : (
                        pinnedItems.map((item) => (
                            <div key={item.id} className="group flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                                <Link href={item.link} className="flex-1 flex items-center gap-3 overflow-hidden">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        {item.type === 'product' ? <Wine className="h-4 w-4 text-primary" /> : <Layout className="h-4 w-4 text-primary" />}
                                    </div>
                                    <span className="text-sm font-medium truncate">{item.label}</span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                    onClick={() => unpinItem(item.id)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={toggleDock}
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
                        >
                            {isDockOpen ? <ChevronDown className="h-6 w-6" /> : <Layout className="h-6 w-6" />}
                            {pinnedItems.length > 0 && !isDockOpen && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-background">
                                    {pinnedItems.length}
                                </span>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>{isDockOpen ? "Close Workspace" : "Open Workspace"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
