import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ChefHat, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HeroVideoDialog } from '@/components/ui/extension/HeroVideoDialog';

interface RecipeCardProps {
    recipe: {
        slug: string;
        title: string;
        description: string;
        difficulty?: string;
        time?: string;
        image: string;
        videoUrl?: string; // Support for video thumbnails
    };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    const hasVideo = !!recipe.videoUrl;

    return (
        <Card className="overflow-hidden h-full border-none bg-transparent transition-all hover:translate-y-[-4px] group">
            <CardContent className="p-0 space-y-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    {hasVideo ? (
                        <HeroVideoDialog
                            videoSrc={recipe.videoUrl!}
                            thumbnailSrc={recipe.image || "/placeholder-recipe.jpg"}
                            thumbnailAlt={recipe.title}
                            className="w-full h-full"
                        />
                    ) : (
                        <Link href={`/recipes/${recipe.slug}`}>
                            <Image
                                src={recipe.image || "/placeholder-recipe.jpg"}
                                alt={recipe.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </Link>
                    )}

                    <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                        <Badge variant="secondary" className="backdrop-blur-md bg-white/80 text-foreground">
                            {recipe.difficulty || 'Easy'}
                        </Badge>
                        <Badge variant="outline" className="backdrop-blur-md bg-black/40 text-white border-transparent">
                            {recipe.time || '10m'}
                        </Badge>
                    </div>

                    {hasVideo && (
                        <div className="absolute bottom-3 right-3 pointer-events-none">
                            <Badge className="bg-amber-600 text-white border-none gap-1">
                                <Play className="h-3 w-3 fill-current" /> Video
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="p-4 space-y-3">
                    <Link href={`/recipes/${recipe.slug}`}>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight line-clamp-2">
                            {recipe.title}
                        </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {recipe.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

