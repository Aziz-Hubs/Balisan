# Product Requirements Document: Balisan Admin Portal

**Document Version:** 1.0  
**Last Updated:** December 30, 2024  
**Author:** Product Management  
**Status:** Draft for Review

---

## 1. Executive Summary

The **Balisan Admin Portal** is the centralized nerve center for managing the Balisan e-commerce ecosystem. While the consumer-facing site focuses on discovery and brand story, the Admin Portal is optimized for **operational efficiency, data accuracy, and regulatory compliance**.

This portal is intended for internal staff and store managers to monitor sales, update inventory, manage compliance verifications, and orchestrate fulfillment.

### Core Objectives
- **Efficiency**: Minimize time spent on routine tasks (inventory updates, order processing).
- **Compliance Control**: Provide a clear interface for manual age verification review and audit log inspection.
- **Data-Driven Decisions**: Surfacing real-time sales and inventory metrics.
- **Reliability**: ensuring a robust interface for critical business operations.

---

## 2. Platform Constraints & Targets

### Desktop-First Strategy
The Admin Portal is **Desktop-only (target 1280px+)**. This allows for high-density data tables, side-by-side comparisons, and complex multi-step workflows that would be unsuitable for mobile devices. No mobile-responsive effort will be spent on the MVP, though basic readability on tablets is a secondary target.

### Performance Targets
- **Instant Search**: < 100ms for internal product/order lookup.
- **Bulk Updates**: Capable of updating 100+ inventory items in < 2 seconds.
- **Data Freshness**: Real-time updates for incoming orders.

---

## 3. User Personas

### 3.1 The Store Manager — "Elena"
- **Focus**: High-level store performance, stock levels, and staff management.
- **Key Task**: Reviewing daily sales, approving high-value refunds, and managing promotional schedules.
- **Pain Point**: Overwhelming data without clear action items.

### 3.2 The Fulfillment Specialist — "Alex"
- **Focus**: Fast order processing and inventory accuracy.
- **Key Task**: Printing packing slips, updating order statuses, and cycle counting.
- **Pain Point**: Too many clicks to move an order from "Pending" to "Shipped".

### 3.3 The Compliance Officer — "Sarah"
- **Focus**: Legal adherence and verification accuracy.
- **Key Task**: Manual review of flagged age verification documents and auditing compliance logs.
- **Pain Point**: Scattered documentation for regulatory audits.

---

## 4. Functional Requirements

### 4.1 Dashboard (Overview)
- **Real-time Stats**: Sales (today/week), pending orders, flagged verifications, out-of-stock alerts.
- **Activity Feed**: Live stream of orders and system alerts.
- **Quick Actions**: "Add Product", "Review Flagged ID", "Export Daily Report".

### 4.2 Product Management
- **Catalog Grid**: High-density table with filtering by category, brand, stock level, and visibility.
- **Rich Editor**: WYSIWYG for descriptions, tasting notes, and metadata.
- **Media Management**: Drag-and-drop image uploader with automatic resizing.
- **Bulk Actions**: Price changes, category re-assignment, visibility toggling.

### 4.3 Order & Fulfillment Management
- **Order Queue**: Multi-status filtering (Pending, Processing, Shipped, Picked Up, Cancelled).
- **Order Detail**: Customer ID status, item breakdown, timeline of status changes, and Onfleet tracking link.
- **Fulfillment**: Integration buttons to "Create Onfleet Task" or "Print Packing Slip".
- **Returns/Refunds**: Interface for processing partial or full refunds (via Stripe integration).

### 4.4 Inventory & Stock Control
- **Global Inventory View**: Sync status across physical locations (if applicable).
- **Manual Adjustments**: Logged reasons for stock changes (Damage, Theft, Return).
- **Alerts**: Configurable low-stock thresholds per category.

### 4.5 Age Verification & Compliance
- **Verification Queue**: Dedicated list of "Pending Review" IDs from Yoti/Vouched.
- **Review Interface**: Side-by-side view of user-submitted DOB vs. extracted ID data.
- **Audit Logs**: Specialized search for compliance-related events (IP, timestamp, user action).

---

## 5. Design & UX Principles

### 5.1 Efficiency over Aesthetics
While it should follow the Balisan brand (amber/black accents), the UI should prioritize **information density**:
- Use compact tables with "Action" columns.
- Sticky headers and sidebars for rapid navigation.
- Keyboard shortcuts for common actions (e.g., `Cmd + K` for search, `Enter` to save).

### 5.2 Confirmation & Safety
- **Destructive Actions**: Double-confirmation for deleting products or cancelling orders.
- **Draft States**: Auto-save for long-form content like product descriptions or blog posts.
- **Success/Error States**: Clear, persistent toast notifications for all backend operations.

---

## 6. Success Metrics (Admin)

- **Order Processing Time**: Target < 2 minutes per order from "Pending" to "Fulfilled".
- **System Accuracy**: 100% stock sync between Admin Portal and consumer storefront.
- **Audit Preparedness**: Time to generate a compliant 7-day log report < 30 seconds.
- **Staff Satisfaction**: Minimal training required for new hires.
