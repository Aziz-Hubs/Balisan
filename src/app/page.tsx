import { Hero } from '@/components/ui/extension/Hero';
import { BentoGrid } from '@/components/ui/extension/BentoGrid';
import { Marquee } from '@/components/ui/extension/Marquee';
import { PersonalizedSection } from '@/components/features/home/PersonalizedSection';
import { Suspense } from 'react';
import { ServiceKPIs } from '@/components/features/home/ServiceKPIs';
import { getNewArrivals } from '@/services';

export default async function HomePage() {
  const newArrivals = await getNewArrivals(10);

  // Transform newArrivals to match Marquee item interface
  const marqueeItems = newArrivals.map(product => ({
    id: product.id,
    name: product.name,
    brand: product.brand || 'Balisan',
    image: product.image,
    price: product.price,
    rating: product.rating || 5,
    href: `/products/${product.slug}`
  }));

  return (
    <div className="flex flex-col gap-0 bg-background min-h-screen">
      <Hero />

      <BentoGrid />

      <Marquee items={marqueeItems} />

      <ServiceKPIs />

      <Suspense fallback={<div className="h-96 bg-zinc-100 dark:bg-zinc-950" />}>
        <PersonalizedSection />
      </Suspense>
    </div>
  );
}
