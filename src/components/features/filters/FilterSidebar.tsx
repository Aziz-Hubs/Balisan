"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

import { AppliedFilters } from "./AppliedFilters"

export function FilterSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // URL State
    const category = searchParams.get("category")
    const brandParams = searchParams.getAll("brand")
    const countryParams = searchParams.getAll("country")
    const regionParams = searchParams.getAll("region")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")
    const minAbvParam = searchParams.get("minAbv")
    const maxAbvParam = searchParams.get("maxAbv")

    // Local State for Price Slider
    const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 2000])
    // Local State for ABV Slider
    const [abvRange, setAbvRange] = React.useState<[number, number]>([0, 60])

    const [allBrands, setAllBrands] = React.useState<string[]>([])
    const [categories, setCategories] = React.useState<string[]>([])
    const [countries, setCountries] = React.useState<string[]>([])
    const [regions, setRegions] = React.useState<string[]>([])

    // Sync Price State from URL
    React.useEffect(() => {
        const min = minPriceParam ? parseInt(minPriceParam) : 0
        const max = maxPriceParam ? parseInt(maxPriceParam) : 2000
        setPriceRange([min, max])
    }, [minPriceParam, maxPriceParam])

    // Sync ABV State from URL
    React.useEffect(() => {
        const min = minAbvParam ? parseInt(minAbvParam) : 0
        const max = maxAbvParam ? parseInt(maxAbvParam) : 60
        setAbvRange([min, max])
    }, [minAbvParam, maxAbvParam])

    // Fetch Facets
    React.useEffect(() => {
        fetch('/api/facets')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAllBrands(data.brands || [])
                    setCategories(data.categories || [])
                    setCountries(data.countries || [])
                    setRegions(data.regions || [])
                }
            })
    }, [])

    // Helper to update URL
    const updateUrl = (updates: Record<string, string | string[] | null>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key)
            } else if (Array.isArray(value)) {
                params.delete(key)
                value.forEach(v => params.append(key, v))
            } else {
                params.set(key, value)
            }
        })

        // Reset to page 1 on filter change (if we had pagination)
        // params.delete("page") 

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const handleCategoryChange = (newCategory: string) => {
        updateUrl({ category: newCategory })
    }

    const handleClearCategory = () => {
        updateUrl({ category: null })
    }

    const handleBrandChange = (brand: string, checked: boolean) => {
        const newBrands = checked
            ? [...brandParams, brand]
            : brandParams.filter(b => b !== brand)

        updateUrl({ brand: newBrands })
    }

    const handleCountryChange = (country: string, checked: boolean) => {
        const newCountries = checked
            ? [...countryParams, country]
            : countryParams.filter(c => c !== country)

        updateUrl({ country: newCountries })
    }

    const handleRegionChange = (region: string, checked: boolean) => {
        const newRegions = checked
            ? [...regionParams, region]
            : regionParams.filter(r => r !== region)

        updateUrl({ region: newRegions })
    }

    const handlePriceCommit = (value: number[]) => {
        updateUrl({
            minPrice: value[0].toString(),
            maxPrice: value[1].toString()
        })
    }

    const handleAbvCommit = (value: number[]) => {
        updateUrl({
            minAbv: value[0].toString(),
            maxAbv: value[1].toString()
        })
    }

    return (
        <div className="space-y-6">
            <AppliedFilters />

            <Accordion type="multiple" defaultValue={["category", "price", "abv", "brand", "country", "region"]} className="w-full">
                {/* Category */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup
                            value={category?.toLowerCase() || ""}
                            onValueChange={handleCategoryChange}
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
                                onClick={handleClearCategory}
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
                                onValueChange={(val) => setPriceRange(val as [number, number])}
                                onValueCommit={(val) => handlePriceCommit(val)}
                            />
                            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* ABV */}
                <AccordionItem value="abv">
                    <AccordionTrigger>ABV Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-1 pt-4 pb-2">
                            <Slider
                                value={abvRange}
                                max={60}
                                step={1}
                                min={0}
                                onValueChange={(val) => setAbvRange(val as [number, number])}
                                onValueCommit={(val) => handleAbvCommit(val)}
                            />
                            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                                <span>{abvRange[0]}%</span>
                                <span>{abvRange[1]}%</span>
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
                                            checked={brandParams.includes(brand)}
                                            onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                                        />
                                        <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer flex-1">{brand}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>

                {/* Country */}
                <AccordionItem value="country">
                    <AccordionTrigger>Country</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-[200px] pr-3">
                            <div className="space-y-3">
                                {countries.map((country) => (
                                    <div key={country} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={`country-${country}`}
                                            checked={countryParams.includes(country)}
                                            onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                                        />
                                        <Label htmlFor={`country-${country}`} className="text-sm font-normal cursor-pointer flex-1">{country}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>

                {/* Region */}
                <AccordionItem value="region">
                    <AccordionTrigger>Region</AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="h-[200px] pr-3">
                            <div className="space-y-3">
                                {regions.map((region) => (
                                    <div key={region} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={`region-${region}`}
                                            checked={regionParams.includes(region)}
                                            onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                                        />
                                        <Label htmlFor={`region-${region}`} className="text-sm font-normal cursor-pointer flex-1">{region}</Label>
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

