import { Fragment } from "react";
import { Landmark, Swords, Trophy, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
/* ============================================================
   THE REALM IN NUMBERS — a single hanging tapestry
   One wide cloth suspended from an iron rod, carrying all
   four proclamations of the realm. No glare — just cloth
   that sways gently and lifts toward the viewer on hover.
   ============================================================ */
const STATS = [
  {
    icon: Landmark,
    end: 4,
    label: "Great College Houses",
    flavor: "sworn to the winter fest",
    accent: "#1f8f96",
    format: undefined as ((v: number) => string) | undefined,
  },
  {
    icon: Swords,
    end: 8,
    label: "Competitive Segments",
    flavor: "battles of wit & might",
    accent: "#d8ded9",
    format: undefined as ((v: number) => string) | undefined,
  },
  {
    icon: Trophy,
    end: 150,
    label: "BDT Prize Vault",
    flavor: "gold for the victorious",
    accent: "#9fe0d4",
    format: (v: number) => `${v}K+`,
  },
  {
    icon: Users,
    end: 1,
    label: "Digital Reach",
    flavor: "souls across the realm",
    accent: "#9e9f9f",
    format: (v: number) => `${v}M+`,
  },
];
/* Cloth silhouette: a wide banner with a shallow forked hem.
   Drawn as stretched SVG with non-scaling strokes so the
   embroidery stays crisp at any size. */
const TapestryFrame = () => (
  <svg
    viewBox="0 0 1000 320"
    preserveAspectRatio="none"
    className="absolute inset-0 h-full w-full"
    aria-hidden="true"
  >
    {/* outer embroidered edge */}
    <path
      d="M4 4 H996 V298 L500 274 L4 298 Z"
      fill="none"
      stroke="#1f8f96"
      strokeOpacity="0.55"
      strokeWidth="1.5"
      vectorEffect="non-scaling-stroke"
      className="ns-frame-edge"
    />
    {/* inner stitched border */}
    <path
      d="M14 14 H986 V288 L500 266 L14 288 Z"
      fill="none"
      stroke="#d8ded9"
      strokeOpacity="0.16"
      strokeWidth="1"
      strokeDasharray="6 5"
      vectorEffect="non-scaling-stroke"
    />
    {/* corner studs */}
    {[
      [4, 4],
      [996, 4],
    ].map(([x, y], i) => (
      <rect
        key={i}
        x={x - 4}
        y={y - 4}
        width="8"
        height="8"
        transform={`rotate(45 ${x} ${y})`}
        fill="#1f8f96"
        fillOpacity="0.8"
      />
    ))}
  </svg>
);
/* Ornamental divider between proclamations */
const Divider = () => (
  <div className="hidden md:flex w-px flex-col items-center justify-center self-stretch py-3 lg:py-6" aria-hidden="true">
    <span className="w-px flex-1 bg-gradient-to-b from-transparent via-[#2f5557] to-transparent" />
    <span className="my-3 h-1.5 w-1.5 rotate-45 bg-[#17686e]" />
    <span className="w-px flex-1 bg-gradient-to-b from-transparent via-[#2f5557] to-transparent" />
  </div>
);
export default function StatsPanel() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* ---- heraldic overline ---- */}
      <Reveal direction="down" className="mb-6 md:mb-8 lg:mb-12">
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <span className="ns-rule" aria-hidden="true" />
          <span className="ns-diamond" aria-hidden="true" />
          <h2 className="font-cinzel text-[11px] md:text-sm lg:text-base font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] text-gold-2 whitespace-nowrap">
            The Realm in Numbers
          </h2>
          <span className="ns-diamond" aria-hidden="true" />
          <span className="ns-rule" aria-hidden="true" />
        </div>
        <p className="mt-2 text-center font-garamond italic text-bone-dim text-xs md:text-sm lg:mt-3 lg:text-base">
          “Four measures of a kingdom’s glory, raised before the gates.”
        </p>
      </Reveal>
      {/* ---- rod + the single hanging tapestry ---- */}
      <div className="relative">
        {/* forged iron rod */}
        <div className="ns-rod absolute left-2 right-2 top-[7px] h-[7px] rounded-full md:left-6 md:right-6" aria-hidden="true" />
        {/* finials */}
        <span className="ns-finial -left-0.5 md:left-3.5" aria-hidden="true" />
        <span className="ns-finial -right-0.5 md:right-3.5" aria-hidden="true" />
        {/* hanging rings — one near each end of the cloth */}
        <span className="ns-ring absolute left-[12%] top-[3px] z-10 md:left-[14%]" aria-hidden="true" />
        <span className="ns-ring absolute right-[12%] top-[3px] z-10 md:right-[14%]" aria-hidden="true" />
        <Reveal direction="drop" delay={120}>
          <div className="ns-tapestry-wrap relative mt-3">
            <div className="ns-sway relative">
              {/* the cloth — clipped to the forked silhouette */}
              <div className="ns-tapestry relative">
                <TapestryFrame />
                {/* ---- the four proclamations, one cloth ---- */}
                <div className="relative grid grid-cols-2 px-3 pb-8 pt-5 md:flex md:items-stretch md:px-5 md:pb-10 md:pt-6 lg:px-8 lg:pb-16 lg:pt-9">
                  {STATS.map((s, i) => (
                    <Fragment key={s.label}>
                      {i > 0 && <Divider />}
                      <div
                        className={`group/stat relative flex flex-col items-center gap-1 px-1.5 py-3 text-center md:flex-1 md:py-1.5 lg:gap-1.5 lg:py-2 ${
                          i % 2 === 1 ? "border-l border-[#2f5557]/40 md:border-l-0" : ""
                        } ${i >= 2 ? "border-t border-[#2f5557]/40 md:border-t-0" : ""}`}
                      >
                        {/* sigil medallion */}
                        <div
                          className="ns-medallion flex h-9 w-9 items-center justify-center rounded-full md:h-10 md:w-10 lg:h-13 lg:w-13"
                          style={{ borderColor: s.accent, color: s.accent }}
                        >
                          <s.icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.6} aria-hidden="true" />
                        </div>
                        {/* counting numeral */}
                        <div
                          className="mt-1.5 text-2xl font-semibold leading-none text-white md:mt-2 md:text-3xl lg:text-5xl"
                          style={{
                            fontFamily: '"EB Garamond", Georgia, serif',
                            textShadow: "0 2px 5px rgba(0, 0, 0, 0.55)",
                          }}
                        >
                          <CountUp end={s.end} duration={1800} delay={i * 130} format={s.format} />
                        </div>
                        {/* proclamation */}
                        <div className="mt-1 font-cinzel text-[8px] font-bold uppercase tracking-[0.14em] text-bone md:tracking-[0.2em] lg:mt-1.5 lg:text-[10.5px]">
                          {s.label}
                        </div>
                        <span
                          className="block h-1 w-1 rotate-45"
                          style={{ background: s.accent, opacity: 0.8 }}
                          aria-hidden="true"
                        />
                        <div className="hidden font-garamond text-[10px] italic leading-snug text-bone-dim sm:block lg:text-[11px]">
                          {s.flavor}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
              {/* corner tassels hanging from the hem */}
              <span className="ns-tassel left-[2%] top-[92%]" aria-hidden="true" />
              <span className="ns-tassel right-[2%] top-[92%]" aria-hidden="true" />
              <span className="ns-tassel left-1/2 top-[85%] -translate-x-1/2" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
