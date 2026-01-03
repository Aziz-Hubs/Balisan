"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCartStore } from '@/lib/stores/cart';
import { toast } from 'sonner';
import { ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    children?: React.ReactNode;
}

export function AddToCartButton({
    product,
    className,
    variant = "default",
    size = "default",
    children
}: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || '/bottle.png',
        });
        setIsAdded(true);
        toast.success(`${product.name} added to cart`);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isAdded}
            variant={variant}
            size={size}
            className={cn("w-full transition-all", className)}
        >
            {isAdded ? (
                <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Added
                </span>
            ) : (
                children || (
                    <span className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </span>
                )
            )}
        </Button>
    );
}