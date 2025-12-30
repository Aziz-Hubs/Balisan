interface Product {
    name: string;
    image: string;
    description: string;
    brand: string;
    price: number;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
}

export function ProductSchema({ product }: { product: Product }) {

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        brand: { "@type": "Brand", name: product.brand },
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
        },
        aggregateRating: product.rating
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount || 0,
            }
            : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
