import { CheckCircle2, Store, UserRound } from "lucide-react";
import { CreateListingForm } from "../components/CreateListingForm";
import { SectionHeader } from "../components/SectionHeader";

const shopBenefits = [
  "Reach renters already searching for gear near your market.",
  "Centralize visibility across categories without rebuilding your booking system.",
  "Reduce phone calls and manual quote requests with structured rental intake.",
  "Test demand before investing in new software, integrations, or paid acquisition.",
];

const ownerNotes = [
  "Peer-to-peer listings are supported in limited MVP form.",
  "Trust, identity, protection, and claims workflows expand before broader P2P scaling.",
  "Individual listings help validate category demand and future supply density.",
];

export function PartnerPage() {
  return (
    <div className="bg-stone-50">
      <section className="bg-white py-12">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Supply partners"
            title="List your rental inventory on GearLoop"
            description="GearLoop starts with shop aggregation because local rental businesses already have gear, maintenance routines, customer intent, and pickup operations."
          />
        </div>
      </section>

      <section className="page-shell grid gap-6 py-10 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
            <Store className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">For rental shops</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            GearLoop gives shops a lightweight discovery layer that can sit beside existing booking
            calendars, POS systems, phone workflows, or manual confirmation processes.
          </p>
          <div className="mt-5 space-y-3">
            {shopBenefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-trail-50 text-trail-700">
            <UserRound className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">For individual owners</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Peer-to-peer rentals remain part of the long-term marketplace vision, but the MVP keeps
            the experience intentionally constrained while demand and trust workflows are tested.
          </p>
          <div className="mt-5 space-y-3">
            {ownerNotes.map((note) => (
              <div key={note} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-trail-700" aria-hidden="true" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell pb-14">
        <div className="mb-6">
          <SectionHeader
            eyebrow="Inventory intake"
            title="Create a listing request"
            description="The MVP validates fields and prepares a structured payload that can later be sent to an API, moderation queue, or shop dashboard."
          />
        </div>
        <CreateListingForm />
      </section>
    </div>
  );
}
