# Balisan Project Context & AI Guidelines

> **For the AI Assistant:** This file is your primary source of truth. It defines the project's soul, architectural strictures, and coding standards. Read this before every major task.

## 1. Project Identity & Philosophy
**Balisan** is not just a liquor store; it is a **premium digital experience**. We are shifting from generic mobile-responsive designs to **Desktop-First Immersion**.
*   **Core Values:** Visual Excellence, Speed (90-min delivery), Authenticity.
*   **UX Goal:** "App-like feeling on the web." Glassmorphism, smooth transitions (Framer Motion), and power-user tools (Cmd+K, keyboard shortcuts).
*   **Strategic Phase:** Currently in **Desktop Enhancement Phases**. We are prioritizing multi-column layouts, hover states, and productivity tools over pure mobile simplicity.

## 2. Tech Stack & "Golden Rules"
*   **Framework:** Next.js 14+ (App Router).
    *   *Rule:* Use **Server Components** by default. Only add `"use client"` when interactivity (hooks, event listeners) is strictly required.
*   **Language:** TypeScript.
    *   *Rule:* strict mode is ON. Avoid `any`, but `eslint` allows it when pragmatic. Prefer `interface` for props.
*   **Styling:** Tailwind CSS v4 + Framer Motion.
    *   *Rule:* No `.css` files (except globals). Use `clsx` and `tailwind-merge` (via `cn()` utility) for conditional classes.
*   **UI Library:** Shadcn/ui (Radix Primitives + Tailwind).
    *   *Rule:* Do not reinvent the wheel. Extend existing `src/components/ui` components using `cva` variants.
*   **Backend:** Supabase (PostgreSQL).
    *   *Rule:* Row Level Security (RLS) is paramount.
    *   *Rule:* **Resilient Data Fetching:** Always implement a `try/catch` block that falls back to `mock-data.ts` if the DB fails or returns empty. This is critical for demo reliability.

## 3. Architectural Patterns

### Data Fetching (Server-Side)
We use a **Service Layer Pattern** (`src/services/`) to abstract Supabase calls.
```typescript
// Pattern for src/services/my-service.ts
import { createClient } from '@/lib/supabase/server'
import { getMockData } from '@/data/mock'

export async function getData() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('table').select('*')
    if (error || !data) throw error
    return mapDatabaseToModel(data)
  } catch (err) {
    console.error('DB Error, falling back to mock:', err)
    return getMockData() // CRITICAL: Always fallback
  }
}
```

### Component Composition
*   **Atoms (UI):** `src/components/ui` (Buttons, Inputs). Dumb, presentational.
*   **Molecules (Features):** `src/components/features` (ProductCard, CartDrawer). Smart, connected to stores.
*   **Organisms (Sections):** `src/components/layouts` (Header, Hero).
*   **Pages:** `src/app/page.tsx`. Orchestrate data fetching and layout.

### State Management
1.  **URL State:** (Search params) -> First priority for shareable state (filters, pagination).
2.  **Server State:** (Supabase/React Query) -> For data.
3.  **Global Client State:** (Zustand) -> For UI state (Cart open, User preferences).
4.  **Local State:** (`useState`) -> Last resort for ephemeral UI interactions.

## 4. Coding Standards & Snippets

### Component Template
```tsx
import { cn } from "@/lib/utils"

interface MyComponentProps {
  className?: string
  title: string
}

export function MyComponent({ className, title }: MyComponentProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}
```

### Tailwind Best Practices
*   Use `class-variance-authority` (cva) for components with multiple variants.
*   Group classes logically: Layout -> Spacing -> Typography -> Color -> Interactive.
*   Use standard spacing (multiples of 4 via `gap-4`, `p-6`).

### Testing Strategy
*   **Unit (Vitest):** Logic-heavy utilities and hooks.
*   **E2E (Playwright):** Critical user flows (Checkout, Auth, Search).
    *   *Note:* E2E tests often run against a seeded local DB or mock mode.

## 5. Operational Guidelines for AI
1.  **Check Before You Wreck:** Always read `package.json` and `src/lib/utils.ts` before importing new libraries.
2.  **Context is King:** When asked to "fix a bug", first read the file, then read its imports, then search for usages.
3.  **Mock First, DB Second:** If the user asks for a feature, implement it with Mock Data support *immediately*. Do not wait for the DB migration to be perfect. The app must work even if Supabase is down.
4.  **Desktop Nuance:** When designing UI, ask: "How does this feel on a 27-inch monitor?" Add hover states, tooltips, and keyboard navigation.

## 6. Directory Map
*   `src/app`: Routes.
*   `src/components/ui`: Shadcn primitives (Do not modify unless necessary).
*   `src/services`: Data abstraction layer (Supabase + Mock Fallback).
*   `src/lib/supabase`: DB Client configuration.
*   `phases/`: Strategic roadmap documents. Read these to understand the "Why".