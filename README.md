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
- Mock local data
- Netlify deployment config

## Local setup

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

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

When running `netlify init`, use:

- Create and configure a new site
- Connect to the GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

## Current limitations

- No backend, database, authentication, payments, or real persistence.
- Booking requests and listing intake submissions are client-side success states only.
- Inventory, availability, owner profiles, ratings, and distances are mock local data.
- Images are remote placeholder assets suitable for MVP demonstration.
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
