import React, { useRef, useState, useCallback } from 'react';


interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareClassName?: string;
  maxTilt?: number;
  scale?: number;
  shadowClassName?: string;
  baseShadowClassName?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  glare?: boolean;
  aura?: boolean;
}


export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.03,
  baseShadowClassName = '0 12px 30px -14px rgba(0, 0, 0, 0.85), 0 2px 8px -4px rgba(0, 0, 0, 0.6)',
  onClick,
  onMouseEnter
}) => {
  const ref = useRef<HTMLDivElement>(null);
  /* PERF: mousemove can fire 120+ times/sec on desktop and each event
     used to setState → full re-render. Coalesce to one update per
     animation frame instead. */
  const pending = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef(0);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');


  const flushTilt = useCallback(() => {
    rafId.current = 0;
    const el = ref.current;
    const pt = pending.current;
    if (!el || !pt) return;
    const rect = el.getBoundingClientRect();
    const px = (pt.x - rect.left) / rect.width;
    const py = (pt.y - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  }, [maxTilt, scale]);


  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pending.current = { x: e.clientX, y: e.clientY };
    if (!rafId.current) rafId.current = requestAnimationFrame(flushTilt);
  }, [flushTilt]);


  const handleMouseLeave = useCallback(() => {
    pending.current = null;
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = 0; }
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);


  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        boxShadow: baseShadowClassName
      }}
    >
      {children}
    </div>
  );
};