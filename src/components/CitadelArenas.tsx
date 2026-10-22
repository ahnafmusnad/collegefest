import { useCallback, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { ChevronDown, Gem, MapPin, Ticket, X } from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../data/festData';
import type { CampusLocation } from '../types';
import { Reveal } from './Reveal';
import {
  BannerCap,
  CornerFlourish,
  FlourishDivider,
  KeepSilhouette,
  NotchDiamond,
  PlaqueFrame,
  Sparkle,
  TabletFrame,
} from './ArenaOrnaments';


/* Roman numeral + rune are added automatically by venue order */
const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const RUNES = ['ᚠ', 'ᚦ', 'ᚱ', 'ᚲ', 'ᛗ', 'ᚨ', 'ᚹ', 'ᛉ', 'ᛋ', 'ᛏ'];


type ArenaLocation = CampusLocation & { numeral: string; rune: string };


const ARENAS: ArenaLocation[] = CAMPUS_LOCATIONS.map((l, i) => ({
  ...l,
  numeral: NUMERALS[i] ?? String(i + 1),
  rune: RUNES[i] ?? 'ᛟ',
}));


/* TILT — the tablet leans toward the hand */
function useTilt<T extends HTMLElement>(max = 5, scale = 1.02) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)');


  const onMove = useCallback(
    (e: ReactMouseEvent<T>) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setTransform(
        `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg) scale(${scale})`
      );
    },
    [max, scale]
  );


  const onLeave = useCallback(() => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);


  return { ref, transform, onMove, onLeave };
}


/* THE REALM MINI-MAP — carved survey of the grounds */
function RealmMap({ active }: { active: ArenaLocation }) {
  return (
    <svg viewBox="0 0 100 72" className="h-full w-full" aria-hidden>
      <rect x="1.5" y="1.5" width="97" height="69" fill="rgba(2,10,11,0.55)" stroke="#2f5557" strokeWidth="1" />
      <rect x="5" y="5" width="90" height="62" fill="none" stroke="#2f5557" strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity="0.6" />
      {[25, 50, 75].map((x) => (
        <line key={`v${x}`} x1={x} y1="5" x2={x} y2="67" stroke="#2f5557" strokeWidth="0.35" opacity="0.5" />
      ))}
      {[22, 44].map((y) => (
        <line key={`h${y}`} x1="5" y1={y} x2="95" y2={y} stroke="#2f5557" strokeWidth="0.35" opacity="0.5" />
      ))}
      <polyline
        points={ARENAS.map((l) => `${l.coordinates.x},${6 + (l.coordinates.y / 100) * 60}`).join(' ')}
        fill="none"
        stroke="#1f8f96"
        strokeWidth="0.7"
        strokeDasharray="2 2"
        opacity="0.55"
      />
      {ARENAS.map((l) => {
        const cx = l.coordinates.x;
        const cy = 6 + (l.coordinates.y / 100) * 60;
        const isActive = l.id === active.id;
        return (
          <g key={l.id}>
            {isActive && (
              <circle cx={cx} cy={cy} r="2" fill="none" stroke="#9fe0d4" strokeWidth="0.8">
                <animate attributeName="r" values="2;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <path
              d={`M${cx} ${cy - 2.4} L${cx + 2.4} ${cy} L${cx} ${cy + 2.4} L${cx - 2.4} ${cy} Z`}
              fill={isActive ? '#9fe0d4' : '#145e62'}
              stroke={isActive ? '#f8f8f8' : '#1f8f96'}
              strokeWidth={isActive ? 0.7 : 0.5}
            />
          </g>
        );
      })}
      <text x="7" y="11" fill="#7f8a8a" fontSize="4" fontFamily="Cinzel, serif" letterSpacing="1">
        THE CITADEL
      </text>
    </svg>
  );
}


/* VENUE TABLET — heraldic stone entry */
function VenueTablet({
  loc,
  selected,
  expanded,
  onSelect,
}: {
  loc: ArenaLocation;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
}) {
  const { ref, transform, onMove, onLeave } = useTilt<HTMLButtonElement>(4.5, selected ? 1.015 : 1.03);


  return (
    <button
      ref={ref}
      onClick={onSelect}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-pressed={selected}
      aria-expanded={expanded}
      aria-controls={`arena-record-${loc.id}`}
      className={`arena-tilt arena-sheen group relative block w-full py-5 text-left transition-[filter,transform] duration-300 ease-out ${
        selected ? 'z-10' : ''
      }`}
      style={{ transform }}
    >
      <TabletFrame active={selected} />
      <div className="arena-stone" style={{ opacity: 0.14 }} />


      {/* notch diamonds seated on the border lines */}
      <NotchDiamond className="left-[13.9%] top-[11.5%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-1/2 top-[11.5%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-[86.1%] top-[11.5%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-[13.9%] bottom-[11.5%] -translate-x-1/2 translate-y-1/2" />
      <NotchDiamond className="left-1/2 bottom-[11.5%] -translate-x-1/2 translate-y-1/2" />
      <NotchDiamond className="left-[86.1%] bottom-[11.5%] -translate-x-1/2 translate-y-1/2" />


      {/* twinkle at the flared ends */}
      <Sparkle className="left-[5.5%] w-3.5" delay={`${(loc.numeral.charCodeAt(0) % 5) * 0.6}s`} />
      <Sparkle className="right-[5.5%] w-3.5" delay="1.3s" />


      {/* faint rune chiseled behind the name */}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-[14%] top-1/2 -translate-y-1/2 select-none font-garamond text-[64px] leading-none transition-all duration-500 ${
          selected ? 'text-teal-glow/25' : 'text-teal-glow/10 group-hover:text-teal-glow/20'
        }`}
      >
        {loc.rune}
      </span>


      <span className="relative z-10 flex items-center justify-between gap-3 px-[11%]">
        <span className="min-w-0">
          <span className="flex items-baseline gap-2.5">
            <span className={`font-cinzel text-[11px] transition-colors duration-300 ${selected ? 'text-mint' : 'text-ash'}`}>
              {loc.numeral}.
            </span>
            <span
              className={`truncate font-cinzel text-[15px] font-semibold tracking-[0.12em] transition-all duration-300 ${
                selected
                  ? 'text-silver'
                  : 'text-bone group-hover:text-silver'
              }`}
            >
              {loc.name}
            </span>
          </span>
          <span className="mt-1 block pl-6 font-garamond text-[16px] italic leading-snug text-bone-dim">
            “{loc.gotAlias}”
          </span>
        </span>


        <span
          className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            selected
              ? 'border-mint/70 bg-teal-glow/20 text-mint'
              : 'border-iron text-bone-dim group-hover:border-teal-glow/60 group-hover:text-teal-glow'
          }`}
        >
          <MapPin className="hidden h-4 w-4 lg:block" />
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 lg:hidden ${expanded ? 'rotate-180' : ''}`} />
        </span>
      </span>
    </button>
  );
}


/* BANNER BUTTON — ribbon with cracked stone caps */
function BannerButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-12 items-stretch transition-all duration-300 hover:drop-shadow-[0_0_22px_rgba(31,143,150,0.55)]"
    >
      <BannerCap />
      <span className="arena-banner-body flex items-center gap-2 px-4 font-cinzel text-[10px] font-bold tracking-[0.2em] text-mint transition-colors duration-300 group-hover:text-silver sm:gap-2.5 sm:px-8 sm:text-[11px] sm:tracking-[0.28em]">
        <Ticket className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
        {label}
      </span>
      <BannerCap right />
    </button>
  );
}


/* THE GREAT PLAQUE — detail of the chosen arena */
function DetailPlaque({
  loc,
  onBook,
  onClose,
}: {
  loc: ArenaLocation;
  onBook: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="relative">
      <div className="arena-sweep arena-sheen relative">
        <PlaqueFrame />
        <div className="arena-stone" />
        <span className="arena-sweep-beam" />


        {/* vast faded rose behind the text */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] text-teal-glow opacity-[0.05]"
        >
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.6" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
          {[0, 45, 90, 135].map((d) => (
            <g key={d} transform={`rotate(${d} 50 50)`}>
              <path d="M50 4 L53 50 L50 47 L47 50 Z" fill="currentColor" />
            </g>
          ))}
        </svg>


        {/* battlement watermark in the base */}
        <KeepSilhouette className="pointer-events-none absolute bottom-2 right-8 h-7 w-28 text-ink-3/80" />


        <div key={loc.id} className="arena-plaque-in relative z-10 p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-iron bg-ink/70 px-4 py-1.5 font-cinzel text-[10px] tracking-[0.32em] text-mint">
                  <MapPin className="h-3.5 w-3.5" />
                  SELECTED VENUE
                </span>
                {onClose && (
                  <button
                    onClick={onClose}
                    aria-label="Fold arena record"
                    className="grid h-8 w-8 shrink-0 place-items-center border border-iron text-bone-dim transition-colors hover:border-mint/60 hover:text-mint lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>


              <h3 className="mt-5 font-cinzel-dec text-3xl font-bold text-silver drop-shadow-[0_0_22px_rgba(248,248,248,0.22)] sm:text-[42px] sm:leading-[1.1]">
                {loc.name}
              </h3>
              <p className="mt-2 font-garamond text-lg italic text-mint/90 sm:text-xl">
                The Citadel Alias: <span className="text-bone">“{loc.gotAlias}”</span>
              </p>
            </div>


            <div className="relative h-[120px] w-full shrink-0 md:w-[190px]">
              <RealmMap active={loc} />
            </div>
          </div>


          <p className="mt-6 max-w-2xl font-sans text-[16px] font-light leading-relaxed text-bone">
            {loc.description}
          </p>


          <div className="mt-7">
            <p className="flex items-center gap-2.5 font-cinzel text-[11px] font-semibold tracking-[0.3em] text-bone-dim">
              <Gem className="h-3.5 w-3.5 text-teal-glow" />
              TOURNAMENTS HOSTED HERE:
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {loc.eventsHosted.map((e) => (
                <span
                  key={e}
                  className="group/chip cursor-default border border-iron bg-ink-3/60 px-3.5 py-2 font-sans text-sm text-bone transition-all duration-300 hover:border-teal-glow/70 hover:bg-teal-glow/10 hover:text-silver"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal-glow align-middle transition-transform duration-300 group-hover/chip:scale-150" />
                  {e}
                </span>
              ))}
            </div>
          </div>


          <FlourishDivider className="mt-8 h-4 w-full text-iron" />


          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm text-ash">
              Location Coordinates: <span className="text-bone-dim">Chittagong College Heritage Campus</span>
              <span className="ml-2 font-cinzel text-[11px] tracking-[0.2em] text-teal-glow">
                · GRID {loc.coordinates.x} / {loc.coordinates.y}
              </span>
            </p>
            <BannerButton label="BOOK EVENT PASS" onClick={onBook} />
          </div>
        </div>
      </div>


      {/* scrolled fleurons at the four chamfers */}
      <CornerFlourish className="left-1.5 top-1.5 hidden sm:block" />
      <CornerFlourish className="right-1.5 top-1.5 hidden -scale-x-100 sm:block" />
      <CornerFlourish className="bottom-1.5 right-1.5 hidden -scale-x-100 -scale-y-100 sm:block" />
      <CornerFlourish className="bottom-1.5 left-1.5 hidden -scale-y-100 sm:block" />


      {/* gems set along the border */}
      <NotchDiamond className="left-1/4 top-[1%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-1/2 top-[1%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-3/4 top-[1%] -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="left-1/4 bottom-[1%] -translate-x-1/2 translate-y-1/2" />
      <NotchDiamond className="left-1/2 bottom-[1%] -translate-x-1/2 translate-y-1/2" />
      <NotchDiamond className="left-3/4 bottom-[1%] -translate-x-1/2 translate-y-1/2" />
      <NotchDiamond className="left-[0.7%] top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <NotchDiamond className="right-[0.7%] top-1/2 translate-x-1/2 -translate-y-1/2" />


      <Sparkle className="hidden left-[7%] top-7 w-4 sm:block" delay="0.4s" />
      <Sparkle className="hidden right-[7%] top-7 w-4 sm:block" delay="1.8s" />
    </div>
  );
}


/* THE SECTION */
export default function CitadelArenas({ onBook }: { onBook: () => void }) {
  /* null = every arena record folded away (the mobile / tablet default) */
  const [openId, setOpenId] = useState<string | null>(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
      ? ARENAS[0].id
      : null
  );


  /* phones & tablets fold/unfold; desktop simply swaps the great plaque */
  const select = (id: string) => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    setOpenId((prev) => (isDesktop ? id : prev === id ? null : id));
  };


  /* on desktop the great plaque always shows a record */
  const active = ARENAS.find((l) => l.id === openId) ?? ARENAS[0];


  return (
    <section id="arenas" className="relative py-6 sm:py-10">
      {/* header */}
      <Reveal className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-iron bg-ink-2/70 px-5 py-2 font-cinzel text-[10px] tracking-[0.38em] text-mint">
          <MapPin className="h-3.5 w-3.5" />
          GEOGRAPHY OF THE CITADEL
        </span>


        <h2 className="mt-7 font-cinzel-dec text-4xl font-black leading-tight text-silver drop-shadow-[0_0_30px_rgba(31,143,150,0.35)] sm:text-5xl lg:text-6xl">
          Campus Arenas
          <span className="mx-3 inline-block text-teal-glow">&</span>
          Landmarks
        </h2>


        <FlourishDivider className="mx-auto mt-6 h-5 w-72 text-iron sm:w-96" />


        <p className="mx-auto mt-5 max-w-xl font-sans text-base font-light text-bone-dim sm:text-lg">
          Explore key tournament venues situated across Chittagong College’s historic grounds.
        </p>


        {/* unrolling hint, phones & tablets only */}
        <p className="mt-4 flex items-center justify-center gap-2 font-garamond text-base italic text-ash lg:hidden">
          <ChevronDown className="h-4 w-4 text-teal-glow" />
          Tap a landmark to unroll its record
        </p>
      </Reveal>


      {/* the survey: tablets + great plaque */}
      <div className="mt-12 grid gap-7 sm:mt-16 lg:grid-cols-[minmax(320px,400px)_1fr] lg:gap-8">
        <Reveal delay={120}>
          <div className="flex flex-col gap-5">
            {ARENAS.map((loc) => {
              const isOpen = openId === loc.id;
              return (
                <div key={loc.id}>
                  <VenueTablet
                    loc={loc}
                    selected={isOpen}
                    expanded={isOpen}
                    onSelect={() => select(loc.id)}
                  />


                  {/* phones & tablets: the record unrolls beneath its own tablet */}
                  <div
                    id={`arena-record-${loc.id}`}
                    inert={!isOpen}
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
                      isOpen ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className={`overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}>
                      <DetailPlaque loc={loc} onBook={onBook} onClose={() => setOpenId(null)} />
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="mt-1 text-center font-garamond text-base italic text-ash">
              “What is claimed by the Citadel must be defended.”
            </p>
          </div>
        </Reveal>


        {/* desktop: the record always rests in the great plaque */}
        <Reveal delay={220} className="hidden lg:block">
          <div className="lg:min-h-[520px]">
            <DetailPlaque loc={active} onBook={onBook} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
