# Phase 6: Polish & Optimization

**Duration:** Weeks 16-17  
**Status:** Not Started

---

## Objectives

- Comprehensive QA and bug fixing
- Performance optimization (Core Web Vitals)
- Accessibility audit (WCAG 2.1 AA)
- Animation polish and micro-interactions
- Analytics implementation
- Error tracking setup

---

## Performance Targets

### Core Web Vitals

| Metric                              | Target | Tool        |
| ----------------------------------- | ------ | ----------- |
| **LCP** (Largest Contentful Paint)  | <2.5s  | Lighthouse  |
| **FID** (First Input Delay)         | <100ms | Lighthouse  |
| **CLS** (Cumulative Layout Shift)   | <0.1   | Lighthouse  |
| **INP** (Interaction to Next Paint) | <200ms | Chrome UX   |
| **TTFB** (Time to First Byte)       | <600ms | WebPageTest |

### Lighthouse Scores

| Category       | Target |
| -------------- | ------ |
| Performance    | ≥90    |
| Accessibility  | ≥95    |
| Best Practices | ≥90    |
| SEO            | ≥95    |

---

## Performance Optimization

### Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};
```

### Font Optimization

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});
```

### Bundle Analysis

```bash
# Install analyzer
npm i @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

### Caching Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

---

## Accessibility Checklist

### Automated Testing

```bash
# Install axe-core
npm i -D @axe-core/react axe-core

# Add to development
// app/layout.tsx (dev only)
if (process.env.NODE_ENV === "development") {
  import("@axe-core/react").then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

### Manual Checks

- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Focus indicators visible
- [ ] Skip navigation link works
- [ ] Heading hierarchy correct (single h1)
- [ ] Color contrast ≥4.5:1
- [ ] Keyboard navigation complete
- [ ] Screen reader announces correctly
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Touch targets ≥44x44px

---

## Animation Polish

### Libraries

| Library              | Purpose                              |
| -------------------- | ------------------------------------ |
| **Framer Motion**    | Page transitions, complex animations |
| **Auto Animate**     | List animations                      |
| **Tailwind Animate** | CSS animations                       |

### Key Animations

| Element            | Animation                   |
| ------------------ | --------------------------- |
| Button hover       | Scale 102%, amber underline |
| Button press       | Scale 98%                   |
| Cart badge         | Bounce on add               |
| Toast              | Slide up with spring        |
| Modal              | Fade + scale                |
| Mini cart          | Slide from right            |
| Page transition    | Fade (200ms)                |
| Product card hover | Lift with shadow            |
| Skeleton           | Shimmer effect              |

### Reduced Motion

```typescript
// lib/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

---

## Analytics Setup

### Google Analytics 4

```typescript
// lib/analytics.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export function pageview(url: string) {
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

export function event(action: string, params: object) {
  window.gtag("event", action, params);
}

// E-commerce events
export const trackAddToCart = (item: CartItem) => {
  event("add_to_cart", {
    currency: "USD",
    value: item.price,
    items: [{ item_id: item.productId, item_name: item.name }],
  });
};

export const trackPurchase = (order: Order) => {
  event("purchase", {
    transaction_id: order.id,
    value: order.total,
    currency: "USD",
    items: order.items.map((i) => ({
      item_id: i.productId,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
};
```

### Facebook Pixel

```typescript
// lib/pixel.ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function pageview() {
  window.fbq("track", "PageView");
}

export function event(name: string, options = {}) {
  window.fbq("track", name, options);
}
```

---

## Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

---

## QA Checklist

### Functional Testing

- [ ] User registration and login
- [ ] Age verification gate
- [ ] Product search and filtering
- [ ] Add to cart from PLP and PDP
- [ ] Cart quantity updates
- [ ] Complete checkout flow
- [ ] Payment processing
- [ ] Order confirmation email
- [ ] Account order history
- [ ] Address management
- [ ] Favorites add/remove
- [ ] Newsletter signup

### Cross-Browser Testing

| Browser | Versions         |
| ------- | ---------------- |
| Chrome  | Latest, Latest-1 |
| Firefox | Latest, Latest-1 |
| Safari  | Latest, Latest-1 |
| Edge    | Latest           |

### Device Testing

| Device          | Screen Size |
| --------------- | ----------- |
| iPhone 14       | 390x844     |
| iPhone SE       | 375x667     |
| iPad            | 768x1024    |
| Android (Pixel) | 412x915     |
| Desktop         | 1920x1080   |

---

## Acceptance Criteria

- [ ] Lighthouse Performance ≥90 on all key pages
- [ ] Lighthouse Accessibility ≥95
- [ ] Lighthouse SEO ≥95
- [ ] Core Web Vitals pass
- [ ] Zero axe-core accessibility issues
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader compatible
- [ ] GA4 tracks all e-commerce events
- [ ] Sentry captures errors with stack traces
- [ ] All animations respect reduced-motion
- [ ] Bundle size <250KB gzipped
- [ ] No layout shifts (CLS <0.1)
- [ ] All QA test cases pass

---

## Dependencies

| External       | Internal                |
| -------------- | ----------------------- |
| GA4 account    | All phases complete     |
| Facebook Pixel | All features functional |
| Sentry project | —                       |

---

## Deliverables

1. ✅ All bugs from QA resolved
2. ✅ Core Web Vitals passing
3. ✅ Accessibility audit passed
4. ✅ Analytics implemented
5. ✅ Error tracking configured
6. ✅ Animations polished
