export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
    interface Window {
        fbq: (command: string, name: string, options?: object) => void;
    }
}

export function pageview() {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
    }
}

export function event(name: string, options = {}) {
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", name, options);
    }
}
