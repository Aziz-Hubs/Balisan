# Phase D3: High-Efficiency Commerce & Gifting

**Duration:** Weeks 7-9  
**Status:** Not Started

---

## Objectives
- Optimize commerce flows for productivity and high-volume orders.
- Build specialized tools for corporate and multi-recipient gifting.

---

## Components & Features

| Feature                   | Description                                                              | Technical Implementation             |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| **Active Workspace Cart** | Slide-over cart that allows management while browsing other categories.  | `radix-ui/dialog` (Sheet) + Zustand  |
| **Multi-Address Manager** | Bulk management of recipient addresses for holiday gifting.              | Custom data table with batch actions |
| **Corporate CSV Upload**  | Upload spreadsheets of recipients for automated order routing.           | `papaparse` for CSV parsing          |
| **Quick-Refine Filters**  | "Type-to-filter" inside checkout/cart for large gift lists.              | Client-side fuzzy search             |
| **Floating Action Bar**   | Contextual footer for bulk actions (select multiple -> add to wishlist). | `framer-motion`                      |

---

## Deliverables
1. ✅ Redesigned Workspace Cart with drag-and-drop quantities.
2. ✅ Batch Gifting interface for multi-address orders.
3. ✅ CSV Import tool for corporate accounts.
4. ✅ Floating bulk-action bar on listing pages.

---

## Acceptance Criteria
- [ ] User can manage 10+ gift recipients in a single session without page reloads.
- [ ] CSV upload handles up to 500 lines with real-time validation.
- [ ] Cart updates remain performant with 50+ unique items.
- [ ] Mobile-responsive fallback for all desktop-first features.
