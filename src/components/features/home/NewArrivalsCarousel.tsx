'use client';

import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import type { Product } from '@/types';
import { ArrivalsGlareCard } from '@/components/features/home/ArrivalsGlareCard';

interface NewArrivalsCarouselProps {
    products?: Product[];
}

const mockArrivals: Partial<Product>[] = [
    { id: '1', name: 'Barrel Aged Bourbon', price: 54.99, image: '/bottle.png', brand: { name: 'Old Oak' } as any, slug: 'barrel-aged-bourbon', abv: 45, rating: 4.8, in_stock: true, created_at: new Date().toISOString() },
    { id: '2', name: 'Botanical Gin', price: 42.00, image: '/bottle.png', brand: { name: 'Wildflower' } as any, slug: 'botanical-gin', abv: 42, rating: 4.6, in_stock: true, created_at: new Date().toISOString() },
    { id: '3', name: 'Aged Single Malt', price: 89.95, image: '/bottle.png', brand: { name: 'Highland' } as any, slug: 'aged-single-malt', abv: 40, rating: 4.9, in_stock: true, created_at: new Date().toISOString() },
    { id: '4', name: 'Craft Potato Vodka', price: 35.00, image: '/bottle.png', brand: { name: 'Northern' } as any, slug: 'craft-potato-vodka', abv: 40, rating: 4.5, in_stock: true, created_at: new Date().toISOString() },
    { id: '5', name: 'Mezcal Joven', price: 58.50, image: '/bottle.png', brand: { name: 'Desert Sun' } as any, slug: 'mezcal-joven', abv: 46, rating: 4.7, in_stock: true, created_at: new Date().toISOString() },
];

export function NewArrivalsCarousel({ products = [] }: NewArrivalsCarouselProps) {
    const displayProducts = products.length > 0 ? products : (mockArrivals as Product[]);

    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full relative"
        >
            <CarouselContent className="-ml-4">
                {displayProducts.map((product, index) => (
                    <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="h-[420px] w-full flex items-center justify-center">
                            <ArrivalsGlareCard product={product} priority={index === 0} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex gap-2 justify-end mt-6">
                <CarouselPrevious className="relative inset-auto static translate-x-0 bg-background/50 border-zinc-200 dark:border-zinc-800 text-foreground hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-colors" />
                <CarouselNext className="relative inset-auto static translate-x-0 bg-background/50 border-zinc-200 dark:border-zinc-800 text-foreground hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-colors" />
            </div>
        </Carousel>
    );
}
