import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BentoGrid, BentoGridItem } from '@/components/ui/extension/bento-grid';
import { ArrowRightIcon } from 'lucide-react';

const categories = [
    { name: 'Spirits', href: '/shop?category=spirits', image: '/bottle.png', count: 120 },
    { name: 'Wine', href: '/shop?category=wine', image: '/bottle.png', count: 85 },
    { name: 'Beer', href: '/shop?category=beer', image: '/bottle.png', count: 64 },
    { name: 'Mixers', href: '/shop?category=mixers', image: '/bottle.png', count: 32 },
    { name: 'Gifts', href: '/shop?category=gifts', image: '/bottle.png', count: 15 },
];

export function FeaturedCategories() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="mb-12 text-3xl font-bold tracking-tight text-center text-foreground">Shop by Category</h2>
                <BentoGrid className="max-w-4xl mx-auto">
                    {categories.map((category, i) => (
                        <BentoGridItem
                            key={category.name}
                            title={category.name}
                            description={`${category.count} Products`}
                            header={<BentoGridHeader image={category.image} name={category.name} />}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                            icon={<ArrowRightIcon className="h-4 w-4 text-neutral-500" />}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}

const BentoGridHeader = ({ image, name }: { image: string, name: string }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden group/image">
        <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover/image:bg-black/40 transition-colors" />
    </div>
);
