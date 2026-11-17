import React from "react";
import { ArrowRight } from "lucide-react";


interface RuneButtonProps {
  icon?: React.ElementType; // accepted so existing calls still compile, not displayed
  children: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}


const Cap = ({ right = false }: { right?: boolean }) => (
  <svg
    className={`banner-btn__cap ${right ? "banner-btn__cap--r" : ""}`}
    viewBox="0 0 22 48"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      className="cap-shape"
      d="M22 0 H9 C7 9 3 15 0 24 C3 33 7 39 9 48 H22 Z"
      vectorEffect="non-scaling-stroke"
    />
    <path
      className="cap-crack"
      d="M20 6 L14 14 L17 22 L12 30 L16 40 M14 14 L19 12 M17 22 L10 24"
      fill="none"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);


export default function RuneButton({
  children,
  href,
  external = false,
  primary = false,
  onClick,
  className = "",
}: RuneButtonProps) {
  const classes = `banner-btn ${primary ? "banner-btn--primary" : ""} ${className}`;
  const inner = (
    <>
      <Cap />
      <span className="banner-btn__body">
        <span>{children}</span>
        <ArrowRight className="banner-btn__arrow" aria-hidden="true" />
      </span>
      <Cap right />
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
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
