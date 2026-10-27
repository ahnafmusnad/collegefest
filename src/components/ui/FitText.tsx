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
 *
 * NO-FLASH LOADING: the element renders invisible (opacity 0) until the
 * display font has finished loading and the first true measurement has been
 * applied — visitors never watch the title shrink from big to small while
 * the page settles. On resize it re-fits live.
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
    let revealed = false;
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
    const reveal = () => {
      fit();
      if (!revealed) {
        revealed = true;
        requestAnimationFrame(() => {
          el.style.opacity = '1';
        });
      }
    };
    // start hidden so the font-swap / measure never shows
    el.style.opacity = '0';
    fit();
    // reveal once the real font face has landed (true metrics)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        reveal();
        // fonts can swap a beat after `ready` resolves — refit once more
        window.setTimeout(fit, 150);
      });
    }
    window.addEventListener('load', reveal);
    // live re-fit on container resize
    const ro = new ResizeObserver(() => fit());
    if (el.parentElement) ro.observe(el.parentElement);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', reveal);
    };
  }, [children, max, min]);
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`block whitespace-nowrap text-center ${className}`}
      style={{ lineHeight: 1.1, opacity: 0, transition: 'opacity 0.35s ease' }}
    >
      {children}
    </Comp>
  );
};
export default FitText;
