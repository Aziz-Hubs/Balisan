import { Review } from "@/types"

const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

// Sample review templates for realistic content
const reviewTemplates = {
    5: [
        { title: "Absolutely outstanding!", comment: "This is hands down one of the best purchases I've made. The quality is exceptional and it exceeded all my expectations. Highly recommend!" },
        { title: "Perfect in every way", comment: "Couldn't be happier with this product. Everything from the packaging to the taste is top-notch. Will definitely be ordering again." },
        { title: "Exceeded expectations", comment: "I was skeptical at first, but this truly delivers. The flavor profile is complex and well-balanced. Worth every penny." },
        { title: "Best I've ever had", comment: "Simply phenomenal. This has become my go-to choice and I recommend it to everyone I know." },
        { title: "Five stars all the way", comment: "Outstanding quality and exceptional value. You won't find better at this price point." },
    ],
    4: [
        { title: "Really good quality", comment: "Very pleased with this purchase. It's excellent quality and exactly as described. Minor quibble with packaging but the product itself is great." },
        { title: "Solid choice", comment: "Good value for money. Does what it says and tastes great. Would buy again." },
        { title: "Happy with my purchase", comment: "Nice smooth finish and good flavor. Not the absolute best I've tried but very good for the price." },
        { title: "Recommended", comment: "Great product overall. A few small things could be improved but I'm very satisfied." },
        { title: "Very good", comment: "Lives up to the hype. Good balance and complexity. Definitely worth trying." },
    ],
    3: [
        { title: "It's okay", comment: "Not bad but not amazing either. Decent for the price but there are better options out there." },
        { title: "Average", comment: "Nothing special but does the job. Expected a bit more based on reviews but it's acceptable." },
        { title: "Mixed feelings", comment: "Some aspects are good, others not so much. It's fine but I probably wouldn't buy it again." },
        { title: "Decent but overpriced", comment: "Quality is okay but I feel like I overpaid. Similar products available for less." },
    ],
    2: [
        { title: "Disappointed", comment: "Expected much better based on the reviews. Flavor is harsh and not well balanced." },
        { title: "Not what I hoped for", comment: "Unfortunately this didn't live up to expectations. Wouldn't recommend." },
    ],
    1: [
        { title: "Very poor quality", comment: "Extremely disappointed. Taste is terrible and not worth the money at all." },
    ]
}

// Generate 150+ reviews distributed across products
export const REVIEWS: Review[] = []

// Helper to generate reviews for a product
const generateReviewsForProduct = (
    productId: string,
    count: number,
    ratingDistribution: number[] // [5-star, 4-star, 3-star, 2-star, 1-star]
) => {
    const reviews: Review[] = []
    let reviewIndex = REVIEWS.length

    const distribution = ratingDistribution
    const totalWeights = distribution.reduce((a, b) => a + b, 0)

    for (let i = 0; i < count; i++) {
        // Determine rating based on distribution
        const rand = Math.random() * totalWeights
        let cumulative = 0
        let rating = 5

        for (let r = 0; r < distribution.length; r++) {
            cumulative += distribution[r]
            if (rand < cumulative) {
                rating = 5 - r
                break
            }
        }

        const templates = reviewTemplates[rating as keyof typeof reviewTemplates]
        const template = templates[Math.floor(Math.random() * templates.length)]
        const userIndex = Math.floor(Math.random() * 20) + 1

        reviews.push({
            id: `rev-${String(reviewIndex + i + 1).padStart(4, '0')}`,
            productId,
            userId: `user-${String(userIndex).padStart(3, '0')}`,
            userName: `Customer ${userIndex}`,
            rating,
            title: template.title,
            comment: template.comment,
            verifiedPurchase: Math.random() > 0.2, // 80% verified
            helpfulCount: Math.floor(Math.random() * 50),
            createdAt: randomPastDate(12)
        })
    }

    return reviews
}

// Popular products get more reviews with positive bias
const popularProducts = [
    { id: 'wh-001', count: 15, dist: [10, 4, 1, 0, 0] }, // Glenfiddich 12
    { id: 'wh-005', count: 18, dist: [13, 4, 1, 0, 0] }, // Buffalo Trace
    { id: 'wh-007', count: 20, dist: [14, 5, 1, 0, 0] }, // Johnnie Walker Black
    { id: 'wh-015', count: 14, dist: [9, 4, 1, 0, 0] }, // Bulleit
    { id: 'vo-003', count: 16, dist: [12, 3, 1, 0, 0] }, // Tito's
    { id: 'vo-004', count: 18, dist: [12, 5, 1, 0, 0] }, // Absolut
    { id: 'vo-008', count: 20, dist: [14, 5, 1, 0, 0] }, // Smirnoff
    { id: 'wine-005', count: 23, dist: [17, 5, 1, 0, 0] }, // Meiomi Pinot
    { id: 'wine-010', count: 31, dist: [22, 8, 1, 0, 0] }, // Apothic Red
    { id: 'wine-014', count: 42, dist: [30, 10, 2, 0, 0] }, // 19 Crimes
    { id: 'wine-017', count: 29, dist: [20, 8, 1, 0, 0] }, // Kendall-Jackson Chard
    { id: 'wine-020', count: 26, dist: [18, 7, 1, 0, 0] }, // Kim Crawford SB
    { id: 'wine-026', count: 20, dist: [14, 5, 1, 0, 0] }, // Whispering Angel
    { id: 'gin-001', count: 13, dist: [9, 3, 1, 0, 0] }, // Hendrick's
    { id: 'gin-002', count: 16, dist: [11, 4, 1, 0, 0] }, // Tanqueray
    { id: 'gin-003', count: 17, dist: [12, 4, 1, 0, 0] }, // Bombay Sapphire
    { id: 'teq-003', count: 16, dist: [12, 3, 1, 0, 0] }, // Casamigos Reposado
    { id: 'rum-001', count: 15, dist: [10, 4, 1, 0, 0] }, // Bacardi
    { id: 'rum-002', count: 17, dist: [11, 5, 1, 0, 0] }, // Captain Morgan
    { id: 'beer-002', count: 29, dist: [20, 8, 1, 0, 0] }, // Guinness
    { id: 'beer-005', count: 23, dist: [16, 6, 1, 0, 0] }, // Stella
    { id: 'liq-002', count: 20, dist: [14, 5, 1, 0, 0] }, // Kahlúa
    { id: 'liq-005', count: 18, dist: [12, 5, 1, 0, 0] }, // Jägermeister
]

// Generate reviews for popular products
popularProducts.forEach(({ id, count, dist }) => {
    REVIEWS.push(...generateReviewsForProduct(id, count, dist))
})

// Premium products with fewer but highly positive reviews
const premiumProducts = [
    { id: 'wh-004', count: 6, dist: [5, 1, 0, 0, 0] }, // Macallan 18
    { id: 'wh-006', count: 4, dist: [4, 0, 0, 0, 0] }, // Yamazaki 12
    { id: 'wh-008', count: 8, dist: [7, 1, 0, 0, 0] }, // Lagavulin 16
    { id: 'wh-014', count: 5, dist: [4, 1, 0, 0, 0] }, // Hibiki Harmony
    { id: 'wine-001', count: 3, dist: [3, 0, 0, 0, 0] }, // Château Margaux
    { id: 'wine-006', count: 5, dist: [5, 0, 0, 0, 0] }, // Penfolds Grange
    { id: 'wine-009', count: 7, dist: [6, 1, 0, 0, 0] }, // Antinori Tignanello
    { id: 'wine-013', count: 7, dist: [6, 1, 0, 0, 0] }, // Opus One
    { id: 'wine-015', count: 5, dist: [5, 0, 0, 0, 0] }, // Ridge Monte Bello
    { id: 'wine-016', count: 2, dist: [2, 0, 0, 0, 0] }, // Domaine Leflaive
    { id: 'wine-023', count: 4, dist: [4, 0, 0, 0, 0] }, // Château d'Yquem
    { id: 'teq-006', count: 10, dist: [9, 1, 0, 0, 0] }, // Don Julio 1942
    { id: 'teq-007', count: 8, dist: [7, 1, 0, 0, 0] }, // Clase Azul
    { id: 'liq-001', count: 4, dist: [4, 0, 0, 0, 0] }, // Grand Marnier Cuvée
]

premiumProducts.forEach(({ id, count, dist }) => {
    REVIEWS.push(...generateReviewsForProduct(id, count, dist))
})

// Moderate products with mixed reviews
const moderateProducts = [
    { id: 'wh-002', count: 10, dist: [6, 3, 1, 0, 0] }, // Jameson
    { id: 'wh-003', count: 9, dist: [6, 2, 1, 0, 0] }, // Maker's Mark
    { id: 'wh-009', count: 9, dist: [6, 2, 1, 0, 0] }, // Woodford Reserve
    { id: 'wh-010', count: 13, dist: [8, 4, 1, 0, 0] }, // Crown Royal
    { id: 'vo-001', count: 10, dist: [6, 3, 1, 0, 0] }, // Grey Goose
    { id: 'vo-002', count: 9, dist: [6, 2, 1, 0, 0] }, // Belvedere
    { id: 'gin-004', count: 9, dist: [7, 2, 0, 0, 0] }, // The Botanist
    { id: 'gin-008', count: 10, dist: [7, 2, 1, 0, 0] }, // Sipsmith
    { id: 'teq-001', count: 12, dist: [8, 3, 1, 0, 0] }, // Don Julio Blanco
    { id: 'teq-002', count: 14, dist: [10, 3, 1, 0, 0] }, // Patrón Silver
    { id: 'rum-003', count: 8, dist: [6, 2, 0, 0, 0] }, // Havana Club 7
    { id: 'rum-004', count: 9, dist: [7, 2, 0, 0, 0] }, // Diplomatico
    { id: 'wine-002', count: 14, dist: [10, 3, 1, 0, 0] }, // Caymus Cabernet
    { id: 'wine-004', count: 10, dist: [7, 2, 1, 0, 0] }, // Silver Oak
    { id: 'wine-019', count: 13, dist: [9, 3, 1, 0, 0] }, // Cloudy Bay SB
]

moderateProducts.forEach(({ id, count, dist }) => {
    REVIEWS.push(...generateReviewsForProduct(id, count, dist))
})

// Helper functions
export const getReviewsByProductId = (productId: string): Review[] => {
    return REVIEWS.filter(review => review.productId === productId)
}

export const getReviewsByUserId = (userId: string): Review[] => {
    return REVIEWS.filter(review => review.userId === userId)
}

export const getAverageRating = (productId: string): number => {
    const productReviews = getReviewsByProductId(productId)
    if (productReviews.length === 0) return 0

    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / productReviews.length) * 10) / 10
}

// Statistics
export const REVIEW_STATS = {
    total: REVIEWS.length,
    verified: REVIEWS.filter(r => r.verifiedPurchase).length,
    byRating: {
        5: REVIEWS.filter(r => r.rating === 5).length,
        4: REVIEWS.filter(r => r.rating === 4).length,
        3: REVIEWS.filter(r => r.rating === 3).length,
        2: REVIEWS.filter(r => r.rating === 2).length,
        1: REVIEWS.filter(r => r.rating === 1).length,
    },
    averageRating: Math.round((REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length) * 10) / 10
}
