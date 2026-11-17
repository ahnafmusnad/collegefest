import React from 'react';
import { PageType } from '../types';
import { MapPin, Mail, Globe, CalendarDays, MapPinned, Ticket, Crown } from 'lucide-react';
import { SocialGlyph } from './ui/Glyphs';
import { SOCIAL_LINKS, FOUR_HOUSES, FEST_METADATA } from '../data/festData';


/* Small round social chip — hover rides the theme tokens (gold-2 /
   crimson-2) so it re-tints itself when the golden lamp is lit. */
const FooterSocial: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    title={label}
    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-iron/60 bg-ink-2/70 text-bone-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-2/70 hover:text-gold-2 hover:shadow-[0_0_14px_-4px_rgba(216,222,217,0.55)]"
  >
    {children}
  </a>
);


interface FooterProps {
  onNavigate: (page: PageType) => void;
}


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


      {/* ---- Castle battlement rim along the very top edge ---- */}
      <div className="footer-battlement absolute top-0 left-0 right-0" aria-hidden="true" />


      {/* ---- Valyrian steel divider: hairlines meeting a center gem ---- */}
      <div className="absolute top-[14px] left-0 right-0" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="relative mx-auto -mt-[5px] flex w-fit items-center justify-center">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="mx-2 h-2.5 w-2.5 rotate-45 border border-gold/60 bg-ink-2" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </div>


      {/* faint ambient glow (class-based so the gold theme re-tints it) */}
      <div
        className="footer-glow pointer-events-none absolute -top-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
      />


      {/* ghost watermarks */}
      <span
        className="pointer-events-none absolute -right-6 bottom-6 select-none font-cinzel-dec text-[11rem] font-black leading-none text-white/[0.025]"
        aria-hidden="true"
      >
        1869
      </span>
      <img
        src="/images/college-crest.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-10 w-48 select-none opacity-[0.04] grayscale"
      />


      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* ---- Royal Proclamation strip: date ♦ venue ♦ passes ---- */}
        <div className="mb-14 flex flex-col items-center justify-center gap-4 border-y border-iron/40 py-5 text-center sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2 font-garamond text-sm italic text-bone">
            <CalendarDays className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            December 18–19, 2026
          </span>
          <span className="hidden h-1 w-1 rotate-45 bg-gold/70 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 font-garamond text-sm italic text-bone">
            <MapPinned className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            Chittagong College Heritage Campus, Chawkbazar
          </span>
          <span className="hidden h-1 w-1 rotate-45 bg-gold/70 sm:block" aria-hidden="true" />
          <a
            href={FEST_METADATA.tickifyLink}
            target="_blank"
            rel="noreferrer"
            className="group/pass inline-flex items-center gap-2 font-garamond text-sm italic text-gold-2 transition-colors duration-300 hover:text-white"
          >
            <Ticket className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-hover/pass:-rotate-12" aria-hidden="true" />
            Passes live on Tickify
            <span className="h-px w-0 bg-gold-2 transition-all duration-300 group-hover/pass:w-6" aria-hidden="true" />
          </a>
        </div>


        {/* ---- Main Footer Grid ---- */}
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">


          {/* Fest Proclamation / brand */}
          <div className="space-y-4 lg:col-span-4 lg:pr-8">
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
                <span className="block font-got text-lg md:text-xl text-white tracking-wide">
                  CARNAVAL
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
            {/* the Carnaval's own ravens — Facebook & Instagram */}
            <div className="pt-1">
              <p className="mb-2 font-cinzel text-[9px] uppercase tracking-[0.28em] text-ash">
                Follow the Carnaval
              </p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.filter((s) => s.url !== '#').map((s) => (
                  <FooterSocial key={s.name} href={s.url} label={`Carnaval on ${s.name}`}>
                    <SocialGlyph icon={s.icon} className="h-3.5 w-3.5" />
                  </FooterSocial>
                ))}
              </div>
            </div>
          </div>


          {/* Quick Realms */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
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


          {/* The Four Great Houses — sigils & mottos */}
          <div className="lg:col-span-3">
            <FooterHeading>The Four Great Houses</FooterHeading>
            <ul className="space-y-1.5">
              {FOUR_HOUSES.map((h) => (
                <li key={h.id}>
                  <button
                    onClick={() => onNavigate('clubs')}
                    className="group/house flex w-full items-center gap-3 border border-transparent px-2 py-1.5 text-left transition-all duration-300 hover:border-iron/60 hover:bg-ink-2/70"
                  >
                    <img
                      src={h.logo}
                      alt={`${h.houseName} sigil`}
                      className="h-7 w-7 shrink-0 rounded-full border border-iron/60 object-contain transition-transform duration-300 group-hover/house:scale-110"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-cinzel text-[11px] font-bold uppercase tracking-[0.14em] text-bone transition-colors duration-300 group-hover/house:text-gold-2">
                        {h.houseName}
                      </span>
                      <span className="block truncate font-garamond text-[11px] italic text-ash">
                        &ldquo;{h.motto}&rdquo;
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-2 font-garamond text-[11px] italic leading-relaxed text-ash">
              Four banners, one Citadel — pledge your allegiance at the Sorting Ceremony.
            </p>
          </div>


          {/* Contact Treasury */}
          <div className="lg:col-span-3">
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
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chittagong+College,+College+Road,+Chattogram"
                target="_blank"
                rel="noreferrer"
                className="group/map inline-flex items-center gap-2 border border-iron/50 bg-ink-2/60 px-3 py-2 text-gold-2 transition-colors duration-300 hover:border-crimson-2/60 hover:bg-ink-3/60"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/map:-translate-y-0.5" />
                <span>Find the Red Citadel on the Map</span>
              </a>
            </div>
          </div>
        </div>


        {/* ---- Crown sigil divider ---- */}
        <div className="mb-8 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-iron/80" />
          <Crown className="h-3.5 w-3.5 text-gold/70" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-iron/80" />
        </div>


        {/* ---- Bottom Copyright ---- */}
        <div className="text-center">
          <p className="font-cinzel text-[11px] tracking-[0.18em] text-ash uppercase">
            &copy; 2026 Ahnaf Abrar Musnad. All rights reserved.
          </p>
          {/* ---- Forged-by credit: the smith behind the realm ---- */}
          <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-4">
            <span className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-ash/80">
              Realm forged by <span className="text-bone-dim">Musnad</span>
            </span>
            <span className="hidden h-3 w-px bg-iron/60 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <FooterSocial href="https://muzie-dev.vercel.app" label="Musnad — portfolio">
                <Globe className="h-3.5 w-3.5" />
              </FooterSocial>
              <FooterSocial href="https://www.instagram.com/_.ahnaf_abrar._/" label="Ahnaf on Instagram">
                <SocialGlyph icon="Instagram" className="h-3.5 w-3.5" />
              </FooterSocial>
              <FooterSocial href="https://www.facebook.com/profile.php?id=61595154770049" label="Ahnaf on Facebook">
                <SocialGlyph icon="Facebook" className="h-3.5 w-3.5" />
              </FooterSocial>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
