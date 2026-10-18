import React, { useEffect, useRef } from 'react';

interface SnowfallCanvasProps {
  intensity?: 'gentle' | 'blizzard' | 'off';
}

interface Flake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
}

export const SnowfallCanvas: React.FC<SnowfallCanvasProps> = ({ intensity = 'gentle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (intensity === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = intensity === 'blizzard' ? 180 : 85;
    const flakes: Flake[] = [];

    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (intensity === 'blizzard' ? 3.5 : 2.5) + 0.8,
        speed: Math.random() * (intensity === 'blizzard' ? 3.5 : 1.8) + 0.8,
        wind: (Math.random() - 0.5) * (intensity === 'blizzard' ? 2.5 : 1),
        opacity: Math.random() * 0.7 + 0.3,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#ffffff';

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.x += f.wind + Math.sin(f.swing) * 0.6;
        f.y += f.speed;

        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 228, 211, ${f.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(226, 113, 29, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  if (intensity === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      style={{ opacity: intensity === 'blizzard' ? 0.85 : 0.65 }}
    />
  );
};
