# Product Requirements Document (PRD)
# Balisan Admin Portal

**Version:** 1.0  
**Date:** 2025-12-30  
**Product Manager:** Operations Team  
**Status:** DRAFT

## 1. Executive Summary

The Balisan Admin Portal is an internal operations management system designed to empower store staff to efficiently manage products, process orders, ensure regulatory compliance, and monitor business performance. Built exclusively for desktop users (1280px+), the portal prioritizes operational efficiency over aesthetic design while maintaining the Balisan brand identity.

**Problem Statement:**  
Current manual processes for order fulfillment, inventory management, and compliance verification are time-consuming and error-prone, leading to delayed shipments, stockouts, and potential regulatory violations.

**Solution:**  
A unified admin portal that consolidates all operational workflows into a single, high-density interface with keyboard shortcuts, bulk actions, and real-time data synchronization.

**Success Criteria:**
- Order processing time reduced from 5+ minutes to <2 minutes
- Zero inventory discrepancies between admin and consumer site
- 100% audit trail for all compliance-sensitive actions
- Staff onboarding time <30 minutes with minimal training

## 2. User Personas

### 2.1 Sarah - Store Manager

**Background:**
- 5+ years retail management experience
- Manages 3 staff members
- Responsible for P&L, inventory, compliance
- Works 8am-6pm, 5 days/week

**Goals:**
- Quickly process high-volume orders during peak hours
- Monitor sales metrics and identify trends
- Ensure compliance with alcohol retail regulations
- Manage staff access and permissions

**Pain Points:**
- Current system requires too many clicks per order
- No bulk operations for price updates
- Difficult to track who made inventory changes
- Compliance reports take hours to generate

**Tech Proficiency:** Moderate (comfortable with spreadsheets, POS systems)

**Workflows:**
1. Morning: Check overnight orders, process for fulfillment
2. Midday: Review sales dashboard, adjust inventory
3. End of day: Approve age verifications, export compliance logs

---

### 2.2 Mike - Fulfillment Staff

**Background:**
- 2 years warehouse/fulfillment experience
- Part-time, 20 hours/week
- Primarily processes orders and manages stock

**Goals:**
- Quickly locate orders to fulfill
- Update order status as items are packed
- Print packing slips efficiently
- Adjust inventory when stock is damaged/returned

**Pain Points:**
- Hard to filter orders by status
- Packing slip printing is clunky
- Can't easily note why inventory was adjusted
- No clear indication of urgent orders

**Tech Proficiency:** Low-moderate (familiar with mobile apps, basic desktop use)

**Workflows:**
1. Login, filter orders by "Pending"
2. Pick items, mark as "Processing"
3. Print packing slip, mark as "Ready for Pickup/Delivery"
4. Log any inventory adjustments for damaged items

---

### 2.3 Alex - Compliance Auditor

**Background:**
- Legal/compliance background
- Works remotely, 10 hours/week
- Reviews age verifications and audit logs

**Goals:**
- Review pending age verifications for accuracy
- Search audit logs for specific events
- Generate compliance reports for regulators
- Ensure all staff actions are properly logged

**Pain Points:**
- No centralized view of pending verifications
- Audit log search is slow and inflexible
- Export functionality doesn't meet regulator formats
- Can't easily see who approved what

**Tech Proficiency:** High (comfortable with databases, reporting tools)

**Workflows:**
1. Review queue of pending verifications
2. Approve/reject with detailed notes
3. Search audit logs for date range/user/action
4. Export 7-day logs in CSV format

---

### 2.4 Emily - Super Admin

**Background:**
- Owner/founder of Balisan
- Technical background, built initial e-commerce site
- Handles high-level admin, user management, system config

**Goals:**
- Manage admin user accounts and permissions
- Monitor system health and performance
- Make bulk changes to product catalog
- Access all features for troubleshooting

**Pain Points:**
- Needs full visibility across all operations
- Requires ability to override permissions in emergencies
- Wants detailed analytics on staff efficiency
- Needs to manage integrations (Stripe, Onfleet)

**Tech Proficiency:** High (full-stack developer)

**Workflows:**
1. Monitor dashboard for anomalies
2. Create/deactivate admin accounts
3. Bulk update product categories or pricing
4. Review and resolve escalated issues

## 3. Core Features

### 3.1 Dashboard

**Priority:** P0 (Must-have)

**Description:**  
Central hub showing real-time business metrics, pending actions, and recent activity.

**User Stories:**
- As a Manager, I want to see today's sales at a glance so I can track performance
- As a Staff member, I want to see pending orders count so I know my workload
- As an Auditor, I want to see pending verifications so I can prioritize reviews

**Functional Requirements:**
- Display metrics cards:
  - Today's sales revenue
  - This week's sales revenue
  - Pending orders count (clickable)
  - Low stock alerts count (clickable)
  - Pending verifications count (clickable)
- Activity feed showing last 20 events (order status changes, verifications, inventory adjustments)
- Quick action buttons: "New Product", "View Orders", "Review Verifications"
- Sales trend chart (7-day line chart)
- Top products table (top 5 by revenue this week)

**Acceptance Criteria:**
- Dashboard loads in <1 second
- Metrics update every 30 seconds (polling or SSE)
- Charts render with Recharts library
- Activity feed is scrollable, shows timestamps
- Quick actions navigate to correct pages

---

### 3.2 Product Management

**Priority:** P0 (Must-have)

**Description:**  
Comprehensive product catalog management with CRUD operations, bulk actions, and image uploads.

**User Stories:**
- As a Manager, I want to search products by SKU so I can quickly find items
- As a Manager, I want to bulk update prices so I can run promotions
- As a Staff member, I want to view product stock levels so I know what's available

**Functional Requirements:**

**Product List View:**
- Data table with columns: Image, SKU, Name, Category, Price, Stock, Status, Actions
- Server-side pagination (25 items/page)
- Server-side sorting by any column
- Filter by: Category, Brand, Stock status (In Stock, Low Stock, Out of Stock)
- Search by SKU or name (instant search <100ms)
- Bulk actions: Update Prices, Change Category, Update Status, Delete
- Column visibility toggle
- Export to CSV

**Product Detail/Edit View:**
- Form fields: Name, SKU, Brand, Category, Subcategory, Price, Discount Price, Stock Quantity, ABV, Volume, Description, Tasting Notes, Region, Country, Tags
- Image uploader (drag-and-drop, multiple files, auto-resize to 800x800)
- Image gallery (reorder, set primary, delete)
- Rich text editor for Description and Tasting Notes
- Auto-save to localStorage every 30 seconds
- "Save" button with loading state
- Confirm dialog before discarding unsaved changes

**Acceptance Criteria:**
- SKU search returns results in <100ms
- Bulk price update for 100 products completes in <2s
- Image upload supports JPEG, PNG, WebP
- Auto-save restores content after browser crash
- All mutations logged to audit log

---

### 3.3 Order & Fulfillment Management

**Priority:** P0 (Must-have)

**Description:**  
Order processing workflow with status tracking, fulfillment actions, and refund processing.

**User Stories:**
- As Staff, I want to filter orders by status so I can focus on pending orders
- As Staff, I want to print packing slips so I can prepare shipments
- As Manager, I want to process refunds so I can handle cancellations

**Functional Requirements:**

**Order List View:**
- Data table with columns: Order ID, Customer Name, Total, Status, Fulfillment Status, Created Date, Actions
- Filter by: Status, Fulfillment Status, Date Range, Verification Status
- Search by: Order ID, Customer Name, Customer Email
- Status badges with color coding
- Click row to open detail view

**Order Detail View:**
- Customer information: Name, Email, Phone, Shipping Address (masked by default, "View Full Details" to unmask)
- Order items table: Product Image, Name, Quantity, Unit Price, Total
- Order totals: Subtotal, Tax, Shipping, Total
- Payment method and status
- Verification status badge
- Timeline of status changes (vertical timeline with timestamps)
- Action buttons (role-based):
  - "Mark as Processing" (Staff+)
  - "Create Delivery Task" (Staff+)
  - "Mark as Ready" (Staff+)
  - "Mark as Delivered" (Staff+)
  - "Process Refund" (Manager+)
  - "Print Packing Slip" (Staff+)

**Packing Slip:**
- Print-optimized layout
- Barcode for order ID
- Shipping address
- Item list with SKUs
- Special instructions

**Acceptance Criteria:**
- Order processing (Pending → Delivered) completable in <2 minutes
- Packing slip prints without extra pages
- Refund processes via Stripe API, updates order status
- Timeline shows all status changes with user names
- Onfleet integration creates delivery task

---

### 3.4 Inventory Management

**Priority:** P1 (Should-have)

**Description:**  
Track and adjust product stock levels with logged reasons.

**User Stories:**
- As Staff, I want to adjust inventory when items are damaged so stock is accurate
- As Manager, I want to see low stock alerts so I can reorder
- As Manager, I want to bulk update stock after receiving shipment

**Functional Requirements:**

**Inventory View:**
- Data table: SKU, Product Name, Current Stock, Low Stock Threshold, Status (OK, Low, Out)
- Filter by: Stock Status
- Search by: SKU, Product Name
- Click row to open adjustment dialog

**Adjustment Dialog:**
- Product info: Name, SKU, Current Stock
- Input: Quantity Change (+/-), Reason (dropdown: Damage, Theft, Return, Restock, Correction), Notes (required)
- Submit button
- Confirmation: "Stock will change from X to Y. Confirm?"

**Bulk Update:**
- Upload CSV with columns: SKU, Quantity Change, Reason, Notes
- Validation: Check all SKUs exist
- Preview changes before applying
- Apply all (logged individually)

**Acceptance Criteria:**
- Adjustment logged with user, timestamp, reason
- Low stock threshold configurable per product
- Bulk update supports 100+ items in <2s
- Stock changes reflected on consumer site immediately

---

### 3.5 Age Verification & Compliance

**Priority:** P0 (Must-have)

**Description:**  
Review pending age verifications and search audit logs for compliance reporting.

**User Stories:**
- As Auditor, I want to review ID documents side-by-side so I can verify age
- As Auditor, I want to search audit logs by date so I can generate reports
- As Manager, I want to export 7-day logs so I can comply with regulations

**Functional Requirements:**

**Verification Queue:**
- Table: User Name (masked), Submission Date, Document Type, Status, Actions
- Filter by: Status (Pending, Approved, Rejected)
- Sort by: Submission Date
- Click "Review" to open review interface

**Review Interface:**
- Split view: Left = submitted document images, Right = review form
- Document images: Zoom, pan, rotate
- Review form:
  - Extracted data (if available from Yoti/Vouched): Name, DOB, Document Number
  - Manual input: Verified Name, Verified DOB
  - Approve/Reject radio buttons
  - Notes (required for rejection)
  - Submit button

**Audit Log Search:**
- Filters: Date Range, User, Action Type, Resource Type
- Table: Timestamp, User, Action, Resource, Changes (expandable JSON)
- Pagination (50 items/page)
- Export to CSV button

**Acceptance Criteria:**
- Review interface loads document images in <500ms
- Approval updates user.ageVerified = true
- Audit log search returns results in <1s
- CSV export for 7-day logs completes in <30s
- All actions logged to audit log

---

### 3.6 Customer Management

**Priority:** P2 (Nice-to-have)

**Description:**  
View customer profiles, order history, and verification status.

**User Stories:**
- As Manager, I want to see customer order history so I can identify VIPs
- As Manager, I want to update customer details so I can correct errors

**Functional Requirements:**
- Table: Name (masked), Email (masked), Total Spent, Order Count, Age Verified, Actions
- Filter by: Age Verified, Customer Type (Regular, VIP)
- Click row to open profile
- Profile: Full details (unmask action), Order history, Addresses, Preferences

**Acceptance Criteria:**
- Personal data masked by default
- Unmask action logged to audit log
- Order history clickable (navigate to order detail)

## 4. Design & UX Principles

### 4.1 Design Language

**Theme:**
- **Efficiency-first**: High information density, minimal whitespace
- **Balisan brand**: Amber (#F59E0B) and black (#0F0F0F) accents
- **Desktop-optimized**: No mobile responsive effort for MVP

**Typography:**
- Headings: Playfair Display (existing brand font)
- Body: Inter (clean, readable)
- Monospace: JetBrains Mono (for SKUs, order IDs)

**Colors:**
- Background: `bg-zinc-950` (dark mode)
- Foreground: `text-zinc-50`
- Primary: `bg-balisan-amber` (#F59E0B)
- Accent: `bg-balisan-black` (#0F0F0F)
- Success: `text-green-500`
- Warning: `text-yellow-500`
- Danger: `text-red-500`

**Spacing:**
- Compact: `p-2`, `gap-2` (tables, forms)
- Standard: `p-4`, `gap-4` (cards, sections)

### 4.2 Layout

**Sidebar:**
- Fixed width: 240px
- Collapsible (expand/collapse icon)
- Navigation groups: General, Catalog, Management
- Current page highlighted with amber background
- Logo at top, "Back to Store" at bottom

**Main Content:**
- Full width minus sidebar
- Page header: Title, breadcrumbs, primary action button
- Content area: Responsive to sidebar collapse

**Data Tables:**
- Sticky header
- Zebra striping
- Hover highlight
- Row actions menu (ellipsis icon)
- Bulk select checkboxes in first column

### 4.3 Interaction Patterns

**Keyboard Shortcuts:**
- `Cmd/Ctrl + K`: Open command palette (search, navigate)
- `Esc`: Close dialogs/modals
- `Enter`: Submit forms (when focused)
- `Cmd/Ctrl + S`: Save (in editors)

**Confirmations:**
- **Low risk** (e.g., mark order as processing): Toast notification, no confirmation
- **Medium risk** (e.g., update prices): Confirm dialog with "Cancel" and "Confirm" buttons
- **High risk** (e.g., delete product): Type "DELETE" to confirm

**Feedback:**
- **Success**: Green toast notification (top-center, 3s)
- **Error**: Red toast notification (top-center, persist until dismissed)
- **Loading**: Skeleton loaders for async content, spinner for buttons

**Auto-save:**
- Long forms (product editor) auto-save to localStorage every 30s
- Show "Last saved: X seconds ago" indicator
- Restore draft on page reload

### 4.4 Accessibility

- All interactive elements keyboard-accessible
- ARIA labels for icon-only buttons
- Focus indicators visible
- Color contrast ratio >4.5:1
- Skip to main content link

## 5. Legal & Compliance

### 5.1 Audit Requirements

**Regulatory Context:**  
Alcohol retail requires detailed audit logs to prove compliance with age verification and record-keeping laws.

**Requirements:**
- All state-changing actions logged (create, update, delete)
- Logs immutable (write-only storage)
- Logs retained for 7 years (legal requirement)
- Logs include: timestamp, user ID, IP address, user agent, action, resource, before/after state
- Logs searchable by date, user, action type, resource
- Logs exportable in CSV format

**Implementation:**  
Store logs in CloudWatch Logs with S3 archival and object lock for immutability.

### 5.2 Data Privacy

**GDPR Compliance:**
- Personal data masked by default
- Explicit action required to unmask (logged)
- Right to deletion: Anonymize user data on request (replace with "DELETED_USER_XXX")

**Internal Data Handling:**
- No export of customer personal data without Manager+ approval
- No sharing of audit logs outside compliance team

## 6. Success Metrics

### 6.1 Operational Efficiency

| Metric                      | Baseline   | Target      | Measurement                                         |
| --------------------------- | ---------- | ----------- | --------------------------------------------------- |
| Order processing time (p95) | 5 minutes  | <2 minutes  | Time from "Pending" to "Delivered"                  |
| Inventory accuracy          | 85%        | 100%        | Weekly audit: admin stock = consumer stock          |
| Staff onboarding time       | 2 hours    | 30 minutes  | Time from account creation to first order processed |
| Compliance log export time  | 60 seconds | <30 seconds | Time to export 7-day logs                           |

### 6.2 User Satisfaction

- **Staff NPS:** Target >50 (quarterly survey)
- **Manager satisfaction:** Target >80% (quarterly survey)
- **Error rate:** <1% (wrong orders, inventory mistakes)

### 6.3 System Performance

- Dashboard load time: <1s (p95)
- Product search latency: <100ms (p95)
- API response time: <500ms (p95)
- Uptime: >99.5%

## 7. Dependencies & Assumptions

### 7.1 Dependencies

- **Database:** PostgreSQL with Prisma ORM (to be set up)
- **Authentication:** Session-based auth with role cookies (existing)
- **Third-party APIs:**
  - Stripe (payments/refunds)
  - Onfleet (delivery management)
  - Yoti or Vouched (age verification)
- **Infrastructure:** Vercel deployment, CloudWatch for audit logs

### 7.2 Assumptions

- All admin users have desktop computers (no tablets/phones)
- Staff have basic computer literacy
- Internet connection is stable and fast (not optimized for slow connections)
- Consumer site API can handle increased load from admin portal

### 7.3 Out of Scope (Future Phases)

- Mobile app for admin
- Advanced analytics/BI dashboards
- Automated inventory forecasting
- Customer segmentation/marketing tools
- Multi-location support
- Real-time chat with customers
- Integration with accounting software (QuickBooks, Xero)

## 8. Risks & Mitigation

| Risk                                                         | Impact | Likelihood | Mitigation                                                             |
| ------------------------------------------------------------ | ------ | ---------- | ---------------------------------------------------------------------- |
| Staff resist new system                                      | High   | Medium     | Involve staff in testing, provide training, gradual rollout            |
| Third-party API downtime (Stripe, Onfleet)                   | High   | Low        | Implement retry logic, graceful degradation, manual fallback workflows |
| Audit log storage costs exceed budget                        | Medium | Medium     | Set up S3 lifecycle policies, archive old logs to Glacier              |
| Performance degrades with large product catalog (10k+ items) | Medium | Low        | Implement database indexing, caching, pagination limits                |
| Security breach exposes customer data                        | High   | Low        | Enforce MFA, regular security audits, encrypt sensitive data at rest   |

## 9. Launch Plan

### 9.1 MVP Scope (Version 1.0)

**Include:**
- Dashboard with basic metrics
- Product management (CRUD, bulk updates)
- Order processing (status updates, packing slips)
- Inventory adjustments
- Age verification review
- Audit log search and export
- RBAC for 4 roles

**Exclude (post-MVP):**
- Customer management (detailed profiles)
- Advanced analytics (cohort analysis, forecasting)
- Automated alerts (Slack/email notifications)
- Mobile responsive design

### 9.2 Beta Testing

**Participants:**
- 1 Store Manager (Sarah)
- 2 Fulfillment Staff (Mike + 1 other)
- 1 Compliance Auditor (Alex)
- 1 Super Admin (Emily)

**Duration:** 2 weeks

**Success Criteria:**
- All beta testers can complete workflows without assistance
- No critical bugs reported
- Order processing time <2 minutes achieved
- NPS >40

### 9.3 Rollout

**Phase 1 (Week 1):** Beta users only  
**Phase 2 (Week 2):** All staff, read-only mode  
**Phase 3 (Week 3):** Full write access, old system deprecated

## 10. Future Enhancements

### 10.1 Phase 2 (Q2 2026)

- **Customer Relationship Management:**
  - Detailed customer profiles
  - Order history visualization
  - Customer segmentation (VIP, at-risk, new)
  - Targeted promotions

- **Advanced Analytics:**
  - Custom date range comparisons
  - Cohort analysis
  - Product affinity analysis
  - Sales forecasting

### 10.2 Phase 3 (Q3 2026)

- **Automation:**
  - Automated low-stock reordering (integration with suppliers)
  - Automated email notifications for order status
  - Slack alerts for critical events

- **Mobile Admin App:**
  - View-only mode for managers on-the-go
  - Push notifications for urgent orders

---

**Document Approval:**

| Role             | Name  | Signature | Date |
| ---------------- | ----- | --------- | ---- |
| Product Manager  | TBD   |           |      |
| Engineering Lead | TBD   |           |      |
| Store Manager    | Sarah |           |      |
| Founder/CEO      | Emily |           |      |
