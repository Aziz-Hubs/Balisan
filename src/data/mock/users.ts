import { User, Address } from "@/types"

const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

// Mock Users/Customers
export const USERS: User[] = [
    // VIP Customers (5)
    {
        id: "user-001",
        email: "james.mitchell@email.com",
        name: "James Mitchell",
        phone: "+1-555-0101",
        ageVerified: true,
        createdAt: randomPastDate(24),
        addresses: [
            {
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
            {
                id: "addr-001-2",
                label: "Office",
                name: "James Mitchell",
                line1: "100 Market Street",
                line2: "Suite 500",
                city: "San Francisco",
                state: "CA",
                zip: "94105",
                country: "USA",
                isDefault: false
            }
        ],
        orderHistoryIds: ["ord-001", "ord-003", "ord-007", "ord-012", "ord-018", "ord-025", "ord-031", "ord-038"],
        preferences: {
            favoriteCategories: ["Whiskey", "Wine"],
            newsletter: true
        },
        customerType: "vip"
    },
    {
        id: "user-002",
        email: "sarah.chen@email.com",
        name: "Sarah Chen",
        phone: "+1-555-0102",
        ageVerified: true,
        createdAt: randomPastDate(20),
        addresses: [
            {
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
            }
        ],
        orderHistoryIds: ["ord-002", "ord-006", "ord-011", "ord-019", "ord-027", "ord-034", "ord-042"],
        preferences: {
            favoriteCategories: ["Wine", "Gin"],
            newsletter: true
        },
        customerType: "vip"
    },
    {
        id: "user-003",
        email: "michael.roberts@email.com",
        name: "Michael Roberts",
        phone: "+1-555-0103",
        ageVerified: true,
        createdAt: randomPastDate(18),
        addresses: [
            {
                id: "addr-003-1",
                label: "Home",
                name: "Michael Roberts",
                line1: "1357 Park Place",
                city: "New York",
                state: "NY",
                zip: "10001",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-004", "ord-009", "ord-015", "ord-022", "ord-029", "ord-036", "ord-044"],
        preferences: {
            favoriteCategories: ["Tequila", "Rum"],
            newsletter: true
        },
        customerType: "vip"
    },
    {
        id: "user-004",
        email: "emily.watson@email.com",
        name: "Emily Watson",
        phone: "+1-555-0104",
        ageVerified: true,
        createdAt: randomPastDate(22),
        addresses: [
            {
                id: "addr-004-1",
                label: "Home",
                name: "Emily Watson",
                line1: "9876 Maple Drive",
                city: "Chicago",
                state: "IL",
                zip: "60601",
                country: "USA",
                phone: "+1-555-0104",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-005", "ord-010", "ord-016", "ord-024", "ord-030", "ord-037", "ord-045"],
        preferences: {
            favoriteCategories: ["Wine", "Liqueur"],
            newsletter: true
        },
        customerType: "vip"
    },
    {
        id: "user-005",
        email: "david.kim@email.com",
        name: "David Kim",
        phone: "+1-555-0105",
        ageVerified: true,
        createdAt: randomPastDate(16),
        addresses: [
            {
                id: "addr-005-1",
                label: "Home",
                name: "David Kim",
                line1: "555 Tech Boulevard",
                city: "Seattle",
                state: "WA",
                zip: "98101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-008", "ord-014", "ord-021", "ord-028", "ord-035", "ord-041"],
        preferences: {
            favoriteCategories: ["Whiskey", "Vodka", "Gin"],
            newsletter: true
        },
        customerType: "vip"
    },

    // Regular Customers (10)
    {
        id: "user-006",
        email: "lisa.anderson@email.com",
        name: "Lisa Anderson",
        phone: "+1-555-0106",
        ageVerified: true,
        createdAt: randomPastDate(14),
        addresses: [
            {
                id: "addr-006-1",
                label: "Home",
                name: "Lisa Anderson",
                line1: "432 Elm Street",
                city: "Austin",
                state: "TX",
                zip: "73301",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-013", "ord-026", "ord-039"],
        preferences: {
            favoriteCategories: ["Wine"],
            newsletter: true
        },
        customerType: "regular"
    },
    {
        id: "user-007",
        email: "robert.taylor@email.com",
        name: "Robert Taylor",
        phone: "+1-555-0107",
        ageVerified: true,
        createdAt: randomPastDate(12),
        addresses: [
            {
                id: "addr-007-1",
                label: "Home",
                name: "Robert Taylor",
                line1: "789 Pine Street",
                city: "Boston",
                state: "MA",
                zip: "02101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-017", "ord-032"],
        preferences: {
            favoriteCategories: ["Whiskey", "Beer"],
            newsletter: false
        },
        customerType: "regular"
    },
    {
        id: "user-008",
        email: "jennifer.lee@email.com",
        name: "Jennifer Lee",
        phone: "+1-555-0108",
        ageVerified: true,
        createdAt: randomPastDate(10),
        addresses: [
            {
                id: "addr-008-1",
                label: "Home",
                name: "Jennifer Lee",
                line1: "246 Cedar Lane",
                city: "Denver",
                state: "CO",
                zip: "80201",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-020", "ord-033", "ord-046"],
        preferences: {
            favoriteCategories: ["Gin", "Vodka"],
            newsletter: true
        },
        customerType: "regular"
    },
    {
        id: "user-009",
        email: "william.brown@email.com",
        name: "William Brown",
        phone: "+1-555-0109",
        ageVerified: true,
        createdAt: randomPastDate(9),
        addresses: [
            {
                id: "addr-009-1",
                label: "Home",
                name: "William Brown",
                line1: "135 Willow Way",
                city: "Portland",
                state: "OR",
                zip: "97201",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-023", "ord-040"],
        preferences: {
            favoriteCategories: ["Beer", "Whiskey"],
            newsletter: false
        },
        customerType: "regular"
    },
    {
        id: "user-010",
        email: "amanda.martinez@email.com",
        name: "Amanda Martinez",
        phone: "+1-555-0110",
        ageVerified: true,
        createdAt: randomPastDate(11),
        addresses: [
            {
                id: "addr-010-1",
                label: "Home",
                name: "Amanda Martinez",
                line1: "864 Birch Boulevard",
                city: "Miami",
                state: "FL",
                zip: "33101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-047"],
        preferences: {
            favoriteCategories: ["Rum", "Tequila"],
            newsletter: true
        },
        customerType: "regular"
    },
    {
        id: "user-011",
        email: "christopher.davis@email.com",
        name: "Christopher Davis",
        phone: "+1-555-0111",
        ageVerified: true,
        createdAt: randomPastDate(8),
        addresses: [
            {
                id: "addr-011-1",
                label: "Home",
                name: "Christopher Davis",
                line1: "951 Sunset Avenue",
                city: "Phoenix",
                state: "AZ",
                zip: "85001",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-048"],
        preferences: {
            favoriteCategories: ["Tequila"],
            newsletter: false
        },
        customerType: "regular"
    },
    {
        id: "user-012",
        email: "jessica.wilson@email.com",
        name: "Jessica Wilson",
        phone: "+1-555-0112",
        ageVerified: true,
        createdAt: randomPastDate(7),
        addresses: [
            {
                id: "addr-012-1",
                label: "Home",
                name: "Jessica Wilson",
                line1: "753 Harbor Street",
                city: "San Diego",
                state: "CA",
                zip: "92101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-049"],
        preferences: {
            favoriteCategories: ["Wine", "Beer"],
            newsletter: true
        },
        customerType: "regular"
    },
    {
        id: "user-013",
        email: "matthew.garcia@email.com",
        name: "Matthew Garcia",
        phone: "+1-555-0113",
        ageVerified: true,
        createdAt: randomPastDate(6),
        addresses: [
            {
                id: "addr-013-1",
                label: "Home",
                name: "Matthew Garcia",
                line1: "369 Mountain Drive",
                city: "Salt Lake City",
                state: "UT",
                zip: "84101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: ["Whiskey"],
            newsletter: false
        },
        customerType: "regular"
    },
    {
        id: "user-014",
        email: "ashley.rodriguez@email.com",
        name: "Ashley Rodriguez",
        phone: "+1-555-0114",
        ageVerified: true,
        createdAt: randomPastDate(5),
        addresses: [
            {
                id: "addr-014-1",
                label: "Home",
                name: "Ashley Rodriguez",
                line1: "159 Valley View",
                city: "Las Vegas",
                state: "NV",
                zip: "89101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: ["Vodka", "Gin"],
            newsletter: true
        },
        customerType: "regular"
    },
    {
        id: "user-015",
        email: "daniel.miller@email.com",
        name: "Daniel Miller",
        phone: "+1-555-0115",
        ageVerified: true,
        createdAt: randomPastDate(4),
        addresses: [
            {
                id: "addr-015-1",
                label: "Home",
                name: "Daniel Miller",
                line1: "741 River Road",
                city: "Nashville",
                state: "TN",
                zip: "37201",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: ["Whiskey", "Beer"],
            newsletter: false
        },
        customerType: "regular"
    },

    // New Customers (5)
    {
        id: "user-016",
        email: "sophia.johnson@email.com",
        name: "Sophia Johnson",
        phone: "+1-555-0116",
        ageVerified: true,
        createdAt: randomPastDate(2),
        addresses: [
            {
                id: "addr-016-1",
                label: "Home",
                name: "Sophia Johnson",
                line1: "852 Ocean Drive",
                city: "Honolulu",
                state: "HI",
                zip: "96801",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: ["ord-050"],
        preferences: {
            favoriteCategories: ["Wine"],
            newsletter: true
        },
        customerType: "new"
    },
    {
        id: "user-017",
        email: "joseph.thompson@email.com",
        name: "Joseph Thompson",
        phone: "+1-555-0117",
        ageVerified: true,
        createdAt: randomPastDate(1),
        addresses: [
            {
                id: "addr-017-1",
                label: "Home",
                name: "Joseph Thompson",
                line1: "963 Lake Shore",
                city: "Minneapolis",
                state: "MN",
                zip: "55401",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: [],
            newsletter: true
        },
        customerType: "new"
    },
    {
        id: "user-018",
        email: "madison.white@email.com",
        name: "Madison White",
        phone: "+1-555-0118",
        ageVerified: true,
        createdAt: randomPastDate(1),
        addresses: [
            {
                id: "addr-018-1",
                label: "Home",
                name: "Madison White",
                line1: "147 Forest Lane",
                city: "Atlanta",
                state: "GA",
                zip: "30301",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: [],
            newsletter: false
        },
        customerType: "new"
    },
    {
        id: "user-019",
        email: "ethan.harris@email.com",
        name: "Ethan Harris",
        phone: "+1-555-0119",
        ageVerified: true,
        createdAt: randomPastDate(1),
        addresses: [
            {
                id: "addr-019-1",
                label: "Home",
                name: "Ethan Harris",
                line1: "258 Spring Street",
                city: "Dallas",
                state: "TX",
                zip: "75201",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: [],
            newsletter: true
        },
        customerType: "new"
    },
    {
        id: "user-020",
        email: "olivia.martin@email.com",
        name: "Olivia Martin",
        phone: "+1-555-0120",
        ageVerified: true,
        createdAt: randomPastDate(1),
        addresses: [
            {
                id: "addr-020-1",
                label: "Home",
                name: "Olivia Martin",
                line1: "369 Summit Avenue",
                city: "Philadelphia",
                state: "PA",
                zip: "19101",
                country: "USA",
                isDefault: true
            }
        ],
        orderHistoryIds: [],
        preferences: {
            favoriteCategories: [],
            newsletter: false
        },
        customerType: "new"
    }
]

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
    return USERS.find(user => user.id === userId)
}

// Helper function to get user's default address
export const getUserDefaultAddress = (userId: string): Address | undefined => {
    const user = getUserById(userId)
    return user?.addresses.find(addr => addr.isDefault)
}
