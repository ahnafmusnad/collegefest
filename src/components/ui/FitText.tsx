import React, { useLayoutEffect, useRef } from 'react';

interface FitTextProps {
  children: React.ReactNode;
  /** Element tag to render. Defaults to a span. */
  as?: 'span' | 'h1' | 'h2' | 'p';
  /** Largest font-size (px) the text may ever reach. */
  max?: number;
  /** Smallest font-size (px) before we stop shrinking. */
  min?: number;
  className?: string;
}

const DISPLAY_FONT = 'GameOfThrones';

/**
 * FIT TEXT — scales a single line of type so it always exactly fills the
 * available width of its parent container, matching the sword divider on
 * mobile, tablet, and desktop alike.
 *
 * How it prevents the mobile/tablet overflow bug:
 * 1. Outer wrapper (`wrapperRef`) is a `block w-full min-w-0 overflow-hidden`
 *    box whose width is strictly governed by the parent layout (never expanded
 *    by the inner text).
 * 2. Inner text (`textRef`) is `inline-block whitespace-nowrap`. When we test
 *    at `max` px, it is measured inside the locked outer box so it cannot push
 *    parent flex items wider than the viewport.
 * 3. Re-runs automatically on `document.fonts.load`, `document.fonts.ready`,
 *    `loadingdone` events, window resize, and ResizeObserver on BOTH the outer
 *    container AND the inner text box (catching late webfont glyph swaps!).
 */
export const FitText: React.FC<FitTextProps> = ({
  children,
  as: Tag = 'span',
  max = 120,
  min = 9,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const el = textRef.current;
    if (!wrapper || !el) return;

    let revealed = false;
    let isFitting = false;
    let rafId = 0;
    const timers: number[] = [];

    const fit = () => {
      if (isFitting) return;
      const targetWidth = wrapper.clientWidth;
      if (targetWidth <= 0) return;

      isFitting = true;

      // 1. Temporarily set to max size to get true intrinsic width of the inline-block text
      el.style.fontSize = `${max}px`;
      const measuredWidth = el.scrollWidth || el.getBoundingClientRect().width;

      if (measuredWidth > 0) {
        // 2. Scale proportionally to fit exact targetWidth
        let nextSize = (targetWidth / measuredWidth) * max;
        nextSize = Math.max(min, Math.min(max, nextSize));
        el.style.fontSize = `${nextSize}px`;

        // 3. Second-pass micro-correction for letter-spacing & subpixel rounding
        const actualWidth = el.scrollWidth || el.getBoundingClientRect().width;
        if (actualWidth > targetWidth && actualWidth > 0) {
          const corrected = Math.max(min, nextSize * (targetWidth / actualWidth) * 0.992);
          el.style.fontSize = `${corrected}px`;
        }
      }

      isFitting = false;
    };

    const fitAndReveal = () => {
      fit();
      if (!revealed) {
        revealed = true;
        rafId = requestAnimationFrame(() => {
          el.style.opacity = '1';
        });
      }
    };

    // Start hidden until first measurement with loaded font completes
    el.style.opacity = '0';
    fit();

    // Explicitly load the GameOfThrones font face and wait for all fonts to settle
    const fonts = document.fonts;
    if (fonts) {
      Promise.all([
        fonts.load ? fonts.load(`16px "${DISPLAY_FONT}"`).catch(() => []) : Promise.resolve(),
        fonts.ready ? fonts.ready.catch(() => undefined) : Promise.resolve(),
      ]).then(() => {
        fitAndReveal();
        // Follow-up passes to catch mobile GPU/WebKit late glyph metric swaps
        timers.push(window.setTimeout(fit, 60));
        timers.push(window.setTimeout(fit, 250));
        timers.push(window.setTimeout(fit, 600));
      });

      // If any font finishes loading later, re-fit immediately
      const onFontDone = () => fitAndReveal();
      fonts.addEventListener?.('loadingdone', onFontDone);
      timers.push(window.setTimeout(fitAndReveal, 1200));

      // Observe BOTH the wrapper width (viewport/container changes)
      // AND the text element itself (when webfont swaps change text box size!)
      const ro = new ResizeObserver(() => {
        if (!isFitting) fit();
      });
      ro.observe(wrapper);
      ro.observe(el);

      window.addEventListener('resize', fit);
      window.addEventListener('orientationchange', fit);
      window.addEventListener('load', fitAndReveal);

      return () => {
        cancelAnimationFrame(rafId);
        timers.forEach((t) => window.clearTimeout(t));
        fonts.removeEventListener?.('loadingdone', onFontDone);
        ro.disconnect();
        window.removeEventListener('resize', fit);
        window.removeEventListener('orientationchange', fit);
        window.removeEventListener('load', fitAndReveal);
      };
    } else {
      fitAndReveal();
      window.addEventListener('resize', fit);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', fit);
      };
    }
  }, [max, min]);

  const Comp = Tag as React.ElementType;

  return (
    <span
      ref={wrapperRef}
      className="block w-full min-w-0 overflow-hidden text-center"
    >
      <Comp
        ref={textRef}
        className={`inline-block whitespace-nowrap text-center ${className}`}
        style={{ lineHeight: 1.1, opacity: 0, transition: 'opacity 0.25s ease' }}
      >
        {children}
      </Comp>
    </span>
  );
};

export default FitText;
