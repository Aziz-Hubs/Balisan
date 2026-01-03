"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { X, ShoppingCart } from "lucide-react";
import ShimmerButton from "@/components/ui/extension/ShimmerButton";
import { useCartStore } from "@/lib/stores/cart";
import { toast } from "sonner";

interface ProductListProps {
    products: Product[];
}


function SafeImage({ src, alt, ...props }: React.ComponentProps<typeof Image>) {
    const [error, setError] = useState(false)
    return (
        <Image
            {...props}
            src={error ? "/bottle.png" : (src || "/bottle.png")}
            alt={alt}
            onError={() => setError(true)}
        />
    )
}

export function ProductList({ products }: ProductListProps) {
    const [active, setActive] = useState<(typeof products)[number] | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        addItem({ ...product, image: product.image || "/bottle.png" });
        toast.success("Added to cart", {
            description: `${product.name} has been added to your cart.`
        });
    };

    if (products.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted-foreground">No products found.</p>
            </div>
        )
    }

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-[60]"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[70]">
                        <motion.button
                            key={`button-${active.name}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-4 w-4 text-neutral-500" />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.name}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.name}-${id}`}>
                                <div className="relative h-64 w-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center p-6">
                                    <SafeImage
                                        priority
                                        width={200}
                                        height={200}
                                        src={active.image || '/placeholder.png'}
                                        alt={active.name}
                                        className="h-full w-auto object-contain"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-amber-500 text-black border-none">
                                            {active.categories?.name || (active as any).category}
                                        </Badge>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div className="">
                                            <motion.h3
                                                layoutId={`title-${active.name}-${id}`}
                                                className="font-bold text-neutral-700 dark:text-neutral-200 text-xl font-serif"
                                            >
                                                {active.name}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`description-${active.name}-${id}`}
                                                className="text-neutral-600 dark:text-neutral-400 text-sm mt-1 uppercase tracking-wide"
                                            >
                                                {(active.brand as any)?.name || active.brand}
                                            </motion.p>
                                        </div>
                                        <Rating rating={active.rating} className="scale-75 origin-top-right" />
                                    </div>

                                    <div className="py-4">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-neutral-500 text-sm md:text-base dark:text-neutral-400 h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        >
                                            <p>{active.description}</p>
                                            {active.tasting_notes && (
                                                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 italic text-sm text-zinc-600 dark:text-zinc-300 w-full">
                                                    "{active.tasting_notes}"
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-100 dark:border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-zinc-500 tracking-wider">Price</span>
                                        <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                                            {formatPrice(active.discount_price || active.price)}
                                        </span>
                                    </div>
                                    <ShimmerButton
                                        className="h-10 px-6 rounded-full"
                                        background="#f59e0b"
                                        shimmerColor="#ffffff"
                                        onClick={(e) => handleAddToCart(e, active as Product)}
                                    >
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            <ShoppingCart className="h-4 w-4" />
                                            <span>Add to Cart</span>
                                        </div>
                                    </ShimmerButton>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full gap-4">
                {products.map((product) => (
                    <motion.div
                        layoutId={`card-${product.name}-${id}`}
                        key={product.id}
                        onClick={() => router.push(`/products/${product.slug}`)}
                        className="py-2 px-3 md:p-4 flex flex-row justify-between items-center bg-white dark:bg-zinc-900/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 rounded-2xl cursor-pointer transition-all duration-300 border border-zinc-100 dark:border-white/5 hover:border-amber-500/20 group/row mb-3 shadow-sm hover:shadow-md min-h-[100px] md:min-h-0 md:h-auto"
                    >
                        <div className="flex gap-3 flex-row items-center w-full overflow-hidden">
                            <motion.div layoutId={`image-${product.name}-${id}`} className="shrink-0 my-1">
                                <div className="h-[72px] w-[72px] md:h-16 md:w-16 relative bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2 flex items-center justify-center border border-zinc-100 dark:border-white/5">
                                    <SafeImage
                                        width={120}
                                        height={120}
                                        src={product.image || '/placeholder.png'}
                                        alt={product.name}
                                        className="h-full w-auto object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                            </motion.div>
                            <div className="flex flex-col items-start text-left min-w-0 flex-1 pr-2">
                                <motion.h3
                                    layoutId={`title-${product.name}-${id}`}
                                    className="font-bold text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-serif truncate w-full"
                                >
                                    {product.name}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${product.name}-${id}`}
                                    className="text-neutral-500 dark:text-neutral-400 text-[10px] md:text-xs uppercase tracking-wider truncate w-full mt-0.5"
                                >
                                    {(product.brand as any)?.name || product.brand}
                                </motion.p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                            <div className="flex flex-col items-end">
                                {product.discount_price ? (
                                    <>
                                        <span className="text-sm md:text-sm font-bold text-emerald-600">{formatPrice(product.discount_price)}</span>
                                        <span className="text-[10px] text-zinc-400 line-through hidden md:block">{formatPrice(product.price)}</span>
                                    </>
                                ) : (
                                    <span className="text-sm md:text-sm font-bold text-zinc-900 dark:text-white">{formatPrice(product.price)}</span>
                                )}
                            </div>
                            <motion.button
                                layoutId={`button-${product.name}-${id}`}
                                className="hidden md:block px-5 py-2 text-xs uppercase tracking-widest rounded-full font-bold bg-zinc-100 dark:bg-zinc-800 group-hover/row:bg-amber-500 group-hover/row:text-black text-zinc-500 dark:text-zinc-400 transition-all duration-300"
                            >
                                Details
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}
