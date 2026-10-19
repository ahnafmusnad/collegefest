import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { FEST_METADATA, SOCIAL_LINKS } from '../data/festData';
import Button from './ui/Button';
import { 
  Shield, 
  Menu, 
  X, 
  CloudSnow, 
  Ticket, 
  ChevronRight,
  Crown,
  Scroll,
  Swords,
  Coins,
  Users
} from 'lucide-react';

const NavIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'Crown': return <Crown className={className} />;
    case 'Scroll': return <Scroll className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Swords': return <Swords className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Users': return <Users className={className} />;
    default: return <Shield className={className} />;
  }
};

const SocialGlyph: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (icon === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103.513.06 1.002.135 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    );
  }
  if (icon === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    );
  }
  if (icon === 'Youtube') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return null;
};

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
    onNavigate(page);
    setMobileMenuOpen(false);
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
            <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 text-left shrink-0 focus:outline-none">
              <img src="/images/college-crest.png" alt="Chittagong College crest" className="h-10 md:h-11 w-auto" />
              <span className="hidden sm:block w-px h-9 bg-iron" />
              <span className="flex flex-col leading-none">
                <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.22em] text-white">CARNAVAL</span>
                <span className="font-cinzel text-[9px] md:text-[10px] tracking-[0.3em] text-bone-dim mt-1.5 uppercase">Da Chittagong College</span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden min-[1180px]:flex items-center gap-5 2xl:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`nav-link font-cinzel text-[12px] 2xl:text-[13px] font-semibold uppercase tracking-[0.1em] 2xl:tracking-[0.14em] whitespace-nowrap ${currentPage === item.page ? 'is-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Direct Tickify Register Link */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              
              {/* Snowfall Intensity Toggle */}
              <button onClick={onToggleSnow} title={`Snow: ${snowMode}`} aria-label={`Snow: ${snowMode}`} className={`hidden sm:flex items-center justify-center w-9 h-9 text-bone-dim hover:text-white transition-colors ${snowMode === 'off' ? 'opacity-40' : ''}`}>
                <CloudSnow className="w-4 h-4" />
              </button>

              {/* REGISTER (TICKIFY) CTA BUTTON */}
              <div className="flex items-center gap-1.5">
                {/* Direct Hyperlink to Tickify as required */}
                <Button href={FEST_METADATA.tickifyLink} external size="sm" className="hidden md:inline-flex shrink-0">Register Now</Button>

                {/* Quick pass preview modal button */}
                <button
                  onClick={() => {
                    onOpenTickifyModal();
                  }}
                  className="hidden sm:inline-flex md:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gold/60 text-xs text-gold-2 font-cinzel font-bold bg-ink-2/40"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  Passes
                </button>
              </div>

              {/* Mobile / Tablet Burger Menu Toggle Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="min-[1180px]:hidden p-2 rounded-lg border border-crimson/40 bg-ink-2/80 text-gold hover:text-white hover:border-gold-2 transition-colors"
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
        <div className="fixed inset-0 z-50 min-[1180px]:hidden flex flex-col justify-between bg-ink text-white overflow-y-auto animate-fadeIn duration-300">
          
          {/* Background Frost Graphics */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(226,113,29,0.15)_0%,_rgba(11,9,7,0.98)_70%)] pointer-events-none" />

          {/* Top Bar inside Fullscreen overlay */}
          <div className="relative z-10 flex items-center justify-between p-5 border-b border-crimson/20">
            <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 text-left shrink-0 focus:outline-none">
              <img src="/images/college-crest.png" alt="Chittagong College crest" className="h-9 w-auto" />
              <span className="hidden sm:block w-px h-9 bg-iron" />
              <span className="flex flex-col leading-none">
                <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.22em] text-white">CARNAVAL</span>
                <span className="font-cinzel text-[9px] md:text-[10px] tracking-[0.3em] text-bone-dim mt-1.5 uppercase">Da Chittagong College</span>
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-ink-2/90 border border-crimson/40 text-bone-dim hover:text-white"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="relative z-10 flex-1 px-6 py-6 space-y-2.5 max-w-lg mx-auto w-full">
            <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/80 mb-3 px-2">
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
                      ? 'bg-gradient-to-r from-ink-2/80 to-ink-2/50 border-gold'
                      : 'bg-ink-2/40 border-iron/80 hover:bg-ink-2/90 hover:border-crimson/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-crimson/20 text-gold-2' : 'bg-ink-3/60 text-bone-dim'}`}>
                      <NavIcon name={item.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-cinzel text-base font-bold ${isActive ? 'text-white' : 'text-bone'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gold/80 font-sans">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-ember' : 'text-ash'}`} />
                </button>
              );
            })}

            {/* Tickify Register Button in Fullscreen Mobile Menu */}
            <div className="pt-4 space-y-2.5">
              <Button
                href={FEST_METADATA.tickifyLink}
                external
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                REGISTER ON TICKIFY NOW
              </Button>

              {/* Follow the Carnaval — Social Channels */}
              <div className="pt-3">
                <p className="text-center font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/70 mb-3">
                  Follow the Carnaval
                </p>
                <div className="flex items-center justify-center gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      title={s.name}

                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-crimson/40 bg-ink-2/60 text-gold hover:text-white hover:border-gold hover:bg-ink-3 transition-all hover:-translate-y-0.5"
                    >
                      <SocialGlyph icon={s.icon} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar in Fullscreen Menu */}
          <div className="relative z-10 p-5 border-t border-crimson/20 bg-ink/80 flex items-center justify-between text-xs text-bone-dim">
            <button
              onClick={onToggleSnow}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <CloudSnow className="w-4 h-4 text-gold" />
              <span className="uppercase">Snow: {snowMode}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
