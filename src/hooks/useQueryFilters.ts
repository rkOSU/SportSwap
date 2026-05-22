import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ListingFilters } from "../types";

export function useQueryFilters(): ListingFilters {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      category: searchParams.get("category") ?? "",
      subcategory: "",
      location: searchParams.get("location") ?? "",
      maxPricePerDay: "",
      ownerType: "all",
      availabilityStatus: "all",
    }),
    [searchParams],
  );
}
