import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  format?: (value: number) => string;
  className?: string;
  startOnView?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1800,
  delay = 0,
  format,
  className = '',
  startOnView = true
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [target] = useState(end);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const start = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime - delay;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(tick);
        else setSettled(true);
      };
      rafId = requestAnimationFrame(tick);
    };

    const el = ref.current;
    if (!el) return;

    if (!startOnView) {
      timeoutId = setTimeout(start, delay);
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [target, duration, delay, startOnView]);

  const display = settled ? end : value;

  return (
    <span ref={ref} className={className}>
      {format ? format(display) : display}
    </span>
  );
};
