import { NextRequest, NextResponse } from 'next/server';
import type { DashboardMetrics } from '@/types/admin';

/**
 * GET /api/admin/dashboard/metrics
 * Returns real-time dashboard metrics
 */
export async function GET(request: NextRequest) {
    try {
        // TODO: Fetch real data from database
        // For MVP, return mock data

        const metrics: DashboardMetrics = {
            todaySales: 12450.00,
            weekSales: 45230.00,
            pendingOrders: 8,
            lowStockAlerts: 3,
            pendingVerifications: 2,
        };

        return NextResponse.json({
            success: true,
            data: metrics,
        });
    } catch (error) {
        console.error('Dashboard metrics error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch dashboard metrics',
                },
            },
            { status: 500 }
        );
    }
}
