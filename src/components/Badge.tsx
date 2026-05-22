import type { ReactNode } from "react";

type BadgeTone = "forest" | "lake" | "trail" | "amber" | "red" | "slate";

const toneClasses: Record<BadgeTone, string> = {
  forest: "bg-forest-100 text-forest-700 ring-forest-600/10",
  lake: "bg-lake-100 text-lake-700 ring-lake-600/10",
  trail: "bg-trail-100 text-trail-700 ring-trail-500/10",
  amber: "bg-amber-100 text-amber-800 ring-amber-600/10",
  red: "bg-red-100 text-red-700 ring-red-600/10",
  slate: "bg-slate-100 text-slate-700 ring-slate-600/10",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function Badge({ children, tone = "slate", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
