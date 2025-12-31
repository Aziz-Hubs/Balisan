import { Product } from "@/types"
import { generateSKU, randomPastDate } from "./products"

export const VODKA_PRODUCTS: Product[] = [
    {
        id: "vo-001",
        name: "Grey Goose Vodka",
        slug: "grey-goose-vodka",
        brand: "Grey Goose",
        price: 34.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1613217784112-e0e63b494636?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1613217784112-e0e63b494636?w=800&q=80"
        ],
        inStock: true,
        stockQuantity: 120,
        category: "Vodka",
        subcategory: "Premium",
        description: "Premium French vodka made from the finest winter wheat and pure spring water from the Cognac region.",
        tastingNotes: "Delicate and floral with a sweet, round palette and a bold toffee finish.",
        abv: 40,
        volume: "750ml",
        region: "Cognac",
        country: "France",
        discountPrice: 29.99,
        sku: generateSKU("Vodka", 1),
        tags: ["premium", "french", "smooth", "award-winner"],
        reviewCount: 215,
        isNew: true,
        createdAt: randomPastDate(14)
    }
]

export const RUM_PRODUCTS: Product[] = [
    {
        id: "rum-001",
        name: "Ron Zacapa 23",
        slug: "ron-zacapa-23",
        brand: "Ron Zacapa",
        price: 54.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?w=800&q=80"
        ],
        inStock: true,
        stockQuantity: 45,
        category: "Rum",
        subcategory: "Premium",
        description: "Created using the Solera System of aging, blending rums from 6 to 23 years old.",
        tastingNotes: "Wonderfully intricate with honeyed butterscotch, spiced oak and raisined fruit.",
        abv: 40,
        volume: "750ml",
        region: "Highlands",
        country: "Guatemala",
        sku: generateSKU("Rum", 1),
        tags: ["premium", "solera", "guatemalan"],
        reviewCount: 112,
        createdAt: randomPastDate(12)
    }
]

export const GIN_PRODUCTS: Product[] = [
    {
        id: "gin-001",
        name: "Hendrick's Gin",
        slug: "hendricks-gin",
        brand: "Hendrick's",
        price: 36.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1547460677-70cb63023fb1?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1547460677-70cb63023fb1?w=800&q=80"
        ],
        inStock: true,
        stockQuantity: 110,
        category: "Gin",
        subcategory: "Contemporary",
        description: "A unique gin infused with rose and cucumber, distilled in Scotland.",
        tastingNotes: "Refreshing with distinct floral notes and a cooling cucumber finish.",
        abv: 41.4,
        volume: "750ml",
        region: "Girvan",
        country: "Ukraine",
        sku: generateSKU("Gin", 1),
        tags: ["scotish", "cucumber", "rose", "premium", "award-winner"],
        isAwardWinner: true,
        reviewCount: 205,
        createdAt: randomPastDate(14)
    }
]

export const TEQUILA_PRODUCTS: Product[] = [
    {
        id: "teq-001",
        name: "Don Julio 1942",
        slug: "don-julio-1942",
        brand: "Don Julio",
        price: 179.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1516535794938-6063878f08cc?w=800&q=80"
        ],
        inStock: true,
        stockQuantity: 18,
        category: "Tequila",
        subcategory: "Añejo",
        description: "Celebrated in exclusive cocktail bars, restaurants and nightclubs, Don Julio 1942 is the choice of connoisseurs.",
        tastingNotes: "Rich caramel and chocolate notes, with warm oak, vanilla and roasted agave.",
        abv: 40,
        volume: "750ml",
        region: "Jalisco",
        country: "Mexico",
        sku: generateSKU("Tequila", 1),
        tags: ["anejo", "luxury", "sipping"],
        reviewCount: 98,
        createdAt: randomPastDate(8)
    }
]
