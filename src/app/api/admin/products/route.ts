import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logAuditEvent } from '@/lib/audit';
import { getAdminSession } from '@/lib/permissions';

/**
 * GET /api/admin/products
 * List all products with pagination and filters
 */
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '50');
        const search = searchParams.get('search') || '';

        let query = supabase
            .from('products')
            .select('*, categories(name)', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (search) {
            query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%,sku.ilike.%${search}%`);
        }

        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;

        if (error) throw error;

        const formattedProducts = (data as any[] || []).map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku || p.attributes?.sku || 'N/A',
            brand: p.brand,
            category: p.categories?.name || 'Spirits',
            price: p.price,
            stockQuantity: p.stock_quantity,
            inStock: p.in_stock,
            updatedAt: p.updated_at
        }));

        return NextResponse.json({
            success: true,
            data: formattedProducts,
            meta: {
                page,
                perPage,
                total: count || 0,
            },
        });
    } catch (error) {
        console.error('Products list error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch products',
                },
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
                { status: 401 }
            );
        }

        const body = await request.json();

        // TODO: Validate with productCreateSchema
        // TODO: Create product in database
        // TODO: Log audit event

        await logAuditEvent({
            userId: session.user.id,
            userName: session.user.name,
            action: 'CREATE_PRODUCT',
            resource: 'Product',
            resourceId: 'prod_new',
            changes: body,
        });

        return NextResponse.json({
            success: true,
            data: { id: 'prod_new', ...body },
        });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to create product',
                },
            },
            { status: 500 }
        );
    }
}
