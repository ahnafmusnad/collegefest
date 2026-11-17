import React, { useEffect, useRef, useState } from 'react';
import { Bird, Check, Compass, Copy, ExternalLink, Globe } from 'lucide-react';
import {
  buildEscapeLinks,
  detectInAppBrowser,
  type EscapeLinks,
  type InAppBrowserInfo,
} from '../utils/browserGate';
const GATE_SHOW_DELAY = 1400; // let the "Winter is Coming" loader play first
/**
 * THE GATES — Instagram / Facebook / TikTok etc. open shared links inside
 * their own stripped-down WebViews, which break the realm's effects.
 * The gate is therefore a HARD wall in those browsers:
 *   • it never silently navigates away (no intent:// or hidden iframes —
 *     those side-effects are exactly what mangled the WebView page),
 *   • it never folds itself away when the visitor leaves and returns,
 *   • there is no "continue anyway" bypass to remember.
 * If the visitor escapes to a real browser and later comes back to the
 * app, the gates are still standing and the broken site stays covered.
 */
export const InAppBrowserGate: React.FC = () => {
  const [env, setEnv] = useState<InAppBrowserInfo | null>(null);
  const [links, setLinks] = useState<EscapeLinks | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const info = detectInAppBrowser();
    if (!info.isInAppBrowser) return;
    setEnv(info);
    setLinks(buildEscapeLinks(info.platform));
    const showTimer = window.setTimeout(() => setVisible(true), GATE_SHOW_DELAY);
    return () => window.clearTimeout(showTimer);
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
          These narrow windows muffle the realm&rsquo;s banners and enchantments — the realm keeps
          its gates shut here. Unfold this scroll in a true browser below.
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
            : 'No Chrome or Firefox? Copy the link and open it in any browser'}
        </p>
      </div>
    </div>
  );
};
export default InAppBrowserGate;
