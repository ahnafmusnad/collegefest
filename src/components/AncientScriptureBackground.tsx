import { useEffect, useMemo, useRef } from 'react';


/* ============================================================
   ANCIENT SCRIPTURE BACKGROUND — "The Maester's Palimpsest"
   ------------------------------------------------------------
   Replaces the old grid-box background. The whole site now sits
   on a page of forgotten scripture:


   1. Vertical Elder Futhark rune columns at the page margins,
      lit by a slow candlelight sheen that sweeps up through them.
   2. A vast, barely-there Valyrian ritual sigil-ring rotating
      behind everything (rune rim + curved lore inscription).
   3. Ghost fragments of ancient writing — house words and the
      Night's Watch oath — scattered like a maester's marginalia.
   4. Parchment grain, cold mist and a vignette to hold focus.


   Everything is fixed, pointer-transparent and very low opacity
   so content always leads. All placement is deterministic.
   ============================================================ */


/* Hand-drawn Elder Futhark glyphs in a 20x28 box (stroke paths).
   Drawn as SVG so they render identically on every device —
   no dependency on Unicode rune font support. */
const RUNE_PATHS: string[] = [
  'M10 2 V26 M10 6 L17 11 M10 13 L17 18',                    // fehu
  'M4 2 L4 26 M4 2 L16 6 L16 26',                            // uruz
  'M5 2 V26 M5 8 L15 14 L5 20',                              // thurisaz
  'M5 2 V26 M5 6 L15 12 M5 14 L15 20',                       // ansuz
  'M5 2 V26 M5 2 L15 8 L5 14',                               // raido
  'M14 2 L6 14 L14 26',                                      // kenaz
  'M4 2 L16 26 M16 2 L4 26',                                 // gebo
  'M5 2 V26 M5 2 L14 6 V13 L5 13',                           // wunjo
  'M4 2 V26 M16 2 V26 M4 8 L16 20',                          // hagalaz
  'M10 2 V26 M4 8 L16 20',                                   // naudiz
  'M10 2 V26',                                               // isa
  'M16 2 L6 12 M4 16 L14 26',                                // jera
  'M5 2 V26 M15 2 V26 M5 7 L15 12 M5 21 L15 16',             // ehwaz
  'M5 2 V26 M5 2 L14 8 L5 14 M5 14 L14 20 L5 26',            // berkanan
  'M4 2 V26 M16 2 V26 M4 2 L16 26 M16 2 L4 26',              // mannaz
  'M6 2 V26 M6 2 L15 8',                                     // laguz
  'M3 2 L17 14 L3 26 M17 2 L3 14 L17 26',                    // dagaz
  'M10 2 L17 9 L10 16 L3 9 Z M3 16 L10 26 M17 16 L10 26',    // othalan
];


/* Tiny deterministic PRNG so rune sequences never reshuffle on re-render */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


/* One rune glyph */
function Rune({ d, x, y, rotate = 0, scale = 1 }: { d: string; x: number; y: number; rotate?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 10 14) scale(${scale})`}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="miter" />
    </g>
  );
}


/* A vertical column of runes — like marginalia in an ancient tome */
function RuneColumn({ seed, count, className }: { seed: number; count: number; className?: string }) {
  const runes = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      d: RUNE_PATHS[Math.floor(rand() * RUNE_PATHS.length)],
      tint: rand() < 0.24, // roughly a quarter glow teal, the rest silver
      y: i * 34,
    }));
  }, [seed, count]);


  return (
    <div className={`rune-col ${className ?? ''}`}>
      <svg width="20" height={count * 34} viewBox={`0 0 20 ${count * 34}`} aria-hidden="true">
        {runes.map((r, i) => (
          <g key={i} color={r.tint ? 'rgba(47,168,176,0.5)' : 'rgba(201,210,210,0.55)'}>
            <Rune d={r.d} x={0} y={r.y} />
          </g>
        ))}
      </svg>
      <div className="rune-col-sheen" />
    </div>
  );
}


/* The great Valyrian ritual ring behind everything */
function SigilRing() {
  const rimRunes = useMemo(() => {
    const rand = mulberry32(777);
    return Array.from({ length: 28 }, (_, i) => ({
      d: RUNE_PATHS[Math.floor(rand() * RUNE_PATHS.length)],
      angle: (360 / 28) * i,
    }));
  }, []);


  const ticks = useMemo(
    () =>
      Array.from({ length: 72 }, (_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const long = i % 6 === 0;
        const r1 = long ? 226 : 232;
        const r2 = 240;
        return {
          x1: Math.cos(a) * r1, y1: Math.sin(a) * r1,
          x2: Math.cos(a) * r2, y2: Math.sin(a) * r2,
        };
      }),
    []
  );


  return (
    <div className="scripture-ring-wrap">
      <svg viewBox="-300 -300 600 600" className="scripture-ring-outer" aria-hidden="true">
        {/* outer rune rim — rotates with the ring */}
        <circle r="252" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle r="218" fill="none" stroke="currentColor" strokeWidth="0.75" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="currentColor" strokeWidth={i % 6 === 0 ? 1.2 : 0.5} />
        ))}
        {rimRunes.map((r, i) => (
          <g key={i} transform={`rotate(${r.angle}) translate(-10 -246) scale(1.05)`}>
            <path d={r.d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </g>
        ))}
        {/* curved lore inscription */}
        <defs>
          <path id="sigil-text-path" d="M -172 0 A 172 172 0 1 1 172 0 A 172 172 0 1 1 -172 0" fill="none" />
        </defs>
        <text fontSize="14" letterSpacing="5" fill="currentColor" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}>
          <textPath href="#sigil-text-path">
            VALAR MORGHULIS · VALAR DOHAERIS · WINTER IS COMING · THE NORTH REMEMBERS ·
          </textPath>
        </text>
      </svg>


      {/* inner star — counter-rotates for a slow arcane machinery feel */}
      <svg viewBox="-300 -300 600 600" className="scripture-ring-inner" aria-hidden="true">
        <circle r="128" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <circle r="58" fill="none" stroke="currentColor" strokeWidth="0.75" />
        {[0, 45, 90, 135].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="0" y1="-128" x2="0" y2="128" stroke="currentColor" strokeWidth="0.6" />
            <path d="M 0 -128 L 10 -112 L 0 -96 L -10 -112 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          </g>
        ))}
        <path d="M 0 -58 L 41 41 L -41 41 Z M 0 58 L 41 -41 L -41 -41 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  );
}


/* Ghost fragments of ancient writing scattered like marginalia.
   Positions hug the viewport edges so body content stays clean. */
interface Fragment {
  text: string;
  sub?: string;
  x: string;
  y: string;
  rotate: number;
  size: string;
  font: 'medieval' | 'garamond';
  teal?: boolean;
  delay: string;
  duration: string;
  hideOnMobile?: boolean;
}


const FRAGMENTS: Fragment[] = [
  { text: 'Valar Morghulis', sub: 'all men must die', x: '4%', y: '13%', rotate: -5, size: '1.35rem', font: 'medieval', teal: true, delay: '0s', duration: '17s' },
  { text: 'Night gathers, and now my watch begins', x: '3%', y: '38%', rotate: -90, size: '0.95rem', font: 'garamond', delay: '2.5s', duration: '21s', hideOnMobile: true },
  { text: 'What is dead may never die', x: '5%', y: '78%', rotate: 3, size: '1.05rem', font: 'garamond', delay: '1.2s', duration: '19s' },
  { text: 'Winter is Coming', x: '84%', y: '9%', rotate: 4, size: '1.3rem', font: 'medieval', delay: '0.8s', duration: '18s' },
  { text: 'The night is dark and full of terrors', x: '88%', y: '34%', rotate: 90, size: '0.95rem', font: 'garamond', teal: true, delay: '3.4s', duration: '23s', hideOnMobile: true },
  { text: 'Hear me roar', x: '87%', y: '60%', rotate: -4, size: '1rem', font: 'medieval', delay: '2s', duration: '16s', hideOnMobile: true },
  { text: 'Fire & Blood', x: '80%', y: '86%', rotate: -6, size: '1.2rem', font: 'medieval', teal: true, delay: '1.6s', duration: '20s' },
  { text: 'A Lannister always pays his debts', x: '28%', y: '93%', rotate: 2, size: '0.9rem', font: 'garamond', delay: '4s', duration: '22s', hideOnMobile: true },
  { text: 'Unbowed · Unbent · Unbroken', x: '30%', y: '5%', rotate: -2, size: '0.9rem', font: 'garamond', teal: true, delay: '0.4s', duration: '24s', hideOnMobile: true },
  { text: 'Growing strong', x: '58%', y: '95%', rotate: 3, size: '0.95rem', font: 'medieval', delay: '3s', duration: '17s', hideOnMobile: true },
];


/* The Night's Watch oath — true scripture, set as faint vertical columns */
const OATH_LINES = [
  'I shall take no wife, hold no lands, father no children',
  'I shall wear no crowns and win no glory',
  'I am the sword in the darkness',
  'I am the watcher on the walls',
  'I am the shield that guards the realms of men',
  'I pledge my life and honor to the Night\u2019s Watch',
];


export function AncientScriptureBackground() {
  /* PERF: the ambient loops (ring rotation, mist drift, rune sheens,
     fragment pulses) force the compositor to re-blend this large fixed
     isolation group every frame. On a 1080p desktop that cost ~40fps of
     scroll headroom. While the user scrolls we pause every animation so
     the background becomes a static, cacheable layer; 180ms after the
     scroll settles the machinery quietly resumes. */
  const rootRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let timer = 0;
    const onScroll = () => {
      root.dataset.scrolling = '1';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        delete root.dataset.scrolling;
      }, 180);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);


  return (
    <div ref={rootRef} className="scripture-bg" aria-hidden="true">
      {/* parchment grain + cold mist + vignette */}
      <div className="scripture-mist" />


      {/* the great ritual ring */}
      <SigilRing />


      {/* rune marginalia columns along the page edges */}
      <RuneColumn seed={11} count={19} className="rune-col-left" />
      <RuneColumn seed={47} count={16} className="rune-col-left-inner" />
      <RuneColumn seed={83} count={19} className="rune-col-right" />
      <RuneColumn seed={129} count={15} className="rune-col-right-inner" />


      {/* the maester's oath, written vertically */}
      <div className="oath-columns">
        {OATH_LINES.map((line, i) => (
          <span key={i} className="oath-line" style={{ animationDelay: `${i * 1.7}s` }}>
            {line}
          </span>
        ))}
      </div>


      {/* scattered scripture fragments */}
      {FRAGMENTS.map((f, i) => (
        <span
          key={i}
          className={`scripture-fragment ${f.font === 'medieval' ? 'font-medieval' : 'font-garamond'} ${f.teal ? 'is-teal' : ''} ${f.hideOnMobile ? 'hidden lg:block' : ''}`}
          style={{
            left: f.x,
            top: f.y,
            fontSize: f.size,
            transform: `rotate(${f.rotate}deg)`,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.text}
          {f.sub && <em className="scripture-fragment-sub">{f.sub}</em>}
        </span>
      ))}


      {/* focus vignette on top of everything */}
      <div className="scripture-vignette" />
    </div>
  );
}


export default AncientScriptureBackground;
