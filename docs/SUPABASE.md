# Supabase Setup

GearLoop uses Supabase for marketplace persistence.

## What Supabase stores

- `gear_listings`: Published gear listings.
- `booking_requests`: Rental requests submitted from listing detail pages.
- `rental_shops`: Rental shop leads collected from OpenStreetMap/Overpass for supplier-market research.
- `listing-images`: Public Storage bucket for listing photos.

## Setup steps

1. Create or open your Supabase project.
2. Open the SQL editor.
3. Run [../supabase/schema.sql](../supabase/schema.sql).
4. Copy your project URL and anon or publishable key.
5. Add them to `.env.local` for local development.
6. Add them to Netlify environment variables for production.

## CLI setup option

The repo includes a Supabase CLI migration at `supabase/migrations/20260524174700_initial_marketplace_schema.sql`.

Login and link:

```bash
npm run supabase:login
npm run supabase:projects
npm run supabase:link
```

Then apply the migration:

```bash
npm run supabase:push
```

If you do not see a project in `supabase:projects`, create a Supabase project in the dashboard first, then rerun `npm run supabase:projects`.

## Required env vars

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
VITE_SUPABASE_LISTING_IMAGE_BUCKET=listing-images
```

The rental-shop collection job also needs server-side credentials. Keep these out of client code:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## MVP security model

The current schema intentionally allows public inserts for:

- Gear listings
- Booking requests
- Listing images

That keeps the MVP end-to-end without auth. Before real launch, tighten this with:

- Supabase Auth
- Authenticated supplier accounts
- Listing moderation
- Rate limiting or bot protection
- Storage paths scoped by user or listing ID
- Private booking request reads for shop dashboards

## Rental shop collection

Run a local dry run first:

```bash
npm run shops:collect:dry
```

Then run the Supabase upsert:

```bash
npm run shops:collect -- --metro sf-bay-area --area-mode all
```

See [RENTAL_SHOP_COLLECTION.md](RENTAL_SHOP_COLLECTION.md) for the weekly collector workflow and OpenStreetMap data caveats.

## Common issues

`Supabase is not configured yet`

The app cannot find `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`. Add `.env.local` and restart Vite.

`Image upload failed`

Check that the `listing-images` bucket exists and that the Storage insert policy from `schema.sql` was created.

`new row violates row-level security policy`

Rerun `schema.sql` and confirm RLS policies exist for the table or Storage bucket involved.
