import React, { useEffect, useRef } from 'react';

interface SnowfallCanvasProps {
  intensity?: 'gentle' | 'blizzard' | 'off';
  aboveLoader?: boolean;
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

export const SnowfallCanvas: React.FC<SnowfallCanvasProps> = ({ intensity = 'gentle', aboveLoader = false }) => {
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

    /* PERF FIX: the old loop set ctx.shadowBlur and ctx.shadowColor INSIDE the
       per-flake loop. Canvas shadow-blur makes the browser render every shape
       twice (once normal, once blurred) and composite them. At 85 flakes x 60fps
       that was ~5,100 blur passes per second, forever - 10,800 in blizzard mode.


       The glow was a 40%-opacity dark teal behind near-white flakes on a canvas
       already faded to 0.65 - visually almost nothing. Dropping it removes
       essentially the entire cost of this component.


       Also removed: the dead `ctx.fillStyle = '#ffffff'` (it was overwritten on
       every iteration). Added a pause when the tab is hidden so the snow stops
       burning CPU in a background tab. */
    ctx.shadowBlur = 0;


    const render = () => {
      ctx.clearRect(0, 0, width, height);


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
        ctx.fillStyle = `rgba(201, 210, 210, ${f.opacity})`;
        ctx.fill();
      }


      animationFrameId = requestAnimationFrame(render);
    };


    /* Stop the loop entirely when the tab is in the background. */
    const handleVisibility = () => {
      cancelAnimationFrame(animationFrameId);
      if (!document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };


    render();
    document.addEventListener('visibilitychange', handleVisibility);


    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  if (intensity === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 ${aboveLoader ? 'z-[61]' : 'z-20'}`}
      style={{ opacity: intensity === 'blizzard' ? 0.85 : 0.65 }}
    />
  );
};
