# Contributing

GearLoop is still an MVP, so the goal is to keep changes small, readable, and easy to review.

## Branching

- Use `main` for the deployed baseline.
- Use short feature branches:
  - `feature/listing-availability`
  - `fix/date-validation`
  - `chore/readme-cleanup`
- Keep branches focused on one user-facing outcome or one maintenance task.

## Before opening a PR

Run:

```bash
npm run check
```

For formatting-only changes, run:

```bash
npm run format
```

## Pull request expectations

Include:

- What changed
- Why it changed
- Screenshots for visible UI changes
- Supabase schema or env var changes, if any
- Commands run locally

Avoid:

- Mixing unrelated refactors with product changes
- Committing `.env.local`, `dist`, `.netlify`, or `node_modules`
- Adding backend services outside Supabase without a short architecture note

## Coding style

- Keep components small and named after the user-facing thing they render.
- Put reusable business logic in `src/utils` or `src/services`, not inside pages.
- Keep Supabase access inside `src/services` and `src/lib`.
- Prefer typed models from `src/types`.
- Keep MVP copy realistic and product-specific. Do not add filler copy.
- Add comments only where the code would otherwise be hard to reason about.

## Database changes

Update [supabase/schema.sql](supabase/schema.sql) in the same PR as any code that depends on the schema.

If a schema change requires data migration, add a short note to the PR with:

- What existing data changes
- Whether the SQL is safe to run more than once
- How to verify it
