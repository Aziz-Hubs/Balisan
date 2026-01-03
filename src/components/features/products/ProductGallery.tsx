"use client"

import * as React from "react"
import Image from "next/image"
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Lens } from "@/components/ui/extension/Lens"
import { cn } from "@/lib/utils"
import { Maximize2 } from "lucide-react"

interface ProductGalleryProps {
    images: string[]
    modelUrl?: string
}

export function ProductGallery({ images, modelUrl }: ProductGalleryProps) {
    const [viewMode, setViewMode] = React.useState<'gallery' | '3d'>('gallery');
    const [mainImage, setMainImage] = React.useState(images[0])

    // Mock model URL for demonstration if not provided
    const demoModelUrl = modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

    React.useEffect(() => {
        let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
            gallery: '#product-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox?.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="relative aspect-square rounded-xl border bg-secondary/5 overflow-hidden group">
                <div
                    className="w-full h-full [&>div]:w-full [&>div]:h-full [&>div>div]:w-full [&>div>div]:h-full"
                    id="product-gallery"
                >
                    <Lens className="w-full h-full cursor-crosshair" zoomFactor={2} lensSize={200}>
                        <div className="relative w-full h-full">
                            <Image
                                src={mainImage}
                                alt="Product image"
                                fill
                                className="object-contain p-4"
                                priority
                            />
                            <a
                                href={mainImage}
                                data-pswp-width="1200"
                                data-pswp-height="1200"
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
                                title="Enlarge image"
                            >
                                <Maximize2 className="h-5 w-5 text-gray-700" />
                            </a>
                        </div>
                    </Lens>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        className={cn(
                            "relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                            mainImage === img && viewMode === 'gallery' ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                        onClick={() => {
                            setMainImage(img);
                            setViewMode('gallery');
                        }}
                    >
                        <Image src={img} alt={`View ${idx}`} fill className="object-contain" />
                    </button>
                ))}
            </div>
        </div>
    )
}
