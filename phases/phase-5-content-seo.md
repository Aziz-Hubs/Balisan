# Phase 5: Content & SEO

**Duration:** Weeks 14-15  
**Status:** Not Started

---

## Objectives

- Complete homepage with all sections
- Build Journal/blog with categories
- Create recipe pages with shoppable ingredients
- Implement static pages (About, FAQ, Contact)
- Add comprehensive SEO (meta, structured data, sitemap)
- Integrate newsletter signup

---

## Pre-Built Libraries to Install

### External Libraries

| Library          | Purpose             | Install                          |
| ---------------- | ------------------- | -------------------------------- |
| **MDX**          | Blog content        | `npm i @next/mdx @mdx-js/loader` |
| **next-sitemap** | Sitemap generation  | `npm i next-sitemap`             |
| **@vercel/og**   | OG image generation | `npm i @vercel/og`               |

### Pre-Built Blocks

| Source            | Blocks to Use                           |
| ----------------- | --------------------------------------- |
| **Magic UI**      | Hero section, animated backgrounds      |
| **Aceternity UI** | Feature cards, testimonials             |
| **Shadcn Blocks** | FAQ accordion, newsletter, contact form |

---

## Components Breakdown

| Component             | Source             | Notes                    |
| --------------------- | ------------------ | ------------------------ |
| Hero Section          | Magic UI           | Animated gradient, CTA   |
| Featured Categories   | Aceternity cards   | Visual category grid     |
| New Arrivals Carousel | shadcn `Carousel`  | Product slider           |
| Staff Picks Grid      | Aceternity cards   | Curator quotes           |
| Newsletter Signup     | Shadcn Blocks      | Email input + CTA        |
| FAQ Accordion         | shadcn `Accordion` | Expandable Q&A           |
| Blog Card             | Shadcn Blocks      | Article preview          |
| Article Content       | MDX                | Rich text + components   |
| Recipe Card           | Custom             | Ingredients, add-to-cart |
| Shoppable Ingredients | Custom             | Linked products          |
| Contact Form          | Shadcn Blocks      | Email handling           |
| Trust Badges          | Custom             | Payment, shipping icons  |

---

## Homepage Sections

```
1. Hero Section
   - Full-width lifestyle image
   - "Curated Spirits, Delivered" headline
   - Shop Now CTA

2. Featured Categories (5 cards)
   - Spirits, Wine, Beer, Mixers, Gifts
   - Visual icons + product counts

3. New Arrivals Carousel
   - Horizontal product slider
   - Quick-add buttons

4. Staff Picks Grid (2x3)
   - Larger cards with curator notes

5. Newsletter Signup
   - "Get 10% off your first order"
   - Email input

6. Trust Section
   - Payment badges
   - Shipping info
   - Age verification note

7. Footer
   - Category links
   - Company links
   - Legal links
   - Social icons
```

---

## SEO Configuration

### Metadata

```typescript
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Balisan | Curated Spirits, Delivered",
    template: "%s | Balisan",
  },
  description: "Discover exceptional craft spirits, fine wines, and artisanal beverages. Premium selection, expert curation, delivered to your door.",
  keywords: ["liquor store", "craft spirits", "wine delivery", "whiskey", "gin"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://balisan.com",
    siteName: "Balisan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@balisan",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Structured Data

```typescript
// components/seo/ProductSchema.tsx
export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
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
          reviewCount: product.reviewCount,
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
```

### Sitemap

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://balisan.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/account/*", "/checkout/*", "/cart"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://balisan.com/server-sitemap.xml", // Dynamic products
    ],
  },
};
```

---

## Pages to Build

| Route                 | Purpose             | Rendering |
| --------------------- | ------------------- | --------- |
| `/`                   | Homepage (complete) | SSG + ISR |
| `/about`              | Brand story         | SSG       |
| `/contact`            | Contact form        | SSG       |
| `/faq`                | FAQ accordion       | SSG       |
| `/delivery`           | Delivery info       | SSG       |
| `/journal`            | Blog listing        | SSR + ISR |
| `/journal/[category]` | Blog category       | SSR + ISR |
| `/journal/[slug]`     | Blog post           | SSR + ISR |
| `/recipes`            | Recipe listing      | SSR + ISR |
| `/recipes/[slug]`     | Recipe detail       | SSR + ISR |

---

## Blog/Journal Categories

- **Behind the Bottle** — Distillery visits, maker interviews
- **Cocktail Culture** — Recipes, trends, techniques
- **Entertaining** — Hosting tips, party planning
- **Discovery** — New arrivals, staff picks

---

## Directory Structure

```
/src/app
├── page.tsx (homepage)
├── /about/page.tsx
├── /contact/page.tsx
├── /faq/page.tsx
├── /delivery/page.tsx
├── /journal
│   ├── page.tsx
│   ├── /[category]/page.tsx
│   └── /[slug]/page.tsx
└── /recipes
    ├── page.tsx
    └── /[slug]/page.tsx

/src/components/features
├── /home
│   ├── HeroSection.tsx
│   ├── FeaturedCategories.tsx
│   ├── NewArrivalsCarousel.tsx
│   ├── StaffPicks.tsx
│   └── NewsletterSignup.tsx
├── /content
│   ├── ArticleCard.tsx
│   ├── ArticleContent.tsx
│   ├── RecipeCard.tsx
│   ├── ShoppableIngredients.tsx
│   └── FAQAccordion.tsx
└── /seo
    ├── ProductSchema.tsx
    ├── ArticleSchema.tsx
    └── RecipeSchema.tsx

/content
├── /journal
│   └── *.mdx
└── /recipes
    └── *.mdx
```

---

## Acceptance Criteria

- [ ] Homepage hero loads with LCP <2.5s
- [ ] Featured categories link correctly
- [ ] New arrivals carousel is responsive
- [ ] Newsletter signup shows success/error
- [ ] FAQ answers are crawlable (not JS-hidden)
- [ ] Blog posts render MDX correctly
- [ ] Recipes show shoppable ingredients
- [ ] Add-to-cart from recipe works
- [ ] All pages have unique meta titles/descriptions
- [ ] Structured data validates (Google Rich Results Test)
- [ ] XML sitemap includes all pages
- [ ] OG images generate for sharing
- [ ] robots.txt configured correctly
- [ ] Contact form sends emails

---

## Dependencies

| External                      | Internal             |
| ----------------------------- | -------------------- |
| Content/copy finalized        | Phase 4 complete     |
| Product images in CDN         | All core pages built |
| Newsletter service (SendGrid) | —                    |

---

## Deliverables

1. ✅ Complete homepage
2. ✅ Static pages (About, FAQ, Contact, Delivery)
3. ✅ Journal/blog with MDX
4. ✅ Recipe pages with shoppable ingredients
5. ✅ SEO optimization (meta, structured data)
6. ✅ Sitemap and robots.txt
7. ✅ Newsletter integration
