// Product Types
export interface Product {
    id: string
    name: string
    slug: string
    brand: string
    price: number
    discountPrice?: number
    rating: number
    image: string
    images: string[] // Gallery images
    inStock: boolean
    stockQuantity: number
    category: string
    subcategory?: string
    description: string
    tastingNotes?: string
    ingredients?: string
    abv: number // Alcohol by volume percentage
    volume: string // e.g., "750ml", "1L"
    region: string // Country/region of origin
    country: string
    sku: string
    tags: string[]
    reviewCount: number
    modelUrl?: string
    flavorProfile?: {
        woodiness: number // 0-100
        smokiness: number // 0-100
        sweetness: number // 0-100
        complexity: number // 0-100
        peatiness: number // 0-100
    }
    createdAt: string
}

// User/Customer Types
export interface User {
    id: string
    email: string
    name: string
    phone: string
    ageVerified: boolean
    createdAt: string
    addresses: Address[]
    orderHistoryIds: string[]
    preferences: {
        favoriteCategories: string[]
        newsletter: boolean
    }
    customerType: 'regular' | 'vip' | 'new'
}

export interface Address {
    id: string
    label: string
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
    country: string
    phone?: string
    isDefault: boolean
}

// Order Types
export interface OrderItem {
    productId: string
    productName: string
    productImage: string
    quantity: number
    price: number
    discountPrice?: number
}

export interface Order {
    id: string
    userId: string
    items: OrderItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    paymentMethod: string
    shippingAddress: Address
    trackingNumber?: string
    createdAt: string
    updatedAt: string
}

// Review Types
export interface Review {
    id: string
    productId: string
    userId: string
    userName: string
    rating: number // 1-5
    title: string
    comment: string
    verifiedPurchase: boolean
    helpfulCount: number
    createdAt: string
}

// Blog Post Types
export interface BlogPost {
    id: string
    title: string
    slug: string
    author: {
        name: string
        avatar?: string
    }
    excerpt: string
    content: string // Markdown content
    category: string
    tags: string[]
    featuredImage: string
    publishedAt: string
    readTime: number // in minutes
}

// Recipe Types
export interface RecipeIngredient {
    name: string
    amount: string
    productId?: string // Link to shoppable product
    productName?: string
    price?: number
    image?: string
}

export interface Recipe {
    id: string
    title: string
    slug: string
    description: string
    ingredients: RecipeIngredient[]
    instructions: string[]
    difficulty: 'easy' | 'medium' | 'hard'
    prepTime: number // in minutes
    servings: number
    image: string
    category: string
    tags: string[]
    glassware?: string
    garnish?: string
}

// Filter State (existing)
export interface FilterState {
    category: string | null
    minPrice: number
    maxPrice: number
    brands: string[]
    sort: string
}
