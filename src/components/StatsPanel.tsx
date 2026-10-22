import React from "react";
import { Landmark, Swords, Trophy, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";


const STATS = [
  { icon: Landmark, end: 4, label: "Great College Houses", format: undefined as ((v: number) => string) | undefined },
  { icon: Swords, end: 8, label: "Competitive Segments", format: undefined as ((v: number) => string) | undefined },
  { icon: Trophy, end: 150, label: "BDT Prize Vault", format: (v: number) => `${v}K+` },
  { icon: Users, end: 1, label: "Digital Reach", format: (v: number) => `${v}M+` },
];


const CornerBracket = ({ className }: { className: string }) => (
  <svg viewBox="0 0 26 26" className={`sp-bracket ${className}`} fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M2 15 V2 H15" strokeWidth="1" />
    <rect x="0.4" y="15.4" width="3.2" height="3.2" transform="rotate(45 2 17)" fill="currentColor" stroke="none" />
    <rect x="15.4" y="0.4" width="3.2" height="3.2" transform="rotate(45 17 2)" fill="currentColor" stroke="none" />
  </svg>
);


export default function StatsPanel() {
  return (
    <Reveal>
      <div className="sp-panel">
        <CornerBracket className="top-1.5 left-1.5" />
        <CornerBracket className="top-1.5 right-1.5 rotate-90" />
        <CornerBracket className="bottom-1.5 right-1.5 rotate-180" />
        <CornerBracket className="bottom-1.5 left-1.5 -rotate-90" />


        <div className="grid grid-cols-2 md:flex md:items-stretch">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="sp-sep hidden md:block" />}
              <Reveal delay={i * 120} className="flex-1 px-3 py-4 md:py-5">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-[#c9d2d2]">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                    <span
                      className="text-2xl font-semibold text-[#e7e3d8] md:text-3xl"
                      style={{ fontFamily: '"EB Garamond", Georgia, serif' }}
                    >
                      <CountUp end={s.end} duration={1700} delay={i * 120} format={s.format} />
                    </span>
                  </div>
                  <div className="text-center font-cinzel text-[10px] uppercase tracking-[0.22em] text-[#9e9f9f] md:text-[11px]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
