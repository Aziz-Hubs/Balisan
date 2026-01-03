# Phase 3: Shopping Cart & Checkout

**Duration:** Weeks 9-12  
**Status:** Not Started

---

## Objectives

- Implement persistent shopping cart
- Build multi-step checkout flow
- Integrate Stripe for payments
- Add gift options and delivery scheduling
- Enable guest checkout

---

## Pre-Built Libraries to Install

### shadcn Components

```bash
npx shadcn add table radio-group switch textarea progress calendar scroll-area alert-dialog
```

### External Libraries

| Library                 | Purpose              | Install                                           |
| ----------------------- | -------------------- | ------------------------------------------------- |
| **Stripe**              | Payments             | `npm i @stripe/stripe-js @stripe/react-stripe-js` |
| **React Google Places** | Address autocomplete | `npm i use-places-autocomplete`                   |
| **date-fns**            | Date handling        | `npm i date-fns`                                  |

### Pre-Built Blocks (CommerCN)

| Block             | URL                                      |
| ----------------- | ---------------------------------------- |
| Cart Item         | commercn.com/docs/carts/cart-item-01     |
| Cart Summary      | commercn.com/docs/carts/cart-summary     |
| Mini Cart         | commercn.com/docs/carts/mini-cart        |
| Quantity Selector | commercn.com/docs/inputs/quantity        |
| Order Summary     | commercn.com/docs/checkout/order-summary |

---

## Components Breakdown

| Component          | Source                       | Notes                            |
| ------------------ | ---------------------------- | -------------------------------- |
| Add to Cart Button | Custom                       | Animated with quantity feedback  |
| Quantity Selector  | CommerCN                     | +/- buttons                      |
| Cart Item Row      | CommerCN                     | Image, details, quantity, remove |
| Cart Summary       | CommerCN                     | Subtotal, tax, shipping, total   |
| Mini Cart Drawer   | CommerCN + shadcn `Sheet`    | Slide from right                 |
| Cart Badge         | Custom                       | Animated bounce on add           |
| Checkout Progress  | Shadcn Blocks                | Step indicator (1-2-3-4)         |
| Address Form       | Shadcn Blocks + auto-form    | Google Places integration        |
| Shipping Options   | shadcn `RadioGroup`          | Delivery methods                 |
| Delivery Scheduler | Custom                       | Date picker + time slots         |
| Payment Form       | Stripe Elements              | Secure card input                |
| Gift Options       | shadcn `Switch` + `Textarea` | Wrapping, message                |
| Promo Code Input   | shadcn `Input`               | Validation                       |
| Order Confirmation | CommerCN                     | Order number, summary            |

---

## Zustand Cart Store

```typescript
// lib/stores/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.productId === item.productId);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "balisan-cart" }
  )
);
```

---

## Stripe Integration

```typescript
// lib/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// components/features/checkout/PaymentForm.tsx
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export function PaymentForm({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
```

---

## Checkout Flow

```
Step 1: Information
├── Contact info (email, phone)
├── Shipping address (Google Places autocomplete)
└── Age verification reminder

Step 2: Shipping
├── Delivery method (standard, express, same-day)
├── Delivery date picker
└── Time slot selection (2-hour windows)

Step 3: Payment
├── Payment method (card, Apple Pay, Google Pay)
├── Billing address (same as shipping toggle)
├── Gift options (wrapping, message)
└── Promo code

Step 4: Confirmation
├── Order summary
├── Order number
├── Estimated delivery
└── Email confirmation sent
```

---

## Pages to Build

| Route                    | Purpose            | Rendering |
| ------------------------ | ------------------ | --------- |
| `/cart`                  | Full cart page     | CSR       |
| `/checkout`              | Checkout container | SSR       |
| `/checkout/information`  | Contact + shipping | CSR       |
| `/checkout/shipping`     | Delivery options   | CSR       |
| `/checkout/payment`      | Payment + gift     | CSR       |
| `/checkout/confirmation` | Order success      | SSR       |

---

## Directory Structure

```
/src/app
├── /cart/page.tsx
└── /checkout
    ├── layout.tsx
    ├── page.tsx (redirect to /information)
    ├── /information/page.tsx
    ├── /shipping/page.tsx
    ├── /payment/page.tsx
    └── /confirmation/page.tsx

/src/components/features
├── /cart
│   ├── AddToCartButton.tsx
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   ├── MiniCart.tsx
│   ├── CartBadge.tsx
│   └── QuantitySelector.tsx
└── /checkout
    ├── CheckoutProgress.tsx
    ├── AddressForm.tsx
    ├── ShippingOptions.tsx
    ├── DeliveryScheduler.tsx
    ├── PaymentForm.tsx
    ├── GiftOptions.tsx
    ├── PromoCodeInput.tsx
    └── OrderConfirmation.tsx
```

---

## Acceptance Criteria

- [ ] Add to cart shows animated toast
- [ ] Cart badge bounces on item add
- [ ] Mini cart drawer opens/closes smoothly
- [ ] Quantity updates reflect immediately (optimistic UI)
- [ ] Cart persists across sessions (localStorage)
- [ ] Guest checkout works without account
- [ ] Checkout validates age before payment
- [ ] Address autocomplete works (Google Places)
- [ ] Delivery slots show available 2-hour windows
- [ ] Gift message supports 200 characters
- [ ] Stripe payment form loads securely
- [ ] 3D Secure handles additional auth
- [ ] Order confirmation shows order number
- [ ] Confirmation email triggerd
- [ ] Mobile checkout is touch-friendly

---

## Dependencies

| External                  | Internal                 |
| ------------------------- | ------------------------ |
| Stripe account configured | Phase 2 complete         |
| Cart API endpoints        | Product pages functional |
| Address validation API    | User authentication      |
| Tax calculation service   | —                        |

---

## Deliverables

1. ✅ Add-to-cart functionality
2. ✅ Cart page with item management
3. ✅ Mini cart drawer
4. ✅ Multi-step checkout
5. ✅ Stripe payment integration
6. ✅ Delivery scheduling
7. ✅ Gift options
