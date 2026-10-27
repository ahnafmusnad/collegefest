import React, { useEffect } from 'react';
import { X, Globe, Award, Users, CalendarDays } from 'lucide-react';
import { ClubHouse, PageType } from '../types';
import { SocialGlyph } from './ui/Glyphs';
import Button from './ui/Button';
interface HouseLoreModalProps {
  house: ClubHouse | null;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
}
/**
 * THE HOUSE ARCHIVE — the full chronicle of a house, opened from the
 * parchment cards on the landing page. Same corner-framed shell as the
 * Sorting Trial, dismissed from the diamond close at the top right.
 */
export const HouseLoreModal: React.FC<HouseLoreModalProps> = ({ house, onClose, onNavigate }) => {
  useEffect(() => {
    if (!house) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [house, onClose]);
  if (!house) return null;
  const travel = () => {
    onClose();
    onNavigate('clubs');
  };
  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${house.houseName} — the full chronicle`}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4 py-10">
        <div
          className="corner-frame relative w-full max-w-xl border border-[#5bc9d6]/40 bg-ink-2/97 px-6 py-8 sm:px-9"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="corner tl" aria-hidden="true" />
          <span className="corner tr" aria-hidden="true" />
          <span className="corner bl" aria-hidden="true" />
          <span className="corner br" aria-hidden="true" />
          {/* diamond close — top right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the chronicle"
            className="absolute right-3 top-3 flex h-9 w-9 rotate-45 items-center justify-center border border-iron/70 bg-ink/80 text-bone-dim transition-all duration-300 hover:border-crimson-2/70 hover:text-crimson-2"
          >
            <X className="h-4 w-4 -rotate-45" />
          </button>
          {/* crest + names */}
          <div className="flex items-center gap-4 pr-10">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-iron bg-white/90 p-1.5">
              <img src={house.logo} alt={`${house.name} crest`} className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8ce8f2]">
                {house.houseName} &middot; {house.sigil}
              </p>
              <h2 className="mt-1 font-cinzel-dec text-xl font-black leading-tight text-white sm:text-2xl">
                {house.name.split('(')[0]}
              </h2>
              <p className="mt-0.5 font-cinzel text-[11px] italic text-gold-2/90">
                House Words: &ldquo;{house.motto}&rdquo;
              </p>
            </div>
          </div>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-iron/70 to-transparent" />
          {/* the full chronicle — no clamping here */}
          <p className="font-garamond text-[15px] leading-relaxed text-bone sm:text-base">
            {house.lore}
          </p>
          {/* vitals */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="border border-iron/50 bg-ink/60 px-2 py-2.5 text-center">
              <CalendarDays className="mx-auto h-3.5 w-3.5 text-[#5bc9d6]" />
              <p className="mt-1 font-cinzel text-sm font-bold text-white">{house.founded}</p>
              <p className="font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">Founded</p>
            </div>
            <div className="border border-iron/50 bg-ink/60 px-2 py-2.5 text-center">
              <Users className="mx-auto h-3.5 w-3.5 text-[#5bc9d6]" />
              <p className="mt-1 font-cinzel text-sm font-bold text-white">
                {house.memberCount > 0 ? `${house.memberCount}+` : '—'}
              </p>
              <p className="font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">Members</p>
            </div>
            <div className="border border-iron/50 bg-ink/60 px-2 py-2.5 text-center">
              <Award className="mx-auto h-3.5 w-3.5 text-[#5bc9d6]" />
              <p className="mt-1 font-cinzel text-sm font-bold text-gold-2">{house.trophies}</p>
              <p className="font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">Trophies Won</p>
            </div>
          </div>
          {/* gates out of the archive */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {house.links.facebook && (
              <a
                href={house.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-iron/60 bg-ink/70 px-3.5 py-2 font-cinzel text-[10px] font-semibold uppercase tracking-[0.18em] text-bone-dim transition-colors duration-300 hover:border-[#5bc9d6]/70 hover:text-[#9fe0d4]"
              >
                <SocialGlyph icon="Facebook" className="h-3.5 w-3.5" />
                Visit Their Gate
              </a>
            )}
            {house.links.website && (
              <a
                href={house.links.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-iron/60 bg-ink/70 px-3.5 py-2 font-cinzel text-[10px] font-semibold uppercase tracking-[0.18em] text-bone-dim transition-colors duration-300 hover:border-[#5bc9d6]/70 hover:text-[#9fe0d4]"
              >
                <Globe className="h-3.5 w-3.5" />
                Official Website
              </a>
            )}
          </div>
          <div className="mt-6 border-t border-iron/40 pt-5">
            <Button className="w-full" onClick={travel}>
              Enter the Sanctuary of Houses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HouseLoreModal;