# Phase 2: Product Discovery

**Duration:** Weeks 5-8  
**Status:** Not Started

---

## Objectives

- Build product listing pages (PLP) with grid/list views
- Create product detail pages (PDP) with image gallery
- Implement Algolia search with autocomplete
- Build category navigation with visual subcategories
- Add filtering and sorting functionality

---

## Pre-Built Libraries to Install

### shadcn Components

```bash
npx shadcn add tabs accordion carousel slider checkbox badge pagination command popover hover-card skeleton aspect-ratio scroll-area
```

### External Libraries

| Library            | Purpose        | Install                                   |
| ------------------ | -------------- | ----------------------------------------- |
| **Algolia**        | Search         | `npm i algoliasearch react-instantsearch` |
| **Embla Carousel** | Carousels      | Included with shadcn carousel             |
| **PhotoSwipe**     | Image lightbox | `npm i photoswipe`                        |

### Pre-Built Blocks

| Source            | Blocks to Use                  |
| ----------------- | ------------------------------ |
| **CommerCN**      | Product Card, Category Nav     |
| **Commerce-UI**   | Product List, Quick View Modal |
| **Shadcn Blocks** | Product Gallery 2 (with zoom)  |
| **Origin UI**     | Rating stars, breadcrumbs      |

---

## Components Breakdown

| Component      | Source                          | Notes                                        |
| -------------- | ------------------------------- | -------------------------------------------- |
| Product Card   | CommerCN                        | Image, brand, name, price, rating, quick-add |
| Product Grid   | Commerce-UI                     | Responsive 4-col desktop, 2-col mobile       |
| Image Gallery  | Shadcn Blocks Product Gallery 2 | PhotoSwipe zoom integration                  |
| Filter Sidebar | Shadcn Blocks                   | Price slider, checkboxes                     |
| Search Bar     | shadcn `Command`                | Algolia autocomplete                         |
| Category Cards | CommerCN                        | Visual icons, product counts                 |
| Quick View     | Commerce-UI                     | Modal product preview                        |
| Breadcrumbs    | Shadcn Extension                | Category path                                |
| Rating Stars   | Origin UI                       | Display and input                            |
| Sort Dropdown  | shadcn `Select`                 | Price, rating, newest                        |

---

## Algolia Configuration

```typescript
// lib/algolia.ts
import algoliasearch from "algoliasearch/lite";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

export const ALGOLIA_INDEX = "products";
```

### Searchable Attributes
1. Product name (highest priority)
2. Brand
3. Category, subcategory
4. Description
5. Tasting notes

### Facets for Filtering
- Category
- Subcategory
- Brand
- Price ranges
- ABV ranges
- Rating
- Region/country
- Special attributes (organic, gluten-free)

---

## Zustand Stores

```typescript
// lib/stores/filters.ts
interface FilterStore {
  category: string | null;
  subcategory: string | null;
  priceRange: [number, number];
  brands: string[];
  abvRange: [number, number];
  minRating: number;
  dietary: string[];
  sortBy: "relevance" | "price_asc" | "price_desc" | "rating" | "newest";
  viewMode: "grid" | "list";
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
}

// lib/stores/search.ts
interface SearchStore {
  query: string;
  recentSearches: string[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  toggleSearch: () => void;
}
```

---

## Pages to Build

| Route                            | Purpose             | Rendering       |
| -------------------------------- | ------------------- | --------------- |
| `/shop`                          | All products        | SSR + ISR (1hr) |
| `/shop/[category]`               | Category page       | SSR + ISR       |
| `/shop/[category]/[subcategory]` | Subcategory         | SSR + ISR       |
| `/products/[slug]`               | Product detail      | SSR + ISR       |
| `/collections/[slug]`            | Curated collections | SSR + ISR       |
| `/search`                        | Search results      | CSR             |

---

## Directory Structure

```
/src/app
├── /(shop)
│   ├── /shop
│   │   ├── page.tsx
│   │   └── /[category]
│   │       ├── page.tsx
│   │       └── /[subcategory]/page.tsx
│   ├── /products
│   │   └── /[slug]/page.tsx
│   ├── /collections
│   │   └── /[slug]/page.tsx
│   └── /search/page.tsx

/src/components/features
├── /products
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductGallery.tsx
│   ├── QuickViewModal.tsx
│   └── TastingNotes.tsx
├── /filters
│   ├── FilterSidebar.tsx
│   ├── FilterSheet.tsx (mobile)
│   ├── PriceRangeSlider.tsx
│   └── ActiveFilters.tsx
├── /search
│   ├── SearchBar.tsx
│   └── SearchResults.tsx
└── /navigation
    ├── CategoryNav.tsx
    └── Breadcrumbs.tsx
```

---

## Acceptance Criteria

- [ ] PLP displays products in responsive grid (4 cols → 2 cols)
- [ ] Filtering updates URL params (shareable)
- [ ] Filter state persists on page refresh
- [ ] Price range slider shows min/max with visual feedback
- [ ] Search autocomplete responds in <50ms
- [ ] PDP loads with LCP <2.5s
- [ ] Image gallery supports zoom (PhotoSwipe)
- [ ] Related products carousel shows 4+ items
- [ ] Mobile filter sheet slides from bottom
- [ ] Category navigation shows icons and counts
- [ ] All images use blur placeholders
- [ ] Breadcrumbs update correctly

---

## Dependencies

| External                | Internal                  |
| ----------------------- | ------------------------- |
| Algolia index populated | Phase 1 complete          |
| Product API endpoints   | Authentication working    |
| Product images in CDN   | Design system established |

---

## Deliverables

1. ✅ Product Listing Pages with filters
2. ✅ Product Detail Pages with gallery
3. ✅ Algolia search integration
4. ✅ Category navigation
5. ✅ Collections pages
