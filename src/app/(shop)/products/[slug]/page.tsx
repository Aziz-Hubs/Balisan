import { notFound } from "next/navigation"
import { getProductBySlug, getProductsByCategory } from "@/services"
import { ProductGallery } from "@/components/features/products/ProductGallery"
import { Rating } from "@/components/ui/rating"
import { AddToCartButton } from "@/components/features/cart/AddToCartButton"
import { RelatedProductsCarousel } from "@/components/features/products/RelatedProductsCarousel"
import { formatPrice, cn } from "@/lib/utils"
import { Award, Zap, Thermometer, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductReviews } from "@/components/features/products/ProductReviews"
import { ProductFAQ } from "@/components/features/products/ProductFAQ"
import { AnimatedTextGenerate } from "@/components/ui/extension/AnimatedTextGenerate"
import { AdminEditButton } from "@/components/features/products/AdminEditButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HoverBorderGradient } from "@/components/ui/extension/HoverBorderGradient"
import { DecoratedText } from "@/components/ui/extension/DecoratedText"

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
    const relatedProducts = (await getProductsByCategory((product.categories as any)?.slug || 'whiskey', 4))
        .filter(p => p.id !== product.id)

    const images = Array.isArray(product.images) ? (product.images as string[]) : [];

    const brandName = typeof product.brand === 'string' ? product.brand : product.brand?.name
    const categoryName = typeof product.categories === 'string' ? product.categories : product.categories?.name

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6 pb-32 md:pb-12">
            <div className="grid gap-8 md:grid-cols-2 lg:gap-16 items-start">
                {/* Sticky Gallery Column */}
                <div className="md:sticky md:top-24 self-start">
                    <ProductGallery images={images.length > 0 ? images : ["/placeholder.png"]} />
                </div>

                <div className="space-y-6 relative">
                    <AdminEditButton productSlug={product.slug} />
                    <div>
                        <AnimatedTextGenerate
                            text={brandName || ''}
                            className="text-sm font-medium text-amber-600 mb-2 uppercase tracking-wide"
                            speed="fast"
                        />
                        <div className="flex items-start justify-between">
                            <AnimatedTextGenerate
                                text={product.name}
                                className="text-3xl font-display font-bold tracking-tight md:text-4xl"
                                textClassName="text-3xl font-display font-bold tracking-tight md:text-4xl"
                            />
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
                            {!product.in_stock && (
                                <div className="flex items-center gap-2">
                                    <Badge variant="destructive" className="bg-red-500/80 backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        Sold Out
                                    </Badge>
                                    <DecoratedText text="Out of Stock" className="text-xs font-bold text-red-500 uppercase tracking-widest" />
                                </div>
                            )}

                            {product.discount_price && product.discount_price < product.price && (
                                <Badge className="bg-emerald-500/80 text-white backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    -{Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                                </Badge>
                            )}

                            {((product as any).is_award_winner || (product as any).tags?.includes('award-winner')) && (
                                <Badge className="bg-amber-500/80 text-black backdrop-blur-md border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                    Award Winner
                                </Badge>
                            )}

                            {(product.is_new || (product.created_at && (new Date().getTime() - new Date(product.created_at).getTime() < 30 * 24 * 60 * 60 * 1000))) && (
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
                        {product.discount_price && product.discount_price < product.price ? (
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatPrice(product.discount_price)}
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
                        {((product.stock_quantity || 0) < 20 && (product.stock_quantity || 0) > 0) && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-100 animate-pulse">
                                <Zap className="h-3.5 w-3.5 fill-current" />
                                <span className="text-xs font-bold uppercase tracking-wider">Only {product.stock_quantity} left</span>
                            </div>
                        )}
                    </div>

                    <div className="prose text-muted-foreground">
                        <p>{product.description || "No description available for this premium scotch."}</p>
                    </div>

                    {/* Tasting Profile Sliders */}
                    {(product.flavor_profile && Object.values(product.flavor_profile).some(v => (v as number) > 0)) && (
                        <div className="py-6 border-y border-secondary/20 space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                                <Thermometer className="h-4 w-4" /> Tasting Profile
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span>Sweetness</span>
                                        <span>{product.flavor_profile?.sweetness || 0}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 bottom-0 left-0 h-full bg-amber-500 rounded-full shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${product.flavor_profile?.sweetness || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span>Complexity</span>
                                        <span>{product.flavor_profile?.complexity || 0}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 bottom-0 left-0 h-full bg-emerald-600 rounded-full shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${product.flavor_profile?.complexity || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span>Woodiness</span>
                                        <span>{product.flavor_profile?.woodiness || 0}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 bottom-0 left-0 h-full bg-zinc-500 rounded-full shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${product.flavor_profile?.woodiness || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span>Smokiness</span>
                                        <span>{product.flavor_profile?.smokiness || 0}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 bottom-0 left-0 h-full bg-stone-500 rounded-full shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${product.flavor_profile?.smokiness || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span>Alcohol Strength</span>
                                        <span>{product.abv || 0}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 bottom-0 left-0 h-full bg-amber-600 rounded-full shadow-md transition-all duration-1000 ease-out"
                                            style={{ width: `${Math.min((product.abv || 0) * 1.5, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {typeof product.tasting_notes === 'string' && product.tasting_notes.trim().length > 0 ? (
                                    product.tasting_notes.split(",").map((note: string) => (
                                        <Badge key={note} variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-amber-200 text-amber-800 bg-amber-50/50">
                                            {note.trim()}
                                        </Badge>
                                    ))
                                ) : Array.isArray(product.tasting_notes) && product.tasting_notes.length > 0 ? (
                                    (product.tasting_notes as string[]).map((note) => (
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
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <AddToCartButton
                            product={product}
                            size="lg"
                            className="w-full md:w-[240px] h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-600/40 transition-all duration-300 border-none"
                        >
                            Add to Cart
                        </AddToCartButton>
                        <HoverBorderGradient
                            as="button"
                            className="w-full h-14 px-8 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-zinc-200 dark:border-white/10"
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Add to Wishlist
                        </HoverBorderGradient>
                    </div>


                    <div className="border-t pt-8 mt-8">
                        <h3 className="font-semibold mb-4">Product Details</h3>
                        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                            <div>
                                <dt className="font-medium text-muted-foreground">Brand</dt>
                                <dd className="font-medium">{brandName}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">Category</dt>
                                <dd className="font-medium">{categoryName}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* FAQ and Reviews Section - Restructured for Tabs on Desktop, Stacked on Mobile */}
                    <div className="mt-12">
                        {/* Desktop: Tabs */}
                        <div className="hidden md:block">
                            <Tabs defaultValue="reviews" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                                    <TabsTrigger value="reviews" className="text-base">Reviews</TabsTrigger>
                                    <TabsTrigger value="faq" className="text-base">FAQ</TabsTrigger>
                                </TabsList>
                                <TabsContent value="reviews" className="mt-0">
                                    <ProductReviews product={product} />
                                </TabsContent>
                                <TabsContent value="faq" className="mt-0">
                                    <ProductFAQ product={product} />
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Mobile: Stacked (Reviews first, then FAQ) */}
                        <div className="md:hidden space-y-12">
                            <ProductReviews product={product} />
                            <ProductFAQ product={product} />
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <RelatedProductsCarousel products={relatedProducts} />
            )}
            {/* Mobile Sticky Add to Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border/50 md:hidden animate-in slide-in-from-bottom-full duration-500 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider line-clamp-1">{brandName}</span>
                        <div className="flex items-baseline gap-2">
                            {product.discount_price && product.discount_price < product.price ? (
                                <>
                                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                        {formatPrice(product.discount_price)}
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
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/25 w-[140px] rounded-full flex-shrink-0"
                    />
                </div>
            </div>
        </div>
    )
}
