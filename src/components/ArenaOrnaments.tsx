interface SvgProps {
  className?: string;
}


/* SPARKLE — four-point twinkle pinned to frame ends */
export function Sparkle({ className = '', delay = '0s' }: SvgProps & { delay?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${className}`}>
      <svg viewBox="0 0 28 28" className="arena-sparkle block h-auto w-full" style={{ animationDelay: delay }}>
        <path
          d="M14 1.5 Q15.8 11.2 26.5 14 Q15.8 16.8 14 26.5 Q12.2 16.8 1.5 14 Q12.2 11.2 14 1.5 Z"
          fill="rgba(158,159,159,0.16)"
          stroke="#9e9f9f"
          strokeWidth="1.1"
        />
        <path
          d="M14 7 Q14.9 12.6 21 14 Q14.9 15.4 14 21 Q13.1 15.4 7 14 Q13.1 12.6 14 7 Z"
          fill="rgba(201,210,210,0.4)"
        />
      </svg>
    </span>
  );
}


/* NOTCH DIAMOND — silver gem set into a border line */
export function NotchDiamond({ className = '' }: SvgProps) {
  return (
    <svg aria-hidden viewBox="0 0 9 9" className={`pointer-events-none absolute h-[9px] w-[9px] ${className}`}>
      <path d="M4.5 0 L9 4.5 L4.5 9 L0 4.5 Z" fill="#061a1c" stroke="#9e9f9f" strokeWidth="1" />
    </svg>
  );
}


/* TABLET FRAME — stretched heraldic ogee for venue cards */
export function TabletFrame({ active = false, className = '' }: SvgProps & { active?: boolean }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible transition-all duration-500 ${className}`}
      viewBox="0 36 880 78"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="tablet-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(11,40,42,0.92)" />
          <stop offset="50%" stopColor="rgba(5,26,29,0.95)" />
          <stop offset="100%" stopColor="rgba(9,38,43,0.92)" />
        </linearGradient>
      </defs>
      <path
        d="M 122 45 L 758 45 C 790 45 799 51 811 61 C 825 71 846 73 872 75 C 846 77 825 79 811 89 C 799 99 790 105 758 105 L 122 105 C 90 105 81 99 69 89 C 55 79 34 77 8 75 C 34 73 55 71 69 61 C 81 51 90 45 122 45 Z"
        fill="url(#tablet-surface)"
        stroke={active ? '#9fe0d4' : '#17686e'}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 128 53 L 752 53 C 780 53 788 58 799 67 C 811 76 828 73.8 852 75 C 828 76.2 811 74 799 83 C 788 92 780 97 752 97 L 128 97 C 100 97 92 92 81 83 C 69 74 52 76.2 28 75 C 52 73.8 69 76 81 67 C 92 58 100 53 128 53 Z"
        fill="none"
        stroke={active ? '#1f8f96' : '#145e62'}
        strokeWidth="1"
        opacity="0.85"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


/* PLAQUE FRAME — chamfered twin border for the great slab */
export function PlaqueFrame({ className = '' }: SvgProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 880 620"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="plaque-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(10,42,47,0.78)" />
          <stop offset="45%" stopColor="rgba(4,20,22,0.92)" />
          <stop offset="100%" stopColor="rgba(8,34,38,0.82)" />
        </linearGradient>
      </defs>
      <path
        d="M 34 6 H 846 L 874 34 V 586 L 846 614 H 34 L 6 586 V 34 Z"
        fill="url(#plaque-fill)"
        stroke="#17686e"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 40 14 H 840 L 866 40 V 580 L 840 606 H 40 L 14 580 V 40 Z"
        fill="none"
        stroke="#145e62"
        strokeWidth="1"
        opacity="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


/* CORNER FLOURISH — scrolled fleuron, rotate per corner */
export function CornerFlourish({ className = '' }: SvgProps) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" fill="none" className={`pointer-events-none absolute h-10 w-10 ${className}`}>
      <path d="M4 46 C4 22 22 4 46 4" stroke="#9e9f9f" strokeWidth="1.2" opacity="0.85" />
      <path d="M10 46 C10 26 26 10 46 10" stroke="#1f8f96" strokeWidth="0.9" opacity="0.8" />
      <path d="M4 46 L8.5 41.5 L4 37 L-0.5 41.5 Z" fill="#061a1c" stroke="#9e9f9f" strokeWidth="0.9" transform="translate(0.5 0)" />
      <path d="M46 4 L41.5 8.5 L37 4 L41.5 -0.5 Z" fill="#061a1c" stroke="#9e9f9f" strokeWidth="0.9" transform="translate(0 0.5)" />
      <circle cx="17" cy="17" r="1.6" fill="#9fe0d4" opacity="0.9" />
    </svg>
  );
}


/* BANNER CAP — cracked stone end of a ribbon button */
export function BannerCap({ right = false, className = '' }: SvgProps & { right?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 48"
      preserveAspectRatio="none"
      className={`h-full w-[16px] shrink-0 sm:w-[20px] ${right ? '-scale-x-100' : ''} ${className}`}
    >
      <path d="M22 0 H9 C7 9 3 15 0 24 C3 33 7 39 9 48 H22 Z" fill="#0b282a" stroke="#9e9f9f" strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
      <path
        d="M20 6 L14 14 L17 22 L12 30 L16 40 M14 14 L19 12 M17 22 L10 24"
        fill="none"
        stroke="#9e9f9f"
        strokeWidth="0.7"
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


export function FlourishDivider({ className = '' }: SvgProps) {
  return (
    <svg aria-hidden viewBox="0 0 320 20" fill="none" className={className}>
      <path d="M8 10 H136" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M184 10 H312" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M140 10 L150 5.5 L158 10 L150 14.5 Z" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <path d="M162 10 L170 5.5 L180 10 L170 14.5 Z" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <circle cx="160" cy="10" r="2.4" fill="currentColor" />
      <circle cx="8" cy="10" r="1.6" fill="currentColor" opacity="0.6" />
      <circle cx="312" cy="10" r="1.6" fill="currentColor" opacity="0.6" />
    </svg>
  );
}


export function KeepSilhouette({ className = '' }: SvgProps) {
  return (
    <svg aria-hidden viewBox="0 0 120 48" fill="none" className={className}>
      <path
        d="M4 46 V22 H12 V14 H18 V22 H26 V10 H32 V4 H38 V10 H44 V22 H52 V16 H60 V22 H68 V8 H74 V2 H80 V8 H86 V22 H94 V14 H100 V22 H108 V18 H116 V46 Z"
        fill="currentColor"
      />
    </svg>
  );
}
