import React, { useState } from 'react';
import { SPONSOR_TIERS } from '../data/festData';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import { TiltCard } from '../components/TiltCard';
import Button from '../components/ui/Button';
import { 
  Coins, 
  Crown, 
  ShieldCheck, 
  Check, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  Users,
  Landmark,
  ScrollText
} from 'lucide-react';


export const Sponsorships: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    repName: '',
    email: '',
    phone: '',
    tierInterested: 'Title Sponsor',
    notes: ''
  });


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
  };


  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-36">
      
      {/* Page Hero */}
      <PageHero
        image="/images/college-winter-citadel.webp"
        eyebrow="The Treasuries of the Iron Bank"
        title="Royal Sponsorships & Partners"
        description="Align your house and enterprise with a national academic festival at one of Bengal’s most venerable citadels. Command unprecedented brand visibility among 1,000+ bright young minds from 25+ institutions, with a digital reach over 1,000,000+."
      />


      {/* ROI & Reach Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-9">
        {[
          { label: 'On-Ground Footfall', value: '1,000+', desc: 'Students, Teachers & Guardians', icon: Users },
          { label: 'Participating Institutions', value: '25+', desc: 'SSC & HSC Level', icon: Building2 },
          { label: 'Digital Brand Reach', value: '1,000,000+', desc: 'Campaign & Coverage', icon: TrendingUp },
          { label: 'Festival Days', value: '2 Full Days', desc: 'Continuous Exposure', icon: Crown },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">
          <TiltCard


            className="stat-tablet text-center space-y-1 group h-full"
          >
            <stat.icon className="w-5 h-5 text-ember mx-auto group-hover:scale-110 transition-transform drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
            <div className="font-cinzel text-2xl md:text-3xl font-extrabold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
              {stat.value}
            </div>
            <div className="font-cinzel text-xs font-semibold text-gold-2/90 uppercase">
              {stat.label}
            </div>
            <div className="text-[11px] text-bone-dim font-sans">
              {stat.desc}
            </div>
          </TiltCard>
          </Reveal>
        ))}
      </div>


      {/* ========================================================
          THE 3 CORE TIERS: TITLE, PLATINUM, GOLD
          ======================================================== */}
      <section className="space-y-8">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2 border border-gold/30 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Coins className="w-3.5 h-3.5" />
            Partnership Tiers
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            THE HIERARCHY OF BENEFACTORS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-bone-dim">
            Hover over each royal scroll to view exclusive marketing perks, stage privileges, and brand integration.
          </p>
        </Reveal>


        {/* Sponsor Tier Cards Grid with 3D LIFT & TEAL GLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {SPONSOR_TIERS.map((tier, i) => {
            const isTitle = tier.id === 'tier-title';
            const tierKey = tier.id.replace('tier-', '');
            return (
              <Reveal key={tier.id} delay={i * 120} className="h-full">
              <TiltCard


                maxTilt={8}
                glareClassName="rounded-none"
                shadowClassName={isTitle ? '0 28px 55px rgba(2, 14, 16, 0.65), 0 0 42px rgba(23, 104, 110, 0.28)' : '0 18px 40px rgba(2, 10, 11, 0.6)'}
                className={`tier-card tier-card--${tierKey} relative h-full flex flex-col justify-between group ${isTitle ? 'tier-card--title' : ''}`}
              >
                {/* Crown Ribbon for Title */}
                {isTitle && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-crimson via-crimson-2 to-crimson text-gold-2 text-xs font-cinzel font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-crimson-2/40 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    Supreme Partnership
                  </div>
                )}


                <div className="relative z-10">
                  {/* Badges */}
                  <div className="flex items-center justify-center text-xs mb-3 pt-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-cinzel font-bold uppercase tracking-wider ${
                      isTitle ? 'bg-ember/15 text-ember border border-ember/60' : 'bg-ink-2 text-crimson-2 border border-crimson/40'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>


                   {/* Tier Title */}
                   <h3 className="font-cinzel-dec text-xl font-black text-white text-center group-hover:text-bone transition-colors">
                     {tier.name}
                   </h3>
                   <p className="font-cinzel text-[11px] text-gold/90 italic text-center">
                     "{tier.gotTitle}"
                   </p>
                   {/* sigil rule */}
                   <div className="flex items-center justify-center gap-2 mt-2 mb-4" aria-hidden="true">
                     <span className="h-px w-10 bg-gradient-to-r from-transparent to-crimson-2/60" />
                     <span className="h-1.5 w-1.5 rotate-45 bg-ember/80" />
                     <span className="h-px w-10 bg-gradient-to-l from-transparent to-crimson-2/60" />
                   </div>
                   {/* Slot Availability */}
                   <div className="p-2.5 bg-ink/80 border border-iron mb-4 text-center">
                     <span className="text-[9px] text-bone-dim uppercase font-cinzel block">Royal Availability</span>
                     <span className={`font-cinzel text-base sm:text-lg font-extrabold ${isTitle ? 'text-gold-2' : 'text-gold-2'}`}>
                       {tier.slots}
                     </span>
                   </div>
                   <p className="text-[11px] text-bone-dim leading-relaxed mb-4 text-center">
                     {tier.description}
                   </p>


                  {/* Brands sealed at this tier */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-center gap-1.5 font-cinzel text-xs font-bold uppercase tracking-widest text-bone">
                      <Landmark className="w-3.5 h-3.5 text-ember" />
                      Brands
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {(tier.brands ?? []).length > 0 ? (
                        tier.brands!.map((brand) => (
                          <span
                            key={brand}
                            className="group/brand inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink/70 border border-crimson/40 text-gold-2 text-[11px] font-cinzel tracking-wide transition-colors hover:border-ember hover:bg-ink-3/70"
                          >
                            <span className="h-1 w-1 rotate-45 bg-ember transition-transform group-hover/brand:scale-150" />
                            {brand}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-iron text-ash text-[11px] font-cinzel tracking-wide">
                          Your brand here
                        </span>
                      )}
                    </div>
                  </div>


                </div>


                {/* Bottom CTA — compact ghost cut so it never covers the
                    frame's bottom ornament */}
                <div className="relative z-10 pt-3.5 mt-3.5 border-t border-iron/60 text-center">
                  <Button
                    size="sm"
                    className="btn--ghost"
                    href="#sponsor-form"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, tierInterested: tier.name }));
                    }}
                  >
                    Select Tier
                  </Button>
                </div>
              </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>


      {/* Guild & Strategic Partners — royal proclamation on the wolf-crest frame */}
      <Reveal className="guild-frame text-center px-5 pt-12 pb-9 md:pt-14 md:pb-10 space-y-3">
        <div className="inline-flex items-center gap-2 font-cinzel text-[11px] text-gold uppercase tracking-widest font-bold">
          <ScrollText className="w-3.5 h-3.5 text-ember" />
          The Royal Guilds & Envoys
        </div>
        <h3 className="font-cinzel text-lg md:text-xl font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          Strategic In-Kind & Infrastructure Partners
        </h3>
        <p className="font-garamond italic text-xs md:text-[13px] text-bone/90 max-w-lg mx-auto leading-relaxed">
          The ticketing guilds, press houses and envoys of the realm set their
          seals upon this page — sworn allies of the Carnaval, recorded in the
          ledger of the Iron Bank.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-2/80 border border-crimson/40 text-gold-2 text-xs font-cinzel">
          <ShieldCheck className="w-4 h-4 text-ember" />
          Verified Guild Alliances
        </div>


        {/* sigil rule */}
        <div className="flex items-center justify-center gap-2 pt-3" aria-hidden="true">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-crimson-2/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-ember/80" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-crimson-2/60" />
        </div>


        {/* Guild entries — content sits open on the frame, no card chrome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-2xl mx-auto pt-1">
          {/* Tickify */}
          <div className="space-y-2.5 md:pr-10">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-ember/15 border border-ember/50 text-ember text-[10px] font-cinzel uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Official Ticketing Guild
              </span>
            </div>
            <h4 className="font-cinzel-dec text-lg font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
              Tickify <span className="font-cinzel text-xs font-semibold text-bone-dim">(tickify.live)</span>
            </h4>
            <p className="text-[11px] text-bone-dim leading-relaxed max-w-xs mx-auto">
              Powering the entire festival admission ecosystem with instant passes, student identity verification, and live gate scanning.
            </p>
            <div className="pt-1">
              <Button href="https://tickify.live" external size="sm">
                Visit Official Tickify Portal
              </Button>
            </div>
          </div>


          {/* Media Guild */}
          <div className="space-y-2.5 md:pl-10 md:border-l border-iron/40">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-crimson/15 border border-crimson/50 text-crimson-2 text-[10px] font-cinzel uppercase tracking-wider">
                <Crown className="w-3 h-3" />
                Press & Media Guild
              </span>
            </div>
            <h4 className="font-cinzel text-lg font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
              10–15 Press & Media Outlets
            </h4>
            <p className="text-[11px] text-bone-dim leading-relaxed max-w-xs mx-auto">
              Print, electronic, and campus press representatives covering the festival with live dispatches and student champion chronicles.
            </p>
            <div className="text-[11px] text-bone-dim italic font-garamond">
              Official Media Partners of the Carnaval
            </div>
          </div>
        </div>
      </Reveal>


      {/* ========================================================
          PETITION THE MASTER OF COIN (SPONSOR CONTACT FORM)
          ======================================================== */}
      <Reveal direction="zoom" className="tickify-frame relative overflow-hidden p-6 md:p-10" id="sponsor-form">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-3 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
              <Send className="w-3.5 h-3.5" />
              Petition The Small Council Treasury
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              BECOME A PATRON OF THE CITADEL
            </h3>
            <p className="font-sans text-xs sm:text-sm text-bone-dim">
              Transmit your royal seal and brand details to our Sponsorship Wing. Reach us at <span className="text-gold-2">carnavaldactgclg@gmail.com</span> or <span className="text-gold-2">+880 1776-810739</span> — our delegation will respond within 24 hours.
            </p>
          </div>


          {formSubmitted ? (
            <div className="p-8 bg-ink-3/40 border border-ember text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-ember text-ink flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white">Your Petition Has Reached The High Chamber!</h4>
              <p className="font-sans text-xs text-bone-dim max-w-md mx-auto">
                Our Master of Coin and Fest Convener have received your raven for the <strong>{formData.tierInterested}</strong>. A royal representative will dispatch a message shortly.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3"
                onClick={() => setFormSubmitted(false)}
              >
                Send Another Petition
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                    Organization / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder="e.g. Apex Holdings, Stark Beverages"
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white placeholder-ash outline-none"
                  />
                </div>


                <div>
                  <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                    Representative Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.repName}
                    onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                    placeholder="e.g. John Doe, Brand Manager"
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white placeholder-ash outline-none"
                  />
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rep@brand.com"
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white placeholder-ash outline-none"
                  />
                </div>


                <div>
                  <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1819-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white placeholder-ash outline-none"
                  />
                </div>
              </div>


              <div>
                <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                  Desired Partnership Tier *
                </label>
                <select
                  value={formData.tierInterested}
                  onChange={(e) => setFormData({ ...formData, tierInterested: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white outline-none"
                >
                  <option value="Title Sponsor">Title Sponsor - Official Naming Rights</option>
                  <option value="Power Sponsor">Power Sponsor - Powered-By Naming</option>
                  <option value="Platinum Sponsor">Platinum Sponsor - Workshop & Stage Access</option>
                  <option value="Gold Sponsor">Gold Sponsor - Banners, Stall & Stage Time</option>
                  <option value="Co-Sponsor">Co-Sponsor / Strategic In-Kind Partner</option>
                </select>
              </div>


              <div>
                <label className="block text-xs font-cinzel font-semibold text-bone-dim mb-1">
                  Custom Inquiries & Desired Segment Alignments
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify particular tournament co-branding, booth preferences, or campus activation ideas..."
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-ember focus:ring-1 focus:ring-ember text-xs text-white placeholder-ash outline-none resize-none"
                />
              </div>


              <div className="pt-2 text-center">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  DISPATCH PETITION TO MASTER OF COIN
                </Button>
              </div>
            </form>
          )}
        </div>
      </Reveal>


    </div>
  );
};
