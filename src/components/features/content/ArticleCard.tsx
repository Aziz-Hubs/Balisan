import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
    post: {
        slug: string;
        title: string;
        description: string;
        date: string;
        category?: string;
        image: string;
    };
}

export function ArticleCard({ post }: ArticleCardProps) {
    return (
        <Link href={`/journal/${post.slug}`} className="group">
            <Card className="overflow-hidden h-full transition-shadow hover:shadow-md border-none bg-transparent">
                <CardContent className="p-0 space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="backdrop-blur-md bg-white/80 text-foreground">
                                {post.category || 'Journal'}
                            </Badge>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{post.date}</p>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
