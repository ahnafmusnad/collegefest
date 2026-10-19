import React, { useState } from 'react';
import { SPONSOR_TIERS } from '../data/festData';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { 
  Coins, 
  Crown, 
  ShieldCheck, 
  Check, 
  Download, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  ExternalLink,
  Users
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

  const handleDownloadDeck = () => {
    // Simulate instant download of royal sponsorship dossier
    const blob = new Blob([
      `CARNAVAL DA CHITTAGONG COLLEGE - SPONSORSHIP PROSPECTUS 2026\n\n` +
      `Citadel Venue: Chittagong College Heritage Campus, Chawkbazar\n` +
      `Dates: December 18-19, 2026\n` +
      `Estimated Reach: 1,000+ On-ground Attendees | 1,000,000+ Digital Impressions\n\n` +
      `TIERS AVAILABLE:\n` +
      `1. Title Sponsor ("The Hand of the King") - Official Naming Rights\n` +
      `2. Power Sponsor ("The Shield of the Realm") - Powered-By Naming\n` +
      `3. Platinum Sponsor ("High Valyrian Lords") - Workshop & Stage Access\n` +
      `4. Gold Sponsor ("The Iron Bank") - Banners, Stall & Stage Time\n` +
      `5. Co-Sponsor ("The Royal Guilds & Envoys") - In-Kind / Strategic Partnerships\n\n` +
      `Contact the Sponsorship Wing: carnavaldactgclg@gmail.com | +880 1776-810739\n` +
      `Sponsorship Wing Head: Sabbir Hossain`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CDCC-Fest-Sponsorship-Prospectus.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-16">
      
      {/* Page Hero Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-gold/30 bg-gradient-to-r from-ink-2 via-ink-3 to-ink-2 p-8 md:p-14 text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink-3/90 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest shadow-[0_0_15px_rgba(201,162,39,0.3)]">
            <Coins className="w-3.5 h-3.5" />
            The Treasuries of the Iron Bank
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-gold">
            ROYAL SPONSORSHIPS & PARTNERS
          </h1>
          <p className="font-sans text-sm sm:text-base text-bone-dim leading-relaxed">
            Align your house and enterprise with a national academic festival at one of Bengal’s most venerable citadels. Command unprecedented brand visibility among 1,000+ bright young minds from 25+ institutions, with a digital reach over 1,000,000+.
          </p>

          <div className="pt-3">
      <button
        onClick={handleDownloadDeck}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-ink bg-gradient-to-r from-gold via-gold-2 to-gold hover:from-gold-2 hover:to-bone border border-bone shadow-[0_0_20px_rgba(201,162,39,0.5)] btn-shine active:scale-95 transition-all uppercase tracking-wider"
      >
        <Download className="w-4 h-4" />
        <span>DOWNLOAD SPONSORSHIP PROSPECTUS</span>
      </button>
          </div>
        </div>
      </div>
      </Reveal>

      {/* ROI & Reach Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'On-Ground Footfall', value: '1,000+', desc: 'Students, Teachers & Guardians', icon: Users },
          { label: 'Participating Institutions', value: '25+', desc: 'SSC & HSC Level', icon: Building2 },
          { label: 'Digital Brand Reach', value: '1,000,000+', desc: 'Campaign & Coverage', icon: TrendingUp },
          { label: 'Festival Days', value: '2 Full Days', desc: 'Continuous Exposure', icon: Crown },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">
          <TiltCard

            className="frost-card p-5 rounded-2xl border border-gold/20 text-center space-y-1 hover:border-gold/50 transition-all group h-full"
          >
            <stat.icon className="w-5 h-5 text-gold mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-cinzel text-2xl md:text-3xl font-extrabold text-white text-glow-gold">
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

        {/* Sponsor Tier Cards Grid with 3D LIFT & GOLD GLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPONSOR_TIERS.map((tier, i) => {
            const isTitle = tier.id === 'tier-title';
            return (
              <Reveal key={tier.id} delay={i * 120} className="h-full">
              <TiltCard

                maxTilt={8}
                glareClassName="rounded-3xl"
                shadowClassName={isTitle ? '0 28px 55px rgba(60, 35, 5, 0.6), 0 0 36px rgba(158, 159, 159, 0.25)' : undefined}
                className={`relative h-full rounded-3xl border-2 p-6 md:p-8 flex flex-col justify-between group ${
                  isTitle
                    ? 'bg-gradient-to-b from-ink-3/80 via-ink-3/90 to-ink-2 border-gold shadow-[0_15px_40px_rgba(201,162,39,0.25)]'
                    : 'bg-gradient-to-b from-ink-2/90 via-ink-2/90 to-ink border-gold/50 hover:border-gold-2 shadow-[0_15px_40px_rgba(158,42,43,0.2)]'
                }`}
              >
                {/* Crown Ribbon for Title */}
                {isTitle && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold via-bone to-gold text-ink text-xs font-cinzel font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    Supreme Partnership
                  </div>
                )}

                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between text-xs mb-3 pt-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-cinzel font-bold uppercase tracking-wider ${
                      isTitle ? 'bg-ink-3/60 text-gold-2 border border-gold/40' : 'bg-ink-2 text-gold-2 border border-gold/40'
                    }`}>
                      {tier.badge}
                    </span>
                    <span className="text-bone-dim font-mono text-xs">{tier.slots}</span>
                  </div>

                  {/* Tier Title */}
                  <h3 className="font-cinzel-dec text-2xl font-black text-white group-hover:text-bone transition-colors">
                    {tier.name}
                  </h3>
                  <p className="font-cinzel text-xs text-gold/90 italic mb-4">
                    "{tier.gotTitle}"
                  </p>

                  {/* Slot Availability */}
                  <div className="p-3.5 rounded-2xl bg-ink/80 border border-iron mb-6 text-center">
                    <span className="text-[10px] text-bone-dim uppercase font-cinzel block">Royal Availability</span>
                    <span className={`font-cinzel text-lg sm:text-xl font-extrabold ${isTitle ? 'text-gold-2 text-glow-gold' : 'text-gold-2 text-glow-ice'}`}>
                      {tier.slots}
                    </span>
                  </div>

                  <p className="text-xs text-bone-dim leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Perks List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="font-cinzel text-xs font-bold uppercase tracking-widest text-bone">
                      Entitlements & Privileges:
                    </div>
                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-bone-dim">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isTitle ? 'text-gold' : 'text-gold'}`} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-iron/80">
                  <a
                    href="#sponsor-form"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, tierInterested: tier.name }));
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-center block transition-all shadow ${
                      isTitle
                        ? 'bg-gradient-to-r from-gold via-gold-2 to-gold hover:from-gold-2 hover:to-bone text-ink'
                        : 'bg-ink-3 hover:bg-ink-3 text-white border border-ash'
                    }`}
                  >
                    SELECT THIS TIER & CONTACT
                  </a>
                </div>
              </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Guild & Strategic Partners (Tickify, Media, Refreshment) */}
      <Reveal className="frost-card p-6 md:p-8 rounded-3xl border border-crimson/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-crimson/20 pb-4">
          <div>
            <span className="font-cinzel text-xs text-gold uppercase tracking-widest font-bold">
              The Royal Guilds & Envoys
            </span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
              Strategic In-Kind & Infrastructure Partners
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-2 border border-gold/40 text-gold-2 text-xs font-cinzel">
            <ShieldCheck className="w-4 h-4 text-gold" />
            Verified Guild Alliances
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tickify Box */}
          <TiltCard className="p-5 rounded-2xl bg-ink-2/80 border border-gold/50 flex flex-col justify-between space-y-3 group hover:border-gold-2 transition-colors shadow-[0_10px_28px_rgba(11,9,7,0.5)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-ink-2 border border-ember/40 text-gold-2 text-[10px] font-cinzel uppercase">
                  Official Ticketing Guild
                </span>
                <Sparkles className="w-4 h-4 text-ember" />
              </div>
              <h4 className="font-cinzel-dec text-xl font-bold text-white mt-2">
                Tickify (tickify.live)
              </h4>
              <p className="text-xs text-bone-dim mt-1">
                Powering the entire festival admission ecosystem with instant passes, student identity verification, and live gate scanning.
              </p>
            </div>
            <a
              href="https://tickify.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cinzel font-bold text-gold-2 flex items-center gap-1 hover:underline"
            >
              <span>Visit Official Tickify Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </TiltCard>

          {/* Media Guild */}
          <TiltCard className="p-5 rounded-2xl bg-ink-2/80 border border-iron flex flex-col justify-between space-y-3 shadow-[0_10px_28px_rgba(11,9,7,0.5)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-ink-2 border border-crimson/40 text-gold-2 text-[10px] font-cinzel uppercase">
                  Press & Media Guild
                </span>
                <Crown className="w-4 h-4 text-crimson-2" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white mt-2">
                10–15 Press & Media Outlets
              </h4>
              <p className="text-xs text-bone-dim mt-1">
                Print, electronic, and campus press representatives covering the festival with live dispatches and student champion chronicles.
              </p>
            </div>
            <div className="text-[11px] text-bone-dim italic">
              Official Media Partners of the Carnaval
            </div>
          </TiltCard>
        </div>
      </Reveal>

      {/* ========================================================
          PETITION THE MASTER OF COIN (SPONSOR CONTACT FORM)
      ======================================================== */}
      <Reveal direction="zoom" className="relative rounded-3xl bg-gradient-to-b from-ink-2/90 via-ink-2 to-ink border-2 border-gold/40 p-6 md:p-12 shadow-[0_0_50px_rgba(201,162,39,0.15)]" id="sponsor-form">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-3 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
              <Send className="w-3.5 h-3.5" />
              Petition The Small Council Treasury
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white text-glow-gold">
              BECOME A PATRON OF THE CITADEL
            </h3>
            <p className="font-sans text-xs sm:text-sm text-bone-dim">
              Transmit your royal seal and brand details to our Sponsorship Wing. Reach us at <span className="text-gold-2">carnavaldactgclg@gmail.com</span> or <span className="text-gold-2">+880 1776-810739</span> — our delegation will respond within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-ink-3/40 border border-gold text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-gold text-ink flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white">Your Petition Has Reached The High Chamber!</h4>
              <p className="font-sans text-xs text-bone-dim max-w-md mx-auto">
                Our Master of Coin and Fest Convener have received your raven for the <strong>{formData.tierInterested}</strong>. A royal representative will dispatch a message shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs font-cinzel text-gold underline hover:text-white"
              >
                Send Another Petition
              </button>
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
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white placeholder-ash outline-none"
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
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white placeholder-ash outline-none"
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
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white placeholder-ash outline-none"
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
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white placeholder-ash outline-none"
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
                  className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white outline-none"
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
                  className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-xs text-white placeholder-ash outline-none resize-none"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-ink bg-gradient-to-r from-gold via-gold-2 to-gold hover:from-gold-2 hover:to-bone shadow-[0_0_25px_rgba(201,162,39,0.5)] btn-shine active:scale-95 transition-all uppercase tracking-wider"
                >
                  DISPATCH PETITION TO MASTER OF COIN
                </button>
              </div>
            </form>
          )}
        </div>
      </Reveal>

    </div>
  );
};
