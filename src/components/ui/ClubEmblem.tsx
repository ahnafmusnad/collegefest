import React from 'react';

export type EmblemKind = 'physics' | 'muses' | 'debate' | 'photo';

const LAUREL_LEAVES = 7;

function laurelSpray(side: 1 | -1) {
  const leaves = [];
  for (let i = 0; i < LAUREL_LEAVES; i++) {
    const t = i / (LAUREL_LEAVES - 1);
    const angle = -62 + t * 124;
    const rad = (angle * Math.PI) / 180;
    const x = 50 + side * (37 * Math.cos(rad));
    const y = 50 + 40 * Math.sin(rad);
    leaves.push(
      <ellipse
        key={`${side}-${i}`}
        cx={x}
        cy={y}
        rx="4.6"
        ry="1.9"
        transform={`rotate(${angle * 0.85} ${x} ${y})`}
      />
    );
  }
  return leaves;
}

const EMBLEMS: Record<EmblemKind, React.ReactNode> = {
  physics: (
    <g>
      <circle cx="50" cy="50" r="13" />
      <ellipse cx="50" cy="50" rx="30" ry="11" transform="rotate(-24 50 50)" />
      <ellipse cx="50" cy="50" rx="30" ry="11" transform="rotate(34 50 50)" opacity="0.55" />
      <circle cx="50" cy="50" r="3.4" opacity="0.8" />
      <path d="M22 34c2.6 3.4 4 5.6 5.6 8.4" />
      <path d="M76 26c-3.2 2-5.4 3.4-8 5.4" />
      <path d="M27 74c2.8-2.4 4.6-3.6 7-5.6" />
    </g>
  ),
  muses: (
    <g>
      <path d="M50 34c-6-5-14-7-22-6v30c8-1 16 1 22 6" />
      <path d="M50 34c6-5 14-7 22-6v30c-8-1-16 1-22 6" />
      <path d="M50 34v30" />
      <path d="M56 68c-3 3-4 6-4 9 4-1 7-3 9-6" />
      <path d="M60 56c6-8 10-16 12-24-8 3-14 9-18 17-2 4-2 8-1 11" />
      <path d="M38 46c-2 4-3 8-3 12" opacity="0.7" />
      <path d="M62 46c2 4 3 8 3 12" opacity="0.7" />
    </g>
  ),
  debate: (
    <g>
      <path d="M34 30h32" />
      <path d="M38 30v34" />
      <path d="M44 30v34" />
      <path d="M50 30v34" />
      <path d="M56 30v34" />
      <path d="M62 30v34" />
      <path d="M32 64h36" />
      <path d="M28 70h44" />
      <path d="M28 64v6" />
      <path d="M72 64v6" />
      <path d="M32 38h-6" />
      <path d="M68 38h6" />
    </g>
  ),
  photo: (
    <g>
      <circle cx="50" cy="50" r="24" />
      <path d="M50 26l14 12-5 18H41l-5-18z" />
      <path d="M64 38l12-4-8 15-5-11z" opacity="0.85" />
      <path d="M36 38l-12-4 8 15 4-11z" opacity="0.85" />
      <path d="M50 74L36 62l-2 12 8 8" opacity="0.7" />
      <path d="M50 74l14-12 2 12-8 8" opacity="0.7" />
      <circle cx="50" cy="50" r="4" opacity="0.9" />
    </g>
  )
};

export interface ClubEmblemProps {
  kind: EmblemKind;
  className?: string;
  size?: number;
}

export default function ClubEmblem({ kind, className = '', size = 90 }: ClubEmblemProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46.5" strokeWidth="0.8" opacity="0.5" />
      <circle cx="50" cy="50" r="30" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 4" />
      <g opacity="0.8">{laurelSpray(1)}</g>
      <g opacity="0.8">{laurelSpray(-1)}</g>
      {EMBLEMS[kind]}
    </svg>
  );
}
