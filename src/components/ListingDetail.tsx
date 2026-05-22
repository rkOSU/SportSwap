import { ArrowLeft, CalendarDays, Gauge, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { GearListing, Owner } from "../types";
import { formatCurrency } from "../utils/pricing";
import { Badge } from "./Badge";
import { BookingRequestForm } from "./BookingRequestForm";
import { OwnerProfileCard } from "./OwnerProfileCard";
import { TrustSafetyPanel } from "./TrustSafetyPanel";

type ListingDetailProps = {
  listing: GearListing;
  owner?: Owner;
};

function availabilityTone(status: GearListing["availabilityStatus"]) {
  if (status === "available") {
    return "forest";
  }
  if (status === "limited") {
    return "amber";
  }
  return "red";
}

export function ListingDetail({ listing, owner }: ListingDetailProps) {
  return (
    <div className="page-shell py-8">
      <Link
        to="/browse"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-forest-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to listings
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card">
            <div className="grid gap-2 md:grid-cols-[1.5fr_1fr]">
              <div className="aspect-[4/3] bg-slate-100 md:aspect-auto">
                <img src={listing.imagePlaceholder} alt={listing.title} className="h-full w-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-1">
                {listing.features.slice(0, 4).map((feature) => (
                  <div
                    key={feature}
                    className="flex min-h-24 items-center rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={listing.ownerType === "shop" ? "lake" : "trail"}>
                {listing.ownerType === "shop" ? "Rental shop" : "Individual owner"}
              </Badge>
              <Badge tone={availabilityTone(listing.availabilityStatus)}>
                {listing.availabilityStatus}
              </Badge>
              <Badge tone="slate">{listing.condition} condition</Badge>
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-forest-700">
              {listing.category} / {listing.subcategory}
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              {listing.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {listing.location} · {listing.distanceMiles.toFixed(1)} miles away
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {formatCurrency(listing.pricePerDay)} per day
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {formatCurrency(listing.depositAmount)} refundable deposit
              </span>
              <span className="inline-flex items-center gap-2">
                <Gauge className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {formatCurrency(listing.replacementValue)} replacement value
              </span>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-700">{listing.description}</p>

            <div className="mt-6">
              <h2 className="text-lg font-bold text-slate-950">Features</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {listing.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <Sparkles className="h-4 w-4 text-forest-600" aria-hidden="true" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <OwnerProfileCard owner={owner} listing={listing} />

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="text-base font-bold text-slate-950">Safety notes</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{listing.safetyNotes}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="text-base font-bold text-slate-950">Pickup instructions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{listing.pickupInstructions}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
              <h3 className="text-base font-bold text-slate-950">Cancellation policy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Free cancellation up to 24 hours before pickup is the expected MVP policy.
                Shop-specific policies would be confirmed before payment.
              </p>
            </div>
          </section>

          <TrustSafetyPanel />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingRequestForm listing={listing} />
        </aside>
      </div>
    </div>
  );
}
