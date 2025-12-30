import { z } from 'zod';

// Product schemas
export const productUpdateSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    slug: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    discountPrice: z.number().positive().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    description: z.string().optional(),
    tastingNotes: z.string().optional(),
    ingredients: z.string().optional(),
    abv: z.number().min(0).max(100).optional(),
    volume: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
    stockQuantity: z.number().int().nonnegative().optional(),
    inStock: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
});

export const productCreateSchema = z.object({
    name: z.string().min(1).max(200),
    slug: z.string().min(1),
    brand: z.string().min(1),
    price: z.number().positive(),
    discountPrice: z.number().positive().optional(),
    category: z.string().min(1),
    subcategory: z.string().optional(),
    description: z.string().min(1),
    tastingNotes: z.string().optional(),
    ingredients: z.string().optional(),
    abv: z.number().min(0).max(100),
    volume: z.string().min(1),
    region: z.string().min(1),
    country: z.string().min(1),
    stockQuantity: z.number().int().nonnegative(),
    inStock: z.boolean(),
    tags: z.array(z.string()).default([]),
    image: z.string().url(),
    images: z.array(z.string().url()).default([]),
});

// Bulk operation schemas
export const bulkPriceUpdateSchema = z.object({
    productIds: z.array(z.string()).min(1),
    priceChange: z.number(),
    type: z.enum(['PERCENTAGE', 'FIXED']),
});

export const bulkCategoryUpdateSchema = z.object({
    productIds: z.array(z.string()).min(1),
    category: z.string().min(1),
    subcategory: z.string().optional(),
});

export const bulkStatusUpdateSchema = z.object({
    productIds: z.array(z.string()).min(1),
    inStock: z.boolean(),
});

// Inventory schemas
export const inventoryAdjustmentSchema = z.object({
    productId: z.string(),
    quantityChange: z.number().int(),
    reason: z.enum(['DAMAGE', 'THEFT', 'RETURN', 'RESTOCK', 'CORRECTION']),
    notes: z.string().min(1, 'Notes are required for inventory adjustments'),
});

export const bulkInventoryUpdateSchema = z.object({
    updates: z.array(z.object({
        sku: z.string(),
        quantityChange: z.number().int(),
        reason: z.enum(['DAMAGE', 'THEFT', 'RETURN', 'RESTOCK', 'CORRECTION']),
        notes: z.string().min(1),
    })).min(1),
});

// Order schemas
export const orderStatusUpdateSchema = z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    note: z.string().optional(),
});

export const fulfillmentStatusUpdateSchema = z.object({
    fulfillmentStatus: z.enum(['PENDING', 'PROCESSING', 'READY', 'PICKED_UP', 'DELIVERED']),
    note: z.string().optional(),
});

export const refundSchema = z.object({
    amount: z.number().positive(),
    reason: z.string().min(1),
});

// Compliance schemas
export const verificationReviewSchema = z.object({
    status: z.enum(['APPROVED', 'REJECTED']),
    notes: z.string().min(1, 'Review notes are required'),
});

// Admin user schemas
export const adminUserCreateSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    role: z.enum(['SUPER_ADMIN', 'MANAGER', 'STAFF', 'AUDITOR']),
    password: z.string().min(8),
});

export const adminUserUpdateSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    role: z.enum(['SUPER_ADMIN', 'MANAGER', 'STAFF', 'AUDITOR']).optional(),
    mfaEnabled: z.boolean().optional(),
});

// Audit log search schema
export const auditLogSearchSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    userId: z.string().optional(),
    action: z.string().optional(),
    resource: z.string().optional(),
    page: z.number().int().positive().default(1),
    perPage: z.number().int().positive().max(100).default(50),
});
