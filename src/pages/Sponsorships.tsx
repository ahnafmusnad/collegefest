import React, { useState } from 'react';
import { SPONSOR_TIERS } from '../data/festData';
import { soundFx } from '../utils/soundEffects';
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
    soundFx.playSwordClash();
    // Simulate instant download of royal sponsorship dossier
    const blob = new Blob([
      `CARNIVAL DA CHITTAGONG COLLEGE - SPONSORSHIP PROSPECTUS 2026\n\n` +
      `Citadel Venue: Chittagong College Heritage Campus, Chawkbazar\n` +
      `Estimated Reach: 6,000+ On-ground Attendees | 100,000+ Digital Impressions\n\n` +
      `TIERS AVAILABLE:\n` +
      `1. Title Sponsor ("Hand of the King"): ৳ 1,50,000 BDT (1 Exclusive)\n` +
      `2. Platinum Sponsor ("High Valyrian"): ৳ 80,000 BDT (3 Slots)\n` +
      `3. Gold Sponsor ("Iron Bank"): ৳ 45,000 BDT (5 Slots)\n\n` +
      `Contact Master of Coin: sponsorships@cdccfest.org | +880 1819-000000`
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
    soundFx.playRoyalHorn();
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
    <div className="pt-24 pb-20 px-4 text-slate-100 max-w-7xl mx-auto space-y-16">
      
      {/* Page Hero Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-gradient-to-r from-[#0d0a05] via-[#1a1306] to-[#070b13] p-8 md:p-14 text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/90 border border-amber-400/40 text-amber-300 text-xs font-cinzel uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Coins className="w-3.5 h-3.5" />
            The Treasuries of the Iron Bank
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-gold">
            ROYAL SPONSORSHIPS & PARTNERS
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
            Align your house and enterprise with the greatest youth gathering in Chittagong. Command unprecedented brand visibility among over 6,000 ambitious minds and 45+ participating institutions.
          </p>

          <div className="pt-3">
            <button
              onClick={handleDownloadDeck}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 border border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD SPONSORSHIP PROSPECTUS (PDF/DOC)</span>
            </button>
          </div>
        </div>
      </div>
      </Reveal>

      {/* ROI & Reach Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Campus Footfall', value: '6,000+', desc: 'Students & Delegates', icon: Users },
          { label: 'Participating Campuses', value: '45+', desc: 'Colleges & Universities', icon: Building2 },
          { label: 'Digital Brand Reach', value: '100,000+', desc: 'Impressions & Streams', icon: TrendingUp },
          { label: 'Festival Days', value: '3 Full Days', desc: 'Continuous Exposure', icon: Crown },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 90} className="h-full">
          <TiltCard
            onMouseEnter={() => soundFx.playRuneChime()}
            className="frost-card p-5 rounded-2xl border border-amber-500/20 text-center space-y-1 hover:border-amber-400/50 transition-all group h-full"
          >
            <stat.icon className="w-5 h-5 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-cinzel text-2xl md:text-3xl font-extrabold text-white text-glow-gold">
              {stat.value}
            </div>
            <div className="font-cinzel text-xs font-semibold text-amber-300/90 uppercase">
              {stat.label}
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-400/30 text-amber-300 text-xs font-cinzel uppercase tracking-widest">
            <Coins className="w-3.5 h-3.5" />
            Partnership Tiers
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            THE HIERARCHY OF BENEFACTORS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400">
            Hover over each royal scroll to view exclusive marketing perks, stage privileges, and brand integration.
          </p>
        </Reveal>

        {/* Sponsor Tier Cards Grid with 3D LIFT & GOLD GLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPONSOR_TIERS.slice(0, 3).map((tier, i) => {
            const isTitle = tier.id === 'tier-title';
            return (
              <Reveal key={tier.id} delay={i * 120} className="h-full">
              <TiltCard
                onMouseEnter={() => soundFx.playRuneChime()}
                maxTilt={8}
                glareClassName="rounded-3xl"
                shadowClassName={isTitle ? '0 28px 55px rgba(60, 35, 5, 0.6), 0 0 36px rgba(245, 158, 11, 0.25)' : undefined}
                className={`relative h-full rounded-3xl border-2 p-6 md:p-8 flex flex-col justify-between group ${
                  isTitle
                    ? 'bg-gradient-to-b from-amber-950/80 via-[#161208]/90 to-[#0a0805] border-amber-400 shadow-[0_15px_40px_rgba(245,158,11,0.25)]'
                    : 'bg-gradient-to-b from-[#091529]/90 via-[#060e1d]/90 to-[#040812] border-sky-400/50 hover:border-sky-300 shadow-[0_15px_40px_rgba(56,189,248,0.2)]'
                }`}
              >
                {/* Crown Ribbon for Title */}
                {isTitle && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-slate-950 text-xs font-cinzel font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    Supreme Partnership
                  </div>
                )}

                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between text-xs mb-3 pt-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-cinzel font-bold uppercase tracking-wider ${
                      isTitle ? 'bg-amber-900/60 text-amber-300 border border-amber-400/40' : 'bg-sky-950 text-sky-300 border border-sky-400/40'
                    }`}>
                      {tier.badge}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">{tier.slots}</span>
                  </div>

                  {/* Tier Title */}
                  <h3 className="font-cinzel-dec text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
                    {tier.name}
                  </h3>
                  <p className="font-cinzel text-xs text-amber-400/90 italic mb-4">
                    "{tier.gotTitle}"
                  </p>

                  {/* Price */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-cinzel block">Financial Outlay</span>
                    <span className={`font-cinzel text-2xl sm:text-3xl font-extrabold ${isTitle ? 'text-amber-300 text-glow-gold' : 'text-sky-300 text-glow-ice'}`}>
                      {tier.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Perks List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="font-cinzel text-xs font-bold uppercase tracking-widest text-slate-200">
                      Entitlements & Privileges:
                    </div>
                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isTitle ? 'text-amber-400' : 'text-sky-400'}`} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Confirmed Sponsors */}
                  {tier.currentSponsors && tier.currentSponsors.length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80">
                      <span className="text-[10px] font-cinzel uppercase tracking-wider text-slate-400 block mb-2">
                        Pledged Royal Patrons:
                      </span>
                      <div className="space-y-1.5">
                        {tier.currentSponsors.map((cs, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                            <span className="font-bold text-white block">{cs.name}</span>
                            <span className="text-[10px] text-slate-400 italic">{cs.tagline}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <a
                    href="#sponsor-form"
                    onClick={() => {
                      soundFx.playSwordClash();
                      setFormData(prev => ({ ...prev, tierInterested: tier.name }));
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-center block transition-all shadow ${
                      isTitle
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
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
      <Reveal className="frost-card p-6 md:p-8 rounded-3xl border border-sky-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-500/20 pb-4">
          <div>
            <span className="font-cinzel text-xs text-sky-400 uppercase tracking-widest font-bold">
              The Royal Guilds & Envoys
            </span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
              Strategic In-Kind & Infrastructure Partners
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950 border border-sky-400/40 text-sky-300 text-xs font-cinzel">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            Verified Guild Alliances
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tickify Box */}
          <TiltCard className="p-5 rounded-2xl bg-slate-900/80 border border-sky-400/50 flex flex-col justify-between space-y-3 group hover:border-sky-300 transition-colors shadow-[0_10px_28px_rgba(2,8,20,0.5)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-cinzel uppercase">
                  Official Ticketing Guild
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-cinzel-dec text-xl font-bold text-white mt-2">
                Tickify (tickify.live)
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Powering the entire festival admission ecosystem with instant passes, student identity verification, and live gate scanning.
              </p>
            </div>
            <a
              href="https://tickify.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cinzel font-bold text-cyan-300 flex items-center gap-1 hover:underline"
            >
              <span>Visit Official Tickify Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </TiltCard>

          {/* Media Guild */}
          <TiltCard className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3 shadow-[0_10px_28px_rgba(2,8,20,0.5)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 text-[10px] font-cinzel uppercase">
                  National Media Guild
                </span>
                <Crown className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white mt-2">
                The Daily Chittagong Tribune
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Delivering front-page features, live festival video dispatches, and student champion chronicles across print and online networks.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              Broadcast Partner of Chittagong College
            </div>
          </TiltCard>
        </div>
      </Reveal>

      {/* ========================================================
          PETITION THE MASTER OF COIN (SPONSOR CONTACT FORM)
      ======================================================== */}
      <Reveal direction="zoom" className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a1424] to-[#040810] border-2 border-amber-500/40 p-6 md:p-12 shadow-[0_0_50px_rgba(245,158,11,0.15)]" id="sponsor-form">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-400/40 text-amber-300 text-xs font-cinzel uppercase tracking-widest">
              <Send className="w-3.5 h-3.5" />
              Petition The Small Council Treasury
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white text-glow-gold">
              BECOME A PATRON OF THE CITADEL
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400">
              Transmit your royal seal and brand details to our Master of Coin. Our treasury delegation will respond within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-amber-950/40 border border-amber-400 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-white">Your Petition Has Reached The High Chamber!</h4>
              <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                Our Master of Coin and Fest Convener have received your raven for the <strong>{formData.tierInterested}</strong>. A royal representative will dispatch a message shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs font-cinzel text-amber-400 underline hover:text-white"
              >
                Send Another Petition
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                    Organization / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder="e.g. Apex Holdings, Stark Beverages"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                    Representative Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.repName}
                    onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                    placeholder="e.g. John Doe, Brand Manager"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rep@brand.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1819-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                  Desired Partnership Tier *
                </label>
                <select
                  value={formData.tierInterested}
                  onChange={(e) => setFormData({ ...formData, tierInterested: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white outline-none"
                >
                  <option value="Title Sponsor">Title Sponsor (৳ 1,50,000 BDT) - Exclusive Hand of the King</option>
                  <option value="Platinum Sponsor">Platinum Sponsor (৳ 80,000 BDT) - High Valyrian</option>
                  <option value="Gold Sponsor">Gold Sponsor (৳ 45,000 BDT) - Iron Bank</option>
                  <option value="Guild Strategic Partner">Guild / Strategic In-Kind Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-semibold text-slate-300 mb-1">
                  Custom Inquiries & Desired Segment Alignments
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify particular tournament co-branding, booth preferences, or campus activation ideas..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none resize-none"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95 transition-all uppercase tracking-wider"
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
