import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge'; // Added import for Badge

interface RecipeCardProps {
    recipe: {
        slug: string;
        title: string;
        description: string;
        difficulty?: string; // Made optional
        time?: string;       // Made optional
        image: string;
    };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/recipes/${recipe.slug}`} className="group">
            <Card className="overflow-hidden h-full border-none bg-transparent transition-all hover:translate-y-[-4px]">
                <CardContent className="p-0 space-y-3">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                            <Badge variant="secondary" className="backdrop-blur-md bg-white/80 text-foreground">
                                {recipe.difficulty || 'Easy'}
                            </Badge>
                            <Badge variant="outline" className="backdrop-blur-md bg-black/40 text-white border-transparent">
                                {recipe.time || '10m'}
                            </Badge>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        {/* Removed the old difficulty/time display */}
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                            {recipe.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {recipe.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
