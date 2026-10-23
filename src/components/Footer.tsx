import React from 'react';
import { PageType } from '../types';
import { FOUR_HOUSES } from '../data/festData';
import { MapPin, Mail } from 'lucide-react';
interface FooterProps {
  onNavigate: (page: PageType) => void;
}
/* Official club abbreviation, e.g. "(CCPAC)" -> "CCPAC" */
const clubAbbr = (name: string): string => name.match(/\(([^)]+)\)\s*$/)?.[1] ?? name.split(' ')[0];
/* Brand glyphs drawn inline (this lucide build ships no brand icons) */
const FacebookGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V11H9v3h2.3v7h2.2z" />
  </svg>
);
const GlobeGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
  </svg>
);
/* Square icon link — diamond dot appears on hover */
const HouseIconLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    title={label}
    className="group/ico inline-flex h-8 w-8 items-center justify-center border border-iron/60 bg-ink-2/70 text-bone-dim transition-all duration-300 hover:border-[#5bc9d6]/70 hover:text-[#9fe0d4] hover:shadow-[0_0_16px_-4px_rgba(91,201,214,0.6)] hover:-translate-y-0.5"
  >
    {children}
  </a>
);
/* A single realm link — diamond marker fades in and the
   line steps toward it on hover. */
const RealmLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <li>
    <button
      onClick={onClick}
      className="group/link relative inline-flex items-center gap-0 text-left text-bone-dim transition-all duration-300 hover:text-gold-2 hover:tracking-wide"
    >
      <span
        className="mr-0 inline-block h-1 w-1 rotate-45 bg-crimson-2 opacity-0 transition-all duration-300 group-hover/link:mr-2 group-hover/link:opacity-100"
        aria-hidden="true"
      />
      {children}
    </button>
  </li>
);
/* Column heading with a forged diamond marker */
const FooterHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="mb-5 flex items-center gap-2.5 font-cinzel text-xs font-bold uppercase tracking-[0.22em] text-gold-2">
    <span className="h-1.5 w-1.5 rotate-45 bg-gold shadow-[0_0_0_3px_rgba(158,159,159,0.15)]" aria-hidden="true" />
    {children}
  </h4>
);
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-crimson/20 bg-gradient-to-b from-ink via-ink to-ink pt-16 pb-10 text-bone-dim">
      {/* ---- Valyrian steel top divider: hairlines meeting a center gem ---- */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative mx-auto -mt-[5px] flex w-fit items-center justify-center">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="mx-2 h-2.5 w-2.5 rotate-45 border border-gold/60 bg-ink-2" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </div>
      {/* faint ambient glow + watermark */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(23,104,110,0.25), transparent 70%)' }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-6 bottom-6 select-none font-cinzel-dec text-[11rem] font-black leading-none text-white/[0.025]"
        aria-hidden="true"
      >
        1869
      </span>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Main Footer Grid ---- */}
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Fest Proclamation */}
          <div className="space-y-4 md:col-span-2 lg:pr-10 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center border border-gold/50 bg-ink-2">
                <span className="absolute -top-px -left-px h-2 w-2 border-t border-l border-gold-2/70" aria-hidden="true" />
                <span className="absolute -top-px -right-px h-2 w-2 border-t border-r border-gold-2/70" aria-hidden="true" />
                <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-gold-2/70" aria-hidden="true" />
                <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-gold-2/70" aria-hidden="true" />
                <img
                  src="/images/college-crest.webp"
                  alt="Chittagong College crest"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <span className="block font-cinzel text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                  Chittagong College &bull; Est. 1869
                </span>
                <span className="block font-cinzel-dec text-xl font-black text-white">
                  CARNAVAL DA CC
                </span>
              </div>
            </div>
            <p className="max-w-sm font-sans text-xs leading-relaxed text-bone-dim">
              The grand winter convergence uniting the Four Great Houses of Chittagong College in an epic saga of science, language, debate, and the art of the lens. Winter has arrived at the Citadel.
            </p>
            <div className="flex items-start gap-2 text-xs text-bone-dim">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Chawkbazar, College Road, Chittagong-4203, Bangladesh</span>
            </div>
          </div>
          {/* Quick Realms */}
          <nav aria-label="Footer navigation">
            <FooterHeading>The Realms</FooterHeading>
            <ul className="space-y-2.5 font-sans text-xs">
              <RealmLink onClick={() => onNavigate('home')}>The Iron Throne (Home)</RealmLink>
              <RealmLink onClick={() => onNavigate('description')}>Fest Chronicle &amp; Schedule</RealmLink>
              <RealmLink onClick={() => onNavigate('clubs')}>The 4 Great Houses (Clubs)</RealmLink>
              <RealmLink onClick={() => onNavigate('segments')}>Tourneys &amp; Competitions</RealmLink>
              <RealmLink onClick={() => onNavigate('sponsorships')}>Iron Bank (Sponsorships)</RealmLink>
              <RealmLink onClick={() => onNavigate('organizers')}>Small Council (Organizers)</RealmLink>
            </ul>
          </nav>
          {/* Contact Treasury */}
          <div>
            <FooterHeading>Royal Ravens</FooterHeading>
            <div className="space-y-3 text-xs text-bone-dim">
              <p>For inquiries, partnerships or royal scrolls:</p>
              <a
                href="mailto:carnavaldactgclg@gmail.com"
                className="group/raven inline-flex items-center gap-2 border border-iron/50 bg-ink-2/60 px-3 py-2 text-gold-2 transition-colors duration-300 hover:border-crimson-2/60 hover:bg-ink-3/60"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/raven:-translate-y-0.5 group-hover/raven:translate-x-0.5" />
                <span className="break-all">carnavaldactgclg@gmail.com</span>
              </a>
              <p className="text-[11px] text-ash">
                Sponsorship Wing: +880 1776-810739
              </p>
            </div>
          </div>
        </div>

        {/* ---- Banners of the Four Great Houses ---- */}
        <div className="mb-12 border border-iron/40 bg-ink-2/50 px-5 py-6 sm:px-7">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-iron/70" />
            <h4 className="flex items-center gap-2.5 font-cinzel text-xs font-bold uppercase tracking-[0.26em] text-gold-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-[#5bc9d6] shadow-[0_0_8px_rgba(91,201,214,0.8)]" aria-hidden="true" />
              The Four Great Houses
              <span className="h-1.5 w-1.5 rotate-45 bg-[#5bc9d6] shadow-[0_0_8px_rgba(91,201,214,0.8)]" aria-hidden="true" />
            </h4>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-iron/70" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_HOUSES.map((house) => (
              <div
                key={house.id}
                className="group/house relative flex items-center gap-3 border border-iron/40 bg-ink/60 px-3.5 py-3 transition-all duration-300 hover:border-[#5bc9d6]/50 hover:bg-ink-3/40"
              >
                {/* corner ticks */}
                <span className="pointer-events-none absolute -top-px -left-px h-2 w-2 border-t border-l border-gold-2/50" aria-hidden="true" />
                <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-gold-2/50" aria-hidden="true" />

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-iron bg-white/90 p-1 transition-transform duration-300 group-hover/house:scale-105">
                  <img src={house.logo} alt={`${clubAbbr(house.name)} crest`} loading="lazy" className="h-full w-full object-contain" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-cinzel text-[11px] font-bold tracking-wide text-bone transition-colors group-hover/house:text-[#9fe0d4]">
                    {clubAbbr(house.name)}
                  </p>
                  <p className="truncate font-cinzel text-[9px] uppercase tracking-[0.18em] text-ash">
                    {house.houseName}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {house.links.facebook ? (
                    <HouseIconLink href={house.links.facebook} label={`${clubAbbr(house.name)} on Facebook`}>
                      <FacebookGlyph />
                    </HouseIconLink>
                  ) : null}
                  {house.links.website ? (
                    <HouseIconLink href={house.links.website} label={`${clubAbbr(house.name)} official website`}>
                      <GlobeGlyph />
                    </HouseIconLink>
                  ) : null}
                  {!house.links.facebook && !house.links.website && (
                    <span className="font-cinzel text-[8px] uppercase tracking-[0.14em] text-ash/80">
                      Links&nbsp;soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-ash">
            Follow the banners — chronicles, tourney notices &amp; house glory
          </p>
        </div>

        {/* ---- Bottom Copyright ---- */}
        <div className="border-t border-ink-2 pt-7 text-center">
          <p className="font-cinzel text-[11px] tracking-[0.18em] text-ash uppercase">
            &copy; 2026 Ahnaf Abrar Musnad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
