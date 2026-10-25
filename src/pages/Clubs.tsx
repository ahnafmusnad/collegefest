import React, { useState } from 'react';
import { FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { ClubHouse, PageType } from '../types';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import { TiltCard } from '../components/TiltCard';
import Button from '../components/ui/Button';
import { 
  Crown,
  Award,
  Swords, 
  Check
} from 'lucide-react';

interface ClubsProps {
  onNavigate: (page: PageType) => void;
  onPledgeHouse: (house: ClubHouse) => void;
  userPledgedHouse: ClubHouse | null;
}

export const Clubs: React.FC<ClubsProps> = ({
  onNavigate,
  onPledgeHouse,
  userPledgedHouse
}) => {
  const [activeHouseId, setActiveHouseId] = useState<string>(FOUR_HOUSES[0].id);

  const activeHouse = FOUR_HOUSES.find(h => h.id === activeHouseId) || FOUR_HOUSES[0];
  const houseSegments = FEST_SEGMENTS.filter(s => s.houseId === activeHouse.id);

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

        {/* House Segments Showcase */}
        <div className="pt-3 border-t border-crimson/20 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-[#5bc9d6]" />
              Tournament Segments Commanded by {activeHouse.houseName}
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('segments')}
            >
              View All Tourneys
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
            {houseSegments.map((seg, i) => (
              <Reveal key={seg.id} delay={i * 90} className="h-full">
              <TiltCard
                onClick={() => {
                  onNavigate('segments');
                }}
                className="p-3 pl-4 border-l-2 border-iron/70 hover:border-[#5bc9d6] transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-cinzel text-[#5bc9d6]">{seg.category}</span>
                    <span className="font-bold text-gold-2">{seg.prizePool}</span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-gold-2 transition-colors">
                    {seg.title}
                  </h4>
                  <p className="text-xs text-bone-dim line-clamp-2 mt-1">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-iron/40 flex items-center justify-between text-[11px] text-bone-dim">
                  <span>{seg.venue}</span>
                  <span className="text-[#5bc9d6] font-cinzel font-bold group-hover:underline">Enter Tourney &rarr;</span>
                </div>
              </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
        {/* bottom roller rod */}
        <div className="dossier-rod absolute bottom-2.5 left-6 right-6 sm:left-10 sm:right-10" aria-hidden="true" />
      </div>
      </Reveal>

    </div>
  );
};
