'use client';

import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Product } from '@/types';
import { ProductCard } from '@/components/features/products/ProductCard';

interface NewArrivalsCarouselProps {
    products?: Product[];
}

const mockArrivals: Partial<Product>[] = [
    { id: '1', name: 'Barrel Aged Bourbon', price: 54.99, image: '/bottle.png', brand: 'Old Oak', slug: 'barrel-aged-bourbon', abv: 45, rating: 4.8, inStock: true },
    { id: '2', name: 'Botanical Gin', price: 42.00, image: '/bottle.png', brand: 'Wildflower', slug: 'botanical-gin', abv: 42, rating: 4.6, inStock: true },
    { id: '3', name: 'Aged Single Malt', price: 89.95, image: '/bottle.png', brand: 'Highland', slug: 'aged-single-malt', abv: 40, rating: 4.9, inStock: true },
    { id: '4', name: 'Craft Potato Vodka', price: 35.00, image: '/bottle.png', brand: 'Northern', slug: 'craft-potato-vodka', abv: 40, rating: 4.5, inStock: true },
    { id: '5', name: 'Mezcal Joven', price: 58.50, image: '/bottle.png', brand: 'Desert Sun', slug: 'mezcal-joven', abv: 46, rating: 4.7, inStock: true },
];

export function NewArrivalsCarousel({ products = [] }: NewArrivalsCarouselProps) {
    const displayProducts = products.length > 0 ? products : (mockArrivals as Product[]);

    return (
        <section className="py-12 bg-background overflow-visible">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">New Arrivals</h2>
                    <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
                        <Link href="/shop?sort=newest">View All</Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 pb-4">
                        {displayProducts.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex gap-2 justify-end mt-4">
                        <CarouselPrevious className="relative inset-auto static translate-x-0 bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-foreground/20" />
                        <CarouselNext className="relative inset-auto static translate-x-0 bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-foreground/20" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
