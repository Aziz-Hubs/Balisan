import { notFound } from "next/navigation"
import { getProducts, getBlogPosts } from "@/services"
import { ShopContent } from "@/components/features/products/ShopContent"
import { GraduationCap } from "lucide-react"

interface EducationDetailPageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function EducationDetailPage({ params }: EducationDetailPageProps) {
    const { slug } = await params
    const type = slug[0]

    // Different logic based on education type
    if (type === 'masterclasses') {
        const products = await getProducts({ tags: ['Masterclass'], limit: 12 })

        return (
            <div className="container mx-auto py-16 px-4">
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <GraduationCap className="h-4 w-4" />
                        <span>Education</span>
                        <span>/</span>
                        <span className="font-medium text-foreground">Masterclasses</span>
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-4">Masterclasses</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Expert-led interactive sessions. Book your place for our upcoming virtual and in-person tastings.
                    </p>
                </div>

                {products.length > 0 ? (
                    <ShopContent initialProducts={products} baseFilters={{ tags: ['Masterclass'] }} />
                ) : (
                    <div className="py-24 text-center bg-muted/20 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-2">No Upcoming Masterclasses</h2>
                        <p className="text-muted-foreground text-lg">Check back soon for our new schedule.</p>
                    </div>
                )}
            </div>
        )
    }

    if (type === 'guides') {
        const posts = await getBlogPosts({ tag: 'Guide', limit: 12 })

        return (
            <div className="container mx-auto py-16 px-4">
                <div className="mb-12">
                    <h1 className="text-4xl font-display font-bold mb-4">Tasting Guides</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        In-depth articles to help you understand the nuances of every spirit in our collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? posts.map(post => (
                        <div key={post.id} className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all bg-card">
                            <div className="aspect-video bg-muted relative">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                        <GraduationCap className="h-12 w-12" />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">{post.excerpt}</p>
                                <a href={`/journal/${post.slug}`} className="text-sm font-bold uppercase tracking-widest text-primary">Read Guide →</a>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-24 text-center bg-muted/20 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-2">Guides Coming Soon</h2>
                            <p className="text-muted-foreground">Our sommeliers are working on fresh content.</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Default or Fallback
    return notFound()
}
