"use client"

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { FilterSidebar } from "./FilterSidebar"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFilterStore } from "@/lib/stores/filters"
import * as React from "react"

export function FilterSheet() {
    const { resetFilters } = useFilterStore()
    const [open, setOpen] = React.useState(false)

    const handleApply = () => {
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
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
                        onClick={() => resetFilters()}
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

