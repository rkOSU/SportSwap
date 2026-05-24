import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-300 text-zinc-950 shadow-sm hover:bg-forest-200 focus-visible:outline-forest-300",
  secondary: "bg-trail-500 text-white shadow-sm hover:bg-trail-700 focus-visible:outline-trail-500",
  outline:
    "border border-slate-300 bg-zinc-950/50 text-slate-900 hover:border-forest-300 hover:text-forest-100 focus-visible:outline-forest-300",
  ghost: "text-slate-700 hover:bg-white/10 focus-visible:outline-slate-500",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        variantClasses[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
