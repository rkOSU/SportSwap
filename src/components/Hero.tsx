import { ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const heroImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85";

export function Hero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white lg:min-h-[620px]">
      <img
        src={heroImage}
        alt="Rugged mountain trail at sunrise"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-basalt-900 via-basalt-900/78 to-basalt-900/35" />
      <div className="page-shell relative flex min-h-[560px] flex-col justify-center py-14 lg:min-h-[620px]">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-200">
            GearLoop supplier-first marketplace
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Turn rugged gear into booked-out adventure inventory.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            GearLoop helps rental shops, outfitters, clubs, and trusted owners list bikes, boards,
            snow gear, water gear, and camp kits where adventure demand already starts.
          </p>
          <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              ["Shop-led", "Inventory-first wedge"],
              ["Peer-ready", "Built for trusted owners"],
              ["Trail-fast", "Requests without phone tag"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-forest-200">
                  {label}
                </p>
                <p className="mt-1 text-sm font-bold text-stone-50">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-4xl text-slate-900">
            <SearchBar />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/partner"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-300 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-forest-200"
            >
              List Gear
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/browse"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/35 px-5 py-3 text-sm font-semibold text-stone-50 shadow-sm transition hover:bg-white/10"
            >
              <Store className="h-4 w-4" aria-hidden="true" />
              Scout Rentals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
