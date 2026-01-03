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

      <ServiceKPIs />

      <Suspense fallback={<div className="h-96 bg-zinc-100 dark:bg-zinc-950" />}>
        <PersonalizedSection />
      </Suspense>
    </div>
  );
}
