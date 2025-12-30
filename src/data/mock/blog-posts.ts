import { BlogPost } from "@/types"

const randomPastDate = (monthsAgo: number): string => {
    const now = new Date('2025-12-30')
    const past = new Date(now)
    past.setMonth(past.getMonth() - Math.floor(Math.random() * monthsAgo))
    return past.toISOString()
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "blog-001",
        title: "The Ultimate Guide to Whiskey Tasting",
        slug: "ultimate-guide-whiskey-tasting",
        author: {
            name: "Alexander Morrison",
            avatar: "https://i.pravatar.cc/150?img=12"
        },
        excerpt: "Learn the art of whiskey tasting from nosing techniques to identifying flavor profiles.",
        content: `# The Ultimate Guide to Whiskey Tasting

Whiskey tasting is an art form that combines sensory perception with knowledge of production methods and regional characteristics.

## Getting Started

Before you begin, ensure you have:
- **Proper glassware** - A tulip-shaped glass or Glen Cairn
- **Clean palate** - Avoid strong flavors beforehand
- **Water** - For dilution and palate cleansing

## The Five S's of Tasting

### 1. See
Observe the color - from pale gold to deep amber. Color can indicate age and cask type.

### 2. Swirl
Gently swirl to release aromas and observe the "legs" on the glass.

### 3. Sniff
Take short sniffs with your mouth slightly open. Identify notes like vanilla, oak, fruit, or smoke.

### 4. Sip
Take a small sip and let it coat your palate. Notice the initial flavors and mouthfeel.

### 5. Savor
Swallow (or spit if tasting multiple) and notice the finish - how long flavors linger.

## Common Flavor Profiles

- **Fruity**: Apple, pear, citrus
- **Sweet**: Vanilla, caramel, honey
- **Spicy**: Cinnamon, pepper, clove
- **Woody**: Oak, cedar, smoke

## Pro Tips

1. Add a few drops of water to open up flavors
2. Taste in order from lightest to heaviest
3. Take notes to remember your favorites
4. Trust your palate - there are no wrong answers

Happy tasting!`,
        category: "Tasting Guides",
        tags: ["whiskey", "tasting", "guide", "beginners"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(3),
        readTime: 8
    },
    {
        id: "blog-002",
        title: "Top 10 Classic Cocktails Every Home Bartender Should Master",
        slug: "classic-cocktails-home-bartender",
        author: {
            name: "Sofia Martinez",
            avatar: "https://i.pravatar.cc/150?img=27"
        },
        excerpt: "From Old Fashioneds to Martinis, learn the essential cocktails that form the foundation of mixology.",
        content: `# Top 10 Classic Cocktails Every Home Bartender Should Master

Master these timeless cocktails and you'll be ready to impress at any gathering.

## 1. Old Fashioned
The quintessential whiskey cocktail dating back to the 1800s.

## 2. Martini
Gin (or vodka), dry vermouth, and an olive or lemon twist.

## 3. Manhattan
Whiskey, sweet vermouth, and bitters - New York sophistication in a glass.

## 4. Margarita
Tequila, lime juice, and orange liqueur - the perfect balance.

## 5. Negroni
Equal parts gin, Campari, and sweet vermouth - bold and bitter.

## 6. Mojito
White rum, mint, lime, sugar, and soda - refreshingly Cuban.

## 7. Daiquiri
White rum, lime juice, and simple syrup - simplicity perfected.

## 8. Whiskey Sour
Bourbon, lemon juice, simple syrup - classic American cocktail.

## 9. Espresso Martini
Vodka, coffee liqueur, and fresh espresso - modern classic.

## 10. Moscow Mule
Vodka, ginger beer, and lime in a copper mug.

## Essential Bar Tools

- Cocktail shaker
- Jigger for measuring
- Bar spoon
- Strainer
- Muddler

Practice makes perfect - start with one cocktail and master it before moving to the next!`,
        category: "Cocktail Recipes",
        tags: ["cocktails", "mixology", "recipes", "classics"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(2),
        readTime: 6
    },
    {
        id: "blog-003",
        title: "Wine Pairing 101: Matching Food and Wine Like a Pro",
        slug: "wine-pairing-guide",
        author: {
            name: "Charlotte Beaumont",
            avatar: "https://i.pravatar.cc/150?img=45"
        },
        excerpt: "Discover the principles of food and wine pairing to elevate your dining experience.",
        content: `# Wine Pairing 101: Matching Food and Wine Like a Pro

The right wine can transform a meal from good to extraordinary.

## Basic Principles

### Match Weight with Weight
Light wines with lighter dishes, full-bodied wines with heavier meals.

### Consider Acidity
High-acid wines pair well with fatty or rich foods.

### Think About Sweetness
Wine should be sweeter than the food, or it will taste bitter.

### Complement or Contrast
Either match similar flavors or create interesting contrasts.

## Classic Pairings

- **Oysters** → Champagne or Chablis
- **Steak** → Cabernet Sauvignon or Malbec
- **Salmon** → Pinot Noir or Chardonnay
- **Pasta with Red Sauce** → Chianti or Sangiovese
- **Cheese** → Port or Sauternes
- **Spicy Food** → Off-dry Riesling or Gewürztraminer

## Regional Pairing Philosophy

"What grows together, goes together" - match wines with cuisine from the same region.

Experiment and discover what you enjoy!`,
        category: "Tasting Guides",
        tags: ["wine", "pairing", "food", "guide"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(4),
        readTime: 7
    },
    {
        id: "blog-004",
        title: "The Rise of Craft Spirits: Small Batch Revolution",
        slug: "craft-spirits-revolution",
        author: {
            name: "Jackson Reynolds",
            avatar: "https://i.pravatar.cc/150?img=33"
        },
        excerpt: "How small distilleries are changing the spirits industry with innovation and quality.",
        content: `# The Rise of Craft Spirits: Small Batch Revolution

The craft spirits movement has transformed the industry over the past two decades.

## What Makes It Craft?

Craft distilleries typically:
- Produce fewer than 100,000 cases annually
- Maintain hands-on production methods
- Use local or unique ingredients
- Emphasize quality over quantity

## Notable Trends

### Terroir-Driven Spirits
Distillers highlighting local grains and regional character.

### Experimental Aging
Using unconventional casks like wine, rum, or sherry barrels.

### Sustainable Practices
Farm-to-bottle operations and eco-conscious production.

## Why It Matters

Craft spirits offer:
- **Innovation** - Unique flavor profiles
- **Transparency** - Know exactly what you're drinking
- **Community** - Support local businesses
- **Quality** - Attention to detail

The craft spirits movement isn't just a trend - it's a return to the artisanal roots of distilling.`,
        category: "Industry News",
        tags: ["craft", "small-batch", "industry", "trends"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(1),
        readTime: 5
    },
    {
        id: "blog-005",
        title: "Tequila Beyond Margaritas: Discovering Premium Agave Spirits",
        slug: "premium-tequila-guide",
        author: {
            name: "Diego Hernandez",
            avatar: "https://i.pravatar.cc/150?img=51"
        },
        excerpt: "Explore the world of añejo and extra añejo tequilas that deserve to be sipped, not shot.",
        content: `# Tequila Beyond Margaritas: Discovering Premium Agave Spirits

Premium tequila rivals the finest whiskeys and cognacs in complexity and elegance.

## Understanding Tequila Classifications

### Blanco (Silver)
Unaged or aged less than 2 months. Pure agave flavor.

### Reposado
Aged 2-12 months. Balanced agave and oak.

### Añejo
Aged 1-3 years. Rich, complex, sippable.

### Extra Añejo
Aged 3+ years. Ultra-premium, whiskey-like.

## What Makes Premium Tequila

- 100% Blue Weber Agave
- Traditional production methods
- Highland vs Lowland terroir
- Aging in quality barrels

## How to Taste

1. Serve at room temperature in a snifter
2. Observe color and viscosity
3. Note aromas - cooked agave, vanilla, oak
4. Sip slowly, let it coat your palate
5. Notice the finish

## Recommended Bottles

- **Blanco**: Herradura, Fortaleza
- **Reposado**: Casamigos, Ocho
- **Añejo**: Don Julio 1942, Clase Azul

Tequila is meant to be savored, not slammed!`,
        category: "Brand Stories",
        tags: ["tequila", "agave", "premium", "guide"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(5),
        readTime: 6
    },
    {
        id: "blog-006",
        title: "Holiday Cocktails: Festive Drinks for Every Celebration",
        slug: "holiday-cocktails-guide",
        author: {
            name: "Emma Thompson",
            avatar: "https://i.pravatar.cc/150?img=23"
        },
        excerpt: "Seasonal cocktail recipes perfect for winter celebrations and holiday gatherings.",
        content: `# Holiday Cocktails: Festive Drinks for Every Celebration

Elevate your holiday parties with these seasonal cocktails.

## Winter Warmers

### Hot Toddy
Whiskey, honey, lemon, and hot water - perfect for cold nights.

### Irish Coffee
Coffee, Irish whiskey, sugar, topped with cream.

### Mulled Wine
Red wine simmered with spices and citrus.

## Festive Classics

### Eggnog
Creamy, rich, spiked with bourbon or rum.

### Champagne Cocktail
Sugar cube, bitters, topped with bubbly.

### Cranberry Moscow Mule
Seasonal twist on the classic.

## Tips for Hosting

- Batch cocktails ahead of time
- Offer both alcoholic and mocktail versions
- Garnish with festive elements
- Keep ingredients fresh and cold

Make your holidays memorable with these crowd-pleasers!`,
        category: "Seasonal Picks",
        tags: ["cocktails", "holiday", "winter", "entertaining"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(2),
        readTime: 5
    },
    {
        id: "blog-007",
        title: "The Art of Japanese Whisky: Tradition Meets Innovation",
        slug: "japanese-whisky-guide",
        author: {
            name: "Yuki Tanaka",
            avatar: "https://i.pravatar.cc/150?img=61"
        },
        excerpt: "Discover how Japanese distillers have mastered Scotch techniques while creating their own unique style.",
        content: `# The Art of Japanese Whisky: Tradition Meets Innovation

Japanese whisky has taken the world by storm, winning numerous international awards.

## History

- Started in the 1920s with Yamazaki
- Learned from Scottish methods
- Developed unique Japanese character

## Distinctive Characteristics

- Precision and attention to detail
- Use of Mizunara oak
- Softer, more delicate profiles
- Limited production runs

## Key Distilleries

### Yamazaki
Japan's first and oldest distillery

### Hakushu
Known for fresh, green flavors

### Yoichi
Peated, powerful expressions

### Chichibu
Young craft distillery making waves

## Why So Expensive?

- Limited production
- High demand
- Quality ingredients
- Meticulous craftsmanship

Japanese whisky represents the perfect marriage of tradition and innovation.`,
        category: "Brand Stories",
        tags: ["whiskey", "japanese", "yamazaki", "premium"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(6),
        readTime: 7
    },
    {
        id: "blog-008",
        title: "Gin Renaissance: From Juniper to Botanical Explosion",
        slug: "gin-renaissance-guide",
        author: {
            name: "Oliver Stevens",
            avatar: "https://i.pravatar.cc/150?img=14"
        },
        excerpt: "How gin went from grandma's drink to the trendiest spirit in craft cocktails.",
        content: `# Gin Renaissance: From Juniper to Botanical Explosion

Gin has experienced an incredible resurgence, becoming one of the most innovative spirit categories.

## Gin Styles

### London Dry
Traditional, juniper-forward classic.

### Plymouth
Slightly sweeter, earthy notes.

### Old Tom
Sweetened gin, historical style.

### Contemporary/New Western
Botanicals take center stage over juniper.

## The Craft Gin Boom

Modern distillers are experimenting with:
- Local botanicals
- Unique production methods
- Regional characteristics
- Unconventional ingredients

## Perfect Serve

- Quality tonic water (1:3 ratio)
- Large glass with ice
- Appropriate garnish for gin's botanicals
- Lemon, lime, cucumber, or herbs

## Beyond G&T

Try gin in:
- Negroni
- Martini
- Aviation
- Gin Fizz

The gin renaissance has given us endless flavor possibilities!`,
        category: "Industry News",
        tags: ["gin", "craft", "botanicals", "trends"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(4),
        readTime: 6
    },
    {
        id: "blog-009",
        title: "Building Your Home Bar: Essential Bottles and Tools",
        slug: "home-bar-essentials",
        author: {
            name: "Marcus Chen",
            avatar: "https://i.pravatar.cc/150?img=68"
        },
        excerpt: "A complete guide to stocking your home bar with the right spirits, tools, and ingredients.",
        content: `# Building Your Home Bar: Essential Bottles and Tools

Create a versatile home bar that can handle any cocktail request.

## The Core Six

1. **Vodka** - Versatile, neutral base
2. **Gin** - For martinis and G&Ts
3. **Rum** (White & Dark) - Tropical and classic cocktails
4. **Tequila/Mezcal** - Mexican cocktails
5. **Whiskey** (Bourbon & Rye) - American classics
6. **Scotch** - For whisky lovers

## Liqueurs & Modifiers

- Orange liqueur (Cointreau/Triple Sec)
- Dry & Sweet Vermouth
- Campari
- Coffee liqueur

## Fresh Ingredients

- Lemons & Limes
- Simple syrup
- Angostura bitters
- Fresh herbs

## Essential Tools

- Shaker
- Jigger
- Bar spoon
- Strainer
- Muddler
- Citrus juicer

## Glassware

- Rocks glasses
- Highball glasses
- Coupe or martini glasses
- Wine glasses

Start with the basics and expand as you explore!`,
        category: "Guides",
        tags: ["home-bar", "essentials", "tools", "beginner"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(3),
        readTime: 8
    },
    {
        id: "blog-010",
        title: "Understanding ABV, Proof, and Alcohol Strength",
        slug: "understanding-alcohol-strength",
        author: {
            name: "Dr. Rachel Moore",
            avatar: "https://i.pravatar.cc/150?img=29"
        },
        excerpt: "Demystifying the numbers on your bottle and what they mean for flavor and potency.",
        content: `# Understanding ABV, Proof, and Alcohol Strength

Those numbers on your bottle tell an important story.

## ABV (Alcohol By Volume)

Percentage of alcohol in the total volume.
- Beer: 4-7%
- Wine: 12-15%
- Spirits: 40-50%+

## Proof

In the US, proof is simply ABV × 2
- 40% ABV = 80 Proof
- 50% ABV = 100 Proof

## Why It Matters

### Flavor Impact
Higher ABV can:
- Carry more flavor
- Feel "hotter" on the palate
- Require dilution for optimal tasting

### Cocktail Balance
Knowing ABV helps:
- Calculate cocktail strength
- Balance ingredients properly
- Adjust recipes

## Cask Strength vs Standard

**Standard** (40-46% ABV)
- Diluted to consistent strength
- Smooth, approachable

**Cask Strength** (50-65% ABV)
- Undiluted from barrel
- More intense, add water to taste

Understanding alcohol strength helps you drink smarter and enjoy better!`,
        category: "Education",
        tags: ["education", "abv", "proof", "basics"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(7),
        readTime: 5
    },
    {
        id: "blog-011",
        title: "Rum's Caribbean Journey: Island by Island Guide",
        slug: "caribbean-rum-guide",
        author: {
            name: "Isabella Rodriguez",
            avatar: "https://i.pravatar.cc/150?img=40"
        },
        excerpt: "Explore the distinctive rum styles from different Caribbean islands and their unique characteristics.",
        content: `# Rum's Caribbean Journey: Island by Island Guide

Each Caribbean island produces rum with its own character influenced by tradition and terroir.

## Jamaica
**Style**: Full-bodied, funky
**Characteristics**: High esters, tropical fruit
**Notable**: Appleton Estate, Wray & Nephew

## Barbados
**Style**: Balanced, elegant
**Characteristics**: Smooth, refined
**Notable**: Mount Gay, Foursquare

## Cuba
**Style**: Light, mixable
**Characteristics**: Column-distilled, clean
**Notable**: Havana Club

## Martinique
**Style**: Rhum Agricole (from fresh cane juice)
**Characteristics**: Grassy, complex
**Notable**: Rhum Clément, Neisson

## Trinidad
**Style**: Medium-bodied
**Characteristics**: Versatile
**Notable**: Angostura

Each island tells a different rum story!`,
        category: "Brand Stories",
        tags: ["rum", "caribbean", "regional", "guide"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(5),
        readTime: 6
    },
    {
        id: "blog-012",
        title: "Sustainable Spirits: Eco-Conscious Drinking",
        slug: "sustainable-spirits-guide",
        author: {
            name: "Dr. Emily Green",
            avatar: "https://i.pravatar.cc/150?img=47"
        },
        excerpt: "How distilleries are embracing sustainability and what you can do to drink more responsibly.",
        content: `# Sustainable Spirits: Eco-Conscious Drinking

The spirits industry is increasingly focused on environmental sustainability.

## Sustainable Practices

### Organic & Biodynamic
- No synthetic pesticides
- Soil health focus
-Natural farming

### Water Conservation
- Water recycling systems
- Efficient production
- Watershed protection

### Energy Efficiency
- Renewable energy sources
- Heat recovery systems
- Carbon-neutral operations

### Waste Reduction
- Spent grain recycling
- Byproduct utilization
- Minimal packaging

## Brands Leading the Way

- **Bruichladdich** - Organic barley, renewable energy
- **Waterford** - Transparent, terroir-focused
- **St. George Spirits** - Solar-powered distillery

## What You Can Do

- Choose organic/sustainable brands
- Support local distilleries
- Recycle bottles properly
- Buy in appropriate quantities

Sustainability matters in every glass!`,
        category: "Industry News",
        tags: ["sustainable", "eco-friendly", "organic", "environment"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(2),
        readTime: 7
    },
    {
        id: "blog-013",
        title: "Mezcal 101: Tequila's Smoky Cousin Explained",
        slug: "mezcal-beginners-guide",
        author: {
            name: "Carlos Mendoza",
            avatar: "https://i.pravatar.cc/150?img=56"
        },
        excerpt: "Discover the artisanal world of mezcal, from traditional production to modern expressions.",
        content: `# Mezcal 101: Tequila's Smoky Cousin Explained

Mezcal is to tequila what Scotch is to whisky - a regional specialty with depth and character.

## What is Mezcal?

Agave-based spirit from specific Mexican regions, primarily Oaxaca.

## Key Differences from Tequila

- **Agave Type**: Any variety (vs Blue Weber only)
- **Production**: Traditional pit ovens
- **Flavor**: Smoky, complex
- **Regions**: Oaxaca and 8 other states

## Production Process

1. **Harvest**: Mature agave (7-30 years)
2. **Roast**: Underground pit with hot rocks
3. **Crush**: Traditional tahona or modern mill
4. **Ferment**: Open-air, wild yeast
5. **Distill**: Copper pot stills

## Tasting Notes

- Smoke from roasting
- Earth and minerals
- Fruit and floral notes
- Herbal complexity

## How to Drink

- **Neat** - Sip slowly at room temperature
- **With Orange & Sal de Gusano** - Traditional pairing
- **In Cocktails** - Adds smoky depth

Mezcal is an experience, not just a drink!`,
        category: "Education",
        tags: ["mezcal", "agave", "mexican", "artisan"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(4),
        readTime: 6
    },
    {
        id: "blog-014",
        title: "Cognac vs Armagnac: French Brandy Royalty",
        slug: "cognac-armagnac-comparison",
        author: {
            name: "Pierre Dubois",
            avatar: "https://i.pravatar.cc/150?img=15"
        },
        excerpt: "Understanding the differences between France's two great brandy regions.",
        content: `# Cognac vs Armagnac: French Brandy Royalty

Both are French grape brandies, but each has unique characteristics.

## Cognac

**Region**: Charente
**Grapes**: Ugni Blanc primarily
**Distillation**: Double-distilled in copper pot stills
**Aging**: Limousin or Tronçais oak
**Character**: Elegant, refined, floral

### Quality Levels
- VS: 2+ years
- VSOP: 4+ years
- XO: 10+ years

## Armagnac

**Region**: Gascony
**Grapes**: Multiple varieties
**Distillation**: Single continuous distillation
**Aging**: Black Gascony oak
**Character**: Robust, rustic, complex

## Key Differences

**Cognac**: Polished luxury
**Armagnac**: Artisanal character

Both deserve a place in any serious collection!`,
        category: "Education",
        tags: ["cognac", "armagnac", "brandy", "french"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(8),
        readTime: 5
    },
    {
        id: "blog-015",
        title: "Celebrity Spirits: Marketing Hype or Quality Products?",
        slug: "celebrity-spirits-review",
        author: {
            name: "Taylor Brooks",
            avatar: "https://i.pravatar.cc/150?img=32"
        },
        excerpt: "An honest look at celebrity-backed spirits brands and which ones actually deliver on quality.",
        content: `# Celebrity Spirits: Marketing Hype or Quality Products?

Celebrity-owned spirits are everywhere, but do they live up to the buzz?

## The Good

### Casamigos Tequila (George Clooney)
**Verdict**: Genuinely good tequila that holds its own

### Aviation Gin (Ryan Reynolds)
**Verdict**: Well-made contemporary gin

### Proper No. Twelve (Conor McGregor)
**Verdict**: Decent Irish whiskey for the price

## The Overhyped

Some brands lean heavily on celebrity association without matching quality to price point.

## What Matters

- **Liquid Quality** - Does it taste good?
- **Value** - Fair price for what you get?
- **Transparency** - Honest about production?
- **Innovation** - Bringing something new?

## The Bottom Line

Judge spirits by what's in the bottle, not who's on the label. Some celebrity brands are excellent, others are pure marketing.

Try before you buy, and don't let fame inflate value!`,
        category: "Industry News",
        tags: ["celebrity", "brands", "review", "industry"],
        featuredImage: "/bottle.png",
        publishedAt: randomPastDate(1),
        readTime: 5
    }
]

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return BLOG_POSTS.find(post => post.slug === slug)
}

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
    return BLOG_POSTS.filter(post => post.category === category)
}

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
    return BLOG_POSTS.filter(post => post.tags.includes(tag))
}
