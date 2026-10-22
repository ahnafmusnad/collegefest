import React, { useState, useEffect } from 'react';
import { PageType, ClubHouse } from '../types';
import { FEST_METADATA, FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import HouseScroll from '../components/HouseScroll';
import CountdownTablets from '../components/CountdownTablets';
import StatsPanel from '../components/StatsPanel';
import AboutFestPanel from '../components/AboutFestPanel';
import SwordDivider from '../components/ui/SwordDivider';
import GemDivider from '../components/ui/GemDivider';
import ProclamationPlaque from '../components/ui/ProclamationPlaque';
import Button from '../components/ui/Button';
import SortingTrialBanner from '../components/SortingTrialBanner';
import { 
  Crown, 
  Ticket, 
} from 'lucide-react';

/* The four headlining contests shown on the throne-room floor,
   in herald order matching the great banner. */
const FEATURED_SEGMENTS = [
  'seg-debate-fest',
  'seg-physics-auction',
  'seg-physics-olympiad',
  'seg-macro-photography'
]
  .map((id) => FEST_SEGMENTS.find((s) => s.id === id))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

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

  const HOUSE_TILT = ['-rotate-[0.6deg]', 'rotate-[0.5deg]', '-rotate-[0.4deg]', 'rotate-[0.7deg]'];

  return (
    <div className="relative text-bone">
      
      {/* ========================================================
          HERO SECTION WITH VISIBLE IRON THRONE BACKGROUND
          "the home page should have a bg of a game of thrones's iron throne, that would be epic...
           the bg of the home page should not be too dark, it should at least be visiable"
      ======================================================== */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        
        {/* Layer 1: Background Iron Throne Image */}
        <div className="absolute inset-0 hero-throne-bg transition-all duration-700" />

        {/* Layer 2: Atmospheric Lighting & Gradients (visible throne with frosty vignette) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/60" />
        <div className="absolute inset-0 bg-ink/28" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(158,42,43,0.10)_0%,_transparent_65%)] pointer-events-none" />

        {/* Layer 3: Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Fest Proclamation Plaque */}
          <ProclamationPlaque />

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
              mobileLabel="Explore"
              onClick={() => {
                onNavigate('segments');
              }}
            >
              Explore Tourneys
            </Button>

            {/* Sorting Quiz */}
            <Button
              variant="secondary"
              mobileLabel="Your House"
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
          <CountdownTablets time={timeLeft} />

        </div>
      </section>

      {/* ========================================================
          FAST STATS & CITADEL HERALDRY STRIP
      ======================================================== */}
      <section className="relative z-10 px-3 py-9 sm:px-6 md:py-12 lg:py-16">
        <StatsPanel />
      </section>

      {/* ========================================================
          ABOUT THE FEST SECTION
      ======================================================== */}
      <section className="relative py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            The Saga Begins
          </div>
          <GemDivider className="py-1" />
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            About the Fest
          </h2>
          <GemDivider className="py-1" />
        </div>

        <Reveal direction="flip" duration={1100}>
          <div className="scroll-panel mx-auto max-w-4xl px-2 py-3 sm:px-4 sm:py-4">
            <AboutFestPanel />
          </div>
        </Reveal>
      </section>

      {/* ========================================================
          THE FOUR GREAT HOUSES SECTION (CORE FESTIVAL IDENTITY)
      ======================================================== */}
      <section className="relative py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-gold/30 text-gold text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            The Four Pillars of Chittagong College
          </div>
          <GemDivider className="py-1" />
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            THE FOUR GREAT HOUSES
          </h2>
          <GemDivider className="py-1" />
          <p className="font-sans text-sm sm:text-base text-bone-dim">
            Every banner represents a legendary club forged within Chittagong College's historic grounds. Explore their lore, rally behind your champions, and vote for your House.
          </p>
        </div>

        {/* 4 Houses Grid — torn scripture scrolls */}
        <div className="houses-grid">
          {FOUR_HOUSES.map((house, i) => (
            <Reveal key={house.id} delay={i * 100} className="h-full w-full max-w-[340px]">
              <HouseScroll
                logo={house.logo}
                name={house.name}
                houseName={house.houseName}
                motto={house.motto}
                lore={house.lore}
                cheerCount={houseCheers[house.id]}
                cheered={!!hasCheered[house.id]}
                tilt={HOUSE_TILT[i]}
                onCheer={(e) => handleCheer(house.id, e)}
                onViewLore={() => onNavigate('clubs')}
              />
            </Reveal>
          ))}
        </div>

        {/* View All Clubs CTA */}
        <div className="text-center mt-6">
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
      <SortingTrialBanner onBegin={onOpenSortingQuiz} />

      {/* ========================================================
          FEATURED SEGMENTS & ARENAS — royal writ plaques
      ======================================================== */}
      <section className="relative py-20 px-4 max-w-[88rem] mx-auto overflow-hidden">
        {/* ambient teal glow behind the grid */}
        <div className="absolute inset-x-0 top-1/3 h-[32rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(20,94,98,0.16),transparent_70%)] pointer-events-none" />


        {/* ---------- centered header ---------- */}
        <div className="relative text-center max-w-4xl mx-auto mb-14 space-y-4">
          {/* top ornament */}
          <div className="flex items-center justify-center gap-3 text-crimson-2" aria-hidden="true">
            <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-crimson-2/70" />
            <svg viewBox="0 0 12 12" className="h-2 w-2"><path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" /></svg>
            <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-crimson-2/70" />
          </div>


          {/* eyebrow flanked by arrow rules */}
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <svg viewBox="0 0 120 8" className="hidden sm:block h-2 w-24 lg:w-32 text-crimson-2/80">
              <path d="M120 4H6M6 4l6-3M6 4l6 3" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.42em] text-[#5bc9d6] uppercase">
              The Great Contests
            </p>
            <svg viewBox="0 0 120 8" className="hidden sm:block h-2 w-24 lg:w-32 text-crimson-2/80">
              <path d="M0 4h114M114 4l-6-3M114 4l-6 3" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>


          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide silver-text uppercase">
            Featured Segments &amp; Arenas
          </h2>


          <p className="font-cinzel text-sm sm:text-base tracking-[0.34em] text-bone-dim uppercase">
            Where Talent Meets Tradition
          </p>


          {/* bottom ornament */}
          <GemDivider className="pt-1" />


          {/* view-all button, floating right on large screens */}
          <div className="hidden lg:block absolute right-0 bottom-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('segments')}
            >
              View All Segments
            </Button>
          </div>
        </div>


        {/* view-all button on small screens */}
        <div className="lg:hidden text-center -mt-6 mb-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('segments')}
          >
            View All Segments
          </Button>
        </div>


        {/* ---------- the writ plaques ---------- */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-5">
          {FEATURED_SEGMENTS.map((segment, i) => (
            <Reveal key={segment.id} delay={i * 110} className="h-full">
              <TiltCard
                maxTilt={4}
                scale={1.015}
                baseShadowClassName="none"
                onClick={() => onNavigate('segments')}
                className="seg-wrap group relative h-full cursor-pointer"
              >
                <div className="seg-card h-full">
                  <div className="seg-card-inner flex flex-col p-6 xl:p-5 2xl:p-6">
                    {/* faint astrolabe sigil */}
                    <svg className="seg-sigil" viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
                      <circle cx="50" cy="50" r="46" strokeWidth="1" />
                      <circle cx="50" cy="50" r="34" strokeWidth="0.75" />
                      <circle cx="50" cy="50" r="10" strokeWidth="0.75" />
                      <path d="M50 2v96M2 50h96M16 16l68 68M84 16L16 84" strokeWidth="0.6" />
                      <path d="M50 30L70 50L50 70L30 50Z" strokeWidth="0.75" />
                    </svg>


                    {/* category, right-aligned with pip rule */}
                    <div className="relative z-10 flex flex-col items-end gap-1.5 mb-5">
                      <span className="font-cinzel text-[10px] font-semibold tracking-[0.28em] uppercase text-bone-dim">
                        {segment.category}
                      </span>
                      <span className="seg-cat-rule w-24" />
                    </div>


                    {/* title + got title */}
                    <h3 className="relative z-10 font-cinzel text-xl 2xl:text-2xl font-bold uppercase leading-tight text-gold-2 tracking-wide">
                      {segment.title}
                    </h3>
                    <p className="relative z-10 mt-2 font-garamond italic text-[15px] [font-variant:small-caps] tracking-wide text-bone-dim">
                      &ldquo;{segment.gotTitle}&rdquo;
                    </p>


                    {/* description */}
                    <p className="relative z-10 mt-4 font-sans text-[12.5px] leading-relaxed text-bone-dim/90">
                      {segment.description}
                    </p>


                    {/* footer */}
                    <div className="relative z-10 mt-auto pt-5">
                      <div className="h-px w-full bg-gradient-to-r from-iron/70 via-iron/40 to-transparent mb-4" />
                      <div className="flex items-center gap-2 text-bone">
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#5bc9d6]" aria-hidden="true">
                          <path d="M6 0.8L11.2 6L6 11.2L0.8 6Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase">
                          {segment.date}
                        </span>
                      </div>
                      <span className="seg-link mt-2.5">
                        Rules &amp; Entry
                        <svg className="seg-arrow h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M2 8h11M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <span className="seg-notch-gem" aria-hidden="true" />
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
        <div className="tickify-frame relative overflow-hidden text-center max-w-4xl mx-auto px-8 pt-24 pb-8 md:px-12 md:pt-28 md:pb-12">
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
