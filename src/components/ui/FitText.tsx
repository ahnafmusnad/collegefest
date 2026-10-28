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
/** The display face the hero titles are measured in — must match @font-face
    in index.css. Measuring before it is active uses the fallback serif,
    which is narrower — and that is what made the title visibly shrink from
    big to small on slow/mobile connections. */
const DISPLAY_FONT = 'GameOfThrones';
/**
 * FIT TEXT — scales a single line of type so it always exactly fills the
 * width of its parent, no matter the viewport. Used to lock "CARNAVAL" and
 * "DA CHITTAGONG COLLEGE" to the exact length of the sword divider beneath
 * them, on every device.
 *
 * NO-FLASH LOADING: the element renders invisible (opacity 0) until the
 * REAL display font face is confirmed usable via document.fonts.check —
 * not merely until `document.fonts.ready` resolves, which is racy on
 * mobile and can fire while the fallback face is still being measured.
 * Only then is it measured and faded in, already at its final size.
 */
export const FitText: React.FC<FitTextProps> = ({
  children,
  as: Tag = 'span',
  max = 120,
  min = 12,
  className = '',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  // deps are intentionally [max, min] only: re-running on every parent
  // re-render would reset opacity to 0 and cause a blink.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;
    let pollTimer = 0;
    let settleTimer = 0;
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
    // start hidden so the measure / font-swap never shows; layout space is
    // still reserved, so nothing around the title jumps either.
    el.style.opacity = '0';
    fit();
    const fonts = document.fonts;
    const faceUsable = (): boolean => {
      try {
        return fonts?.check ? fonts.check(`16px "${DISPLAY_FONT}"`) : true;
      } catch {
        return true;
      }
    };
    // poll until the real face is usable (cap ~2.5s so a failed font load
    // never leaves the title invisible), then measure + reveal once.
    const waitForFace = () => {
      if (faceUsable()) {
        reveal();
        settleTimer = window.setTimeout(fit, 200);
        return;
      }
      let waited = 0;
      pollTimer = window.setInterval(() => {
        waited += 50;
        if (faceUsable() || waited >= 2500) {
          window.clearInterval(pollTimer);
          reveal();
          settleTimer = window.setTimeout(fit, 200);
        }
      }, 50);
    };
    // kick the font load explicitly (some mobile browsers delay webfont
    // fetches for below-priority text), then wait for the real face.
    if (fonts?.load) {
      fonts
        .load(`16px "${DISPLAY_FONT}"`)
        .catch(() => [])
        .then(waitForFace);
    } else {
      waitForFace();
    }
    // belt-and-braces: also reveal on full page load
    window.addEventListener('load', reveal);
    // live re-fit on container resize
    const ro = new ResizeObserver(() => fit());
    if (el.parentElement) ro.observe(el.parentElement);
    return () => {
      window.clearInterval(pollTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener('load', reveal);
      ro.disconnect();
    };
  }, [max, min]);
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`block whitespace-nowrap text-center ${className}`}
      style={{
        lineHeight: 1.22,
        paddingTop: '0.12em',
        paddingBottom: '0.04em',
        opacity: 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      {children}
    </Comp>
  );
};
export default FitText;
