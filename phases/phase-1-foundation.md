# Phase 1: Foundation & Design System

**Duration:** Weeks 1-4  
**Status:** Not Started

---

## Objectives

- Establish Next.js 14+ project with App Router
- Configure shadcn/ui with Balisan brand theming
- Implement age verification gate (legal compliance)
- Build authentication flows (login, register, password reset)
- Create base layout structure (header, footer, mobile nav)

---

## Pre-Built Libraries to Install

### Core Setup

```bash
# Initialize project
npx create-next-app@latest balisan-web --typescript --tailwind --eslint --app --src-dir

# Install shadcn/ui
npx shadcn@latest init

# Core components
npx shadcn add button card dialog input form label toast dropdown-menu sheet avatar separator sonner
```

### External Libraries

| Library                 | Purpose           | Install                     |
| ----------------------- | ----------------- | --------------------------- |
| **Zustand**             | State management  | `npm i zustand`             |
| **React Hook Form**     | Form handling     | `npm i react-hook-form`     |
| **Zod**                 | Schema validation | `npm i zod`                 |
| **@hookform/resolvers** | RHF + Zod         | `npm i @hookform/resolvers` |
| **next-themes**         | Dark mode         | `npm i next-themes`         |

---

## Components Breakdown

| Component       | Source           | Notes                                |
| --------------- | ---------------- | ------------------------------------ |
| Button variants | shadcn `Button`  | Add amber primary, black secondary   |
| Age Gate Modal  | shadcn `Dialog`  | DOB input, localStorage persistence  |
| Header          | Origin UI navbar | Logo, nav links, cart badge, account |
| Footer          | shadcn patterns  | Links, newsletter, socials           |
| Mobile Nav      | shadcn `Sheet`   | Bottom navigation bar                |
| Auth Forms      | shadcn `Form`    | Login, register, forgot password     |
| Toast           | Sonner           | Success/error notifications          |

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "balisan-amber": "#F5A623",
        "balisan-black": "#1A1A1A",
        "balisan-white": "#FFFAF5",
        "balisan-gray": "#6B6B6B",
        "balisan-border": "#E8E8E8",
        "balisan-success": "#2ECC71",
        "balisan-error": "#E74C3C",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
```

---

## Zustand Stores

```typescript
// lib/stores/auth.ts
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isAgeVerified: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAgeVerified: (verified: boolean) => void;
}

// lib/stores/ui.ts
interface UIStore {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
}
```

---

## Pages to Build

| Route              | Purpose                         | Rendering |
| ------------------ | ------------------------------- | --------- |
| `/`                | Homepage shell                  | SSG       |
| `/login`           | User login                      | SSR       |
| `/signup`          | Registration + age verification | SSR       |
| `/forgot-password` | Password reset                  | SSR       |
| `/terms`           | Terms of service                | SSG       |
| `/privacy`         | Privacy policy                  | SSG       |

---

## Directory Structure

```
/src
├── /app
│   ├── /(auth)
│   │   ├── /login/page.tsx
│   │   ├── /signup/page.tsx
│   │   └── /forgot-password/page.tsx
│   ├── /terms/page.tsx
│   ├── /privacy/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── /components
│   ├── /ui (shadcn components)
│   ├── /layouts
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   └── /features
│       └── /age-gate
│           └── AgeGateModal.tsx
├── /lib
│   ├── /stores
│   │   ├── auth.ts
│   │   └── ui.ts
│   └── /utils
└── /styles
    └── globals.css
```

---

## Acceptance Criteria

- [ ] Project builds with zero errors
- [ ] shadcn/ui configured with Balisan brand colors
- [ ] Age gate modal appears on first visit
- [ ] Age verification persists in localStorage (30 days)
- [ ] Geolocation check for supported delivery states
- [ ] User can register, login, logout
- [ ] Password reset flow works
- [ ] Header shows login vs account menu based on auth state
- [ ] Mobile navigation works with touch gestures
- [ ] All pages pass Lighthouse accessibility ≥95
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1)

---

## Dependencies

| External | Internal          |
| -------- | ----------------- |
| None     | N/A (first phase) |

---

## Deliverables

1. ✅ Configured Next.js 14+ project
2. ✅ Custom shadcn/ui theme
3. ✅ Age gate modal (compliance)
4. ✅ Base layout (header, footer, nav)
5. ✅ Authentication flows
6. ✅ CI/CD integration
