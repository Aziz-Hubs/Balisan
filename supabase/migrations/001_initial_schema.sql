-- Migration: 001_initial_schema.sql
-- Description: Initial schema for Balisan Liquor Store (Products, Users, Orders, Content, Engagement)

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Enums
CREATE TYPE user_role AS ENUM ('admin', 'customer');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- 3. Utility Functions
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Profiles & Addresses
-- Profiles (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role DEFAULT 'customer'::user_role NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Addresses
CREATE TABLE addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    label TEXT NOT NULL, -- e.g. "Home", "Office"
    name TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    governorate TEXT NOT NULL, -- Jordan specific (e.g., Amman, Irbid)
    postal_code TEXT, -- Optional in Jordan
    country TEXT DEFAULT 'Jordan' NOT NULL,
    phone TEXT, -- Critical for delivery
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- 5. Products & Categories
-- Categories (Hierarchical)
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Products (Flexible Schema)
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    brand TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(10, 2) CHECK (discount_price >= 0),
    stock_quantity INTEGER DEFAULT 0 NOT NULL CHECK (stock_quantity >= 0),
    in_stock BOOLEAN DEFAULT TRUE NOT NULL,
    abv NUMERIC(4, 1), -- Alcohol by volume
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    images TEXT[], -- Array of image URLs
    attributes JSONB DEFAULT '{}'::jsonb NOT NULL, -- Flexible specs (region, country, year, volume, etc.)
    tasting_notes JSONB DEFAULT '{}'::jsonb NOT NULL, -- { "nose": "", "palate": "", "finish": "" }
    rating NUMERIC(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 6. Orders & Checkouts
-- Orders
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Cascade for dev/mock simplicity, usually Soft Delete in prod
    status order_status DEFAULT 'pending'::order_status NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
    tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
    shipping NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    payment_method TEXT,
    tracking_number TEXT,
    shipping_address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
    shipping_address_json JSONB, -- Snapshot of address at time of order
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Order Items
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 7. Engagement
-- Reviews
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    helpful_count INTEGER DEFAULT 0,
    verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Wishlists (Favorites)
CREATE TABLE wishlist_items (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, product_id)
);
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- 8. Content Engine
-- Journal Posts (Blog)
CREATE TABLE journal_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    image TEXT,
    category TEXT,
    tags TEXT[],
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;

-- Recipes (Cocktails)
CREATE TABLE recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT[],
    difficulty TEXT, -- 'easy', 'medium', 'hard'
    prep_time_minutes INTEGER,
    servings INTEGER,
    image TEXT,
    tags TEXT[],
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Recipe Ingredients (Shoppable)
CREATE TABLE recipe_ingredients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    name TEXT NOT NULL, -- specific wording e.g. "2oz Aged Rum"
    amount TEXT, -- e.g. "2 oz"
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;

-- 9. Audit Logs
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- e.g. 'UPDATE_PRICE', 'DELETE_PRODUCT'
    entity_type TEXT NOT NULL, -- 'product', 'order'
    entity_id UUID,
    changes JSONB, -- { old: val, new: val }
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 10. Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_journal_slug ON journal_posts(slug);
CREATE INDEX idx_recipes_slug ON recipes(slug);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- 11. Triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journal_posts_updated_at BEFORE UPDATE ON journal_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. RLS Policies

-- PROFILES
-- Public can read profiles (basic info)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);
-- Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- ADDRESSES
-- Users manage own addresses
CREATE POLICY "Users view own addresses" ON addresses
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own addresses" ON addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own addresses" ON addresses
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own addresses" ON addresses
    FOR DELETE USING (auth.uid() = user_id);

-- CATEGORIES
-- Public read, Admin write
CREATE POLICY "Categories viewable by everyone" ON categories
    FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON categories
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- PRODUCTS
-- Public read active, Admin read all/write all
CREATE POLICY "Public view active products" ON products
    FOR SELECT USING (
        in_stock = true OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
CREATE POLICY "Admins manage products" ON products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ORDERS
-- Users view own, Admin view all
CREATE POLICY "Users view own orders" ON orders
    FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );
CREATE POLICY "Users create own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Order Items follows Orders
CREATE POLICY "Users view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- REVIEWS
-- Public read
CREATE POLICY "Reviews viewable by everyone" ON reviews
    FOR SELECT USING (true);
-- Auth users create
CREATE POLICY "Auth users create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- Users update/delete own
CREATE POLICY "Users update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- WISHLISTS
CREATE POLICY "Users manage own wishlist" ON wishlist_items
    FOR ALL USING (auth.uid() = user_id);

-- CONTENT (Journal & Recipes)
-- Public read, Admin write
CREATE POLICY "Content viewable by everyone" ON journal_posts
    FOR SELECT USING (published_at IS NOT NULL OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins manage journal" ON journal_posts
    FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Recipes viewable by everyone" ON recipes FOR SELECT USING (true);
CREATE POLICY "Admins manage recipes" ON recipes
    FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Recipe ingredients viewable by everyone" ON recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Admins manage recipe ingredients" ON recipe_ingredients
    FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- AUDIT LOGS
-- Admin read only
CREATE POLICY "Admins view audit logs" ON audit_logs
    FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
