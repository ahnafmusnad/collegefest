import React, { useEffect } from 'react';
import { X, MapPin, Clock, Users, ShieldAlert, ScrollText, Gem } from 'lucide-react';
import { Segment } from '../types';
import { FOUR_HOUSES, FEST_METADATA } from '../data/festData';
import Button from './ui/Button';

interface SegmentRulesModalProps {
  segment: Segment | null;
  onClose: () => void;
  onRegisterTickify: (segmentName: string) => void;
}

/* One quick-fact cell of the decree header */
const FactCell: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2.5 border border-[#5bc9d6]/20 bg-ink/60 px-3 py-2.5 backdrop-blur-sm">
    <span className="flex h-7 w-7 shrink-0 rotate-45 items-center justify-center border border-[#5bc9d6]/40 bg-ink-2/80">
      <span className="-rotate-45 text-[#5bc9d6]">{icon}</span>
    </span>
    <div className="min-w-0">
      <div className="text-[8.5px] font-cinzel uppercase tracking-[0.22em] text-ash">{label}</div>
      <div className="truncate text-[12px] font-bold text-gold-2 sm:text-[13px]">{value}</div>
    </div>
  </div>
);

/**
 * SEGMENT RULES MODAL — "The Royal Decree".
 * Carved teal-stone slab (stone-teal.webp), diamond sigil close button,
 * and — critically — the OUTER layer owns the scroll, so on phones the
 * decree always starts at the top and scrolls to its seal. Nothing is
 * ever clipped off-screen.
 */
export const SegmentRulesModal: React.FC<SegmentRulesModalProps> = ({
  segment,
  onClose,
  onRegisterTickify
}) => {
  /* esc-to-close + body scroll lock while the decree is open */
  useEffect(() => {
    if (!segment) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [segment, onClose]);

  if (!segment) return null;

  const house = FOUR_HOUSES.find(h => h.id === segment.houseId);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${segment.title} rules`}
    >
      {/* min-h-full + m-auto = centred when short, scrollable-from-top when tall */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="rules-scroll relative m-auto w-full max-w-2xl p-5 text-bone sm:p-8 md:p-9"
          onClick={(e) => e.stopPropagation()}
        >
          {/* corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-2/70" aria-hidden="true" />

          {/* top crest */}
          <div className="pointer-events-none absolute -top-3.5 left-1/2 hidden -translate-x-1/2 sm:block" aria-hidden="true">
            <span className="flex h-7 w-7 rotate-45 items-center justify-center border border-[#5bc9d6]/60 bg-ink-2 shadow-[0_0_16px_rgba(91,201,214,0.45)]">
              <Gem className="h-3 w-3 -rotate-45 text-[#5bc9d6]" />
            </span>
          </div>

          {/* diamond sigil close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close decree"
            className="sigil-close absolute top-4 right-4 z-20 flex h-9 w-9 rotate-45 items-center justify-center border border-[#5bc9d6]/50 bg-ink-2/85 text-bone-dim hover:text-white sm:top-5 sm:right-5"
          >
            <X className="h-4 w-4 -rotate-45" />
          </button>

          {/* ── Decree header ─────────────────────────────── */}
          <div className="pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-[#5bc9d6]/45 bg-ink/70 px-2.5 py-1 font-cinzel text-[9px] font-bold uppercase tracking-[0.24em] text-[#8ce8f2] sm:text-[10px]">
                {segment.category}
              </span>
              {house && (
                <span className="flex items-center gap-1.5 border border-iron/70 bg-ink/70 px-2.5 py-1 font-cinzel text-[9px] font-bold uppercase tracking-[0.2em] text-bone-dim sm:text-[10px]">
                  <span className="h-1 w-1 rotate-45 bg-[#5bc9d6]" aria-hidden="true" />
                  Host: {house.houseName}
                </span>
              )}
              <span className="border border-iron/70 bg-ink/70 px-2.5 py-1 font-cinzel text-[9px] font-bold uppercase tracking-[0.2em] text-bone-dim sm:text-[10px]">
                Entry {segment.entryFee}
              </span>
            </div>

            <h2 className="mt-3 font-cinzel text-xl font-bold tracking-wide text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-2xl md:text-[27px]">
              {segment.title}
            </h2>
            <p className="mt-1.5 flex items-center gap-2 font-garamond text-sm italic text-[#9fd8d2] sm:text-[15px]">
              <ScrollText className="h-3.5 w-3.5 shrink-0 text-[#5bc9d6]" />
              The Citadel Proclamation: &ldquo;{segment.gotTitle}&rdquo;
            </p>
          </div>

          {/* ── Quick facts ───────────────────────────────── */}
          <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
            <FactCell icon={<Users className="h-3.5 w-3.5" />} label="Team Size" value={segment.teamSize} />
            <FactCell icon={<MapPin className="h-3.5 w-3.5" />} label="Citadel Venue" value={segment.venue} />
            <FactCell icon={<Clock className="h-3.5 w-3.5" />} label="Schedule" value={segment.time} />
          </div>

          {/* ── Description ───────────────────────────────── */}
          <p className="mt-5 border-l-2 border-[#5bc9d6]/40 pl-4 text-[13px] leading-relaxed text-bone/90 sm:text-sm">
            {segment.description}
          </p>

          {/* ── Tournament Decrees ────────────────────────── */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-[#5bc9d6]" />
              <h3 className="font-cinzel text-[11px] font-bold uppercase tracking-[0.26em] text-gold-2 sm:text-xs">
                Tournament Decrees &amp; Rules of Engagement
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-[#5bc9d6]/40 to-transparent" aria-hidden="true" />
            </div>
            <ul className="space-y-2">
              {segment.rules.map((rule, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 border border-iron/40 bg-ink/55 px-3.5 py-2.5 text-xs leading-relaxed text-bone-dim backdrop-blur-sm transition-colors duration-300 hover:border-[#5bc9d6]/40 hover:text-bone sm:text-[13px]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5bc9d6]/80" aria-hidden="true" />
                  <span>
                    <span className="font-cinzel font-bold text-gold-2">Decree {idx + 1}.</span>{' '}
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Judging criteria ──────────────────────────── */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <Gem className="h-4 w-4 shrink-0 text-[#5bc9d6]" />
              <h3 className="font-cinzel text-[11px] font-bold uppercase tracking-[0.26em] text-gold-2 sm:text-xs">
                Judging Criteria &amp; Scoring
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-[#5bc9d6]/40 to-transparent" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap gap-2">
              {segment.judgingCriteria.map((crit, idx) => (
                <span
                  key={idx}
                  className="border border-[#5bc9d6]/35 bg-ink/60 px-3 py-1.5 text-[11px] font-semibold text-[#bfe9e4] transition-all duration-300 hover:border-[#5bc9d6]/70 hover:shadow-[0_0_14px_-4px_rgba(91,201,214,0.6)] sm:text-xs"
                >
                  {crit}
                </span>
              ))}
            </div>
          </div>

          {/* ── Actions ───────────────────────────────────── */}
          <div className="mt-7 flex flex-col gap-3 border-t border-[#5bc9d6]/25 pt-5 sm:flex-row sm:items-center">
            <Button
              className="w-full flex-1"
              onClick={() => {
                onRegisterTickify(segment.title);
              }}
            >
              {`REGISTER VIA TICKIFY (${segment.entryFee})`}
            </Button>

            <Button
              variant="glass"
              size="sm"
              className="w-full sm:w-auto"
              href={FEST_METADATA.tickifyLink}
              external
            >
              Tickify Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
