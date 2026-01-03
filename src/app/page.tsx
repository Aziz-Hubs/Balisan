import { WarpingHero } from '@/components/ui/extension/WarpingHero';
import { BentoGrid } from '@/components/ui/extension/BentoGrid';
import { Marquee } from '@/components/ui/extension/Marquee';
import { PersonalizedSection } from '@/components/features/home/PersonalizedSection';
import { Suspense } from 'react';
import { ServiceKPIs } from '@/components/features/home/ServiceKPIs';
import { getNewArrivals, getCategories } from '@/services';
import Link from 'next/link';


export default async function HomePage() {
  const [newArrivals, categories] = await Promise.all([
    getNewArrivals(10),
    getCategories()
  ]);

  // Transform newArrivals to match Marquee item interface
  const marqueeItems = newArrivals.map(product => ({
    id: product.id,
    name: product.name,
    brand: (typeof product.brand === 'string' ? product.brand : product.brand?.name) || '',
    image: product.image || '/bottle.png',
    price: product.price,
    rating: product.rating,
    href: `/products/${product.slug}`
  }));

  return (
    <div className="flex flex-col gap-16 bg-background min-h-screen">
      <WarpingHero />

      <BentoGrid categories={categories} />



      <Marquee items={marqueeItems} />

      <div className="relative overflow-hidden bg-zinc-100/50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-white/5 pb-16">
        {/* Massive shared ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />

        <ServiceKPIs />

        <div className="container mx-auto px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent" />
        </div>

        <Suspense fallback={<div className="h-96" />}>
          <PersonalizedSection />
        </Suspense>
      </div>
    </div>
  );
}
