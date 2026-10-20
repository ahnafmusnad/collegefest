import React, { useState } from 'react';
import { FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { ClubHouse, PageType } from '../types';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import Button from '../components/ui/Button';
import { 
  Shield, 
  Swords, 
  Check, 
  Flame
} from 'lucide-react';

interface ClubsProps {
  onNavigate: (page: PageType) => void;
  onOpenTickify: () => void;
  onPledgeHouse: (house: ClubHouse) => void;
  userPledgedHouse: ClubHouse | null;
}

export const Clubs: React.FC<ClubsProps> = ({
  onNavigate,
  onOpenTickify,
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
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <Reveal direction="zoom">
      <div className="relative overflow-hidden border-2 border-crimson/30 bg-gradient-to-r from-ink via-ink-2 to-ink p-8 md:p-12 text-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/images/four-houses-heraldry.jpg')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink-2/90 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            The Citadel Quadrumvirate
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider">
            THE FOUR GREAT HOUSES
          </h1>
          <p className="font-sans text-sm sm:text-base text-bone-dim leading-relaxed">
            Four legendary clubs anchor Chittagong College’s student body. Each house bears its own sigil, sacred motto, heroic ancestry, and fierce competitive fire.
          </p>
        </div>
      </div>
      </Reveal>

      {/* House Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FOUR_HOUSES.map((house, i) => {
          const isSelected = activeHouseId === house.id;
          const isPledged = userPledgedHouse?.id === house.id;
          return (
            <Reveal key={house.id} delay={i * 80} className="h-full">
            <button
              key={house.id}
              onClick={() => {
                setActiveHouseId(house.id);
              }}

              className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group h-full ${
                isSelected
                  ? 'bg-gradient-to-b from-ink-2/90 to-ink-2 border-gold -translate-y-1'
                  : 'bg-ink-2/60 border-iron hover:border-crimson/40 hover:bg-ink-2/90'
              }`}
            >
              {isPledged && (
                <div className="absolute -top-2.5 right-3 bg-ember text-ink text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                  <Check className="w-3 h-3" />
                  Your House
                </div>
              )}

              <div className="mb-2">
                <div className="font-cinzel text-xs text-gold/80 font-semibold uppercase">
                  {house.name.split('(')[0]}
                </div>
              </div>

              <div className="font-cinzel text-sm font-bold text-white group-hover:text-gold-2 transition-colors line-clamp-1">
                {house.houseName}
              </div>

              <div className="font-cinzel text-[11px] text-bone-dim italic mt-1 line-clamp-1">
                "{house.motto}"
              </div>
            </button>
            </Reveal>
          );
        })}
      </div>

      {/* ========================================================
          ACTIVE HOUSE SHOWCASE DOSSIER
      ======================================================== */}
      <Reveal direction="zoom">
      <div className="frost-card border-2 border-crimson/40 p-5 md:p-8 space-y-6 relative overflow-hidden">
        
        {/* Top House Banner — identity left, actions right (stacks on mobile) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center border-b border-crimson/20 pb-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-16 md:w-20 md:h-20 p-2 bg-white border-2 border-gold overflow-hidden shrink-0 flex items-center justify-center">
              <img src={activeHouse.logo} alt={`${activeHouse.name} logo`} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-cinzel text-[10px] md:text-xs font-bold text-gold uppercase tracking-widest block">
                Citadel House Sigil: {activeHouse.sigil}
              </span>
              <h2 className="font-cinzel-dec text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {activeHouse.name.split('(')[0]}
              </h2>
              <div className="font-cinzel text-sm font-semibold text-gold-2 mt-1">
                {activeHouse.houseName}
              </div>
              <p className="font-cinzel text-xs md:text-sm text-gold-2/90 italic">
                House Words: "{activeHouse.motto}"
              </p>
            </div>
          </div>

          {/* House Pledge Action */}
          <div className="flex flex-row items-center gap-3 md:flex-col md:items-stretch">
            <Button
              className="w-full"
              onClick={() => handlePledge(activeHouse)}
            >
              {userPledgedHouse?.id === activeHouse.id ? 'ALLEGIANCE SWORN' : `PLEDGE TO ${activeHouse.houseName.toUpperCase()}`}
            </Button>

            <div className="p-3 bg-ink-2/80 border border-iron text-center min-w-[120px]">
              <div className="font-mono text-lg font-bold text-gold">{activeHouse.points}</div>
              <div className="text-[10px] font-cinzel text-bone-dim uppercase">Citadel Points</div>
            </div>
          </div>
        </div>

        {/* House Vitals — 4 across on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          <Reveal delay={0}>
            <div className="p-3.5 bg-ink-2/80 border border-crimson/20 text-center h-full">
              <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Founded</div>
              <div className="font-cinzel text-lg font-bold text-white">{activeHouse.founded}</div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="p-3.5 bg-ink-2/80 border border-crimson/20 text-center h-full">
              <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Members</div>
              <div className="font-cinzel text-lg font-bold text-white">{activeHouse.memberCount > 0 ? `${activeHouse.memberCount}+` : '—'}</div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="p-3.5 bg-ink-2/80 border border-crimson/20 text-center h-full">
              <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Sigil</div>
              <div className="font-cinzel text-[11px] font-bold text-white leading-tight px-1">{activeHouse.sigil}</div>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="p-3.5 bg-ink-2/80 border border-crimson/20 text-center h-full">
              <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Crest Points</div>
              <div className="font-mono text-lg font-bold text-gold-2">{activeHouse.points}</div>
            </div>
          </Reveal>
        </div>

        {/* House Segments Showcase */}
        <div className="pt-4 border-t border-crimson/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-gold" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {houseSegments.map((seg, i) => (
              <Reveal key={seg.id} delay={i * 90} className="h-full">
              <TiltCard
                onClick={() => {
                  onNavigate('segments');
                }}
                className="p-4 bg-ink-2/70 border border-iron hover:border-gold/60 shadow-[0_8px_22px_rgba(11,9,7,0.5)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-cinzel text-gold">{seg.category}</span>
                    <span className="font-bold text-gold">{seg.prizePool}</span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-gold-2 transition-colors">
                    {seg.title}
                  </h4>
                  <p className="text-xs text-bone-dim line-clamp-2 mt-1">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-iron/60 flex items-center justify-between text-[11px] text-bone-dim">
                  <span>{seg.venue}</span>
                  <span className="text-gold font-cinzel font-bold group-hover:underline">Enter Tourney &rarr;</span>
                </div>
              </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
      </Reveal>

      {/* House Points Leaderboard */}
      <section className="space-y-4">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-gold" />
            The Citadel Leaderboard
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            HOUSE CHAMPIONSHIP POINTS
          </h2>
        </Reveal>

        <Reveal delay={100}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-iron/40 border border-iron overflow-hidden">
          {[...FOUR_HOUSES].sort((a, b) => b.points - a.points).map((house, idx) => (
            <div key={house.id} className="flex items-center gap-2 px-3 py-2.5 min-w-0 bg-ink-2">
              <span className="font-mono text-xs font-bold text-gold shrink-0">#{idx + 1}</span>
              <span className="text-xs text-bone truncate font-cinzel">{house.name.split('(')[0]}</span>
              <span className="ml-auto font-mono text-xs font-bold text-gold-2 shrink-0">{house.points} PTS</span>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* Registration CTA */}
      <Reveal className="text-center pt-4">
        <Button
          onClick={() => {
            onOpenTickify();
          }}
        >
          CLAIM HOUSE WARRIOR PASS ON TICKIFY
        </Button>
      </Reveal>

    </div>
  );
};
