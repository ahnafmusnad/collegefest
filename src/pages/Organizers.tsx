import React from 'react';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import SmallCouncilReel from '../components/SmallCouncilReel';
import ProtectorSoloCard from '../components/ProtectorSoloCard';
import { Shield } from 'lucide-react';


const Organizers: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-36">


      {/* Page Hero */}
      <PageHero
        image="/images/small-council-chamber.webp"
        eyebrow="The Citadel High Chamber"
        title="The Small Council & Organizers"
        description="Meet the architects, marshals, and visionaries steering Carnaval Da Chittagong College. Bound by honor and tireless dedication, they ensure the Citadel stands proud."
      />


      {/* Protector of the Realm — solo high-seat card (replaces the
          old "Proclamation from the Office of the Convenor" panel) */}
      <ProtectorSoloCard />


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
      </Reveal>


    </div>
  );
};

export default Organizers;
