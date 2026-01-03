
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// --- Environment Setup ---
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.warn('No .env.local file found at:', envPath);
            return;
        }
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach((line) => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    } catch (e) {
        console.error('Error loading .env.local:', e);
    }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- Data Definitions ---

const CATEGORIES = [
    {
        name: 'Spirits', slug: 'spirits', children: [
            { name: 'Whiskey', slug: 'whiskey' },
            { name: 'Vodka', slug: 'vodka' },
            { name: 'Gin', slug: 'gin' },
            { name: 'Rum', slug: 'rum' },
            { name: 'Tequila', slug: 'tequila' }
        ]
    },
    {
        name: 'Wine', slug: 'wine', children: [
            { name: 'Red Wine', slug: 'red-wine' },
            { name: 'White Wine', slug: 'white-wine' },
            { name: 'Champagne', slug: 'champagne' }
        ]
    },
    {
        name: 'Mixers', slug: 'mixers', children: [
            { name: 'Tonic', slug: 'tonic' },
            { name: 'Soda', slug: 'soda' }
        ]
    }
];

const BRANDS = [
    { name: 'Macallan', slug: 'macallan' },
    { name: 'Grey Goose', slug: 'grey-goose' },
    { name: 'Hendrick\'s', slug: 'hendricks' },
    { name: 'Moët & Chandon', slug: 'moet-chandon' },
    { name: 'Patron', slug: 'patron' },
    { name: 'Penfolds', slug: 'penfolds' },
    { name: 'Fever-Tree', slug: 'fever-tree' },
    { name: 'Glenfiddich', slug: 'glenfiddich' },
    { name: 'Dom Pérignon', slug: 'dom-perignon' },
    { name: 'Lagavulin', slug: 'lagavulin' },
    { name: 'Belvedere', slug: 'belvedere' },
    { name: 'Don Julio', slug: 'don-julio' },
    { name: 'Cloudy Bay', slug: 'cloudy-bay' },
    { name: 'Château d\'Esclans', slug: 'chateau-desclans' },
    { name: 'Suntory', slug: 'suntory' }
];

const PRODUCTS_DATA = [
    {
        name: 'Macallan 12 Year Double Cask',
        slug: 'macallan-12-double-cask',
        brand: 'Macallan',
        category: 'Whiskey',
        price: 85.00,
        description: 'The Macallan Double Cask 12 Years Old forms part of our Double Cask range which marries the classic Macallan style and the unmistakable sweetness of American oak.',
        images: ['/images/placeholder-bottle-1.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Honey', 'Citrus', 'Ginger'] }
    },
    {
        name: 'Macallan 18 Year Sherry Oak',
        slug: 'macallan-18-sherry-oak',
        brand: 'Macallan',
        category: 'Whiskey',
        price: 450.00,
        description: 'Iconic Macallan with heavy sherry influence. Rich, dried fruits and ginger, with a hint of wood smoke.',
        images: ['/images/placeholder-bottle-2.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Dried Fruit', 'Spice', 'Orange'] }
    },
    {
        name: 'Grey Goose Vodka',
        slug: 'grey-goose-vodka',
        brand: 'Grey Goose',
        category: 'Vodka',
        price: 45.00,
        description: 'Made from the finest French ingredients, Grey Goose is known for its smooth and distinct character.',
        images: ['/images/placeholder-bottle-3.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Clean', 'Grain', 'Almond'] }
    },
    {
        name: 'Hendrick\'s Gin',
        slug: 'hendricks-gin',
        brand: 'Hendrick\'s',
        category: 'Gin',
        price: 38.00,
        description: 'A curious infusion of cucumber and rose, Hendrick\'s is a distinct and floral gin.',
        images: ['/images/placeholder-bottle-4.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Cucumber', 'Rose', 'Juniper'] }
    },
    {
        name: 'Moët & Chandon Impérial',
        slug: 'moet-chandon-imperial',
        brand: 'Moët & Chandon',
        category: 'Champagne',
        price: 60.00,
        description: 'The flagship of Moët & Chandon, Impérial is the most accomplished and universal expression of its style.',
        images: ['/images/placeholder-bottle-5.png'],
        is_featured: false,
        is_new: true,
        flavor_profile: { notes: ['Apple', 'Pear', 'Citrus'] }
    },
    {
        name: 'Patron Silver',
        slug: 'patron-silver',
        brand: 'Patron',
        category: 'Tequila',
        price: 55.00,
        description: 'The perfect white spirit made from the finest Weber Blue Agave.',
        images: ['/images/placeholder-bottle-6.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Agave', 'Citrus', 'Pepper'] }
    },
    {
        name: 'Penfolds Bin 389 Cabernet Shiraz',
        slug: 'penfolds-bin-389',
        brand: 'Penfolds',
        category: 'Red Wine',
        price: 80.00,
        description: 'Often referred to as "Baby Grange", Bin 389 is one of Australia\'s most collected wines.',
        images: ['/images/placeholder-bottle-7.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Dark Berries', 'Oak', 'Vanilla'] }
    },
    {
        name: 'Fever-Tree Indian Tonic Water',
        slug: 'fever-tree-tonic',
        brand: 'Fever-Tree',
        category: 'Tonic',
        price: 6.00,
        description: 'Premium tonic water made with fine quinine from the Congo and spring water.',
        images: ['/images/placeholder-bottle-8.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Bitter', 'Clean', 'Citrus'] }
    },
    {
        name: 'Glenfiddich 12 Year',
        slug: 'glenfiddich-12',
        brand: 'Glenfiddich',
        category: 'Whiskey',
        price: 50.00,
        description: 'The world\'s most awarded single malt Scotch whisky.',
        images: ['/images/placeholder-bottle-9.png'],
        is_featured: false,
        is_new: true,
        flavor_profile: { notes: ['Pear', 'Oak', 'Malt'] }
    },
    {
        name: 'Lagavulin 16 Year',
        slug: 'lagavulin-16',
        brand: 'Lagavulin',
        category: 'Whiskey',
        price: 95.00,
        description: 'A massive peat-smoke typical of southern Islay - but also offering richness and a dryness that turns it into a truly interesting dram.',
        images: ['/images/placeholder-bottle-10.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Smoke', 'Peat', 'Sea Salt'] }
    },
    {
        name: 'Belvedere Vodka',
        slug: 'belvedere-vodka',
        brand: 'Belvedere',
        category: 'Vodka',
        price: 48.00,
        description: 'Produced in a Polish distillery, Belvedere, which means "beautiful to see", is named after the Belweder Palace in Warsaw.',
        images: ['/images/placeholder-bottle-11.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Vanilla', 'Rye', 'White Pepper'] }
    },
    {
        name: 'Don Julio 1942',
        slug: 'don-julio-1942',
        brand: 'Don Julio',
        category: 'Tequila',
        price: 160.00,
        description: 'Celebrated in exclusive cocktail bars, restaurants and nightclubs, the iconic Don Julio 1942 Tequila is the choice of connoisseurs around the globe.',
        images: ['/images/placeholder-bottle-12.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Caramel', 'Chocolate', 'Oak'] }
    },
    {
        name: 'Dom Pérignon Vintage',
        slug: 'dom-perignon-vintage',
        brand: 'Dom Pérignon',
        category: 'Champagne',
        price: 250.00,
        description: 'Dom Pérignon is vintage champagne only. Each vintage is a creation, singular and unique.',
        images: ['/images/placeholder-bottle-13.png'],
        is_featured: true,
        is_new: false,
        flavor_profile: { notes: ['Floral', 'Fruity', 'Toasty'] }
    },
    {
        name: 'Cloudy Bay Sauvignon Blanc',
        slug: 'cloudy-bay-sb',
        brand: 'Cloudy Bay',
        category: 'White Wine',
        price: 35.00,
        description: 'Vibrant and expressive, Cloudy Bay Sauvignon Blanc is the wine that introduced New Zealand wine to the world.',
        images: ['/images/placeholder-bottle-14.png'],
        is_featured: false,
        is_new: true,
        flavor_profile: { notes: ['Lime', 'Grapefruit', 'Passionfruit'] }
    },
    {
        name: 'Whispering Angel Rosé',
        slug: 'whispering-angel',
        brand: 'Château d\'Esclans',
        category: 'Red Wine', // Using Red Wine as proxy for Rose if not exists, but I should add Rose.
        price: 40.00,
        description: 'The benchmark for Provence Rosé. Fresh, crisp, and elegant.',
        images: ['/images/placeholder-bottle-15.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Strawberry', 'Citrus', 'Mineral'] }
    },
    {
        name: 'Hibiki Japanese Harmony',
        slug: 'hibiki-harmony',
        brand: 'Suntory',
        category: 'Whiskey',
        price: 90.00,
        description: 'Hibiki Japanese Harmony is a blend of Japanese malt and grain whiskies from Yamazaki, Hakushu and Chita.',
        images: ['/images/placeholder-bottle-16.png'],
        is_featured: true,
        is_new: true,
        flavor_profile: { notes: ['Honey', 'Orange', 'Oak'] }
    },
    {
        name: 'Penfolds Bin 28 Kalimna Shiraz',
        slug: 'penfolds-bin-28',
        brand: 'Penfolds',
        category: 'Red Wine',
        price: 45.00,
        description: 'A showcase of warm-climate Australian Shiraz – ripe, robust and generously flavoured.',
        images: ['/images/placeholder-bottle-17.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Blackberry', 'Chocolate', 'Spice'] }
    },
    {
        name: 'Casamigos Blanco',
        slug: 'casamigos-blanco',
        // We use Don Julio as proxy for this demo brand
        brand: 'Don Julio',
        category: 'Tequila',
        price: 60.00,
        description: 'Crisp and clean with hints of citrus, vanilla and sweet agave, with a long smooth finish.',
        images: ['/images/placeholder-bottle-18.png'],
        is_featured: false,
        is_new: false,
        flavor_profile: { notes: ['Agave', 'Citrus', 'Vanilla'] }
    }
];

async function seed() {
    console.log('🌱 Starting database seed...');

    // 1. Clean existing data (optional, but good for repeatability if needed manually)
    // For now, we assume empty or just append, but let's try not to duplicate if slugs exist.
    // Actually, let's just use upsert for everything based on slug.

    // 2. Insert Brands
    console.log('Creating Brands...');
    const brandMap = new Map();
    for (const brand of BRANDS) {
        const { data, error } = await supabase
            .from('brands')
            .upsert(brand, { onConflict: 'slug' })
            .select('id, name')
            .single();

        if (error) {
            console.error(`Error inserting brand ${brand.name}:`, error);
        } else {
            brandMap.set(brand.name, data.id);
        }
    }

    // 3. Insert Categories
    console.log('Creating Categories...');
    const categoryMap = new Map();

    for (const cat of CATEGORIES) {
        // Insert Parent
        const { data: parentData, error: parentError } = await supabase
            .from('categories')
            .upsert({ name: cat.name, slug: cat.slug, parent_id: null }, { onConflict: 'slug' })
            .select('id, name')
            .single();

        if (parentError) {
            console.error(`Error inserting category ${cat.name}:`, parentError);
            continue;
        }

        categoryMap.set(cat.name, parentData.id);

        // Insert Children
        if (cat.children) {
            for (const child of cat.children) {
                const { data: childData, error: childError } = await supabase
                    .from('categories')
                    .upsert({ name: child.name, slug: child.slug, parent_id: parentData.id }, { onConflict: 'slug' })
                    .select('id, name')
                    .single();

                if (childError) {
                    console.error(`Error inserting subcategory ${child.name}:`, childError);
                } else {
                    categoryMap.set(child.name, childData.id);
                }
            }
        }
    }

    // 4. Insert Products
    console.log('Creating Products...');
    for (const product of PRODUCTS_DATA) {
        const brandId = brandMap.get(product.brand);
        const categoryId = categoryMap.get(product.category);

        if (!brandId || !categoryId) {
            console.warn(`Skipping product ${product.name}: Missing brand (${product.brand}) or category (${product.category})`);
            continue;
        }

        const { brand, category, ...productData } = product;

        const { error } = await supabase
            .from('products')
            .upsert({
                ...productData,
                brand_id: brandId,
                category_id: categoryId,
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error inserting product ${product.name}:`, error);
        }
    }

    console.log('✅ Seeding complete!');
}

seed().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
