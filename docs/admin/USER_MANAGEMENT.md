# Admin User Management & Operations Guide

## ⚡ Quick Actions

### 1. Promote User to Admin (SQL)
To promote an existing user to **super-admin**, run this in the Supabase SQL Editor:

```sql
-- Replace with the target user's email
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'emily.watson@email.com'
);
```

### 2. Create Admin via Dashboard (No-Code)
1. Go to **Authentication > Users** and click **Add User**.
2. Enter email (e.g. `admin@balisan.co`) and password (or auto-generate).
3. Go to **Table Editor > profiles**.
4. Find the row for the new user.
5. Change the `role` column from `customer` to `admin`.

---

## 🖥️ Accessing the Dashboard

- **URL:** [`/admin/dashboard`](/admin/dashboard)
- **Default Super-Admin:**
  - **Email:** `emily.watson@email.com`
  - **Password:** `password123` (Development default)
  
> **Note:** The default user `emily.watson@email.com` starts as a `vip` customer. **You must run the promotion SQL above** to give her access to the admin dashboard.

---

## 🛡️ Security & Environment

### Rotating Secrets
If the `SUPABASE_SERVICE_ROLE_KEY` is compromised:

1. **Revoke:** Go to Supabase Dashboard > Project Settings > API > Service Role Key > Generate New Secret.
2. **Update Local:** Update `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJh...
   ```
3. **Update Production:** Update Vercel Environment Variables (`SUPABASE_SERVICE_ROLE_KEY`) and redeploy.

### Maintenance Mode
To toggle the site into Maintenance specific modes (if configured):

**Method A: Environment Variable**
Set `NEXT_PUBLIC_MAINTENANCE_MODE=true` in Vercel and redeploy to show a "Under Construction" page.

**Method B: Feature Flags (Database)**
If using a `config` table:
```sql
UPDATE public.config SET value = 'true' WHERE key = 'maintenance_mode';
```

## 🔧 Common Issues & Setup

### Users missing from `profiles` table?
By default, creating a user in **Authentication** does NOT automatically create a row in `public.profiles`. You need a **Database Trigger** to handle this.

Run this in the **SQL Editor** to set it up:

```sql
-- 1. Create a function to handle new user insertion
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data ->> 'full_name',
    'customer' -- Default role
  );
  return new;
end;
$$;

-- 2. Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

> **Note:** For existing users who are missing a profile, you can manually insert them:
> ```sql
> INSERT INTO public.profiles (id, email)
> SELECT id, email FROM auth.users
> WHERE id NOT IN (SELECT id FROM public.profiles);
> ```
