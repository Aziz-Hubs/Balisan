# Phase 4: Account Management

**Duration:** Weeks 13-14  
**Status:** Not Started

---

## Objectives

- Build user account dashboard
- Implement order history with tracking
- Create address book management
- Add payment methods management
- Build favorites/wishlist functionality
- Create communication preferences

---

## Pre-Built Libraries to Install

### shadcn Components

```bash
npx shadcn add data-table avatar badge switch alert
```

### External Libraries

| Library            | Purpose         | Install                       |
| ------------------ | --------------- | ----------------------------- |
| **TanStack Table** | Data tables     | `npm i @tanstack/react-table` |
| **date-fns**       | Date formatting | Already installed             |

### Pre-Built Blocks

| Source            | Blocks to Use                     |
| ----------------- | --------------------------------- |
| **Origin UI**     | Dashboard cards, settings forms   |
| **Shadcn Blocks** | Account sections, order history   |
| **shadcn-table**  | Data table with sorting/filtering |

---

## Components Breakdown

| Component           | Source                | Notes                          |
| ------------------- | --------------------- | ------------------------------ |
| Account Sidebar     | Origin UI nav         | Section navigation             |
| Dashboard Stats     | shadcn `Card`         | Order count, points, favorites |
| Order History Table | shadcn-table          | Status badges, pagination      |
| Order Detail        | Shadcn Blocks         | Timeline, items, tracking      |
| Tracking Timeline   | Custom                | Visual progress                |
| Address Card        | Shadcn Blocks         | Display with actions           |
| Address Form        | Reuse from checkout   | CRUD modal                     |
| Payment Card        | Origin UI             | Last 4 digits display          |
| Favorites Grid      | Reuse ProductCard     | Add reorder button             |
| Quick Reorder       | Custom                | One-click add to cart          |
| Preferences Form    | Origin UI settings    | Toggle switches                |
| Account Menu        | shadcn `DropdownMenu` | Header dropdown                |

---

## Order Status Flow

```
pending → processing → shipped → out_for_delivery → delivered
                   ↘ canceled
```

### Status Badges

| Status           | Color  | Icon    |
| ---------------- | ------ | ------- |
| Pending          | Yellow | Clock   |
| Processing       | Blue   | Package |
| Shipped          | Purple | Truck   |
| Out for Delivery | Orange | MapPin  |
| Delivered        | Green  | Check   |
| Canceled         | Red    | X       |

---

## Pages to Build

| Route                  | Purpose                | Rendering |
| ---------------------- | ---------------------- | --------- |
| `/account`             | Dashboard overview     | SSR       |
| `/account/orders`      | Order history          | SSR       |
| `/account/orders/[id]` | Order detail           | SSR       |
| `/account/addresses`   | Address book           | SSR       |
| `/account/payments`    | Payment methods        | SSR       |
| `/account/favorites`   | Saved products         | SSR       |
| `/account/preferences` | Communication settings | SSR       |

---

## Route Protection

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth-token");
  
  if (request.nextUrl.pathname.startsWith("/account")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
```

---

## Directory Structure

```
/src/app
└── /account
    ├── layout.tsx (with sidebar)
    ├── page.tsx (dashboard)
    ├── /orders
    │   ├── page.tsx
    │   └── /[id]/page.tsx
    ├── /addresses/page.tsx
    ├── /payments/page.tsx
    ├── /favorites/page.tsx
    └── /preferences/page.tsx

/src/components/features/account
├── AccountSidebar.tsx
├── DashboardStats.tsx
├── OrdersTable.tsx
├── OrderDetail.tsx
├── OrderTimeline.tsx
├── AddressManager.tsx
├── AddressCard.tsx
├── PaymentMethodCard.tsx
├── FavoritesList.tsx
├── QuickReorder.tsx
└── PreferencesForm.tsx
```

---

## API Endpoints Used

```typescript
// Orders
GET    /api/orders              // List user orders
GET    /api/orders/:id          // Order detail
GET    /api/orders/:id/tracking // Tracking info

// Addresses
GET    /api/addresses           // List addresses
POST   /api/addresses           // Create address
PATCH  /api/addresses/:id       // Update address
DELETE /api/addresses/:id       // Delete address

// Favorites
GET    /api/favorites           // List favorites
POST   /api/favorites           // Add favorite
DELETE /api/favorites/:id       // Remove favorite

// Preferences
GET    /api/preferences         // Get preferences
PATCH  /api/preferences         // Update preferences
```

---

## Acceptance Criteria

- [ ] Dashboard shows order count, favorite count, points
- [ ] Order history supports pagination and search
- [ ] Order detail shows tracking timeline
- [ ] Real-time tracking updates (Onfleet)
- [ ] Addresses can be added, edited, deleted
- [ ] Default address can be set
- [ ] Payment methods link to Stripe Customer Portal
- [ ] Favorites can be added/removed from PDP
- [ ] One-click reorder adds items to cart
- [ ] Email preferences update with toast
- [ ] All pages work on mobile
- [ ] Logout clears state and redirects

---

## Dependencies

| External                     | Internal            |
| ---------------------------- | ------------------- |
| Order tracking API (Onfleet) | Phase 3 complete    |
| Address validation           | Checkout working    |
| Stripe Customer Portal       | Payment integration |

---

## Deliverables

1. ✅ Account dashboard
2. ✅ Order history with tracking
3. ✅ Address book (CRUD)
4. ✅ Payment methods management
5. ✅ Favorites/wishlist
6. ✅ Communication preferences
