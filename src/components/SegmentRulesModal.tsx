import React from 'react';
import { X, Trophy, MapPin, Clock, Users, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { Segment } from '../types';
import { FOUR_HOUSES, FEST_METADATA } from '../data/festData';
import { soundFx } from '../utils/soundEffects';

interface SegmentRulesModalProps {
  segment: Segment | null;
  onClose: () => void;
  onRegisterTickify: (segmentName: string) => void;
}

export const SegmentRulesModal: React.FC<SegmentRulesModalProps> = ({
  segment,
  onClose,
  onRegisterTickify
}) => {
  if (!segment) return null;

  const house = FOUR_HOUSES.find(h => h.id === segment.houseId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0a1526] via-[#070e1c] to-[#040810] border-2 border-sky-400/50 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.3)] p-6 md:p-8 text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playSwordClash();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-cinzel font-semibold bg-sky-950/80 border border-sky-500/40 text-sky-300">
            {segment.category}
          </span>
          {house && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-cinzel font-semibold bg-slate-900 border border-slate-700 text-slate-300">
              Host: {house.houseName}
            </span>
          )}
        </div>

        {/* Titles */}
        <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-wide">
          {segment.title}
        </h2>
        <p className="font-cinzel text-xs text-sky-400 italic mb-4">
          The Citadel Proclamation: "{segment.gotTitle}"
        </p>

        {/* Quick Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-sky-500/20 mb-6 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Prize Vault</div>
              <div className="font-bold text-amber-300">{segment.prizePool}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Team Size</div>
              <div className="font-bold text-white">{segment.teamSize}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Citadel Venue</div>
              <div className="font-bold text-white truncate">{segment.venue}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Schedule</div>
              <div className="font-bold text-white">{segment.time}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 text-sm text-slate-300 leading-relaxed">
          {segment.description}
        </div>

        {/* Tournament Rules */}
        <div className="mb-5">
          <div className="flex items-center gap-2 font-cinzel text-xs font-bold text-sky-300 uppercase tracking-widest mb-2.5">
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            Tournament Decrees & Rules of Engagement
          </div>
          <ul className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            {segment.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold shrink-0">{idx + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Judging Criteria */}
        <div className="mb-6">
          <div className="font-cinzel text-xs font-bold text-sky-300 uppercase tracking-widest mb-2">
            Judging Criteria & Scoring
          </div>
          <div className="flex flex-wrap gap-2">
            {segment.judgingCriteria.map((crit, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-sky-950/50 border border-sky-400/30 text-xs text-sky-200"
              >
                {crit}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-sky-500/20">
          <button
            onClick={() => {
              soundFx.playRoyalHorn();
              onRegisterTickify(segment.title);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-cinzel text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.5)] active:scale-95 transition-all uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            REGISTER VIA TICKIFY (ENTRY: {segment.entryFee})
          </button>

          <a
            href={FEST_METADATA.tickifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-cinzel uppercase transition-colors"
          >
            <span>Tickify Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
