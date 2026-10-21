import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  children: string;
  /** Shorter label shown on small screens; the full label is kept from `sm` up. */
  mobileLabel?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  mobileLabel,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = ["btn", variant === "secondary" && "btn--secondary", size === "sm" && "btn--sm", className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className="btn__label">
        <span data-text={children}>
          {mobileLabel ? (
            <>
              <span className="sm:hidden">{mobileLabel}</span>
              <span className="hidden sm:inline">{children}</span>
            </>
          ) : (
            children
          )}
        </span>
      </span>
      {external && <ArrowUpRight className="btn__icon" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
