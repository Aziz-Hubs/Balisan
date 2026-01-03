import { Product } from "@/types"

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Balisan Signature Whisky",
        slug: "balisan-signature-whisky",
        brand: "Balisan Signature",
        price: 89.99,
        discount_price: 79.99,
        rating: 4.8,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: true,
        stock_quantity: 50,
        category: "Whisky",
        subcategory: "Blend",
        description: "A premium blend with notes of honey and oak.",
        tasting_notes: "Honey, Oak, Vanilla, Spice",
        ingredients: "Malted Barley, Water, Yeast",
        abv: 40,
        volume: "750ml",
        region: "Speyside",
        country: "Scotland",
        sku: "BAL-SIG-001",
        tags: ["Premium", "Signature", "Gift"],
        review_count: 128,
        created_at: "2023-01-01T00:00:00Z"
    },
    {
        id: "2",
        name: "Highland Park 12",
        slug: "highland-park-12",
        brand: "Highland Park",
        price: 65,
        rating: 4.5,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: true,
        stock_quantity: 24,
        category: "Whisky",
        subcategory: "Single Malt",
        description: "Rich and smoky single malt.",
        tasting_notes: "Heather Honey, Rich Fruit Cake, Winter Spices, Seville Oranges, Aromatic Smoky Peat",
        ingredients: "Malted Barley, Water, Yeast",
        abv: 40,
        volume: "700ml",
        region: "Islands",
        country: "Scotland",
        sku: "HP-12-001",
        tags: ["Single Malt", "Smoky"],
        review_count: 85,
        created_at: "2023-01-15T00:00:00Z"
    },
    {
        id: "3",
        name: "Macallan 18",
        slug: "macallan-18",
        brand: "Macallan",
        price: 350,
        rating: 5,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: false,
        stock_quantity: 0,
        category: "Whisky",
        subcategory: "Single Malt",
        description: "Exquisite sherry seasoned oak casks.",
        tasting_notes: "Dried fruits, ginger, vanilla, cinnamon",
        ingredients: "Malted Barley, Water, Yeast",
        abv: 43,
        volume: "750ml",
        region: "Speyside",
        country: "Scotland",
        sku: "MAC-18-001",
        tags: ["Luxury", "Single Malt", "Sherry Cask"],
        review_count: 42,
        created_at: "2023-02-01T00:00:00Z"
    },
    {
        id: "4",
        name: "Grey Goose Vodka",
        slug: "grey-goose",
        brand: "Grey Goose",
        price: 45,
        rating: 4.2,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: true,
        stock_quantity: 100,
        category: "Vodka",
        subcategory: "Premium",
        description: "Premium French vodka.",
        tasting_notes: "Clean, fresh, with a smooth creamy texture",
        ingredients: "Wheat, Water",
        abv: 40,
        volume: "750ml",
        region: "Cognac",
        country: "France",
        sku: "GG-VOD-001",
        tags: ["Premium", "French", "Smooth"],
        review_count: 310,
        created_at: "2023-01-20T00:00:00Z"
    },
    {
        id: "5",
        name: "Hendrick's Gin",
        slug: "hendricks-gin",
        brand: "Hendrick's",
        price: 38,
        rating: 4.6,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: true,
        stock_quantity: 60,
        category: "Gin",
        subcategory: "Botanical",
        description: "Infused with rose and cucumber.",
        tasting_notes: "Juniper, Rose, Cucumber, Citrus",
        ingredients: "Grain Spirit, Botanicals",
        abv: 41.4,
        volume: "750ml",
        region: "Girvan",
        country: "Scotland",
        sku: "HEN-GIN-001",
        tags: ["Botanical", "Refreshing"],
        review_count: 215,
        created_at: "2023-03-01T00:00:00Z"
    },
    {
        id: "6",
        name: "Don Julio 1942",
        slug: "don-julio-1942",
        brand: "Don Julio",
        price: 180,
        rating: 4.9,
        image: "/bottle.png",
        images: ["/bottle.png"],
        in_stock: true,
        stock_quantity: 15,
        category: "Tequila",
        subcategory: "Añejo",
        description: "Small batch añejo tequila.",
        tasting_notes: "Warm oak, vanilla, roasted agave",
        ingredients: "Blue Weber Agave",
        abv: 38,
        volume: "750ml",
        region: "Jalisco",
        country: "Mexico",
        sku: "DJ-1942-001",
        tags: ["Luxury", "Añejo", "Celebration"],
        review_count: 95,
        created_at: "2023-02-15T00:00:00Z"
    }
]

export interface Address {
    id: string
    label: string
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    is_default: boolean
}

export const mockAddresses: Address[] = [
    {
        id: "addr_1",
        label: "Home",
        name: "John Doe",
        line1: "123 Main St",
        city: "New York",
        state: "NY",
        postal_code: "10001",
        is_default: true
    },
    {
        id: "addr_2",
        label: "Office",
        name: "John Doe",
        line1: "456 Business Ave",
        line2: "Suite 200",
        city: "New York",
        state: "NY",
        postal_code: "10010",
        is_default: false
    }
]

export interface Order {
    id: string
    date: string
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
    total: number
    items: number
    tracking?: string
}

export interface OrderDetail extends Order {
    shippingAddress: Address
    paymentMethod: string
    trackingNumber?: string
    products: {
        id: string
        name: string
        price: number
        quantity: number
        image: string
    }[]
    timeline: {
        status: string
        date: string
        completed: boolean
    }[]
}

export const mockOrders: Order[] = [
    { id: "ORD-001", date: "2023-11-01", status: "Delivered", total: 129.99, items: 3 },
    { id: "ORD-002", date: "2023-11-15", status: "Processing", total: 45.00, items: 1 }
]

export const getOrderDetails = (id: string): OrderDetail | null => {
    const order = mockOrders.find(o => o.id === id)
    if (!order) return null

    return {
        ...order,
        shippingAddress: mockAddresses[0],
        paymentMethod: "Visa ending in 4242",
        trackingNumber: order.status === "Delivered" ? "TRK-123456789" : undefined,
        products: [
            {
                id: "1",
                name: "Balisan Signature Whisky",
                price: 89.99,
                quantity: 1,
                image: "/bottle.png"
            }
        ],
        timeline: [
            { status: "Order Placed", date: "2023-11-01", completed: true },
            { status: "Processing", date: "2023-11-01", completed: true },
            { status: "Shipped", date: "2023-11-02", completed: order.status === "Delivered" },
            { status: "Delivered", date: "2023-11-04", completed: order.status === "Delivered" }
        ]
    }
}

export const mockFavorites = PRODUCTS.slice(0, 3)
