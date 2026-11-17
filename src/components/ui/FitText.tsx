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


/** Must match the @font-face family name in index.css. */
const DISPLAY_FONT = 'GameOfThrones';


/**
 * FIT TEXT — scales a single line so it exactly fills its parent's width.
 *
 * BUG FIX (first-load overflow on mobile):
 * 1. The hero column now has a definite width (w-full min-w-0 in Home.tsx),
 *    so the text can no longer stretch its own parent.
 * 2. We re-fit whenever ANY web font finishes loading ('loadingdone'),
 *    so a late font swap on slow connections is always corrected.
 * 3. ResizeObserver only re-fits when the parent's WIDTH changes and is
 *    batched with requestAnimationFrame (no feedback loop).
 */
export const FitText: React.FC<FitTextProps> = ({
  children,
  as: Tag = 'span',
  max = 120,
  min = 12,
  className = '',
}) => {
  const ref = useRef<HTMLElement | null>(null);


  // deps are intentionally [max, min] only (re-running would blink opacity).
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;


    let revealed = false;
    let pollTimer = 0;
    let settleTimer = 0;
    let rafId = 0;
    let lastParentWidth = -1;


    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const target = parent.clientWidth;
      if (target <= 0) return;
      lastParentWidth = target;


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


    const scheduleFit = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(fit);
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


    // start hidden so the measuring / font swap is never visible
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


    if (fonts?.load) {
      fonts
        .load(`16px "${DISPLAY_FONT}"`)
        .catch(() => [])
        .then(waitForFace);
    } else {
      waitForFace();
    }


    // FIX: re-fit every time a web font finishes loading (late swap on slow 3G)
    const onFontsLoaded = () => scheduleFit();
    fonts?.addEventListener?.('loadingdone', onFontsLoaded);
    fonts?.ready?.then(onFontsLoaded).catch(() => {});


    // belt-and-braces: also reveal on full page load
    window.addEventListener('load', reveal);


    // FIX: only re-fit when the parent's WIDTH really changes
    const ro = new ResizeObserver(() => {
      const parent = el.parentElement;
      if (!parent) return;
      if (parent.clientWidth !== lastParentWidth) scheduleFit();
    });
    if (el.parentElement) ro.observe(el.parentElement);


    return () => {
      window.clearInterval(pollTimer);
      window.clearTimeout(settleTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', reveal);
      fonts?.removeEventListener?.('loadingdone', onFontsLoaded);
      ro.disconnect();
    };
  }, [max, min]);


  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`block whitespace-nowrap text-center ${className}`}
      style={{
        maxWidth: '100%',
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
