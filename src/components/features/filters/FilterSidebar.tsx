"use client"

import * as React from "react"
import { useFilterStore } from "@/lib/stores/filters"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

import { AppliedFilters } from "./AppliedFilters"

export function FilterSidebar() {
    const {
        priceRange,
        setFilter,
        brands,
        category,
        resetFilters
    } = useFilterStore()

    const [allBrands, setAllBrands] = React.useState<string[]>([])
    const [categories, setCategories] = React.useState<string[]>([])

    React.useEffect(() => {
        fetch('/api/facets')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAllBrands(data.brands)
                    setCategories(data.categories)
                }
            })
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Discovery</h3>
            </div>

            <AppliedFilters />

            <Accordion type="multiple" defaultValue={["category", "price", "brand"]} className="w-full">
                {/* Category */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <div key={cat} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${cat}`}
                                        checked={category?.toLowerCase() === cat.toLowerCase()}
                                        onCheckedChange={(checked) => setFilter("category", checked ? cat : null)}
                                    />
                                    <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">{cat}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-1 pt-4 pb-2">
                            <Slider
                                defaultValue={[0, 1000]}
                                value={priceRange}
                                max={2000}
                                step={10}
                                min={0}
                                onValueChange={(val) => setFilter("priceRange", val as [number, number])}
                            />
                            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Brand */}
                <AccordionItem value="brand">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                            {allBrands.map((brand) => (
                                <div key={brand} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`brand-${brand}`}
                                        checked={brands.includes(brand)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFilter("brands", [...brands, brand])
                                            } else {
                                                setFilter("brands", brands.filter(b => b !== brand))
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">{brand}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
