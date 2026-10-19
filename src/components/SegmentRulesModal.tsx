import React from 'react';
import { X, Trophy, MapPin, Clock, Users, ShieldAlert } from 'lucide-react';
import { Segment } from '../types';
import { FOUR_HOUSES, FEST_METADATA } from '../data/festData';
import Button from './ui/Button';
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
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-ink-2 via-ink-2 to-ink border-2 border-gold/50 p-6 md:p-8 text-bone my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-bone-dim hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-cinzel font-semibold bg-ink-2/80 border border-crimson/40 text-gold-2">
            {segment.category}
          </span>
          {house && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-cinzel font-semibold bg-ink-2 border border-iron text-bone-dim">
              Host: {house.houseName}
            </span>
          )}
        </div>

        {/* Titles */}
        <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-wide">
          {segment.title}
        </h2>
        <p className="font-cinzel text-xs text-gold italic mb-4">
          The Citadel Proclamation: "{segment.gotTitle}"
        </p>

        {/* Quick Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-ink-2/80 border border-crimson/20 mb-6 text-xs">
          <div className="flex items-center gap-2 text-bone-dim">
            <Trophy className="w-4 h-4 text-gold shrink-0" />
            <div>
              <div className="text-[10px] text-bone-dim uppercase">Prize Vault</div>
              <div className="font-bold text-gold-2">{segment.prizePool}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-bone-dim">
            <Users className="w-4 h-4 text-gold shrink-0" />
            <div>
              <div className="text-[10px] text-bone-dim uppercase">Team Size</div>
              <div className="font-bold text-white">{segment.teamSize}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-bone-dim">
            <MapPin className="w-4 h-4 text-ember shrink-0" />
            <div>
              <div className="text-[10px] text-bone-dim uppercase">Citadel Venue</div>
              <div className="font-bold text-white truncate">{segment.venue}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-bone-dim">
            <Clock className="w-4 h-4 text-crimson-2 shrink-0" />
            <div>
              <div className="text-[10px] text-bone-dim uppercase">Schedule</div>
              <div className="font-bold text-white">{segment.time}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 text-sm text-bone-dim leading-relaxed">
          {segment.description}
        </div>

        {/* Tournament Rules */}
        <div className="mb-5">
          <div className="flex items-center gap-2 font-cinzel text-xs font-bold text-gold-2 uppercase tracking-widest mb-2.5">
            <ShieldAlert className="w-4 h-4 text-gold" />
            Tournament Decrees & Rules of Engagement
          </div>
          <ul className="space-y-2 text-xs text-bone-dim bg-ink-2/60 p-3.5 border border-iron">
            {segment.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-gold font-bold shrink-0">{idx + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Judging Criteria */}
        <div className="mb-6">
          <div className="font-cinzel text-xs font-bold text-gold-2 uppercase tracking-widest mb-2">
            Judging Criteria & Scoring
          </div>
          <div className="flex flex-wrap gap-2">
            {segment.judgingCriteria.map((crit, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-ink-2/50 border border-gold/30 text-xs text-gold-2"
              >
                {crit}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-crimson/20">
          <Button
            className="flex-1"
            onClick={() => {
              onRegisterTickify(segment.title);
            }}
          >
            {`REGISTER VIA TICKIFY (ENTRY: ${segment.entryFee})`}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            href={FEST_METADATA.tickifyLink}
            external
          >
            Tickify Portal
          </Button>
        </div>
      </div>
    </div>
  );
};
