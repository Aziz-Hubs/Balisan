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

interface BestSellersCarouselProps {
    products: Product[];
    userName?: string;
}

export function BestSellersCarousel({ products, userName }: BestSellersCarouselProps) {
    const heading = userName
        ? `Welcome, ${userName}! Start Your Collection.`
        : 'Best Sellers';

    return (
        <section className="py-24 bg-background overflow-visible">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        {userName && (
                            <p className="text-amber-500 font-medium mb-2 uppercase tracking-widest text-xs">
                                YOUR JOURNEY BEGINS
                            </p>
                        )}
                        <h2 className="text-3xl md:text-4xl font-serif text-foreground">{heading}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="link" className="text-muted-foreground hover:text-amber-500 p-0 h-auto" asChild>
                            <Link href={userName ? "/account/collection" : "/shop?sort=bestsellers"}>
                                {userName ? "View My Collection →" : "View Collection →"}
                            </Link>
                        </Button>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 pb-4">
                        {products.map((product) => (
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
