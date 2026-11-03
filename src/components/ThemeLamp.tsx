import React, { useEffect, useRef, useState } from 'react';


interface ThemeLampProps {
  goldOn: boolean;
  onToggle: () => void;
}


/* Rope geometry (px) */
const ROPE_BASE = 96;    // resting length of the hanging cord
const PULL_TRIGGER = 42; // stretch needed to switch the theme
const PULL_MAX = 78;     // the cord never stretches beyond this


/* The Golden Lamp — a pull-cord lantern fixed to the right edge of
   the realm. Drag the cord down like an old library lamp: past the
   trigger point it clicks, the flame ignites, and the whole site is
   re-forged in Lannister gold. A plain tap also works. */
export const ThemeLamp: React.FC<ThemeLampProps> = ({ goldOn, onToggle }) => {
  const [pull, setPull] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [flash, setFlash] = useState(false);
  const dragging = useRef(false);
  const fired = useRef(false);
  const startY = useRef(0);
  const firstRender = useRef(true);


  /* Warm golden flash across the page whenever the lamp changes state
     (skipped on the very first render so reloads don't flash). */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 950);
    return () => window.clearTimeout(t);
  }, [goldOn]);


  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    fired.current = false;
    startY.current = e.clientY - pull;
    setSnapping(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };


  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const next = Math.max(0, Math.min(PULL_MAX, e.clientY - startY.current));
    setPull(next);
    if (!fired.current && next >= PULL_TRIGGER) {
      fired.current = true;
      onToggle();
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(18);
      }
    }
  };


  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setSnapping(true); // springy release back to resting length
    setPull(0);
  };


  const handleClick = () => {
    /* A plain tap (no drag) also switches the lamp. If the drag
       already fired the toggle, this click is ignored. */
    if (!fired.current) onToggle();
  };


  return (
    <>
      {/* candle-light wash over the page while the gold lamp burns */}
      <div className={`lamp-glow ${goldOn ? 'lamp-glow--on' : ''}`} aria-hidden="true" />


      {/* brief golden flash on every switch */}
      {flash && <div className="lamp-flash" aria-hidden="true" />}


      <div className="lamp-rig">
        <div className="lamp-hook" aria-hidden="true" />
        <div
          className={`lamp-cord ${snapping ? 'lamp-cord--snap' : ''} ${goldOn ? 'lamp-cord--lit' : ''}`}
          style={{ height: `${ROPE_BASE + pull}px` }}
          aria-hidden="true"
        />
        <button
          type="button"
          className={`lamp-pull ${snapping ? 'lamp-pull--snap' : ''} ${goldOn ? 'lamp-pull--lit' : ''}`}
          style={{ transform: `translateY(${pull}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={handleClick}
          aria-pressed={goldOn}
          aria-label={goldOn ? 'Pull the rope to quench the golden lamp' : 'Pull the rope to light the golden lamp'}
          title={goldOn ? 'Quench the golden lamp' : 'Light the golden lamp'}
        >
          <span className="lamp-pull__body" aria-hidden="true">
            <span className="lamp-knob" />
            <span className="lamp-cage">
              <span className="lamp-flame" />
            </span>
            <span className="lamp-tassel" />
          </span>
        </button>
      </div>
    </>
  );
};


export default ThemeLamp;
