import React from 'react';
import { PageType } from '../types';
import { FEST_METADATA, FOUR_HOUSES } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
import { Crown, Shield, MapPin, Ticket, ExternalLink, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenTickifyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTickifyModal }) => {
  return (
    <footer className="relative z-10 border-t border-violet-500/20 bg-gradient-to-b from-[#0a0718] via-[#03060c] to-[#010307] text-slate-300 overflow-hidden pt-16 pb-12">
      {/* Top icy divider glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent shadow-[0_0_15px_#8b5cf6]" />
      
      {/* Background radial atmosphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Four Houses Banner Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 p-4 rounded-2xl bg-slate-950/60 border border-violet-500/20">
          {FOUR_HOUSES.map((house) => (
            <div
              key={house.id}
              onClick={() => {
                soundFx.playRuneChime();
                onNavigate('clubs');
              }}
              className="p-3 rounded-xl border border-slate-800/80 hover:border-violet-400/50 bg-slate-900/30 hover:bg-slate-900/80 transition-all cursor-pointer group text-center"
            >
              <div className="flex items-center justify-center gap-1.5 font-cinzel text-xs font-bold text-slate-200 group-hover:text-blue-300">
                <Shield className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span>{house.houseName}</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{house.name}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Fest Proclamation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-violet-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Crown className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="font-cinzel text-xs text-violet-400 font-bold tracking-widest block uppercase">
                  Chittagong College &bull; Est. 1869
                </span>
                <span className="font-cinzel-dec text-lg font-black text-white text-glow-ice block">
                  CARNAVAL DA CC
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">
              The grand winter convergence uniting the Four Great Houses of Chittagong College in an epic saga of science, language, debate, and the art of the lens. Winter has arrived at the Citadel.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Chawkbazar, College Road, Chittagong-4203, Bangladesh</span>
            </div>
          </div>

          {/* Quick Realms */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-violet-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              The Realms
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-300 transition-colors">
                  The Iron Throne (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('description')} className="hover:text-blue-300 transition-colors">
                  Fest Chronicle & Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('clubs')} className="hover:text-blue-300 transition-colors">
                  The 4 Great Houses (Clubs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('segments')} className="hover:text-blue-300 transition-colors">
                  Tourneys & Competitions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sponsorships')} className="hover:text-blue-300 transition-colors">
                  Iron Bank (Sponsorships)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('organizers')} className="hover:text-blue-300 transition-colors">
                  Small Council (Organizers)
                </button>
              </li>
            </ul>
          </div>

          {/* Registration & Tickify */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-violet-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Tickify Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <a
                  href={FEST_METADATA.tickifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-300 hover:text-blue-200 font-semibold"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Direct Tickify Checkout</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTickifyModal}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  View Pass Tiers & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('segments')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Segment Registration Rules
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Official Ticketing Partner: Tickify Live
              </li>
            </ul>
          </div>

          {/* Contact Treasury */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-violet-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Royal Ravens
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>For inquiries, partnerships or royal scrolls:</p>
              <div className="flex items-center gap-1.5 text-violet-300">
                <Mail className="w-3.5 h-3.5" />
                <span>carnavaldactgclg@gmail.com</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Sponsorship Wing: +880 1776-810739
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Valyrian Easter Egg */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-cinzel text-center md:text-left">
            &copy; {new Date().getFullYear()} Carnaval Da Chittagong College. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Forged with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>in Valyrian React & Tailwind for Chittagong College</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
