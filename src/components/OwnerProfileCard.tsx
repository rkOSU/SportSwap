import { CheckCircle2, Clock, MapPin, Star, Store, UserRound } from "lucide-react";
import type { GearListing, Owner } from "../types";
import { Badge } from "./Badge";

type OwnerProfileCardProps = {
  owner?: Owner;
  listing: GearListing;
};

export function OwnerProfileCard({ owner, listing }: OwnerProfileCardProps) {
  const isShop = listing.ownerType === "shop";
  const rating = owner?.rating ?? listing.rating;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
          {isShop ? (
            <Store className="h-6 w-6" aria-hidden="true" />
          ) : (
            <UserRound className="h-6 w-6" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-slate-950">{listing.ownerName}</h3>
            <Badge tone={isShop ? "lake" : "trail"}>{isShop ? "Operator" : "Trusted peer"}</Badge>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {rating.toFixed(1)} owner rating
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {owner?.location ?? listing.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {owner?.responseTime ?? "Response time shown after request"}
            </span>
            {owner?.verified ? (
              <span className="inline-flex items-center gap-2 font-semibold text-forest-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Verified operator profile
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
