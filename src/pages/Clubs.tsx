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
    <div className="pt-24 pb-20 px-4 text-slate-100 max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-sky-500/30 bg-gradient-to-r from-[#040813] via-[#091529] to-[#040813] p-8 md:p-12 text-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/images/four-houses-heraldry.jpg')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/90 border border-sky-400/40 text-sky-300 text-xs font-cinzel uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            The Citadel Quadrumvirate
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-ice">
            THE FOUR GREAT HOUSES
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
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
                  ? 'bg-gradient-to-b from-sky-950/90 to-slate-900 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] -translate-y-1'
                  : 'bg-slate-900/60 border-slate-800 hover:border-sky-500/40 hover:bg-slate-900/90'
              }`}
            >
              {isPledged && (
                <div className="absolute -top-2.5 right-3 bg-cyan-400 text-slate-950 text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                  <Check className="w-3 h-3" />
                  Your House
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-lg border ${
                  isSelected ? 'bg-sky-500/20 border-sky-400 text-cyan-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}>
                  {getHouseIcon(house.iconName, 'w-4 h-4')}
                </div>
                <div className="font-cinzel text-xs text-sky-400/80 font-semibold uppercase">
                  {house.houseName}
                </div>
              </div>

              <div className="font-cinzel text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {house.name.split('(')[0]}
              </div>

              <div className="font-cinzel text-[11px] text-slate-400 italic mt-1 line-clamp-1">
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
      <div className="frost-card rounded-3xl border-2 border-sky-500/40 p-6 md:p-10 space-y-10 relative overflow-hidden">
        
        {/* Top House Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-sky-500/20 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                {getHouseIcon(activeHouse.iconName, 'w-8 h-8 text-sky-400')}
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold text-sky-400 uppercase tracking-widest block">
                  Citadel House Sigil: {activeHouse.sigil}
                </span>
                <h2 className="font-cinzel-dec text-3xl sm:text-4xl font-extrabold text-white text-glow-ice">
                  {activeHouse.houseName}
                </h2>
              </div>
            </div>

            <div className="font-cinzel text-base font-semibold text-sky-300">
              {activeHouse.name}
            </div>

            <p className="font-cinzel text-sm text-sky-200/90 italic">
              House Words: "{activeHouse.motto}"
            </p>
          </div>

          {/* House Pledge Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handlePledge(activeHouse)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                userPledgedHouse?.id === activeHouse.id
                  ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 border border-cyan-200 shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{userPledgedHouse?.id === activeHouse.id ? 'ALLEGIANCE SWORN' : `PLEDGE TO ${activeHouse.houseName.toUpperCase()}`}</span>
            </button>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[120px]">
              <div className="font-mono text-lg font-bold text-amber-400">{activeHouse.points}</div>
              <div className="text-[10px] font-cinzel text-slate-400 uppercase">Citadel Points</div>
            </div>
          </div>
        </div>

        {/* House Lore Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-cinzel text-base font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <Scroll className="w-4 h-4" />
              The Chronicle & Philosophy
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {activeHouse.lore}
            </p>

            {/* Achievements */}
            <div className="pt-4 space-y-2.5">
              <h4 className="font-cinzel text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Historic Trophies & Laurels
              </h4>
              <div className="space-y-2">
                {activeHouse.achievements.map((ach, i) => (
                  <Reveal key={i} delay={i * 90}>
                  <div
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200 hover:border-sky-500/40 transition-colors h-full"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{ach}</span>
                  </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* House Leadership Lords */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-base font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              Lords & Masters of the House
            </h3>
            <div className="space-y-3">
              {activeHouse.lords.map((lord, i) => (
                <Reveal key={i} delay={i * 100}>
                <div
                  onMouseEnter={() => soundFx.playRuneChime()}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-sky-500/20 hover:border-sky-400/50 transition-all space-y-1 h-full"
                >
                  <div className="text-[11px] font-cinzel text-sky-400 uppercase tracking-wider font-semibold">
                    {lord.role}
                  </div>
                  <div className="font-cinzel text-sm font-bold text-white">
                    {lord.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {lord.batch}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/20 flex items-center justify-between text-xs font-cinzel text-slate-300">
              <span>Active Battalion:</span>
              <span className="font-bold text-sky-300 font-mono">{activeHouse.memberCount} Cadets</span>
            </div>
          </div>
        </div>

        {/* House Segments Showcase */}
        <div className="pt-4 border-t border-sky-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-sky-400" />
              Tournament Segments Commanded by {activeHouse.houseName}
            </h3>
            <button
              onClick={() => onNavigate('segments')}
              className="text-xs font-cinzel text-sky-400 hover:text-cyan-300 flex items-center gap-1"
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
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-400/60 shadow-[0_8px_22px_rgba(2,8,20,0.5)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-cinzel text-sky-400">{seg.category}</span>
                    <span className="font-bold text-amber-400">{seg.prizePool}</span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {seg.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{seg.venue}</span>
                  <span className="text-sky-400 font-cinzel font-bold group-hover:underline">Enter Tourney &rarr;</span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/30 text-sky-300 text-xs font-cinzel uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            The Citadel Leaderboard
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            HOUSE CHAMPIONSHIP POINTS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400">
            Points are accumulated through tournament victories, participation quotas, and student cheering.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...FOUR_HOUSES].sort((a, b) => b.points - a.points).map((house, idx) => (
            <Reveal key={house.id} delay={idx * 100} className="h-full">
            <TiltCard
              className={`p-5 rounded-2xl border text-center space-y-3 h-full ${
                idx === 0
                  ? 'bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-slate-700 font-cinzel text-xs font-bold text-sky-400">
                #{idx + 1}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white">
                {house.houseName}
              </h3>
              <p className="text-xs text-slate-400 truncate">{house.name.split('(')[0]}</p>
              <div className="font-mono text-2xl font-black text-amber-300">
                {house.points} PTS
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-400 to-amber-400 h-full rounded-full"
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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-cinzel text-sm md:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-400 hover:from-cyan-300 hover:to-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95 transition-all uppercase tracking-wider"
        >
          <span>CLAIM HOUSE WARRIOR PASS ON TICKIFY</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </Reveal>

    </div>
  );
};
