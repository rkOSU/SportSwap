import { MapPin, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryOptions, subcategoryOptions } from "../data/categories";
import { Button } from "./Button";

type SearchBarProps = {
  compact?: boolean;
  initialCategory?: string;
  initialLocation?: string;
};

export function SearchBar({
  compact = false,
  initialCategory = "",
  initialLocation = "",
}: SearchBarProps) {
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (category.trim()) {
      params.set("category", category.trim());
    }
    if (location.trim()) {
      params.set("location", location.trim());
    }
    navigate(`/browse${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-3 rounded-lg bg-basalt-800/95 p-3 shadow-soft ring-1 ring-forest-300/20 ${
        compact ? "md:grid-cols-[1fr_1fr_auto]" : "md:grid-cols-[1.2fr_1fr_auto]"
      }`}
    >
      <label className="relative block">
        <span className="sr-only">Gear or category</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          list="gear-options"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Bikes, skis, kayaks..."
          className="focus-ring h-12 w-full rounded-lg border border-slate-300 bg-basalt-900 pl-10 pr-4 text-sm text-slate-950 placeholder:text-slate-400"
        />
        <datalist id="gear-options">
          {[...categoryOptions, ...subcategoryOptions].map((option) => (
            <option value={option} key={option} />
          ))}
        </datalist>
      </label>

      <label className="relative block">
        <span className="sr-only">Location</span>
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="City or destination"
          className="focus-ring h-12 w-full rounded-lg border border-slate-300 bg-basalt-900 pl-10 pr-4 text-sm text-slate-950 placeholder:text-slate-400"
        />
      </label>

      <Button type="submit" className="h-12">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </Button>
    </form>
  );
}
