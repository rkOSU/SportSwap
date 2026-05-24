import { ArrowRight, Building2, CheckCircle2, ClipboardList, MapPinned, Search, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { Hero } from "../components/Hero";
import { ListingCard } from "../components/ListingCard";
import { SectionHeader } from "../components/SectionHeader";
import { categories } from "../data/categories";
import { useListings } from "../hooks/useListings";

const howItWorks = [
  {
    title: "Search nearby gear",
    text: "Renters search by trip, destination, category, and pickup window instead of hunting through scattered sites.",
    icon: Search,
  },
  {
    title: "Surface serious suppliers",
    text: "Shops, outfitters, clubs, and trusted owners show price, condition, deposits, and handoff details up front.",
    icon: Building2,
  },
  {
    title: "Convert demand into requests",
    text: "Rental dates, fit notes, route plans, and renter contact details arrive before the phone starts ringing.",
    icon: ClipboardList,
  },
  {
    title: "Handoff stays local",
    text: "Keep pickup, inspection, maintenance, and local expertise with the people who know the gear best.",
    icon: MapPinned,
  },
];

export function LandingPage() {
  const { listings } = useListings();
  const featuredListings = listings.filter((listing) => listing.ownerType === "shop").slice(0, 3);

  return (
    <>
      <Hero />

      <section className="bg-stone-50 py-16">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Adventure demand, organized"
            title="A tougher marketplace for the gear people actually use."
            description="GearLoop turns fragmented outdoor rental supply into a focused discovery layer for bikes, boards, snow gear, water gear, camp kits, racks, and accessory bundles."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                description={category.description}
                searchValue={category.searchValue}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-basalt-800 py-16">
        <div className="page-shell">
          <SectionHeader
            eyebrow="How the loop works"
            title="Built for suppliers who want more rental volume without more chaos."
            description="The first version is request-first: enough structure to capture intent, compare inventory, and validate demand before forcing shops or peers into new operating software."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-basalt-900/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-300 text-zinc-950">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-black text-slate-300">{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Our supplier edge"
              title="Win the rugged supply side before everyone else catches up."
              description="GearLoop is built to recruit the people who already have adventure inventory: rental shops, guide-adjacent outfitters, campus clubs, gear libraries, and trusted locals with expensive kit sitting idle."
            />
            <div className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {[
                "Give suppliers a stronger storefront than a buried Google result or outdated inventory page.",
                "Let peers earn from high-value gear without pretending trust, deposits, and handoff details are solved by magic.",
                "Collect rental dates, fit notes, route plans, and safety context before a supplier commits.",
                "Start with shop-grade operations, then expand peer supply only where verification and protection make sense.",
              ].map((point) => (
                <div key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-forest-300" aria-hidden="true" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/partner"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-300 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-forest-200"
              >
                <Store className="h-4 w-4" aria-hidden="true" />
                Build Supply
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-basalt-900/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-forest-300 hover:text-forest-100"
              >
                Business Model
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
