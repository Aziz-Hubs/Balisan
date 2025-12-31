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
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80"
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
        id: "wh-local",
        name: "Khmara Special Reserve",
        slug: "khmara-special-reserve",
        brand: "Khmara",
        price: 45.00,
        rating: 4.9,
        image: "/bottle.png",
        images: ["/bottle.png"],
        inStock: true,
        stockQuantity: 20,
        category: "Whiskey",
        subcategory: "Single Malt",
        description: "A local Ukrainian masterpiece. Smooth and bold.",
        abv: 42,
        volume: "750ml",
        region: "Kyiv",
        country: "Ukraine",
        sku: "KHM-001",
        tags: ["local", "premium", "award-winner"],
        isAwardWinner: true,
        reviewCount: 50,
        createdAt: new Date().toISOString()
    }
]
// Due to file size, I'll create the remaining categories in a separate file
// and combine them in the index file
