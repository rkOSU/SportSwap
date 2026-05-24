# Development Guide

## Required tools

- Node.js `>=18.20.0`
- npm
- A Supabase project for database-backed listings and uploads
- Netlify CLI for manual production deploys

## First run

```bash
npm install
cp .env.example .env.local
npm run dev
```

If `.env.local` is empty, the app still works with seed listings. The partner listing form is disabled until Supabase is configured.

## Useful scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run check
npm run preview
npm run supabase:login
npm run supabase:projects
npm run supabase:link
npm run supabase:push
```

Use `npm run check` before pushing. It runs linting and the production build.

## Environment variables

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_LISTING_IMAGE_BUCKET=listing-images
```

Never commit `.env.local`.

## Local verification checklist

Before asking for review:

- Landing page loads.
- Browse page shows listings.
- Listing detail page loads from a card.
- Partner page shows the listing form.
- With Supabase configured, a listing can be published.
- With Supabase configured, an image upload appears in Storage.
- With Supabase configured, a rental request creates a row in `booking_requests`.
- `npm run check` passes.

## Version control workflow

```bash
git checkout main
git pull
git checkout -b feature/my-change
npm run check
git add <changed-files>
git commit -m "Describe the change"
git push -u origin feature/my-change
```

Prefer PRs over direct pushes to `main` once more than one person is actively contributing.

## Production deploy

Until Netlify GitHub auto-deploy is fully linked, deploy manually:

```bash
netlify deploy --prod --build
```

After GitHub auto-deploy is linked, Netlify should build from `main` with:

```bash
npm run build
```

and publish:

```bash
dist
```
