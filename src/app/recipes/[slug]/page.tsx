import { getRecipe, getRecipes } from '@/services';
import { RecipeIngredient } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Clock, ChefHat } from 'lucide-react';
import { ShoppableIngredients } from '@/components/features/content/ShoppableIngredients';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const recipe = await getRecipe(slug);

    if (!recipe) notFound();

    // Filter ingredients that are shoppable (have a productId and price)
    const shoppableIngredients = (recipe.ingredients || [])
        .filter((ing: any) => ing.product_id && (ing.product as any)?.price)
        .map((ing: any) => {
            const product = ing.product as any;
            return {
                id: ing.product_id!,
                name: product?.name || ing.name,
                price: product?.price || 0,
                image: product?.image || '/placeholder.png'
            };
        });

    return (
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{recipe.title}</h1>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground uppercase tracking-widest font-medium">
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" /> {recipe.prep_time} mins
                            </span>
                            <span className="flex items-center gap-2">
                                <ChefHat className="h-4 w-4" /> {recipe.difficulty}
                            </span>
                            <span className="px-2 py-1 bg-muted rounded text-xs">
                                Cocktail
                            </span>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {recipe.description}
                        </p>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
                        <Image
                            src={recipe.image_url || '/placeholder.png'}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                                {(recipe.ingredients || []).map((ing: any, idx: number) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="font-bold text-amber-600">•</span>
                                        <span><strong>{ing.amount}</strong> {ing.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Preparation</h2>
                            <ol className="space-y-6">
                                {((recipe.instructions as unknown as string[]) || []).map((step, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-900 font-bold shrink-0">
                                            {idx + 1}
                                        </span>
                                        <p className="pt-1 leading-relaxed">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-4 space-y-8">
                    <div className="sticky top-24">
                        {shoppableIngredients.length > 0 && (
                            <ShoppableIngredients ingredients={shoppableIngredients} />
                        )}

                        <div className="mt-8 p-6 rounded-2xl bg-muted/50 border space-y-4">
                            <h4 className="font-bold">Expert Tip</h4>
                            <p className="text-sm text-muted-foreground italic">
                                "Always use fresh ice and chill your glassware for 5 minutes before serving for the best experience."
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const recipes = await getRecipes();
    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}
