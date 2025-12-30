# Navigation Components Documentation

This directory contains the core layout components for the Balisan Liquor Store navigation system.

## Components

### `<Header />`
The main site header featuring:
- Sticky positioning with scroll-based visual transformation
- Integrated `PromotionalBanner`
- `MobileNav` trigger (mobile)
- Logo
- `MegaMenu` (desktop)
- `SearchBar`
- `CartDrawer`
- `AccountMenu`

**Usage:**
```tsx
import { Header } from "@/components/layouts/Header"
// Use in root layout
```

### `<MegaMenu />`
Desktop navigation menu with 3-column layout:
1. Category Highlight (Banner)
2. Subcategories (Nested list)
3. Featured Products/Promotions

**Configuration:**
- Data source: `src/config/navigation.ts`
- Images: Uses `CategoryImage` for optimized loading

### `<MobileNav />`
Mobile drawer navigation using `Sheet` and `Accordion`:
- Nested category browsing
- Integrated `SearchBar`
- Account and Cart quick access
- Age verification indicator

### `<SearchBar />`
Global search component using `Command+K` interface:
- Scopes: Products, Categories, Pages
- Recent searches history (persisted in local storage via `useSearchStore`)
- Keyboard navigation support

### `<PromotionalBanner />`
Dismissible banner for announcements.
**Props:**
- `messages`: Array of messages to rotate
- `autoRotate`: Boolean (default: true)

## State Management

Navigation state is handled by `useNavigationStore` (`src/lib/stores/navigation.ts`):
- `activeMegaMenu`: Current open category
- `isMobileMenuOpen`: Mobile drawer state
- `dismissedBanners`: Persisted list of dismissed banner IDs

## Accessibility Features

- **Keyboard Navigation:** Full support for Tab traversal, Escape to close, and Arrow keys in menus.
- **Screen Readers:** ARIA labels and roles implemented.
- **Focus Management:** Focus trapping in mobile drawer.
- **Reduced Motion:** Respects user preferences for animations.

## Configuration

Modify `src/config/navigation.ts` to update:
- Navigation categories and links
- Feature images
- Static page links

## Icons
Uses `lucide-react` for all iconography.
