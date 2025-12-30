import type { AuditLog } from '@/types/admin';

interface AuditEventData {
    userId: string;
    userName: string;
    action: string;
    resource: string;
    resourceId: string;
    changes?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
}

/**
 * Log an audit event for compliance tracking
 * In production, this would write to CloudWatch/S3 with object lock
 * For MVP, we'll log to console and store in a mock database
 */
export async function logAuditEvent(data: AuditEventData): Promise<string> {
    const auditLog: AuditLog = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: data.userId,
        userName: data.userName,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        changes: data.changes || {},
        ipAddress: data.ipAddress || 'unknown',
        userAgent: data.userAgent || 'unknown',
        timestamp: new Date().toISOString(),
    };

    // TODO: In production, send to CloudWatch Logs or S3
    // For now, log to console
    console.log('[AUDIT LOG]', JSON.stringify(auditLog, null, 2));

    // TODO: Store in database
    // await prisma.auditLog.create({ data: auditLog });

    return auditLog.id;
}

/**
 * Search audit logs with filters
 * In production, query from CloudWatch or database
 */
export async function searchAuditLogs(filters: {
    startDate?: string;
    endDate?: string;
    userId?: string;
    action?: string;
    resource?: string;
    page?: number;
    perPage?: number;
}): Promise<{ logs: AuditLog[]; total: number }> {
    // TODO: Implement actual search from database/CloudWatch
    // For MVP, return mock data

    const mockLogs: AuditLog[] = [
        {
            id: 'audit_1',
            userId: 'user_1',
            userName: 'Sarah Chen',
            action: 'UPDATE_PRODUCT',
            resource: 'Product',
            resourceId: 'prod_123',
            changes: {
                price: { from: 49.99, to: 54.99 },
            },
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0...',
            timestamp: new Date().toISOString(),
        },
        // Add more mock logs as needed
    ];

    return {
        logs: mockLogs,
        total: mockLogs.length,
    };
}

/**
 * Export audit logs to CSV
 * Should complete in <30 seconds for 7-day logs
 */
export async function exportAuditLogsToCSV(filters: {
    startDate?: string;
    endDate?: string;
    userId?: string;
    action?: string;
    resource?: string;
}): Promise<string> {
    const { logs } = await searchAuditLogs(filters);

    // Generate CSV
    const headers = ['Timestamp', 'User', 'Action', 'Resource', 'Resource ID', 'IP Address'];
    const rows = logs.map(log => [
        log.timestamp,
        log.userName,
        log.action,
        log.resource,
        log.resourceId,
        log.ipAddress,
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(',')),
    ].join('\n');

    return csvContent;
}

/**
 * Capture the state of a resource before/after an operation
 * Used to create detailed change logs
 */
export function diffStates(
    before: Record<string, unknown>,
    after: Record<string, unknown>
): Record<string, { from: unknown; to: unknown }> {
    const changes: Record<string, { from: unknown; to: unknown }> = {};

    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

    for (const key of allKeys) {
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
            changes[key] = {
                from: before[key],
                to: after[key],
            };
        }
    }

    return changes;
}
