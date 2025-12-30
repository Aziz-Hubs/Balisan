# Supabase Database Guide

## 1. Generating TypeScript Types

To generate TypeScript types from your Supabase schema, run the following command:

```bash
npx supabase gen types typescript --project-id "<your-project-id>" --schema public > src/types/supabase.ts
```

*Note: You need to log in via `npx supabase login` first. If you are developing locally, use:*

```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

Make sure to map the generated `Database` type in your code.

## 2. Seed Script

The seed script is located at `src/scripts/seed.ts`.
To run it:

```bash
npx tsx src/scripts/seed.ts
```
