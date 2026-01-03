import { getRecipes } from '@/services';
import { RecipeCard } from '@/components/features/content/RecipeCard';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export default async function RecipesPage() {
    const recipes = await getRecipes();

    return (
        <ContentLayout
            title="Cocktail Recipes"
            subtitle="Elevate your home bar with our curated cocktail collection."
            breadcrumbs={[{ label: 'Recipes' }]}
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.slug} recipe={recipe as any} />
                ))}
            </div>

            {recipes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-zinc-500 text-lg">No recipes found yet. Check back soon for our mixologists latest creations.</p>
                </div>
            )}
        </ContentLayout>
    );
}
