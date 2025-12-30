import { InnerCircleNewsletter } from '@/components/features/home/InnerCircleNewsletter';
import { BestSellersCarousel } from '@/components/features/home/BestSellersCarousel';
import { ReorderCarousel } from '@/components/features/home/ReorderCarousel';
import { createClient } from '@/lib/supabase/server';
import { getUserOrderHistory, getBestSellers } from '@/services/recommendations';

export async function PersonalizedSection() {
    const supabase = await createClient();

    // Check session
    const { data: { session } } = await supabase.auth.getSession();

    // STATE A: Guest -> Newsletter
    if (!session) {
        return <InnerCircleNewsletter />;
    }

    const { user } = session;
    const { count, items: historyItems } = await getUserOrderHistory(user.id);

    // STATE B: New User (0 orders) -> Best Sellers with Greeting
    if (count === 0) {
        const bestSellers = await getBestSellers(8);
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
        const firstName = fullName.split(' ')[0] || '';

        return <BestSellersCarousel products={bestSellers} userName={firstName} />;
    }

    // STATE C: Returning Customer (>0 orders) -> Reorder Carousel
    return <ReorderCarousel items={historyItems} />;
}
