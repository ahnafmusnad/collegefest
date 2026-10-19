import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  children: string;
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
        <span data-text={children}>{children}</span>
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
