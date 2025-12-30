"use client"

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { FilterSidebar } from "./FilterSidebar"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export function FilterSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <FilterSidebar />
                </div>
            </SheetContent>
        </Sheet>
    )
}
