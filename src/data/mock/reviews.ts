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
    const reviewIndex = REVIEWS.length

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
            product_id: productId,
            user_id: `user-${String(userIndex).padStart(3, '0')}`,
            user: { full_name: `Customer ${userIndex}`, avatar_url: null },
            rating,
            title: template.title,
            comment: template.comment,
            is_verified_purchase: Math.random() > 0.2, // 80% verified
            helpful_count: Math.floor(Math.random() * 50),
            created_at: randomPastDate(12),

        })
    }

    return reviews
}

// Popular products get more reviews with positive bias
const popularProducts = [
    { id: 'wh-001', count: 15, dist: [10, 4, 1, 0, 0] }, // Glenfiddich 12
    { id: 'vo-001', count: 16, dist: [12, 3, 1, 0, 0] }, // Grey Goose
    { id: 'rum-001', count: 15, dist: [10, 4, 1, 0, 0] }, // Ron Zacapa 23
    { id: 'gin-001', count: 13, dist: [9, 3, 1, 0, 0] }, // Hendrick's
    { id: 'teq-001', count: 12, dist: [8, 3, 1, 0, 0] }, // Don Julio 1942
    { id: 'wine-001', count: 23, dist: [17, 5, 1, 0, 0] }, // Château Margaux
    { id: 'beer-001', count: 29, dist: [20, 8, 1, 0, 0] }, // Heineken
    { id: 'liq-001', count: 20, dist: [14, 5, 1, 0, 0] }, // Grand Marnier
]

// Generate reviews for popular products
popularProducts.forEach(({ id, count, dist }) => {
    REVIEWS.push(...generateReviewsForProduct(id, count, dist))
})


// Helper functions
export const getReviewsByProductId = (productId: string): Review[] => {
    return REVIEWS.filter(review => review.product_id === productId)
}

export const getReviewsByUserId = (userId: string): Review[] => {
    return REVIEWS.filter(review => review.user_id === userId)
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
    verified: REVIEWS.filter(r => r.is_verified_purchase).length,
    byRating: {
        5: REVIEWS.filter(r => r.rating === 5).length,
        4: REVIEWS.filter(r => r.rating === 4).length,
        3: REVIEWS.filter(r => r.rating === 3).length,
        2: REVIEWS.filter(r => r.rating === 2).length,
        1: REVIEWS.filter(r => r.rating === 1).length,
    },
    averageRating: Math.round((REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length) * 10) / 10
}
