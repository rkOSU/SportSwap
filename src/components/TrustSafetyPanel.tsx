import { ClipboardCheck, ShieldCheck, Store, WalletCards } from "lucide-react";

const trustItems = [
  {
    icon: Store,
    title: "Operator-first supply",
    text: "The MVP leans on shops and outfitters with maintenance, pickup, and inventory processes already in place.",
  },
  {
    icon: WalletCards,
    title: "Deposits separated",
    text: "Refundable deposits are shown apart from rental subtotal so renters understand the hold before requesting.",
  },
  {
    icon: ClipboardCheck,
    title: "Condition visibility",
    text: "Each listing captures condition, replacement value, safety notes, and pickup instructions.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted peer roadmap",
    text: "Identity checks, claims workflows, and protection partners come before broad peer-to-peer scaling.",
  },
];

export function TrustSafetyPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="text-base font-bold text-slate-950">Trust and safety</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {trustItems.map((item) => (
          <div key={item.title} className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lake-50 text-lake-700">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-950">{item.title}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
