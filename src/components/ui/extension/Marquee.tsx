'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

// Using a simplified interface for visual display
export interface MarqueeItem {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    rating?: number;
    href: string;
}

interface MarqueeProps {
    items: MarqueeItem[];
    speed?: number; // duration in seconds
    className?: string;
}

export function Marquee({ items, speed = 40, className }: MarqueeProps) {
    // Duplicate items to ensure seamless loop
    const duplicatedItems = [...items, ...items];

    return (

        <section className={cn("py-20 bg-background overflow-hidden relative", className)}>
            <div className="container mx-auto px-4 md:px-6 mb-10 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif text-foreground">New Arrivals</h2>
                    <p className="text-muted-foreground text-sm mt-1">Fresh from the distillery.</p>
                </div>
                <Link href="/shop?sort=newest" className="hidden md:block text-amber-500 hover:text-amber-400 text-sm font-medium tracking-wider uppercase transition-colors">
                    View All New Arrivals
                </Link>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                    whileHover={{ animationPlayState: "paused" }} // Note: framer-motion handles this differently, usually need hovered state control. For simplicity, we stick to continuous or CSS.
                // Actually, framer-motion doesn't pause `animate` on hover easily without state.
                // Let's rely on standard infinite loop.
                >
                    {duplicatedItems.map((item, index) => (
                        <MarqueeCard key={`${item.id}-${index}`} item={item} />
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-4 mt-8 md:hidden text-center">
                <Link href="/shop?sort=newest" className="text-amber-500 hover:text-amber-400 text-sm font-medium tracking-wider uppercase">
                    View All New Arrivals
                </Link>
            </div>
        </section>
    );
}

function MarqueeCard({ item }: { item: MarqueeItem }) {
    return (
        <Link href={item.href} className="group relative block w-[280px] flex-shrink-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-card border border-border shadow-sm">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-5 w-full">
                    <p className="text-[10px] tracking-widest text-amber-400 uppercase mb-1">{item.brand}</p>
                    <h3 className="text-white font-medium text-lg leading-tight mb-2 group-hover:underline decoration-amber-500/50 underline-offset-4">{item.name}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-white font-bold">${item.price.toFixed(2)}</span>
                        {item.rating && (
                            <div className="flex items-center gap-1 text-amber-500 text-xs">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{item.rating}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
