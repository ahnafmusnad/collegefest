import React, { useState } from 'react';
import { FEST_SCHEDULE, FAQS } from '../data/festData';
import { Reveal } from '../components/Reveal';
import CitadelArenas from '../components/CitadelArenas';
import Button from '../components/ui/Button';
import EyebrowRule from '../components/ui/EyebrowRule';
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
  ScrollText,
  Sparkles,
  Swords,
  Trophy
} from 'lucide-react';


/* ---- Images used by this page. To use your own photos, just replace the
        files in public/images (or change these two paths). ---- */
const HERO_IMAGE = '/images/hero-castle.webp';
const LORE_IMAGE = '/images/red-keep.webp';


/* Brushed-silver heading look */
const SILVER =
  'text-gold-2 [text-shadow:0_1px_0_rgba(231,227,216,0.12),0_2px_6px_rgba(0,0,0,0.75),0_0_28px_rgba(31,138,145,0.25)]';


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
  { value: '1869', label: 'Citadel Founded', stone: 'lore-stone--founding' },
  { value: '4 Houses', label: 'Club Alliance', stone: 'lore-stone--houses' },
  { value: '2 Days', label: 'Winter Glory', stone: 'lore-stone--days' }
];


interface FestDescriptionProps {
  onOpenTickify: () => void;
}


export const FestDescription: React.FC<FestDescriptionProps> = ({ onOpenTickify }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);


  const activeDaySchedule = FEST_SCHEDULE.find(d => d.day === selectedDay) || FEST_SCHEDULE[0];


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
          {/* Eyebrow — the chronicler's rule: hairlines + ember diamonds, no icon */}
          <EyebrowRule className="animate-fade-up">The Chronicler's Parchment</EyebrowRule>


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
      <div className="mx-auto max-w-7xl space-y-32 px-4 py-24 sm:px-6 lg:px-8">


        {/* ========================================================
            THE LORE OF THE RED CITADEL
        ======================================================== */}
  <section id="fest-lore" className="grid items-center gap-14 lg:grid-cols-2">

        {/* Text column */}
        <Reveal direction="left">
          <div className="lore-parchment">
            <h2 className={`font-cinzel mt-0 text-xl font-bold leading-tight tracking-wide sm:text-[1.75rem] ${SILVER}`}>
              Where Ancient Wisdom Meets Fierce Ambition
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-bone/90 sm:text-[15px]">
              Perched atop the legendary hills of Chawkbazar, Chittagong College has nurtured prime ministers, revolutionary scholars, scientists, and master artists. When the winter chill embraces the campus brick towers, the four guardian clubs—Physics & Astronomy, English Language & Literature, Debating, and the Photographic Society—raise their banners.
            </p>
            <p className="font-garamond mt-3 text-[15px] italic leading-[1.7] text-bone-dim sm:text-[16px]">
              For two days, the campus transforms into an arena of science, language, debate, and the art of the lens. Whether you are stepping onto the debate podium or framing the perfect shot under the winter sky, you are part of this living saga.
            </p>


            {/* Stats */}
            <div className="mx-auto mt-3.5 grid max-w-sm grid-cols-3 gap-1.5 sm:gap-2.5">
              {LORE_STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 120}>
                  <div className="h-full px-1 py-2.5 text-center sm:px-1.5">
                    <p className="lore-stone__value font-cinzel text-[15px] font-bold leading-none sm:text-lg">{s.value}</p>
                    <p className="lore-stone__label mt-1 text-[6.5px] font-semibold uppercase leading-[1.2] tracking-[0.2em] sm:text-[8px]">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
        {/* Image column */}
          <Reveal direction="right" className="relative">
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
                      ? 'border border-[#e7e3d8]/60 bg-gradient-to-b from-[#e7e3d8] to-[#9e9f9f] text-ink shadow-[0_14px_28px_-16px_rgba(0,0,0,0.95)]'
                      : 'border border-iron/60 bg-transparent text-bone-dim hover:border-[#c9d2d2]/70 hover:text-[#e7e3d8]'
                  }`}
                >
                  Day {day.day}: {day.gotTitle.split(':')[0]}
                </button>
              );
            })}
          </Reveal>


          {/* Active day panel */}
          <div key={activeDaySchedule.day} className="animate-fade-up mx-auto mt-12 max-w-5xl">
            <div className="stone-panel mx-auto max-w-5xl space-y-6 px-2 py-3 sm:px-4 sm:py-4">


              {/* Day heading */}
              <div className="flex items-start gap-5 border-b border-iron/30 pb-7">
                <div className="animate-float hidden shrink-0 text-[#5bc9d6] sm:block">
                  <Compass className="h-11 w-11" />
                </div>
                <div>
                  <h3 className="font-cinzel text-2xl font-bold tracking-wide text-[#5bc9d6] sm:text-3xl">
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
                      className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-b border-iron/20 py-5 transition-colors duration-300 last:border-0 sm:grid-cols-[92px_auto_1fr_auto] sm:gap-x-5 sm:px-3"
                    >
                      {/* Time chip */}
                      <span className="inline-flex items-center text-[11px] font-bold tracking-[0.14em] text-[#5bc9d6] transition-colors duration-300 group-hover:text-gold-2">
                        {evt.time}
                      </span>


                      {/* Icon */}
                      <span className="hidden items-center justify-center text-[#5bc9d6] transition-colors duration-300 group-hover:text-gold-2 sm:flex">
                        <Icon className="h-5 w-5" />
                      </span>


                      {/* Title + house */}
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[15px] font-semibold text-white transition-colors duration-300 group-hover:text-gold-2">
                          {evt.title}
                        </p>
                        {evt.house && (
                          <p className="mt-1 text-[11px] tracking-wide text-bone-dim">
                            Presented by <span className="text-[#5bc9d6]">{evt.house}</span>
                          </p>
                        )}
                      </div>


                      {/* Venue + type */}
                      <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-2 sm:col-span-1 sm:justify-end">
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-bone-dim">
                          <MapPin className="h-3.5 w-3.5 text-[#5bc9d6]" />
                          {evt.venue}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                            evt.type === 'ceremony'
                              ? 'text-[#5bc9d6]'
                              : 'text-bone-dim'
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
        <CitadelArenas onBook={onOpenTickify} />


        {/* ========================================================
            THE CITADEL CODEX & SAFETY RULES — carved stone decrees
        ======================================================== */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>The Law of the Land</Eyebrow>
            <h2 className={`font-cinzel mt-5 text-3xl font-bold tracking-wide sm:text-4xl ${SILVER}`}>
              The Citadel Codex
            </h2>
            <p className="mt-3 font-cinzel text-[11px] uppercase tracking-[0.3em] text-bone-dim sm:text-xs">
              Rules of Honor — enforced by the Commander of the City Watch
            </p>
            <OrnamentRule className="mt-6" />
          </Reveal>

          <Reveal direction="zoom" duration={1100} className="mt-10">
            <div className="stone-panel relative px-4 py-8 sm:px-8 sm:py-10">
              {/* corner brackets */}
              <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-gold-2/60" aria-hidden="true" />
              <span className="pointer-events-none absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-gold-2/60" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-gold-2/60" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-gold-2/60" aria-hidden="true" />

              {/* shield medallion crest */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2" aria-hidden="true">
                <span className="flex h-12 w-12 rotate-45 items-center justify-center border border-[#5bc9d6]/60 bg-ink-2 shadow-[0_0_24px_rgba(91,201,214,0.45)]">
                  <ShieldCheck className="h-5 w-5 -rotate-45 text-[#8ce8f2]" />
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3 sm:gap-8">
                {[
                  {
                    numeral: 'I',
                    icon: <ScrollText className="h-4 w-4" />,
                    title: 'Valid Identification',
                    body: 'All students and warriors must carry their institution ID card along with their digital or printed Tickify QR Pass for access.'
                  },
                  {
                    numeral: 'II',
                    icon: <Swords className="h-4 w-4" />,
                    title: 'Sanctity of the Arena',
                    body: 'No weapons with sharpened steel, fire hazards, or prohibited items. Prop weapons for cosplay must pass inspection at the North Gate.'
                  },
                  {
                    numeral: 'III',
                    icon: <Gavel className="h-4 w-4" />,
                    title: 'Knightly Conduct',
                    body: 'Respect all house delegates, faculty grand maesters, and volunteer marshals. Unruly conduct results in immediate banishment.'
                  }
                ].map((decree, i) => (
                  <Reveal key={decree.numeral} delay={i * 110} className="h-full">
                    <div className="codex-decree relative h-full p-5 sm:p-6">
                      {/* hanging numeral seal */}
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 rotate-45 items-center justify-center border border-[#5bc9d6]/45 bg-ink-2/90">
                          <span className="font-cinzel text-sm font-bold -rotate-45 text-[#8ce8f2]">{decree.numeral}</span>
                        </span>
                        <span className="text-[#5bc9d6]">{decree.icon}</span>
                      </div>

                      <h3 className="mt-4 font-cinzel text-[15px] font-bold tracking-wide text-white sm:text-base">
                        {decree.title}
                      </h3>
                      <span className="mt-2 block h-px w-10 bg-gradient-to-r from-[#5bc9d6]/70 to-transparent" aria-hidden="true" />
                      <p className="mt-3 text-xs leading-relaxed text-bone-dim sm:text-[13px]">
                        {decree.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* enforcement strip */}
              <div className="mt-6 flex items-center justify-center gap-3 border-t border-[#5bc9d6]/20 pt-5 text-center">
                <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#5bc9d6]/40 sm:block" aria-hidden="true" />
                <p className="font-cinzel text-[9px] uppercase tracking-[0.26em] text-[#9fd8d2] sm:text-[10px]">
                  Breaking the Codex earns swift banishment beyond the walls
                </p>
                <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#5bc9d6]/40 sm:block" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </section>


        {/* ========================================================
            ROYAL FAQ ACCORDION — ravens of inquiry
        ======================================================== */}
        <section className="space-y-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 border border-[#5bc9d6]/40 bg-ink-2/80 px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#8ce8f2] sm:text-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              Answers from the Citadel
            </div>
            <h2 className={`font-cinzel mt-5 text-3xl font-bold tracking-wide sm:text-4xl ${SILVER}`}>
              Frequently Asked Questions
            </h2>
            <p className="mt-3 font-garamond text-sm italic text-bone-dim sm:text-[15px]">
              Send no raven before reading these — the maesters have answered the realm&rsquo;s most common calls.
            </p>
            <OrnamentRule className="mt-6" />
          </Reveal>


          <div className="mx-auto max-w-3xl space-y-5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <Reveal key={index} delay={index * 80}>
                  <div className={`faq-item relative ${isOpen ? 'faq-item--open' : ''}`}>
                    {/* question number plaque */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-3.5 p-4 text-left sm:gap-4 sm:p-5"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border font-cinzel text-xs font-bold transition-colors duration-300 sm:h-10 sm:w-10 ${
                          isOpen
                            ? 'border-[#5bc9d6]/70 bg-[#17686e]/30 text-[#8ce8f2]'
                            : 'border-iron/70 bg-ink-2/80 text-bone-dim'
                        }`}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`flex-1 font-cinzel text-[13px] font-bold leading-snug transition-colors duration-300 sm:text-[15px] ${
                          isOpen ? 'text-[#dcefee]' : 'text-bone hover:text-white'
                        }`}
                      >
                        {faq.q}
                      </span>

                      {/* diamond toggle */}
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
                        <span className={`faq-diamond absolute h-3 w-3 rotate-45 border ${isOpen ? 'border-transparent' : 'border-ash/70 bg-transparent'}`} />
                        {isOpen ? (
                          <ChevronUp className="relative h-4 w-4 text-ink" />
                        ) : (
                          <ChevronDown className="relative h-4 w-4 text-ash" />
                        )}
                      </span>
                    </button>

                    {/* smooth reveal body */}
                    <div className="faq-body">
                      <div>
                        <div className="border-t border-[#5bc9d6]/20 px-4 pb-5 pt-4 sm:px-5 sm:pl-[4.75rem]">
                          <p className="text-xs leading-relaxed text-bone-dim sm:text-sm">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
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
