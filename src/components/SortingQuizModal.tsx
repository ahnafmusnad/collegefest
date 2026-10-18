import React, { useState } from 'react';
import { X, Shield, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SORTING_QUESTIONS, FOUR_HOUSES } from '../data/festData';
import { ClubHouse } from '../types';
interface SortingQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeHouse: (house: ClubHouse) => void;
}

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-ink-2 via-ink-2 to-ink border-2 border-gold/50 rounded-2xl shadow-[0_0_50px_rgba(158,42,43,0.3)] p-6 md:p-8 text-bone">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-bone-dim hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!sortedHouse ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-2 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest mb-2">
                <Shield className="w-3.5 h-3.5" />
                The Iron Raven’s Trial
              </div>
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-wide">
                WHICH HOUSE OF THE CITADEL SHALL CLAIM YOU?
              </h2>
              <p className="text-xs text-gold/80 font-cinzel mt-1">
                Question {currentQuestionIndex + 1} of {SORTING_QUESTIONS.length}
              </p>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-xl bg-ink-2/80 border border-crimson/20 mb-5">
              <p className="font-cinzel text-base md:text-lg text-white font-medium text-center">
                "{currentQ.question}"
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.houseId)}
                  className="w-full text-left p-3.5 rounded-xl border border-iron hover:border-gold bg-ink-2/50 hover:bg-ink-2/40 transition-all text-sm text-bone hover:text-white flex items-center justify-between group shadow-sm"
                >
                  <span className="font-sans leading-relaxed">{opt.text}</span>
                  <Sparkles className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                </button>
              ))}
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {SORTING_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentQuestionIndex
                      ? 'w-8 bg-gold shadow-[0_0_8px_#9e2a2b]'
                      : i < currentQuestionIndex
                      ? 'w-4 bg-crimson-2'
                      : 'w-4 bg-ink-3'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-2 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest mb-3">
              The Raven Has Spoken
            </div>

            <div className="w-20 h-20 mx-auto rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-[0_0_30px_rgba(158,42,43,0.5)] mb-4 p-2 overflow-hidden">
              <img src={sortedHouse.logo} alt={`${sortedHouse.name} logo`} className="w-full h-full object-contain" />
            </div>

            <h3 className="font-cinzel text-xs uppercase tracking-widest text-gold-2">
              You Have Been Claimed By
            </h3>
            <h2 className="font-cinzel-dec text-2xl md:text-3xl font-extrabold text-white my-2 text-glow-ice">
              {sortedHouse.houseName}
            </h2>
            <p className="font-cinzel text-sm text-gold-2/90 italic mb-4">
              "{sortedHouse.motto}"
            </p>

            <div className="p-4 rounded-xl bg-ink-2/80 border border-crimson/30 text-left text-xs md:text-sm text-bone-dim mb-6">
              <div className="font-bold text-gold-2 mb-1">{sortedHouse.name}</div>
              <p className="line-clamp-3">{sortedHouse.lore}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePledge}
                className="flex-1 py-3 px-5 rounded-xl font-cinzel text-sm font-bold text-ink bg-gradient-to-r from-ember to-gold-2 hover:from-gold-2 hover:to-gold-2 shadow-[0_0_20px_rgba(158,42,43,0.5)] btn-shine active:scale-95 transition-all text-center uppercase tracking-wider"
              >
                PLEDGE ALLEGIANCE & WEAR CREST
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-iron hover:border-ash text-bone-dim text-xs font-cinzel uppercase transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
