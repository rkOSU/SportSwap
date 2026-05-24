import {
  BadgeDollarSign,
  Binoculars,
  Building2,
  Compass,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";

const targetUsers = [
  "Travelers",
  "Weekend adventurers",
  "College students",
  "Casual hobbyists",
  "Rental shops",
  "Gear owners",
];

const monetization = [
  "Platform service fee per booking",
  "Featured shop listings",
  "Rental shop subscription tier",
  "Optional protection plan",
  "Future peer-to-peer transaction fees",
];

const trustRoadmap = [
  "Verified shops",
  "ID verification",
  "Deposits",
  "Damage claims workflow",
  "Gear condition checklist",
  "Insurance/protection partner",
];

const futureRoadmap = [
  "Real inventory availability",
  "Shop dashboard",
  "Messaging between renters and shops/owners",
  "Stripe payments",
  "Image uploads",
  "Admin moderation",
  "Reviews",
  "Peer-to-peer expansion",
];

export function AboutPage() {
  return (
    <div className="bg-stone-50">
      <section className="bg-white py-12">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Business thesis"
            title="The supply side is the wedge."
            description="Outdoor rental demand is fragmented across shops, clubs, owners, and scattered websites. GearLoop becomes the rugged inventory layer by helping serious suppliers list gear, prove reliability, and convert adventure demand into local handoffs."
          />
        </div>
      </section>

      <section className="page-shell grid gap-6 py-10 lg:grid-cols-3">
        <InfoPanel
          icon={Compass}
          title="What GearLoop is"
          text="A supplier-first adventure rental marketplace where shops, outfitters, clubs, and trusted owners can list field-ready gear in one searchable layer."
        />
        <InfoPanel
          icon={Binoculars}
          title="Why the problem exists"
          text="The best gear is split between shop fleets, guide garages, club closets, and local owners. Renters only see fragments, and suppliers lose demand to phone tag and stale pages."
        />
        <InfoPanel
          icon={Building2}
          title="Initial wedge"
          text="Shop and outfitter aggregation creates credibility quickly while peer listings remain a visible expansion path once verification and protection workflows mature."
        />
      </section>

      <section className="bg-white py-12">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Expansion path"
            title="Operators first. Trusted peers next."
            description="The long-term opportunity is broader than shops, but adventure gear is expensive and situational. GearLoop earns trust by treating deposits, identity, condition, pickup reliability, and damage claims as product primitives."
          />
          <div className="rounded-lg border border-slate-200 bg-stone-50 p-6">
            <h3 className="text-lg font-bold text-slate-950">Target users</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {targetUsers.map((user) => (
                <div
                  key={user}
                  className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {user}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 py-12 lg:grid-cols-3">
        <ListPanel icon={BadgeDollarSign} title="Monetization placeholders" items={monetization} />
        <ListPanel icon={ShieldCheck} title="Trust and safety roadmap" items={trustRoadmap} />
        <ListPanel icon={UsersRound} title="Future roadmap" items={futureRoadmap} />
      </section>
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Compass;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ListPanel({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof BadgeDollarSign;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-lake-50 text-lake-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg bg-stone-50 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
