// Onfleet integration for delivery management

import type { AdminOrder } from '@/types/admin';

/**
 * Create a delivery task in Onfleet
 * @param order Order to create delivery for
 * @returns Task ID and tracking URL
 */
export async function createDeliveryTask(order: AdminOrder): Promise<{
    success: boolean;
    taskId?: string;
    trackingUrl?: string;
    error?: string;
}> {
    try {
        // TODO: Initialize Onfleet SDK
        // const onfleet = new OnfleetSDK(process.env.ONFLEET_API_KEY!);

        // TODO: Create delivery task
        // const task = await onfleet.tasks.create({
        //   destination: {
        //     address: {
        //       unparsed: `${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`,
        //     },
        //   },
        //   recipients: [{
        //     name: order.shippingAddress.name,
        //     phone: order.shippingAddress.phone || order.customerPhone,
        //     notes: `Order #${order.id}`,
        //   }],
        //   notes: `Balisan Order #${order.id} - ${order.items.length} items`,
        //   completeAfter: Date.now(),
        //   completeBefore: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        // });

        // For MVP, return mock success
        const mockTaskId = `task_${Date.now()}`;
        console.log(`[ONFLEET STUB] Delivery task created for order ${order.id}: ${mockTaskId}`);

        return {
            success: true,
            taskId: mockTaskId,
            trackingUrl: `https://onfleet.com/track/${mockTaskId}`,
        };
    } catch (error) {
        console.error('Onfleet task creation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create delivery task',
        };
    }
}

/**
 * Get delivery task status
 */
export async function getTaskStatus(taskId: string): Promise<{
    status: 'assigned' | 'active' | 'completed' | 'failed';
    driver?: {
        name: string;
        phone: string;
        location?: { lat: number; lng: number };
    };
    eta?: number; // Unix timestamp
}> {
    // TODO: Fetch from Onfleet API

    return {
        status: 'assigned',
        eta: Date.now() + (2 * 60 * 60 * 1000), // 2 hours from now
    };
}

/**
 * Cancel a delivery task
 */
export async function cancelDeliveryTask(taskId: string): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        // TODO: Cancel via Onfleet API

        console.log(`[ONFLEET STUB] Delivery task canceled: ${taskId}`);

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to cancel task',
        };
    }
}
