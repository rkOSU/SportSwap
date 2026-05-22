import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-lg font-black text-slate-950">
            GearLoop
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            One searchable rental layer for bikes, boards, snow gear, water gear, and camping
            equipment, starting with local rental shop aggregation.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Marketplace</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link to="/browse" className="hover:text-forest-700">
              Browse gear
            </Link>
            <Link to="/partner" className="hover:text-forest-700">
              Partner with us
            </Link>
            <Link to="/about" className="hover:text-forest-700">
              Business model
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">MVP status</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Request flow, mock inventory, and partner intake are client-side for validation and
            demos. Backend, payments, and verification come next.
          </p>
        </div>
      </div>
    </footer>
  );
}
