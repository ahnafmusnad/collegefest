import React, { useEffect, useRef, useState } from 'react';
import { Bird, Check, Compass, Copy, ExternalLink, Globe } from 'lucide-react';
import {
  buildEscapeLinks,
  detectInAppBrowser,
  type EscapeLinks,
  type InAppBrowserInfo,
} from '../utils/browserGate';


/* ------------------------------------------------------------
   Flip to false if you ever want the gate to only OFFER buttons
   instead of silently launching the device's browser.
   ------------------------------------------------------------ */
const AUTO_LAUNCH_EXTERNAL = true;


const DISMISS_KEY = 'cdcc_browser_gate_dismissed';
const GATE_SHOW_DELAY = 1400; // let the "Winter is Coming" loader play first
const LAUNCH_DELAY = 2000;


export const InAppBrowserGate: React.FC = () => {
  const [env, setEnv] = useState<InAppBrowserInfo | null>(null);
  const [links, setLinks] = useState<EscapeLinks | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const attemptedRef = useRef(false);
  const copyTimerRef = useRef<number | undefined>(undefined);


  useEffect(() => {
    const info = detectInAppBrowser();
    if (!info.isInAppBrowser) return;


    // "Continue anyway" is remembered — the raven never nags twice.
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* localStorage blocked — show the gate */
    }


    setEnv(info);
    setLinks(buildEscapeLinks(info.platform));


    const showTimer = window.setTimeout(() => setVisible(true), GATE_SHOW_DELAY);


    // The silent escape: hand the page to a real browser without
    // the visitor even tapping. If the device/browser refuses, the
    // proclamation above simply stays on screen.
    const launchTimer = window.setTimeout(() => {
      if (!AUTO_LAUNCH_EXTERNAL || attemptedRef.current) return;
      attemptedRef.current = true;
      if (info.platform === 'android') {
        const l = buildEscapeLinks('android');
        if (l.defaultBrowser) window.location.href = l.defaultBrowser;
      } else if (info.platform === 'ios') {
        const l = buildEscapeLinks('ios');
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        frame.src = l.chrome; // opens Chrome if installed; silent no-op otherwise
        document.body.appendChild(frame);
        window.setTimeout(() => frame.remove(), 3000);
      }
    }, LAUNCH_DELAY);


    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(launchTimer);
    };
  }, []);


  // If the visitor was carried away to a real browser and later
  // returns to the app, fold the gate quietly — the escape worked.
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && attemptedRef.current) {
        setVisible(false);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);


  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older WebViews deny the async clipboard API — fall back.
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing more we can do */
      }
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2400);
  };


  const dismissForever = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* fine */
    }
    setVisible(false);
  };


  if (!visible || !env || !links) return null;


  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-label="Open this page in a real browser"
    >
      {/* ---------- backdrop: frosted night over the realm ---------- */}
      <div className="gate-fade absolute inset-0 bg-ink/90 backdrop-blur-[3px]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_36%,rgba(23,104,110,0.24),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />


      {/* ---------- the proclamation ---------- */}
      <div className="gate-card corner-frame relative w-full max-w-lg border border-iron/70 bg-ink-2/95 px-6 py-9 text-center sm:px-10">
        <span className="corner tl" aria-hidden="true" />
        <span className="corner tr" aria-hidden="true" />
        <span className="corner bl" aria-hidden="true" />
        <span className="corner br" aria-hidden="true" />


        {/* raven sigil */}
        <div
          className="gate-sigil mx-auto mb-5 flex h-16 w-16 rotate-45 items-center justify-center border border-crimson-2/60 bg-ink/80"
          aria-hidden="true"
        >
          <Bird className="h-7 w-7 -rotate-45 text-mint" />
        </div>


        <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.42em] text-[#5bc9d6]">
          A Raven Brings Word
        </p>


        <h2 className="font-got mt-3 text-2xl tracking-wider text-white sm:text-3xl">
          Open The Gates
        </h2>


        <p className="font-garamond mx-auto mt-4 max-w-sm text-base leading-relaxed text-bone sm:text-lg">
          {env.appName ? (
            <>
              You are viewing the realm inside <strong className="text-white">{env.appName}&rsquo;s</strong>{' '}
              built-in browser.
            </>
          ) : (
            <>You are viewing the realm inside an in-app browser.</>
          )}{' '}
          These narrow windows often muffle the realm&rsquo;s banners and enchantments — unfurl this
          scroll in a true browser for the full experience.
        </p>


        {/* ---------- escape routes ---------- */}
        <div className="mt-7 grid gap-3">
          <a className="btn w-full" href={links.chrome}>
            <span className="btn__label">
              <span data-text="Open in Chrome">Open in Chrome</span>
            </span>
            <Globe className="btn__icon" aria-hidden="true" />
          </a>


          <a className="btn btn--secondary w-full" href={links.firefox}>
            <span className="btn__label">
              <span data-text="Open in Firefox">Open in Firefox</span>
            </span>
            <Compass className="btn__icon" aria-hidden="true" />
          </a>


          <button type="button" className="gate-ghost w-full" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="gate-ghost-icon" aria-hidden="true" />
                Link Copied — Paste It in Your Browser
              </>
            ) : (
              <>
                <Copy className="gate-ghost-icon" aria-hidden="true" />
                Copy the Scroll&rsquo;s Link
              </>
            )}
          </button>
        </div>


        <p className="mt-4 flex items-center justify-center gap-1.5 font-cinzel text-[10px] uppercase tracking-[0.24em] text-ash">
          <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
          {env.platform === 'ios'
            ? 'No Chrome or Firefox? Copy the link and paste it into Safari'
            : 'Hands the scroll to whichever true browser your device carries'}
        </p>


        {/* ---------- the merciful option ---------- */}
        <div className="mt-6 border-t border-iron/40 pt-4">
          <button
            type="button"
            onClick={dismissForever}
            className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-bone-dim transition-colors duration-300 hover:text-mint"
          >
            Continue in This Browser Anyway
          </button>
        </div>
      </div>
    </div>
  );
};


export default InAppBrowserGate;
