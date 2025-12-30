export interface Product {
    id: string
    name: string
    slug: string
    price: number
    image: string
    brand: string
    category: string
}

export interface CategoryItem {
    title: string
    href: string
    image?: string
    badge?: 'new' | 'best-seller' | 'limited'
    description?: string
    subcategories?: CategoryItem[]
}

export interface MegaMenuCategory {
    title: string
    href: string
    description: string
    image?: string
    featured?: string[] // Product IDs
    items: CategoryItem[]
}

export const navigationCategories: MegaMenuCategory[] = [
    {
        title: "Shop",
        href: "/shop",
        description: "Explore our complete curated collection of craft spirits, fine wines, and artisanal discoveries.",
        image: "/bottle.png",
        items: [
            {
                title: "Spirits",
                href: "/shop/spirits",
                description: "Artisanal Gins, Premium Vodkas, and Master-distilled Tequilas.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Whiskey", href: "/shop/whiskey" },
                    { title: "Gin", href: "/shop/gin" },
                    { title: "Tequila", href: "/shop/tequila" },
                    { title: "Vodka", href: "/shop/vodka" },
                ]
            },
            {
                title: "Wine & Bubbles",
                href: "/shop/wine",
                description: "Exquisite selections from the world's most storied vineyards.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Red Wine", href: "/shop/wine/red" },
                    { title: "White Wine", href: "/shop/wine/white" },
                    { title: "Champagne", href: "/shop/wine/sparkling" },
                ]
            },
            {
                title: "Accessories",
                href: "/shop/accessories",
                description: "Premium glassware and tools for the ultimate experience.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Glassware", href: "/shop/accessories/glassware" },
                    { title: "Bar Tools", href: "/shop/accessories/tools" },
                ]
            }
        ]
    },
    {
        title: "Collections",
        href: "/collections",
        description: "Curated selections for every occasion and taste.",
        image: "/bottle.png",
        items: [
            {
                title: "Featured",
                href: "/collections/featured",
                description: "The latest and greatest from our shelves.",
                image: "/bottle.png",
                badge: "new",
                subcategories: [
                    { title: "New Arrivals", href: "/collections/new-arrivals" },
                    { title: "Best Sellers", href: "/collections/best-sellers" },
                    { title: "Limited Editions", href: "/collections/limited" },
                ]
            },
            {
                title: "Occasions",
                href: "/collections/occasions",
                description: "Perfect picks for moments that matter.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Gifts", href: "/collections/gifts" },
                    { title: "Corporate Gifting", href: "/collections/corporate" },
                    { title: "Dinner Party", href: "/collections/party" },
                ]
            },
            {
                title: "Curated",
                href: "/collections/curated",
                description: "Hand-picked selections by our sommeliers.",
                image: "/bottle.png",
                badge: "best-seller",
                subcategories: [
                    { title: "Staff Picks", href: "/collections/staff-picks" },
                    { title: "Rare Finds", href: "/collections/rare" },
                    { title: "Under $100", href: "/collections/value" },
                ]
            }
        ]
    },
    {
        title: "Concierge",
        href: "/concierge",
        description: "Elevated services and expert guidance.",
        image: "/bottle.png",
        items: [
            {
                title: "Services",
                href: "/bg-services",
                description: "Bespoke services for the discerning collector.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Private Client", href: "/services/private-client" },
                    { title: "Sourcing", href: "/services/sourcing" },
                    { title: "Events", href: "/services/events" },
                ]
            },
            {
                title: "Education",
                href: "/education",
                description: "Deepen your knowledge of fine spirits.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Masterclasses", href: "/education/masterclasses" },
                    { title: "Tasting Guides", href: "/education/guides" },
                    { title: "Distillery Spotlights", href: "/education/distilleries" },
                ]
            },
            {
                title: "Support",
                href: "/contact",
                description: "We are here to help.",
                image: "/bottle.png",
                subcategories: [
                    { title: "Contact Us", href: "/contact" },
                    { title: "FAQ", href: "/faq" },
                    { title: "Shipping & Returns", href: "/shipping" },
                ]
            }
        ]
    }
]

export const staticNavLinks = [
    { title: "The Journal", href: "/journal" },
    { title: "Cocktail Recipes", href: "/recipes" },
    { title: "Our Story", href: "/about" },
    { title: "Contact Us", href: "/contact" },
]

export const promotionalMessages = [
    { id: "msg1", text: "Free shipping on orders over $150", link: "/shipping" },
    { id: "msg2", text: "Join our masterclass: The Art of Whisky - Sign Up Now", link: "/events" },
]
