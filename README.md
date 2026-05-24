# GearLoop MVP

GearLoop is a rugged, supplier-first rental marketplace for adventure and outdoor gear. The MVP focuses on helping rental shops, outfitters, clubs, and trusted owners list field-ready bikes, boards, snow gear, water gear, camping equipment, and accessories in one searchable layer, while keeping peer-to-peer expansion visible but operationally disciplined.

## MVP scope

- Landing page with rugged marketplace positioning, supplier-first messaging, category discovery, and search entry point.
- Browse/search page with mock inventory, filters, sorting, owner type badges, availability badges, and realistic listing cards.
- Listing detail page with owner profile, rental details, deposit and replacement value, safety notes, pickup instructions, cancellation placeholder, price breakdown, and booking request flow.
- Booking request form with date, renter, email, note validation, rental day calculation, subtotal, platform fee placeholder, deposit, and success state.
- Partner/list gear page with shop, outfitter, club, and trusted-owner supply messaging plus a validated listing intake form.
- About/business model page explaining the wedge, expansion path, target users, monetization placeholders, trust roadmap, and future roadmap.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase Postgres
- Supabase Storage
- Mock local data
- Netlify deployment config

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Team docs

- [Development guide](docs/DEVELOPMENT.md)
- [Architecture notes](docs/ARCHITECTURE.md)
- [Supabase setup](docs/SUPABASE.md)
- [Contributing workflow](CONTRIBUTING.md)

## Useful scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run check
npm run preview
```

Use `npm run check` before pushing or opening a PR.

## Supabase setup

GearLoop uses Supabase for real listings and image uploads when these env vars are present:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SUPABASE_LISTING_IMAGE_BUCKET=listing-images
```

Run [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL editor, or use the Supabase CLI migration in [supabase/migrations](supabase/migrations). It creates:

- `public.gear_listings`
- `public.booking_requests`
- Public read access for active listings
- Public MVP insert access for new listings
- Public MVP insert access for rental requests
- A public `listing-images` Storage bucket
- Storage policies for listing image reads and uploads

After adding env vars, restart the dev server. Without env vars, the app falls back to local seed listings so the marketing/browse experience still works.

CLI option:

```bash
npm run supabase:login
npm run supabase:projects
npm run supabase:link
npm run supabase:push
```

`supabase:link` will ask you to choose or enter a Supabase project ref. If you do not have a project yet, create one in Supabase first or use the Supabase CLI project creation flow after login.

## Build

```bash
npm run build
```

The production build outputs to `dist`.

## Deployment

This repository includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Suggested GitHub flow:

```bash
git init
git add .
git commit -m "Initial GearLoop MVP"
gh auth login
gh repo create gearloop-mvp --public --source=. --remote=origin --push
```

Suggested Netlify flow:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build
netlify deploy --prod --build
```

Netlify environment variables needed for database-backed production:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_LISTING_IMAGE_BUCKET
```

When running `netlify init`, use:

- Create and configure a new site
- Connect to the GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

## Current limitations

- Authentication and payments are not implemented yet.
- Booking requests persist to Supabase when env vars and schema are configured.
- Listings persist to Supabase only after env vars and schema are configured.
- Owner profiles, ratings, and distances are partly placeholder data for new listings.
- Listing images upload to Supabase Storage when configured; otherwise category images are used.
- Deposits, platform fees, cancellation language, and totals are product placeholders.

## Future roadmap

- Supabase backend
- Auth
- Shop dashboard
- Real inventory availability
- Stripe payments
- Image uploads
- Admin moderation
- Verification workflow
- Deposit and damage claim handling
- Insurance/protection workflow
- Peer-to-peer expansion
- Reviews
- Messaging between renters and shops/owners
