import { Bike, Snowflake, Tent, Waves, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  Bikes: Bike,
  "Snow Sports": Snowflake,
  Boards: Wind,
  "Water Sports": Waves,
  "Camping Gear": Tent,
};

type CategoryCardProps = {
  name: keyof typeof iconMap;
  description: string;
  searchValue: string;
};

export function CategoryCard({ name, description, searchValue }: CategoryCardProps) {
  const Icon = iconMap[name];

  return (
    <Link
      to={`/browse?category=${encodeURIComponent(searchValue)}`}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-soft"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700 transition group-hover:bg-forest-600 group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-slate-950">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
