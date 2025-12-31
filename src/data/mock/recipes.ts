import { Recipe, RecipeIngredient } from "@/types"

export const RECIPES: Recipe[] = [
    {
        id: "recipe-001",
        title: "Classic Old Fashioned",
        slug: "classic-old-fashioned",
        description: "The quintessential whiskey cocktail - simple, sophisticated, and timeless.",
        ingredients: [
            { name: "Bourbon or Rye Whiskey", amount: "2 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Sugar cube", amount: "1" },
            { name: "Angostura bitters", amount: "2-3 dashes" },
            { name: "Orange peel", amount: "1" },
            { name: "Large ice cube", amount: "1" }
        ],
        instructions: [
            "Place sugar cube in an Old Fashioned glass",
            "Saturate with bitters and add a few drops of water",
            "Muddle until dissolved",
            "Add whiskey and ice cube",
            "Stir gently for 30 seconds",
            "Express orange peel over glass and drop in as garnish"
        ],
        difficulty: "easy",
        prepTime: 5,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["whiskey", "classic", "stirred"],
        glassware: "Rocks glass",
        garnish: "Orange peel"
    },
    {
        id: "recipe-002",
        title: "Perfect Margarita",
        slug: "perfect-margarita",
        description: "The ideal balance of tequila, lime, and orange liqueur - refreshing and perfectly tangy.",
        ingredients: [
            { name: "Tequila Blanco", amount: "2 oz", productId: "teq-001", productName: "Don Julio 1942" },
            { name: "Fresh lime juice", amount: "1 oz" },
            { name: "Orange liqueur", amount: "1 oz", productId: "liq-001", productName: "Grand Marnier Cordon Rouge" },
            { name: "Agave syrup", amount: "0.5 oz" },
            { name: "Salt for rim", amount: "optional" },
            { name: "Lime wheel", amount: "1" }
        ],
        instructions: [
            "Rim glass with salt (optional) and set aside",
            "Add tequila, lime juice, orange liqueur, and agave to shaker",
            "Fill with ice and shake vigorously for 10-15 seconds",
            "Strain into prepared rocks glass over fresh ice",
            "Garnish with lime wheel"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["tequila", "citrus", "shaken"],
        glassware: "Rocks glass",
        garnish: "Lime wheel, salt rim"
    },
    {
        id: "recipe-003",
        title: "Negroni",
        slug: "negroni",
        description: "Bittersweet Italian aperitif cocktail - equal parts gin, Campari, and sweet vermouth.",
        ingredients: [
            { name: "Gin", amount: "1 oz", productId: "gin-001", productName: "Hendrick's Gin" },
            { name: "Campari", amount: "1 oz" },
            { name: "Sweet vermouth", amount: "1 oz" },
            { name: "Orange slice", amount: "1" }
        ],
        instructions: [
            "Fill rocks glass with ice",
            "Add gin, Campari, and vermouth",
            "Stir gently for 20-30 seconds",
            "Garnish with orange slice"
        ],
        difficulty: "easy",
        prepTime: 2,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["gin", "bitter", "aperitif"],
        glassware: "Rocks glass",
        garnish: "Orange slice"
    },
    {
        id: "recipe-004",
        title: "Espresso Martini",
        slug: "espresso-martini",
        description: "Modern classic combining vodka, coffee liqueur, and fresh espresso for the perfect pick-me-up.",
        ingredients: [
            { name: "Vodka", amount: "2 oz", productId: "vo-001", productName: "Grey Goose Vodka" },
            { name: "Coffee liqueur", amount: "0.5 oz", productName: "Kahlúa" },
            { name: "Fresh espresso", amount: "1 oz" },
            { name: "Simple syrup", amount: "0.25 oz" },
            { name: "Coffee beans", amount: "3" }
        ],
        instructions: [
            "Brew fresh espresso and let cool slightly",
            "Add vodka, coffee liqueur, espresso, and syrup to shaker",
            "Fill with ice and shake hard for 15 seconds",
            "Double strain into chilled coupe glass",
            "Garnish with 3 coffee beans"
        ],
        difficulty: "medium",
        prepTime: 5,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["vodka", "coffee", "shaken"],
        glassware: "Coupe",
        garnish: "Coffee beans"
    },
    {
        id: "recipe-005",
        title: "Mojito",
        slug: "mojito",
        description: "Refreshing Cuban cocktail with rum, mint, lime, and a splash of soda.",
        ingredients: [
            { name: "White rum", amount: "2 oz", productId: "rum-001", productName: "Ron Zacapa 23" },
            { name: "Fresh lime juice", amount: "0.75 oz" },
            { name: "Simple syrup", amount: "0.5 oz" },
            { name: "Fresh mint leaves", amount: "8-10" },
            { name: "Soda water", amount: "top" },
            { name: "Mint sprig", amount: "1" },
            { name: "Lime wheel", amount: "1" }
        ],
        instructions: [
            "Add mint leaves and simple syrup to glass",
            "Gently muddle to release oils (don't shred leaves)",
            "Add rum and lime juice",
            "Fill glass with crushed ice",
            "Top with soda water and stir gently",
            "Garnish with mint sprig and lime wheel"
        ],
        difficulty: "easy",
        prepTime: 4,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["rum", "mint", "refreshing"],
        glassware: "Highball",
        garnish: "Mint sprig, lime wheel"
    },
    {
        id: "recipe-006",
        title: "Manhattan",
        slug: "manhattan",
        description: "Classic whiskey cocktail with sweet vermouth and bitters - sophisticated and stirred.",
        ingredients: [
            { name: "Rye whiskey", amount: "2 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Sweet vermouth", amount: "1 oz" },
            { name: "Angostura bitters", amount: "2 dashes" },
            { name: "Maraschino cherry", amount: "1" }
        ],
        instructions: [
            "Fill mixing glass with ice",
            "Add whiskey, vermouth, and bitters",
            "Stir for 30 seconds until well-chilled",
            "Strain into chilled coupe glass",
            "Garnish with cherry"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["whiskey", "classic", "stirred"],
        glassware: "Coupe",
        garnish: "Maraschino cherry"
    },
    {
        id: "recipe-007",
        title: "Gin & Tonic",
        slug: "gin-and-tonic",
        description: "The perfect G&T with the right ratios, premium ingredients, and proper garnish.",
        ingredients: [
            { name: "Gin", amount: "2 oz", productId: "gin-001", productName: "Hendrick's Gin" },
            { name: "Premium tonic water", amount: "4 oz" },
            { name: "Lime wedge", amount: "1" },
            { name: "Juniper berries", amount: "3 (optional)" }
        ],
        instructions: [
            "Fill highball glass with ice",
            "Pour gin over ice",
            "Top with chilled tonic water",
            "Stir gently once",
            "Squeeze lime wedge and drop in",
            "Optional: add juniper berries for garnish"
        ],
        difficulty: "easy",
        prepTime: 2,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["gin", "simple", "highball"],
        glassware: "Highball",
        garnish: "Lime wedge"
    },
    {
        id: "recipe-008",
        title: "Whiskey Sour",
        slug: "whiskey-sour",
        description: "Perfect balance of bourbon, lemon, and sweetness with a frothy egg white foam.",
        ingredients: [
            { name: "Bourbon", amount: "2 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Fresh lemon juice", amount: "0.75 oz" },
            { name: "Simple syrup", amount: "0.75 oz" },
            { name: "Egg white", amount: "1" },
            { name: "Angostura bitters", amount: "2 dashes" },
            { name: "Cherry and orange slice", amount: "1 each" }
        ],
        instructions: [
            "Add bourbon, lemon juice, syrup, and egg white to shaker",
            "Dry shake (without ice) for 10 seconds",
            "Add ice and shake again for 15 seconds",
            "Strain into rocks glass with fresh ice",
            "Garnish with cherry, orange, and bitters on foam"
        ],
        difficulty: "medium",
        prepTime: 5,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["whiskey", "sour", "shaken"],
        glassware: "Rocks glass",
        garnish: "Cherry, orange slice"
    },
    {
        id: "recipe-009",
        title: "Paloma",
        slug: "paloma",
        description: "Mexico's most popular tequila cocktail - refreshing grapefruit and tequila combination.",
        ingredients: [
            { name: "Tequila Blanco", amount: "2 oz", productId: "teq-001", productName: "Don Julio 1942" },
            { name: "Fresh grapefruit juice", amount: "3 oz" },
            { name: "Fresh lime juice", amount: "0.5 oz" },
            { name: "Agave syrup", amount: "0.5 oz" },
            { name: "Soda water", amount: "splash" },
            { name: "Salt for rim", amount: "optional" },
            { name: "Grapefruit slice", amount: "1" }
        ],
        instructions: [
            "Rim highball glass with salt (optional)",
            "Fill glass with ice",
            "Add tequila, grapefruit juice, lime juice, and agave",
            "Top with splash of soda",
            "Stir gently",
            "Garnish with grapefruit slice"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["tequila", "grapefruit", "refreshing"],
        glassware: "Highball",
        garnish: "Grapefruit slice"
    },
    {
        id: "recipe-010",
        title: "Moscow Mule",
        slug: "moscow-mule",
        description: "Vodka, ginger beer, and lime served in the iconic copper mug.",
        ingredients: [
            { name: "Vodka", amount: "2 oz", productId: "vo-001", productName: "Grey Goose Vodka" },
            { name: "Fresh lime juice", amount: "0.5 oz" },
            { name: "Ginger beer", amount: "4 oz" },
            { name: "Lime wedge", amount: "1" },
            { name: "Candied ginger", amount: "3 pieces (optional)" }
        ],
        instructions: [
            "Fill copper mug or highball glass with ice",
            "Add vodka and lime juice",
            "Top with ginger beer",
            "Stir gently",
            "Garnish with lime wedge and candied ginger"
        ],
        difficulty: "easy",
        prepTime: 2,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["vodka", "ginger", "refreshing"],
        glassware: "Copper mug",
        garnish: "Lime wedge"
    },
    {
        id: "recipe-011",
        title: "Dark & Stormy",
        slug: "dark-and-stormy",
        description: "Bermuda's national drink - dark rum and ginger beer with lime.",
        ingredients: [
            { name: "Dark rum", amount: "2 oz", productId: "rum-001", productName: "Ron Zacapa 23" },
            { name: "Ginger beer", amount: "4 oz" },
            { name: "Fresh lime juice", amount: "0.5 oz" },
            { name: "Lime wedge", amount: "1" }
        ],
        instructions: [
            "Fill highball glass with ice",
            "Add lime juice and ginger beer",
            "Float dark rum on top by pouring over back of spoon",
            "Garnish with lime wedge",
            "Serve with straw and let guest stir"
        ],
        difficulty: "easy",
        prepTime: 2,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["rum", "ginger", "tropical"],
        glassware: "Highball",
        garnish: "Lime wedge"
    },
    {
        id: "recipe-012",
        title: "Aperol Spritz",
        slug: "aperol-spritz",
        description: "Italian summer in a glass - Aperol, prosecco, and soda.",
        ingredients: [
            { name: "Aperol", amount: "3 oz" },
            { name: "Prosecco", amount: "3 oz" },
            { name: "Soda water", amount: "1 oz" },
            { name: "Orange slice", amount: "1" }
        ],
        instructions: [
            "Fill wine glass with ice",
            "Add Aperol",
            "Add prosecco",
            "Top with splash of soda",
            "Stir gently",
            "Garnish with orange slice"
        ],
        difficulty: "easy",
        prepTime: 2,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["aperitif", "wine", "italian"],
        glassware: "Wine glass",
        garnish: "Orange slice"
    },
    {
        id: "recipe-013",
        title: "Sazerac",
        slug: "sazerac",
        description: "New Orleans classic - cognac or rye, Peychaud's bitters, and  absinthe rinse.",
        ingredients: [
            { name: "Rye whiskey or Cognac", amount: "2 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Simple syrup", amount: "0.25 oz" },
            { name: "Peychaud's bitters", amount: "3 dashes" },
            { name: "Absinthe", amount: "rinse" },
            { name: "Lemon peel", amount: "1" }
        ],
        instructions: [
            "Rinse chilled rocks glass with absinthe, discard excess",
            "In mixing glass with ice, combine whiskey, syrup, and bitters",
            "Stir for 30 seconds",
            "Strain into prepared glass (no ice)",
            "Express lemon peel over drink and discard peel"
        ],
        difficulty: "medium",
        prepTime: 4,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["whiskey", "classic", "new-orleans"],
        glassware: "Rocks glass",
        garnish: "Lemon peel (expressed, discarded)"
    },
    {
        id: "recipe-014",
        title: "French 75",
        slug: "french-75",
        description: "Elegant champagne cocktail with gin, lemon, and bubbles.",
        ingredients: [
            { name: "Gin", amount: "2 oz", productId: "gin-001", productName: "Hendrick's Gin" },
            { name: "Fresh lemon juice", amount: "0.5 oz" },
            { name: "Simple syrup", amount: "0.5 oz" },
            { name: "Champagne or prosecco", amount: "top" },
            { name: "Lemon twist", amount: "1" }
        ],
        instructions: [
            "Add gin, lemon juice, and syrup to shaker with ice",
            "Shake for 10 seconds",
            "Strain into champagne flute",
            "Top with champagne",
            "Garnish with lemon twist"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["gin", "champagne", "elegant"],
        glassware: "Champagne flute",
        garnish: "Lemon twist"
    },
    {
        id: "recipe-015",
        title: "Mai Tai",
        slug: "mai-tai",
        description: "Tropical tiki classic with rum, orange liqueur, and almond syrup.",
        ingredients: [
            { name: "Light rum", amount: "1.5 oz", productId: "rum-001", productName: "Ron Zacapa 23" },
            { name: "Dark rum", amount: "0.5 oz" },
            { name: "Orange liqueur", amount: "0.5 oz", productId: "liq-001", productName: "Grand Marnier Cordon Rouge" },
            { name: "Orgeat syrup", amount: "0.5 oz" },
            { name: "Fresh lime juice", amount: "1 oz" },
            { name: "Mint sprig", amount: "1" },
            { name: "Lime wheel", amount: "1" }
        ],
        instructions: [
            "Add light rum, orange liqueur, orgeat, and lime juice to shaker",
            "Fill with ice and shake for 15 seconds",
            "Strain into rocks glass filled with crushed ice",
            "Float dark rum on top",
            "Garnish with mint sprig and lime wheel"
        ],
        difficulty: "medium",
        prepTime: 4,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["rum", "tiki", "tropical"],
        glassware: "Rocks glass",
        garnish: "Mint sprig, lime wheel"
    },
    {
        id: "recipe-016",
        title: "Bloody Mary",
        slug: "bloody-mary",
        description: "Savory brunch cocktail with vodka, tomato juice, and spices.",
        ingredients: [
            { name: "Vodka", amount: "2 oz", productId: "vo-001", productName: "Grey Goose Vodka" },
            { name: "Tomato juice", amount: "4 oz" },
            { name: "Fresh lemon juice", amount: "0.5 oz" },
            { name: "Worcestershire sauce", amount: "3 dashes" },
            { name: "Hot sauce", amount: "2-3 dashes" },
            { name: "Horseradish", amount: "1 tsp" },
            { name: "Celery salt", amount: "pinch" },
            { name: "Black pepper", amount: "pinch" },
            { name: "Celery stalk", amount: "1" },
            { name: "Lemon wedge", amount: "1" }
        ],
        instructions: [
            "Add all ingredients except garnishes to shaker",
            "Roll gently between shakers (don't shake hard)",
            "Strain into highball glass filled with ice",
            "Garnish with celery stalk and lemon wedge",
            "Optional: rim glass with celery salt"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["vodka", "brunch", "savory"],
        glassware: "Highball",
        garnish: "Celery stalk, lemon wedge"
    },
    {
        id: "recipe-017",
        title: "Boulevardier",
        slug: "boulevardier",
        description: "Whiskey-based Negroni variation - bourbon, Campari, and sweet vermouth.",
        ingredients: [
            { name: "Bourbon", amount: "1.5 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Campari", amount: "1 oz" },
            { name: "Sweet vermouth", amount: "1 oz" },
            { name: "Orange peel", amount: "1" }
        ],
        instructions: [
            "Add bourbon, Campari, and vermouth to mixing glass with ice",
            "Stir for 30 seconds",
            "Strain into rocks glass with large ice cube",
            "Express orange peel over glass and drop in"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["whiskey", "bitter", "stirred"],
        glassware: "Rocks glass",
        garnish: "Orange peel"
    },
    {
        id: "recipe-018",
        title: "Aviation",
        slug: "aviation",
        description: "Beautiful purple cocktail with gin, maraschino, crème de violette, and lemon.",
        ingredients: [
            { name: "Gin", amount: "2 oz", productId: "gin-001", productName: "Hendrick's Gin" },
            { name: "Maraschino liqueur", amount: "0.5 oz" },
            { name: "Crème de violette", amount: "0.25 oz" },
            { name: "Fresh lemon juice", amount: "0.75 oz" },
            { name: "Maraschino cherry", amount: "1" }
        ],
        instructions: [
            "Add gin, maraschino, crème de violette, and lemon juice to shaker",
            "Fill with ice and shake for 15 seconds",
            "Double strain into chilled coupe glass",
            "Garnish with maraschino cherry"
        ],
        difficulty: "medium",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["gin", "floral", "shaken"],
        glassware: "Coupe",
        garnish: "Maraschino cherry"
    },
    {
        id: "recipe-019",
        title: "Cosmopolitan",
        slug: "cosmopolitan",
        description: "Iconic pink cocktail with vodka, cranberry, lime, and orange liqueur.",
        ingredients: [
            { name: "Vodka", amount: "1.5 oz", productId: "vo-001", productName: "Grey Goose Vodka" },
            { name: "Orange liqueur", amount: "0.5 oz", productId: "liq-001", productName: "Grand Marnier Cordon Rouge" },
            { name: "Cranberry juice", amount: "1 oz" },
            { name: "Fresh lime juice", amount: "0.5 oz" },
            { name: "Orange peel", amount: "1" }
        ],
        instructions: [
            "Add vodka, orange liqueur, cranberry juice, and lime juice to shaker",
            "Fill with ice and shake for 15 seconds",
            "Double strain into chilled martini glass",
            "Express orange peel over glass and drop in"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["vodka", "fruity", "shaken"],
        glassware: "Martini glass",
        garnish: "Orange peel"
    },
    {
        id: "recipe-020",
        title: "Mint Julep",
        slug: "mint-julep",
        description: "Kentucky Derby classic with bourbon, mint, and crushed ice.",
        ingredients: [
            { name: "Bourbon", amount: "2.5 oz", productId: "wh-001", productName: "Glenfiddich 12 Year Old" },
            { name: "Fresh mint leaves", amount: "8-10" },
            { name: "Simple syrup", amount: "0.5 oz" },
            { name: "Mint sprig", amount: "1 large" },
            { name: "Powdered sugar", amount: "dusting" }
        ],
        instructions: [
            "In julep cup, gently muddle mint leaves with simple syrup",
            "Fill cup with crushed ice",
            "Add bourbon and stir until cup frosts",
            "Top with more crushed ice to form dome",
            "Garnish with large mint sprig dusted with powdered sugar",
            "Serve with short straw"
        ],
        difficulty: "easy",
        prepTime: 3,
        servings: 1,
        image: "/bottle.png",
        category: "Cocktails",
        tags: ["bourbon", "mint", "classic"],
        glassware: "Julep cup",
        garnish: "Mint sprig with powdered sugar"
    }
]

// Helper functions
export const getRecipeBySlug = (slug: string): Recipe | undefined => {
    return RECIPES.find(recipe => recipe.slug === slug)
}

export const getRecipesByDifficulty = (difficulty: Recipe['difficulty']): Recipe[] => {
    return RECIPES.filter(recipe => recipe.difficulty === difficulty)
}

export const getRecipesByTag = (tag: string): Recipe[] => {
    return RECIPES.filter(recipe => recipe.tags.includes(tag))
}

export const getRecipesWithProduct = (productId: string): Recipe[] => {
    return RECIPES.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.productId === productId)
    )
}
