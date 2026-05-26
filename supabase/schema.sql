create extension if not exists pgcrypto;

create table if not exists public.gear_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  subcategory text not null,
  description text not null,
  location text not null,
  distance_miles numeric not null default 0,
  price_per_day numeric not null check (price_per_day >= 0),
  deposit_amount numeric not null check (deposit_amount >= 0),
  replacement_value numeric not null check (replacement_value >= 0),
  rating numeric not null default 0 check (rating >= 0 and rating <= 5),
  review_count integer not null default 0 check (review_count >= 0),
  owner_name text not null,
  owner_type text not null check (owner_type in ('shop', 'individual')),
  availability_status text not null check (availability_status in ('available', 'limited', 'unavailable')),
  condition text not null check (condition in ('excellent', 'good', 'fair')),
  image_url text,
  features text[] not null default '{}',
  safety_notes text not null,
  pickup_instructions text not null,
  listing_status text not null default 'active' check (listing_status in ('active', 'pending', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists gear_listings_created_at_idx
  on public.gear_listings (created_at desc);

create index if not exists gear_listings_category_idx
  on public.gear_listings (category);

alter table public.gear_listings enable row level security;

drop policy if exists "Public active listings are readable" on public.gear_listings;
create policy "Public active listings are readable"
  on public.gear_listings
  for select
  using (listing_status = 'active');

drop policy if exists "Public users can create MVP listings" on public.gear_listings;
create policy "Public users can create MVP listings"
  on public.gear_listings
  for insert
  with check (listing_status = 'active');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public listing images are readable" on storage.objects;
create policy "Public listing images are readable"
  on storage.objects
  for select
  using (bucket_id = 'listing-images');

drop policy if exists "Public users can upload listing images" on storage.objects;
create policy "Public users can upload listing images"
  on storage.objects
  for insert
  with check (bucket_id = 'listing-images');

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null,
  start_date date not null,
  end_date date not null,
  renter_name text not null,
  renter_email text not null,
  note text,
  estimated_rental_subtotal numeric not null check (estimated_rental_subtotal >= 0),
  deposit_amount numeric not null check (deposit_amount >= 0),
  estimated_total numeric not null check (estimated_total >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined')),
  created_at timestamptz not null default now(),
  constraint booking_requests_valid_dates check (end_date >= start_date)
);

create index if not exists booking_requests_listing_id_idx
  on public.booking_requests (listing_id);

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

alter table public.booking_requests enable row level security;

drop policy if exists "Public users can create rental requests" on public.booking_requests;
create policy "Public users can create rental requests"
  on public.booking_requests
  for insert
  with check (status = 'pending');

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
