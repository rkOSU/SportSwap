import { listings as mockListings } from "../data/listings";
import { listingImageBucket, supabase } from "../lib/supabase";
import type { CreateListingInput, GearListing, ListingDataSource } from "../types";

type ListingRow = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  location: string;
  distance_miles: number | null;
  price_per_day: number;
  deposit_amount: number;
  replacement_value: number;
  rating: number | null;
  review_count: number | null;
  owner_name: string;
  owner_type: "shop" | "individual";
  availability_status: "available" | "limited" | "unavailable";
  condition: "excellent" | "good" | "fair";
  image_url: string | null;
  features: string[] | null;
  safety_notes: string;
  pickup_instructions: string;
  listing_status: "active" | "pending" | "archived";
  created_at: string;
};

export type ListingQueryResult = {
  listings: GearListing[];
  source: ListingDataSource;
};

export type CreateListingResult = {
  listing: GearListing;
};

const fallbackImages: Record<string, string> = {
  Bikes:
    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
  "Snow Sports":
    "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
  Boards:
    "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1200&q=80",
  "Water Sports":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "Camping Gear":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&w=1200&q=80",
};

function rowToListing(row: ListingRow): GearListing {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,
    location: row.location,
    distanceMiles: Number(row.distance_miles ?? 0),
    pricePerDay: Number(row.price_per_day),
    depositAmount: Number(row.deposit_amount),
    replacementValue: Number(row.replacement_value),
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    ownerName: row.owner_name,
    ownerType: row.owner_type,
    availabilityStatus: row.availability_status,
    condition: row.condition,
    imagePlaceholder: row.image_url ?? fallbackImages[row.category] ?? fallbackImages.Bikes,
    features: row.features ?? [],
    safetyNotes: row.safety_notes,
    pickupInstructions: row.pickup_instructions,
    createdAt: row.created_at,
    listingStatus: row.listing_status,
  };
}

function parseFeatures(features: string): string[] {
  return features
    .split(/,|\n/)
    .map((feature) => feature.trim())
    .filter(Boolean);
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.",
    );
  }

  return supabase;
}

async function uploadListingImage(file: File, title: string): Promise<string> {
  const client = assertSupabaseConfigured();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${createSlug(title)}.${extension}`;

  const { data, error } = await client.storage.from(listingImageBucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = client.storage.from(listingImageBucket).getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

export async function fetchListings(): Promise<ListingQueryResult> {
  if (!supabase) {
    return { listings: mockListings, source: "mock" };
  }

  const { data, error } = await supabase
    .from("gear_listings")
    .select("*")
    .eq("listing_status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return {
    listings: (data as ListingRow[]).map(rowToListing),
    source: "supabase",
  };
}

export async function fetchListingById(id: string): Promise<GearListing | null> {
  if (!supabase) {
    return mockListings.find((listing) => listing.id === id) ?? null;
  }

  const { data, error } = await supabase.from("gear_listings").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(error.message);
  }

  return rowToListing(data as ListingRow);
}

export async function createListing(
  input: CreateListingInput,
  imageFile?: File | null,
): Promise<CreateListingResult> {
  const client = assertSupabaseConfigured();
  const imageUrl = imageFile
    ? await uploadListingImage(imageFile, input.title)
    : (fallbackImages[input.category] ?? fallbackImages.Bikes);

  const payload = {
    title: input.title.trim(),
    owner_name: input.ownerName.trim(),
    owner_type: input.ownerType,
    category: input.category,
    subcategory: input.subcategory,
    description: input.description.trim(),
    location: input.location.trim(),
    distance_miles: 0,
    price_per_day: Number(input.pricePerDay),
    deposit_amount: Number(input.depositAmount),
    replacement_value: Number(input.replacementValue),
    rating: 0,
    review_count: 0,
    availability_status: input.availabilityStatus,
    condition: input.condition,
    image_url: imageUrl,
    features: parseFeatures(input.features),
    pickup_instructions: input.pickupInstructions.trim(),
    safety_notes: input.safetyNotes.trim(),
    listing_status: "active",
  };

  const { data, error } = await client.from("gear_listings").insert(payload).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return { listing: rowToListing(data as ListingRow) };
}
