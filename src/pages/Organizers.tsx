import React from 'react';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import SmallCouncilReel from '../components/SmallCouncilReel';
import { Crown, Shield, Users, Sparkles, Scroll } from 'lucide-react';


export const Organizers: React.FC = () => {
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
      <Reveal direction="zoom" className="frost-card proclamation-panel p-6 md:p-10 border-2 border-crimson/40 relative overflow-hidden">
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


      {/* Small Council reel (full screen width) */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <SmallCouncilReel />
      </div>


      {/* Volunteer Battalion Callout */}
      <Reveal direction="flip" duration={1100} className="frost-card stone-panel p-8 md:p-10 border border-crimson/40 text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-ink-2 border border-gold flex items-center justify-center mx-auto text-gold">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
          THE CITADEL VOLUNTEER CORPS
        </h3>
        <p className="font-sans text-xs md:text-sm text-bone leading-relaxed max-w-xl mx-auto">
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
