import { useCallback, useEffect, useState } from "react";
import type { GearListing, ListingDataSource } from "../types";
import { fetchListings } from "../services/listingService";

export function useListings() {
  const [listings, setListings] = useState<GearListing[]>([]);
  const [source, setSource] = useState<ListingDataSource>("mock");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchListings();
      setListings(result.listings);
      setSource(result.source);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load listings.");
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  return {
    listings,
    source,
    isLoading,
    error,
    refresh: loadListings,
  };
}

