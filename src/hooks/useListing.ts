import { useEffect, useState } from "react";
import { fetchListingById } from "../services/listingService";
import type { GearListing } from "../types";

export function useListing(id: string | undefined) {
  const [listing, setListing] = useState<GearListing | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setListing(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const listingId = id;

    async function loadListing() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchListingById(listingId);
        if (isMounted) {
          setListing(result);
        }
      } catch (nextError) {
        if (isMounted) {
          setError(nextError instanceof Error ? nextError.message : "Unable to load listing.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadListing();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { listing, isLoading, error };
}
