# Rental Shop Collection

Sport Swap can collect rental-shop leads from OpenStreetMap using the public Overpass API. This path does not require Google, Yelp, or paid API keys.

## Setup

Apply the rental shops migration:

```bash
npm run supabase:push
```

Add server-side Supabase credentials to `.env.local` or your automation environment:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The service role key is required for automated upserts into `public.rental_shops`. Do not expose it to the Vite client.
The collector supports both legacy JWT `service_role` keys and newer `sb_secret_...` keys.

## Dry Run

```bash
npm run shops:collect:dry
```

This collects SF Bay Area rental shops and writes audit files under `tmp/rental-shop-research` without changing Supabase.

## Update Supabase

```bash
npm run shops:collect -- --metro sf-bay-area --area-mode all
```

The script upserts by `(source, source_business_id)`, so weekly runs refresh existing OSM shops instead of creating duplicates.

## Options

```bash
npm run shops:collect -- --help
```

- `--metro sf-bay-area`: current supported market.
- `--area-mode core`: query the core Bay Area radius only.
- `--area-mode tourist`: query configured tourist zones only.
- `--area-mode all`: query both.
- `--dry-run`: collect and write local files only.
- `--include-bike-share`: include bike-share docking stations. By default they are excluded because they are usually not partnerable shops.

## Environment Tuning

```bash
OVERPASS_API_URLS=http://overpass-api.de/api/interpreter,https://overpass.private.coffee/api/interpreter
OVERPASS_AREA_MODE=all
OVERPASS_MAX_CORE_RADIUS_KM=42
OVERPASS_MAX_ZONE_RADIUS_KM=22
OVERPASS_MIN_REQUEST_INTERVAL_MS=2000
RENTAL_SHOP_OUTPUT_DIR=tmp/rental-shop-research
MARKET_RESEARCH_USER_AGENT=SportSwapRentalShopCollector/0.1
```

## Data Caveats

OpenStreetMap data is community-maintained. It is useful for no-key discovery, but it will miss some businesses and may occasionally include stale or miscategorized records. Review the CSV output and consider enriching strong markets later with Google Places or Yelp if you need ratings and review counts.
