import { Product } from "@/types"
import { generateSKU, randomPastDate } from "./products"

export const WINE_PRODUCTS: any[] = [
    {
        id: "wine-001",
        name: "Château Margaux 2015",
        slug: "chateau-margaux-2015",
        brand: "Château Margaux",
        price: 899.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80"
        ],
        in_stock: true,
        stock_quantity: 5,
        category: "Wine",
        subcategory: "Red",
        description: "A legendary First Growth Bordeaux. 2015 was an exceptional vintage producing wines of incredible depth and longevity.",
        tasting_notes: "Blackcurrant, plum, cedar, and tobacco. exquisite balance and silky tannins.",
        abv: 13.5,
        volume: "750ml",
        region: "Bordeaux",
        country: "France",
        sku: generateSKU("Wine", 1),
        tags: ["bordeaux", "premium", "collectible", "award-winner"],
        is_award_winner: true,
        review_count: 12,
        flavor_profile: {
            woodiness: 70,
            smokiness: 10,
            sweetness: 20,
            complexity: 90,
            peatiness: 0
        },
        created_at: randomPastDate(24)
    }
]

export const BEER_PRODUCTS: any[] = [
    {
        id: "beer-001",
        name: "Heineken",
        slug: "heineken",
        brand: "Heineken",
        price: 10.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80"
        ],
        in_stock: true,
        stock_quantity: 300,
        category: "Beer",
        subcategory: "Lager",
        description: "World famous Dutch pale lager with a crisp taste.",
        tasting_notes: "Crisp, clean, with balanced hop bitterness.",
        abv: 5,
        volume: "6 pk",
        region: "Amsterdam",
        country: "Netherlands",
        discount_price: 8.99,
        sku: generateSKU("Beer", 1),
        tags: ["lager", "imported", "classic"],
        review_count: 345,
        flavor_profile: {
            woodiness: 0,
            smokiness: 0,
            sweetness: 10,
            complexity: 10,
            peatiness: 0
        },
        created_at: randomPastDate(24)
    }
]

export const LIQUEUR_PRODUCTS: any[] = [
    {
        id: "liq-001",
        name: "Grand Marnier Cordon Rouge",
        slug: "grand-marnier",
        brand: "Grand Marnier",
        price: 36.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1635097486846-9d21c7205423?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1635097486846-9d21c7205423?w=800&q=80"
        ],
        in_stock: true,
        stock_quantity: 80,
        category: "Liqueur",
        subcategory: "Orange",
        description: "Premium blend of cognacs with wild tropical oranges from the Caribbean.",
        tasting_notes: "Orange flower notes with nuances of candied zest and toffee.",
        abv: 40,
        volume: "750ml",
        region: "France",
        country: "Ukraine",
        sku: generateSKU("Liqueur", 1),
        tags: ["orange", "cognac", "premium", "cocktail-essential"],
        review_count: 112,
        is_new: true,
        flavor_profile: {
            woodiness: 30,
            smokiness: 0,
            sweetness: 70,
            complexity: 60,
            peatiness: 0
        },
        created_at: new Date().toISOString()
    }
]
