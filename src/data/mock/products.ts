import { Product } from "@/types"

// Helper function to generate SKU
export const generateSKU = (category: string, index: number): string => {
    const prefix = category.substring(0, 3).toUpperCase()
    return `${prefix}-${String(index).padStart(4, '0')}`
}

// Helper function to generate dates in the past 6 months
export const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

export const WHISKEY_PRODUCTS: Product[] = [
    {
        id: "wh-001",
        name: "Glenfiddich 12 Year Old",
        slug: "glenfiddich-12-year-old",
        brand: "Glenfiddich",
        price: 54.99,
        rating: 4.7,
        image: "/bottle.png",
        images: [
            "/bottle.png"
        ],
        inStock: true,
        stockQuantity: 45,
        category: "Whiskey",
        subcategory: "Scotch",
        description: "The world's most awarded single malt Scotch whisky, matured in Oloroso Sherry and bourbon casks for at least 12 years.",
        tastingNotes: "Fruity and floral with notes of fresh pear, creamy with subtle oak and a long smooth finish.",
        abv: 40,
        volume: "750ml",
        region: "Speyside",
        country: "Scotland",
        sku: generateSKU("Whiskey", 1),
        tags: ["scotch", "single-malt", "bestseller"],
        reviewCount: 142,
        flavorProfile: {
            woodiness: 40,
            smokiness: 20,
            sweetness: 60,
            complexity: 70,
            peatiness: 10
        },
        createdAt: randomPastDate(12)
    },
    {
        id: "wh-002",
        name: "Macallan 18 Year Sherry Oak",
        slug: "macallan-18-sherry-oak",
        brand: "The Macallan",
        price: 449.99,
        discountPrice: 399.99,
        rating: 4.9,
        image: "/bottle.png",
        images: [
            "/bottle.png"
        ],
        inStock: true,
        stockQuantity: 8,
        category: "Whiskey",
        subcategory: "Scotch",
        description: "Exceptional single malt matured exclusively in hand-picked sherry seasoned oak casks from Jerez for eighteen years.",
        tastingNotes: "Rich dried fruits, ginger, orange, and hints of wood smoke. Full-bodied with a warming, long finish.",
        abv: 43,
        volume: "750ml",
        region: "Speyside",
        country: "Scotland",
        sku: generateSKU("Whiskey", 2),
        tags: ["scotch", "single-malt", "premium", "limited-edition"],
        reviewCount: 56,
        flavorProfile: {
            woodiness: 80,
            smokiness: 30,
            sweetness: 50,
            complexity: 95,
            peatiness: 15
        },
        createdAt: randomPastDate(2)
    },
    {
        id: "wh-003",
        name: "Yamazaki 12 Year Old",
        slug: "yamazaki-12-year-old",
        brand: "Yamazaki",
        price: 189.99,
        rating: 4.8,
        image: "/bottle.png",
        images: [
            "/bottle.png"
        ],
        inStock: true,
        stockQuantity: 12,
        category: "Whiskey",
        subcategory: "Japanese",
        description: "Japan's first and oldest malt distillery, established in 1923. This 12-year-old is an iconic expression of Japanese whisky.",
        tastingNotes: "Peach, pineapple, grapefruit, clove, candied orange, vanilla and Mizunara (Japanese oak).",
        abv: 43,
        volume: "700ml",
        region: "Osaka Prefecture",
        country: "Japan",
        sku: generateSKU("Whiskey", 3),
        tags: ["japanese", "single-malt", "rare"],
        reviewCount: 42,
        flavorProfile: {
            woodiness: 60,
            smokiness: 10,
            sweetness: 70,
            complexity: 85,
            peatiness: 5
        },
        createdAt: randomPastDate(8)
    },
    {
        id: "wh-004",
        name: "Lagavulin 16 Year Old",
        slug: "lagavulin-16-year-old",
        brand: "Lagavulin",
        price: 119.99,
        rating: 4.9,
        image: "/bottle.png",
        images: [
            "/bottle.png"
        ],
        inStock: true,
        stockQuantity: 23,
        category: "Whiskey",
        subcategory: "Scotch",
        description: "Intensely flavored, peat-smoke with iodine and seaweed and a rich, deep, long lasting finish. An Islay classic.",
        tastingNotes: "Intense peat-smoke, rich sweetness, dry oak nuances with a hint of sea breeze saltiness. Long, elegant finish.",
        abv: 43,
        volume: "750ml",
        region: "Islay",
        country: "Scotland",
        sku: generateSKU("Whiskey", 4),
        tags: ["scotch", "single-malt", "peated", "premium"],
        reviewCount: 78,
        flavorProfile: {
            woodiness: 50,
            smokiness: 90,
            sweetness: 20,
            complexity: 80,
            peatiness: 85
        },
        createdAt: randomPastDate(6)
    },
    {
        id: "wh-005",
        name: "Woodford Reserve Bourbon",
        slug: "woodford-reserve-bourbon",
        brand: "Woodford Reserve",
        price: 44.99,
        rating: 4.7,
        image: "/bottle.png",
        images: [
            "/bottle.png"
        ],
        inStock: true,
        stockQuantity: 67,
        category: "Whiskey",
        subcategory: "Bourbon",
        description: "Premium small-batch bourbon with more than 200 detectable flavor notes, from bold grain and wood to sweet aromatics, spice and floral notes.",
        tastingNotes: "Rich, chewy, rounded and smooth with complex citrus, cinnamon and cocoa with a silky warm finish.",
        abv: 45.2,
        volume: "750ml",
        region: "Kentucky",
        country: "USA",
        sku: generateSKU("Whiskey", 5),
        tags: ["bourbon", "small-batch", "premium"],
        reviewCount: 94,
        flavorProfile: {
            woodiness: 70,
            smokiness: 5,
            sweetness: 75,
            complexity: 65,
            peatiness: 0
        },
        createdAt: randomPastDate(11)
    }
]
// Due to file size, I'll create the remaining categories in a separate file
// and combine them in the index file
