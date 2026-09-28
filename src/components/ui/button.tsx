import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30 active:bg-brand-800",
  secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100 hover:text-brand-800 active:bg-brand-200/80",
  outline: "border border-gray-300 bg-white text-gray-800 shadow-sm hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-100/90 hover:text-gray-900 active:bg-gray-200/70",
  danger: "bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-700 hover:shadow-md active:bg-red-800",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs font-semibold gap-1.5",
  md: "h-10 px-4 text-sm font-medium gap-2",
  lg: "h-12 px-6 text-base font-medium gap-2.5",
  icon: "h-10 w-10 p-0",
};

export function buttonClass(options: { variant?: Variant; size?: Size; className?: string } = {}): string {
  const { variant = "primary", size = "md", className } = options;
  return cn(
    "inline-flex cursor-pointer select-none items-center justify-center rounded-xl transition-all duration-150 active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  variant,
  size,
  loading,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
