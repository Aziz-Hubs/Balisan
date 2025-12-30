import { NextRequest, NextResponse } from 'next/server';
import { productUpdateSchema } from '@/lib/schemas/admin';
import { logAuditEvent, diffStates } from '@/lib/audit';
import { getAdminSession } from '@/lib/permissions';

/**
 * GET /api/admin/products/[id]
 * Get a single product by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // TODO: Fetch from database
        const mockProduct = {
            id,
            name: 'Highland Reserve 12Y',
            sku: 'SKU-WH-001',
            brand: 'Highland',
            category: 'Whiskey',
            price: 54.99,
            stockQuantity: 24,
            inStock: true,
            description: 'A smooth 12-year-old Highland whiskey...',
            version: 1, // For optimistic locking
        };

        return NextResponse.json({
            success: true,
            data: mockProduct,
        });
    } catch (error) {
        console.error('Get product error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch product',
                },
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/admin/products/[id]
 * Update a product
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();

        // Validate input
        const validation = productUpdateSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: validation.error.message,
                        details: validation.error.issues,
                    },
                },
                { status: 400 }
            );
        }

        // TODO: Fetch current state from database
        const beforeState = {
            name: 'Highland Reserve 12Y',
            price: 49.99,
            stockQuantity: 24,
        };

        // TODO: Update in database with optimistic locking
        const afterState = {
            ...beforeState,
            ...validation.data,
        };

        // Log audit event
        await logAuditEvent({
            userId: session.user.id,
            userName: session.user.name,
            action: 'UPDATE_PRODUCT',
            resource: 'Product',
            resourceId: id,
            changes: diffStates(beforeState, afterState),
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
        });

        return NextResponse.json({
            success: true,
            data: { id, ...afterState },
        });
    } catch (error) {
        console.error('Update product error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to update product',
                },
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/admin/products/[id]
 * Delete a product (soft delete)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
                { status: 401 }
            );
        }

        const { id } = await params;

        // TODO: Soft delete in database
        // TODO: Log audit event

        await logAuditEvent({
            userId: session.user.id,
            userName: session.user.name,
            action: 'DELETE_PRODUCT',
            resource: 'Product',
            resourceId: id,
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
        });

        return NextResponse.json({
            success: true,
            data: { id, deleted: true },
        });
    } catch (error) {
        console.error('Delete product error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to delete product',
                },
            },
            { status: 500 }
        );
    }
}
