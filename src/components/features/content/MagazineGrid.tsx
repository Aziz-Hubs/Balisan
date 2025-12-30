"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Post {
    slug: string
    title: string
    excerpt?: string
    description?: string // for backward compatibility
    featuredImage?: string
    image?: string // for backward compatibility
    publishedAt?: string
    date?: string // for backward compatibility
    category?: string
    author?: {
        name: string
        avatar?: string
    } | string
}

interface MagazineGridProps {
    posts: Post[]
}

export function MagazineGrid({ posts }: MagazineGridProps) {
    if (!posts || posts.length === 0) return null

    // First post is the "Hero" feature
    const heroPost = posts[0]
    // Next 3 posts are secondary features
    const secondaryPosts = posts.slice(1, 4)
    // The rest are standard grid items
    const standardPosts = posts.slice(4)

    const getPostDescription = (post: Post) => post.excerpt || post.description || ""
    const getPostImage = (post: Post) => post.featuredImage || post.image || ""
    const getPostDate = (post: Post) => post.publishedAt || post.date || ""
    const getPostAuthor = (post: Post) => {
        if (typeof post.author === 'object') return post.author.name
        return post.author || 'Balisan Team'
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="group relative grid gap-8 md:grid-cols-12 md:gap-12 items-center">
                <div className="md:col-span-8 relative aspect-[16/9] overflow-hidden rounded-2xl">
                    <img
                        src={getPostImage(heroPost)}
                        alt={heroPost.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>
                <div className="md:col-span-4 space-y-4 relative">
                    <Badge variant="outline" className="border-primary text-primary">{heroPost.category || 'Article'}</Badge>
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                        <Link href={`/journal/${heroPost.slug}`} className="hover:text-primary transition-colors">
                            {heroPost.title}
                        </Link>
                    </h2>
                    <p className="text-muted-foreground text-lg line-clamp-3">{getPostDescription(heroPost)}</p>
                    <div className="flex items-center gap-3 pt-4">
                        <div className="text-sm">
                            <p className="font-medium">{getPostAuthor(heroPost)}</p>
                            <p className="text-muted-foreground">{getPostDate(heroPost)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Grid */}
            <div className="grid gap-8 md:grid-cols-3">
                {secondaryPosts.map((post) => (
                    <article key={post.slug} className="group relative flex flex-col space-y-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted relative">
                            <img
                                src={getPostImage(post)}
                                alt={post.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-background/90 text-foreground hover:bg-background">{post.category || 'Story'}</Badge>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">{getPostDate(post)}</span>
                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold font-display leading-snug">
                                <Link href={`/journal/${post.slug}`} className="hover:text-primary transition-colors">
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{getPostDescription(post)}</p>
                        </div>
                    </article>
                ))}
            </div>

            {/* Standard Grid (if any more posts) */}
            {standardPosts.length > 0 && (
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4 border-t pt-16">
                    {standardPosts.map((post) => (
                        <article key={post.slug} className="group space-y-3">
                            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-muted">
                                <img
                                    src={getPostImage(post)}
                                    alt={post.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">{post.category || 'Article'}</span>
                                    <span className="text-[10px] text-muted-foreground">• {getPostDate(post)}</span>
                                </div>
                                <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                    <Link href={`/journal/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h4>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
