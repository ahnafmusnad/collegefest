import React, { useEffect, useRef, useState } from 'react';
import { FOUR_HOUSES, FEST_SEGMENTS } from '../data/festData';
import { HOUSE_DETAILS, type HouseKeeper, type HouseMoment } from '../data/houseDetails';
import { ClubHouse, PageType } from '../types';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import GemDivider from '../components/ui/GemDivider';
import EyebrowRule from '../components/ui/EyebrowRule';
import Button from '../components/ui/Button';
import ResponsiveImg from '../components/ui/ResponsiveImg';
import {
  ArrowRight,
  Award,
  CalendarDays,
  Camera,
  Check,
  Crown,
  Gem,
  MapPin,
  ScrollText,
  ShieldHalf,
  Sparkles,
  Trophy,
  Users
} from 'lucide-react';




const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const PRINT_TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1', 'rotate-1'];




const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();




/* Four corner brackets — the shared frame ornament of the site */
const Corners: React.FC<{ size?: string }> = ({ size = 'h-4 w-4' }) => (
  <>
    <span aria-hidden="true" className={`pointer-events-none absolute left-2 top-2 ${size} border-l border-t border-gold-2/50`} />
    <span aria-hidden="true" className={`pointer-events-none absolute right-2 top-2 ${size} border-r border-t border-gold-2/50`} />
    <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b border-l border-gold-2/50`} />
    <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b border-r border-gold-2/50`} />
  </>
);




/* Image that swaps to a themed fallback if the file is missing */
const HouseImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}> = ({ src, alt, className = '', fallback }) => {
  const [failed, setFailed] = useState(!src);
  if (failed) return <>{fallback}</>;
  return (
    <ResponsiveImg
      src={src}
      alt={alt}
      sizes="(max-width: 640px) 160px, (max-width: 1024px) 232px, 348px"
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};




/* Shared section heading */
const SectionHead: React.FC<{
  kicker: string;
  title: string;
  sub?: string;
  icon: React.ElementType;
}> = ({ kicker, title, sub, icon: Icon }) => (
  <Reveal className="mx-auto max-w-3xl text-center">
    <span className="hh-kicker">
      <Icon className="h-3.5 w-3.5" />
      {kicker}
    </span>
    <h3 className="hh-title mt-3">{title}</h3>
    <GemDivider className="my-4" />
    {sub && <p className="hh-lead">{sub}</p>}
  </Reveal>
);




/* Portrait in the Small Council frame */
const KeeperCard: React.FC<{ keeper: HouseKeeper; featured?: boolean }> = ({ keeper, featured = false }) => (
  <figure className="flex flex-col items-center text-center">
    <div
      className={`hh-keeper relative shrink-0 overflow-hidden ${
        featured
          ? 'h-[300px] w-[200px] md:h-[348px] md:w-[232px]'
          : 'h-[204px] w-[136px] sm:h-[240px] sm:w-[160px] md:h-[270px] md:w-[180px]'
      }`}
    >
      <HouseImage
        key={keeper.image}
        src={keeper.image}
        alt={keeper.name}
        className="absolute left-1/2 top-[45.2%] aspect-square w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-2/40 object-cover"
        fallback={
          <span
            className={`absolute left-0 right-0 top-[45.2%] flex -translate-y-1/2 items-center justify-center font-cinzel-dec leading-none text-gold-2 drop-shadow-[0_0_22px_rgba(231,227,216,0.22)] ${
              featured ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'
            }`}
          >
            {getInitials(keeper.name)}
          </span>
        }
      />
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(231,227,216,0.08),transparent_60%)]" />
      <span className="absolute bottom-[16%] left-[14%] right-[14%] border border-gold-2/40 bg-ink/80 px-1.5 py-1.5 font-cinzel text-[7px] uppercase leading-snug tracking-[0.12em] text-bone backdrop-blur-sm sm:text-[8px] md:text-[9px]">
        {keeper.title}
      </span>
    </div>
    <figcaption className="mt-4 max-w-[240px]">
      <p className={`font-cinzel font-semibold text-gold-2 ${featured ? 'text-lg md:text-xl' : 'text-[14px] sm:text-[15px]'}`}>
        {keeper.name}
      </p>
      <p className="mt-1 font-cinzel text-[9px] uppercase tracking-[0.22em] text-[#5bc9d6] sm:text-[10px]">
        {keeper.role}
      </p>
    </figcaption>
  </figure>
);




/* Parchment photo print */
const MomentPrint: React.FC<{ moment: HouseMoment; index: number }> = ({ moment, index }) => (
  <figure
    className={`chronicle-print group relative ${PRINT_TILTS[index % PRINT_TILTS.length]} transition-all duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03]`}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <HouseImage
        key={moment.img}
        src={moment.img}
        alt={moment.title}
        className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
        fallback={
          <div className="hh-photo-fallback">
            <Camera className="h-7 w-7 text-[#5bc9d6]" />
            <span>Photo coming soon</span>
          </div>
        }
      />
      <div className="pointer-events-none absolute inset-0 bg-[#04191c]/40 transition-opacity duration-500 group-hover:opacity-0" />
      <span className="absolute left-2 top-2 flex h-6 w-6 rotate-45 items-center justify-center border border-[#5bc9d6]/60 bg-ink/85 shadow-[0_0_12px_rgba(91,201,214,0.35)]">
        <span className="-rotate-45 font-cinzel text-[10px] font-bold text-[#8ce8f2]">{ROMAN[index]}</span>
      </span>
    </div>
    <figcaption className="px-2 pb-1 pt-3 text-center">
      <p className="font-cinzel text-[14px] font-bold tracking-wide text-[#e7e3d8]">{moment.title}</p>
      <p className="mt-1.5 font-garamond text-[14px] italic leading-snug text-bone-dim">{moment.caption}</p>
    </figcaption>
  </figure>
);




interface ClubsProps {
  onNavigate: (page: PageType) => void;
  onPledgeHouse: (house: ClubHouse) => void;
  userPledgedHouse: ClubHouse | null;
  /** Open the chronicle of this house (from the home lore modal). */
  focusHouseId?: string | null;
}




const Clubs: React.FC<ClubsProps> = ({ onNavigate, onPledgeHouse, userPledgedHouse, focusHouseId }) => {
  const [activeHouseId, setActiveHouseId] = useState<string>(focusHouseId ?? userPledgedHouse?.id ?? FOUR_HOUSES[0].id);
  const dossierRef = useRef<HTMLElement>(null);

  // When the home lore archive sends us here, open that house's chronicle
  useEffect(() => {
    if (focusHouseId && FOUR_HOUSES.some((h) => h.id === focusHouseId)) {
      setActiveHouseId(focusHouseId);
      requestAnimationFrame(() => {
        dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [focusHouseId]);




  const activeIndex = Math.max(0, FOUR_HOUSES.findIndex((h) => h.id === activeHouseId));
  const activeHouse = FOUR_HOUSES[activeIndex];
  const details = HOUSE_DETAILS[activeHouse.id];
  const hostedTrials = FEST_SEGMENTS.filter((s) => s.houseId === activeHouse.id);
  const isActivePledged = userPledgedHouse?.id === activeHouse.id;




  const membersOf = (house: ClubHouse) =>
    HOUSE_DETAILS[house.id]?.membersLabel ?? (house.memberCount > 0 ? `${house.memberCount}+` : '—');




  const handlePledge = async (house: ClubHouse) => {
    onPledgeHouse(house);
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };




  const openChronicle = (id: string) => {
    setActiveHouseId(id);
    requestAnimationFrame(() => {
      dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };




  const vitals = [
    { label: 'Founded', value: activeHouse.founded, icon: CalendarDays },
    { label: 'Sworn Members', value: membersOf(activeHouse), icon: Users },
    { label: 'Sigil', value: activeHouse.sigil, icon: ShieldHalf },
    { label: 'Trophies Won', value: activeHouse.trophiesWon, icon: Trophy }
  ];




  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-20 sm:space-y-32 lg:space-y-44">




      {/* Page Hero — unchanged */}
      <PageHero
        image="/images/four-houses-heraldry.webp"
        eyebrow="The Citadel Quadrumvirate"
        title="The Four Great Houses"
        description="Four legendary clubs anchor Chittagong College’s student body. Each house bears its own sigil, sacred motto, heroic ancestry, and fierce competitive fire."
      />




      {/* ========================================================
          I. THE HALL OF BANNERS
      ======================================================== */}
      <section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <EyebrowRule>The Hall of Banners</EyebrowRule>
          <h2 className="hh-title mt-6">Choose Your Banner</h2>
          <GemDivider className="my-4" />
          <p className="hh-lead">
            Four banners hang in the Great Hall of the Citadel. Tap a banner to unroll its full
            chronicle — its founding oath, its keepers, its trophies and its deeds — then pledge
            your sword to the house that calls to you.
          </p>
        </Reveal>




        <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
          {FOUR_HOUSES.map((house, i) => {
            const isActive = house.id === activeHouseId;
            const isPledged = userPledgedHouse?.id === house.id;
            return (
              <Reveal key={house.id} delay={i * 90} className="h-full">
                <article className={`hh-banner ${isActive ? 'hh-banner--active' : ''}`}>
                  <span className="hh-banner__rod" aria-hidden="true" />
                  <div className="hh-banner__cloth">
                    <button
                      type="button"
                      onClick={() => openChronicle(house.id)}
                      aria-pressed={isActive}
                      className="group relative z-[1] flex flex-1 flex-col items-center text-center"
                    >
                      <span className="hh-banner__numeral">{ROMAN[i]}</span>




                      <span className="hh-medallion mt-2 transition-transform duration-500 group-hover:scale-105">
                        <ResponsiveImg
                          src={house.logo}
                          alt={`${house.shortName} logo`}
                          sizes="(max-width: 640px) 58px, 76px"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>




                      {/* actual club name first & largest; the GoT house
                          name is now the small secondary line */}
                      <span className="mt-4 font-got text-[11px] leading-[1.25] text-gold-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] sm:text-[12px]">
                        {house.name.split('(')[0].trim()}
                      </span>
                      <span className="mt-1.5 font-cinzel text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9fd8d2] sm:text-[9px]">
                        {house.houseName}
                      </span>




                      <span className="my-2.5 h-px w-11 bg-gradient-to-r from-transparent via-gold-2/60 to-transparent" />




                      <span className="font-garamond text-[13px] italic leading-snug text-bone sm:text-[14px]">
                        &ldquo;{house.motto}&rdquo;
                      </span>












                    </button>





                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>




      {/* ========================================================
          II. THE HOUSE CHRONICLE (selected house)
      ======================================================== */}
      <section ref={dossierRef} className="scroll-mt-28">
        <div key={activeHouse.id} className="animate-fadeIn space-y-14 sm:space-y-24 lg:space-y-28">




          {/* ---- Crest header ---- */}
          <Reveal direction="up">
            <div className="hh-crest relative overflow-hidden px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-14">
              <Corners size="h-5 w-5" />
              <span aria-hidden="true" className="hh-crest__numeral">{ROMAN[activeIndex]}</span>




              <div className="relative z-10 grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-10">
                <div className="hh-medallion hh-medallion--lg">
                  <ResponsiveImg
                    src={activeHouse.logo}
                    alt={`${activeHouse.shortName} logo`}
                    sizes="(max-width: 640px) 136px, 136px"
                    loading="eager"
                    decoding="async"
                  />
                </div>




                <div className="text-center md:text-left">
                  <span className="hh-kicker">
                    <Sparkles className="h-3.5 w-3.5" />
                    House {ROMAN[activeIndex]}{details ? ` · ${details.code}` : ''}
                  </span>
                   <h2 className="mt-3 font-got text-xl leading-[1.2] text-gold-2 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] sm:text-3xl md:text-4xl">
                     {activeHouse.name}
                   </h2>
                  <p className="mt-2 font-cinzel text-xs font-semibold uppercase tracking-[0.24em] text-[#9fd8d2] sm:text-sm">
                    {activeHouse.houseName} &middot; The {activeHouse.sigil}
                  </p>
                  <p className="mt-4 font-garamond text-xl italic text-[#8ce8f2] sm:text-2xl">
                    &ldquo;{activeHouse.motto}&rdquo;
                  </p>

                </div>
              </div>




              <p className="hh-body relative z-10 mt-8 max-w-3xl text-center md:text-left">
                {activeHouse.lore}
              </p>




              <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {vitals.map((v) => (
                  <div key={v.label} className="hh-stone">
                    <v.icon className="mx-auto h-4 w-4 text-[#5bc9d6]" />
                    <div className="mt-2 font-cinzel text-[10px] uppercase tracking-[0.22em] text-ash">{v.label}</div>
                    <div className="mt-1 font-cinzel text-[15px] font-bold leading-tight text-[#e7e3d8] sm:text-lg">{v.value}</div>
                  </div>
                ))}
              </div>




              <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                {isActivePledged ? (
                  <span className="inline-flex items-center gap-2 border border-[#5bc9d6]/50 bg-[#17686e]/20 px-4 py-2.5 font-cinzel text-[11px] font-bold uppercase tracking-[0.2em] text-[#8ce8f2]">
                    <Check className="h-4 w-4" />
                    Sworn to {activeHouse.houseName}
                  </span>
                ) : (
                  <Button onClick={() => handlePledge(activeHouse)}>{`Pledge to ${activeHouse.houseName}`}</Button>
                )}
                {activeHouse.links.website && (
                  <Button variant="secondary" size="sm" href={activeHouse.links.website} external>
                    Official Website
                  </Button>
                )}
                {activeHouse.links.facebook && (
                  <Button variant="secondary" size="sm" href={activeHouse.links.facebook} external>
                    Facebook Page
                  </Button>
                )}
              </div>
            </div>
          </Reveal>




          {/* ---- Founding oath + pillars ---- */}
          {details && (
            <div className="grid gap-8 lg:grid-cols-5">
              <Reveal direction="left" className="lg:col-span-2">
                <div className="hh-panel relative h-full p-6 sm:p-8">
                  <Corners />
                  <span className="hh-kicker">
                    <ScrollText className="h-3.5 w-3.5" />
                    The Founding Oath
                  </span>
                  <h3 className="mt-3 font-cinzel text-xl font-bold text-[#e7e3d8] sm:text-2xl">
                    Why the House Was Raised
                  </h3>
                  <div className="mt-4 h-px w-16 bg-gradient-to-r from-crimson-2 to-transparent" />
                  <p className="hh-body mt-5 first-letter:float-left first-letter:mr-2 first-letter:font-cinzel-dec first-letter:text-5xl first-letter:leading-[0.9] first-letter:text-gold-2">
                    {details.foundingPurpose}
                  </p>
                </div>
              </Reveal>





            </div>
          )}




          {/* ---- Halls of glory ---- */}
          {details && (
            <section>
              <SectionHead
                icon={Trophy}
                kicker="Halls of Glory"
                title="Trophies & Laurels"
                sub={`Honours carried home under the banner of ${activeHouse.houseName}.`}
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {activeHouse.achievements.map((ach, i) => (
                  <Reveal key={ach} delay={i * 80} className="h-full">
                    <div className="hh-laurel">
                      <span className="hh-laurel__icon">
                        <Award className="h-4 w-4" />
                      </span>
                      <p className="pt-1.5 text-[15px] leading-relaxed text-bone">{ach}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}




          {/* ---- Keepers of the house ---- */}
          {details && (
            <section className="hh-panel relative overflow-hidden px-3 py-8 sm:px-8 sm:py-12 md:py-16">
              <Corners size="h-5 w-5" />
              <SectionHead
                icon={Crown}
                kicker="The Keepers of the House"
                title="Those Who Hold the Banner"
                sub={`The president and core council who lead ${activeHouse.houseName} through the winter.`}
              />
              <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
                <Reveal direction="zoom">
                  <KeeperCard keeper={details.president} featured />
                </Reveal>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:pt-10">
                  {details.coreMembers.map((k, i) => (
                    <Reveal key={`${k.role}-${i}`} delay={i * 100}>
                      <KeeperCard keeper={k} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}




          {/* ---- Deeds in pictures ---- */}
          {details && details.moments.length > 0 && (
            <section>
              <SectionHead
                icon={Camera}
                kicker="The Living Chronicle"
                title="Deeds in Pictures"
                sub={`Moments seized by ${activeHouse.shortName} — on stage, under the stars and across the Citadel grounds.`}
              />
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {details.moments.map((m, i) => (
                  <Reveal key={`${m.img}-${i}`} delay={i * 90}>
                    <MomentPrint moment={m} index={i} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}




          {/* ---- Trials hosted by this house ---- */}
          <section className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h3 className="hh-title mt-3 lg:col-span-full text-center lg:text-left">Trials Raised by {activeHouse.houseName}</h3>

            <div className="space-y-3">
              {hostedTrials.length === 0 ? (
                <p className="hh-lead text-center">This house's trials will be proclaimed soon.</p>
              ) : (
                hostedTrials.map((seg, i) => (
                  <Reveal key={seg.id} direction="right" delay={i * 70}>
                    <div className="hh-trial">
                      <Gem className="h-3.5 w-3.5 shrink-0 text-[#5bc9d6]" />
                      <div className="min-w-0 flex-1">
                        <p className="font-cinzel text-[14px] font-bold text-bone">{seg.title}</p>
                        <p className="font-garamond text-[14px] italic text-bone-dim">&ldquo;{seg.gotTitle}&rdquo;</p>
                        <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.14em] text-ash sm:hidden">
                          {seg.venue} · {seg.date}
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="flex items-center justify-end gap-1.5 font-cinzel text-[10px] uppercase tracking-[0.14em] text-ash">
                          <MapPin className="h-3 w-3" />
                          {seg.venue}
                        </p>
                        <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.14em] text-gold-2">{seg.date}</p>
                      </div>
                    </div>
                  </Reveal>
                ))
              )}
            </div>
          </section>
        </div>
      </section>




    </div>
  );
};

export default Clubs;