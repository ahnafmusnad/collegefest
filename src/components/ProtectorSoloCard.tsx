import { Reveal } from './Reveal';
import { PROTECTOR_OF_THE_REALM } from '../data/festData';

/**
 * PROTECTOR OF THE REALM — solo high-seat card.
 * Replaces the old "Proclamation from the Office of the Convenor" panel.
 * One card, dead centre, nothing flanking it — wrapped in slow-turning
 * geometric sigils (rotating squares, diamond ring, crosshair hairlines,
 * pulsing corner gems) so it reads like a shrine, not a section.
 */
export default function ProtectorSoloCard() {
  const p = PROTECTOR_OF_THE_REALM;

  return (
    <section className="relative py-6 md:py-10 overflow-hidden">
      {/* ambient halo behind the shrine */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-crimson/10 blur-[130px] pointer-events-none" />

      {/* eyebrow — a proclamation line above the card */}
      <Reveal direction="down" className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-4">
          <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-iron" />
          <p className="font-cinzel text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-crimson-2">
            The High Seat of the Citadel
          </p>
          <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-iron" />
        </div>
      </Reveal>

      {/* the shrine itself */}
      <Reveal direction="zoom" duration={1100} className="relative z-10 mt-10 md:mt-14 px-4">
        <div className="relative max-w-[400px] mx-auto">

          {/* ---- orbiting geometry (behind the card) ---- */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            {/* outer square, turning slow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+110px)] aspect-square border border-iron/35 animate-rune-spin" />
            {/* second square, offset + counter-spinning */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+58px)] aspect-square border border-iron/25 rotate-45 animate-rune-spin-rev" />
            {/* hairline crosshairs */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[calc(100%+220px)] bg-gradient-to-r from-transparent via-iron/50 to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[calc(100%+180px)] bg-gradient-to-b from-transparent via-iron/50 to-transparent" />
          </div>

          {/* ---- corner gems of the orbit ---- */}
          {[
            'left-1/2 -top-7 -translate-x-1/2',
            'left-1/2 -bottom-7 -translate-x-1/2',
            '-left-7 top-1/2 -translate-y-1/2',
            '-right-7 top-1/2 -translate-y-1/2',
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`absolute ${pos} z-20 h-2.5 w-2.5 rotate-45 border border-gold-2/70 bg-ink animate-glow-pulse`}
            />
          ))}

          {/* ---- the card ---- */}
          <div className="frost-card relative border-2 border-iron/60 bg-ink-2 p-8 md:p-10 text-center overflow-visible">
            {/* inner hairline frame */}
            <div className="pointer-events-none absolute inset-2 border border-iron/30" aria-hidden="true" />

            {/* corner brackets */}
            <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-gold-2/70" aria-hidden="true" />
            <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-gold-2/70" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-gold-2/70" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-2/70" aria-hidden="true" />

            {/* monogram sigil: circle ring inside a rotating diamond */}
            <div className="relative mx-auto mb-7 h-28 w-28 md:h-32 md:w-32">
              <div className="absolute inset-0 rotate-45 border border-gold-2/50" aria-hidden="true" />
              <div className="absolute inset-2 rotate-45 border border-iron/60" aria-hidden="true" />
              <div className="absolute inset-0 rounded-full border border-gold-2/40 animate-rune-spin-rev" style={{ borderStyle: 'dashed' }} aria-hidden="true" />
              <div className="absolute inset-[10px] rounded-full border border-iron/50 bg-gradient-to-br from-ink-2 via-ink-3/50 to-ink flex items-center justify-center">
                <span className="font-cinzel-dec text-4xl md:text-[44px] font-black text-gold-2 drop-shadow-[0_0_22px_rgba(216,222,217,0.28)]">
                  MI
                </span>
              </div>
              {/* crown notch */}
              <svg viewBox="0 0 24 24" className="absolute -top-4 left-1/2 -translate-x-1/2 h-5 w-5 text-gold-2" fill="currentColor" aria-hidden="true">
                <path d="M2.5 18.5h19v2h-19zM2 7l4.6 3.4L12 4l5.4 6.4L22 7l-1.6 9H3.6z" />
              </svg>
            </div>

            {/* titles */}
            <p className="font-cinzel text-[9px] md:text-[10px] tracking-[0.52em] uppercase text-crimson-2">
              By Decree of the Citadel
            </p>
            <h2 className="mt-3 font-cinzel text-2xl md:text-[27px] font-bold tracking-[0.14em] uppercase text-gold-2 st-title">
              {p.gotTitle}
            </h2>

            {/* diamond divider */}
            <div className="mt-4 mb-5 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-2/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-crimson-2 animate-glow-pulse" />
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-2/60" />
            </div>

            {/* the man himself */}
            <h3 className="font-cinzel text-lg md:text-xl font-semibold text-white leading-snug">
              {p.name}
            </h3>
            <p className="mt-2 font-garamond italic text-bone-dim text-sm md:text-base">
              {p.modernRole}
            </p>

            {/* his words, kept */}
            <p className="mt-6 font-garamond italic text-bone-dim text-[13px] md:text-sm leading-relaxed">
              &ldquo;{p.quote}&rdquo;
            </p>

            {/* allegiance chip */}
            <p className="mt-7 inline-block border border-gold-2/40 bg-ink/80 px-4 py-2 font-cinzel text-[9px] md:text-[10px] tracking-[0.26em] uppercase text-bone">
              {p.houseAllegiance}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
