import { ArrowRight, Building2, CheckCircle2, ClipboardList, MapPinned, Search, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { Hero } from "../components/Hero";
import { ListingCard } from "../components/ListingCard";
import { SectionHeader } from "../components/SectionHeader";
import { categories } from "../data/categories";
import { listings } from "../data/listings";

const howItWorks = [
  {
    title: "Search nearby gear",
    text: "Enter the gear and destination to see local options across rental shops and limited individual listings.",
    icon: Search,
  },
  {
    title: "Compare shops and prices",
    text: "Review daily rates, deposits, distance, owner type, condition, ratings, and pickup details side by side.",
    icon: Building2,
  },
  {
    title: "Request your rental",
    text: "Send a request with your dates, contact details, and notes so the shop can confirm fit and availability.",
    icon: ClipboardList,
  },
  {
    title: "Pick up locally",
    text: "Complete handoff with the rental shop or owner and get on the trail, water, mountain, or road.",
    icon: MapPinned,
  },
];

export function LandingPage() {
  const featuredListings = listings.filter((listing) => listing.ownerType === "shop").slice(0, 3);

  return (
    <>
      <Hero />

      <section className="bg-stone-50 py-16">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Search by trip type"
            title="Find the gear people actually need for outdoor days."
            description="GearLoop groups fragmented local rental inventory into simple categories that map to real renter intent."
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

      <section className="bg-white py-16">
        <div className="page-shell">
          <SectionHeader
            eyebrow="How it works"
            title="A faster rental path for travelers and weekend adventurers."
            description="The MVP is intentionally request-first: enough structure to validate demand without asking shops to replace their operating systems."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-stone-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-600 text-white">
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
              eyebrow="Rental shop aggregation first"
              title="Built for shops that already know how to rent gear."
              description="GearLoop helps shops get discovered by more renters without rebuilding booking software, payment systems, or inventory operations on day one."
            />
            <div className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {[
                "Reach renters already searching by category, location, price, and availability.",
                "Centralize visibility across bikes, snow gear, water gear, boards, and accessories.",
                "Reduce repetitive phone calls by collecting rental dates, fit notes, and contact details up front.",
                "Test demand before investing in custom marketplace integrations.",
              ].map((point) => (
                <div key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/partner"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-forest-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
              >
                <Store className="h-4 w-4" aria-hidden="true" />
                Partner With Us
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-forest-600 hover:text-forest-700"
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
