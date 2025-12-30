"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Plus, Minus, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Ingredient {
    name: string
    color: string
    parts: number // Base parts for ratio
}

interface InteractiveRecipeBuilderProps {
    cocktailName: string
    ingredients: Ingredient[]
    baseServings?: number
}

export function InteractiveRecipeBuilder({
    cocktailName,
    ingredients: initialIngredients,
    baseServings = 1
}: InteractiveRecipeBuilderProps) {
    const [servings, setServings] = React.useState(baseServings)

    // Calculate total parts for percentage heights
    const totalParts = initialIngredients.reduce((acc, curr) => acc + curr.parts, 0)

    const handleServingChange = (value: number[]) => {
        setServings(value[0])
    }

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center p-8 border rounded-3xl bg-background/50 backdrop-blur-sm shadow-sm md:aspect-[2/1]">
            <div className="relative h-[400px] w-full flex items-end justify-center">
                <div className="relative w-32 md:w-40 h-80 border-x-2 border-b-2 border-primary/20 rounded-b-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-2xl">
                    <div className="absolute bottom-0 w-full flex flex-col-reverse transition-all duration-500 ease-out" style={{ height: '90%' }}>
                        {initialIngredients.map((ing, idx) => {
                            const heightPercentage = (ing.parts / totalParts) * 100
                            return (
                                <div
                                    key={ing.name}
                                    className="w-full flex items-center justify-center text-[10px] font-bold text-white/90 shadow-sm transition-all duration-700"
                                    style={{
                                        height: `${heightPercentage}%`,
                                        backgroundColor: ing.color,
                                        opacity: 0.8 + (idx * 0.05)
                                    }}
                                >
                                    <span className="drop-shadow-md">{ing.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="absolute w-32 md:w-40 h-80 pointer-events-none rounded-b-xl overflow-hidden pb-1">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent opacity-50" />
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-display font-bold mb-2">{cocktailName} Builder</h3>
                    <p className="text-muted-foreground">Adjust servings to calculate exact measurements.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="font-bold uppercase tracking-widest text-xs">Servings</span>
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setServings(Math.max(1, servings - 1))}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xl font-bold font-display w-8 text-center">{servings}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setServings(Math.max(1, servings + 1))}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <Slider
                        value={[servings]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={handleServingChange}
                        className="py-4"
                    />

                    <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Measurements</h4>
                        {initialIngredients.map((ing) => (
                            <div key={ing.name} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ing.color }} />
                                    <span className="font-medium">{ing.name}</span>
                                </div>
                                <span className="font-bold tabnums">
                                    {(ing.parts * servings).toFixed(1)} oz
                                </span>
                            </div>
                        ))}
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => setServings(1)} className="w-full text-muted-foreground hover:text-primary">
                        <RefreshCcw className="mr-2 h-3 w-3" />
                        Reset to Single Serving
                    </Button>
                </div>
            </div>
        </div>
    )
}
