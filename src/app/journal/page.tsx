import { getBlogPosts } from '@/services';
import { MagazineGrid } from '@/components/features/content/MagazineGrid';

export default async function JournalPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">The Journal</h1>
                <p className="text-xl text-muted-foreground">
                    Stories, cocktail culture, and behind-the-scenes at Balisan.
                </p>
            </div>

            <MagazineGrid posts={posts as any} />

            {posts.length === 0 && (
                <p className="text-center py-20 text-muted-foreground">No posts found.</p>
            )}
        </div>
    );
}
