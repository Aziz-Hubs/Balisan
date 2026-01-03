export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
    interface Window {
        gtag: (command: string, id: string | undefined, params?: object) => void;
    }
}

export function pageview(url: string) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
    }
}

export function event(action: string, params: object) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, params);
    }
}

export const trackAddToCart = (item: { productId: string; name: string; price: number }) => {
    event("add_to_cart", {
        currency: "JOD",
        value: item.price,
        items: [{ item_id: item.productId, item_name: item.name }],
    });
};
