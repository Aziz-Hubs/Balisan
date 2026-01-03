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
import type { RecommendedItem } from '@/services/recommendations';

interface ReorderCarouselProps {
    items: RecommendedItem[];
}

export function ReorderCarousel({ items }: ReorderCarouselProps) {
    if (items.length === 0) return null;

    return (
        <section className="py-24 overflow-visible">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <p className="text-amber-500 font-medium mb-2 uppercase tracking-widest text-xs">
                            WELCOME BACK
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Buy Again</h2>
                    </div>
                    <Button variant="link" className="text-zinc-400 hover:text-amber-500 p-0 h-auto" asChild>
                        <Link href="/account/orders">View All Orders →</Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: 'start',
                        loop: false,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {items.map((item) => (
                            <CarouselItem key={item.id} className="pl-4 md:basis-1/3 lg:basis-1/5">
                                <Card className="h-full flex flex-col overflow-hidden group border-zinc-900 bg-zinc-900/20 hover:border-amber-900/30 transition-colors">
                                    <Link href={`/products/${item.slug}`} className="flex-1">
                                        <div className="relative aspect-square overflow-hidden bg-zinc-900/50 rounded-lg m-4 mb-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mb-1">{item.brand}</p>
                                            <h3 className="text-sm font-medium text-zinc-200 truncate group-hover:text-amber-500 transition-colors">{item.name}</h3>
                                            <p className="text-zinc-400 text-sm mt-1">${item.price?.toFixed(2)}</p>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className="p-4 pt-0">
                                        <AddToCartButton
                                            // @ts-ignore - casting simpler RecommendedItem to Product for the button
                                            product={{
                                                id: item.id,
                                                name: item.name,
                                                price: item.price,
                                                image: item.image,
                                                brand: item.brand,
                                                slug: item.slug
                                            } as any}
                                            className="w-full h-9 text-xs bg-amber-600 hover:bg-amber-500 text-white border-none"
                                        />
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex gap-2 absolute -top-12 md:-top-16 right-0">
                        <CarouselPrevious className="relative inset-auto static translate-x-0 h-8 w-8 md:h-10 md:w-10 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700" />
                        <CarouselNext className="relative inset-auto static translate-x-0 h-8 w-8 md:h-10 md:w-10 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
