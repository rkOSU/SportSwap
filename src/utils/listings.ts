import type { GearListing, ListingFilters, SortOption } from "../types";

export function filterListings(listings: GearListing[], filters: ListingFilters): GearListing[] {
  return listings.filter((listing) => {
    const matchesCategory = !filters.category || listing.category === filters.category;
    const matchesSubcategory = !filters.subcategory || listing.subcategory === filters.subcategory;
    const matchesLocation =
      !filters.location ||
      listing.location.toLowerCase().includes(filters.location.toLowerCase().trim());
    const matchesPrice =
      filters.maxPricePerDay === "" || listing.pricePerDay <= filters.maxPricePerDay;
    const matchesOwnerType = filters.ownerType === "all" || listing.ownerType === filters.ownerType;
    const matchesAvailability =
      filters.availabilityStatus === "all" ||
      listing.availabilityStatus === filters.availabilityStatus;

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesLocation &&
      matchesPrice &&
      matchesOwnerType &&
      matchesAvailability
    );
  });
}

export function sortListings(listings: GearListing[], sortOption: SortOption): GearListing[] {
  const sorted = [...listings];

  if (sortOption === "price-asc") {
    return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }

  if (sortOption === "rating-desc") {
    return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  return sorted.sort((a, b) => a.distanceMiles - b.distanceMiles);
}

export function getUniqueSubcategoriesForCategory(
  listings: GearListing[],
  category: string,
): string[] {
  const scopedListings = category
    ? listings.filter((listing) => listing.category === category)
    : listings;

  return Array.from(new Set(scopedListings.map((listing) => listing.subcategory))).sort();
}
