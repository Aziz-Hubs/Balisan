# Balisan Liquor Store - QA Strategy and Testing Plan

## 1. Executive Summary
This document outlines the comprehensive Quality Assurance Strategy for the Balisan Liquor Store (Consumer Site + Admin Portal). The goal is to ensure platform stability, security, compliance (age verification), and performance through a structured testing pyramid.

## 2. Test Strategy Definition

### 2.1 Testing Pyramid Implementation

A multi-layered approach will be used to balance speed and confidence.

#### Level 1: Unit Tests (Vitest + React Testing Library)
**Focus:** Individual components and isolated logic.
- **Scope:**
  - **Shared UI Components:** Buttons, Inputs, Modals (shadcn/ui wrappers).
  - **Utility Functions:** Currency formatting, date helpers, age calculation logic.
  - **Hooks & State:** Custom hooks, Zustand stores (Cart, Search filters).
- **Tools:** Vitest, React Testing Library.

#### Level 2: Integration Tests (Vitest)
**Focus:** Interactions between units and data flow.
- **Scope:**
  - **Forms:** Login, Registration, Checkout, Product Creation (Admin).
  - **Server Actions:** API logic, validation, error handling.
  - **Database Interactions:** Mocked Prisma calls to verify data persistence logic.
- **Tools:** Vitest, Mocking libraries.

#### Level 3: End-to-End (E2E) Tests (Playwright)
**Focus:** Critical user journeys running against a realistic environment.
- **Scope:**
  - **User Flows:** Guest Checkout, Account Management.
  - **Admin Workflows:** Order processing, Inventory management.
  - **Cross-Browser:** Chrome, Firefox, Safari.
- **Tools:** Playwright.

### 2.2 Compliance & Non-Functional Testing

- **Accessibility (A11y):**
  - Automated scans using `axe-core` via Playwright and unit tests (`jest-axe` equivalent).
  - Manual keyboard navigation verification for critical paths (Checkout, Nav).
- **Performance:**
  - CI checks against Core Web Vitals thresholds.
  - Lighthouse auditing on build.
- **Security:**
  - RBAC verification for Admin routes.
  - Input validation checks (SQLi, XSS prevention validation).

## 3. Execution Plan

### 3.1 Critical Test Cases

#### User Flows
- [ ] **Age Gate & Guest Checkout:** Visitor passes Age Gate (persistence check) -> Browses Catalog -> Adds to Cart -> Checks out (Guest).
- [ ] **Registered User Journey:** User Logs in -> Views Order History -> Updates Profile.

#### Admin Flows
- [ ] **Product Management:** Admin Logs in -> Adds new Product (with image) -> Verifies Product on Storefront.
- [ ] **Order Fulfillment:** Admin processes Order (updates status) -> Email notification triggers (mocked).

#### Edge Cases
- [ ] **Inventory Limits:** Attempting to add more items than in stock.
- [ ] **Payment Failures:** Handling declined cards gracefully.
- [ ] **Age Verification Failures:** Redirects or blocks for underage users.

### 3.2 Tooling Configuration

- **Test Runner:** Vitest (Native Vite support, fast).
- **E2E Framework:** Playwright (Reliable, trace viewer, multi-tab support).
- **CI/CD:** GitHub Actions (Automated linting, unit tests, and E2E on PRs).

### 3.3 Manual QA Checklist
- **Visual Regression:** Check responsive layouts on Mobile (iOS Safari), Tablet, and Desktop.
- **Integrations:**
  - Stripe Sandbox transactions.
  - Algolia search sync verification.
  - Onfleet delivery dispatch mocking.

## 4. First 5 Critical E2E Tests (Immediate Priority)

The following tests will be prioritized to secure the core value loop:

1.  **Guest Checkout Flow:** Full path from Age Gate -> Product Selection -> Cart -> Checkout -> Success Page (Guest).
2.  **Age Verification Persistence:** Verify Age Gate appears for new session, accepts valid DOB, allows access, and does NOT reappear on reload/navigation.
3.  **Admin Login & Dashboard Access:** Verify protected routes redirect unauthenticated users; Admin login grants access to Dashboard.
4.  **Product Search & Filter:** Verify using the search bar yields results and category filters update the product grid correctly.
5.  **Cart Management:** Verify adding distinct items, updating quantities, removing items, and cart persistence across reloads.
