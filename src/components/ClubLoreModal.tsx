import React, { useEffect } from 'react';
import { X, Crown, Trophy, CalendarDays, Users, ScrollText, Globe, Landmark } from 'lucide-react';
import { ClubHouse } from '../types';
import { HOUSE_DETAILS } from '../data/houseDetails';
import Button from './ui/Button';
import ResponsiveImg from './ui/ResponsiveImg';

interface ClubLoreModalProps {
  house: ClubHouse | null;
  onClose: () => void;
  /** Jump to the Clubs page with this house's chronicle open. */
  onEnterChronicle: (houseId: string) => void;
  onPledgeHouse: (house: ClubHouse) => void;
}

/**
 * THE HOUSE ARCHIVE — the full lore of a house, unrolled in its own chamber.
 * Mirrors the Iron Raven's Trial shell: carved teal-stone slab, corner
 * brackets, and the rotated-diamond sigil close button at the top right.
 */
export const ClubLoreModal: React.FC<ClubLoreModalProps> = ({
  house,
  onClose,
  onEnterChronicle,
  onPledgeHouse,
}) => {
  /* esc-to-close + body scroll lock */
  useEffect(() => {
    if (!house) return;
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
  }, [house, onClose]);

  if (!house) return null;

  const details = HOUSE_DETAILS[house.id];
  const fullName = house.name.split('(')[0].trim();
  const abbr = (house.name.match(/\(([^)]+)\)/)?.[1] ?? '').trim();

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`The lore of ${house.name}`}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="trial-stone relative m-auto w-full max-w-2xl p-5 text-bone sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-2/70" aria-hidden="true" />

          {/* diamond sigil close button — same as the sorting trial */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the house archive"
            className="sigil-close absolute top-4 right-4 z-20 flex h-9 w-9 rotate-45 items-center justify-center border border-[#5bc9d6]/50 bg-ink-2/85 text-bone-dim hover:text-white"
          >
            <X className="h-4 w-4 -rotate-45" />
          </button>

          <div className="animate-fadeIn">
            {/* ── header: seal + names ─────────────────────── */}
            <div className="flex flex-col items-center gap-4 pr-8 text-center sm:flex-row sm:items-center sm:text-left">
              <div className="relative h-20 w-20 shrink-0">
                <span className="absolute inset-0 rotate-45 border border-[#5bc9d6]/50" aria-hidden="true" />
                <div className="absolute inset-[7px] flex items-center justify-center overflow-hidden rounded-full border-2 border-gold-2/60 bg-white p-1.5">
                  <ResponsiveImg
                    src={house.logo}
                    alt={`${house.shortName} logo`}
                    sizes="80px"
                    widths={[480, 800]}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-cinzel text-[10px] uppercase tracking-[0.32em] text-[#9fd8d2]">
                  {house.houseName} · The {house.sigil}
                </p>
                <h2 className="mt-1.5 font-cinzel text-xl font-extrabold leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] sm:text-2xl">
                  {fullName}
                  {abbr && <span className="text-[#5bc9d6]"> ({abbr})</span>}
                </h2>
                <p className="mt-1.5 font-garamond text-base italic text-gold-2/90">
                  &ldquo;{house.motto}&rdquo;
                </p>
              </div>
            </div>

            {/* ── the full chronicle ───────────────────────── */}
            <div className="mt-6 border border-[#5bc9d6]/25 bg-ink/60 px-4 py-4 backdrop-blur-sm sm:px-5">
              <div className="mb-2 flex items-center gap-2 font-cinzel text-[11px] font-bold uppercase tracking-[0.26em] text-gold-2">
                <ScrollText className="h-3.5 w-3.5 shrink-0 text-[#5bc9d6]" />
                The Chronicle
              </div>
              <p className="text-[13px] leading-relaxed text-bone sm:text-sm">{house.lore}</p>
              {details && (
                <p className="mt-3 text-[13px] leading-relaxed text-bone-dim sm:text-sm">
                  {details.foundingPurpose}
                </p>
              )}
            </div>

            {/* ── vital stones ─────────────────────────────── */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { icon: CalendarDays, label: 'Founded', value: house.founded !== '—' ? house.founded : 'Ancient' },
                { icon: Trophy, label: 'Trophies Won', value: house.trophiesWon },
                { icon: Users, label: 'Sworn Members', value: details?.membersLabel ?? (house.memberCount > 0 ? `${house.memberCount}+` : 'Many') },
                { icon: Crown, label: 'House', value: house.houseName.replace('House ', '') },
              ].map((v) => (
                <div key={v.label} className="border border-iron/60 bg-ink-2/60 px-2 py-2.5 text-center">
                  <v.icon className="mx-auto h-3.5 w-3.5 text-[#5bc9d6]" />
                  <div className="mt-1.5 font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">{v.label}</div>
                  <div className="mt-0.5 font-cinzel text-[12px] font-bold text-[#e7e3d8]">{v.value}</div>
                </div>
              ))}
            </div>

            {/* ── laurels ──────────────────────────────────── */}
            <div className="mt-4">
              <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.3em] text-bone-dim">
                Laurels Carried Home
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {house.achievements.slice(0, 4).map((ach) => (
                  <li key={ach} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-bone-dim sm:text-[13px]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5bc9d6]/70" aria-hidden="true" />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── gates of the house (social links) ────────── */}
            <div className="mt-5">
              <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.3em] text-bone-dim">
                Visit Their Gates
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {house.links.facebook && (
                  <a
                    href={house.links.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 border border-iron/70 bg-ink-2/70 px-3.5 py-2 font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-[#5bc9d6]/70 hover:text-[#8ce8f2]"
                  >
                    <Landmark className="h-3.5 w-3.5 text-[#5bc9d6] transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Facebook Gate
                  </a>
                )}
                {house.links.website && (
                  <a
                    href={house.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 border border-iron/70 bg-ink-2/70 px-3.5 py-2 font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] text-bone transition-all duration-300 hover:border-[#5bc9d6]/70 hover:text-[#8ce8f2]"
                  >
                    <Globe className="h-3.5 w-3.5 text-[#5bc9d6] transition-transform duration-300 group-hover:rotate-45" />
                    Official Website
                  </a>
                )}
                {!house.links.facebook && !house.links.website && (
                  <p className="font-garamond text-[13px] italic text-ash">
                    The ravens have not yet returned with this house&rsquo;s gates.
                  </p>
                )}
              </div>
            </div>

            {/* ── actions ──────────────────────────────────── */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1"
                onClick={() => {
                  onEnterChronicle(house.id);
                  onClose();
                }}
              >
                Enter the House Chronicle
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="flex-1"
                onClick={() => {
                  onPledgeHouse(house);
                  onClose();
                }}
              >
                Pledge Allegiance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubLoreModal;
