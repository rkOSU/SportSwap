import type { ChangeEvent } from "react";
import { categoryOptions } from "../data/categories";
import type { AvailabilityStatus, ListingFilters, OwnerType } from "../types";

type FilterBarProps = {
  filters: ListingFilters;
  subcategoryOptions: string[];
  onChange: (filters: ListingFilters) => void;
};

export function FilterBar({ filters, subcategoryOptions, onChange }: FilterBarProps) {
  function updateFilter<K extends keyof ListingFilters>(key: K, value: ListingFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    updateFilter("maxPricePerDay", value === "" ? "" : Number(value));
  }

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Category</span>
          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Subcategory</span>
          <select
            value={filters.subcategory}
            onChange={(event) => updateFilter("subcategory", event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="">All subcategories</option>
            {subcategoryOptions.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Location</span>
          <input
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
            placeholder="Boulder, Park City..."
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Max price per day</span>
          <input
            type="number"
            min="0"
            value={filters.maxPricePerDay}
            onChange={handleMaxPriceChange}
            placeholder="Any price"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Owner type</span>
          <select
            value={filters.ownerType}
            onChange={(event) => updateFilter("ownerType", event.target.value as OwnerType | "all")}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="all">All owners</option>
            <option value="shop">Rental shop</option>
            <option value="individual">Individual owner</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Availability</span>
          <select
            value={filters.availabilityStatus}
            onChange={(event) =>
              updateFilter("availabilityStatus", event.target.value as AvailabilityStatus | "all")
            }
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="all">Any availability</option>
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
      </div>
    </aside>
  );
}
