'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShineBorder } from "@/components/ui/extension/ShineBorder";
import { Category } from "@/types";

type BentoItem = {
    title: string;
    description: string;
    href: string;
    image: string;
    className?: string; // Grid col/row span classes
    color: string;
    accent: string;
    shadow: string;
};

// Refined branding colors: Dual palettes for Light (Pastel/Elegant) and Dark (Deep/Rich) modes.
const CATEGORY_STYLES: Record<string, { color: string, accent: string, image?: string, shadow: string }> = {
    whiskey: {
        color: "from-amber-100 to-orange-200 dark:from-amber-700/90 dark:to-amber-950",
        accent: "text-amber-900 dark:text-amber-100",
        shadow: "shadow-amber-200/50 dark:shadow-amber-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Johnnie%20Walker.png"
    },
    vodka: {
        color: "from-slate-100 to-slate-200 dark:from-slate-600/90 dark:to-slate-900",
        accent: "text-slate-900 dark:text-slate-100",
        shadow: "shadow-slate-200/50 dark:shadow-slate-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Absolut%20Vodka.png"
    },
    gin: {
        color: "from-emerald-100 to-emerald-200 dark:from-emerald-800/90 dark:to-emerald-950",
        accent: "text-emerald-900 dark:text-emerald-100",
        shadow: "shadow-emerald-200/50 dark:shadow-emerald-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Gin.png"
    },
    tequila: {
        color: "from-yellow-100 to-yellow-200 dark:from-yellow-700/90 dark:to-yellow-950",
        accent: "text-yellow-900 dark:text-yellow-100",
        shadow: "shadow-yellow-200/50 dark:shadow-yellow-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Tequila.png"
    },
    rum: {
        color: "from-orange-100 to-red-200 dark:from-orange-800/90 dark:to-red-950",
        accent: "text-orange-900 dark:text-orange-100",
        shadow: "shadow-orange-200/50 dark:shadow-orange-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Bacardi%20Limon.png"
    },
    wine: {
        color: "from-rose-100 to-rose-200 dark:from-rose-900/90 dark:to-rose-950",
        accent: "text-rose-900 dark:text-rose-100",
        shadow: "shadow-rose-200/50 dark:shadow-rose-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Red%20Wine.png"
    },
    beer: {
        color: "from-amber-100 to-yellow-200 dark:from-amber-800/90 dark:to-yellow-950",
        accent: "text-amber-900 dark:text-amber-100",
        shadow: "shadow-amber-200/50 dark:shadow-amber-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Lager.png"
    },
    liqueur: {
        color: "from-purple-100 to-indigo-200 dark:from-purple-900/90 dark:to-indigo-950",
        accent: "text-purple-900 dark:text-purple-100",
        shadow: "shadow-purple-200/50 dark:shadow-purple-900/40",
        image: "https://www.thecocktaildb.com/images/ingredients/Baileys%20irish%20cream.png"
    },
    default: {
        color: "from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-950",
        accent: "text-zinc-900 dark:text-zinc-100",
        shadow: "shadow-zinc-200/50 dark:shadow-zinc-900/40",
        image: "/bottle.png"
    }
};

export function BentoGrid({ categories = [] }: { categories?: Category[] }) {
    // Transform categories to BentoItems with smart layout logic
    const items: BentoItem[] = categories.map((cat, i) => {
        // Precise layout for 8 items in a 4-column grid
        // Row 1: Item 0 (2x2), Item 1 (1x2), Item 2 (1x1)
        // Row 2: (0 filled), (1 filled), Item 3 (1x1)
        // Row 3: Item 4, 5, 6, 7 (1x1 each)
        let className = "md:col-span-1 md:row-span-1";

        if (i === 0) className = "md:col-span-2 md:row-span-2"; // Featured (Top Left)
        if (i === 1) className = "md:col-span-1 md:row-span-2"; // Tall (Vertical)

        const style = CATEGORY_STYLES[cat.slug] || CATEGORY_STYLES.default;

        return {
            title: cat.name,
            description: cat.description || "",
            href: `/shop?category=${cat.slug}`,
            image: style.image || cat.image_url || "/bottle.png",
            className,
            color: style.color,
            accent: style.accent,
            shadow: style.shadow
        };
    });

    return (
        <section className="py-24 bg-background text-foreground relative overflow-hidden transition-colors duration-300">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-amber-500 mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium tracking-wider uppercase">Curated Collections</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 leading-tight">
                            The Art of <span className="italic">Selection</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md">
                            Discover our hand-picked spirits and rare finds, categorized for your perfect moment.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        // UPDATED BUTTON: Brand Amber color with white icon circle
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20 text-white transition-all duration-300 border border-amber-400/20"
                    >
                        <span className="text-sm font-medium uppercase tracking-widest pl-1">Explore Full Catalog</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-45 shadow-sm">
                            <ArrowUpRight className="w-4 h-4 text-amber-600" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[200px]">
                    {items.map((item, i) => (
                        <BlurFade
                            key={i}
                            delay={0.1 + i * 0.05}
                            inView
                            className={cn(item.className, "w-full h-full")}
                        >
                            <BentoCard item={item} index={i} />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
    const isLarge = item.className?.includes("row-span-2");
    const isTall = item.className?.includes("col-span-1") && item.className?.includes("row-span-2");

    return (
        <motion.div
            layout
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "group relative h-full w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-0",
                "bg-gradient-to-br",
                item.color,
                "shadow-lg",
                item.shadow,
                // MOBILE: Consistent card heights for visual rhythm
                "min-h-[220px] md:min-h-0"
            )}
        >
            <Link href={item.href} className="absolute inset-0 z-30">
                <span className="sr-only">Explore {item.title}</span>
            </Link>

            {/* Premium Shine Effect on Hover */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
            </div>

            {/* ShineBorder for Featured items only */}
            {isLarge && !isTall && (
                <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem] md:rounded-[2rem]">
                    <ShineBorder
                        className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[1.5rem] md:rounded-[2rem]"
                        shineColor={["#FFFFFF", "#F5A623", "#FFFFFF"]}
                        borderWidth={1.5}
                    >
                        <div />
                    </ShineBorder>
                </div>
            )}

            {/* Image Layer - Floating Bottle with improved mobile positioning */}
            <div className={cn(
                "absolute z-10 transition-all duration-700 ease-out",
                // MOBILE: Right-aligned bottles with LARGER sizing, proper vertical alignment
                "right-[-10%] bottom-[-10%] w-[65%] h-[90%]",
                // DESKTOP: Original dynamic positioning
                isLarge && !isTall ? "md:right-[-5%] md:bottom-[-10%] md:w-[55%] md:h-[90%] group-hover:scale-105 group-hover:-rotate-2" : "",
                isTall ? "md:left-1/2 md:-translate-x-1/2 md:right-auto md:bottom-[-10%] md:w-[90%] md:h-[70%] group-hover:scale-110 group-hover:translate-y-[-10px]" : "",
                !isLarge && !isTall ? "md:right-[-15%] md:bottom-[-15%] md:w-[70%] md:h-[80%] group-hover:scale-110 group-hover:-rotate-6" : ""
            )}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] md:drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                    priority={isLarge}
                />
            </div>

            {/* Content Layer with improved mobile padding */}
            <div className="absolute inset-0 z-20 p-5 md:p-6 flex flex-col justify-between">
                <div className="max-w-[55%] md:max-w-none">
                    {/* Featured Badge */}
                    {index === 0 && (
                        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 text-black/90 dark:text-white/90 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
                            Featured
                        </div>
                    )}

                    <h3 className={cn(
                        "font-serif font-bold leading-tight tracking-tight drop-shadow-md text-slate-900 dark:text-white",
                        // MOBILE: Consistent title sizing across all cards
                        "text-2xl",
                        // DESKTOP: Larger titles for featured cards
                        isLarge && !isTall ? "md:text-5xl lg:text-6xl md:max-w-[60%]" : "md:text-2xl lg:text-3xl"
                    )}>
                        {item.title}
                    </h3>

                    {/* Description - visible on mobile for all cards, with line clamp */}
                    <p className={cn(
                        "text-slate-700 dark:text-white/80 text-xs md:text-sm mt-1.5 md:mt-2 drop-shadow-sm font-medium line-clamp-2",
                        // DESKTOP: Show on hover for non-large cards
                        !isLarge && "md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300"
                    )}>
                        {item.description}
                    </p>
                </div>

                {/* Bottom Action Area - Hidden on mobile for cleaner look */}
                <div className="hidden md:flex justify-between items-end">
                    <div className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2",
                        item.accent,
                        !isLarge ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300" : ""
                    )}>
                        Browse Collection
                        <ArrowUpRight className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Soft Overlay gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 dark:to-black/30 md:bg-gradient-to-b md:from-white/10 md:via-transparent md:to-black/5 dark:md:from-black/10 dark:md:via-transparent dark:md:to-black/20 pointer-events-none" />
        </motion.div>
    );
}

// Add keyframe for custom shine animation in global CSS if not present, or assume Framer motion handles most interaction.
