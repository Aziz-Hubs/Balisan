import { getBlogPost, getBlogPosts } from '@/services';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/features/content/RecipeCard';
import { ArticleCard } from '@/components/features/content/ArticleCard';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) notFound();

    return (
        <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
            <div className="space-y-6 mb-12 text-center">
                <Badge variant="secondary" className="capitalize">{(post as any).content_type || 'Article'}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{(post as any).title}</h1>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        {post.author?.avatar_url && (
                            <div className="relative h-6 w-6 rounded-full overflow-hidden">
                                <Image src={post.author.avatar_url} alt={post.author.full_name || 'Author'} fill />
                            </div>
                        )}
                        <span>{post.author?.full_name || 'Balisan Editor'}</span>
                    </div>
                    <span>•</span>
                    <span>{new Date((post as any).published_at || new Date().toISOString()).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{Math.ceil(((post as any).content || '').split(/\s+/).length / 200)} min read</span>
                </div>
            </div>

            <div className="relative aspect-video mb-12 overflow-hidden rounded-3xl shadow-xl">
                <Image
                    src={(post as any).cover_image || '/placeholder.png'}
                    alt={(post as any).title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
                <MDXRemote
                    source={(post as any).content || ''}
                    components={{ RecipeCard: RecipeCard as any, ArticleCard: ArticleCard as any }}
                />
            </div>
        </article>
    );
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: (post as any).slug,
    }));
}
