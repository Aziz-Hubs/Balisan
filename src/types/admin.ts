// Admin-specific TypeScript types

export type AdminRole = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'AUDITOR';

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: AdminRole;
    permissions: string[];
    createdAt: string;
    lastLogin: string;
    mfaEnabled: boolean;
}

export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    resource: string;
    resourceId: string;
    changes: Record<string, unknown>;
    ipAddress: string;
    userAgent: string;
    timestamp: string;
}

export type DocumentType = 'ID' | 'PASSPORT' | 'DRIVERS_LICENSE';
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ComplianceVerification {
    id: string;
    userId: string;
    documentType: DocumentType;
    documentImages: string[];
    status: VerificationStatus;
    reviewedBy?: string;
    reviewedAt?: string;
    reviewNotes?: string;
    createdAt: string;
}

export type AdjustmentReason = 'DAMAGE' | 'THEFT' | 'RETURN' | 'RESTOCK' | 'CORRECTION';

export interface InventoryAdjustment {
    id: string;
    productId: string;
    productSku: string;
    quantityChange: number;
    reason: AdjustmentReason;
    notes: string;
    performedBy: string;
    timestamp: string;
}

export type FulfillmentStatus = 'PENDING' | 'PROCESSING' | 'READY' | 'PICKED_UP' | 'DELIVERED';

export interface OrderTimelineEvent {
    id: string;
    status: string;
    note?: string;
    performedBy: string;
    timestamp: string;
}

// Extended Order type for admin with additional fields
export interface AdminOrder {
    id: string;
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    items: {
        productId: string;
        productName: string;
        productImage: string;
        quantity: number;
        price: number;
        discountPrice?: number;
    }[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    fulfillmentStatus: FulfillmentStatus;
    verificationStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED';
    paymentMethod: string;
    shippingAddress: {
        id: string;
        label: string;
        name: string;
        line1: string;
        line2?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone?: string;
    };
    trackingNumber?: string;
    timeline: OrderTimelineEvent[];
    createdAt: string;
    updatedAt: string;
}

// Dashboard metrics
export interface DashboardMetrics {
    todaySales: number;
    weekSales: number;
    pendingOrders: number;
    lowStockAlerts: number;
    pendingVerifications: number;
}

// API Response types
export interface ApiResponse<T> {
    success: true;
    data: T;
    meta?: {
        page: number;
        perPage: number;
        total: number;
    };
}

export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
}

// Bulk operation types
export interface BulkPriceUpdate {
    productIds: string[];
    priceChange: number;
    type: 'PERCENTAGE' | 'FIXED';
}

export interface BulkCategoryUpdate {
    productIds: string[];
    category: string;
    subcategory?: string;
}

export interface BulkStatusUpdate {
    productIds: string[];
    inStock: boolean;
}
