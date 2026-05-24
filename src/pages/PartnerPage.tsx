import { CheckCircle2, Store, UserRound } from "lucide-react";
import { CreateListingForm } from "../components/CreateListingForm";
import { SectionHeader } from "../components/SectionHeader";

const shopBenefits = [
  "Turn underused inventory into a searchable local rental channel.",
  "Capture serious renter intent before staff spend time on calls and quotes.",
  "Show fit, condition, deposits, pickup rules, and safety notes before handoff.",
  "Test demand across categories before buying new software or expanding fleet.",
];

const ownerNotes = [
  "Peer listings are positioned as trusted supply, not random classifieds.",
  "High-value gear needs deposits, identity, condition logs, and claims workflows.",
  "Individual owners can validate category demand before broad P2P expansion.",
];

export function PartnerPage() {
  return (
    <div className="bg-stone-50">
      <section className="bg-white py-12">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Supply partners"
            title="Put your adventure inventory to work"
            description="GearLoop is recruiting the rugged supply side first: shops, outfitters, campus clubs, gear libraries, guides with spare kit, and trusted owners who want their equipment earning instead of collecting dust."
          />
        </div>
      </section>

      <section className="page-shell grid gap-6 py-10 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
            <Store className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">
            For rental shops and outfitters
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            GearLoop gives serious operators a demand layer that can sit beside existing booking
            calendars, POS systems, phone workflows, or manual confirmation processes.
          </p>
          <div className="mt-5 space-y-3">
            {shopBenefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2
                  className="mt-1 h-4 w-4 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-trail-50 text-trail-700">
            <UserRound className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">For trusted gear owners</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Peer-to-peer rentals are still part of the long-term marketplace, but GearLoop should
            feel more like a field-ready supply network than a casual classifieds board.
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
            title="Start with one battle-tested listing"
            description="The MVP validates the fields that matter for rugged rentals: condition, replacement value, deposit, pickup rules, safety notes, and the features renters compare before committing."
          />
        </div>
        <CreateListingForm />
      </section>
    </div>
  );
}
