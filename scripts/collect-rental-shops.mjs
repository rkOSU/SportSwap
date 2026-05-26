#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

loadEnvFile(".env");
loadEnvFile(".env.local");

const SOURCE = "openstreetmap_overpass";
const DEFAULT_OUTPUT_DIR = "tmp/rental-shop-research";
const DEFAULT_USER_AGENT =
  process.env.MARKET_RESEARCH_USER_AGENT || "GearLoopRentalShopCollector/0.1";

const metros = {
  "sf-bay-area": {
    slug: "sf-bay-area",
    name: "San Francisco Bay Area, CA",
    centerCity: "San Francisco",
    state: "CA",
    latitude: 37.7749,
    longitude: -122.4194,
    coreRadiusKm: 42,
    touristZones: [
      { name: "Marin Headlands", latitude: 37.8324, longitude: -122.5397, radiusKm: 18 },
      { name: "Santa Cruz", latitude: 36.9741, longitude: -122.0308, radiusKm: 22 },
    ],
  },
};

const categoryPatterns = [
  [/\broad bike\b|road_bike|roadbike/i, "road_bike"],
  [/\bmountain bike\b|\bmtb\b|mountain_bike|mountainbike/i, "mountain_bike"],
  [/\be-bike\b|\bebike\b|\belectric bike\b|electric_bike/i, "e_bike"],
  [/\bbicycle\b|\bbike\b|\bcycling\b|\bcycle\b/i, "bike"],
  [/\bsurfboard\b|\bsurf board\b|\bsurfing\b|\bsurf\b/i, "surfboard"],
  [/\bpaddleboards?\b|\bpaddle boards?\b|\bstand up paddle\b|\bstand-up paddle\b|\bsup\b/i, "paddleboard"],
  [/\bkayaks?\b/i, "kayak"],
  [/\bcanoes?\b/i, "canoe"],
  [/\bcamping\b|\bcamp gear\b|\btents?\b|\bbackpacking\b/i, "camping"],
  [/\bsnowboards?\b|\bsnow boards?\b/i, "snowboard"],
  [/\bskis?\b|\bskiing\b/i, "ski"],
  [/\bclimbing\b|\bclimb\b|\bmountaineering\b/i, "climbing"],
  [/\bwater sports?\b|\bwatersports?\b|water_sports/i, "water_sports"],
  [/\bboats?\b/i, "boat"],
  [/\boutdoor gear\b|\boutfitters?\b/i, "outdoor_gear"],
];

const categoryLabels = {
  bike: "Bike",
  road_bike: "Road bike",
  mountain_bike: "Mountain bike",
  e_bike: "E-bike",
  surfboard: "Surfboard",
  paddleboard: "Paddleboard",
  kayak: "Kayak",
  canoe: "Canoe",
  camping: "Camping gear",
  ski: "Ski",
  snowboard: "Snowboard",
  climbing: "Climbing gear",
  water_sports: "Water sports",
  boat: "Boat",
  outdoor_gear: "Outdoor gear",
};

const rentalTagKeys = [
  "rental",
  "rental:bicycle",
  "rental:bike",
  "rental:canoe",
  "rental:kayak",
  "rental:sup",
  "rental:paddleboard",
  "rental:surfboard",
  "rental:ski",
  "rental:snowboard",
  "rental:climbing",
  "rental:camping",
  "bicycle_rental",
  "service:bicycle:rental",
  "boat:rental",
  "canoe:rental",
  "kayak:rental",
  "surfboard:rental",
  "ski:rental",
  "snowboard:rental",
  "climbing:rental",
  "camping:rental",
];

const args = parseArgs(process.argv.slice(2));
const metro = metros[args.metro];

if (!metro) {
  fail(`Unknown metro "${args.metro}". Available: ${Object.keys(metros).join(", ")}`);
}

const startedAt = new Date();
const rawOutputDir = path.join(args.outputDir, metro.slug, isoDate(startedAt));

console.log(`Collecting rental shops for ${metro.name} using ${SOURCE}`);
console.log(`Area mode: ${args.areaMode}; dry run: ${args.dryRun ? "yes" : "no"}`);

if (!args.dryRun) {
  await assertSupabaseReady();
}

const rawElements = [];
const rawPayloads = [];

for (const area of queryAreas(metro, args.areaMode)) {
  const query = buildOverpassQuery(area.latitude, area.longitude, area.radiusKm);
  const payload = await requestOverpass(query);
  rawPayloads.push({ area, payload });
  rawElements.push(...(payload.elements || []).map((element) => ({ areaName: area.name, element })));
  await sleep(args.minRequestIntervalMs);
}

await mkdir(rawOutputDir, { recursive: true });
await writeFile(
  path.join(rawOutputDir, "raw-overpass-responses.json"),
  JSON.stringify({ source: SOURCE, metro: metro.name, collectedAt: startedAt.toISOString(), rawPayloads }, null, 2),
);

const shops = dedupeShops(
  rawElements.flatMap(({ areaName, element }) => elementToRows(element, metro, areaName)),
);

await writeFile(path.join(rawOutputDir, "rental-shops.json"), JSON.stringify(shops, null, 2));
await writeFile(path.join(rawOutputDir, "rental-shops.csv"), toCsv(shops));

console.log(`Collected ${rawElements.length} raw OSM elements`);
console.log(`Prepared ${shops.length} deduped rental shops`);

if (!args.dryRun) {
  await upsertSupabase(shops);
  console.log(`Upserted ${shops.length} shops into public.rental_shops`);
}

printSummary(shops);

function parseArgs(argv) {
  const parsed = {
    metro: "sf-bay-area",
    areaMode: process.env.OVERPASS_AREA_MODE || "all",
    outputDir: process.env.RENTAL_SHOP_OUTPUT_DIR || DEFAULT_OUTPUT_DIR,
    dryRun: false,
    includeBikeShare: process.env.INCLUDE_BIKE_SHARE === "true",
    minRequestIntervalMs: Number(process.env.OVERPASS_MIN_REQUEST_INTERVAL_MS || 2000),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--metro") {
      parsed.metro = requireValue(arg, next);
      index += 1;
    } else if (arg === "--area-mode") {
      parsed.areaMode = requireValue(arg, next);
      index += 1;
    } else if (arg === "--output-dir") {
      parsed.outputDir = requireValue(arg, next);
      index += 1;
    } else if (arg === "--dry-run") {
      parsed.dryRun = true;
    } else if (arg === "--include-bike-share") {
      parsed.includeBikeShare = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      fail(`Unknown argument: ${arg}`);
    }
  }

  if (!["core", "tourist", "all"].includes(parsed.areaMode)) {
    fail("--area-mode must be one of: core, tourist, all");
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage:
  npm run shops:collect -- --dry-run
  npm run shops:collect -- --metro sf-bay-area --area-mode all

Options:
  --metro <slug>        Market slug. Default: sf-bay-area
  --area-mode <mode>    core, tourist, or all. Default: all
  --dry-run             Collect and write local files, but do not update Supabase
  --include-bike-share  Include bike-share docking stations
  --output-dir <path>   Local audit output directory
`);
}

function queryAreas(metroConfig, areaMode) {
  const areas = [];
  if (areaMode === "core" || areaMode === "all") {
    areas.push({
      name: "core",
      latitude: metroConfig.latitude,
      longitude: metroConfig.longitude,
      radiusKm: Number(process.env.OVERPASS_MAX_CORE_RADIUS_KM || metroConfig.coreRadiusKm),
    });
  }
  if (areaMode === "tourist" || areaMode === "all") {
    areas.push(
      ...metroConfig.touristZones.map((zone) => ({
        ...zone,
        radiusKm: Math.min(zone.radiusKm, Number(process.env.OVERPASS_MAX_ZONE_RADIUS_KM || zone.radiusKm)),
      })),
    );
  }
  return areas;
}

function buildOverpassQuery(latitude, longitude, radiusKm) {
  const around = `(around:${Math.round(radiusKm * 1000)},${latitude},${longitude})`;
  const rentalKeyRegex = [
    "rental:bicycle",
    "rental:bike",
    "rental:canoe",
    "rental:kayak",
    "rental:sup",
    "rental:paddleboard",
    "rental:surfboard",
    "rental:ski",
    "rental:snowboard",
    "rental:climbing",
    "rental:camping",
    "service:bicycle:rental",
    "bicycle_rental",
    "boat:rental",
    "canoe:rental",
    "kayak:rental",
    "surfboard:rental",
    "ski:rental",
    "snowboard:rental",
    "climbing:rental",
    "camping:rental",
  ].join("|");
  const filters = [
    '["amenity"~"^(bicycle_rental|boat_rental)$"]',
    '["tourism"="boat_rental"]',
    '["shop"="rental"]',
    '["rental"]',
    `[~"^(${rentalKeyRegex})$"~".+"]`,
  ];

  const clauses = [];
  for (const elementType of ["node", "way", "relation"]) {
    for (const filter of filters) {
      clauses.push(`${elementType}${around}${filter};`);
    }
  }

  return ["[out:json][timeout:30];", "(", ...clauses, ");", "out center;"].join("\n");
}

async function requestOverpass(query) {
  const endpoints = (
    process.env.OVERPASS_API_URLS ||
    "http://overpass-api.de/api/interpreter,https://overpass.private.coffee/api/interpreter"
  )
    .split(",")
    .map((endpoint) => endpoint.trim())
    .filter(Boolean);

  let lastError;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": DEFAULT_USER_AGENT,
          accept: "application/json,text/plain,*/*",
        },
        body: new URLSearchParams({ data: query }),
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: ${(await response.text()).slice(0, 500)}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      console.warn(`Overpass endpoint failed: ${endpoint}: ${error.message}`);
    }
  }

  throw lastError ?? new Error("All Overpass endpoints failed");
}

function elementToRows(element, metroConfig, areaName) {
  const tags = element.tags || {};
  const name = tags.name?.trim();
  if (!name) return [];
  if (!args.includeBikeShare && isNonPartnerMicromobility(tags)) return [];
  if (!isRentalCandidate(tags)) return [];

  const categories = inferCategories(tags);
  if (categories.length === 1 && categories[0] === "boat" && !hasSmallCraftSignal(tags)) {
    return [];
  }

  const sourceBusinessId = `osm/${element.type}/${element.id}`;
  const location = element.lat && element.lon ? element : element.center || {};
  const city = tags["addr:city"] || metroConfig.centerCity;
  const state = tags["addr:state"] || metroConfig.state;
  const address = formatAddress(tags, city, state);
  const website = firstTag(tags, "website", "contact:website", "url");
  const phone = firstTag(tags, "phone", "contact:phone");

  return [
    {
      source_business_id: sourceBusinessId,
      source: SOURCE,
      metro_slug: metroConfig.slug,
      metro: metroConfig.name,
      business_name: name,
      categories,
      category_labels: categories.map((category) => categoryLabels[category] || category),
      city,
      state,
      address,
      latitude: location.lat ?? null,
      longitude: location.lon ?? null,
      website_url: website,
      phone_number: phone,
      source_listing_url: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      online_booking: hasOnlineBookingSignal(tags),
      multi_category: categories.length > 1,
      notes: buildNotes(tags, categories, areaName),
      raw_tags: tags,
      first_seen_at: new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
      active: true,
    },
  ];
}

function isRentalCandidate(tags) {
  if (tags.amenity === "bicycle_rental" || tags.amenity === "boat_rental") return true;
  if (tags.tourism === "boat_rental") return true;
  const categories = inferCategories(tags);
  if (tags.shop === "rental" && categories.length > 0) return true;
  if (categories.length > 0 && rentalTagKeys.some((key) => isPositiveTagValue(tags[key]))) return true;
  return categories.length > 0 && /\b(rentals?|hire|outfitters?)\b/i.test(humanText(tags));
}

function inferCategories(tags) {
  const searchable = tagText(tags);
  const categories = [];
  for (const [pattern, category] of categoryPatterns) {
    if (pattern.test(searchable) && !categories.includes(category)) {
      categories.push(category);
    }
  }
  if (tags.amenity === "bicycle_rental" && !categories.includes("bike")) categories.push("bike");
  if ((tags.amenity === "boat_rental" || tags.tourism === "boat_rental") && !categories.includes("boat")) {
    categories.push("boat");
  }
  return categories.filter((category) => !(category === "ski" && /\bjet\s?skis?\b/i.test(searchable)));
}

function isNonPartnerMicromobility(tags) {
  const categories = new Set(inferCategories(tags));
  if (categories.size > 0 && [...categories].some((category) => !["bike", "e_bike"].includes(category))) {
    return false;
  }
  const text = tagText(tags).toLowerCase();
  const human = humanText(tags).toLowerCase();
  if (/\brentals?\b|\bshops?\b|\btours?\b|\boutfitters?\b|\bkayak\b|\bsurf\b|\bpaddle\b|\bski\b|\bsnowboard\b/.test(human)) {
    return false;
  }
  if (/share|bikeshare|bay wheels|metro bike|greenbike|limebike|ofo|bcycle|citi bike|divvy|station/.test(text)) {
    return true;
  }
  return ["network", "capacity", "capacity:bicycle", "docks", "dock:count", "bicycle_rental"].some(
    (key) => key in tags,
  ) && tags.shop !== "bicycle";
}

function hasSmallCraftSignal(tags) {
  return /kayak|canoe|paddle|sup|stand up|stand-up/i.test(tagText(tags));
}

function hasOnlineBookingSignal(tags) {
  return /reservation|booking|book_online|reserve|fareharbor|peek|checkfront|booqable/i.test(tagText(tags));
}

function buildNotes(tags, categories, areaName) {
  const relevantTags = [
    "amenity",
    "shop",
    "tourism",
    "rental",
    "service:bicycle:rental",
    "bicycle_rental",
    "boat:rental",
    "kayak:rental",
    "canoe:rental",
    "surfboard:rental",
    "ski:rental",
    "snowboard:rental",
    "description",
    "operator",
  ]
    .filter((key) => tags[key])
    .map((key) => `${key}=${tags[key]}`);

  const labels = categories.map((category) => categoryLabels[category] || category).join(", ");
  const tagSummary = relevantTags.length ? ` Relevant tags: ${relevantTags.slice(0, 8).join("; ")}.` : "";
  return `OSM public API match in ${areaName} search area. Categories inferred: ${labels}.${tagSummary}`;
}

function dedupeShops(rows) {
  const bySourceId = new Map();
  for (const row of rows) {
    const existing = bySourceId.get(row.source_business_id);
    if (!existing) {
      bySourceId.set(row.source_business_id, row);
      continue;
    }
    const categories = new Set([...(existing.categories || []), ...(row.categories || [])]);
    bySourceId.set(row.source_business_id, {
      ...existing,
      ...preferPresent(existing, row),
      categories: [...categories].sort(),
      category_labels: [...categories].sort().map((category) => categoryLabels[category] || category),
      multi_category: categories.size > 1,
      notes: [...new Set([existing.notes, row.notes].filter(Boolean))].join(" | "),
      last_seen_at: row.last_seen_at,
    });
  }

  return [...bySourceId.values()].sort((a, b) =>
    `${a.metro_slug}:${a.business_name}`.localeCompare(`${b.metro_slug}:${b.business_name}`),
  );
}

function preferPresent(left, right) {
  const merged = {};
  for (const key of ["website_url", "phone_number", "address", "city", "state", "latitude", "longitude"]) {
    merged[key] = left[key] ?? right[key] ?? null;
  }
  return merged;
}

async function upsertSupabase(shops) {
  const { supabaseUrl, serviceRoleKey } = assertSupabaseEnv();

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rental_shops?on_conflict=source,source_business_id`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...supabaseHeaders(serviceRoleKey),
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(shops),
  });

  if (!response.ok) {
    fail(`Supabase upsert failed: ${response.status} ${response.statusText}: ${(await response.text()).slice(0, 1000)}`);
  }
}

function assertSupabaseEnv() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    fail("Set SUPABASE_URL or VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running without --dry-run.");
  }
  if (serviceRoleKey.startsWith("sb_publishable_")) {
    fail(
      "SUPABASE_SERVICE_ROLE_KEY is currently an sb_publishable key. Use an sb_secret key or legacy JWT service_role key for server-side rental-shop upserts.",
    );
  }
  return { supabaseUrl, serviceRoleKey };
}

async function assertSupabaseReady() {
  const { supabaseUrl, serviceRoleKey } = assertSupabaseEnv();
  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rental_shops?select=id&limit=1`;
  const response = await fetch(endpoint, {
    headers: supabaseHeaders(serviceRoleKey),
  });

  if (response.ok) {
    return;
  }

  const body = await response.text();
  if (response.status === 404 && body.includes("rental_shops")) {
    fail(
      "Supabase table public.rental_shops does not exist yet. Apply supabase/migrations/20260525090000_create_rental_shops.sql with the Supabase CLI or SQL editor before running without --dry-run.",
    );
  }

  fail(`Supabase preflight failed: ${response.status} ${response.statusText}: ${body.slice(0, 1000)}`);
}

function supabaseHeaders(apiKey) {
  const headers = { apikey: apiKey };
  if (!apiKey.startsWith("sb_secret_")) {
    headers.authorization = `Bearer ${apiKey}`;
  }
  return headers;
}

function printSummary(shops) {
  const byCategory = new Map();
  for (const shop of shops) {
    for (const category of shop.categories) {
      byCategory.set(category, (byCategory.get(category) || 0) + 1);
    }
  }
  console.log("Category counts:");
  for (const [category, count] of [...byCategory.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`- ${categoryLabels[category] || category}: ${count}`);
  }
}

function firstTag(tags, ...keys) {
  for (const key of keys) {
    if (tags[key]) return tags[key];
  }
  return null;
}

function formatAddress(tags, city, state) {
  const streetLine = [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" ");
  const cityLine = [city, state, tags["addr:postcode"]].filter(Boolean).join(", ");
  return [streetLine, cityLine].filter(Boolean).join(", ") || null;
}

function tagText(tags) {
  return Object.entries(tags)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key} ${value}`)
    .join(" ");
}

function humanText(tags) {
  return ["name", "alt_name", "description", "operator", "brand", "website", "contact:website"]
    .map((key) => tags[key])
    .filter(Boolean)
    .join(" ");
}

function isPositiveTagValue(value) {
  if (!value) return false;
  return !["no", "false", "0", "none", "private", "not_available", "not available"].includes(
    String(value).trim().toLowerCase(),
  );
}

function toCsv(rows) {
  const columns = [
    "source_business_id",
    "business_name",
    "metro",
    "city",
    "state",
    "address",
    "latitude",
    "longitude",
    "website_url",
    "phone_number",
    "source_listing_url",
    "categories",
    "online_booking",
    "multi_category",
    "notes",
  ];
  return [
    columns.join(","),
    ...rows.map((row) =>
      columns
        .map((column) => {
          const value = Array.isArray(row[column]) ? row[column].join("|") : row[column];
          return csvEscape(value);
        })
        .join(","),
    ),
  ].join("\n");
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function loadEnvFile(filePath) {
  try {
    const text = readFileSync(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^['"]|['"]$/g, "");
      }
    }
  } catch {
    // Env files are optional for dry runs and CI checks.
  }
}

function requireValue(flag, value) {
  if (!value || value.startsWith("--")) fail(`${flag} requires a value`);
  return value;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
