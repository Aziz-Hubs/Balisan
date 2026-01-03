# Technical Requirements Document: Balisan Admin Portal

**Document Version:** 1.0  
**Date:** December 30, 2024  
**Document Owner:** Technical Architecture Team  
**Companion Document:** PRD_Balisan_Admin_Portal.md

---

## 1. Architecture Overview

The Balisan Admin Portal is a sub-application within the main Next.js project, utilizing **Route Groups** and **Custom Layouts** to maintain separation while sharing the core domain logic, database models, and types.

### Key Architectural Decisions
- **Shared Monorepo**: Admin and Consumer sites live in the same Next.js repository for ease of sharing Prisma models and Zod schemas.
- **Server Components**: Heavy use of React Server Components (RSC) for data-intensive tables to minimize client-side bundle size.
- **Client-Side SWR/React Query**: For real-time updates on active dashboards and order feeds.
- **RBAC Enforcement**: Middleware-based role checking for all `/(admin)` routes.

---

## 2. Frontend Infrastructure (Admin)

### Layout & Component Strategy
- **Framework**: Next.js 14+ (App Router).
- **Navigation**: Persistent Sidebar with collapsible groups (Products, Orders, Customers, Compliance).
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) (Data Table, Sheet, Dialog, Form, Toast).
- **Charts**: [Recharts](https://recharts.org/) or [Tremor](https://www.tremor.so/) for high-density dashboards.

### Data Tables Spec
Admin tables must support:
- Server-side pagination, sorting, and filtering.
- Multi-select bulk actions (e.g., "Change Status", "Export to CSV").
- Column visibility toggling.
- Row-level quick actions (Edit, View, Archive).

---

## 3. Backend & API (Admin)

### Internal API Routes
All admin operations will use a dedicated route group: `/api/admin/*`.

**Standard Operations:**
- `GET /api/admin/orders`: Full order details including risk assessment.
- `PATCH /api/admin/orders/:id`: Status transitions and refund triggers.
- `GET /api/admin/compliance/audit`: Specialized audit log querying.
- `POST /api/admin/products`: Multipart-form data for high-res image uploads.

### Middlewares
- **authMiddleware**: Validates session and checks for `role: "ADMIN"` or `role: "MANAGER"`.
- **auditMiddleware**: Automatically logs all `PATCH`, `POST`, and `DELETE` requests with the acting user's ID and payload.

---

## 4. Security & Compliance (Admin)

### Role-Based Access Control (RBAC)
| Role           | Permissions                                                         |
| -------------- | ------------------------------------------------------------------- |
| **SuperAdmin** | Full system access, staff account management, database exports.     |
| **Manager**    | Catalog management, order processing, refunds, inventory overrides. |
| **Staff**      | Order fulfillment, standard ID verification review, stock lookups.  |
| **Auditor**    | Read-only access to compliance logs and historical order data.      |

### Session Security
- **Strict Timeouts**: Inactivity timeout of 30 minutes (customizable per role).
- **Session Revocation**: Real-time capability for SuperAdmins to terminate active staff sessions.
- **MFA (Mandatory)**: Multi-factor authentication required for all non-Development environments.

### Data Protection
- **Personal Data**: Masking sensitive customer data (e.g., partial email, censored DOB) unless explicit "View Details" action is taken (and logged).
- **Audit Persistence**: Compliance logs are streamed to an immutable log storage (e.g., AWS CloudWatch with S3 lock) to prevent tampering.

---

## 5. Performance & Scalability (Admin)

- **Search**: Direct PostgreSQL indexing (Gin/Gist) for precise internal lookups (bypassing Algolia if necessary for mission-critical exact SKU searches).
- **Image Processing**: On-the-fly resizing via Next.js for dashboard thumbnails, while preserving master high-res copies in S3.
- **Concurrent Access**: Optimistic locking in Prisma to prevent race conditions during bulk inventory updates.

---

## 6. Implementation Phases

1. **Phase 1: Shell & Auth** (Week 1)
   - Admin layout, sidebar, and RBAC middleware.
2. **Phase 2: Product & Order Grids** (Week 2-3)
   - High-density data tables and basic CRUD.
3. **Phase 3: Fulfillment & Compliance** (Week 4-5)
   - Onfleet integration buttons and ID review interface.
4. **Phase 4: Dashboard & Analytics** (Week 6)
   - Sales charts and system health monitoring.
