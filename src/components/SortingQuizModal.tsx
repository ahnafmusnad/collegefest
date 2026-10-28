import React, { useState, useEffect } from 'react';
import { X, Shield, Sparkles, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SORTING_QUESTIONS, FOUR_HOUSES } from '../data/festData';
import { ClubHouse } from '../types';
import ResponsiveImg from './ui/ResponsiveImg';
import Button from './ui/Button';

interface SortingQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeHouse: (house: ClubHouse) => void;
}

/**
 * THE IRON RAVEN'S TRIAL — house sorting quiz.
 * The outer layer owns the scroll (overflow-y-auto + min-h-full + m-auto),
 * so on phones the trial always starts at the top and scrolls naturally
 * instead of getting shoved above the screen. Carved teal-stone slab.
 */
export const SortingQuizModal: React.FC<SortingQuizModalProps> = ({
  isOpen,
  onClose,
  onPledgeHouse
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [houseTallies, setHouseTallies] = useState<Record<string, number>>({
    'house-veritas': 0,
    'house-arcanum': 0,
    'house-melodia': 0,
    'house-valorous': 0
  });
  const [sortedHouse, setSortedHouse] = useState<ClubHouse | null>(null);

  /* esc-to-close + body scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (houseId: string) => {
    const updated = { ...houseTallies, [houseId]: houseTallies[houseId] + 1 };
    setHouseTallies(updated);

    if (currentQuestionIndex + 1 < SORTING_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Determine winner
      let highestHouseId = 'house-veritas';
      let maxScore = -1;
      for (const [hId, score] of Object.entries(updated)) {
        if (score > maxScore) {
          maxScore = score;
          highestHouseId = hId;
        }
      }
      const matched = FOUR_HOUSES.find(h => h.id === highestHouseId) || FOUR_HOUSES[0];
      setSortedHouse(matched);

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setHouseTallies({
      'house-veritas': 0,
      'house-arcanum': 0,
      'house-melodia': 0,
      'house-valorous': 0
    });
    setSortedHouse(null);
  };

  const handlePledge = () => {
    if (sortedHouse) {
      onPledgeHouse(sortedHouse);
      onClose();
    }
  };

  const currentQ = SORTING_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / SORTING_QUESTIONS.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="The Iron Raven's Trial"
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="trial-stone relative m-auto w-full max-w-xl p-5 text-bone sm:p-8">
          {/* corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-gold-2/70" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-2/70" aria-hidden="true" />

          {/* diamond sigil close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the trial"
            className="sigil-close absolute top-4 right-4 z-20 flex h-9 w-9 rotate-45 items-center justify-center border border-[#5bc9d6]/50 bg-ink-2/85 text-bone-dim hover:text-white"
          >
            <X className="h-4 w-4 -rotate-45" />
          </button>

          {!sortedHouse ? (
            <div key={currentQuestionIndex} className="animate-fadeIn">
              {/* header */}
              <div className="pr-10 text-center sm:pr-0">
                <div className="inline-flex items-center gap-1.5 border border-[#5bc9d6]/45 bg-ink/70 px-3 py-1 font-cinzel text-[10px] uppercase tracking-[0.28em] text-[#8ce8f2]">
                  <Shield className="w-3.5 h-3.5" />
                  The Iron Raven&rsquo;s Trial
                </div>
                <h2 className="mt-3 font-cinzel text-lg font-bold tracking-wide text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] sm:text-xl md:text-2xl">
                  WHICH HOUSE OF THE CITADEL SHALL CLAIM YOU?
                </h2>
                <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#9fd8d2] sm:text-[11px]">
                  Question {currentQuestionIndex + 1} of {SORTING_QUESTIONS.length}
                </p>
              </div>

              {/* trial progress rail */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-cinzel text-[9px] tracking-[0.2em] text-ash tabular-nums">
                  {String(currentQuestionIndex + 1).padStart(2, '0')}
                </span>
                <div className="relative h-px flex-1 bg-iron/60">
                  <span
                    className="absolute inset-y-0 left-0 bg-[#5bc9d6]/90 shadow-[0_0_10px_rgba(91,201,214,0.7)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                  {/* diamond pips per question */}
                  {SORTING_QUESTIONS.map((_, i) => (
                    <span
                      key={i}
                      className={`absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors duration-300 ${
                        i < currentQuestionIndex
                          ? 'bg-[#5bc9d6]'
                          : i === currentQuestionIndex
                          ? 'bg-gold-2 shadow-[0_0_8px_rgba(216,222,217,0.8)]'
                          : 'bg-ink-3'
                      }`}
                      style={{ left: `${((i + 1) / SORTING_QUESTIONS.length) * 100}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="font-cinzel text-[9px] tracking-[0.2em] text-ash tabular-nums">
                  {String(SORTING_QUESTIONS.length).padStart(2, '0')}
                </span>
              </div>

              {/* question */}
              <div className="relative mt-5 border border-[#5bc9d6]/25 bg-ink/60 px-4 py-4 backdrop-blur-sm sm:px-5">
                <span className="pointer-events-none absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-r border-[#5bc9d6]/50 bg-ink-2" aria-hidden="true" />
                <p className="text-center font-cinzel text-[15px] font-medium leading-snug text-white sm:text-base md:text-lg">
                  &ldquo;{currentQ.question}&rdquo;
                </p>
              </div>

              {/* options */}
              <div className="mt-4 space-y-2.5">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt.houseId)}
                    className="group flex w-full items-center gap-3 border border-iron/60 bg-ink-2/60 p-3.5 text-left text-[13px] leading-relaxed text-bone backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-[#5bc9d6]/60 hover:bg-ink-3/50 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(91,201,214,0.5)] sm:text-sm"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5bc9d6]/50 transition-all duration-300 group-hover:bg-[#8ce8f2] group-hover:shadow-[0_0_8px_rgba(140,232,242,0.9)]"
                      aria-hidden="true"
                    />
                    <span className="flex-1">{opt.text}</span>
                    <Sparkles className="h-4 w-4 shrink-0 text-[#5bc9d6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Result View ─────────────────────────────── */
            <div className="animate-fadeIn text-center">
              <div className="inline-flex items-center gap-1.5 border border-[#5bc9d6]/45 bg-ink/70 px-3 py-1 font-cinzel text-[10px] uppercase tracking-[0.28em] text-[#8ce8f2]">
                The Raven Has Spoken
              </div>

              <div className="relative mx-auto mt-5 h-24 w-24">
                <span className="absolute inset-0 rotate-45 border border-[#5bc9d6]/50" aria-hidden="true" />
                <div className="absolute inset-[9px] flex items-center justify-center overflow-hidden rounded-full border-2 border-gold-2/60 bg-white p-2.5">
                  <ResponsiveImg
                    src={sortedHouse.logo}
                    alt={`${sortedHouse.name} logo`}
                    sizes="96px"
                    widths={[480, 800]}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-5 font-cinzel text-[10px] uppercase tracking-[0.34em] text-[#9fd8d2]">
                You Have Been Claimed By
              </h3>
              <h2 className="mt-1.5 font-cinzel-dec text-2xl font-extrabold text-white [text-shadow:0_0_26px_rgba(91,201,214,0.35)] sm:text-3xl">
                {sortedHouse.houseName}
              </h2>
              <p className="mt-1.5 font-cinzel text-sm italic text-gold-2/90">
                &ldquo;{sortedHouse.motto}&rdquo;
              </p>

              <div className="mt-5 border border-[#5bc9d6]/25 bg-ink/60 p-4 text-left backdrop-blur-sm">
                <div className="mb-1 flex items-center gap-2 font-cinzel text-[13px] font-bold text-gold-2">
                  <Crown className="h-3.5 w-3.5 shrink-0 text-[#5bc9d6]" />
                  {sortedHouse.name}
                </div>
                <p className="text-xs leading-relaxed text-bone-dim sm:text-sm">{sortedHouse.lore}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="flex-1" onClick={handlePledge}>
                  PLEDGE ALLEGIANCE &amp; WEAR CREST
                </Button>

                <Button variant="glass" size="sm" className="flex-1" onClick={handleReset}>
                  Retake the Trial
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
