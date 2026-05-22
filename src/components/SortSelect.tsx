import type { SortOption } from "../types";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      Sort
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="focus-ring h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900"
      >
        <option value="price-asc">Price low to high</option>
        <option value="rating-desc">Highest rated</option>
        <option value="distance-asc">Closest distance</option>
      </select>
    </label>
  );
}
