create table if not exists public.rental_shops (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  source_business_id text not null,
  business_name text not null,
  metro_slug text not null,
  metro text not null,
  city text,
  state text,
  address text,
  latitude numeric,
  longitude numeric,
  website_url text,
  phone_number text,
  source_listing_url text,
  categories text[] not null default '{}',
  category_labels text[] not null default '{}',
  online_booking boolean not null default false,
  multi_category boolean not null default false,
  notes text,
  raw_tags jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rental_shops_source_business_unique unique (source, source_business_id)
);

create index if not exists rental_shops_metro_slug_idx
  on public.rental_shops (metro_slug);

create index if not exists rental_shops_categories_gin_idx
  on public.rental_shops using gin (categories);

create index if not exists rental_shops_last_seen_at_idx
  on public.rental_shops (last_seen_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists rental_shops_set_updated_at on public.rental_shops;
create trigger rental_shops_set_updated_at
before update on public.rental_shops
for each row
execute function public.set_updated_at();

alter table public.rental_shops enable row level security;

drop policy if exists "Public active rental shops are readable" on public.rental_shops;
create policy "Public active rental shops are readable"
  on public.rental_shops
  for select
  using (active = true);
