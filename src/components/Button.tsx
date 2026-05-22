import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-600 text-white shadow-sm hover:bg-forest-700 focus-visible:outline-forest-600",
  secondary: "bg-lake-600 text-white shadow-sm hover:bg-lake-700 focus-visible:outline-lake-600",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:border-forest-600 hover:text-forest-700 focus-visible:outline-forest-600",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-500",
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
