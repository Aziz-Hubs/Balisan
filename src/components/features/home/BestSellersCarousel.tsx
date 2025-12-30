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

interface BestSellersCarouselProps {
    products: Product[];
    userName?: string;
}

export function BestSellersCarousel({ products, userName }: BestSellersCarouselProps) {
    const heading = userName
        ? `Welcome, ${userName}! Start Your Collection.`
        : 'Best Sellers';

    return (
        <section className="py-24 bg-zinc-950/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        {userName && (
                            <p className="text-amber-500 font-medium mb-2 uppercase tracking-widest text-xs">
                                YOUR JOURNEY BEGINS
                            </p>
                        )}
                        <h2 className="text-3xl md:text-4xl font-serif text-white">{heading}</h2>
                    </div>
                    <Button variant="link" className="text-zinc-400 hover:text-amber-500 p-0 h-auto" asChild>
                        <Link href="/shop?sort=bestsellers">View Collection →</Link>
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
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
                                <Card className="h-full flex flex-col overflow-hidden group border-zinc-900 bg-zinc-900/40 hover:border-zinc-800 transition-colors">
                                    <Link href={`/shop/${product.category?.toLowerCase() || 'spirits'}/${product.slug}`} className="flex-1">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <CardContent className="p-5">
                                            <p className="text-xs text-amber-500/80 uppercase tracking-wider font-medium mb-1">{product.brand}</p>
                                            <h3 className="text-lg font-serif text-white truncate group-hover:text-amber-500 transition-colors">{product.name}</h3>
                                            <p className="text-zinc-400 mt-1">${product.price?.toFixed(2)}</p>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className="p-5 pt-0">
                                        <AddToCartButton
                                            product={product}
                                            className="w-full bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.02] transition-all duration-300 font-medium"
                                        />
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:flex gap-2 absolute -top-16 right-0">
                        <CarouselPrevious className="relative inset-auto static translate-x-0 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700" />
                        <CarouselNext className="relative inset-auto static translate-x-0 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
