'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

import { Category } from "@/types";

type BentoItem = {
    title: string;
    description: string;
    href: string;
    image: string;
    className?: string; // Grid col/row span classes
};

export function BentoGrid({ categories = [] }: { categories?: Category[] }) {
    // Transform categories to BentoItems
    const items: BentoItem[] = categories.map((cat, i) => {
        // Define some default grid spans based on index to keep it interesting
        let className = "md:col-span-1 md:row-span-1";
        if (i === 0) className = "md:col-span-2 md:row-span-2";
        if (i === 5) className = "md:col-span-2 md:row-span-1";

        return {
            title: cat.name,
            description: cat.description || "",
            href: `/shop?category=${cat.slug}`,
            image: cat.image_url || "/bottle.png",
            className
        };
    });

    return (
        <section className="py-24 bg-background text-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">Curated Categories</h2>
                        <p className="text-muted-foreground max-w-md">Explore our carefully selected collections, from rare finds to everyday favorites.</p>
                    </div>
                    <Link href="/shop" className="text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-2 group text-sm font-medium tracking-widest uppercase">
                        View All Categories <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {items.map((item, i) => (
                        <BlurFade key={i} delay={0.25 + i * 0.05} inView>
                            <BentoCard item={item} index={i} />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
    return (
        <div
            className={cn(
                "group relative h-full overflow-hidden rounded-3xl bg-card border border-border",
                item.className,
                "min-h-[250px]"
            )}
        >
            <Link href={item.href} className="absolute inset-0 z-20">
                <span className="sr-only">View {item.title}</span>
            </Link>

            {/* Image Background */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/90 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10 w-full">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold font-serif mb-1 text-white">{item.title}</h3>
                    <p className="text-zinc-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.description}</p>
                </div>
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
