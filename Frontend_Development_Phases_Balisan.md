# Frontend Development Phases: Balisan Liquor Store

**Tech Stack:** Next.js 14+ (App Router), TypeScript, shadcn/ui, Tailwind CSS, Zustand  
**Timeline:** 20 Weeks

---

## Pre-Built Component Libraries to Use

> **Strategy:** Leverage the shadcn ecosystem heavily. Build custom only when no pre-built option exists.

### Primary Libraries

| Library           | Source                                                                                      | Use For                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **CommerCN**      | [commercn.com](https://commercn.com) / [GitHub](https://github.com/Logging-Studio/commercn) | Cart blocks, product cards, checkout UI, e-commerce specific components |
| **Commerce-UI**   | [github.com/stackzero-labs/ui](https://github.com/stackzero-labs/ui)                        | Product listings, shopping cart, e-commerce pages                       |
| **Origin UI**     | [originui.com](https://originui.com)                                                        | 400+ base components, inputs, buttons, navigation                       |
| **Magic UI**      | [magicui.design](https://magicui.design)                                                    | Animated components, hero sections, visual effects                      |
| **Aceternity UI** | [ui.aceternity.com](https://ui.aceternity.com)                                              | Premium animations, spotlight effects, 3D cards                         |
| **Shadcn Blocks** | [shadcnblocks.com](https://shadcnblocks.com)                                                | Product galleries, checkout forms, marketing sections                   |

### Specialized Components

| Component Need             | Library/Block                                | Install Command                                                    |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **Product Gallery + Zoom** | Shadcn Blocks Product Gallery 2              | Copy from shadcnblocks.com                                         |
| **Image Zoom**             | @shadcn/image-zoom (react-medium-image-zoom) | `npx shadcn add image-zoom`                                        |
| **Data Tables**            | shadcn-table                                 | `npx shadcn add table` + tanstack                                  |
| **Multi-Select**           | Shadcn Extension                             | [shadcn-extension.vercel.app](https://shadcn-extension.vercel.app) |
| **Date Picker**            | UI-X date-picker                             | [ui-x.vercel.app](https://ui-x.vercel.app)                         |
| **Auto-Form**              | @shadcn/auto-form                            | Dynamic forms from Zod schemas                                     |
| **Command Palette**        | cmdk                                         | Already in shadcn                                                  |
| **Rich Text Editor**       | Plate                                        | [platejs.org](https://platejs.org)                                 |
| **Calendar**               | Big Calendar                                 | Full-featured scheduling                                           |
| **Drawer**                 | Vaul                                         | Unstyled mobile drawer                                             |

---

## Phase 1: Foundation (Weeks 1-4)

### Objectives
- Project setup with shadcn/ui + Tailwind
- Age gate modal (compliance)
- Authentication flows
- Base layout (header, footer, mobile nav)

### Pre-Built Components to Install

```bash
# Core shadcn components
npx shadcn add button card dialog input form label toast dropdown-menu sheet avatar separator

# From Origin UI
# Copy: buttons, inputs, navigation patterns

# From Magic UI
# Copy: animated background, text effects for hero
```

### Components Breakdown

| Feature             | Source                    | Custom Work                  |
| ------------------- | ------------------------- | ---------------------------- |
| Age Gate Modal      | shadcn `Dialog`           | Style with brand colors      |
| Header              | Origin UI navbar patterns | Add cart badge, account menu |
| Mobile Navigation   | shadcn `Sheet`            | Bottom nav styling           |
| Auth Forms          | shadcn `Form` + auto-form | Wire to API                  |
| Toast Notifications | shadcn `Toast` + Sonner   | Brand colors                 |

### Pages
- `/` — Homepage shell
- `/login`, `/signup`, `/forgot-password`
- `/terms`, `/privacy`

---

## Phase 2: Product Discovery (Weeks 5-8)

### Objectives
- Product listing pages with filtering
- Product detail pages with gallery
- Algolia search integration
- Category navigation

### Pre-Built Components to Install

```bash
# shadcn components
npx shadcn add tabs accordion carousel slider checkbox badge pagination command popover hover-card skeleton aspect-ratio

# From CommerCN
# - Product Card blocks
# - Category navigation blocks

# From Shadcn Blocks
# - Product Gallery 2 (with PhotoSwipe zoom)
# - Filter sidebar patterns

# From Commerce-UI (stackzero-labs)
# - Product list components
# - Quick view modal
```

### Components Breakdown

| Feature              | Source                          | Custom Work          |
| -------------------- | ------------------------------- | -------------------- |
| Product Card         | CommerCN                        | Add Balisan branding |
| Product Grid         | Commerce-UI product-list        | Responsive layout    |
| Image Gallery + Zoom | Shadcn Blocks Product Gallery 2 | Integrate PhotoSwipe |
| Filter Sidebar       | Shadcn Blocks                   | Add price slider     |
| Search Autocomplete  | shadcn `Command` + Algolia      | Wire to Algolia API  |
| Category Cards       | CommerCN                        | Style with icons     |
| Quick View Modal     | Commerce-UI                     | Simplify for MVP     |
| Breadcrumbs          | Shadcn Extension                | Direct install       |
| Rating Stars         | Origin UI / shadcn examples     | Copy pattern         |

### Pages
- `/shop`, `/shop/[category]`, `/shop/[category]/[subcategory]`
- `/products/[slug]`
- `/collections/[slug]`
- `/search`

---

## Phase 3: Cart & Checkout (Weeks 9-12)

### Objectives
- Shopping cart with persistence
- Multi-step checkout
- Stripe payment integration
- Delivery scheduling

### Pre-Built Components to Install

```bash
# shadcn components
npx shadcn add table radio-group switch textarea progress calendar scroll-area alert-dialog

# From CommerCN (Primary source for e-commerce)
# - Cart Item blocks (quantity selector, remove)
# - Cart Summary block
# - Mini Cart drawer
# - Checkout form blocks
# - Order summary block

# From Shadcn Blocks
# - Checkout page blocks
# - Address form patterns
# - Payment form patterns
```

### Components Breakdown

| Feature            | Source                     | Custom Work               |
| ------------------ | -------------------------- | ------------------------- |
| Cart Item Row      | CommerCN cart-item         | Integrate with Zustand    |
| Quantity Selector  | CommerCN                   | Already built             |
| Mini Cart Drawer   | CommerCN / shadcn `Sheet`  | Add animation             |
| Cart Summary       | CommerCN                   | Add promo code input      |
| Checkout Progress  | Shadcn Blocks              | Step indicator            |
| Address Form       | Shadcn Blocks + auto-form  | Google Places integration |
| Delivery Scheduler | shadcn `Calendar` + custom | Time slot logic           |
| Payment Form       | Stripe Elements            | Stripe SDK                |
| Order Confirmation | CommerCN order block       | Email trigger             |

### Pages
- `/cart`
- `/checkout`, `/checkout/information`, `/checkout/shipping`, `/checkout/payment`
- `/checkout/confirmation`

---

## Phase 4: Account Management (Weeks 13-14)

### Objectives
- User dashboard
- Order history with tracking
- Address book, payment methods
- Favorites/wishlist

### Pre-Built Components to Install

```bash
# shadcn components
npx shadcn add data-table avatar badge switch

# From shadcn-table
# - Data table with sorting, filtering, pagination

# From Origin UI
# - Dashboard card patterns
# - Settings form patterns

# From Shadcn Blocks
# - Account section blocks
# - Order history blocks
```

### Components Breakdown

| Feature               | Source                      | Custom Work        |
| --------------------- | --------------------------- | ------------------ |
| Account Sidebar       | Origin UI nav patterns      | Section links      |
| Dashboard Stats Cards | Origin UI / shadcn `Card`   | Quick stats        |
| Order History Table   | shadcn-table (tanstack)     | Status badges      |
| Order Detail          | Shadcn Blocks               | Tracking timeline  |
| Address Manager       | Shadcn Blocks form patterns | CRUD operations    |
| Favorites Grid        | Reuse Product Card          | Add reorder button |
| Preferences Form      | Origin UI settings          | Toggle switches    |

### Pages
- `/account`
- `/account/orders`, `/account/orders/[id]`
- `/account/addresses`, `/account/payments`
- `/account/favorites`, `/account/preferences`

---

## Phase 5: Content & SEO (Weeks 14-15)

### Objectives
- Complete homepage with all sections
- Blog/Journal with recipes
- Static pages (About, FAQ, Contact)
- SEO optimization

### Pre-Built Components to Install

```bash
# From Magic UI / Aceternity UI
# - Hero section with animations
# - Feature sections
# - Testimonial carousels

# From Shadcn Blocks
# - FAQ accordion blocks
# - Newsletter signup blocks
# - Contact form blocks
# - Blog card patterns
```

### Components Breakdown

| Feature             | Source                         | Custom Work          |
| ------------------- | ------------------------------ | -------------------- |
| Hero Section        | Magic UI animated hero         | Brand imagery        |
| Featured Categories | Magic UI / Aceternity cards    | Product counts       |
| Product Carousel    | shadcn `Carousel`              | New arrivals         |
| Newsletter Signup   | Shadcn Blocks                  | SendGrid integration |
| FAQ Accordion       | shadcn `Accordion`             | Content              |
| Blog Cards          | Shadcn Blocks article patterns | MDX integration      |
| Recipe Cards        | Custom based on blog cards     | Ingredient links     |
| Contact Form        | Shadcn Blocks                  | Email handling       |

### Pages
- `/` (complete homepage)
- `/about`, `/contact`, `/faq`, `/delivery`
- `/journal`, `/journal/[slug]`
- `/recipes`, `/recipes/[slug]`

---

## Phase 6: Polish (Weeks 16-17)

### Focus Areas
- Performance optimization (LCP <2.5s)
- Accessibility audit (WCAG 2.1 AA)
- Animation polish
- Error tracking (Sentry)
- Analytics (GA4, Facebook Pixel)

### Animation Libraries
- **Framer Motion** — Already in Aceternity/Magic UI
- **Auto Animate** — Add to lists for smooth transitions

---

## Phase 7: Launch (Weeks 18-20)

### Milestones
- Week 18: Soft launch (200 beta users)
- Week 19: Feedback fixes, load testing
- Week 20: Full production launch

---

## Summary: Build vs. Use Pre-Built

| Category            | Pre-Built                 | Custom Build            |
| ------------------- | ------------------------- | ----------------------- |
| E-commerce blocks   | **CommerCN, Commerce-UI** | ❌                       |
| Product gallery     | **Shadcn Blocks**         | ❌                       |
| Checkout forms      | **Shadcn Blocks**         | ❌                       |
| Data tables         | **shadcn-table**          | ❌                       |
| Animations          | **Magic UI, Aceternity**  | ❌                       |
| Base components     | **Origin UI, shadcn**     | ❌                       |
| Age Gate Modal      | —                         | ✅ (compliance-specific) |
| Delivery Scheduler  | —                         | ✅ (time slot logic)     |
| Algolia Integration | —                         | ✅ (API wiring)          |
| Stripe Integration  | —                         | ✅ (payment flow)        |

**Estimated custom components: ~10 (vs. 50+ previously)**
