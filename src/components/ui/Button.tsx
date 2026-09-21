import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline" | "gold" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: "luxury-btn-primary",
  outline: "luxury-btn-outline",
  gold: "luxury-btn-gold",
  ghost:
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-xs uppercase tracking-luxury text-stone-600 transition-colors hover:text-charcoal",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
