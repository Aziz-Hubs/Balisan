"use client"

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { FilterSidebar } from "./FilterSidebar"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter, usePathname } from "next/navigation"
import * as React from "react"

export function FilterSheet() {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    const handleApply = () => {
        setOpen(false)
    }

    const handleReset = () => {
        router.replace(pathname, { scroll: false })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="lg:hidden h-10 px-4 rounded-xl border bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-100 font-medium transition-all hover:bg-white dark:hover:bg-zinc-800 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 shadow-sm"
                >
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1 px-6">
                    <div className="py-4">
                        <FilterSidebar />
                    </div>
                </ScrollArea>
                <SheetFooter className="px-6 py-4 border-t gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleReset}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={handleApply}
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Apply
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

