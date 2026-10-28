import React from 'react';
import { PageType, ClubHouse } from '../types';
import { FEST_METADATA, FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import ResponsiveImg from '../components/ui/ResponsiveImg';
import HouseScroll from '../components/HouseScroll';
import LiveCountdown from '../components/LiveCountdown';
import StatsPanel from '../components/StatsPanel';
import AboutFestPanel from '../components/AboutFestPanel';
import SwordDivider from '../components/ui/SwordDivider';
import GemDivider from '../components/ui/GemDivider';
import ProclamationPlaque from '../components/ui/ProclamationPlaque';
import Button from '../components/ui/Button';
import FitText from '../components/ui/FitText';
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
  onOpenSortingQuiz: () => void;
  /** Opens the house archive modal (rendered at the App root, above the navbar). */
  onOpenLore: (house: ClubHouse) => void;
  userPledgedHouse: ClubHouse | null;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenSortingQuiz,
  onOpenLore,
  userPledgedHouse
}) => {
  /* PERF FIX: the countdown timer and its 1-second setInterval used to live
     right here, inside this 469-line component. Every tick re-rendered the
     whole homepage. It now lives in <LiveCountdown />, a tiny leaf component
     that re-renders on its own - see where <LiveCountdown /> is used below. */

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
        <div className="relative z-10 w-full min-w-0 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Fest Proclamation Plaque */}
          <ProclamationPlaque />

          {/* Main Fest Heading
              "CARNAVAL" and "DA CHITTAGONG COLLEGE" are auto-fitted so each
              line spans EXACTLY the length of the sword divider beneath it,
              on every device — the sword is the ruler of the title. */}
          <div className="hero-ruler w-full min-w-0 max-w-3xl mx-auto px-4 space-y-3">
            <h1 aria-label="Carnaval Da Chittagong College" className="font-got font-normal text-white tracking-[0.06em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <FitText as="span" max={168} min={20}>CARNAVAL</FitText>
            </h1>
            <SwordDivider className="!max-w-none !px-0 mt-1 mb-1" />
            {/* The right-to-left colour sweep, RESTORED. The old
                single-layer bg-clip-text + animated background-position
                went invisible in Instagram's in-app WebKit browser, so
                the sweep now lives on a ::before copy (data-text) laid
                over SOLID silver base text — if a browser drops the
                animated layer the words still render, never vanish.
                The breathing glow still animates on the wrapper. */}
            <p className="font-got font-normal text-white tracking-[0.06em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <FitText as="span" max={56} min={9}>
                <span>DA </span>
                <span className="frost-glow">
                  <span className="sweep-text whitespace-pre" data-text="CHITTAGONG">CHITTAGONG</span>
                </span>
                <span> </span>
                <span className="frost-glow">
                  <span className="sweep-text sweep-text-soft whitespace-pre" data-text="COLLEGE">COLLEGE</span>
                </span>
              </FitText>
            </p>
            <p className="font-garamond text-base sm:text-xl md:text-2xl text-[#8ce8f2] font-medium tracking-wide max-w-2xl mx-auto drop-shadow-md pt-2">
              &ldquo;Winter Is Coming &mdash; And When You Play The Game Of Thrones, You Win Or You Die.&rdquo;
            </p>
          </div>

          {/* User Pledged House Badge if available */}
          {userPledgedHouse && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-2/90 border border-[#5bc9d6]/50 text-[#bfe9e4] text-xs font-cinzel tracking-widest">
              <span className="w-6 h-6 rounded-md bg-white p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                <ResponsiveImg
                  src={userPledgedHouse.logo}
                  alt=""
                  sizes="40px"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
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
              variant="glass"
              mobileLabel="Explore"
              onClick={() => {
                onNavigate('segments');
              }}
            >
              Explore Tourneys
            </Button>

            {/* Sorting Quiz */}
            <Button
              variant="glass"
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
          <LiveCountdown />

        </div>
      </section>

      {/* ========================================================
          FAST STATS & CITADEL HERALDRY STRIP
      ======================================================== */}
      <section className="relative z-10 px-3 py-16 sm:px-6 md:py-24 lg:py-28">
        <StatsPanel />
      </section>

      {/* ========================================================
          ABOUT THE FEST SECTION
      ======================================================== */}
      <section className="relative py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-[#5bc9d6]/40 text-[#8ce8f2] text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-[#5bc9d6]" />
            The Saga Begins
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold silver-text tracking-wide">
            About the Fest
          </h2>
          <GemDivider className="py-1" />
        </div>

        <Reveal direction="flip" duration={1100}>
          <div className="scroll-panel mx-auto max-w-4xl px-2 py-2 sm:px-4 sm:py-2.5">
            <AboutFestPanel />
          </div>
        </Reveal>
      </section>

      {/* ========================================================
          THE FOUR GREAT HOUSES SECTION (CORE FESTIVAL IDENTITY)
      ======================================================== */}
      <section className="relative py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-[#5bc9d6]/40 text-[#8ce8f2] text-xs font-cinzel tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-[#5bc9d6]" />
            The Four Pillars of Chittagong College
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#dcefee] tracking-wide [text-shadow:0_2px_10px_rgba(0,0,0,0.7),0_0_30px_rgba(91,201,214,0.25)]">
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
            <Reveal key={house.id} delay={i * 100} className="h-full w-full max-w-[320px]">
              <HouseScroll
                logo={house.logo}
                name={house.name}
                houseName={house.houseName}
                motto={house.motto}
                lore={house.lore}
                links={house.links}
                tilt={HOUSE_TILT[i]}
                onViewLore={() => onOpenLore(house)}
              />
            </Reveal>
          ))}
        </div>

        {/* View All Clubs CTA */}
        <div className="text-center mt-12">
          <Button
            variant="glass"
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
      <section className="relative py-28 md:py-32 px-4 max-w-[88rem] mx-auto overflow-hidden">
        {/* ambient teal glow behind the grid */}
        <div className="absolute inset-x-0 top-1/3 h-[32rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(20,94,98,0.16),transparent_70%)] pointer-events-none" />


        {/* ---------- centered header ---------- */}
        <div className="relative text-center max-w-4xl mx-auto mb-16 space-y-4">
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


          {/* drop-shadow lives on this wrapper, not on the clip-text
              element itself — WebKit breaks filter + clip:text */}
          <div className="drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]">
            <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide silver-text uppercase">
              Featured Segments &amp; Arenas
            </h2>
          </div>


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
            variant="glass"
            size="sm"
            onClick={() => onNavigate('segments')}
          >
            View All Segments
          </Button>
        </div>


        {/* ---------- the writ plaques ---------- */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-14 xl:gap-9">
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
                  <div className="seg-card-inner flex flex-col p-4 xl:p-3.5">
                    {/* faint astrolabe sigil */}
                    <svg className="seg-sigil" viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
                      <circle cx="50" cy="50" r="46" strokeWidth="1" />
                      <circle cx="50" cy="50" r="34" strokeWidth="0.75" />
                      <circle cx="50" cy="50" r="10" strokeWidth="0.75" />
                      <path d="M50 2v96M2 50h96M16 16l68 68M84 16L16 84" strokeWidth="0.6" />
                      <path d="M50 30L70 50L50 70L30 50Z" strokeWidth="0.75" />
                    </svg>


                    {/* category, right-aligned with pip rule */}
                    <div className="relative z-10 flex flex-col items-end gap-1 mb-3">
                      <span className="font-cinzel text-[9px] font-semibold tracking-[0.28em] uppercase text-bone-dim">
                        {segment.category}
                      </span>
                      <span className="seg-cat-rule w-16" />
                    </div>


                    {/* title + got title */}
                    <h3 className="relative z-10 font-cinzel text-base xl:text-lg font-bold uppercase leading-tight text-gold-2 tracking-wide">
                      {segment.title}
                    </h3>
                    <p className="relative z-10 mt-1.5 font-garamond italic text-[12.5px] [font-variant:small-caps] tracking-wide text-bone-dim">
                      &ldquo;{segment.gotTitle}&rdquo;
                    </p>


                    {/* description */}
                    <p className="relative z-10 mt-2.5 font-sans text-[11px] leading-snug text-bone-dim/90">
                      {segment.description}
                    </p>


                    {/* footer */}
                    <div className="relative z-10 mt-auto pt-3">
                      <div className="h-px w-full bg-gradient-to-r from-iron/70 via-iron/40 to-transparent mb-2.5" />
                      <div className="flex items-center gap-2 text-bone">
                        <svg viewBox="0 0 12 12" className="h-2 w-2 text-[#5bc9d6]" aria-hidden="true">
                          <path d="M6 0.8L11.2 6L6 11.2L0.8 6Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase">
                          {segment.date}
                        </span>
                      </div>
                      <span className="seg-link mt-1.5">
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
      <section className="relative py-24 md:py-28 px-4 max-w-7xl mx-auto">
        <Reveal direction="zoom">
        <div className="tickify-frame relative overflow-hidden text-center max-w-4xl mx-auto px-6 py-8 md:px-10 md:py-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-[#5bc9d6]/45 text-[11px] font-cinzel uppercase tracking-widest mb-3">
            <Ticket className="w-3.5 h-3.5 text-[#5bc9d6]" />
            Official Ticketing Partner: Tickify
          </div>
          <h2 className="font-cinzel text-lg sm:text-2xl md:text-[1.7rem] font-extrabold text-white tracking-wide mb-2">
            SECURE YOUR WRIT OF ADMISSION ON TICKIFY
          </h2>
          <p className="font-sans text-xs md:text-sm text-bone-dim max-w-lg mx-auto mb-5">
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
          </div>
        </div>
        </Reveal>
      </section>

    </div>
  );
};
