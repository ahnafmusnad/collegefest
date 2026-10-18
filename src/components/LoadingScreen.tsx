import React, { useEffect, useState } from 'react';
import { Snowflake, Shield } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  targetPageName?: string;
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  targetPageName = 'The Citadel',
  onFinish
}) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(15);
      const timer1 = setTimeout(() => setProgress(65), 800);
      const timer2 = setTimeout(() => setProgress(98), 1900);
      const timer3 = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 450);
      }, 2600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setVisible(false);
    }
  }, [isLoading, onFinish]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

      {/* Medieval Ice Runes & Circle */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer rotating rune ring */}
        <div className="absolute h-36 w-36 rounded-full border border-violet-500/30 border-dashed animate-rune-spin" />
        <div className="absolute h-48 w-48 rounded-full border border-violet-400/15" />
        
        {/* Central glowing crest */}
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/80 border-2 border-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.6)]">
          <Shield className="h-10 w-10 text-violet-400 animate-pulse" />
          <Snowflake className="absolute h-6 w-6 text-violet-200 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      </div>

      {/* Medieval GOT Proclamation */}
      <div className="relative z-10 text-center px-4">
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-violet-400/80 mb-2">
          Winter Is Coming
        </p>
        <h2 className="font-cinzel-dec text-2xl md:text-3xl font-extrabold text-white tracking-widest text-glow-ice mb-3">
          CARNAVAL DA CHITTAGONG COLLEGE
        </h2>
        <p className="font-cinzel text-sm text-slate-300 tracking-wider">
          Entering <span className="text-violet-300 font-semibold">{targetPageName}</span>
        </p>
      </div>

      {/* Valyrian Steel Loading Gauge */}
      <div className="relative z-10 mt-8 w-64 md:w-80 h-2 bg-slate-900 rounded-full border border-violet-900/60 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-violet-400 to-blue-200 transition-all duration-300 ease-out shadow-[0_0_12px_#8b5cf6]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Small Frost Lore hint */}
      <div className="relative z-10 mt-4 text-[11px] font-sans text-slate-400 tracking-wider uppercase">
        Forging the Realm &bull; {progress}%
      </div>
    </div>
  );
};
