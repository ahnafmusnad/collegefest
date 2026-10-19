import React, { useState, useEffect } from 'react';
import { PageType, ClubHouse } from '../types';
import { FEST_METADATA, FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { CountUp } from '../components/CountUp';
import SwordDivider from '../components/ui/SwordDivider';
import Button from '../components/ui/Button';
import { 
  Crown, 
  Shield, 
  Swords, 
  Ticket, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Award,
  Users
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageType) => void;
  onOpenTickify: () => void;
  onOpenSortingQuiz: () => void;
  userPledgedHouse: ClubHouse | null;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenTickify,
  onOpenSortingQuiz,
  userPledgedHouse
}) => {
  // Countdown Timer state
  const computeTimeLeft = () => {
    const difference = new Date(FEST_METADATA.countdownTarget).getTime() - Date.now();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);

  // House Cheer state (Interactive live cheers)
  const [houseCheers, setHouseCheers] = useState<Record<string, number>>({
    'house-veritas': 342,
    'house-arcanum': 415,
    'house-melodia': 389,
    'house-valorous': 367
  });
  const [hasCheered, setHasCheered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheer = (houseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHouseCheers(prev => ({ ...prev, [houseId]: prev[houseId] + 1 }));
    setHasCheered(prev => ({ ...prev, [houseId]: true }));
  };

  return (
    <div className="relative text-bone">
      
      {/* ========================================================
          HERO SECTION WITH VISIBLE IRON THRONE BACKGROUND
          "the home page should have a bg of a game of thrones's iron throne, that would be epic...
           the bg of the home page should not be too dark, it should at least be visiable"
      ======================================================== */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        
        {/* Layer 1: Background Iron Throne Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: `url('/images/iron-throne-hero.jpg')`,
            backgroundPosition: 'center 35%'
          }}
        />

        {/* Layer 2: Atmospheric Lighting & Gradients (visible throne with frosty vignette) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(158,42,43,0.15)_0%,_transparent_65%)] pointer-events-none" />

        {/* Layer 3: Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Fest Proclamation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/80 border border-gold/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
            <span className="font-cinzel text-xs md:text-sm font-bold tracking-[0.25em] text-gold-2 uppercase">
              Chittagong College &bull; December 18–19, 2026
            </span>
          </div>

          {/* Main Fest Heading */}
          <div className="space-y-2">
            <h1 className="font-got text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wider leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              CARNAVAL
            </h1>
            <SwordDivider className="mt-4 mb-4" />
            <p className="font-got text-lg sm:text-2xl md:text-3xl font-normal text-white tracking-[0.15em] sm:tracking-[0.3em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              DA{' '}
              <span className="inline-block animate-gradient bg-gradient-to-r from-gold-2 via-bone to-ember bg-clip-text text-transparent">
                CHITTAGONG
              </span>{' '}
              <span className="bg-gradient-to-r from-gold-2 via-gold-2 to-bone bg-clip-text text-transparent">
                COLLEGE
              </span>
            </p>
            <p className="font-garamond text-lg sm:text-xl md:text-2xl text-gold-2/90 font-medium tracking-wide max-w-2xl mx-auto drop-shadow-md">
              "When Winter Descends Upon The Red Citadel, Four Great Houses Clash For Eternal Glory."
            </p>
          </div>

          {/* User Pledged House Badge if available */}
          {userPledgedHouse && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-2/90 border border-gold text-gold-2 text-xs font-cinzel tracking-widest">
              <span className="w-6 h-6 rounded-md bg-white p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                <img src={userPledgedHouse.logo} alt="" className="w-full h-full object-contain" />
              </span>
              <span>You Have Sworn Allegiance to <strong>{userPledgedHouse.houseName}</strong></span>
            </div>
          )}

          {/* Hero CTAs */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto sm:max-w-none sm:flex sm:flex-wrap sm:justify-center">
            {/* Direct Tickify Registration */}
            <Button
              href={FEST_METADATA.tickifyLink}
              external
              className="col-span-2 sm:col-auto"
            >
              REGISTER VIA TICKIFY
            </Button>

            {/* Explore Tourneys */}
            <Button
              variant="secondary"
              onClick={() => {
                onNavigate('segments');
              }}
            >
              Explore Tourneys
            </Button>

            {/* Sorting Quiz */}
            <Button
              variant="secondary"
              onClick={() => {
                onOpenSortingQuiz();
              }}
            >
              Which House Are You?
            </Button>
          </div>

          {/* ========================================================
              LIVE COUNTDOWN TO THE FESTIVAL
          ======================================================== */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="font-cinzel text-xs tracking-[0.25em] text-gold-2/80 uppercase text-center mb-3">
              Winter Descends In
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div
                    className="frost-card p-3 sm:p-4 border border-crimson/30 bg-ink/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group hover:border-gold transition-all h-full"
                  >
                    <CountUp
                      end={unit.value}
                      duration={2200}
                      delay={i * 250}
                      startOnView={false}
                      format={(v) => String(v).padStart(2, '0')}
                      className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:scale-105 transition-transform"
                    />
                    <div className="font-cinzel text-[10px] sm:text-xs tracking-wider text-gold uppercase mt-1">
                      {unit.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          FAST STATS & CITADEL HERALDRY STRIP
      ======================================================== */}
      <section className="relative z-10 py-6 border-y border-crimson/20 bg-ink/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <Reveal delay={0}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-gold">
                  <Shield className="w-5 h-5" />
                  <CountUp
                    end={4}
                    duration={1500}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-bone-dim uppercase">
                  Great College Houses
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-ember">
                  <Swords className="w-5 h-5" />
                  <CountUp
                    end={8}
                    duration={1600}
                    delay={150}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-bone-dim uppercase">
                  Competitive Segments
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-gold">
                  <Award className="w-5 h-5" />
                  <CountUp
                    end={150}
                    duration={1800}
                    delay={300}
                    format={(v) => `${v}K+`}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-bone-dim uppercase">
                  BDT Prize Vault
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-pink-400">
                  <Users className="w-5 h-5" />
                  <CountUp
                    end={1}
                    duration={1200}
                    delay={450}
                    format={(v) => `${v}M+`}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs font-semibold text-bone-dim uppercase">
                  Digital Reach
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ========================================================
          THE FOUR GREAT HOUSES SECTION (CORE FESTIVAL IDENTITY)
      ======================================================== */}
      <section className="relative py-20 px-4 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            The Four Pillars of Chittagong College
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            THE FOUR GREAT HOUSES
          </h2>
          <p className="font-sans text-sm sm:text-base text-bone-dim">
            Every banner represents a legendary club forged within Chittagong College's historic grounds. Explore their lore, rally behind your champions, and vote for your House.
          </p>
        </div>

        {/* 4 Houses Grid with rich hover interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-4">
          {FOUR_HOUSES.map((house, i) => (
            <Reveal key={house.id} delay={i * 100} className="h-full">
            <TiltCard
              onClick={() => {
                onNavigate('clubs');
              }}

              className="scroll-card group relative h-full p-6 flex flex-col justify-between"
            >
              {/* Top Card Decor */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 p-1 bg-white border border-crimson/30 shadow-inner overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={house.logo}
                    alt={`${house.name} logo`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-right">
                  {house.founded !== '—' && (
                    <span className="font-cinzel text-[10px] text-gold uppercase tracking-widest block">Est. {house.founded}</span>
                  )}
                  {house.memberCount > 0 && (
                    <span className="font-mono text-xs font-bold text-bone-dim">{house.memberCount}+ Members</span>
                  )}
                </div>
              </div>

              {/* House Name & Lore */}
              <div className="space-y-2 mb-6">
                <h3 className="font-cinzel-dec text-xl font-bold text-white group-hover:text-gold-2 transition-colors">
                  {house.name.split('(')[0]}
                </h3>
                <div className="text-xs font-semibold text-gold font-cinzel">
                  {house.houseName}
                </div>
                <p className="font-cinzel text-xs text-gold-2/80 italic">
                  "{house.motto}"
                </p>
                <p className="font-sans text-xs text-bone-dim line-clamp-3 pt-2">
                  {house.lore}
                </p>
              </div>

              {/* Bottom Interactive Cheer / Vote & View Link */}
              <div className="space-y-3 pt-4 border-t border-iron/80">
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleCheer(house.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-cinzel font-bold transition-all ${
                      hasCheered[house.id]
                        ? 'border-ember bg-ink-2/60 text-gold-2'
                        : 'border-iron bg-ink-2/60 text-bone-dim hover:border-gold hover:text-white'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${hasCheered[house.id] ? 'text-ember animate-bounce' : 'text-gold'}`} />
                    <span>Cheer ({houseCheers[house.id]})</span>
                  </button>

                  <div className="flex items-center gap-1 text-xs font-cinzel text-gold group-hover:text-gold-2 group-hover:translate-x-1 transition-all">
                    <span>View Lore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Glow border sheen */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* View All Clubs CTA */}
        <div className="text-center mt-10">
          <Button
            variant="secondary"
            onClick={() => {
              onNavigate('clubs');
            }}
          >
            ENTER THE SANCTUARY OF HOUSES & LORE
          </Button>
        </div>
      </section>

      {/* ========================================================
          SORTING HAT TRIAL BANNER
      ======================================================== */}
      <section className="relative py-12 px-4 max-w-7xl mx-auto">
        <Reveal direction="zoom">
        <div className="relative bg-gradient-to-r from-ink-2/80 via-ink-2 to-ink-2/80 border-2 border-gold/40 p-8 md:p-12 overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Crown className="w-80 h-80 text-gold" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/40 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              The Iron Raven's Sorting Ceremony
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              DISCOVER YOUR TRUE COLLEGE HOUSE
            </h3>
            <p className="font-sans text-sm md:text-base text-bone-dim leading-relaxed">
              Are your words sharp enough for House Lannister? Does your mind master the gears of House Stark? Does your soul sing with House Targaryen, or do you command armies with House Baratheon? Take the 3-question trial now.
            </p>
            <div className="pt-2">
              <Button
                onClick={() => {
                  onOpenSortingQuiz();
                }}
              >
                BEGIN SORTING CEREMONY
              </Button>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ========================================================
          FEATURED TOURNAMENTS & BATTLES
      ======================================================== */}
      <section className="relative py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase mb-2">
              <Swords className="w-3.5 h-3.5" />
              Grand Contests of Skill
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              FEATURED SEGMENTS & ARENAS
            </h2>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onNavigate('segments');
            }}
          >
            VIEW ALL 8 SEGMENTS
          </Button>
        </div>

        {/* Featured Segments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEST_SEGMENTS.filter(s => s.isFeatured).slice(0, 3).map((segment, i) => (
            <Reveal key={segment.id} delay={i * 100} className="h-full">
            <TiltCard
              onClick={() => {
                onNavigate('segments');
              }}

              className="group relative h-full bg-gradient-to-b from-ink-2 via-ink-2 to-ink border border-crimson/25 hover:border-gold/80 p-6 shadow-[0_10px_28px_rgba(11,9,7,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-cinzel font-semibold bg-ink-2/90 border border-crimson/40 text-gold-2">
                    {segment.category}
                  </span>
                  <div className="flex items-center gap-1 text-gold font-cinzel text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{segment.prizePool}</span>
                  </div>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-gold-2 transition-colors mb-1">
                  {segment.title}
                </h3>
                <p className="font-cinzel text-xs text-gold/80 italic mb-3">
                  "{segment.gotTitle}"
                </p>
                <p className="font-sans text-xs text-bone-dim line-clamp-3 mb-4 leading-relaxed">
                  {segment.description}
                </p>
              </div>

                <div className="pt-4 border-t border-iron flex items-center justify-between">
                  <span className="text-xs text-bone-dim font-mono">{segment.date}</span>
                  <span className="font-cinzel text-xs font-bold text-gold group-hover:underline">
                    Rules & Entry &rarr;
                  </span>
                </div>
            </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================
          TICKIFY PORTAL BANNER
      ======================================================== */}
      <section className="relative py-16 px-4 max-w-7xl mx-auto">
        <Reveal direction="zoom">
        <div className="frost-card p-8 md:p-12 border-2 border-gold/40 relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest mb-4">
            <Ticket className="w-3.5 h-3.5" />
            Official Ticketing Partner: Tickify
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-3">
            SECURE YOUR WRIT OF ADMISSION ON TICKIFY
          </h2>
          <p className="font-sans text-sm md:text-base text-bone-dim max-w-xl mx-auto mb-8">
            From the General Citadel Pass to the Knight's Tournament Writ, get your tickets verified with Valyrian QR codes directly on Tickify.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={FEST_METADATA.tickifyLink}
              external
              className="w-full sm:w-auto"
            >
              BOOK TICKETS ON TICKIFY
            </Button>

            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                onOpenTickify();
              }}
            >
              View Pass Tiers & Perks
            </Button>
          </div>
        </div>
        </Reveal>
      </section>

    </div>
  );
};
