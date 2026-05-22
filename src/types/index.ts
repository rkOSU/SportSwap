export type OwnerType = "shop" | "individual";

export type AvailabilityStatus = "available" | "limited" | "unavailable";

export type GearCondition = "excellent" | "good" | "fair";

export type GearListing = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  location: string;
  distanceMiles: number;
  pricePerDay: number;
  depositAmount: number;
  replacementValue: number;
  rating: number;
  reviewCount: number;
  ownerName: string;
  ownerType: OwnerType;
  availabilityStatus: AvailabilityStatus;
  condition: GearCondition;
  imagePlaceholder: string;
  features: string[];
  safetyNotes: string;
  pickupInstructions: string;
};

export type BookingRequest = {
  listingId: string;
  startDate: string;
  endDate: string;
  renterName: string;
  renterEmail: string;
  note?: string;
  estimatedRentalSubtotal: number;
  depositAmount: number;
  estimatedTotal: number;
  status: "pending" | "confirmed" | "declined";
};

export type Owner = {
  id: string;
  name: string;
  type: OwnerType;
  rating: number;
  verified: boolean;
  responseTime: string;
  location: string;
};

export type ListingFilters = {
  category: string;
  subcategory: string;
  location: string;
  maxPricePerDay: number | "";
  ownerType: OwnerType | "all";
  availabilityStatus: AvailabilityStatus | "all";
};

export type SortOption = "price-asc" | "rating-desc" | "distance-asc";

export type CreateListingInput = {
  title: string;
  ownerName: string;
  ownerType: OwnerType;
  category: string;
  subcategory: string;
  description: string;
  location: string;
  pricePerDay: string;
  depositAmount: string;
  replacementValue: string;
  condition: GearCondition;
  availabilityStatus: AvailabilityStatus;
  pickupInstructions: string;
  safetyNotes: string;
  features: string;
};
