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
  glareClassName = 'rounded-2xl',
  maxTilt = 10,
  scale = 1.03,
  shadowClassName = '0 30px 60px -20px rgba(0, 0, 0, 0.9), 0 0 42px -8px rgba(201, 162, 39, 0.45), 0 0 80px -18px rgba(226, 113, 29, 0.35)',
  baseShadowClassName = '0 12px 30px -14px rgba(0, 0, 0, 0.85), 0 2px 8px -4px rgba(0, 0, 0, 0.6)',
  onClick,
  onMouseEnter,
  glare = true,
  aura = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [isHovering, setIsHovering] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

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
    setIsHovering(true);
    setGlarePos({ x: px * 100, y: py * 100, opacity: 1 });
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setIsHovering(false);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
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
        boxShadow: isHovering ? shadowClassName : baseShadowClassName
      }}
    >
      {/* Rotating conic aura behind the card on hover */}
      {aura && (
        <div
          aria-hidden="true"
          className={`tilt-aura pointer-events-none absolute -inset-[3px] -z-10 rounded-[inherit] transition-opacity duration-500 ${
            isHovering ? 'tilt-aura-active opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {children}

      {/* Mouse-tracking warm spotlight */}
      {glare && (
        <div
          className={`pointer-events-none absolute inset-0 ${glareClassName} transition-opacity duration-300`}
          style={{
            background: `radial-gradient(420px circle at ${glarePos.x}% ${glarePos.y}%, rgba(237, 228, 211, 0.18), rgba(226, 113, 29, 0.1) 40%, transparent 62%)`,
            opacity: glarePos.opacity
          }}
        />
      )}
    </div>
  );
};
