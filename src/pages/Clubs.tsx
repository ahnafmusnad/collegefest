import React, { useState } from 'react';
import { FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { ClubHouse, PageType } from '../types';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import GemDivider from '../components/ui/GemDivider';
import { 
  Crown,
  Award,
  Check,
  Camera
} from 'lucide-react';

/* Scattered parchment prints — the houses caught mid-deed. */
const CHRONICLE_PRINTS = [
  { img: '/images/gallery/ccds-debate.webp', title: 'The War of Words', tag: 'CCDS · National Debate Fest', house: 'House Lannister', tilt: '-rotate-2' },
  { img: '/images/gallery/ccpac-stargaze.webp', title: 'Vigil Under the Stars', tag: 'CCPAC · Observation Nights', house: 'House Stark', tilt: 'rotate-1' },
  { img: '/images/gallery/muses-literary.webp', title: 'Keepers of the Word', tag: 'The Muses · Literary Evenings', house: 'House Targaryen', tilt: '-rotate-1' },
  { img: '/images/gallery/ccps-photowalk.webp', title: 'The Winter Lens', tag: 'CCPS · Campus Photo Walks', house: 'House Baratheon', tilt: 'rotate-2' },
  { img: '/images/gallery/carnaval-stage.webp', title: 'Night of the Citadel', tag: 'Carnaval · Main Stage', house: 'All Four Houses', tilt: '-rotate-[1.5deg]' },
  { img: '/images/gallery/carnaval-coronation.webp', title: 'The Crowning', tag: 'Carnaval · Prize Coronation', house: 'All Four Houses', tilt: 'rotate-[1.5deg]' },
] as const;
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

interface ClubsProps {
  onNavigate: (page: PageType) => void;
  onPledgeHouse: (house: ClubHouse) => void;
  userPledgedHouse: ClubHouse | null;
}

export const Clubs: React.FC<ClubsProps> = ({
  onPledgeHouse,
  userPledgedHouse
}) => {
  void FEST_SEGMENTS;
  const [activeHouseId, setActiveHouseId] = useState<string>(FOUR_HOUSES[0].id);
  const activeHouse = FOUR_HOUSES.find(h => h.id === activeHouseId) || FOUR_HOUSES[0];

  const handlePledge = (house: ClubHouse) => {
    onPledgeHouse(house);
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-36">
      
      {/* Page Hero */}
      <PageHero
        image="/images/four-houses-heraldry.webp"
        eyebrow="The Citadel Quadrumvirate"
        title="The Four Great Houses"
        description="Four legendary clubs anchor Chittagong College’s student body. Each house bears its own sigil, sacred motto, heroic ancestry, and fierce competitive fire."
      />

      {/* House Selector Tabs — carved stone sigil banners.
          (The old border-image nine-slice frame could render empty on
          mobile browsers without solid container-query support; these
          use plain layered backgrounds, so they always paint.) */}
      <div className="grid grid-cols-2 gap-7 md:gap-8 md:grid-cols-4">
        {FOUR_HOUSES.map((house, i) => {
          const isSelected = activeHouseId === house.id;
          const isPledged = userPledgedHouse?.id === house.id;
          return (
            <Reveal key={house.id} delay={i * 80} className="h-full">
              <div
                className={`house-sigil-card ${isSelected ? 'house-sigil-card--active' : ''}`}
              >
                {/* corner brackets */}
                <span className="pointer-events-none absolute top-1.5 left-1.5 h-3.5 w-3.5 border-t border-l border-gold-2/60" aria-hidden="true" />
                <span className="pointer-events-none absolute top-1.5 right-1.5 h-3.5 w-3.5 border-t border-r border-gold-2/60" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-3.5 w-3.5 border-b border-l border-gold-2/60" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-3.5 w-3.5 border-b border-r border-gold-2/60" aria-hidden="true" />

                <button
                  type="button"
                  onClick={() => {
                    setActiveHouseId(house.id);
                  }}
                  aria-pressed={isSelected}
                  className="group flex flex-1 flex-col gap-2.5 p-3.5 text-left sm:p-4"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-iron bg-white/90 p-1 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                      <img src={house.logo} alt={`${house.name} logo`} loading="lazy" className="h-full w-full object-contain" />
                    </div>

                    <div className="min-w-0">
                      <div className="font-cinzel text-[9px] font-semibold uppercase leading-snug text-[#9fd8d2] line-clamp-2 sm:text-[11px]">
                        {house.name.split('(')[0]}
                      </div>
                      <div className="mt-1 font-cinzel text-sm font-bold text-white transition-colors group-hover:text-[#8ce8f2] line-clamp-1">
                        {house.houseName}
                      </div>
                    </div>
                  </div>

                  <div className="font-cinzel text-[10px] italic text-bone-dim line-clamp-1 sm:text-[11px]">
                    &ldquo;{house.motto}&rdquo;
                  </div>
                </button>

                <div className="px-3 pb-3">
                  {isPledged ? (
                    <div className="flex items-center justify-center gap-1.5 border border-[#5bc9d6]/50 bg-[#17686e]/20 py-1.5 text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#8ce8f2]">
                      <Check className="w-3 h-3" />
                      Your House
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePledge(house)}
                      className="w-full border border-[#c9d2d2]/45 py-1.5 text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-[#e7e3d8] transition-colors hover:border-[#8ce8f2] hover:bg-[#8ce8f2] hover:text-ink"
                    >
                      Pledge
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ========================================================
          ACTIVE HOUSE SHOWCASE DOSSIER
      ======================================================== */}
      {/* direction="flip" (3D perspective rotateX) breaks the reveal
          observer's intersection math for tall elements on mobile
          Chrome — the dossier never became visible there. A 2D zoom
          entrance is projection-safe at any height. */}
      <Reveal direction="zoom" duration={1100}>
      <div className="house-dossier space-y-5 relative px-5 pt-9 pb-5 sm:px-7 sm:pt-10 sm:pb-6 md:px-9 md:pt-11 md:pb-7">
        {/* top roller rod + crest */}
        <div className="dossier-rod absolute top-2.5 left-6 right-6 sm:left-10 sm:right-10" aria-hidden="true" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true">
          <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-[#5bc9d6]/60 bg-ink-2 shadow-[0_0_18px_rgba(91,201,214,0.45)]">
            <Crown className="h-3.5 w-3.5 -rotate-45 text-[#8ce8f2]" />
          </span>
        </div>
        {/* corner brackets */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-5 w-5 border-t-2 border-l-2 border-gold-2/60" aria-hidden="true" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-5 w-5 border-t-2 border-r-2 border-gold-2/60" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-5 w-5 border-b-2 border-l-2 border-gold-2/60" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-5 w-5 border-b-2 border-r-2 border-gold-2/60" aria-hidden="true" />
        {/* Top House Banner */}
        <div className="border-b border-crimson/20 pb-4">
          <span className="font-cinzel text-[10px] md:text-xs font-bold text-[#5bc9d6] uppercase tracking-widest block">
            Citadel House Sigil: {activeHouse.sigil}
          </span>
          <h2 className="font-cinzel-dec text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight mt-1">
            {activeHouse.name.split('(')[0]}
          </h2>
          <div className="font-cinzel text-[13px] font-semibold text-gold-2 mt-1">
            {activeHouse.houseName}
          </div>
          <p className="font-cinzel text-[11px] md:text-xs text-gold-2/90 italic">
            House Words: "{activeHouse.motto}"
          </p>
        </div>

        {/* House Vitals — 4 across on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-3 md:grid-cols-4">
          <Reveal delay={0}>
            <div className="text-center h-full">
              <div className="text-[10px] font-cinzel text-[#5bc9d6] uppercase tracking-wider">Founded</div>
              <div className="font-cinzel text-base font-bold text-white">{activeHouse.founded}</div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="text-center h-full">
              <div className="text-[10px] font-cinzel text-[#5bc9d6] uppercase tracking-wider">Members</div>
              <div className="font-cinzel text-base font-bold text-white">{activeHouse.memberCount > 0 ? `${activeHouse.memberCount}+` : '—'}</div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="text-center h-full">
              <div className="text-[10px] font-cinzel text-[#5bc9d6] uppercase tracking-wider">Sigil</div>
              <div className="font-cinzel text-[11px] font-bold text-gold-2 leading-tight px-1">{activeHouse.sigil}</div>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="text-center h-full">
              <div className="text-[10px] font-cinzel text-[#5bc9d6] uppercase tracking-wider">Crest Points</div>
              <div className="font-mono text-base font-bold text-gold-2">{activeHouse.points}</div>
            </div>
          </Reveal>
        </div>

        {/* Historic Trophies & Laurels — two columns on desktop, stacked on mobile */}
        <div className="border-t border-crimson/20 pt-4 space-y-2.5">
          <h3 className="font-cinzel text-xs font-bold text-[#5bc9d6] uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-[#5bc9d6]" />
            Historic Trophies & Laurels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
            {activeHouse.achievements.map((ach, i) => (
              <Reveal key={i} delay={i * 90}>
              <div
                className="flex items-start gap-2.5 text-[12px] leading-snug text-bone h-full"
              >
                <Crown className="w-3.5 h-3.5 text-[#5bc9d6] shrink-0 mt-px" />
                <span>{ach}</span>
              </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* bottom roller rod */}
        <div className="dossier-rod absolute bottom-2.5 left-6 right-6 sm:left-10 sm:right-10" aria-hidden="true" />
      </div>
      </Reveal>
      {/* ========================================================
          THE LIVING CHRONICLE — the houses caught mid-deed
      ======================================================== */}
      <section className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5bc9d6]/40 bg-ink-2/80 px-3 py-1 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#8ce8f2]">
            <Camera className="h-3.5 w-3.5 text-[#5bc9d6]" />
            The Living Chronicle
          </div>
          <h2 className="mt-4 font-cinzel text-2xl font-extrabold tracking-wide text-[#dcefee] [text-shadow:0_2px_10px_rgba(0,0,0,0.7),0_0_28px_rgba(91,201,214,0.22)] sm:text-4xl">
            Deeds of the Four Houses
          </h2>
          <GemDivider className="my-4" />
          <p className="font-garamond text-sm italic leading-relaxed text-bone-dim sm:text-base">
            Moments seized across the years — podiums and starlit roofs,
            fog-bound gates and the roar of the Carnaval stage.
          </p>
        </Reveal>
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {CHRONICLE_PRINTS.map((pr, i) => (
            <Reveal key={pr.img} delay={i * 90} className="mb-7 break-inside-avoid">
              <figure
                className={`chronicle-print group relative ${pr.tilt} transition-all duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03]`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pr.img}
                    alt={pr.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                  />
                  {/* cold veil that lifts on hover */}
                  <div className="absolute inset-0 bg-[#04191c]/50 transition-opacity duration-500 group-hover:opacity-0" />
                  {/* pinned numeral seal */}
                  <span className="absolute left-2 top-2 flex h-6 w-6 rotate-45 items-center justify-center border border-[#5bc9d6]/60 bg-ink/85 shadow-[0_0_12px_rgba(91,201,214,0.35)]">
                    <span className="font-cinzel text-[10px] font-bold -rotate-45 text-[#8ce8f2]">{ROMAN[i]}</span>
                  </span>
                </div>
                <figcaption className="px-1.5 pb-1 pt-3 text-center">
                  <p className="font-cinzel text-[13px] font-bold tracking-wide text-[#e7e3d8]">
                    {pr.title}
                  </p>
                  <p className="mt-1 font-cinzel text-[8.5px] uppercase tracking-[0.2em] text-[#9e9f9f]">
                    {pr.tag}
                  </p>
                  <p className="mt-0.5 font-garamond text-[11px] italic text-[#5bc9d6]/90">
                    {pr.house}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};
