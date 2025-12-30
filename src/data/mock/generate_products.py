#!/usr/bin/env python3
"""
Script to generate additional product categories for Balisan mock data
Output will be appended to products.ts
"""

categories = {
    'VODKA': {
        'products': [
            ('Grey Goose Vodka', 'Grey Goose', 44.99, 4.6, 'Premium French vodka made from the finest wheat and pure spring water.', 'Smooth and silky with subtle hints of almond and fresh citrus.', 40, '750ml', 'Cognac', 'France', 98, 'vodka,premium,french'),
            ('Belvedere Vodka', 'Belvedere', 39.99, 4.5, 'Luxury Polish vodka distilled from Dankowskie Gold Rye.', 'Creamy with vanilla notes and a hint of white pepper finish.', 40, '750ml', 'Mazovia', 'Poland', 87, 'vodka,premium,polish'),
            ('Tito\'s Handmade Vodka', 'Tito\'s', 26.99, 4.7, 'American craft vodka made in small batches using old-fashioned pot stills.', 'Clean, crisp with a slightly sweet finish. Naturally gluten-free.', 40, '750ml', 'Texas', 'USA', 156, 'vodka,craft,american,bestseller'),
            ('Absolut Vodka', 'Absolut', 22.99, 4.3, 'Swedish vodka made from winter wheat with a rich tradition since 1879.', 'Rich, full-bodied and complex with a hint of dried fruit.', 40, '750ml', 'Åhus', 'Sweden', 178, 'vodka,swedish,classic'),
            ('Ketel One Vodka', 'Ketel One', 32.99, 4.5, 'Dutch vodka distilled in copper pot stills for exceptional smoothness.', 'Crisp and lively with a silky-smooth mouthfeel and subtle citrus.', 40, '750ml', 'Schiedam', 'Netherlands', 92, 'vodka,dutch,premium'),
        ]
    },
    # More categories would go here
}

# Generate TypeScript output
for category, data in categories.items():
    print(f"\\nexport const {category}_PRODUCTS: Product[] = [")
    for idx, prod in enumerate(data['products'], 1):
        name, brand, price, rating, desc, tasting, abv, vol, region, country,  reviews,tags = prod
        slug = name.lower().replace("'", "").replace(" ", "-")
        cat_name = category.capitalize()
        print(f'''  {{
    id: "{category[:2].lower()}-{idx:03d}",
    name: "{name}",
    slug: "{slug}",
    brand: "{brand}",
    price: {price},
    rating: {rating},
    image: "https://images.unsplash.com/photo-1613217784112-e0e63b494636?w=600",
    images: ["https://images.unsplash.com/photo-1613217784112-e0e63b494636?w=600"],
    inStock: true,
    stockQuantity: {45 + idx * 5},
    category: "{cat_name}",
    description: "{desc}",
    tastingNotes: "{tasting}",
    abv: {abv},
    volume: "{vol}",
    region: "{region}",
    country: "{country}",
    sku: generateSKU("{cat_name}", {idx}),
    tags: [{", ".join(f'"{t}"' for t in tags.split(","))}],
    reviewCount: {reviews},
    createdAt: randomPastDate(12)
  }},''')
    print("]\\n")
