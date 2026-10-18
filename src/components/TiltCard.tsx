import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareClassName?: string;
  maxTilt?: number;
  scale?: number;
  shadowClassName?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareClassName = 'rounded-2xl',
  maxTilt = 10,
  scale = 1.03,
  shadowClassName = '0 25px 50px rgba(11, 9, 7, 0.55), 0 0 32px rgba(226, 113, 29, 0.12)',
  onClick,
  onMouseEnter,
  glare = true
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
      className={`transition-transform duration-200 ease-out ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        boxShadow: isHovering ? shadowClassName : undefined
      }}
    >
      {children}
      {glare && (
        <div
          className={`pointer-events-none absolute inset-0 ${glareClassName} transition-opacity duration-300`}
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(237, 228, 211, 0.14), transparent 55%)`,
            opacity: glarePos.opacity
          }}
        />
      )}
    </div>
  );
};
