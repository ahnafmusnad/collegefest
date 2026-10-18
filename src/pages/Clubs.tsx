import React, { useState } from 'react';
import { FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { ClubHouse, PageType } from '../types';
import { soundFx } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { 
  Shield, 
  Crown, 
  Award, 
  Users, 
  Swords, 
  Sparkles, 
  ChevronRight, 
  Scroll, 
  Cpu, 
  Music, 
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
    soundFx.playRoyalHorn();
    onPledgeHouse(house);
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const getHouseIcon = (name: string, sizeClass = "w-6 h-6") => {
    switch (name) {
      case 'Scroll': return <Scroll className={sizeClass} />;
      case 'Cpu': return <Cpu className={sizeClass} />;
      case 'Music': return <Music className={sizeClass} />;
      case 'Shield': return <Shield className={sizeClass} />;
      default: return <Crown className={sizeClass} />;
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-crimson/30 bg-gradient-to-r from-ink via-ink-2 to-ink p-8 md:p-12 text-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/images/four-houses-heraldry.jpg')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink-2/90 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            The Citadel Quadrumvirate
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-ice">
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
                soundFx.playSwordClash();
                setActiveHouseId(house.id);
              }}
              onMouseEnter={() => soundFx.playRuneChime()}
              className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group h-full ${
                isSelected
                  ? 'bg-gradient-to-b from-ink-2/90 to-ink-2 border-gold shadow-[0_0_25px_rgba(158,42,43,0.35)] -translate-y-1'
                  : 'bg-ink-2/60 border-iron hover:border-crimson/40 hover:bg-ink-2/90'
              }`}
            >
              {isPledged && (
                <div className="absolute -top-2.5 right-3 bg-ember text-ink text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                  <Check className="w-3 h-3" />
                  Your House
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-lg border ${
                  isSelected ? 'bg-crimson/20 border-gold text-gold-2' : 'bg-ink-3/80 border-iron text-bone-dim'
                }`}>
                  {getHouseIcon(house.iconName, 'w-4 h-4')}
                </div>
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
      <div className="frost-card rounded-3xl border-2 border-crimson/40 p-6 md:p-10 space-y-10 relative overflow-hidden">
        
        {/* Top House Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-crimson/20 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-ink border-2 border-gold shadow-[0_0_20px_rgba(158,42,43,0.4)]">
                {getHouseIcon(activeHouse.iconName, 'w-8 h-8 text-gold')}
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold text-gold uppercase tracking-widest block">
                  Citadel House Sigil: {activeHouse.sigil}
                </span>
                <h2 className="font-cinzel-dec text-3xl sm:text-4xl font-extrabold text-white text-glow-ice">
                  {activeHouse.name.split('(')[0]}
                </h2>
              </div>
            </div>

            <div className="font-cinzel text-base font-semibold text-gold-2">
              {activeHouse.houseName}
            </div>

            <p className="font-cinzel text-sm text-gold-2/90 italic">
              House Words: "{activeHouse.motto}"
            </p>
          </div>

          {/* House Pledge Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handlePledge(activeHouse)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                userPledgedHouse?.id === activeHouse.id
                  ? 'bg-ember/20 border-2 border-ember text-gold-2 shadow-[0_0_20px_rgba(226,113,29,0.4)]'
                  : 'bg-gradient-to-r from-ember to-gold hover:from-gold-2 hover:to-gold-2 text-ink border border-gold-2 shadow-[0_0_25px_rgba(158,42,43,0.5)] active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{userPledgedHouse?.id === activeHouse.id ? 'ALLEGIANCE SWORN' : `PLEDGE TO ${activeHouse.houseName.toUpperCase()}`}</span>
            </button>

            <div className="p-3 rounded-xl bg-ink-2/80 border border-iron text-center min-w-[120px]">
              <div className="font-mono text-lg font-bold text-gold">{activeHouse.points}</div>
              <div className="text-[10px] font-cinzel text-bone-dim uppercase">Citadel Points</div>
            </div>
          </div>
        </div>

        {/* House Lore Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-cinzel text-base font-bold text-gold-2 uppercase tracking-wider flex items-center gap-2">
              <Scroll className="w-4 h-4" />
              The Chronicle & Philosophy
            </h3>
            <p className="font-sans text-sm text-bone-dim leading-relaxed">
              {activeHouse.lore}
            </p>

            {/* Achievements */}
            <div className="pt-4 space-y-2.5">
              <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                Historic Trophies & Laurels
              </h4>
              <div className="space-y-2">
                {activeHouse.achievements.map((ach, i) => (
                  <Reveal key={i} delay={i * 90}>
                  <div
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-2/60 border border-iron/80 text-xs text-bone hover:border-crimson/40 transition-colors h-full"
                  >
                    <Crown className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{ach}</span>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* House Vitals */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-base font-bold text-gold-2 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              House Vitals
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Reveal delay={0}>
                <div className="p-3.5 rounded-xl bg-ink-2/80 border border-crimson/20 text-center h-full">
                  <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Founded</div>
                  <div className="font-cinzel text-lg font-bold text-white">{activeHouse.founded}</div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="p-3.5 rounded-xl bg-ink-2/80 border border-crimson/20 text-center h-full">
                  <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Members</div>
                  <div className="font-cinzel text-lg font-bold text-white">{activeHouse.memberCount > 0 ? `${activeHouse.memberCount}+` : '—'}</div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="p-3.5 rounded-xl bg-ink-2/80 border border-crimson/20 text-center h-full">
                  <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Sigil</div>
                  <div className="font-cinzel text-[11px] font-bold text-white leading-tight px-1">{activeHouse.sigil}</div>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="p-3.5 rounded-xl bg-ink-2/80 border border-crimson/20 text-center h-full">
                  <div className="text-[10px] font-cinzel text-gold uppercase tracking-wider">Crest Points</div>
                  <div className="font-mono text-lg font-bold text-gold-2">{activeHouse.points}</div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <div className="p-3.5 rounded-xl bg-ink-2/40 border border-crimson/20 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2 text-bone-dim">
                  <span className="shrink-0">House Words:</span>
                  <span className="font-cinzel text-gold-2 italic text-right">"{activeHouse.motto}"</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-bone-dim">
                  <span className="shrink-0">Realm:</span>
                  <span className="font-cinzel text-white text-right truncate">{activeHouse.name}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* House Segments Showcase */}
        <div className="pt-4 border-t border-crimson/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-gold" />
              Tournament Segments Commanded by {activeHouse.houseName}
            </h3>
            <button
              onClick={() => onNavigate('segments')}
              className="text-xs font-cinzel text-gold hover:text-gold-2 flex items-center gap-1"
            >
              <span>View All Tourneys</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {houseSegments.map((seg, i) => (
              <Reveal key={seg.id} delay={i * 90} className="h-full">
              <TiltCard
                onClick={() => {
                  soundFx.playSwordClash();
                  onNavigate('segments');
                }}
                className="p-4 rounded-xl bg-ink-2/70 border border-iron hover:border-gold/60 shadow-[0_8px_22px_rgba(11,9,7,0.5)] flex flex-col justify-between h-full"
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
      <section className="space-y-6">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-gold" />
            The Citadel Leaderboard
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            HOUSE CHAMPIONSHIP POINTS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-bone-dim">
            Points are accumulated through tournament victories, participation quotas, and student cheering.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...FOUR_HOUSES].sort((a, b) => b.points - a.points).map((house, idx) => (
            <Reveal key={house.id} delay={idx * 100} className="h-full">
            <TiltCard
              className={`p-5 rounded-2xl border text-center space-y-3 h-full ${
                idx === 0
                  ? 'bg-gradient-to-b from-ink-3/60 via-ink-2 to-ink border-gold/60 shadow-[0_0_25px_rgba(201,162,39,0.25)]'
                  : 'bg-ink-2/60 border-iron'
              }`}
            >
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ink border border-iron font-cinzel text-xs font-bold text-gold">
                #{idx + 1}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">
                {house.name.split('(')[0]}
              </h3>
              <p className="text-xs text-bone-dim truncate">{house.houseName}</p>
              <div className="font-mono text-2xl font-black text-gold-2">
                {house.points} PTS
              </div>
              <div className="w-full bg-ink-3 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold to-gold h-full rounded-full"
                  style={{ width: `${(house.points / 1400) * 100}%` }}
                />
              </div>
            </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Registration CTA */}
      <Reveal className="text-center pt-4">
        <button
          onClick={() => {
            soundFx.playRoyalHorn();
            onOpenTickify();
          }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-cinzel text-sm md:text-base font-bold text-ink bg-gradient-to-r from-ember via-gold-2 to-gold hover:from-gold-2 hover:to-gold-2 shadow-[0_0_25px_rgba(158,42,43,0.5)] active:scale-95 transition-all uppercase tracking-wider"
        >
          <span>CLAIM HOUSE WARRIOR PASS ON TICKIFY</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </Reveal>

    </div>
  );
};
