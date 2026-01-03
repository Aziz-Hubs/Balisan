import { getBlogPosts } from '@/services';
import { MagazineGrid } from '@/components/features/content/MagazineGrid';
import { ContentLayout } from '@/components/layouts/ContentLayout';

export default async function JournalPage() {
    const posts = await getBlogPosts();

    return (
        <ContentLayout
            title="The Journal"
            subtitle="Stories, cocktail culture, and behind-the-scenes at Balisan."
            breadcrumbs={[{ label: 'Journal' }]}
        >
            <MagazineGrid posts={posts as any} />

            {posts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-zinc-500 text-lg">Our editors are crafting new stories. Stay tuned.</p>
                </div>
            )}
        </ContentLayout>
    );
}
