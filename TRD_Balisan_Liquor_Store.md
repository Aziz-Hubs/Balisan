# Technical Requirements Document (TRD)
# Balisan Liquor Store E-Commerce Platform

**Version:** 1.0  
**Date:** December 30, 2025  
**Document Owner:** Engineering Team  
**Project Status:** Planning Phase  
**Companion Document:** PRD_Balisan_Liquor_Store.md

---

## 1. Executive Technical Summary

### 1.1 Architecture Overview

The Balisan e-commerce platform will be built as a modern, scalable web application using a **headless architecture** approach. This design pattern decouples the frontend presentation layer from the backend business logic, enabling:

- **Flexibility**: Easy adaptation for future mobile apps or alternative interfaces
- **Performance**: Optimized delivery through CDN and static generation
- **Developer Experience**: Clear separation of concerns, parallel development streams
- **Scalability**: Independent scaling of frontend and backend services

**High-Level Stack:**
- **Frontend**: Next.js 14+ (React 18) with TypeScript
- **Backend**: Node.js RESTful API / Serverless functions
- **Database**: PostgreSQL (primary data store)
- **Cache**: Redis (session, cart, frequently accessed data)
- **Search**: Algolia (product search and discovery)
- **Hosting**: Vercel (frontend) + AWS (backend services)
- **CDN**: Vercel Edge Network / CloudFront

### 1.2 Key Technology Decisions

**Why Next.js 14+:**
- Server-side rendering (SSR) for SEO-critical pages (PDP, PLP)
- Static generation for content pages
- Built-in API routes for BFF (Backend for Frontend) pattern
- Image optimization out of the box
- Excellent developer experience and ecosystem
- App Router for improved routing and layouts

**Why PostgreSQL:**
- ACID compliance for financial transactions
- Strong relational data model (products, orders, users)
- Excellent support for complex queries and reporting
- Mature ecosystem and tooling
- Built-in JSON support for flexible data

**Why Algolia:**
- Sub-50ms search response times
- Typo tolerance and synonym handling
- Faceted filtering out of the box
- Analytics and A/B testing capabilities
- Managed service (reduced ops burden)

### 1.3 Performance & Scalability Targets

**Performance Benchmarks:**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Time to Interactive**: < 3.5s
- **API Response Time (p95)**: < 200ms
- **Search Response Time**: < 50ms

**Scalability Goals:**
- Handle 1,000 concurrent users (MVP phase)
- Scale to 10,000+ concurrent users (12-month horizon)
- Support 10,000+ SKUs in catalog
- Process 500+ orders/day at peak
- 99.9% uptime SLA

### 1.4 Security & Compliance

**Security Posture:**
- TLS 1.3 encryption for all traffic
- Zero-trust architecture for API access
- PCI DSS Level 1 compliance (via Stripe)
- Regular security audits and penetration testing
- OWASP Top 10 mitigation strategies

**Compliance Focus:**
- Age verification data encryption (at rest and in transit)
- GDPR/CCPA data privacy controls
- Audit logging for compliance reporting
- Regular compliance reviews with legal team

---

## 2. System Architecture

### 2.1 Frontend Architecture

**Framework: Next.js 14.x**

**Directory Structure:**
```
/balisan-web
├── /app                    # Next.js App Router
│   ├── /(auth)            # Auth routes (grouped)
│   │   ├── /login
│   │   └── /signup
│   ├── /(shop)            # Main shopping experience
│   │   ├── /spirits
│   │   ├── /wine
│   │   ├── /beer
│   │   └── /[category]
│   ├── /products
│   │   └── /[id]         # Product detail page
│   ├── /cart
│   ├── /checkout
│   ├── /account
│   │   ├── /orders
│   │   ├── /favorites
│   │   └── /settings
│   ├── /discover
│   │   └── /recipes
│   └── layout.tsx         # Root layout
├── /components
│   ├── /ui                # Reusable UI components
│   ├── /features          # Feature-specific components
│   └── /layouts           # Layout components
├── /lib
│   ├── /api               # API client functions
│   ├── /hooks             # Custom React hooks
│   ├── /utils             # Utility functions
│   └── /validators        # Form validation schemas
├── /styles
│   └── globals.css        # Global styles
├── /public
│   └── /images            # Static images
└── /types                 # TypeScript type definitions
```

**State Management: Zustand**

**Why Zustand over Redux:**
- Simpler API, less boilerplate
- Excellent TypeScript support
- No context provider needed
- Built-in DevTools
- Smaller bundle size

**Store Structure:**
```typescript
// /lib/store/cart.ts
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// /lib/store/auth.ts
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  verifyAge: (dateOfBirth: Date) => boolean;
}

// /lib/store/ui.ts
interface UIStore {
  isSearchOpen: boolean;
  isCartDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleSearch: () => void;
  toggleCartDrawer: () => void;
  toggleMobileMenu: () => void;
}
```

**Styling: TailwindCSS + CSS Modules**

**Why TailwindCSS:**
- Utility-first for rapid development
- Excellent purging (small production CSS)
- Customizable design system
- Works well with component libraries
- JIT mode for on-demand classes

**Tailwind Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'balisan-amber': '#F5A623',
        'balisan-black': '#1A1A1A',
        'balisan-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'balisan': '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

**Component Library: Headless UI + Radix UI**

**Rationale:**
- Unstyled, accessible components
- Full keyboard navigation
- Screen reader support
- Customizable to match Balisan brand
- Lightweight

**Key Components:**
- Headless UI: Dialogs, Dropdowns, Transitions
- Radix UI: Tooltips, Accordions, Tabs
- React Hook Form: Form management
- Framer Motion: Animations

**Image Optimization:**
- Next.js Image component for automatic optimization
- WebP format with JPEG fallback
- Lazy loading below the fold
- Responsive images (srcset)
- Blur placeholder for product images

**Build & Deployment:**
- **Build Tool**: Next.js built-in (Turbopack in dev)
- **Deployment Platform**: Vercel
- **CI/CD**: GitHub Actions → Vercel
- **Preview Deployments**: Automatic for PRs
- **Environment Variables**: Vercel env management

### 2.2 Backend Architecture

**Approach: Hybrid (API Routes + Serverless Functions)**

**Next.js API Routes (BFF Pattern):**
Used for lightweight operations and orchestration:
- `/api/cart/*`: Cart operations (add, remove, update)
- `/api/search`: Search proxy to Algolia
- `/api/recommendations`: Product recommendations
- `/api/auth/*`: Authentication endpoints

**Serverless Functions (AWS Lambda):**
Used for heavy operations and external integrations:
- Order processing and payment
- Email/SMS notifications
- Inventory management
- Analytics event processing
- Scheduled jobs (abandoned cart, etc.)

**API Design: RESTful**

**Why REST over GraphQL:**
- Simpler for mobile apps in future
- Better caching (HTTP-level)
- Easier third-party integration
- Team familiarity
- Tooling maturity

**Base URL:** `https://api.balisan.com/v1`

**Core Endpoints:**

```
Authentication:
POST   /auth/register          # Create account
POST   /auth/login             # Login
POST   /auth/logout            # Logout
POST   /auth/verify-age        # Age gate verification
POST   /auth/verify-id         # ID document verification
GET    /auth/me                # Get current user

Products:
GET    /products               # List products (paginated, filtered)
GET    /products/:id           # Get product details
GET    /products/:id/reviews   # Get product reviews
POST   /products/:id/reviews   # Submit review

Cart:
GET    /cart                   # Get cart (session-based)
POST   /cart/items             # Add item to cart
PATCH  /cart/items/:id         # Update item quantity
DELETE /cart/items/:id         # Remove item from cart
DELETE /cart                   # Clear cart

Orders:
POST   /orders                 # Create order
GET    /orders                 # List user's orders
GET    /orders/:id             # Get order details
GET    /orders/:id/track       # Get tracking info

User:
GET    /users/me               # Get user profile
PATCH  /users/me               # Update profile
GET    /users/me/addresses     # Get saved addresses
POST   /users/me/addresses     # Add address
PATCH  /users/me/addresses/:id # Update address
DELETE /users/me/addresses/:id # Delete address

Checkout:
POST   /checkout/validate      # Validate address & age
POST   /checkout/calculate     # Calculate totals (tax, shipping)
POST   /checkout/create-intent # Create payment intent (Stripe)
POST   /checkout/complete      # Complete order

Search:
GET    /search                 # Search products (proxy to Algolia)
GET    /search/suggestions     # Autocomplete

Favorites:
GET    /favorites              # Get user's favorites
POST   /favorites              # Add to favorites
DELETE /favorites/:id          # Remove from favorites
```

**API Response Format:**

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response payload
  },
  "meta": {
    "timestamp": "2025-12-30T19:59:22Z",
    "request_id": "req_abc123"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_AGE",
    "message": "You must be 21 or older to use this service",
    "details": {}
  },
  "meta": {
    "timestamp": "2025-12-30T19:59:22Z",
    "request_id": "req_abc123"
  }
}
```

**Authentication & Authorization:**

**Strategy: JWT (JSON Web Tokens)**

**Flow:**
1. User logs in → backend validates credentials
2. Backend generates JWT (access token + refresh token)
3. Frontend stores tokens (httpOnly cookies)
4. Subsequent requests include JWT in Authorization header
5. Backend validates JWT on each request
6. Refresh token used to get new access token when expired

**Token Structure:**
```json
{
  "sub": "user_123",
  "email": "user@example.com",
  "age_verified": true,
  "id_verified": true,
  "roles": ["customer"],
  "iat": 1703961600,
  "exp": 1703965200
}
```

**Session Management:**
- Access token lifetime: 15 minutes
- Refresh token lifetime: 7 days
- Redis storage for active sessions
- Logout invalidates refresh token

### 2.3 Database Design

**Primary Database: PostgreSQL 15+**

**Hosting:** AWS RDS (Managed PostgreSQL)
- Multi-AZ deployment for high availability
- Automated backups (daily snapshots, PITR)
- Read replicas for reporting/analytics
- Connection pooling (PgBouncer)

**Schema Overview:**

**Users & Authentication:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  date_of_birth DATE NOT NULL,
  age_verified BOOLEAN DEFAULT FALSE,
  id_verified BOOLEAN DEFAULT FALSE,
  id_verification_data JSONB, -- Encrypted
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Products:**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- spirits, wine, beer, etc.
  subcategory VARCHAR(50),
  brand VARCHAR(100),
  size VARCHAR(20), -- 750ml, 1L, etc.
  abv DECIMAL(4,2), -- Alcohol by volume
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  cost DECIMAL(10,2), -- For margin calculation
  inventory_quantity INTEGER DEFAULT 0,
  reorder_point INTEGER DEFAULT 10,
  images JSONB, -- Array of image URLs
  metadata JSONB, -- Tasting notes, region, etc.
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
```

**Orders:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) NOT NULL, -- pending, processing, shipped, delivered, canceled
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  shipping_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  delivery_method VARCHAR(20), -- delivery, pickup
  delivery_slot TIMESTAMP,
  payment_status VARCHAR(20), -- pending, paid, failed, refunded
  payment_method VARCHAR(20),
  payment_intent_id VARCHAR(255), -- Stripe payment intent ID
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

**Order Items:**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_snapshot JSONB NOT NULL, -- Product details at time of purchase
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

**Addresses:**
```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50), -- Home, Office, etc.
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  street_line1 VARCHAR(255) NOT NULL,
  street_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  phone VARCHAR(20),
  is_default BOOLEAN DEFAULT FALSE,
  serviceable BOOLEAN DEFAULT TRUE, -- Can we deliver here?
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
```

**Reviews:**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id), -- Verified purchase
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  helpful_count INTEGER DEFAULT 0,
  verified_purchase BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE, -- Moderation
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
```

**Favorites:**
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
```

**Loyalty Program:**
```sql
CREATE TABLE loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points_earned INTEGER NOT NULL,
  points_spent INTEGER DEFAULT 0,
  points_balance INTEGER NOT NULL,
  source VARCHAR(50), -- purchase, referral, bonus
  reference_id UUID, -- Order ID or other reference
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_loyalty_user_id ON loyalty_points(user_id);
```

**Migration Strategy:**
- Use Prisma ORM for schema management
- Version-controlled migrations
- Blue-green deployment for zero-downtime updates

### 2.4 Caching Layer: Redis

**Use Cases:**

1. **Session Storage:**
   - Store active user sessions
   - JWT refresh token management
   - TTL: 7 days

2. **Shopping Cart (Guest & Logged-In):**
   - Temporary cart data for guest users
   - Quick cart retrieval for logged-in users
   - TTL: 30 days

3. **Product Data:**
   - Frequently accessed product details
   - Category pages
   - TTL: 1 hour, cache invalidation on product update

4. **Rate Limiting:**
   - API rate limiting by IP/user
   - Window: 100 requests/minute per user

5. **Application Cache:**
   - Homepage data (featured products, banners)
   - Search autocomplete suggestions
   - TTL: Varies by data type

**Redis Configuration:**
- AWS ElastiCache for Redis
- Cluster mode for scalability
- Multi-AZ replication
- Automatic failover

### 2.5 Search Engine: Algolia

**Index Strategy:**

**Primary Index: `products`**
- All active products
- Updated in real-time via webhooks/queue

**Replica Indices (Sorted Views):**
- `products_price_asc`: Price low to high
- `products_price_desc`: Price high to low
- `products_rating_desc`: Highest rated
- `products_newest`: Recently added

**Searchable Attributes (Ranked):**
1. Product name (highest priority)
2. Brand
3. Category, subcategory
4. Description
5. Tasting notes
6. Keywords (unranked)

**Attributes for Faceting:**
- Category
- Subcategory
- Brand
- Price ranges
- ABV ranges
- Ratings
- Region/country
- Special attributes (organic, gluten-free, etc.)

**Custom Ranking:**
1. Exact match on product name
2. Number of orders (sales popularity)
3. Average rating
4. Inventory status (in stock prioritized)

**Synonyms:**
- "whiskey" ↔ "whisky"
- "bourbon" → "whiskey"
- "scotch" → "whisky"
- "bubbly" → "sparkling wine", "champagne"

**Query Rules:**
- Autocorrect typos (distance: 2)
- Boost featured products (+10 to custom ranking)
- Hide out-of-stock items (configurable)

### 2.6 Infrastructure & Hosting

**Frontend Hosting: Vercel**

**Why Vercel:**
- Optimized for Next.js (same creators)
- Global edge network (CDN)
- Automatic HTTPS
- Instant rollbacks
- Preview deployments
- Built-in analytics
- DDoS protection

**Configuration:**
- **Plan**: Pro ($20/month)
- **Regions**: Multi-region deployment (US, EU)
- **Serverless Functions**: 10-second timeout, 1024MB memory
- **Edge Functions**: For A/B testing, personalization

**Backend Hosting: AWS**

**Services Used:**
- **EC2/ECS**: API servers (containerized)
- **Lambda**: Serverless functions
- **RDS**: PostgreSQL database
- **ElastiCache**: Redis cache
- **S3**: Static asset storage (product images)
- **CloudFront**: CDN for S3 assets
- **SES**: Transactional emails
- **SNS**: Push notifications, SMS

**Architecture Diagram (Simplified):**
```
[User Browser]
     ↓
[Vercel CDN] → [Next.js App]
     ↓              ↓
[Algolia API]   [API (AWS Lambda/ECS)]
                    ↓
              [PostgreSQL RDS]
              [Redis ElastiCache]
              [S3 + CloudFront]
```

**Environment Strategy:**

| Environment     | Purpose                  | Hosting                            |
| --------------- | ------------------------ | ---------------------------------- |
| **Development** | Local development        | localhost                          |
| **Staging**     | QA testing, client demos | Vercel Preview + AWS dev stack     |
| **Production**  | Live site                | Vercel Production + AWS prod stack |

**CDN Strategy:**
- **Vercel Edge**: HTML, CSS, JS, Next.js pages
- **CloudFront**: Product images, static assets
- **Cache-Control headers**: Aggressive for images (1 year), short for HTML (5 min)

### 2.7 Monitoring & Observability

**Application Performance Monitoring (APM):**
- **Vercel Analytics**: Frontend performance (Core Web Vitals)
- **Sentry**: Error tracking (frontend + backend)
- **Datadog** (or New Relic): Full-stack APM, infrastructure monitoring

**Logging:**
- **Vercel Logs**: Frontend logs, serverless function logs
- **CloudWatch Logs**: AWS service logs
- **Centralized**: Log aggregation in Datadog

**Alerting:**
- **PagerDuty** integration for critical alerts
- Alert conditions:
  - API response time p95 > 500ms (5 min)
  - Error rate > 1% (1 min)
  - Database CPU > 80% (5 min)
  - Checkout completion rate drops > 20%
  - Website down (1 min)

**Metrics Dashboard:**
- Real-time traffic and performance
- Conversion funnel visualization
- API endpoint performance
- Database query performance
- Cache hit rates

---

## 3. Third-Party Integrations & Services

### 3.1 Payment Processing: Stripe

**Why Stripe:**
- Industry-leading security (PCI Level 1 certified)
- Excellent developer experience
- Support for multiple payment methods
- Built-in fraud detection (Radar)
- Transparent pricing (2.9% + $0.30)
- Great documentation

**Implementation:**
- **Stripe Checkout API** for payment flow
- **Payment Intents API** for server-side confirmation
- **Webhooks** for payment status updates
- **Stripe Elements** for card input UI

**Payment Methods Supported:**
- Credit/debit cards (Visa, Mastercard, Amex, Discover)
- Apple Pay
- Google Pay
- (Future: Affirm for buy-now-pay-later)

**Security Measures:**
- Client-side tokenization (no card data touches our servers)
- 3D Secure authentication (when required)
- Stripe Radar fraud detection
- PCI DSS compliance handled by Stripe

**Webhook Events Monitored:**
```javascript
- payment_intent.succeeded
- payment_intent.payment_failed
- charge.refunded
- charge.dispute.created
```

**Test Mode:**
- Separate test keys for development
- Test card numbers for QA

### 3.2 Age Verification: Yoti

**Why Yoti:**
- Age estimation AI (no ID required for age gate)
- ID verification API (for checkout)
- GDPR/CCPA compliant
- Fast verification (< 30 seconds)
- Fraud detection built-in
- Reasonable pricing (~$0.30/verification)

**Implementation:**

**Age Gate (Soft Verification):**
- User submits date of birth
- Frontend validation (must be 21+)
- Cookie/localStorage to remember (30 days)
- No external API call (cost optimization)

**ID Verification (Hard Verification - Checkout):**
- First-time purchasers only
- Yoti SDK integration
- User uploads government-issued ID (license, passport)
- Real-time AI verification
- Results stored in database (encrypted)
- Future orders skip this step

**Data Handling:**
- Yoti doesn't store images permanently
- We store verification result only (boolean + timestamp)
- ID document data encrypted at rest (AES-256)
- Automatic deletion after 90 days (compliance)

**Fallback:**
- Manual review queue for failed verifications
- Customer support can approve/reject

### 3.3 Logistics & Fulfillment: Onfleet

**Why Onfleet:**
- Purpose-built for delivery logistics
- Driver app for iOS/Android
- Route optimization
- Real-time tracking
- SMS notifications to customers
- Proof of delivery (signature capture)
- Analytics dashboard

**Integration:**
- **API**: Create delivery tasks programmatically
- **Webhooks**: Delivery status updates (picked up, in transit, delivered)
- **Customer Tracking**: Unique tracking links

**Delivery Workflow:**
1. Order confirmed → Create Onfleet task
2. Task assigned to driver
3. Driver receives notification
4. Route optimized automatically
5. Customer receives tracking link (SMS/email)
6. Driver delivers → Captures signature
7. Webhook updates order status → Database
8. Customer notification sent

**In-Store Pickup:**
- Separate workflow (no Onfleet integration)
- Internal system notifies store staff
- Customer receives "Ready for Pickup" email
- In-store staff uses internal app to mark as picked up

### 3.4 Email & SMS: SendGrid + Twilio

**Transactional Email: SendGrid**

**Templates:**
- Order confirmation
- Shipping notification
- Delivery confirmation
- Password reset
- Account verification
- Review request
- Abandoned cart reminder
- Welcome series

**Implementation:**
- SendGrid Dynamic Templates
- Handlebars templating
- Unsubscribe management
- Open/click tracking
- Batch sending for newsletters

**SMS Notifications: Twilio**

**Use Cases:**
- Order status updates (opt-in)
- Delivery driver arrival (10 min warning)
- Pickup ready notification
- Two-factor authentication (future)

**Implementation:**
- Twilio Programmable SMS
- Short code or long code (TBD based on volume)
- Opt-in required (TCPA compliance)
- Opt-out keywords (`STOP`, `UNSUBSCRIBE`)

### 3.5 Analytics & Tracking

**Google Analytics 4:**
- User behavior tracking
- Conversion funnel analysis
- Enhanced ecommerce tracking
- Custom events (add to cart, wishlist, etc.)
- UTM campaign tracking

**Facebook Pixel:**
- Retargeting campaigns
- Lookalike audiences
- Conversion tracking for ads

**Segment (Optional):**
- Single API for multiple analytics tools
- Data warehouse integration
- Customer data platform

**A/B Testing: Vercel Edge Config + Custom Solution**
- Feature flags
- Variant assignment
- Conversion tracking
- Statistical significance calculation

### 3.6 Customer Support: Zendesk (Future) / Initial: Email

**MVP Phase:**
- Email support (support@balisan.com)
- Help Center (FAQ pages)
- Contact form on website

**Post-Launch (3-6 months):**
- **Zendesk Support** for ticketing
- **Zendesk Chat** for live chat
- Knowledge base integration
- Automation rules

---

## 4. Security & Compliance

### 4.1 Security Measures

**SSL/TLS Encryption:**
- TLS 1.3 minimum (Vercel + AWS ELB)
- Automatic certificate management (Let's Encrypt)
- HSTS header enforced
- All HTTP traffic redirected to HTTPS

**API Security:**

**Authentication:**
- JWT-based authentication
- Secure token storage (httpOnly cookies)
- Short-lived access tokens (15 min)
- Refresh token rotation

**Rate Limiting:**
- General API: 100 requests/minute per IP
- Authentication endpoints: 5 attempts/minute
- Search API: 200 requests/minute
- Implemented at API Gateway level + Redis

**CORS Policy:**
```javascript
{
  "origin": ["https://balisan.com", "https://www.balisan.com"],
  "methods": ["GET", "POST", "PATCH", "DELETE"],
  "allowedHeaders": ["Content-Type", "Authorization"],
  "credentials": true
}
```

**CSRF Protection:**
- Double-submit cookie pattern
- Validated on state-changing operations (POST, PATCH, DELETE)

**Input Validation:**
- Server-side validation for all inputs
- SQL injection prevention (parameterized queries via ORM)
- XSS prevention (content sanitization, CSP headers)
- Schema validation (Zod library)

**Content Security Policy (CSP):**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  img-src 'self' data: https: blob:; 
  font-src 'self' https://fonts.gstatic.com; 
  connect-src 'self' https://api.balisan.com https://api.stripe.com;
```

**Password Security:**
- Bcrypt hashing (cost factor: 12)
- Minimum password requirements (8 chars, 1 uppercase, 1 number, 1 special)
- Password strength meter on signup
- Breach detection (Have I Been Pwned API)

**Data Encryption:**

**At Rest:**
- Database encryption (AWS RDS encryption)
- S3 bucket encryption (AES-256)
- Sensitive fields double-encrypted in database (ID verification data)

**In Transit:**
- TLS 1.3 for all communications
- Internal services use TLS (mutual TLS for sensitive services)

### 4.2 Compliance

**PCI DSS (Payment Card Industry Data Security Standard):**
- Level 1 compliance via Stripe
- No card data stored on our servers
- Quarterly PCI scans (ASV)
- Annual on-site audit (if required)
- SAQ (Self-Assessment Questionnaire) completion

**GDPR (General Data Protection Regulation):**
- **Data Minimization**: Collect only necessary data
- **Right to Access**: API endpoint for users to download their data
- **Right to Erasure**: Account deletion with data purge
- **Right to Portability**: JSON export of user data
- **Consent Management**: Clear opt-ins for marketing emails
- **Privacy Policy**: GDPR-compliant policy published
- **Data Processing Agreement**: With all third-party vendors

**CCPA (California Consumer Privacy Act):**
- "Do Not Sell My Personal Information" link in footer
- Disclosure of data collection practices
- Opt-out mechanism for data sharing
- User data access and deletion rights

**Age Verification & Alcohol Sales:**
- Compliance with TTB (Alcohol and Tobacco Tax and Trade Bureau) regulations
- State-by-state licensing requirements
- Adult signature required at delivery
- Age verification audit logs
- Delivery restriction by jurisdiction

**Audit Logging:**
```javascript
{
  "timestamp": "2025-12-30T19:59:22Z",
  "event_type": "ID_VERIFICATION_COMPLETED",
  "user_id": "user_123",
  "ip_address": "192.0.2.1",
  "result": "VERIFIED",
  "metadata": {
    "verification_provider": "yoti",
    "verification_id": "yoti_abc123"
  }
}
```

**Logged Events:**
- User registration
- Age verification attempts
- ID verification completions
- Order creation
- Payment processing
- Refunds
- Data access/export requests
- Account deletions

**Data Retention Policy:**
- Order data: 7 years (financial records requirement)
- User accounts: Until deletion requested or 3 years inactive
- ID verification data: 90 days post-verification
- Session data: 7 days
- Analytics data: 26 months (GA4 default)

### 4.3 Incident Response Plan

**Security Incident Classifications:**
- **P0 (Critical)**: Data breach, site down, payment processing failure
- **P1 (High)**: Elevated error rates, performance degradation
- **P2 (Medium)**: Non-critical feature broken
- **P3 (Low)**: Minor bugs, cosmetic issues

**Response Procedures:**

**P0 Incident:**
1. Immediate notification to on-call engineer (PagerDuty)
2. Assemble incident response team
3. Isolate affected systems if necessary
4. Begin investigation and root cause analysis
5. Communicate with stakeholders (hourly updates)
6. Implement fix and test
7. Post-incident review within 48 hours

**Data Breach Protocol:**
1. Contain the breach immediately
2. Assess scope and impact
3. Notify legal counsel
4. Notify affected users (within 72 hours - GDPR requirement)
5. Report to authorities if required
6. Conduct forensic analysis
7. Implement remediation measures
8. Public disclosure if necessary

---

## 5. Performance Requirements

### 5.1 Frontend Performance

**Core Web Vitals Targets:**
- **LCP (Largest Contentful Paint)**: < 2.5s (75th percentile)
- **FID (First Input Delay)**: < 100ms (75th percentile)
- **CLS (Cumulative Layout Shift)**: < 0.1 (75th percentile)
- **INP (Interaction to Next Paint)**: < 200ms (75th percentile - new metric)

**Additional Metrics:**
- **TTFB (Time to First Byte)**: < 600ms
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.5s
- **Speed Index**: < 3.4s

**Optimization Strategies:**

**1. Code Splitting:**
- Route-based splitting (Next.js automatic)
- Component-level dynamic imports for heavy components
- Third-party library code splitting

**2. Image Optimization:**
- Next.js Image component (automatic WebP, sizing)
- BLUR placeholders for product images
- Lazy loading below fold
- Responsive images (multiple sizes)
- CDN delivery (Vercel Edge, CloudFront)

**3. Font Optimization:**
- Self-hosted fonts (Google Fonts via next/font)
- Font subset loading (Latin only)
- Font-display: swap
- Preload critical fonts

**4. JavaScript Optimization:**
- Tree shaking (unused code eliminated)
- Minification and compression (Gzip/Brotli)
- Code splitting (< 200KB per route)
- Defer non-critical JS

**5. CSS Optimization:**
- TailwindCSS purging (unused classes removed)
- Critical CSS inlining
- Separate CSS files per route
- CSS minification

**6. Caching Strategy:**
```
Static assets: Cache-Control: public, max-age=31536000, immutable
HTML pages: Cache-Control: public, max-age=0, must-revalidate
API responses: Cache-Control: private, max-age=300
```

**7. Third-Party Script Management:**
- Load analytics async/defer
- Stripe.js loaded only on checkout
- Partytown for web worker offloading

### 5.2 Backend Performance

**API Response Time Targets:**
- **p50 (Median)**: < 100ms
- **p95**: < 200ms
- **p99**: < 500ms
- **p99.9**: < 1000ms

**Database Query Optimization:**
- Proper indexing on frequently queried columns
- Query result caching (Redis)
- Connection pooling (max 100 connections)
- Read replicas for analytics queries
- Avoid N+1 queries (use joins or batch loading)

**Example Optimization:**
```sql
-- Before (N+1 query problem)
SELECT * FROM orders WHERE user_id = 'user_123';
-- Then for each order:
SELECT * FROM order_items WHERE order_id = 'order_id';

-- After (single query with join)
SELECT 
  o.*, 
  json_agg(oi.*) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 'user_123'
GROUP BY o.id;
```

**Caching Strategy:**
- Product details: 1 hour (invalidate on update)
- Category pages: 30 minutes
- User session: 15 minutes (refresh on activity)
- Search results: 5 minutes
- Cart data: Real-time (no cache)

**Load Balancing:**
- AWS Application Load Balancer (ALB)
- Health checks every 30 seconds
- Automatic scaling based on CPU/request metrics

### 5.3 Search Performance

**Algolia Performance:**
- Search response time: < 50ms (99th percentile)
- Autocomplete suggestions: < 30ms
- Faceted filtering: No performance degradation

**Index Optimization:**
- Compact attribute names (reduce index size)
- Relevant attributes only
- Regular index pruning (remove inactive products)

### 5.4 Mobile Performance

**3G Network Testing:**
- Lighthouse throttled testing
- All Core Web Vitals met on 3G (slower)
- Progressive enhancement approach

**Mobile-Specific Optimizations:**
- Smaller image sizes for mobile viewports
- Reduced JavaScript payload
- Touch event optimization
- Service worker for offline support (future)

---

## 6. Scalability & Reliability

### 6.1 Horizontal Scaling

**Frontend (Vercel):**
- Automatic scaling (serverless functions)
- Global CDN distribution
- No action required from our side

**Backend (AWS):**
- Auto Scaling Groups for EC2/ECS
  - Minimum instances: 2
  - Maximum instances: 10
  - Scale-up trigger: CPU > 70% for 2 minutes
  - Scale-down trigger: CPU < 30% for 5 minutes

**Database (PostgreSQL):**
- Vertical scaling (upgrade instance size)
- Read replicas for read-heavy operations
  - 1 read replica at launch
  - Up to 5 replicas if needed
- Connection pooling (PgBouncer)

**Redis:**
- ElastiCache cluster mode
- Automatic sharding
- Multi-AZ replication

### 6.2 Load Testing

**Testing Strategy:**
- **Tools**: k6, Apache JMeter
- **Scenarios**:
  1. Normal load: 500 concurrent users
  2. Peak load: 2,000 concurrent users (Black Friday)
  3. Stress test: 5,000+ concurrent users (find breaking point)
  4. Spike test: Sudden traffic surge simulation

**Pre-Launch Load Testing:**
- Week 16: Initial load tests
- Week 18: Soft launch stress test (real users)
- Week 19: Full simulated Black Friday test

### 6.3 Disaster Recovery & Backups

**Database Backups:**
- **Automated daily snapshots** (AWS RDS)
- **Retention**: 30 days
- **Point-in-time recovery**: Up to 5 minutes
- **Cross-region backup** (DR): Every 24 hours to alternate region

**Application Backups:**
- **Code**: Git repository (GitHub)
- **Infrastructure as Code**: Terraform/CDK in version control
- **Environment configs**: Encrypted in 1Password/AWS Secrets Manager

**Recovery Time Objective (RTO):** < 2 hours
**Recovery Point Objective (RPO):** < 5 minutes (data loss tolerance)

**Disaster Scenarios & Plans:**

| Disaster                | Impact              | Recovery Plan                                     | RTO       |
| ----------------------- | ------------------- | ------------------------------------------------- | --------- |
| **Database failure**    | Site down           | Restore from latest snapshot, failover to standby | 30 min    |
| **Region outage (AWS)** | Site down in region | Failover to backup region                         | 1-2 hours |
| **Complete data loss**  | Catastrophic        | Restore from cross-region backup                  | 2-4 hours |
| **DDoS attack**         | Site slow/down      | CloudFlare DDoS protection, AWS Shield            | 15 min    |
| **Security breach**     | Data compromised    | Isolate systems, incident response plan activated | Varies    |

### 6.4 Uptime & SLA

**Target Uptime:** 99.9% (8.76 hours downtime/year)

**Planned Maintenance:**
- Scheduled weekly maintenance window: Sundays 2-4am EST
- Notifications sent 48 hours in advance
- Zero-downtime deployments preferred (blue-green)

**Monitoring & Alerting:**
- Uptime monitoring: Pingdom (external)
- Status page: Custom status.balisan.com
- Incident communication: Email + status page updates

---

## 7. Development Workflow

### 7.1 Version Control & Git Workflow

**Repository Structure:**
```
/balisan-monorepo
├── /frontend              # Next.js app
├── /backend               # API services
├── /infrastructure        # Terraform/IaC
├── /shared                # Shared types, utilities
└── /scripts               # Build, deployment scripts
```

**Git Workflow: Trunk-Based Development**

**Branching Strategy:**
- `main`: Production-ready code (protected)
- `develop`: Integration branch (protected)
- `feature/*`: Feature branches (short-lived)
- `hotfix/*`: Urgent production fixes

**Branch Protection Rules (main & develop):**
- Require pull request reviews (minimum 1 approval)
- Require status checks to pass
- Require branches to be up to date before merging
- No force pushes
- No deletions

**Commit Convention (Conventional Commits):**
```
feat(cart): add quantity selector
fix(checkout): resolve address validation bug
chore(deps): update Next.js to 14.1
docs(readme): update setup instructions
```

### 7.2 CI/CD Pipeline

**Tool: GitHub Actions**

**Pipeline Stages:**

**1. Pull Request Pipeline:**
```yaml
name: PR Checks
on: [pull_request]

jobs:
  lint:
    - ESLint (frontend)
    - Prettier (code formatting)
    - TypeScript type checking
  
  test:
    - Unit tests (Jest)
    - Component tests (React Testing Library)
    - API tests
    - Coverage threshold: 80%
  
  build:
    - Next.js build
    - Backend build
    - Check for build errors
  
  security:
    - Dependency vulnerability scan (npm audit)
    - SAST (Snyk)
```

**2. Deploy to Staging (on merge to develop):**
```yaml
name: Deploy Staging
on:
  push:
    branches: [develop]

jobs:
  deploy:
    - Run tests
    - Build application
    - Deploy to Vercel (staging)
    - Deploy backend to AWS (staging)
    - Run E2E tests (Playwright)
    - Notify team (Slack)
```

**3. Deploy to Production (on merge to main):**
```yaml
name: Deploy Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    - Run full test suite
    - Build application
    - Deploy to Vercel (production)
    - Deploy backend to AWS (production)
    - Run smoke tests
    - Monitor for errors (5 min)
    - Notify team (Slack)
```

### 7.3 Code Quality Tools

**Linting:**
- **ESLint**: JavaScript/TypeScript linting
- **Config**: Airbnb style guide with custom rules
- **Plugins**: React, Next.js, a11y

**Formatting:**
- **Prettier**: Automatic code formatting
- **Integration**: Pre-commit hook (Husky)

**Type Checking:**
- **TypeScript**: Strict mode enabled
- **No implicit any**
- **Unused variables flagged**

**Pre-Commit Hooks (Husky + lint-staged):**
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

**Code Review Checklist:**
- [ ] Code follows style guide
- [ ] Unit tests added/updated
- [ ] No console.log or debugger statements
- [ ] TypeScript types properly defined
- [ ] Accessibility considerations (ARIA, keyboard nav)
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] Documentation updated

### 7.4 Testing Strategy

**Unit Testing (80% coverage target):**
- **Framework**: Jest + React Testing Library
- **Scope**: Utility functions, React components, API logic
- **Approach**: Test behavior, not implementation

**Integration Testing:**
- **Framework**: Jest
- **Scope**: API endpoints, database operations
- **Approach**: Test multiple units working together

**End-to-End Testing:**
- **Framework**: Playwright
- **Scope**: Critical user flows
  - User registration and login
  - Product search and filtering
  - Add to cart and checkout
  - Order placement (with test payment)
- **Execution**: Run on staging before production deploy

**Performance Testing:**
- **Framework**: Lighthouse CI
- **Scope**: All major pages
- **Thresholds**:
  - Performance score: > 90
  - Accessibility score: > 95
  - Best Practices: > 90
  - SEO: > 95

**Visual Regression Testing (Future):**
- **Tool**: Percy (or Chromatic)
- **Scope**: UI components, key pages
- **Execution**: On every PR

**Manual Testing:**
- QA team testing (Week 17-18)
- User Acceptance Testing (UAT) with beta users
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS, Android)

### 7.5 Documentation

**Code Documentation:**
- **TSDoc**: Inline documentation for complex functions
- **README files**: In each major directory
- **API Documentation**: OpenAPI/Swagger spec

**API Documentation:**
- **Tool**: Swagger UI
- **Contents**:
  - All endpoints with parameters, examples, responses
  - Authentication flow
  - Error codes and handling
  - Rate limiting details

**Component Documentation:**
- **Tool**: Storybook
- **Contents**:
  - All reusable UI components
  - Props documentation
  - Usage examples
  - Accessibility notes

**Developer Onboarding:**
- **Setup Guide**: Step-by-step local development setup
- **Architecture Overview**: System design, technology choices
- **Contribution Guidelines**: How to contribute, coding standards
- **Troubleshooting**: Common issues and solutions

---

## 8. Development Phases & Timeline

### Phase 1: Foundation (Weeks 1-4)

**Week 1-2: Infrastructure & Setup**
- Set up repositories (monorepo structure)
- Configure CI/CD pipelines
- Provision AWS resources (RDS, ElastiCache, S3)
- Set up Vercel project
- Configure Algolia index
- Establish development environment

**Week 3-4: Authentication & User Management**
- User registration and login
- JWT implementation
- Age gate modal
- Password reset flow
- User profile management
- Session management (Redis)

**Deliverables:**
- Working dev environment
- User authentication system
- Basic UI shell with navigation

### Phase 2: Core Commerce (Weeks 5-12)

**Week 5-6: Product Catalog**
- Database schema for products
- Product listing pages (PLP)
- Product detail pages (PDP)
- Category navigation
- Basic filtering and sorting
- Algolia search integration

**Week 7-8: Shopping Cart**
- Cart state management (Zustand)
- Add to cart functionality
- Cart page with quantity updates
- Mini cart dropdown
- Cart persistence (Redis for guests, DB for logged-in)

**Week 9-10: Checkout Flow**
- Multi-step checkout UI
- Address validation
- Delivery slot selection
- Stripe integration
- Payment processing
- Order confirmation

**Week 11-12: Order Management**
- Order database schema
- Order history page
- Order detail page
- Order tracking integration (Onfleet)
- Email notifications (SendGrid)

**Deliverables:**
- Full shopping experience (browse → cart → checkout)
- Payment processing functional
- Order management system

### Phase 3: Compliance & Polish (Weeks 13-16)

**Week 13: Age Verification**
- Yoti integration
- ID upload and verification flow
- Verification status tracking
- Compliance audit logging

**Week 14: Content & SEO**
- Product descriptions (50+ SKUs)
- Recipe content (25+ recipes)
- Static pages (About, FAQ, Legal)
- SEO optimization (meta tags, structured data)
- Sitemap generation

**Week 15: Account Features**
- Address book management
- Payment methods management
- Favorites/wishlist
- Loyalty points display
- Communication preferences

**Week 16: Testing & QA**
- Full regression testing
- Load testing
- Security audit
- Accessibility audit
- Bug fixes

**Deliverables:**
- Fully compliant platform
- Content-rich site
- Production-ready quality

### Phase 4: Launch Preparation (Weeks 17-20)

**Week 17: Soft Launch Prep**
- Final bug fixes
- Performance optimization
- Analytics implementation verification
- Customer support training
- Create help documentation

**Week 18: Soft Launch**
- Launch to limited audience (200-300 users)
- Monitor closely
- Gather feedback
- Quick iteration on critical issues

**Week 19: Pre-Launch Optimization**
- Address soft launch feedback
- Final performance tuning
- Full load testing (simulated Black Friday)
- Marketing asset preparation

**Week 20: Full Launch**
- Production deployment
- Marketing campaign activation
- Customer support scaling
- Post-launch monitoring

**Deliverables:**
- Live website
- Proven order fulfillment
- Marketing materials
- Support infrastructure

---

## 9. Technical Risks & Mitigation

### Risk 1: Age Verification Compliance Failure

**Impact:** Critical - Legal liability, site shutdown

**Probability:** Medium

**Mitigation:**
- Legal review of implementation
- Multiple verification methods (age gate + ID check)
- Third-party verification service (Yoti) - proven solution
- Comprehensive audit logging
- Regular compliance audits
- Staff training on responsible service

**Contingency:**
- Manual ID verification process as fallback
- Ability to disable sales if verification down
- Legal counsel on retainer

### Risk 2: Stripe Payment Integration Issues

**Impact:** High - Cannot process orders, revenue loss

**Probability:** Low

**Mitigation:**
- Thorough testing with Stripe test mode
- Error handling for all payment scenarios
- Webhook reliability (retry logic)
- Stripe status monitoring
- 24/7 on-call for payment issues

**Contingency:**
- Backup payment processor (PayPal) ready to activate
- Manual payment processing for VIP customers

### Risk 3: Database Performance Degradation

**Impact:** High - Slow site, poor UX, lost sales

**Probability:** Medium

**Mitigation:**
- Proper indexing from the start
- Database query monitoring (slow query log)
- Redis caching layer
- Read replicas for read-heavy operations
- Regular VACUUM and ANALYZE (PostgreSQL maintenance)
- Load testing before launch

**Contingency:**
- Vertical scaling (upgrade RDS instance)
- Query optimization sprint
- Temporary caching of all reads

### Risk 4: Third-Party Service Downtime (Algolia, Yoti, Stripe, Onfleet)

**Impact:** Medium to High - Feature degradation or site unusable

**Probability:** Low

**Mitigation:**
- SLA review for all services (aim for 99.9%+)
- Status page monitoring for all services
- Graceful degradation (e.g., fallback to database search if Algolia down)
- Cached responses where possible
- Clear error messaging to users

**Contingency:**
- Manual workarounds documented
- Backup services evaluated
- Communication plan for users during outages

### Risk 5: Security Breach / Data Leak

**Impact:** Critical - User trust, legal liability, financial loss

**Probability:** Low

**Mitigation:**
- Security best practices throughout development
- Regular security audits (quarterly)
- Penetration testing (pre-launch, annually)
- OWASP Top 10 adherence
- Encryption at rest and in transit
- Minimal data collection (data minimization)
- Staff security training

**Contingency:**
- Incident response plan (Section 4.3)
- Cyber insurance policy
- External security firm on retainer

---

## 10. Future Considerations

### 10.1 Mobile Applications (6-12 Months Post-Launch)

**Platform:** React Native (code sharing with web)

**Features:**
- Native push notifications (order updates, promotions)
- Biometric authentication (Face ID, Touch ID)
- Barcode scanner (search by UPC)
- Offline mode (browse, cart saved)
- Location-based store finder
- Apple Pay / Google Pay (native)

**Rationale:** 60%+ of e-commerce traffic from mobile, native app improves retention

### 10.2 Subscription Service (3-6 Months Post-Launch)

**Concept:** Monthly curated spirits/wine boxes

**Technical Requirements:**
- Subscription management (Stripe Billing)
- Recurring payment processing
- Subscription dashboard (pause, skip, cancel)
- Inventory allocation for subscription stock
- Recommendation engine for curation

### 10.3 B2B / Wholesale Portal (12+ Months)

**Target:** Restaurants, bars, event planners

**Features:**
- Bulk ordering with volume pricing
- Invoice payment terms (net 30)
- Account rep assignment
- Order approval workflows
- Integration with restaurant POS systems

**Technical:**
- Separate user roles (business customer)
- Multi-user accounts (team access)
- Custom pricing engine
- Invoice generation

### 10.4 International Expansion (18+ Months)

**Markets:** Canada, UK, EU

**Technical Challenges:**
- Multi-currency support
- Internationalization (i18n) - translations
- Country-specific compliance
- International shipping logistics
- Tax calculation (VAT, customs)

**Tech Stack Additions:**
- i18next for translations
- Stripe multi-currency
- Avalara for international tax

### 10.5 AI/ML Enhancements (Ongoing)

**Personalization Engine:**
- Collaborative filtering for recommendations
- Taste profile building
- Predictive search (search before typing)
- Dynamic pricing optimization

**Inventory Optimization:**
- Demand forecasting (reduce stockouts)
- Optimal reorder point calculation
- Seasonal trend prediction

**Tech Stack:**
- TensorFlow.js or AWS SageMaker
- Data pipeline (ETL to data warehouse)
- A/B testing framework

---

## 11. Appendices

### 11.1 Technology Stack Summary

| Layer            | Technology      | Version  | Purpose                  |
| ---------------- | --------------- | -------- | ------------------------ |
| **Frontend**     | Next.js         | 14.x     | React framework, SSR/SSG |
|                  | React           | 18.x     | UI library               |
|                  | TypeScript      | 5.x      | Type safety              |
|                  | TailwindCSS     | 3.x      | Styling                  |
|                  | Zustand         | 4.x      | State management         |
|                  | React Hook Form | 7.x      | Form handling            |
|                  | Zod             | 3.x      | Schema validation        |
| **Backend**      | Node.js         | 20.x LTS | Runtime                  |
|                  | Express         | 4.x      | API framework            |
|                  | Prisma          | 5.x      | ORM                      |
| **Database**     | PostgreSQL      | 15.x     | Primary database         |
|                  | Redis           | 7.x      | Caching, sessions        |
| **Search**       | Algolia         | N/A      | Product search           |
| **Hosting**      | Vercel          | N/A      | Frontend hosting         |
|                  | AWS             | N/A      | Backend services         |
| **Payments**     | Stripe          | Latest   | Payment processing       |
| **Verification** | Yoti            | Latest   | Age/ID verification      |
| **Logistics**    | Onfleet         | Latest   | Delivery management      |
| **Email**        | SendGrid        | Latest   | Transactional email      |
| **SMS**          | Twilio          | Latest   | SMS notifications        |

### 11.2 API Endpoints Summary

See Section 2.2 for full endpoint documentation.

### 11.3 Database ERD (Entity Relationship Diagram)

```
users (id, email, password_hash, date_of_birth, ...)
  ├─ 1:N → orders (user_id, ...)
  ├─ 1:N → addresses (user_id, ...)
  ├─ 1:N → reviews (user_id, ...)
  ├─ 1:N → favorites (user_id, product_id)
  └─ 1:N → loyalty_points (user_id, ...)

products (id, name, category, price, ...)
  ├─ 1:N → order_items (product_id, ...)
  ├─ 1:N → reviews (product_id, ...)
  └─ 1:N → favorites (user_id, product_id)

orders (id, user_id, status, total, ...)
  ├─ 1:N → order_items (order_id, product_id, quantity, ...)
  └─ N:1 → users (user_id)
```

### 11.4 Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=https://api.balisan.com/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_ALGOLIA_APP_ID=...
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

**Backend (.env):**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/balisan
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
YOTI_CLIENT_SDK_ID=...
YOTI_KEY_FILE_PATH=...
ONFLEET_API_KEY=...
SENDGRID_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
JWT_SECRET=...
NODE_ENV=production
```

### 11.5 Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing (unit, integration, E2E)
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Legal review completed (T&C, Privacy Policy)
- [ ] Load testing completed successfully
- [ ] Backup and recovery tested
- [ ] Monitoring and alerting configured
- [ ] SSL certificates configured
- [ ] Environment variables set correctly
- [ ] Third-party API keys configured (production)
- [ ] Database migrations applied
- [ ] CDN configured and tested
- [ ] DNS records configured
- [ ] Status page set up

**Post-Deployment:**
- [ ] Smoke tests passed
- [ ] Monitor error rates (< 0.1% acceptable)
- [ ] Monitor performance (Core Web Vitals)
- [ ] Verify analytics tracking
- [ ] Test critical user flows manually
- [ ] Customer support briefed and ready
- [ ] Marketing assets deployed
- [ ] Announcement emails sent

### 11.6 Related Documents

- Product Requirements Document (PRD)
- Security Audit Report
- Load Testing Report
- API Documentation (Swagger)
- Database Schema Documentation
- Runbook (Operations Manual)
- Incident Response Plan

---

**Document Approval:**

| Role              | Name  | Signature | Date  |
| ----------------- | ----- | --------- | ----- |
| Technical Lead    | [TBD] | _________ | _____ |
| Frontend Lead     | [TBD] | _________ | _____ |
| Backend Lead      | [TBD] | _________ | _____ |
| Security Engineer | [TBD] | _________ | _____ |
| DevOps Engineer   | [TBD] | _________ | _____ |
| Product Manager   | [TBD] | _________ | _____ |

---

**Version History:**

| Version | Date       | Author           | Changes                  |
| ------- | ---------- | ---------------- | ------------------------ |
| 1.0     | 2025-12-30 | Engineering Team | Initial draft for review |

---

*This document is confidential and proprietary to Balisan. Distribution is limited to project stakeholders.*
