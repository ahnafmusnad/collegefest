import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { FEST_METADATA } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
import { 
  Shield, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  CloudSnow, 
  Ticket, 
  ExternalLink,
  ChevronRight,
  Crown
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  snowMode: 'gentle' | 'blizzard' | 'off';
  onToggleSnow: () => void;
  onOpenTickifyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  snowMode,
  onToggleSnow,
  onOpenTickifyModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navItems: { label: string; page: PageType; subtitle: string; icon: string }[] = [
    { label: 'The Throne', page: 'home', subtitle: 'Grand Citadel', icon: 'Crown' },
    { label: 'The Fest', page: 'description', subtitle: 'Lore & Schedule', icon: 'Scroll' },
    { label: 'The 4 Houses', page: 'clubs', subtitle: 'Four Major Clubs', icon: 'Shield' },
    { label: 'Tourneys', page: 'segments', subtitle: 'Segments & Battles', icon: 'Swords' },
    { label: 'Iron Bank', page: 'sponsorships', subtitle: 'Royal Benefactors', icon: 'Coins' },
    { label: 'Small Council', page: 'organizers', subtitle: 'Citadel Organizers', icon: 'Users' }
  ];

  const handleNavClick = (page: PageType) => {
    soundFx.playSwordClash();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleToggleAudio = () => {
    const active = soundFx.toggleMute();
    setIsAudioActive(active);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070510]/90 backdrop-blur-md border-b border-violet-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-[#04030f]/90 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Sigil */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-slate-900 to-violet-950 border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:border-violet-400 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-violet-400 group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
              </div>
              <div>
                <span className="font-cinzel text-xs tracking-[0.25em] text-violet-400 font-bold block uppercase leading-none">
                  Chittagong College
                </span>
<span className="font-cinzel-dec text-base md:text-lg font-black text-white tracking-wider block text-glow-ice leading-tight group-hover:text-blue-200 transition-colors">
CARNAVAL DA CC
</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    onMouseEnter={() => soundFx.playRuneChime()}
                    className={`relative px-3 py-1.5 rounded-lg font-cinzel text-xs xl:text-sm font-semibold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-blue-300 bg-violet-950/60 border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 shadow-[0_0_8px_#8b5cf6]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Direct Tickify Register Link */}
            <div className="flex items-center gap-2 md:gap-3">
              
              {/* Audio Ambiance Synthesizer Toggle */}
              <button
                onClick={handleToggleAudio}
                title={isAudioActive ? 'Mute Citadel Winds' : 'Play Winter Winds Audio'}
                aria-label={isAudioActive ? 'Mute Citadel Winds' : 'Play Winter Winds Audio'}
                className={`p-2 rounded-lg border transition-all ${
                  isAudioActive
                    ? 'border-violet-400 bg-violet-950/80 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Snowfall Intensity Toggle */}
              <button
                onClick={onToggleSnow}
                title={`Snow: ${snowMode.toUpperCase()}`}
                aria-label={`Snow: ${snowMode.toUpperCase()}`}
                className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  snowMode !== 'off'
                    ? 'border-violet-500/40 bg-slate-900/60 text-violet-300'
                    : 'border-slate-800 bg-slate-900/30 text-slate-500'
                }`}
              >
                <CloudSnow className={`w-3.5 h-3.5 ${snowMode === 'blizzard' ? 'animate-bounce text-blue-200' : ''}`} />
                <span className="uppercase text-[10px]">{snowMode}</span>
              </button>

              {/* REGISTER (TICKIFY) CTA BUTTON */}
              <div className="flex items-center gap-1.5">
                {/* Direct Hyperlink to Tickify as required */}
                <a
                  href={FEST_METADATA.tickifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playSwordClash()}
                  className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-cinzel text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-blue-400 via-violet-300 to-violet-400 hover:from-blue-300 hover:to-violet-200 border border-blue-200 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] active:scale-95 transition-all"
                  title="Direct Tickify Registration Portal"
                >
                  <Ticket className="w-3.5 h-3.5 text-slate-950" />
                  <span>REGISTER (TICKIFY)</span>
                  <ExternalLink className="w-3 h-3 text-slate-900" />
                </a>

                {/* Quick pass preview modal button */}
                <button
                  onClick={() => {
                    soundFx.playRuneChime();
                    onOpenTickifyModal();
                  }}
                  className="hidden sm:inline-flex md:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg border border-violet-400/60 text-xs text-violet-300 font-cinzel font-bold bg-violet-950/40"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  Passes
                </button>
              </div>

              {/* Mobile / Tablet Burger Menu Toggle Button */}
              <button
                onClick={() => {
                  soundFx.playSwordClash();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-lg border border-violet-500/40 bg-slate-900/80 text-violet-400 hover:text-white hover:border-violet-300 transition-colors shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE & TABLET BURGER MENU WITH SWEEPING ANIMATION */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#070514] text-white overflow-y-auto animate-fadeIn duration-300">
          
          {/* Background Frost Graphics */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(167,139,250,0.15)_0%,_rgba(4,8,19,0.98)_70%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Fullscreen overlay */}
          <div className="relative z-10 flex items-center justify-between p-5 border-b border-violet-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-violet-500/40 flex items-center justify-center">
                <Crown className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="font-cinzel text-xs text-violet-400 font-bold tracking-widest block">CHITTAGONG COLLEGE</span>
                <span className="font-cinzel-dec text-sm font-bold text-white tracking-wider">CARNAVAL DA CC</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playSwordClash();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-violet-500/40 text-slate-300 hover:text-white"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="relative z-10 flex-1 px-6 py-6 space-y-2.5 max-w-lg mx-auto w-full">
            <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-violet-400/80 mb-3 px-2">
              Select Your Realm
            </p>
            {navItems.map((item, index) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 animate-fadeIn ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-950/80 to-blue-950/50 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/90 hover:border-violet-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-800/60 text-slate-400'}`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-cinzel text-base font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-violet-400/80 font-sans">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-600'}`} />
                </button>
              );
            })}

            {/* Tickify Register Button in Fullscreen Mobile Menu */}
            <div className="pt-4 space-y-2.5">
              <a
                href={FEST_METADATA.tickifyLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundFx.playRoyalHorn();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-cinzel text-sm font-bold text-slate-950 bg-gradient-to-r from-blue-400 via-violet-300 to-violet-400 border border-blue-200 shadow-[0_0_25px_rgba(139,92,246,0.6)] active:scale-95 transition-all text-center uppercase tracking-wider"
              >
                <Ticket className="w-5 h-5" />
                <span>REGISTER ON TICKIFY NOW</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  soundFx.playRuneChime();
                  setMobileMenuOpen(false);
                  onOpenTickifyModal();
                }}
                className="w-full py-2.5 text-center font-cinzel text-xs text-violet-300 hover:text-white underline tracking-wider"
              >
                Preview Festival Passes & Ticket Tiers
              </button>
            </div>
          </div>

          {/* Bottom Bar in Fullscreen Menu */}
          <div className="relative z-10 p-5 border-t border-violet-500/20 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-violet-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{isAudioActive ? 'Sound On' : 'Sound Muted'}</span>
            </button>

            <button
              onClick={onToggleSnow}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <CloudSnow className="w-4 h-4 text-violet-400" />
              <span className="uppercase">Snow: {snowMode}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
