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

export const WHISKEY_PRODUCTS: any[] = [
    {
        id: "wh-001",
        name: "Johnnie Walker Black Label",
        slug: "johnnie-walker-black",
        brand: "Johnnie Walker",
        price: 45.99,
        rating: 4.8,
        image: "https://www.thecocktaildb.com/images/ingredients/Johnnie%20Walker.png",
        images: ["https://www.thecocktaildb.com/images/ingredients/Johnnie%20Walker.png"],
        in_stock: true,
        stock_quantity: 100,
        category: "Whiskey",
        subcategory: "Scotch",
        description: "Iconic Blend of over 30 malt and grain whiskies from around Scotland.",
        tasting_notes: "Rich, complex and well-balanced, full of dark fruits, sweet vanilla and signature smokiness.",
        abv: 40,
        volume: "750ml",
        region: "Scotland",
        country: "Scotland",
        sku: generateSKU("Whiskey", 1),
        tags: ["scotch", "blend", "classic"],
        review_count: 350,
        flavor_profile: {
            woodiness: 50,
            smokiness: 60,
            sweetness: 40,
            complexity: 70,
            peatiness: 40
        },
        created_at: randomPastDate(12)
    },
    {
        id: "wh-002",
        name: "Jack Daniel's Old No. 7",
        slug: "jack-daniels-no-7",
        brand: "Jack Daniel's",
        price: 26.99,
        rating: 4.7,
        image: "https://www.thecocktaildb.com/images/ingredients/Jack%20Daniels.png",
        images: ["https://www.thecocktaildb.com/images/ingredients/Jack%20Daniels.png"],
        in_stock: true,
        stock_quantity: 500,
        category: "Whiskey",
        subcategory: "Tennessee",
        description: "Mellowed drop by drop through 10-feet of sugar maple charcoal, then matured in handcrafted barrels.",
        tasting_notes: "Balance of sweet and oaky flavor.",
        abv: 40,
        volume: "750ml",
        region: "Tennessee",
        country: "USA",
        sku: generateSKU("Whiskey", 2),
        tags: ["usa", "classic", "charcoal-mellowed"],
        review_count: 1500,
        flavor_profile: {
            woodiness: 70,
            smokiness: 30,
            sweetness: 60,
            complexity: 40,
            peatiness: 0
        },
        created_at: randomPastDate(20)
    },
    {
        id: "wh-003",
        name: "Jim Beam White Label",
        slug: "jim-beam-white",
        brand: "Jim Beam",
        price: 18.99,
        rating: 4.5,
        image: "https://www.thecocktaildb.com/images/ingredients/Jim%20Beam.png",
        images: ["https://www.thecocktaildb.com/images/ingredients/Jim%20Beam.png"],
        in_stock: true,
        stock_quantity: 300,
        category: "Whiskey",
        subcategory: "Bourbon",
        description: "The world's number one selling bourbon foundation. Aged 4 years.",
        tasting_notes: "Oak, vanilla and spicy backdrop.",
        abv: 40,
        volume: "750ml",
        region: "Kentucky",
        country: "USA",
        sku: generateSKU("Whiskey", 3),
        tags: ["bourbon", "classic", "mixer"],
        review_count: 400,
        flavor_profile: {
            woodiness: 60,
            smokiness: 20,
            sweetness: 70,
            complexity: 30,
            peatiness: 0
        },
        created_at: randomPastDate(22)
    },
    {
        id: "wh-004",
        name: "Crown Royal",
        slug: "crown-royal",
        brand: "Crown Royal",
        price: 29.99,
        rating: 4.7,
        image: "https://www.thecocktaildb.com/images/ingredients/Crown%20Royal.png",
        images: ["https://www.thecocktaildb.com/images/ingredients/Crown%20Royal.png"],
        in_stock: true,
        stock_quantity: 150,
        category: "Whiskey",
        subcategory: "Canadian",
        description: "A legendary blend of 50 distinct, full-bodied whiskies.",
        tasting_notes: "Smooth, spicy, creamy finish.",
        abv: 40,
        volume: "750ml",
        region: "Manitoba",
        country: "Canada",
        sku: generateSKU("Whiskey", 4),
        tags: ["canadian", "smooth", "royal"],
        review_count: 280,
        flavor_profile: {
            woodiness: 40,
            smokiness: 10,
            sweetness: 65,
            complexity: 35,
            peatiness: 0
        },
        created_at: randomPastDate(15)
    },
    {
        id: "wh-005",
        name: "Blended Scotch Reserve",
        slug: "blended-scotch-reserve",
        brand: "Chivas Regal", // Inferred context but using Generic Bottle
        price: 34.00,
        rating: 4.6,
        image: "https://www.thecocktaildb.com/images/ingredients/Blended%20Scotch.png",
        images: ["https://www.thecocktaildb.com/images/ingredients/Blended%20Scotch.png"],
        in_stock: true,
        stock_quantity: 80,
        category: "Whiskey",
        subcategory: "Scotch",
        description: "A premium blend of the finest malt and grain scotch whiskies.",
        tasting_notes: "Honey, hazelnut and butterscotch.",
        abv: 40,
        volume: "750ml",
        region: "Scotland",
        country: "Scotland",
        sku: generateSKU("Whiskey", 5),
        tags: ["scotch", "blend", "premium"],
        review_count: 110,
        flavor_profile: {
            woodiness: 45,
            smokiness: 25,
            sweetness: 60,
            complexity: 40,
            peatiness: 10
        },
        created_at: randomPastDate(8)
    },
    {
        id: "wh-local",
        name: "Khmara Special Reserve",
        slug: "khmara-special-reserve",
        brand: "Khmara",
        price: 45.00,
        rating: 4.9,
        image: "https://www.thecocktaildb.com/images/ingredients/Irish%20whiskey.png", // Usable generic for premium look
        images: ["https://www.thecocktaildb.com/images/ingredients/Irish%20whiskey.png"],
        in_stock: true,
        stock_quantity: 20,
        category: "Whiskey",
        subcategory: "Single Malt",
        description: "A local Ukrainian masterpiece. Smooth and bold.",
        abv: 42,
        volume: "750ml",
        region: "Kyiv",
        country: "Ukraine",
        sku: "KHM-001",
        tags: ["local", "premium", "award-winner"],
        is_award_winner: true,
        review_count: 50,
        flavor_profile: {
            woodiness: 55,
            smokiness: 30,
            sweetness: 45,
            complexity: 65,
            peatiness: 15
        },
        created_at: new Date().toISOString()
    }
]
// Due to file size, I'll create the remaining categories in a separate file
// and combine them in the index file
