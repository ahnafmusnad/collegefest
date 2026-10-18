import type { ReactNode } from "react";

interface ButtonProps {
  as?: "button" | "a";
  variant?: "primary" | "ghost" | "dark" | "link";
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export default function Button({ as = "button", variant = "primary", arrow = true, children, className = "", ...props }: ButtonProps) {
  const Tag = as as "button" | "a";
  const base = "group inline-flex items-center gap-3 font-display text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";
  const variants = {
    primary: "px-6 py-3.5 bg-gold text-ink hover:bg-bone",
    ghost: "px-6 py-3.5 border border-bone/25 text-bone hover:border-gold hover:text-gold",
    dark: "px-6 py-3.5 bg-ink text-bone hover:bg-ink-3",
    link: "text-gold hover:text-bone",
  };
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...(Tag === "button" ? { type: "button" } : {})} {...props}>
      {children}
      {arrow && <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </Tag>
  );
}
