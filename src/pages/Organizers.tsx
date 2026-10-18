import React, { useState } from 'react';
import { SMALL_COUNCIL } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { 
  Crown, 
  Shield, 
  Users, 
  Mail, 
  Globe, 
  Sparkles, 
  Scroll,
  Filter
} from 'lucide-react';

export const Organizers: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getInitials = (name: string) =>
    name
      .replace(/^(Prof\.|Dr\.|Md\.)\s+/i, '')
      .split(' ')
      .filter((w) => w.length > 1)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const categories = [
    { label: 'All Ranks', value: 'all' },
    { label: 'The Small Council', value: 'council' },
    { label: 'Faculty Advisory', value: 'advisory' },
    { label: 'Citadel Stewards', value: 'steward' },
    { label: 'Volunteer Guard', value: 'guard' }
  ];

  const filteredMembers = SMALL_COUNCIL.filter(m => {
    if (filterCategory === 'all') return true;
    return m.category === filterCategory;
  });

  return (
    <div className="pt-24 pb-20 px-4 text-slate-100 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-violet-500/30 bg-gradient-to-r from-[#070514] via-[#130e2c] to-[#070514] p-8 md:p-14 text-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/images/small-council-chamber.jpg')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-950/90 border border-violet-400/40 text-violet-300 text-xs font-cinzel uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            The Citadel High Chamber
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-ice">
            THE SMALL COUNCIL & ORGANIZERS
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
            Meet the architects, marshals, and visionaries steering Carnival Da Chittagong College. Bound by honor and tireless dedication, they ensure the Citadel stands proud.
          </p>
        </div>
      </div>
      </Reveal>

      {/* Convener's Royal Proclamation */}
      <Reveal direction="zoom" className="frost-card p-6 md:p-10 rounded-3xl border-2 border-violet-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-950">
              <span className="font-cinzel-dec text-4xl md:text-5xl font-black text-amber-300 text-glow-gold">
                AM
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-400 text-slate-950 shadow">
              <Crown className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-cinzel text-amber-400 uppercase tracking-widest font-bold">
              <Scroll className="w-3.5 h-3.5" />
              Proclamation from the Office of the Convenor
            </div>
            <h2 className="font-cinzel-dec text-xl md:text-2xl font-bold text-white">
              "A Celebration of Academic Excellence, Creativity, Culture, and Youth Talent"
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed italic">
              "As the convenor, I assure you this platform has been built with dedication, transparency, and professionalism. This carnival will give students a space to showcase talent, exchange ideas, and foster collaboration. I am sincerely grateful to our respected Principal, Vice Principal, teachers, sponsors, volunteers, and participants for their guidance and support."
            </p>
            <div className="pt-2 text-xs font-cinzel">
              <span className="font-bold text-white block">Prof. Anowar Malek Mozumdar</span>
              <span className="text-violet-400">Convenor, Carnaval Da Chittagong College — Department of Islamic History</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <Reveal className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-cinzel text-slate-400 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" />
          Rank:
        </span>
        {categories.map((cat) => {
          const isSelected = filterCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => {
                soundFx.playSwordClash();
                setFilterCategory(cat.value);
              }}
              className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold tracking-wider transition-all ${
                isSelected
                  ? 'bg-violet-500/30 text-blue-300 border border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </Reveal>

      {/* Council Members Grid with RICH 3D HOVER ANIMATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member, i) => (
          <Reveal key={member.id} delay={(i % 4) * 90} className="h-full">
          <TiltCard
            onMouseEnter={() => soundFx.playRuneChime()}
            className="group relative h-full rounded-2xl bg-gradient-to-b from-[#130e2b] via-[#0d0a22] to-[#070512] border-2 border-slate-800 hover:border-violet-400 p-5 shadow-[0_10px_28px_rgba(2,8,20,0.5)] flex flex-col justify-between"
          >
            <div>
              {/* Member Portrait */}
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-square border border-slate-700 group-hover:border-violet-400/80 transition-colors flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-950/60 to-slate-950">
                <span className="font-cinzel-dec text-5xl md:text-6xl font-black text-violet-400/80 text-glow-ice group-hover:scale-110 transition-transform duration-500">
                  {getInitials(member.name)}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                {/* House Tag */}
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-slate-950/90 border border-violet-500/30 text-[10px] font-cinzel text-violet-300 truncate">
                  {member.houseAllegiance}
                </div>
              </div>

              {/* Roles & Title */}
              <div className="text-[11px] font-cinzel font-bold text-amber-400 uppercase tracking-wider mb-0.5">
                {member.gotTitle}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-violet-300/80 font-sans font-medium mb-1">
                {member.modernRole}
              </p>
              <div className="text-[10px] text-slate-400 font-mono mb-3">
                {member.department} &bull; {member.batch}
              </div>

              <p className="text-xs text-slate-300 font-sans italic line-clamp-3 mb-4 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                "{member.quote}"
              </p>
            </div>

            {/* Socials & Contact */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-white/10 hover:text-violet-400 transition-colors"
                    title="LinkedIn Raven"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials.facebook && (
                  <a
                    href={member.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-white/10 hover:text-violet-400 transition-colors"
                    title="Facebook Raven"
                  >
                    <Users className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-1.5 rounded hover:bg-white/10 hover:text-violet-400 transition-colors"
                    title="Dispatch Royal Mail"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <span className="text-[10px] font-cinzel text-slate-500 uppercase">
                Citadel Officer
              </span>
            </div>

            {/* Hover aura */}
            <div className="absolute inset-0 rounded-2xl bg-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Volunteer Battalion Callout */}
      <Reveal direction="zoom" className="frost-card p-8 md:p-10 rounded-3xl border border-violet-500/40 text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-violet-950 border border-violet-400 flex items-center justify-center mx-auto text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
          THE CITADEL VOLUNTEER CORPS
        </h3>
        <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Over 120 dedicated student marshals from Chittagong College ensure smooth gate operations, technical logistics, medical safety, and stage management.
        </p>
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-violet-500/30 text-xs font-cinzel text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Honoring the City Watch of Chittagong College</span>
          </div>
        </div>
      </Reveal>

    </div>
  );
};
