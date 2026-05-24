import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { ListingCard } from "../components/ListingCard";
import { SearchBar } from "../components/SearchBar";
import { SortSelect } from "../components/SortSelect";
import { useQueryFilters } from "../hooks/useQueryFilters";
import { useListings } from "../hooks/useListings";
import type { ListingFilters, SortOption } from "../types";
import { filterListings, getUniqueSubcategoriesForCategory, sortListings } from "../utils/listings";

export function BrowsePage() {
  const queryFilters = useQueryFilters();
  const { listings, source, isLoading, error } = useListings();
  const [filters, setFilters] = useState<ListingFilters>(queryFilters);
  const [sortOption, setSortOption] = useState<SortOption>("distance-asc");

  useEffect(() => {
    setFilters(queryFilters);
  }, [queryFilters]);

  const subcategoryOptions = useMemo(
    () => getUniqueSubcategoriesForCategory(listings, filters.category),
    [filters.category, listings],
  );

  const visibleListings = useMemo(
    () => sortListings(filterListings(listings, filters), sortOption),
    [filters, listings, sortOption],
  );

  const shopCount = visibleListings.filter((listing) => listing.ownerType === "shop").length;

  function handleFilterChange(nextFilters: ListingFilters) {
    const nextSubcategoryOptions = getUniqueSubcategoriesForCategory(
      listings,
      nextFilters.category,
    );
    setFilters({
      ...nextFilters,
      subcategory: nextSubcategoryOptions.includes(nextFilters.subcategory)
        ? nextFilters.subcategory
        : "",
    });
  }

  return (
    <div className="bg-stone-50">
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="page-shell">
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
            Browse rental inventory
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_520px] lg:items-end">
            <div>
              <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
                Scout field-ready rental gear.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Compare serious shop, outfitter, club, and trusted-owner supply by category,
                distance, price, condition, and availability.
              </p>
              {source === "mock" ? (
                <p className="mt-3 inline-flex rounded-full border border-amber-300/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-100">
                  Demo seed inventory shown until Supabase env vars are configured.
                </p>
              ) : null}
            </div>
            <SearchBar
              compact
              initialCategory={filters.category}
              initialLocation={filters.location}
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-8">
        <div className="grid gap-6 xl:grid-cols-[290px_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-950">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </div>
            <FilterBar
              filters={filters}
              subcategoryOptions={subcategoryOptions}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <div className="mb-5 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-card md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {isLoading
                    ? "Loading listings..."
                    : `${visibleListings.length} listings found - ${shopCount} operator listings`}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {filters.category || "All categories"}
                  {filters.location ? ` near ${filters.location}` : " across rugged launch markets"}
                </p>
                {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
              </div>
              <SortSelect value={sortOption} onChange={setSortOption} />
            </div>

            {isLoading ? (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-sm font-semibold text-slate-600">
                Loading field-ready gear...
              </div>
            ) : visibleListings.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {visibleListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No rentals match those filters"
                description="Try broadening the category, increasing the daily budget, or searching another nearby destination."
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
