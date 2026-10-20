interface GemDividerProps {
  className?: string;
  /** Width of the flanking rules (Tailwind class on the <span>) */
  width?: string;
}

/**
 * Centrepiece divider: a hairline rule, a faceted gem (diamond), and a
 * mirrored hairline rule. Used to frame section headings.
 */
export default function GemDivider({ className = "", width = "w-24 sm:w-36" }: GemDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-2.5 text-crimson-2 ${className}`} aria-hidden="true">
      <span className={`h-px ${width} bg-gradient-to-r from-transparent via-crimson-2/50 to-crimson-2/90`} />
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0">
        <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" />
      </svg>
      <span className={`h-px ${width} bg-gradient-to-l from-transparent via-crimson-2/50 to-crimson-2/90`} />
    </div>
  );
}
