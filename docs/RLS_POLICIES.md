# Row-Level Security (RLS) Policies

This document outlines the Row-Level Security policies for the Balisan Liquor Store Supabase database.

## Overview

RLS ensures data access is controlled at the database level, providing security even if application logic is compromised.

---

## Policy Definitions

### `categories` Table
| Policy      | Operation              | Logic                        |
| ----------- | ---------------------- | ---------------------------- |
| Public read | SELECT                 | Anyone can read categories   |
| Admin write | INSERT, UPDATE, DELETE | Only users with `admin` role |

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Categories are editable by admins" ON categories
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

### `products` Table
| Policy      | Operation              | Logic                        |
| ----------- | ---------------------- | ---------------------------- |
| Public read | SELECT                 | Anyone can read products     |
| Admin write | INSERT, UPDATE, DELETE | Only users with `admin` role |

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

CREATE POLICY "Products are editable by admins" ON products
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

### `users` Table
| Policy      | Operation | Logic                                   |
| ----------- | --------- | --------------------------------------- |
| Self read   | SELECT    | Users can only read their own profile   |
| Self update | UPDATE    | Users can only update their own profile |
| Admin read  | SELECT    | Admins can read all profiles            |

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
```

---

### `addresses` Table
| Policy     | Operation | Logic                                     |
| ---------- | --------- | ----------------------------------------- |
| Owner CRUD | ALL       | Users can only access their own addresses |

```sql
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses" ON addresses
    FOR ALL USING (auth.uid() = user_id);
```

---

### `orders` Table
| Policy     | Operation | Logic                           |
| ---------- | --------- | ------------------------------- |
| Owner read | SELECT    | Users can view their own orders |
| Admin full | ALL       | Admins can manage all orders    |

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" ON orders
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

### `order_items` Table
| Policy    | Operation | Logic                                  |
| --------- | --------- | -------------------------------------- |
| Via order | SELECT    | Inherits permissions from parent order |

```sql
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items for own orders" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all order items" ON order_items
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

### `reviews` Table
| Policy       | Operation              | Logic                              |
| ------------ | ---------------------- | ---------------------------------- |
| Public read  | SELECT                 | Anyone can read approved reviews   |
| Author write | INSERT, UPDATE, DELETE | Users can manage their own reviews |

```sql
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews" ON reviews
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

---

## Implementation Notes

1. **Role Management**: User roles (admin, manager) should be stored in JWT claims via Supabase Auth custom claims
2. **Service Role**: Backend operations requiring elevated permissions should use the service role key
3. **Testing**: Always test RLS policies in a development environment before production deployment
