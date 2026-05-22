import { ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85";

export function Hero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-slate-950 text-white lg:min-h-[620px]">
      <img
        src={heroImage}
        alt="Outdoor adventure gear staged beside a mountain lake"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/58" />
      <div className="page-shell relative flex min-h-[560px] flex-col justify-center py-14 lg:min-h-[620px]">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
            GearLoop marketplace MVP
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Rent adventure gear from local shops in one place.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Compare bikes, boards, snow gear, water gear, and camping equipment without calling five
            different rental shops.
          </p>
          <div className="mt-8 max-w-4xl text-slate-900">
            <SearchBar />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/browse"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-600"
            >
              Find Gear
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/partner"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
            >
              <Store className="h-4 w-4" aria-hidden="true" />
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
