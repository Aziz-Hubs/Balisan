'use client';

import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AddToCartButton } from '@/components/features/cart/AddToCartButton';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface NewArrivalsCarouselProps {
    products?: Product[];
}

const mockArrivals = [
    { id: '1', name: 'Barrel Aged Bourbon', price: 54.99, image: '/bottle.png', brand: 'Old Oak' },
    { id: '2', name: 'Botanical Gin', price: 42.00, image: '/bottle.png', brand: 'Wildflower' },
    { id: '3', name: 'Aged Single Malt', price: 89.95, image: '/bottle.png', brand: 'Highland' },
    { id: '4', name: 'Craft Potato Vodka', price: 35.00, image: '/bottle.png', brand: 'Northern' },
    { id: '5', name: 'Mezcal Joven', price: 58.50, image: '/bottle.png', brand: 'Desert Sun' },
];

export function NewArrivalsCarousel({ products = [] }: NewArrivalsCarouselProps) {
    const displayProducts = products.length > 0 ? products : (mockArrivals as any[]);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
                    <Button variant="link" asChild>
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
                    <CarouselContent className="-ml-4">
                        {displayProducts.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                                <Card className="h-full flex flex-col overflow-hidden group">
                                    <Link href={`/shop/${product.category?.toLowerCase() || 'spirits'}/${product.slug}`} className="flex-1">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                                            <h3 className="text-sm font-semibold mt-1 truncate">{product.name}</h3>
                                            <p className="text-sm font-medium mt-1">${product.price?.toFixed(2)}</p>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className="p-4 pt-0">
                                        <AddToCartButton
                                            product={product as any}
                                            className="w-full text-xs"
                                        />
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-12" />
                        <CarouselNext className="-right-12" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
