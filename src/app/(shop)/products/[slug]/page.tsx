import { notFound } from "next/navigation"
import { getProductBySlug, getProductsByCategory } from "@/services"
import { ProductGallery } from "@/components/features/products/ProductGallery"
import { Rating } from "@/components/ui/rating"
import { Button } from "@/components/ui/button"
import { AddToCartButton } from "@/components/features/cart/AddToCartButton"
import { ProductGrid } from "@/components/features/products/ProductGrid"
import { formatPrice, cn } from "@/lib/utils"
import { Award, Zap, Thermometer, Droplets, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductReviews } from "@/components/features/products/ProductReviews"
import { ProductFAQ } from "@/components/features/products/ProductFAQ"

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    // Fetch related products from Supabase
    const relatedProducts = (await getProductsByCategory(product.category, 4))
        .filter(p => p.id !== product.id)

    // Use gallery images from DB, fallback to single image
    const images = product.images && product.images.length > 0
        ? product.images
        : [product.image].filter(Boolean)

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6 pb-32 md:pb-12">
            <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
                <ProductGallery images={images.length > 0 ? images : ["/placeholder.png"]} />

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-medium text-amber-600 mb-2 uppercase tracking-wide">{product.brand}</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="text-3xl font-display font-bold tracking-tight md:text-4xl">{product.name}</h1>
                            {/* Expert Rating Badge */}
                            <div className="flex flex-col items-center bg-amber-50 border border-amber-200 rounded-lg p-2 shadow-sm min-w-[70px]">
                                <Award className="h-5 w-5 text-amber-600 mb-0.5" />
                                <span className="text-[10px] uppercase font-bold text-amber-700 leading-none">Master</span>
                                <span className="text-xl font-display font-black text-amber-900 leading-tight">94</span>
                                <span className="text-[8px] uppercase font-bold text-amber-600 leading-none">PTS</span>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                            <Rating rating={product.rating} />
                            <span className="text-sm text-muted-foreground">({product.rating} stars)</span>
                        </div>

                        {/* Product Badges */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {!product.inStock && (
                                <Badge variant="destructive" className="bg-red-500/80 backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    Sold Out
                                </Badge>
                            )}

                            {product.discountPrice && product.discountPrice < product.price && (
                                <Badge className="bg-emerald-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                </Badge>
                            )}

                            {(product.isAwardWinner || product.tags?.includes('award-winner')) && (
                                <Badge className="bg-amber-500/80 text-black backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    Award Winner
                                </Badge>
                            )}

                            {(product.isNew || (new Date().getTime() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000)) && (
                                <Badge className="bg-blue-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    New
                                </Badge>
                            )}

                            {product.country?.toLowerCase() === 'ukraine' ? (
                                <Badge variant="outline" className="border-amber-500/50 text-amber-600 uppercase text-[10px] tracking-widest px-3 py-1">
                                    Local
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="border-zinc-300 dark:border-zinc-700 text-muted-foreground uppercase text-[10px] tracking-widest px-3 py-1">
                                    Imported
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {product.discountPrice && product.discountPrice < product.price ? (
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatPrice(product.discountPrice)}
                                </span>
                                <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                        ) : (
                            <div className="text-3xl font-bold">
                                {formatPrice(product.price)}
                            </div>
                        )}
                        {/* Low Stock Indicator */}
                        {product.stockQuantity < 20 && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-100 animate-pulse">
                                <Zap className="h-3.5 w-3.5 fill-current" />
                                <span className="text-xs font-bold uppercase tracking-wider">Only {product.stockQuantity} left</span>
                            </div>
                        )}
                    </div>

                    <div className="prose text-muted-foreground">
                        <p>{product.description || "No description available for this premium scotch."}</p>
                    </div>

                    {/* Tasting Profile Sliders */}
                    <div className="py-6 border-y border-secondary/20 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                            <Thermometer className="h-4 w-4" /> Tasting Profile
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Smokey</span>
                                    <span>Sweet</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/50" />
                                    <div className="absolute top-0 bottom-0 left-[20%] w-3 h-3 -mt-0.75 bg-amber-600 rounded-full shadow-md" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Light</span>
                                    <span>Full Body</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/50" />
                                    <div className="absolute top-0 bottom-0 right-[15%] w-3 h-3 -mt-0.75 bg-amber-600 rounded-full shadow-md" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Fruit</span>
                                    <span>Oak</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/50" />
                                    <div className="absolute top-0 bottom-0 left-[65%] w-3 h-3 -mt-0.75 bg-amber-600 rounded-full shadow-md" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-bold uppercase">
                                    <span>Alcohol Strength</span>
                                    <span>{product.abv}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                    <div
                                        className="absolute top-0 bottom-0 left-0 h-full bg-amber-600 rounded-full shadow-md transition-all duration-1000 ease-out"
                                        style={{ width: `${Math.min(product.abv * 1.5, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {typeof product.tastingNotes === 'string' && product.tastingNotes.trim().length > 0 ? (
                                product.tastingNotes.split(",").map((note) => (
                                    <Badge key={note} variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-amber-200 text-amber-800 bg-amber-50/50">
                                        {note.trim()}
                                    </Badge>
                                ))
                            ) : Array.isArray(product.tastingNotes) && product.tastingNotes.length > 0 ? (
                                (product.tastingNotes as string[]).map((note) => (
                                    <Badge key={note} variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-amber-200 text-amber-800 bg-amber-50/50">
                                        {note.trim()}
                                    </Badge>
                                ))
                            ) : (
                                <>
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">Honey</Badge>
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">Oak</Badge>
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">Vanilla</Badge>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <AddToCartButton
                            product={product}
                            size="lg"
                            className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        />
                        <Button size="lg" variant="outline" className="w-full md:w-auto">Add to Wishlist</Button>
                    </div>


                    <div className="border-t pt-8 mt-8">
                        <h3 className="font-semibold mb-4">Product Details</h3>
                        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                            <div>
                                <dt className="font-medium text-muted-foreground">Brand</dt>
                                <dd className="font-medium">{product.brand}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">Category</dt>
                                <dd className="font-medium">{product.category}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* FAQ and Reviews Section - Side by Side */}
                    <div className="grid gap-8 lg:grid-cols-2 mt-8">
                        <ProductFAQ product={product} />
                        <ProductReviews product={product} />
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-24 overflow-visible">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">Related Products</h2>
                    <ProductGrid products={relatedProducts} />
                </div>
            )}
            {/* Mobile Sticky Add to Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 md:hidden animate-in slide-in-from-bottom-full duration-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider line-clamp-1">{product.brand}</span>
                        <div className="flex items-baseline gap-2">
                            {product.discountPrice && product.discountPrice < product.price ? (
                                <>
                                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                        {formatPrice(product.discountPrice)}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-through decoration-red-500/50">
                                        {formatPrice(product.price)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-lg font-bold">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>
                    </div>
                    <AddToCartButton
                        product={product}
                        size="default"
                        className="bg-amber-600 hover:bg-amber-700 text-white shadow-md w-[140px] rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}
