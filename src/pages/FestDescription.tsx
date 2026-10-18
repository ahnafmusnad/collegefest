import React, { useState } from 'react';
import { FEST_SCHEDULE, CAMPUS_LOCATIONS, FAQS } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
import { Reveal } from '../components/Reveal';
import { 
  Scroll, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Ticket, 
  ExternalLink,
  Crown
} from 'lucide-react';

interface FestDescriptionProps {
  onOpenTickify: () => void;
}

export const FestDescription: React.FC<FestDescriptionProps> = ({ onOpenTickify }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>(CAMPUS_LOCATIONS[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeDaySchedule = FEST_SCHEDULE.find(d => d.day === selectedDay) || FEST_SCHEDULE[0];
  const activeLocation = CAMPUS_LOCATIONS.find(l => l.id === selectedLocation) || CAMPUS_LOCATIONS[0];

  const toggleFaq = (index: number) => {
    soundFx.playRuneChime();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-20">
      
      {/* Page Hero Header */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-crimson/30 bg-gradient-to-r from-ink via-ink-2 to-ink p-8 md:p-14 text-center">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/images/college-winter-citadel.jpg')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink-2/90 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest shadow-[0_0_15px_rgba(158,42,43,0.3)]">
            <Scroll className="w-3.5 h-3.5" />
            The Chronicler's Parchment
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-ice">
            THE CHRONICLE OF THE REALM
          </h1>
          <p className="font-sans text-sm sm:text-base text-bone-dim leading-relaxed">
            Founded in 1869, Chittagong College stands as one of the most venerable educational citadels in Bengal. Carnaval Da Chittagong College is the grand winter convergence where our four legendary student clubs join forces to crown the realm’s brightest champions.
          </p>
        </div>
      </div>
      </Reveal>

      {/* ========================================================
          THE LORE OF THE RED CITADEL
      ======================================================== */}
      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-cinzel font-bold uppercase tracking-widest">
            <Crown className="w-4 h-4" />
            A Heritage Spanning Over 150 Winters
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
            Where Ancient Wisdom Meets Fierce Ambition
          </h2>
          <p className="font-sans text-sm text-bone-dim leading-relaxed">
            Perched atop the legendary hills of Chawkbazar, Chittagong College has nurtured prime ministers, revolutionary scholars, scientists, and master artists. When the winter chill embraces the campus brick towers, the four guardian clubs—Physics & Astronomy, English Language & Literature, Debating, and the Photographic Society—raise their banners.
          </p>
          <p className="font-sans text-sm text-bone-dim leading-relaxed">
            For two days, the campus transforms into an arena of science, language, debate, and the art of the lens. Whether you are stepping onto the debate podium or framing the perfect shot under the winter sky, you are part of this living saga.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <Reveal delay={0}>
              <div className="p-3.5 rounded-xl bg-ink-2/80 border border-crimson/20 text-center h-full">
                <div className="font-cinzel text-xl font-bold text-gold">1869</div>
                <div className="text-[11px] text-bone-dim font-cinzel uppercase mt-0.5">Citadel Founded</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="p-3.5 rounded-xl bg-ink-2/80 border border-ember/20 text-center h-full">
                <div className="font-cinzel text-xl font-bold text-ember">4 Houses</div>
                <div className="text-[11px] text-bone-dim font-cinzel uppercase mt-0.5">Club Alliance</div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="p-3.5 rounded-xl bg-ink-2/80 border border-gold/20 text-center h-full">
                <div className="font-cinzel text-xl font-bold text-gold">2 Days</div>
                <div className="text-[11px] text-bone-dim font-cinzel uppercase mt-0.5">Winter Glory</div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Citadel Visual Banner */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl border-2 border-crimson/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <img
              src="/images/college-winter-citadel.jpg"
              alt="Chittagong College Winter Citadel"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-ink/90 border border-gold/50 shadow-lg text-xs font-cinzel text-gold-2">
            <span className="font-bold text-white block">The Historic Red Keep</span>
            Chawkbazar Campus Grounds
          </div>
        </div>
      </Reveal>

      {/* ========================================================
          INTERACTIVE 3-DAY FEST SCHEDULE / TIMELINE
      ======================================================== */}
      <section className="space-y-8">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            The Citadel Order of Events
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white text-glow-ice">
            THE 3-DAY FESTIVAL ITINERARY
          </h2>
          <p className="font-sans text-xs sm:text-sm text-bone-dim">
            Select a festival day to reveal tournament rounds, ceremonies, and stage acts.
          </p>
        </Reveal>

        {/* Day Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {FEST_SCHEDULE.map((day) => {
            const isSelected = selectedDay === day.day;
            return (
              <button
                key={day.day}
                onClick={() => {
                  soundFx.playSwordClash();
                  setSelectedDay(day.day);
                }}
                className={`relative px-5 py-3 rounded-xl font-cinzel text-xs md:text-sm font-bold tracking-wider transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blood to-ember text-ink shadow-[0_0_20px_rgba(158,42,43,0.5)] border border-gold-2 scale-105'
                    : 'bg-ink-2/80 text-bone-dim hover:text-white hover:bg-ink-3 border border-iron'
                }`}
              >
                Day {day.day}: {day.gotTitle.split(':')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Day Content */}
        <Reveal key={selectedDay} direction="zoom">
        <div className="frost-card p-6 md:p-8 rounded-2xl border border-crimson/30 space-y-6">
          <div className="border-b border-crimson/20 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 className="font-cinzel-dec text-xl md:text-2xl font-bold text-white text-glow-ice">
                {activeDaySchedule.gotTitle}
              </h3>
              <p className="font-cinzel text-xs text-gold">{activeDaySchedule.date}</p>
            </div>
            <p className="font-sans text-xs text-bone-dim max-w-md">
              {activeDaySchedule.description}
            </p>
          </div>

          {/* Events Timeline */}
          <div className="space-y-3">
            {activeDaySchedule.events.map((evt, idx) => (
              <Reveal key={idx} delay={idx * 70}>
              <div
                onMouseEnter={() => soundFx.playRuneChime()}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-ink-2/60 hover:bg-ink-2/40 border border-iron hover:border-gold/50 transition-all duration-200 h-full"
              >
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-ink-2 border border-crimson/40 text-gold-2 font-mono text-xs font-bold shrink-0">
                    {evt.time}
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-gold-2 transition-colors">
                      {evt.title}
                    </h4>
                    {evt.house && (
                      <span className="text-[11px] font-cinzel text-gold">
                        Presented by {evt.house}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5 text-xs text-bone-dim">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{evt.venue}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase tracking-wider ${
                    evt.type === 'ceremony'
                      ? 'bg-ink-3/80 text-gold-2 border border-gold/40'
                      : evt.type === 'entertainment'
                      ? 'bg-pink-950/80 text-pink-300 border border-pink-500/40'
                      : 'bg-ink-2/80 text-gold-2 border border-crimson/40'
                  }`}>
                    {evt.type}
                  </span>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ========================================================
          CAMPUS CITADEL INTERACTIVE MAP
      ======================================================== */}
      <section className="space-y-6">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Geography of the Citadel
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            CAMPUS ARENAS & LANDMARKS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-bone-dim">
            Explore key tournament venues situated across Chittagong College's historic grounds.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Location Buttons list */}
          <div className="space-y-2">
            {CAMPUS_LOCATIONS.map((loc, i) => {
              const isSelected = selectedLocation === loc.id;
              return (
                <Reveal key={loc.id} delay={i * 80}>
                <button
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-ink-2/80 border-gold shadow-[0_0_20px_rgba(158,42,43,0.3)]'
                      : 'bg-ink-2/60 border-iron hover:border-crimson/40'
                  }`}
                  onClick={() => {
                    soundFx.playSwordClash();
                    setSelectedLocation(loc.id);
                  }}
                >
                  <div className="font-cinzel text-sm font-bold text-white flex items-center justify-between">
                    <span>{loc.name}</span>
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-ember' : 'text-ash'}`} />
                  </div>
                  <div className="font-cinzel text-xs text-gold italic mt-0.5">
                    "{loc.gotAlias}"
                  </div>
                </button>
                </Reveal>
              );
            })}
          </div>

          {/* Active Location Detail Card */}
          <Reveal key={selectedLocation} direction="left" className="lg:col-span-2 frost-card p-6 md:p-8 rounded-2xl border-2 border-crimson/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Selected Venue
              </div>
              <div>
                <h3 className="font-cinzel-dec text-2xl font-bold text-white">
                  {activeLocation.name}
                </h3>
                <p className="font-cinzel text-sm text-gold italic">
                  The Citadel Alias: "{activeLocation.gotAlias}"
                </p>
              </div>
              <p className="font-sans text-sm text-bone-dim leading-relaxed">
                {activeLocation.description}
              </p>

              <div>
                <div className="font-cinzel text-xs font-bold text-gold-2 uppercase tracking-widest mb-2">
                  Tournaments Hosted Here:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.eventsHosted.map((e, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-ink-2/70 border border-crimson/30 text-xs text-gold-2 font-sans"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-iron flex items-center justify-between text-xs text-bone-dim">
              <span>Location Coordinates: Chittagong College Heritage Campus</span>
              <button
                onClick={onOpenTickify}
                className="text-gold hover:text-white font-cinzel font-bold flex items-center gap-1"
              >
                <span>Book Event Pass</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ========================================================
          THE CITADEL CODEX & SAFETY RULES
      ======================================================== */}
      <Reveal className="rounded-2xl bg-gradient-to-r from-ink via-ink-2 to-ink border border-crimson/30 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-ink-2 border border-gold/50">
            <ShieldCheck className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              The Citadel Codex: Rules of Honor
            </h3>
            <p className="text-xs text-bone-dim font-cinzel">Strictly enforced by the Commander of the City Watch</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-bone-dim">
          <Reveal delay={0}>
            <div className="p-4 rounded-xl bg-ink-2/60 border border-iron space-y-1 h-full">
              <div className="font-cinzel font-bold text-gold-2 text-sm">Valid Identification</div>
              <p className="text-bone-dim">All students and warriors must carry their institution ID card along with their digital or printed Tickify QR Pass for access.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="p-4 rounded-xl bg-ink-2/60 border border-iron space-y-1 h-full">
              <div className="font-cinzel font-bold text-gold-2 text-sm">Sanctity of the Arena</div>
              <p className="text-bone-dim">No weapons with sharpened steel, fire hazards, or prohibited items. Prop weapons for cosplay must pass inspection at the North Gate.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="p-4 rounded-xl bg-ink-2/60 border border-iron space-y-1 h-full">
              <div className="font-cinzel font-bold text-gold-2 text-sm">Knightly Conduct</div>
              <p className="text-bone-dim">Respect all house delegates, faculty grand maesters, and volunteer marshals. Unruly conduct results in immediate banishment.</p>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* ========================================================
          ROYAL FAQ ACCORDION
      ======================================================== */}
      <section className="space-y-6">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            Answers from the Citadel
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <Reveal key={index} delay={index * 80}>
              <div
                className="frost-card rounded-xl border border-crimson/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left font-cinzel text-sm md:text-base font-bold text-white hover:text-gold-2"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gold shrink-0" /> : <ChevronDown className="w-5 h-5 text-ash shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-bone-dim font-sans leading-relaxed border-t border-iron/60 bg-ink/40 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to Tickify */}
      <Reveal className="text-center pt-6">
        <button
          onClick={() => {
            soundFx.playRoyalHorn();
            onOpenTickify();
          }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-cinzel text-sm md:text-base font-bold text-ink bg-gradient-to-r from-ember via-gold-2 to-gold hover:from-gold-2 hover:to-gold-2 shadow-[0_0_25px_rgba(158,42,43,0.5)] active:scale-95 transition-all uppercase tracking-wider"
        >
          <Ticket className="w-5 h-5" />
          <span>JOIN THE FESTIVAL VIA TICKIFY</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </Reveal>

    </div>
  );
};
