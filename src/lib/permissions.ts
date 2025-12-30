import type { AdminRole } from '@/types/admin';

/**
 * Role-based permission matrix
 * Defines what routes each role can access
 */
const rolePermissions: Record<AdminRole, string[]> = {
    SUPER_ADMIN: ['*'], // Full access
    MANAGER: [
        '/admin/dashboard',
        '/admin/products',
        '/admin/orders',
        '/admin/inventory',
        '/admin/customers',
        '/admin/compliance',
    ],
    STAFF: [
        '/admin/dashboard',
        '/admin/orders', // Can view and process orders
        '/admin/inventory', // Can view inventory (no adjustments)
    ],
    AUDITOR: [
        '/admin/dashboard',
        '/admin/compliance',
        '/admin/compliance/audit-logs',
    ],
};

/**
 * Check if a user role has permission to access a route
 */
export function hasRoutePermission(role: AdminRole, pathname: string): boolean {
    const permissions = rolePermissions[role];

    if (!permissions) {
        return false;
    }

    // Super admin has full access
    if (permissions.includes('*')) {
        return true;
    }

    // Check if the exact path or a parent path is in permissions
    return permissions.some(permittedPath =>
        pathname.startsWith(permittedPath)
    );
}

/**
 * Check if a user role can perform an action
 * Used for fine-grained permission checks (e.g., can edit, can delete)
 */
export function hasActionPermission(
    role: AdminRole,
    resource: string,
    action: 'read' | 'create' | 'update' | 'delete'
): boolean {
    const permissions: Record<string, Record<AdminRole, string[]>> = {
        product: {
            SUPER_ADMIN: ['read', 'create', 'update', 'delete'],
            MANAGER: ['read', 'create', 'update'],
            STAFF: ['read'],
            AUDITOR: [],
        },
        order: {
            SUPER_ADMIN: ['read', 'create', 'update', 'delete'],
            MANAGER: ['read', 'update'],
            STAFF: ['read', 'update'],
            AUDITOR: [],
        },
        inventory: {
            SUPER_ADMIN: ['read', 'update'],
            MANAGER: ['read', 'update'],
            STAFF: ['read'],
            AUDITOR: [],
        },
        compliance: {
            SUPER_ADMIN: ['read', 'update'],
            MANAGER: ['read', 'update'],
            STAFF: [],
            AUDITOR: ['read'],
        },
        auditLog: {
            SUPER_ADMIN: ['read'],
            MANAGER: [],
            STAFF: [],
            AUDITOR: ['read'],
        },
    };

    const resourcePermissions = permissions[resource];
    if (!resourcePermissions) {
        return false;
    }

    const roleActions = resourcePermissions[role];
    return roleActions.includes(action);
}

/**
 * Get a mock admin user session
 * In production, this would retrieve the session from cookies/JWT
 */
export async function getAdminSession(): Promise<{
    user: {
        id: string;
        email: string;
        name: string;
        role: AdminRole;
    };
    lastActivity: number;
} | null> {
    // TODO: Implement actual session retrieval
    // For MVP, return a mock session
    return {
        user: {
            id: 'admin_1',
            email: 'sarah@balisan.com',
            name: 'Sarah Chen',
            role: 'MANAGER',
        },
        lastActivity: Date.now(),
    };
}

/**
 * Check if session has timed out (30 minutes)
 */
export function isSessionExpired(lastActivity: number): boolean {
    const timeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    return Date.now() - lastActivity > timeout;
}

/**
 * Get permission display names for UI
 */
export function getPermissionLabel(resource: string, action: string): string {
    const labels: Record<string, Record<string, string>> = {
        product: {
            read: 'View Products',
            create: 'Create Products',
            update: 'Edit Products',
            delete: 'Delete Products',
        },
        order: {
            read: 'View Orders',
            update: 'Process Orders',
        },
        inventory: {
            read: 'View Inventory',
            update: 'Adjust Inventory',
        },
        compliance: {
            read: 'View Verifications',
            update: 'Review Verifications',
        },
        auditLog: {
            read: 'View Audit Logs',
        },
    };

    return labels[resource]?.[action] || `${action} ${resource}`;
}
