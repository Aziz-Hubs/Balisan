import { UserProfile, Address } from "@/types"
import { Json } from "@/types/database.types"

const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

// Extended type for mock data to include joined addresses
export type MockUser = UserProfile & {
    addresses: Address[]
    phone?: string | null
    is_age_verified?: boolean
    stripe_customer_id?: string | null
    preferences?: Json
}

// Mock Users/Customers
export const USERS: MockUser[] = [
    // VIP Customers
    {
        id: "user-001",
        email: "james.mitchell@email.com",
        full_name: "James Mitchell",
        phone: "+1-555-0101",
        is_age_verified: true,
        created_at: randomPastDate(24),
        updated_at: randomPastDate(1),
        avatar_url: "https://i.pravatar.cc/150?img=11",
        stripe_customer_id: "cus_001",
        role: "customer",
        preferences: {
            favoriteCategories: ["Whiskey", "Wine"],
            newsletter: true
        } as unknown as Json,
        addresses: [
            {
                id: "addr-001-1",
                label: "Home",
                name: "James Mitchell",
                line1: "742 Evergreen Terrace",
                line2: null,
                city: "San Francisco",
                state: "CA",
                postal_code: "94102",
                country: "USA",
                phone: "+1-555-0101",
                is_default: true,
                user_id: "user-001",
                created_at: randomPastDate(24)
            },
            {
                id: "addr-001-2",
                label: "Office",
                name: "James Mitchell",
                line1: "100 Market Street",
                line2: "Suite 500",
                city: "San Francisco",
                state: "CA",
                postal_code: "94105",
                country: "USA",
                phone: null,
                is_default: false,
                user_id: "user-001",
                created_at: randomPastDate(20)
            }
        ]
    },
    {
        id: "user-002",
        email: "sarah.chen@email.com",
        full_name: "Sarah Chen",
        phone: "+1-555-0102",
        is_age_verified: true,
        created_at: randomPastDate(20),
        updated_at: randomPastDate(1),
        avatar_url: "https://i.pravatar.cc/150?img=5",
        stripe_customer_id: "cus_002",
        role: "customer",
        preferences: {
            favoriteCategories: ["Wine", "Gin"],
            newsletter: true
        } as unknown as Json,
        addresses: [
            {
                id: "addr-002-1",
                label: "Home",
                name: "Sarah Chen",
                line1: "2468 Oak Avenue",
                line2: null,
                city: "Los Angeles",
                state: "CA",
                postal_code: "90001",
                country: "USA",
                phone: "+1-555-0102",
                is_default: true,
                user_id: "user-002",
                created_at: randomPastDate(20)
            }
        ]
    },
    {
        id: "user-003",
        email: "michael.roberts@email.com",
        full_name: "Michael Roberts",
        phone: "+1-555-0103",
        is_age_verified: true,
        created_at: randomPastDate(18),
        updated_at: randomPastDate(1),
        avatar_url: null,
        stripe_customer_id: "cus_003",
        role: "customer",
        preferences: {
            favoriteCategories: ["Tequila", "Rum"],
            newsletter: true
        } as unknown as Json,
        addresses: [
            {
                id: "addr-003-1",
                label: "Home",
                name: "Michael Roberts",
                line1: "1357 Park Place",
                line2: null,
                city: "New York",
                state: "NY",
                postal_code: "10001",
                country: "USA",
                phone: null,
                is_default: true,
                user_id: "user-003",
                created_at: randomPastDate(18)
            }
        ]
    },
    {
        id: "user-004",
        email: "emily.watson@email.com",
        full_name: "Emily Watson",
        phone: "+1-555-0104",
        is_age_verified: true,
        created_at: randomPastDate(22),
        updated_at: randomPastDate(1),
        avatar_url: "https://i.pravatar.cc/150?img=9",
        stripe_customer_id: "cus_004",
        role: "customer",
        preferences: {
            favoriteCategories: ["Wine", "Liqueur"],
            newsletter: true
        } as unknown as Json,
        addresses: [
            {
                id: "addr-004-1",
                label: "Home",
                name: "Emily Watson",
                line1: "9876 Maple Drive",
                line2: null,
                city: "Chicago",
                state: "IL",
                postal_code: "60601",
                country: "USA",
                phone: "+1-555-0104",
                is_default: true,
                user_id: "user-004",
                created_at: randomPastDate(22)
            }
        ]
    },
    {
        id: "user-005",
        email: "david.kim@email.com",
        full_name: "David Kim",
        phone: "+1-555-0105",
        is_age_verified: true,
        created_at: randomPastDate(16),
        updated_at: randomPastDate(1),
        avatar_url: null,
        stripe_customer_id: "cus_005",
        role: "customer",
        preferences: {
            favoriteCategories: ["Whiskey", "Vodka", "Gin"],
            newsletter: true
        } as unknown as Json,
        addresses: [
            {
                id: "addr-005-1",
                label: "Home",
                name: "David Kim",
                line1: "555 Tech Boulevard",
                line2: null,
                city: "Seattle",
                state: "WA",
                postal_code: "98101",
                country: "USA",
                phone: null,
                is_default: true,
                user_id: "user-005",
                created_at: randomPastDate(16)
            }
        ]
    }
]

// Helper function to get user by ID
export const getUserById = (userId: string): MockUser | undefined => {
    return USERS.find(user => user.id === userId)
}

// Helper function to get user's default address
export const getUserDefaultAddress = (userId: string): Address | undefined => {
    const user = getUserById(userId)
    return user?.addresses.find(addr => addr.is_default)
}
