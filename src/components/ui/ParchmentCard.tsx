import React from 'react';

export interface ParchmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  offset?: number; // slight vertical offset for organic feel
}

export default function ParchmentCard({
  children,
  className = '',
  offset = 0,
  ...rest
}: ParchmentCardProps) {
  return (
    <div
      className={`parchment-card relative ${className}`}
      style={{ '--parchment-offset': `${offset}px` } as React.CSSProperties}
      {...rest}
    >
      {/* Ragged parchment backdrop (displacement filter) */}
      <div className="parchment-card__backdrop" aria-hidden="true" />
      {/* Paper noise texture overlay */}
      <div className="parchment-card__noise" aria-hidden="true" />
      {/* Faint inner border line inset from the edge */}
      <div className="parchment-card__inner-border" aria-hidden="true" />
      {/* Curled scroll corners */}
      <span className="parchment-card__curl parchment-card__curl--tl" aria-hidden="true" />
      <span className="parchment-card__curl parchment-card__curl--tr" aria-hidden="true" />
      <span className="parchment-card__curl parchment-card__curl--bl" aria-hidden="true" />
      <span className="parchment-card__curl parchment-card__curl--br" aria-hidden="true" />

      <div className="parchment-card__body relative z-10">{children}</div>
    </div>
  );
}