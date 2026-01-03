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
    featuredBrands?: { name: string; href: string; logo?: string }[]
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
                description: "From Single Malts to artisanal Gins.",
                subcategories: [
                    { title: "Whisky & Whiskey", href: "/shop/whisky" },
                    { title: "Tequila & Mezcal", href: "/shop/tequila" },
                    { title: "Cognac & Brandy", href: "/shop/cognac" },
                    { title: "Gin & Vodka", href: "/shop/gin" },
                ]
            },
            {
                title: "Wine & Champagne",
                href: "/shop/wine",
                description: "Vintage Champagne and Fine Wines.",
                subcategories: [
                    { title: "Champagne", href: "/shop/wine/sparkling" },
                    { title: "Red Wine", href: "/shop/wine/red" },
                    { title: "White Wine", href: "/shop/wine/white" },
                    { title: "Rosé", href: "/shop/wine/rose" },
                ]
            },
            {
                title: "Accessories",
                href: "/shop/accessories",
                description: "Glassware and Bar Tools.",
                subcategories: [
                    { title: "Glassware", href: "/shop/accessories/glassware" },
                    { title: "Bar Tools", href: "/shop/accessories/tools" },
                    { title: "Books", href: "/shop/accessories/books" },
                ]
            }
        ],
        featuredBrands: [
            { name: "Macallan", href: "/shop/brand/macallan" },
            { name: "Dom Pérignon", href: "/shop/brand/dom-perignon" },
            { name: "Clase Azul", href: "/shop/brand/clase-azul" },
            { name: "Penfolds", href: "/shop/brand/penfolds" },
        ]
    },
    {
        title: "Collections",
        href: "/collections",
        description: "Curated selections for every occasion and lifestyle.",
        image: "/bottle.png",
        items: [
            {
                title: "The Cellar",
                href: "/collections/the-cellar",
                description: "Investment-grade and rare allocations.",
                badge: "limited",
                subcategories: [
                    { title: "Rare Finds", href: "/collections/rare" },
                    { title: "Dead Distilleries", href: "/collections/rare/lost" },
                    { title: "Private Casks", href: "/collections/rare/casks" },
                ]
            },
            {
                title: "Gifting",
                href: "/collections/gifts",
                description: "Exceptional gifts for every occasion.",
                badge: "best-seller",
                subcategories: [
                    { title: "Corporate", href: "/collections/corporate" },
                    { title: "For Collectors", href: "/collections/gifts/luxury" },
                    { title: "Sets & Bundles", href: "/collections/gifts/sets" },
                ]
            },
            {
                title: "Occasions",
                href: "/collections/occasions",
                description: "Perfect pairings for moments that matter.",
                subcategories: [
                    { title: "Dinner Party", href: "/collections/party/dinner" },
                    { title: "Aperitivo", href: "/collections/party/aperitivo" },
                    { title: "Celebrations", href: "/collections/party/celebration" },
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
                href: "/concierge",
                description: "Bespoke services for the discerning collector.",
                subcategories: [
                    { title: "Private Client", href: "/services/private-client" },
                    { title: "Sourcing", href: "/services/sourcing" },
                    { title: "Events", href: "/services/events" },
                ]
            },
            {
                title: "The Brand",
                href: "/about",
                description: "The soul of Balisan.",
                subcategories: [
                    { title: "Our Story", href: "/about" },
                    { title: "The Journey", href: "/story" },
                    { title: "The Journal", href: "/journal" },
                ]
            },
            {
                title: "Support",
                href: "/contact",
                description: "We are here to help.",
                subcategories: [
                    { title: "Delivery & Tracking", href: "/delivery" },
                    { title: "Shipping Policy", href: "/shipping" },
                    { title: "Contact Us", href: "/contact" },
                ]
            },
            {
                title: "Education",
                href: "/education",
                description: "Deepen your knowledge of fine spirits.",
                subcategories: [
                    { title: "Cocktail Recipes", href: "/recipes" },
                    { title: "Masterclasses", href: "/education/masterclasses" },
                    { title: "Tasting Guides", href: "/education/guides" },
                ]
            }
        ]
    }
]

export const staticNavLinks = [
    { title: "The Journal", href: "/journal" },
]

export const promotionalMessages = [
    { id: "msg1", text: "Free shipping on orders over 100 JOD", link: "/shipping" },
    { id: "msg2", text: "Join our masterclass: The Art of Whisky - Sign Up Now", link: "/events" },
]
