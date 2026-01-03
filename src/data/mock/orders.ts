import { Order, OrderItem } from "@/types"
import { Json } from "@/types/database.types"

const randomPastDate = (monthsAgo: number, varianceMonths: number = 0): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    const variance = (Math.random() * varianceMonths * 2) - varianceMonths
    past.setMonth(past.getMonth() - monthsAgo + variance)
    return past.toISOString()
}

// Sample order items that reference products
const createOrderItems = (productIds: string[], quantities: number[], prices: number[], orderId: string): OrderItem[] => {
    return productIds.map((pid, idx) => ({
        id: `item-${orderId}-${idx}`,
        order_id: orderId,
        product_id: pid,
        product_name_snapshot: `Product ${pid}`, // In real app, this would be actual product name
        product_image_snapshot: "/bottle.png",
        quantity: quantities[idx],
        unit_price: prices[idx],
        total_price: Number((prices[idx] * quantities[idx]).toFixed(2)),
        created_at: randomPastDate(1)
    }))
}

const mockAddress = {
    city: "San Francisco",
    country: "USA",
    line1: "123 Main St",
    name: "John Doe",
    postal_code: "94105",
    state: "CA"
} as unknown as Json

// Orders (10 representative orders)
export const ORDERS: any[] = [
    {
        id: "ord-001",
        user_id: "user-001",
        items: createOrderItems(["wh-001", "wine-002"], [1, 2], [54.99, 89.99], "ord-001"),
        subtotal: 234.97,
        tax: 21.15,
        shipping_cost: 15.00,
        discount_amount: 0,
        total_amount: 271.12,
        status: "delivered",
        payment_status: "paid",
        payment_intent_id: "pi_001",
        shipping_address: mockAddress,
        billing_address: mockAddress,
        tracking_number: "1Z999AA10123456784",
        notes: "Leave at front door",
        created_at: randomPastDate(5),
        updated_at: randomPastDate(5)
    },
    {
        id: "ord-002",
        user_id: "user-002",
        items: createOrderItems(["vodka-001", "gin-001"], [2, 1], [35.00, 45.00], "ord-002"),
        subtotal: 115.00,
        tax: 10.35,
        shipping_cost: 12.00,
        discount_amount: 0,
        total_amount: 137.35,
        status: "processing",
        payment_status: "paid",
        payment_intent_id: "pi_002",
        shipping_address: mockAddress,
        billing_address: mockAddress,
        tracking_number: null,
        notes: null,
        created_at: randomPastDate(4),
        updated_at: randomPastDate(4)
    },
    {
        id: "ord-003",
        user_id: "user-001",
        items: createOrderItems(["rum-001"], [1], [65.00], "ord-003"),
        subtotal: 65.00,
        tax: 5.85,
        shipping_cost: 10.00,
        discount_amount: 5.00,
        total_amount: 75.85,
        status: "shipped",
        payment_status: "paid",
        payment_intent_id: "pi_003",
        shipping_address: mockAddress,
        billing_address: mockAddress,
        tracking_number: "TRACK8989",
        notes: null,
        created_at: randomPastDate(3),
        updated_at: randomPastDate(3)
    },
    {
        id: "ord-004",
        user_id: "user-004",
        items: createOrderItems(["teq-002", "wine-005"], [1, 3], [120.00, 25.00], "ord-004"),
        subtotal: 195.00,
        tax: 17.55,
        shipping_cost: 0, // Free shipping
        discount_amount: 0,
        total_amount: 212.55,
        status: "delivered",
        payment_status: "paid",
        payment_intent_id: "pi_004",
        shipping_address: mockAddress,
        billing_address: mockAddress,
        tracking_number: "TRACK1234",
        notes: "Gift receipt please",
        created_at: randomPastDate(2),
        updated_at: randomPastDate(2)
    },
    {
        id: "ord-005",
        user_id: "user-003",
        items: createOrderItems(["wh-005"], [1], [250.00], "ord-005"),
        subtotal: 250.00,
        tax: 22.50,
        shipping_cost: 20.00,
        discount_amount: 25.00,
        total_amount: 267.50,
        status: "cancelled",
        payment_status: "refunded",
        payment_intent_id: "pi_005",
        shipping_address: mockAddress,
        billing_address: mockAddress,
        tracking_number: null,
        notes: "Customer requested cancellation",
        created_at: randomPastDate(6),
        updated_at: randomPastDate(6)
    }
]

// Helper functions
export const getOrderById = (orderId: string): Order | undefined => {
    return ORDERS.find(order => order.id === orderId)
}

export const getOrdersByUserId = (userId: string): Order[] => {
    return ORDERS.filter(order => order.user_id === userId)
}

export const getOrdersByStatus = (status: string): Order[] => {
    return ORDERS.filter(order => order.status === status)
}

// Statistics
export const ORDER_STATS = {
    total: ORDERS.length,
    revenue: ORDERS.reduce((sum, order) => sum + order.total_amount, 0),
    pending: ORDERS.filter(o => o.status === 'pending').length,
    processing: ORDERS.filter(o => o.status === 'processing').length,
    shipped: ORDERS.filter(o => o.status === 'shipped').length,
    delivered: ORDERS.filter(o => o.status === 'delivered').length,
    recent: ORDERS.filter(o => {
        const date = o.created_at ? new Date(o.created_at) : new Date(0);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return date > thirtyDaysAgo;
    }).length
}
