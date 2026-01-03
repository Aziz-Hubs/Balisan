# Balisan Database Schema Documentation

## Overview
This document outlines the PostgreSQL database schema for the Balisan e-commerce platform. The schema is normalized and designed for scalability, security (RLS), and performance.

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    BRANDS ||--|{ PRODUCTS : "produces"
    CATEGORIES ||--|{ PRODUCTS : "classifies"
    CATEGORIES ||--|{ CATEGORIES : "parent of"
    
    PROFILES ||--|{ ADDRESSES : "has"
    PROFILES ||--|{ ORDERS : "places"
    PROFILES ||--|{ REVIEWS : "writes"
    PROFILES ||--|{ WISHLISTS : "maintains"
    PROFILES ||--|{ CONTENT_POSTS : "authors"
    PROFILES ||--|{ RECIPES : "creates"
    
    PRODUCTS ||--|{ ORDER_ITEMS : "included in"
    ORDERS ||--|{ ORDER_ITEMS : "contains"
    
    PRODUCTS ||--|{ REVIEWS : "receives"
    PRODUCTS ||--|{ WISHLISTS : "saved to"
    PRODUCTS ||--|{ RECIPE_INGREDIENTS : "used in"
    
    RECIPES ||--|{ RECIPE_INGREDIENTS : "has"

    brands {
        uuid id PK
        text name
        text slug UK
    }
    categories {
        uuid id PK
        uuid parent_id FK
        text name
        text slug UK
    }
    products {
        uuid id PK
        uuid brand_id FK
        uuid category_id FK
        text name
        text slug UK
        numeric price
        jsonb images
        jsonb flavor_profile
    }
    profiles {
        uuid id PK "links to auth.users"
        enum role "admin, customer"
        text email
    }
    orders {
        uuid id PK
        uuid user_id FK
        numeric total_amount
        enum status
    }
```

## Tables & Domains

### 1. Catalog
- **`brands`**: Manufacturers/Distilleries.
- **`categories`**: Hierarchical classification (e.g., Spirits -> Whiskey -> Scotch).
- **`products`**: Core item table. Uses JSONB for flexible Attributes like `images` and `flavor_profile` to accommodate different product types without massive column sprawl.

### 2. Identity
- **`profiles`**: Extends Supabase `auth.users`. Handled via Trigger (`on_auth_user_created`).
    - **Roles**: `admin`, `customer`, `staff`.
- **`addresses`**: User shipping/billing addresses.

### 3. Commerce
- **`orders`**: Transactional record. Stores snapshots of addresses (JSONB) to preserve history even if user updates their profile address.
- **`order_items`**: Line items. Stores snapshots of product details (`price`, `name`) at time of purchase.

### 4. Content & Social
- **`reviews`**: User generated ratings. Restricted to one per product per user.
- **`content_posts`**: Blog and Journal entries.
- **`recipes`**: Cocktail recipes with shoppable ingredients.

## Security (RLS)

All tables have RLS enabled.

| Domain       | Table                              | Policy Summary                                 |
| :----------- | :--------------------------------- | :--------------------------------------------- |
| **Catalog**  | `products`, `brands`, `categories` | **Public Read**. Admin Write.                  |
| **Identity** | `profiles`                         | **Public Read**. User Update Own. Admin All.   |
| **Identity** | `addresses`                        | **Private** (User/Admin only).                 |
| **Commerce** | `orders`, `order_items`            | **Private** (User Read/Create Own). Admin All. |
| **Social**   | `reviews`                          | **Public Read**. User Write Own.               |
| **Social**   | `wishlists`                        | **Private** (User/Admin only).                 |
| **Content**  | `content_posts`, `recipes`         | **Public Read** (if published). Admin All.     |

## Indexing Strategy
- **Primary Keys**: UUID (gen_random_uuid).
- **Foreign Keys**: Indexed for join performance (`category_id`, `brand_id`, `user_id`).
- **Search**: GIN Index on `products(name, description)` for text search.
- **Sorting**: Indexes on `price`, `rating`, `created_at` for product listing pages.
