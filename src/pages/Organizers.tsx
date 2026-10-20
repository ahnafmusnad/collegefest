import React, { useState } from 'react';
import { SMALL_COUNCIL } from '../data/festData';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
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
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-16">
      
      {/* Page Hero */}
      <PageHero
        image="/images/small-council-chamber.jpg"
        icon={<Users className="h-3.5 w-3.5 text-ember" />}
        eyebrow="The Citadel High Chamber"
        title="The Small Council & Organizers"
        description="Meet the architects, marshals, and visionaries steering Carnaval Da Chittagong College. Bound by honor and tireless dedication, they ensure the Citadel stands proud."
      />

      {/* Convener's Royal Proclamation */}
      <Reveal direction="zoom" className="frost-card p-6 md:p-10 border-2 border-crimson/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden border-2 border-gold flex items-center justify-center bg-gradient-to-br from-ink-2 via-ink-3/40 to-ink">
              <span className="font-cinzel-dec text-4xl md:text-5xl font-black text-gold-2">
                AM
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gold text-ink shadow">
              <Crown className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-cinzel text-gold uppercase tracking-widest font-bold">
              <Scroll className="w-3.5 h-3.5" />
              Proclamation from the Office of the Convenor
            </div>
            <h2 className="font-cinzel-dec text-xl md:text-2xl font-bold text-white">
              "A Celebration of Academic Excellence, Creativity, Culture, and Youth Talent"
            </h2>
            <p className="font-sans text-xs md:text-sm text-bone-dim leading-relaxed italic">
              "As the convenor, I assure you this platform has been built with dedication, transparency, and professionalism. This carnaval will give students a space to showcase talent, exchange ideas, and foster collaboration. I am sincerely grateful to our respected Principal, Vice Principal, teachers, sponsors, volunteers, and participants for their guidance and support."
            </p>
            <div className="pt-2 text-xs font-cinzel">
              <span className="font-bold text-white block">Prof. Anowar Malek Mozumdar</span>
              <span className="text-gold">Convenor, Carnaval Da Chittagong College — Department of Islamic History</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <Reveal className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-cinzel text-bone-dim flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" />
          Rank:
        </span>
        {categories.map((cat) => {
          const isSelected = filterCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => {
                setFilterCategory(cat.value);
              }}
              className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold tracking-wider transition-all ${
                isSelected
                  ? 'bg-crimson/30 text-gold-2 border border-gold'
                  : 'bg-ink-2/60 text-bone-dim border border-iron hover:text-white hover:border-iron'
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

            className="group relative h-full bg-gradient-to-b from-ink-2 via-ink-2 to-ink border-2 border-iron hover:border-gold p-5 shadow-[0_10px_28px_rgba(11,9,7,0.5)] flex flex-col justify-between"
          >
            <div>
              {/* Member Portrait */}
              <div className="relative mb-4 overflow-hidden aspect-square border border-iron group-hover:border-gold/80 transition-colors flex items-center justify-center bg-gradient-to-br from-ink-2 via-ink-2/60 to-ink">
                <span className="font-cinzel-dec text-5xl md:text-6xl font-black text-gold/80 group-hover:scale-110 transition-transform duration-500">
                  {getInitials(member.name)}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />

                {/* House Tag */}
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-ink/90 border border-crimson/30 text-[10px] font-cinzel text-gold-2 truncate">
                  {member.houseAllegiance}
                </div>
              </div>

              {/* Roles & Title */}
              <div className="text-[11px] font-cinzel font-bold text-gold uppercase tracking-wider mb-0.5">
                {member.gotTitle}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white group-hover:text-gold-2 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-gold-2/80 font-sans font-medium mb-1">
                {member.modernRole}
              </p>
              <div className="text-[10px] text-bone-dim font-mono mb-3">
                {member.department} &bull; {member.batch}
              </div>

              <p className="text-xs text-bone-dim font-sans italic line-clamp-3 mb-4 bg-ink-2/60 p-2.5 border border-iron/80">
                "{member.quote}"
              </p>
            </div>

            {/* Socials & Contact */}
            <div className="pt-3 border-t border-iron flex items-center justify-between text-bone-dim">
              <div className="flex items-center gap-2">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-white/10 hover:text-gold transition-colors"
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
                    className="p-1.5 rounded hover:bg-white/10 hover:text-gold transition-colors"
                    title="Facebook Raven"
                  >
                    <Users className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-1.5 rounded hover:bg-white/10 hover:text-gold transition-colors"
                    title="Dispatch Royal Mail"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <span className="text-[10px] font-cinzel text-ash uppercase">
                Citadel Officer
              </span>
            </div>

            {/* Hover aura */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Volunteer Battalion Callout */}
      <Reveal direction="zoom" className="frost-card p-8 md:p-10 border border-crimson/40 text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-ink-2 border border-gold flex items-center justify-center mx-auto text-gold">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
          THE CITADEL VOLUNTEER CORPS
        </h3>
        <p className="font-sans text-xs md:text-sm text-bone-dim leading-relaxed max-w-xl mx-auto">
          Over 120 dedicated student marshals from Chittagong College ensure smooth gate operations, technical logistics, medical safety, and stage management.
        </p>
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink-2 border border-crimson/30 text-xs font-cinzel text-gold-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Honoring the City Watch of Chittagong College</span>
          </div>
        </div>
      </Reveal>

    </div>
  );
};
