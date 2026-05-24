import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ListingDetail } from "../components/ListingDetail";
import { findOwnerByName } from "../data/listings";
import { useListing } from "../hooks/useListing";

export function ListingDetailPage() {
  const { id } = useParams();
  const { listing, isLoading, error } = useListing(id);

  if (isLoading) {
    return (
      <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-3xl font-black text-slate-950">Loading listing</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
          Pulling the latest gear details from the marketplace.
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-3xl font-black text-slate-950">Listing not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
          {error ??
            "This rental may have moved or the link may be outdated. Browse the current GearLoop MVP inventory instead."}
        </p>
        <Link to="/browse" className="mt-6">
          <Button>Browse rentals</Button>
        </Link>
      </div>
    );
  }

  return <ListingDetail listing={listing} owner={findOwnerByName(listing.ownerName)} />;
}
