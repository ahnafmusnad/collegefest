import React, { useState } from 'react';
import { FEST_SCHEDULE, CAMPUS_LOCATIONS, FAQS } from '../data/festData';
import { Reveal } from '../components/Reveal';
import Button from '../components/ui/Button';
import { 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Crown,
  Atom,
  BookOpen,
  Brain,
  Camera,
  Compass,
  Feather,
  Gavel,
  Sparkles,
  Trophy
} from 'lucide-react';


/* ---- Images used by this page. To use your own photos, just replace the
        files in public/images (or change these two paths). ---- */
const HERO_IMAGE = '/images/hero-castle.jpg';
const LORE_IMAGE = '/images/red-keep.jpg';


/* Brushed-silver heading look */
const SILVER =
  'text-gold-2 [text-shadow:0_1px_0_rgba(255,255,255,0.22),0_2px_6px_rgba(0,0,0,0.75),0_0_28px_rgba(31,138,145,0.25)]';


/* Thin silver rule with a teal diamond in the centre */
const OrnamentRule: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px w-16 bg-gradient-to-r from-transparent to-iron sm:w-28" />
    <span className="h-1.5 w-1.5 rotate-45 border border-ember/80 bg-ink-3 shadow-[0_0_8px_rgba(31,138,145,0.6)]" />
    <span className="h-px w-16 bg-gradient-to-l from-transparent to-iron sm:w-28" />
  </div>
);


/* Small-caps label with a crown in front */
const Eyebrow: React.FC<{ children: React.ReactNode; align?: 'center' | 'start' }> = ({
  children,
  align = 'center'
}) => (
  <p
    className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-bone-dim ${
      align === 'center' ? 'justify-center' : 'justify-start'
    }`}
  >
    <Crown className="h-3.5 w-3.5 text-ember" />
    {children}
  </p>
);


/* Pick a schedule icon from the event title / type */
const getEventIcon = (title: string, type: string): React.ElementType => {
  const t = title.toLowerCase();
  if (type === 'ceremony') return t.includes('closing') || t.includes('prize') || t.includes('coronation') ? Trophy : Crown;
  if (t.includes('debate')) return BookOpen;
  if (t.includes('auction')) return Gavel;
  if (t.includes('physics')) return Atom;
  if (t.includes('english')) return Feather;
  if (t.includes('quiz')) return Brain;
  if (t.includes('photo')) return Camera;
  if (t.includes('hunt')) return Compass;
  return Sparkles;
};


const LORE_STATS = [
  { value: '1869', label: 'Citadel Founded' },
  { value: '4 Houses', label: 'Club Alliance' },
  { value: '2 Days', label: 'Winter Glory' }
];


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
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


  const scrollToLore = () => {
    document.getElementById('fest-lore')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="text-bone">


      {/* ========================================================
          HERO — THE CHRONICLE OF THE REALM
      ======================================================== */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="The Red Citadel of Chittagong College under a winter storm"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_45%,transparent_35%,rgba(2,10,11,0.85)_100%)]" />
        </div>


        {/* torch glows */}
        <div className="animate-ember pointer-events-none absolute bottom-24 left-[12%] h-40 w-40 rounded-full bg-ember/10 blur-3xl" />
        <div className="animate-ember pointer-events-none absolute bottom-32 right-[12%] h-40 w-40 rounded-full bg-ember/10 blur-3xl" style={{ animationDelay: '1.6s' }} />


        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-24 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-ember/45 bg-ink-2/60 px-6 py-2.5 backdrop-blur-md">
            <Crown className="h-3.5 w-3.5 text-ember" />
            <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-bone">
              The Chronicler's Parchment
            </span>
          </div>


          <h1
            className={`font-cinzel animate-fade-up mt-8 text-4xl font-bold leading-[1.08] tracking-wide sm:text-6xl lg:text-[4.6rem] ${SILVER}`}
            style={{ animationDelay: '120ms' }}
          >
            The Chronicle{' '}
            <span className="font-garamond text-[0.52em] font-normal italic tracking-normal text-bone/90">
              of the
            </span>{' '}
            Realm
          </h1>


          <p
            className="animate-fade-up mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-bone/90 sm:text-[15px]"
            style={{ animationDelay: '240ms' }}
          >
            Founded in 1869, Chittagong College stands as one of the most venerable educational citadels in Bengal. Carnaval Da Chittagong College is the grand winter convergence where our four legendary student clubs join forces to crown the realm’s brightest champions.
          </p>
        </div>


        {/* scroll cue */}
        <button
          type="button"
          onClick={scrollToLore}
          aria-label="Scroll to the lore"
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ember/80 transition-colors hover:text-ember"
        >
          <span className="flex h-9 w-9 rotate-45 items-center justify-center border border-ember/50 bg-ink-2/70 backdrop-blur-sm">
            <ChevronDown className="h-4 w-4 -rotate-45 animate-bob" />
          </span>
        </button>
      </section>


      {/* ---------- all other sections ---------- */}
      <div className="mx-auto max-w-7xl space-y-24 px-4 py-24 sm:px-6 lg:px-8">


        {/* ========================================================
            THE LORE OF THE RED CITADEL
        ======================================================== */}
        <section id="fest-lore" className="grid items-center gap-14 lg:grid-cols-2">
          {/* Text column */}
          <Reveal direction="right">
            <Eyebrow align="start">A Heritage Spanning Over 150 Winters</Eyebrow>
            <h2 className={`font-cinzel mt-5 text-3xl font-bold leading-tight tracking-wide sm:text-[2.6rem] ${SILVER}`}>
              Where Ancient Wisdom Meets Fierce Ambition
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-bone/90 sm:text-[15px]">
              Perched atop the legendary hills of Chawkbazar, Chittagong College has nurtured prime ministers, revolutionary scholars, scientists, and master artists. When the winter chill embraces the campus brick towers, the four guardian clubs—Physics & Astronomy, English Language & Literature, Debating, and the Photographic Society—raise their banners.
            </p>
            <p className="font-garamond mt-4 text-[15px] italic leading-relaxed text-bone-dim">
              For two days, the campus transforms into an arena of science, language, debate, and the art of the lens. Whether you are stepping onto the debate podium or framing the perfect shot under the winter sky, you are part of this living saga.
            </p>


            {/* Stats */}
            <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
              {LORE_STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 120} direction="up">
                  <div className="corner-frame h-full border border-ember/30 bg-ink-2/60 px-3 py-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-ember/60">
                    <span className="corner tl" />
                    <span className="corner tr" />
                    <span className="corner bl" />
                    <span className="corner br" />
                    <p className="font-cinzel text-xl font-bold text-ember sm:text-2xl">{s.value}</p>
                    <p className="mt-2 text-[8.5px] font-semibold uppercase tracking-[0.22em] text-bone-dim sm:text-[9.5px]">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>


          {/* Image column */}
          <Reveal direction="left" className="relative">
            <div className="corner-frame relative overflow-hidden border border-iron/40">
              <span className="corner tl z-10" />
              <span className="corner tr z-10" />
              <span className="corner bl z-10" />
              <span className="corner br z-10" />
              <img
                src={LORE_IMAGE}
                alt="The historic red keep of Chawkbazar campus grounds"
                className="h-[420px] w-full object-cover transition-transform duration-[1.8s] ease-out hover:scale-105 sm:h-[520px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
            </div>
            {/* caption card */}
            <div className="frost-card absolute -bottom-6 left-6 right-6 flex items-center gap-3 px-5 py-4 sm:left-auto sm:right-8 sm:max-w-xs">
              <MapPin className="h-4 w-4 shrink-0 text-ember" />
              <div>
                <p className="font-cinzel text-[13px] font-bold tracking-wide text-gold-2">
                  The Historic Red Keep
                </p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-bone-dim">
                  Chawkbazar Campus Grounds
                </p>
              </div>
            </div>
          </Reveal>
        </section>


        {/* ========================================================
            INTERACTIVE FEST SCHEDULE / TIMELINE
        ======================================================== */}
        <section>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Citadel Order of Events</Eyebrow>
            <h2 className={`font-cinzel mt-5 text-4xl font-bold tracking-wide sm:text-5xl ${SILVER}`}>
              The 3-Day Festival Itinerary
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bone-dim sm:text-base">
              Select a festival day to reveal tournament rounds, ceremonies, and stage acts.
            </p>
            <OrnamentRule className="mt-8" />
          </Reveal>


          {/* Day selector */}
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {FEST_SCHEDULE.map((day) => {
              const isSelected = selectedDay === day.day;
              return (
                <button
                  key={day.day}
                  onClick={() => {
                    setSelectedDay(day.day);
                  }}
                  className={`btn-shine rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition-all duration-300 ${
                    isSelected
                      ? 'border border-ember/70 bg-gradient-to-r from-crimson to-crimson-2 text-gold-2 shadow-[0_0_28px_-6px_rgba(23,104,110,0.8)]'
                      : 'border border-iron/50 bg-ink-2/60 text-bone-dim hover:border-ember/50 hover:text-gold-2'
                  }`}
                >
                  Day {day.day}: {day.gotTitle.split(':')[0]}
                </button>
              );
            })}
          </Reveal>


          {/* Active day panel */}
          <div key={activeDaySchedule.day} className="animate-fade-up mx-auto mt-12 max-w-5xl">
            <div className="corner-frame frost-card p-6 sm:p-10">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />


              {/* Day heading */}
              <div className="flex items-start gap-5 border-b border-iron/30 pb-7">
                <div className="animate-float hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ember/50 bg-ink-3/70 text-ember shadow-[0_0_22px_-4px_rgba(31,138,145,0.55)] sm:flex">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-cinzel text-2xl font-bold tracking-wide text-ember sm:text-3xl">
                    {activeDaySchedule.gotTitle}
                  </h3>
                  <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-bone-dim">
                    {activeDaySchedule.date}
                  </p>
                  <p className="font-garamond mt-3 max-w-2xl text-[15px] italic leading-relaxed text-bone/85">
                    {activeDaySchedule.description}
                  </p>
                </div>
              </div>


              {/* Timeline rows */}
              <ol className="mt-2">
                {activeDaySchedule.events.map((evt, idx) => {
                  const Icon = getEventIcon(evt.title, evt.type);
                  return (
                    <li
                      key={`${activeDaySchedule.day}-${idx}`}
                      className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-b border-iron/20 py-5 transition-colors duration-300 last:border-0 hover:bg-ink-3/30 sm:grid-cols-[92px_auto_1fr_auto] sm:gap-x-5 sm:px-3"
                    >
                      {/* Time chip */}
                      <span className="inline-flex items-center justify-center rounded-md border border-ember/40 bg-ink-3/50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-ember transition-all duration-300 group-hover:border-ember group-hover:shadow-[0_0_14px_-3px_rgba(31,138,145,0.7)]">
                        {evt.time}
                      </span>


                      {/* Icon */}
                      <span className="hidden h-10 w-10 items-center justify-center rounded-md border border-iron/40 bg-ink-2 text-gold transition-colors duration-300 group-hover:border-ember/50 group-hover:text-ember sm:flex">
                        <Icon className="h-4 w-4" />
                      </span>


                      {/* Title + house */}
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[15px] font-semibold text-gold-2 transition-colors duration-300 group-hover:text-white">
                          {evt.title}
                        </p>
                        {evt.house && (
                          <p className="mt-1 text-[11px] tracking-wide text-ash">
                            Presented by <span className="text-bone-dim">{evt.house}</span>
                          </p>
                        )}
                      </div>


                      {/* Venue + type */}
                      <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-2 sm:col-span-1 sm:justify-end">
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bone-dim">
                          <MapPin className="h-3.5 w-3.5 text-ash" />
                          {evt.venue}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${
                            evt.type === 'ceremony'
                              ? 'border-ember/50 bg-crimson/20 text-ember'
                              : 'border-iron/50 bg-ink-3/40 text-bone-dim'
                          }`}
                        >
                          {evt.type}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
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
                        ? 'bg-ink-2/80 border-gold'
                        : 'bg-ink-2/60 border-iron hover:border-crimson/40'
                    }`}
                    onClick={() => {
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
            <Reveal key={selectedLocation} direction="left" className="lg:col-span-2 frost-card p-6 md:p-8 border-2 border-crimson/30 flex flex-col justify-between">
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
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenTickify}
                >
                  Book Event Pass
                </Button>
              </div>
            </Reveal>


          </div>
        </section>


        {/* ========================================================
            THE CITADEL CODEX & SAFETY RULES
        ======================================================== */}
        <Reveal className="bg-gradient-to-r from-ink via-ink-2 to-ink border border-crimson/30 p-8 space-y-6">
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
              <div className="p-4 bg-ink-2/60 border border-iron space-y-1 h-full">
                <div className="font-cinzel font-bold text-gold-2 text-sm">Valid Identification</div>
                <p className="text-bone-dim">All students and warriors must carry their institution ID card along with their digital or printed Tickify QR Pass for access.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="p-4 bg-ink-2/60 border border-iron space-y-1 h-full">
                <div className="font-cinzel font-bold text-gold-2 text-sm">Sanctity of the Arena</div>
                <p className="text-bone-dim">No weapons with sharpened steel, fire hazards, or prohibited items. Prop weapons for cosplay must pass inspection at the North Gate.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="p-4 bg-ink-2/60 border border-iron space-y-1 h-full">
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
                  className="frost-card border border-crimson/20 overflow-hidden transition-all"
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
        <Reveal className="text-center">
          <Button
            onClick={() => {
              onOpenTickify();
            }}
          >
            JOIN THE FESTIVAL VIA TICKIFY
          </Button>
        </Reveal>


      </div>


    </div>
  );
};
