interface SwordDividerProps {
  className?: string;
}

export default function SwordDivider({ className = "" }: SwordDividerProps) {
  return (
    <div
      className={`w-full max-w-3xl mx-auto px-4 text-gold ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 24"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto block"
        fill="currentColor"
      >
        {/* pommel */}
        <circle cx="10" cy="12" r="4" />
        {/* grip */}
        <rect x="14" y="10.5" width="34" height="3" />
        {/* crossguard */}
        <rect x="48" y="3" width="4" height="18" />
        {/* blade */}
        <polygon points="52,10 580,10.5 598,12 580,13.5 52,14" />
      </svg>
    </div>
  );
}
