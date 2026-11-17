import React, { useEffect, useRef, useState } from 'react';


/**
 * Scroll-reveal entrance system.
 *
 * `direction` describes WHERE the element enters FROM:
 *  - 'auto'       → chosen at runtime from the element's position in the
 *                    viewport: left third slides in from the left, right
 *                    third from the right, middle rises from below.
 *                    This is the default, so grids naturally fan out
 *                    from both edges instead of everything sliding up.
 *  - 'up'/'down'  → rise from below / descend from above (with a soft
 *                    blur + scale settle, not a flat translate).
 *  - 'left'/'right' → sweep in from that side with a slight rotation,
 *                    like a banner swung into place.
 *  - 'zoom'       → scale up out of the blur (focus pull).
 *  - 'flip'       → 3D unfurl toward the viewer, like a parchment plaque
 *                    tipping forward onto the wall.
 *  - 'drop'       → falls from above and lands with a springy settle,
 *                    like a stone tablet being set down.
 *  - 'tilt-left' / 'tilt-right' → slide in with a heavier rotation,
 *                    like loose scripture pages sliding into a stack.
 */
export type RevealDirection =
  | 'auto'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'zoom'
  | 'flip'
  | 'drop'
  | 'tilt-left'
  | 'tilt-right';


type ResolvedDirection = Exclude<RevealDirection, 'auto'>;


interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Override the entrance duration in ms (default 950ms in CSS). */
  duration?: number;
  direction?: RevealDirection;
  id?: string;
}


/** Pick an entrance origin based on where the element sits horizontally. */
function resolveAutoDirection(el: HTMLElement): ResolvedDirection {
  const rect = el.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1;
  const center = (rect.left + rect.right) / 2;
  const ratio = center / viewportWidth;
  if (ratio < 0.35) return 'left';
  if (ratio > 0.65) return 'right';
  return 'up';
}


export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration,
  direction = 'auto',
  id
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<ResolvedDirection | null>(
    direction === 'auto' ? null : direction
  );
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const el = ref.current;
    if (!el) return;


    // Fallback for environments without IntersectionObserver: show at once.
    if (typeof IntersectionObserver === 'undefined') {
      setOrigin(direction === 'auto' ? 'up' : direction);
      setVisible(true);
      return;
    }


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();


        const resolved: ResolvedDirection =
          direction === 'auto'
            ? resolveAutoDirection(entry.target as HTMLElement)
            : direction;


        // Apply the entrance transform first, then flip visible two frames
        // later so the browser transitions from the true starting pose.
        setOrigin(resolved);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );


    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);


  const directionClass = origin ? `reveal-${origin}` : 'reveal-auto';


  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${directionClass} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : null),
        ...(duration ? { transitionDuration: `${duration}ms` } : null)
      }}
    >
      {children}
    </div>
  );
};


export default Reveal;
