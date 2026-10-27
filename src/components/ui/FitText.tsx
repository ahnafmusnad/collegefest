import React, { useLayoutEffect, useRef } from 'react';

interface FitTextProps {
  children: React.ReactNode;
  /** Element tag to render. Defaults to a block span. */
  as?: 'span' | 'h1' | 'h2' | 'p';
  /** Largest font-size (px) the text may ever reach. */
  max?: number;
  /** Smallest font-size (px) before we stop shrinking. */
  min?: number;
  className?: string;
}

/**
 * FIT TEXT — scales a single line of type so it always exactly fills the
 * width of its parent, no matter the viewport. Used to lock "CARNAVAL" and
 * "DA CHITTAGONG COLLEGE" to the exact length of the sword divider beneath
 * them, on every device.
 */
export const FitText: React.FC<FitTextProps> = ({
  children,
  as: Tag = 'span',
  max = 120,
  min = 12,
  className = '',
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const target = parent.clientWidth;
      if (target <= 0) return;

      // measure at max size, then scale down proportionally
      el.style.fontSize = `${max}px`;
      const measured = el.scrollWidth;
      if (measured <= 0) return;

      let size = (target / measured) * max;
      size = Math.max(min, Math.min(max, size));
      el.style.fontSize = `${size}px`;

      // one correction pass for letter-spacing rounding
      const remeasure = el.scrollWidth;
      if (remeasure > target) {
        el.style.fontSize = `${Math.max(min, size * (target / remeasure) * 0.995)}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener('load', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', fit);
    };
  }, [children, max, min]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`block whitespace-nowrap text-center ${className}`}
      style={{ lineHeight: 1.1 }}
    >
      {children}
    </Comp>
  );
};

export default FitText;
