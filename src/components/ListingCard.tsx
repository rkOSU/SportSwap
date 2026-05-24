import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { GearListing } from "../types";
import { formatCurrency } from "../utils/pricing";
import { Badge } from "./Badge";

function ownerLabel(ownerType: GearListing["ownerType"]) {
  return ownerType === "shop" ? "Rental shop" : "Individual owner";
}

function availabilityTone(status: GearListing["availabilityStatus"]) {
  if (status === "available") {
    return "forest";
  }
  if (status === "limited") {
    return "amber";
  }
  return "red";
}

export function ListingCard({ listing }: { listing: GearListing }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={listing.imagePlaceholder}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone={listing.ownerType === "shop" ? "lake" : "trail"}>
          {listing.ownerType === "shop" ? "Operator" : "Trusted peer"}
          </Badge>
          <Badge tone={availabilityTone(listing.availabilityStatus)}>
            {listing.availabilityStatus}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
              {listing.category} / {listing.subcategory}
            </p>
            <h3 className="mt-2 text-lg font-bold leading-6 text-slate-950">{listing.title}</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-slate-950">
              {formatCurrency(listing.pricePerDay)}
            </p>
            <p className="text-xs text-slate-500">per day</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
            {listing.location} - {listing.distanceMiles.toFixed(1)} mi
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            {listing.rating} ({listing.reviewCount})
          </span>
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-700">{listing.ownerName}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {listing.description}
        </p>

        <Link
          to={`/listings/${listing.id}`}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-forest-600 hover:text-forest-700"
        >
          View Details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
