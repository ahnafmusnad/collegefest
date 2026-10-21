import React, { useEffect, useRef, useState } from 'react';
import { Snowflake } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  targetPageName?: string;
  onFinish?: () => void;
}

const HOLD_MS = 2900; // how long the loader plays before it starts dissolving
const EXIT_MS = 1200; // dissolve length, must match the CSS transition on .cl-loader

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  targetPageName = 'The Citadel',
  onFinish,
}) => {
  const [mounted, setMounted] = useState(isLoading);
  const [leaving, setLeaving] = useState(false);
  const [run, setRun] = useState(0); // changes on every new load so the CSS animations restart
  const onFinishRef = useRef(onFinish);

  // always call the latest onFinish (App recreates it when the target page changes)
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // start (or restart) the loader
  useEffect(() => {
    if (!isLoading) return;
    setMounted(true);
    setLeaving(false);
    setRun((r) => r + 1);
    const t = setTimeout(() => {
      setLeaving(true); // begin the dissolve
      onFinishRef.current?.(); // swap the page underneath while it dissolves
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [isLoading]);

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
    <div className={`cl-loader${leaving ? ' cl-loader--done' : ''}`} aria-hidden="true">
      <React.Fragment key={run}>
        <div className="cl-frost" />
        <div className="cl-inner">
          <div className="cl-sigil">
            <Snowflake strokeWidth={1.6} />
          </div>
          <h2 className="cl-title"><span>Winter</span> <span>Is</span> <span>Coming</span></h2>
          <div className="cl-bar"><span /></div>
          <p className="cl-sub">Entering {targetPageName}…</p>
        </div>
      </React.Fragment>
    </div>
  );
};
