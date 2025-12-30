import { Order, OrderItem } from "@/types"

const randomPastDate = (monthsAgo: number, daysAgo?: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    if (daysAgo) {
        past.setDate(past.getDate() - daysAgo)
    } else {
        past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    }
    return past.toISOString()
}

// Sample order items that reference products
const createOrderItems = (productIds: string[], quantities: number[], prices: number[]): OrderItem[] => {
    return productIds.map((id, idx) => ({
        productId: id,
        productName: `Product ${id}`, // This would normally be fetched from product data
        productImage: "/bottle.png",
        quantity: quantities[idx],
        price: prices[idx]
    }))
}

// Orders (50+ orders)
export const ORDERS: Order[] = [
    // VIP Customer Orders
    {
        id: "ord-001",
        userId: "user-001",
        items: createOrderItems(["wh-001", "wine-002"], [1, 2], [54.99, 89.99]),
        subtotal: 234.97,
        tax: 21.15,
        shipping: 15.00,
        total: 271.12,
        status: "delivered",
        paymentMethod: "Visa ending in 4242",
        shippingAddress: {
            id: "addr-001-1",
            label: "Home",
            name: "James Mitchell",
            line1: "742 Evergreen Terrace",
            city: "San Francisco",
            state: "CA",
            zip: "94102",
            country: "USA",
            phone: "+1-555-0101",
            isDefault: true
        },
        trackingNumber: "1Z999AA10123456784",
        createdAt: randomPastDate(5),
        updatedAt: randomPastDate(5, 2)
    },
    {
        id: "ord-002",
        userId: "user-002",
        items: createOrderItems(["wine-016", "wine-017", "liq-004"], [1, 1, 1], [899.99, 18.99, 38.99]),
        subtotal: 957.97,
        tax: 86.22,
        shipping: 25.00,
        total: 1069.19,
        status: "delivered",
        paymentMethod: "Mastercard ending in 8888",
        shippingAddress: {
            id: "addr-002-1",
            label: "Home",
            name: "Sarah Chen",
            line1: "2468 Oak Avenue",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "USA",
            phone: "+1-555-0102",
            isDefault: true
        },
        trackingNumber: "1Z999AA10123456785",
        createdAt: randomPastDate(4),
        updatedAt: randomPastDate(4, 1)
    },
    {
        id: "ord-003",
        userId: "user-001",
        items: createOrderItems(["wh-004"], [1], [399.99]),
        subtotal: 399.99,
        tax: 36.00,
        shipping: 15.00,
        total: 450.99,
        status: "delivered",
        paymentMethod: "Visa ending in 4242",
        shippingAddress: {
            id: "addr-001-1",
            label: "Home",
            name: "James Mitchell",
            line1: "742 Evergreen Terrace",
            city: "San Francisco",
            state: "CA",
            zip: "94102",
            country: "USA",
            isDefault: true
        },
        trackingNumber: "1Z999AA10123456786",
        createdAt: randomPastDate(4),
        updatedAt: randomPastDate(4, 2)
    },
    {
        id: "ord-004",
        userId: "user-003",
        items: createOrderItems(["teq-001", "teq-002", "rum-003"], [2, 1, 1], [52.99, 54.99, 32.99]),
        subtotal: 193.96,
        tax: 17.46,
        shipping: 15.00,
        total: 226.42,
        status: "shipped",
        paymentMethod: "Amex ending in 1234",
        shippingAddress: {
            id: "addr-003-1",
            label: "Home",
            name: "Michael Roberts",
            line1: "1357 Park Place",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
            isDefault: true
        },
        trackingNumber: "1Z999AA10123456787",
        createdAt: randomPastDate(3),
        updatedAt: randomPastDate(3, 1)
    },
    {
        id: "ord-005",
        userId: "user-004",
        items: createOrderItems(["wine-001", "wine-013", "liq-001"], [1, 1, 1], [449.99, 399.99, 249.99]),
        subtotal: 1099.97,
        tax: 99.00,
        shipping: 0.00, // Free shipping for large order
        total: 1198.97,
        status: "delivered",
        paymentMethod: "Visa ending in 5678",
        shippingAddress: {
            id: "addr-004-1",
            label: "Home",
            name: "Emily Watson",
            line1: "9876 Maple Drive",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            country: "USA",
            isDefault: true
        },
        trackingNumber: "1Z999AA10123456788",
        createdAt: randomPastDate(3),
        updatedAt: randomPastDate(3, 2)
    },

    // More orders to reach 50+
    ...Array.from({ length: 45 }, (_, i) => {
        const orderNum = i + 6
        const userId = `user-${String((i % 15) + 1).padStart(3, '0')}`
        const statuses: Array<'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'> =
            ['delivered', 'delivered', 'delivered', 'delivered', 'delivered', 'delivered',
                'delivered', 'delivered', 'delivered', 'delivered', 'delivered', 'delivered',
                'shipped', 'shipped', 'shipped', 'shipped', 'shipped',
                'processing', 'processing', 'processing', 'processing', 'processing',
                'pending', 'pending', 'pending',
                'cancelled', 'cancelled']
        const status = statuses[i % statuses.length]

        // Generate random items
        const numItems = Math.floor(Math.random() * 3) + 1
        const productCategories = ['wh', 'vo', 'rum', 'gin', 'teq', 'wine', 'beer', 'liq']
        const productIds = Array.from({ length: numItems }, () => {
            const cat = productCategories[Math.floor(Math.random() * productCategories.length)]
            const num = Math.floor(Math.random() * 15) + 1
            return `${cat}-${String(num).padStart(3, '0')}`
        })

        const quantities = Array.from({ length: numItems }, () => Math.floor(Math.random() * 2) + 1)
        const prices = Array.from({ length: numItems }, () => Math.random() * 400 + 20)

        const subtotal = prices.reduce((sum, price, idx) => sum + (price * quantities[idx]), 0)
        const tax = subtotal * 0.09
        const shipping = subtotal > 100 ? 0 : 15
        const total = subtotal + tax + shipping

        const monthsBack = Math.floor(i / 10) + 1
        const daysBack = status === 'delivered' ? Math.floor(Math.random() * 30) + 10 :
            status === 'shipped' ? Math.floor(Math.random() * 7) + 3 :
                status === 'processing' ? Math.floor(Math.random() * 3) + 1 :
                    status === 'pending' ? Math.floor(Math.random() * 2) :
                        Math.floor(Math.random() * 60) + 30

        return {
            id: `ord-${String(orderNum).padStart(3, '0')}`,
            userId,
            items: createOrderItems(productIds, quantities, prices),
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            shipping: Math.round(shipping * 100) / 100,
            total: Math.round(total * 100) / 100,
            status,
            paymentMethod: ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'][Math.floor(Math.random() * 5)] +
                ` ending in ${Math.floor(Math.random() * 9000) + 1000}`,
            shippingAddress: {
                id: `addr-${userId}-1`,
                label: "Home",
                name: `Customer ${userId}`,
                line1: `${Math.floor(Math.random() * 9000) + 1000} Main Street`,
                city: ["San Francisco", "Los Angeles", "New York", "Chicago", "Seattle", "Austin", "Boston", "Denver"][Math.floor(Math.random() * 8)],
                state: ["CA", "CA", "NY", "IL", "WA", "TX", "MA", "CO"][Math.floor(Math.random() * 8)],
                zip: `${Math.floor(Math.random() * 90000) + 10000}`,
                country: "USA",
                isDefault: true
            },
            trackingNumber: (status === 'shipped' || status === 'delivered') ?
                `1Z999AA1012345${String(6789 + orderNum).substring(0, 4)}` : undefined,
            createdAt: randomPastDate(monthsBack, daysBack),
            updatedAt: randomPastDate(monthsBack, Math.max(daysBack - Math.floor(Math.random() * 3), 0))
        }
    })
]

// Helper functions
export const getOrderById = (orderId: string): Order | undefined => {
    return ORDERS.find(order => order.id === orderId)
}

export const getOrdersByUserId = (userId: string): Order[] => {
    return ORDERS.filter(order => order.userId === userId)
}

export const getOrdersByStatus = (status: Order['status']): Order[] => {
    return ORDERS.filter(order => order.status === status)
}

// Statistics
export const ORDER_STATS = {
    total: ORDERS.length,
    byStatus: {
        pending: ORDERS.filter(o => o.status === 'pending').length,
        processing: ORDERS.filter(o => o.status === 'processing').length,
        shipped: ORDERS.filter(o => o.status === 'shipped').length,
        delivered: ORDERS.filter(o => o.status === 'delivered').length,
        cancelled: ORDERS.filter(o => o.status === 'cancelled').length,
    },
    totalRevenue: Math.round(ORDERS.reduce((sum, order) => sum + order.total, 0) * 100) / 100,
    averageOrderValue: Math.round((ORDERS.reduce((sum, order) => sum + order.total, 0) / ORDERS.length) * 100) / 100
}
