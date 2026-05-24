import type { ReactNode } from "react";

type BadgeTone = "forest" | "lake" | "trail" | "amber" | "red" | "slate";

const toneClasses: Record<BadgeTone, string> = {
  forest: "bg-forest-300/15 text-forest-100 ring-forest-300/30",
  lake: "bg-lake-500/20 text-lake-100 ring-lake-100/20",
  trail: "bg-trail-500/20 text-trail-50 ring-trail-100/20",
  amber: "bg-amber-500/15 text-amber-100 ring-amber-300/30",
  red: "bg-red-500/15 text-red-100 ring-red-300/30",
  slate: "bg-stone-500/15 text-stone-200 ring-stone-200/15",
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
