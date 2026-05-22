import { Menu, Mountain, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";

const links = [
  { to: "/browse", label: "Find Gear" },
  { to: "/partner", label: "Partner" },
  { to: "/about", label: "About" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-forest-50 text-forest-700" : "text-slate-700 hover:bg-slate-100"
  }`;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-slate-950" aria-label="GearLoop home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600 text-white">
            <Mountain className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-black">GearLoop</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/browse"
            className="inline-flex min-h-10 items-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Browse inventory
          </Link>
          <Link
            to="/partner"
            className="inline-flex min-h-10 items-center rounded-lg bg-forest-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-700"
          >
            List inventory
          </Link>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="page-shell flex flex-col gap-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
