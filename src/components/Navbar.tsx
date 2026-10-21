import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { FEST_METADATA } from '../data/festData';
import Button from './ui/Button';
import { RealmMapNav } from './RealmMapNav';
import { CloudSnow, Map as MapIcon } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  snowMode: 'gentle' | 'blizzard' | 'off';
  onToggleSnow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  snowMode,
  onToggleSnow,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // NOTE: body scroll locking is handled inside <RealmMapNav /> itself.
  // Do not add a body overflow effect here.

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMapOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ink/90 backdrop-blur-md border-b border-crimson/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-ink/90 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Sigil */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left shrink-0 focus:outline-none"
            >
              <img src="/images/college-crest.png" alt="Chittagong College crest" className="h-10 md:h-11 w-auto" />
              <span className="hidden sm:block w-px h-9 bg-iron" />
              <span className="flex flex-col leading-none">
                <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.22em] text-white">CARNAVAL</span>
                <span className="font-cinzel text-[9px] md:text-[10px] tracking-[0.3em] text-bone-dim mt-1.5 uppercase">Da Chittagong College</span>
              </span>
            </button>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* Snowfall Intensity Toggle */}
              <button
                onClick={onToggleSnow}
                title={`Snow: ${snowMode}`}
                aria-label={`Snow: ${snowMode}`}
                className={`hidden sm:flex items-center justify-center w-9 h-9 text-bone-dim hover:text-white transition-colors ${snowMode === 'off' ? 'opacity-40' : ''}`}
              >
                <CloudSnow className="w-4 h-4" />
              </button>

              {/* REGISTER (TICKIFY) CTA BUTTON */}
              <div className="hidden md:block shrink-0">
                <Button href={FEST_METADATA.tickifyLink} external size="sm">Register Now</Button>
              </div>

              {/* THE ROYAL MAP — the ONLY menu button. No burger button anywhere. */}
              <button
                onClick={() => setMapOpen(true)}
                className="group relative flex items-center gap-2 rounded-lg border border-gold/40 bg-ink-2/80 px-2.5 py-2 text-gold transition-colors hover:border-gold hover:text-white"
                aria-label="Open the Royal Map navigation"
                aria-haspopup="dialog"
                aria-expanded={mapOpen}
                title="Open the Royal Map"
              >
                <MapIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
                <span className="hidden min-[1180px]:inline font-cinzel text-[11px] font-semibold uppercase tracking-[0.16em]">Map</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* THE ROYAL MAP: fullscreen chart navigation on every breakpoint */}
      <RealmMapNav
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavClick}
      />
    </>
  );
};
