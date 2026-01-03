import { BlogPost } from "@/types"

const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

// Simplified mock blog posts that match the database// Mock content
export const BLOG_POSTS: any[] = [
    {
        id: "blog-001",
        author_id: "00000000-0000-0000-0000-000000000001",
        type: "blog",
        title: "The Ultimate Guide to Whiskey Tasting",
        slug: "ultimate-guide-whiskey-tasting",
        excerpt: "Learn the art of whiskey tasting from nosing techniques to identifying flavor profiles.",
        content: `# The Ultimate Guide to Whiskey Tasting\n\nWhiskey tasting is an art form that combines sensory perception with knowledge of production methods and regional characteristics.\n\nLearn the five S's: See, Swirl, Sniff, Sip, and Savor.`,
        image_url: "/bottle.png",
        published_at: randomPastDate(3),
        is_published: true,
        created_at: randomPastDate(3),
        updated_at: randomPastDate(3),
        author: {
            full_name: "Alexander Morrison",
            avatar_url: "https://i.pravatar.cc/150?img=12"
        }
    },
    {
        id: "blog-002",
        author_id: "00000000-0000-0000-0000-000000000002",
        type: "blog",
        title: "Top 10 Classic Cocktails Every Home Bartender Should Master",
        slug: "classic-cocktails-home-bartender",
        excerpt: "From Old Fashioneds to Martinis, learn the essential cocktails that form the foundation of mixology.",
        content: `# Top 10 Classic Cocktails\n\nMaster these timeless cocktails: Old Fashioned, Martini, Manhattan, Margarita, Negroni, Mojito, Daiquiri, Whiskey Sour, Espresso Martini, and Moscow Mule.`,
        image_url: "/bottle.png",
        published_at: randomPastDate(2),
        is_published: true,
        created_at: randomPastDate(2),
        updated_at: randomPastDate(2),
        author: {
            full_name: "Sofia Martinez",
            avatar_url: "https://i.pravatar.cc/150?img=27"
        }
    },
    {
        id: "blog-003",
        author_id: "00000000-0000-0000-0000-000000000003",
        type: "blog",
        title: "Wine Pairing 101: Matching Food and Wine Like a Pro",
        slug: "wine-pairing-guide",
        excerpt: "Discover the principles of food and wine pairing to elevate your dining experience.",
        content: `# Wine Pairing 101\n\nMatch weight with weight, consider acidity, and think about sweetness. What grows together, goes together!`,
        image_url: "/bottle.png",
        published_at: randomPastDate(4),
        is_published: true,
        created_at: randomPastDate(4),
        updated_at: randomPastDate(4),
        author: {
            full_name: "Charlotte Beaumont",
            avatar_url: "https://i.pravatar.cc/150?img=45"
        }
    },
    {
        id: "blog-004",
        author_id: "00000000-0000-0000-0000-000000000004",
        type: "blog",
        title: "The Rise of Craft Spirits: Small Batch Revolution",
        slug: "craft-spirits-revolution",
        excerpt: "How small distilleries are changing the spirits industry with innovation and quality.",
        content: `# The Rise of Craft Spirits\n\nCraft distilleries are redefining quality with small-batch production, local ingredients, and innovative techniques.`,
        image_url: "/bottle.png",
        published_at: randomPastDate(1),
        is_published: true,
        created_at: randomPastDate(1),
        updated_at: randomPastDate(1),
        author: {
            full_name: "Jackson Reynolds",
            avatar_url: "https://i.pravatar.cc/150?img=33"
        }
    },
    {
        id: "blog-005",
        author_id: "00000000-0000-0000-0000-000000000005",
        type: "blog",
        title: "Tequila Beyond Margaritas: Discovering Premium Agave Spirits",
        slug: "premium-tequila-guide",
        excerpt: "Explore the world of añejo and extra añejo tequilas that deserve to be sipped, not shot.",
        content: `# Premium Tequila\n\nFrom Blanco to Extra Añejo, discover how premium tequila rivals the finest spirits in the world.`,
        image_url: "/bottle.png",
        published_at: randomPastDate(5),
        is_published: true,
        created_at: randomPastDate(5),
        updated_at: randomPastDate(5),
        author: {
            full_name: "Diego Hernandez",
            avatar_url: "https://i.pravatar.cc/150?img=51"
        }
    }
]

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return BLOG_POSTS.find(post => post.slug === slug)
}

export const getFeaturedBlogPosts = (limit = 3): BlogPost[] => {
    return BLOG_POSTS.slice(0, limit)
}

export const getBlogPostsByType = (type: string): BlogPost[] => {
    return BLOG_POSTS.filter(post => post.type === type)
}
