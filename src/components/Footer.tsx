import React from 'react';
import { PageType } from '../types';
import { FEST_METADATA, FOUR_HOUSES } from '../data/festData';
import { Crown, MapPin, Ticket, ExternalLink, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenTickifyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTickifyModal }) => {
  return (
    <footer className="relative z-10 border-t border-crimson/20 bg-gradient-to-b from-ink via-ink to-ink text-bone-dim overflow-hidden pt-16 pb-12">
      {/* Top icy divider glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Four Houses Banner Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 p-4 bg-ink/60 border border-crimson/20">
          {FOUR_HOUSES.map((house) => (
            <div
              key={house.id}
              onClick={() => {
                onNavigate('clubs');
              }}
              className="p-3 border border-iron/80 hover:border-gold/50 bg-ink-2/30 hover:bg-ink-2/80 transition-all cursor-pointer group text-center"
            >
              <div className="flex items-center justify-center gap-1.5 font-cinzel text-xs font-bold text-bone group-hover:text-gold-2">
                <span className="w-6 h-6 rounded bg-white p-0.5 shrink-0 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src={house.logo} alt={`${house.name} logo`} loading="lazy" className="w-full h-full object-contain" />
                </span>
                <span>{house.houseName}</span>
              </div>
              <p className="text-[11px] text-bone-dim truncate mt-0.5">{house.name}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Fest Proclamation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ink-2 border border-gold/50 flex items-center justify-center">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="font-cinzel text-xs text-gold font-bold tracking-widest block uppercase">
                  Chittagong College &bull; Est. 1869
                </span>
                <span className="font-cinzel-dec text-lg font-black text-white block">
                  CARNAVAL DA CC
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-bone-dim leading-relaxed max-w-sm">
              The grand winter convergence uniting the Four Great Houses of Chittagong College in an epic saga of science, language, debate, and the art of the lens. Winter has arrived at the Citadel.
            </p>

            <div className="flex items-center gap-2 text-xs text-bone-dim">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>Chawkbazar, College Road, Chittagong-4203, Bangladesh</span>
            </div>
          </div>

          {/* Quick Realms */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              The Realms
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-2 transition-colors">
                  The Iron Throne (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('description')} className="hover:text-gold-2 transition-colors">
                  Fest Chronicle & Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('clubs')} className="hover:text-gold-2 transition-colors">
                  The 4 Great Houses (Clubs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('segments')} className="hover:text-gold-2 transition-colors">
                  Tourneys & Competitions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sponsorships')} className="hover:text-gold-2 transition-colors">
                  Iron Bank (Sponsorships)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizers')} className="hover:text-gold-2 transition-colors">
                  Small Council (Organizers)
                </button>
              </li>
            </ul>
          </div>

          {/* Registration & Tickify */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Tickify Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a
                  href={FEST_METADATA.tickifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-2 hover:text-gold-2 font-semibold"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Direct Tickify Checkout</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTickifyModal}
                  className="text-bone-dim hover:text-white transition-colors"
                >
                  View Pass Tiers & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('segments')}
                  className="text-bone-dim hover:text-white transition-colors"
                >
                  Segment Registration Rules
                </button>
              </li>
              <li className="pt-2 text-[11px] text-ash">
                Official Ticketing Partner: Tickify Live
              </li>
            </ul>
          </div>

          {/* Contact Treasury */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-2 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Royal Ravens
            </h4>
            <div className="space-y-2 text-xs text-bone-dim">
              <p>For inquiries, partnerships or royal scrolls:</p>
              <div className="flex items-center gap-1.5 text-gold-2">
                <Mail className="w-3.5 h-3.5" />
                <span>carnavaldactgclg@gmail.com</span>
              </div>
              <p className="text-[11px] text-ash pt-1">
                Sponsorship Wing: +880 1776-810739
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Valyrian Easter Egg */}
        <div className="pt-8 border-t border-ink-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ash">
          <p className="font-cinzel text-center md:text-left">
            &copy; {new Date().getFullYear()} Carnaval Da Chittagong College. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Forged with</span>
            <Heart className="w-3.5 h-3.5 text-crimson-2 fill-crimson-2 animate-pulse" />
            <span>in Valyrian React & Tailwind for Chittagong College</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
