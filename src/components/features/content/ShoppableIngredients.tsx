'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart';
import { toast } from 'sonner';

interface Ingredient {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface ShoppableIngredientsProps {
    ingredients: Ingredient[];
}

export function ShoppableIngredients({ ingredients }: ShoppableIngredientsProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddAll = () => {
        ingredients.forEach((ing) => {
            addItem({
                id: ing.id,
                name: ing.name,
                price: ing.price,
                image: ing.image,
            });
        });
        toast.success(`Added ${ingredients.length} items to cart`);
    };

    return (
        <div className="rounded-2xl border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Shop these ingredients</h3>
                <Button onClick={handleAddAll} size="sm" variant="outline" className="gap-2">
                    <ShoppingCart className="h-4 w-4" /> Add All
                </Button>
            </div>

            <ul className="divide-y divide-border">
                {ingredients.map((ing) => (
                    <li key={ing.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 relative rounded-md overflow-hidden border">
                                <img
                                    src={ing.image}
                                    alt={ing.name}
                                    className="object-cover h-full w-full"
                                    onError={(e) => {
                                        e.currentTarget.src = "/bottle.png"
                                    }}
                                />
                            </div>
                            <span className="text-sm font-medium">{ing.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">${ing.price.toFixed(2)}</span>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-primary"
                                onClick={() => {
                                    addItem(ing);
                                    toast.success(`Added ${ing.name}`);
                                }}
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
