"use client"

import { motion } from "framer-motion"
import { cn, formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface MiniMarqueeItem {
    id: string
    name: string
    brand: string
    image: string
    price: number
    href: string
}

interface MiniMarqueeProps {
    items: MiniMarqueeItem[]
    speed?: number
    className?: string
}

export function MiniMarquee({ items, speed = 25, className }: MiniMarqueeProps) {
    const duplicatedItems = [...items, ...items]

    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-3 w-max"
                animate={{ x: "-50%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <Link
                        key={`${item.id}-${index}`}
                        href={item.href}
                        className="group flex items-center gap-3 bg-zinc-800/30 hover:bg-zinc-800/60 p-2 pr-4 rounded-xl border border-white/5 transition-colors w-[180px] flex-shrink-0"
                    >
                        <div className="h-10 w-10 relative bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-1 transition-transform group-hover:scale-110"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest line-clamp-1">{item.brand}</p>
                            <h6 className="text-[10px] text-zinc-100 font-bold truncate group-hover:text-amber-400 transition-colors">{item.name}</h6>
                            <p className="text-[9px] text-zinc-500 font-medium">{formatPrice(item.price)}</p>
                        </div>
                    </Link>
                ))}
            </motion.div>
        </div>
    )
}
