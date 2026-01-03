import { Category } from '@/types'

export const CATEGORIES: Category[] = [
    {
        id: 'cat-whiskey',
        name: 'Whiskey',
        slug: 'whiskey',
        description: 'Rare and premium whiskies from around the world.',
        image_url: 'https://images.unsplash.com/photo-1527281405613-39bc5b4507bd?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-vodka',
        name: 'Vodka',
        slug: 'vodka',
        description: 'Crystal clear and smooth premium vodkas.',
        image_url: 'https://images.unsplash.com/photo-1614313511387-1436a4480631?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-gin',
        name: 'Gin',
        slug: 'gin',
        description: 'Botanical bliss and artisanal spirits.',
        image_url: 'https://images.unsplash.com/photo-1556858210-9c2219460011?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-tequila',
        name: 'Tequila',
        slug: 'tequila',
        description: 'The spirit of Mexico, from Blanco to Extra Añejo.',
        image_url: 'https://images.unsplash.com/photo-1516535750140-1b20d7da38df?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-rum',
        name: 'Rum',
        slug: 'rum',
        description: 'Caribbean soul and spiced treasures.',
        image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-wine',
        name: 'Wine',
        slug: 'wine',
        description: 'Exquisite vineyards from old world to new.',
        image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-beer',
        name: 'Beer',
        slug: 'beer',
        description: 'Craft brews and international favorites.',
        image_url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    },
    {
        id: 'cat-liqueur',
        name: 'Liqueur',
        slug: 'liqueur',
        description: 'Sweet finishes and cocktail essential.',
        image_url: 'https://images.unsplash.com/photo-1514361895311-6655c6ce0964?q=80&w=800&auto=format&fit=crop',
        level: 0,
        parent_id: null,
        created_at: new Date().toISOString()
    }
]

export const getMockCategories = () => CATEGORIES
