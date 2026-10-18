import React, { useState, useEffect } from 'react';
import { PageType, ClubHouse } from '../types';
import { FEST_METADATA, FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { CountUp } from '../components/CountUp';
import { 
  Crown, 
  Shield, 
  Swords, 
  Ticket, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Award,
  Users,
  Scroll,
  Cpu,
  Music,
  ChevronRight
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // House Cheer state (Interactive live cheers)
  const [houseCheers, setHouseCheers] = useState<Record<string, number>>({
    'house-veritas': 342,
    'house-arcanum': 415,
    'house-melodia': 389,
    'house-valorous': 367
  });
  const [hasCheered, setHasCheered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const target = new Date(FEST_METADATA.countdownTarget).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheer = (houseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSwordClash();
    setHouseCheers(prev => ({ ...prev, [houseId]: prev[houseId] + 1 }));
    setHasCheered(prev => ({ ...prev, [houseId]: true }));
  };

  const getHouseIcon = (name: string) => {
    switch (name) {
      case 'Scroll': return <Scroll className="w-8 h-8 text-sky-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-cyan-400" />;
      case 'Music': return <Music className="w-8 h-8 text-pink-400" />;
      case 'Shield': return <Shield className="w-8 h-8 text-amber-400" />;
      default: return <Crown className="w-8 h-8 text-sky-400" />;
    }
  };

  return (
    <div className="relative text-slate-100">
      
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03060d]/70 via-transparent to-[#050b14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(56,189,248,0.15)_0%,_transparent_65%)] pointer-events-none" />

        {/* Layer 3: Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Fest Proclamation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-cinzel text-xs md:text-sm font-bold tracking-[0.25em] text-sky-300 uppercase">
              Chittagong College &bull; Winter Fest 2026
            </span>
          </div>

          {/* Main Fest Heading */}
          <div className="space-y-2">
            <h1 className="font-cinzel-dec text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-wider leading-tight text-glow-ice drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              CARNIVAL DA <br />
              <span className="bg-gradient-to-r from-sky-200 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                CHITTAGONG COLLEGE
              </span>
            </h1>
            <p className="font-cinzel text-base sm:text-lg md:text-xl text-sky-200/90 font-medium tracking-wide max-w-2xl mx-auto italic drop-shadow-md">
              "When Winter Descends Upon The Red Citadel, Four Great Houses Clash For Eternal Glory."
            </p>
          </div>

          {/* User Pledged House Badge if available */}
          {userPledgedHouse && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-950/90 border border-sky-400 text-sky-200 text-xs font-cinzel tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>You Have Sworn Allegiance to <strong>{userPledgedHouse.houseName}</strong></span>
            </div>
          )}

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* Direct Tickify Registration */}
            <a
              href={FEST_METADATA.tickifyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playRoyalHorn()}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-cinzel text-sm md:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-400 hover:from-cyan-300 hover:to-sky-200 border border-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:shadow-[0_0_40px_rgba(56,189,248,0.9)] active:scale-95 transition-all uppercase tracking-wider"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>REGISTER VIA TICKIFY</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Explore Tourneys */}
            <button
              onClick={() => {
                soundFx.playSwordClash();
                onNavigate('segments');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-cinzel text-sm md:text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-sky-500/40 hover:border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all"
            >
              <Swords className="w-4 h-4 text-sky-400" />
              <span>Explore Tourneys</span>
            </button>

            {/* Sorting Quiz */}
            <button
              onClick={() => {
                soundFx.playRuneChime();
                onOpenSortingQuiz();
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-cinzel text-xs md:text-sm font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 hover:border-amber-400 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Which House Are You?</span>
            </button>
          </div>

          {/* ========================================================
              LIVE COUNTDOWN TO THE FESTIVAL
          ======================================================== */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="font-cinzel text-xs tracking-[0.25em] text-sky-300/80 uppercase text-center mb-3">
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
                    className="frost-card p-3 sm:p-4 rounded-xl border border-sky-500/30 bg-slate-950/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group hover:border-sky-400 transition-all h-full"
                  >
                    <CountUp
                      end={unit.value}
                      duration={2200}
                      delay={i * 250}
                      startOnView={false}
                      format={(v) => String(v).padStart(2, '0')}
                      className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-glow-ice group-hover:scale-105 transition-transform"
                    />
                    <div className="font-cinzel text-[10px] sm:text-xs tracking-wider text-sky-400 uppercase mt-1">
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
      <section className="relative z-10 py-6 border-y border-sky-500/20 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <Reveal delay={0}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-sky-400">
                  <Shield className="w-5 h-5" />
                  <CountUp
                    end={4}
                    duration={1500}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-slate-400 uppercase">
                  Great College Houses
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-cyan-400">
                  <Swords className="w-5 h-5" />
                  <CountUp
                    end={12}
                    duration={1600}
                    delay={150}
                    format={(v) => `${v}+`}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-slate-400 uppercase">
                  Competitive Tourneys
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-amber-400">
                  <Award className="w-5 h-5" />
                  <CountUp
                    end={150}
                    duration={1800}
                    delay={300}
                    format={(v) => `${v}K+`}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-slate-400 uppercase">
                  BDT Prize Vault
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-pink-400">
                  <Users className="w-5 h-5" />
                  <CountUp
                    end={6000}
                    duration={2000}
                    delay={450}
                    format={(v) => `${v.toLocaleString()}+`}
                    className="font-cinzel text-2xl md:text-3xl font-extrabold text-white"
                  />
                </div>
                <div className="font-cinzel text-xs tracking-wider text-slate-400 uppercase">
                  Citadel Attendees
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-400 text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            The Four Pillars of Chittagong College
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide text-glow-ice">
            THE FOUR GREAT HOUSES
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300">
            Every banner represents a legendary club forged within Chittagong College's historic grounds. Explore their lore, rally behind your champions, and vote for your House.
          </p>
        </div>

        {/* 4 Houses Grid with rich hover interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_HOUSES.map((house, i) => (
            <Reveal key={house.id} delay={i * 100} className="h-full">
            <TiltCard
              onClick={() => {
                soundFx.playSwordClash();
                onNavigate('clubs');
              }}
              onMouseEnter={() => soundFx.playRuneChime()}
              className="group relative h-full rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0a1424]/90 to-[#050b14] border-2 border-slate-800 hover:border-sky-400 p-6 shadow-[0_10px_28px_rgba(2,8,20,0.5)] flex flex-col justify-between"
            >
              {/* Top Card Decor */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 shadow-inner group-hover:scale-110 transition-transform">
                  {getHouseIcon(house.iconName)}
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-[10px] text-sky-400 uppercase tracking-widest block">Est. {house.founded}</span>
                  <span className="font-mono text-xs font-bold text-slate-300">{house.memberCount} Warriors</span>
                </div>
              </div>

              {/* House Name & Lore */}
              <div className="space-y-2 mb-6">
                <h3 className="font-cinzel-dec text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {house.houseName}
                </h3>
                <div className="text-xs font-semibold text-sky-400 font-cinzel">
                  {house.name}
                </div>
                <p className="font-cinzel text-xs text-sky-200/80 italic">
                  "{house.motto}"
                </p>
                <p className="font-sans text-xs text-slate-400 line-clamp-3 pt-2">
                  {house.lore}
                </p>
              </div>

              {/* Bottom Interactive Cheer / Vote & View Link */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleCheer(house.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-cinzel font-bold transition-all ${
                      hasCheered[house.id]
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-sky-400 hover:text-white'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${hasCheered[house.id] ? 'text-cyan-400 animate-bounce' : 'text-amber-400'}`} />
                    <span>Cheer ({houseCheers[house.id]})</span>
                  </button>

                  <div className="flex items-center gap-1 text-xs font-cinzel text-sky-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>View Lore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Glow border sheen */}
              <div className="absolute inset-0 rounded-2xl bg-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* View All Clubs CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              soundFx.playSwordClash();
              onNavigate('clubs');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-cinzel text-sm font-bold text-sky-300 border border-sky-500/40 hover:border-sky-400 bg-sky-950/40 hover:bg-sky-950/80 shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all"
          >
            <Shield className="w-4 h-4" />
            <span>ENTER THE SANCTUARY OF HOUSES & LORE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SORTING HAT TRIAL BANNER
      ======================================================== */}
      <section className="relative py-12 px-4 max-w-7xl mx-auto">
        <Reveal direction="zoom">
        <div className="relative rounded-3xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-2 border-sky-400/40 p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.2)]">
          {/* Subtle watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Crown className="w-80 h-80 text-sky-400" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/40 border border-sky-400/40 text-sky-300 text-xs font-cinzel uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              The Iron Raven's Sorting Ceremony
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-glow-ice">
              DISCOVER YOUR TRUE COLLEGE HOUSE
            </h3>
            <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed">
              Are your words sharp enough for House Veritas? Does your mind master the gears of House Arcanum? Does your soul sing with House Melodia, or do you command armies with House Valorous? Take the 3-question trial now.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  soundFx.playRoyalHorn();
                  onOpenSortingQuiz();
                }}
                className="px-6 py-3.5 rounded-xl font-cinzel text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-400 hover:from-cyan-300 hover:to-sky-200 border border-cyan-200 shadow-[0_0_25px_rgba(56,189,248,0.5)] active:scale-95 transition-all uppercase tracking-wider"
              >
                BEGIN SORTING CEREMONY
              </button>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-400 text-xs font-cinzel tracking-widest uppercase mb-2">
              <Swords className="w-3.5 h-3.5" />
              Grand Contests of Skill
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              FEATURED SEGMENTS & ARENAS
            </h2>
          </div>
          <button
            onClick={() => {
              soundFx.playSwordClash();
              onNavigate('segments');
            }}
            className="inline-flex items-center gap-1.5 font-cinzel text-xs font-bold text-sky-400 hover:text-cyan-300 tracking-wider group"
          >
            <span>VIEW ALL 12+ SEGMENTS</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Segments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEST_SEGMENTS.filter(s => s.isFeatured).slice(0, 3).map((segment, i) => (
            <Reveal key={segment.id} delay={i * 100} className="h-full">
            <TiltCard
              onClick={() => {
                soundFx.playSwordClash();
                onNavigate('segments');
              }}
              onMouseEnter={() => soundFx.playRuneChime()}
              className="group relative h-full rounded-2xl bg-gradient-to-b from-[#0a1526] via-[#070e1b] to-[#040811] border border-sky-500/25 hover:border-sky-400/80 p-6 shadow-[0_10px_28px_rgba(2,8,20,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-cinzel font-semibold bg-sky-950/90 border border-sky-500/40 text-sky-300">
                    {segment.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-cinzel text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{segment.prizePool}</span>
                  </div>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {segment.title}
                </h3>
                <p className="font-cinzel text-xs text-sky-400/80 italic mb-3">
                  "{segment.gotTitle}"
                </p>
                <p className="font-sans text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {segment.description}
                </p>
              </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{segment.date}</span>
                  <span className="font-cinzel text-xs font-bold text-sky-400 group-hover:underline">
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
        <div className="frost-card rounded-3xl p-8 md:p-12 border-2 border-sky-400/40 relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-400/40 text-sky-300 text-xs font-cinzel uppercase tracking-widest mb-4">
            <Ticket className="w-3.5 h-3.5" />
            Official Ticketing Partner: Tickify
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-3">
            SECURE YOUR WRIT OF ADMISSION ON TICKIFY
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-300 max-w-xl mx-auto mb-8">
            From the General Citadel Pass to the Knight's Tournament Writ, get your tickets verified with Valyrian QR codes directly on Tickify.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={FEST_METADATA.tickifyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playRoyalHorn()}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-cinzel text-sm md:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-400 hover:from-cyan-300 hover:to-sky-200 border border-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.6)] active:scale-95 transition-all uppercase tracking-wider"
            >
              <Ticket className="w-5 h-5 text-slate-950" />
              <span>BOOK TICKETS ON TICKIFY</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                soundFx.playRuneChime();
                onOpenTickify();
              }}
              className="px-6 py-4 rounded-xl font-cinzel text-sm font-semibold text-sky-300 bg-slate-900/80 hover:bg-slate-800 border border-sky-500/40 transition-colors"
            >
              View Pass Tiers & Perks
            </button>
          </div>
        </div>
        </Reveal>
      </section>

    </div>
  );
};
