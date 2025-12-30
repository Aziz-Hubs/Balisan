import { createClient } from '@/lib/supabase/server';
import { getFeaturedProducts } from './products'; // Fallback for best sellers
import type { Product } from '@/types';

// Extend OrderItem type to include product details needed for display
export interface RecommendedItem {
    id: string;
    name: string;
    slug: string;
    brand: string;
    image: string;
    price: number;
    lastOrderedAt?: string;
}

export async function getUserOrderHistory(userId: string): Promise<{
    count: number;
    items: RecommendedItem[];
}> {
    const supabase = await createClient();

    // 1. Get total order count
    const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

    if (countError) {
        console.error('Error fetching order count:', countError);
        return { count: 0, items: [] };
    }

    if (!count || count === 0) {
        return { count: 0, items: [] };
    }

    // 2. Get unique items from past orders
    // We want the most recent items.
    // Since we don't have a direct "items purchased by user" table (normalized),
    // we query order_items via orders.
    // Note: This query is a bit complex in standard Supabase JS client without Views/RPC if scaling,
    // but for now we'll do: Fetch last 5 orders -> Extract items -> Dedup.

    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
            id,
            created_at,
            items:order_items (
                product_id,
                quantity,
                price
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

    if (ordersError || !orders) {
        console.error('Error fetching orders:', ordersError);
        return { count: count || 0, items: [] };
    }

    // Flatten and dedup items
    const productIds = new Set<string>();
    const recentProductIds: string[] = [];

    orders.forEach(order => {
        // @ts-ignore - Supabase types might be inferred differently depending on generation
        if (order.items) {
            // @ts-ignore
            order.items.forEach((item: any) => {
                if (!productIds.has(item.product_id)) {
                    productIds.add(item.product_id);
                    recentProductIds.push(item.product_id);
                }
            });
        }
    });

    if (recentProductIds.length === 0) {
        return { count: count || 0, items: [] };
    }

    // 3. Fetch product details for these IDs to get image, slug, brand, etc.
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name, slug, brand, image, price, in_stock')
        .in('id', recentProductIds)
        .eq('in_stock', true); // Only recommend in-stock items

    if (productsError || !products) {
        // Fallback or empty if error
        console.error('Error fetching product details:', productsError);
        return { count: count || 0, items: [] };
    }

    // Map back to RecommendedItem
    const items: RecommendedItem[] = (products as any[]).map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand || 'Balisan',
        image: p.image,
        price: p.price,
    }));

    return {
        count: count || 0,
        items
    };
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
    // For now, reuse featured products or new arrivals as a proxy for Best Sellers
    // In a real app, this would be a query on order_items count group by product_id
    return getFeaturedProducts(limit);
}
