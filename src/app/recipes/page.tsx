import { getRecipes } from '@/services';
import { RecipeCard } from '@/components/features/content/RecipeCard';

export default async function RecipesPage() {
    const recipes = await getRecipes();

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Cocktail Recipes</h1>
                <p className="text-xl text-muted-foreground">
                    Elevate your home bar with our curated cocktail collection.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.slug} recipe={recipe as any} />
                ))}
            </div>

            {recipes.length === 0 && (
                <p className="text-center py-20 text-muted-foreground">No recipes found.</p>
            )}
        </div>
    );
}
