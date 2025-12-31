"use client"

import * as React from "react"
import { useFilterStore } from "@/lib/stores/filters"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

import { AppliedFilters } from "./AppliedFilters"

export function FilterSidebar() {
    const {
        priceRange,
        setFilter,
        brands,
        category,
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
                        <RadioGroup
                            value={category?.toLowerCase() || ""}
                            onValueChange={(value) => setFilter("category", value || null)}
                            className="space-y-3"
                        >
                            {categories.map((cat) => (
                                <div key={cat} className="flex items-center space-x-3">
                                    <RadioGroupItem
                                        value={cat.toLowerCase()}
                                        id={`cat-${cat}`}
                                    />
                                    <Label
                                        htmlFor={`cat-${cat}`}
                                        className="text-sm font-normal cursor-pointer flex-1"
                                    >
                                        {cat}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {category && (
                            <button
                                onClick={() => setFilter("category", null)}
                                className="text-xs text-muted-foreground hover:text-primary mt-3 underline underline-offset-2"
                            >
                                Clear category
                            </button>
                        )}
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
                        <ScrollArea className="h-[200px] pr-3">
                            <div className="space-y-3">
                                {allBrands.map((brand) => (
                                    <div key={brand} className="flex items-center space-x-3">
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
                                        <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer flex-1">{brand}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

