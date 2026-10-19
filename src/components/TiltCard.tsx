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
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
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
