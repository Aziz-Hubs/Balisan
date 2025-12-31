"use client"

import * as React from "react"
import Image from "next/image"
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
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
            {/* View Mode Switcher - Disabled due to dependency issues */}
            {/* <div className="flex gap-2 justify-center lg:justify-start">
                <button
                    onClick={() => setViewMode('gallery')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        viewMode === 'gallery' ? "bg-primary text-white shadow-md" : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                    )}
                >
                    <Maximize2 className="h-4 w-4" /> Gallery
                </button>
                <button
                    onClick={() => setViewMode('3d')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        viewMode === '3d' ? "bg-primary text-white shadow-md" : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
                    )}
                >
                    <Box className="h-4 w-4" /> 3D View
                </button>
            </div> */}

            <div className="relative aspect-square rounded-xl border bg-secondary/5 overflow-hidden group">
                <div
                    className="w-full h-full [&>div]:w-full [&>div]:h-full [&>div>div]:w-full [&>div>div]:h-full"
                    id="product-gallery"
                >
                    <Zoom>
                        <div className="relative w-full h-full cursor-zoom-in">
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
                                className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Maximize2 className="h-5 w-5 text-gray-700" />
                            </a>
                        </div>
                    </Zoom>
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
