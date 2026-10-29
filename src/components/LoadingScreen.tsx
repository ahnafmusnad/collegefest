import React, { useEffect, useRef, useState } from 'react';


interface LoadingScreenProps {
  isLoading: boolean;
  targetPageName?: string;
  onFinish?: () => void;
}


/* Timeline (all CSS, see the "LOADING SCREEN" block in index.css):
   0.15s → 1.35s  whole emblem fades in evenly (no left-to-right wipe)
   0.75s → 1.70s  cyan glow blooms to full, then settles
   1.05s → 2.45s  a single light sheen glides across the metal
   3.00s          dissolve starts (EXIT_MS long)                       */
const HOLD_MS = 3000;        // how long the emblem shows before the dissolve
const EXIT_MS = 700;         // must match the .cl-loader transition in index.css
const MAX_IMG_WAIT_MS = 1200; // never wait longer than this for the image
const EMBLEM_SRC = '/images/carnaval-loader.webp';


export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  targetPageName = 'The Citadel',
  onFinish,
}) => {
  const [mounted, setMounted] = useState(isLoading);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(0); // changes on every new load so the CSS animations restart
  const onFinishRef = useRef(onFinish);
  const imgRef = useRef<HTMLImageElement>(null);


  // always call the latest onFinish (App recreates it when the target page changes)
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);


  // start (or restart) the loader
  useEffect(() => {
    if (!isLoading) return;
    setMounted(true);
    setLeaving(false);
    setReady(false);
    setRun((r) => r + 1);
  }, [isLoading]);


  // the image may already be cached → mark ready immediately; otherwise cap the wait
  useEffect(() => {
    if (!mounted || ready || leaving) return;
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), MAX_IMG_WAIT_MS);
    return () => clearTimeout(t);
  }, [mounted, ready, leaving, run]);


  // once the emblem is on screen, hold, then dissolve
  useEffect(() => {
    if (!isLoading || !ready) return;
    const t = setTimeout(() => {
      setLeaving(true); // begin the dissolve
      onFinishRef.current?.(); // swap the page underneath while it dissolves
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [isLoading, ready, run]);


  // unmount after the dissolve finishes
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving]);


  // lock page scroll while the loader is fully visible
  useEffect(() => {
    if (!mounted || leaving) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted, leaving]);


  if (!mounted) return null;


  return (
    <div
      className={`cl-loader${ready ? ' cl-loader--ready' : ''}${leaving ? ' cl-loader--done' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="cl-stage" key={run}>
        <img
          ref={imgRef}
          className="cl-emblem"
          src={EMBLEM_SRC}
          alt=""
          width={1024}
          height={537}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          onLoad={() => setReady(true)}
          onError={() => setReady(true)}
        />
        <img
          className="cl-glow"
          src={EMBLEM_SRC}
          alt=""
          width={1024}
          height={537}
          decoding="async"
          draggable={false}
          aria-hidden="true"
        />
        <div className="cl-sheen" aria-hidden="true" />
      </div>
      <span className="cl-sr">Entering {targetPageName}…</span>
    </div>
  );
};
