import React, { useState } from 'react';
import { X, ExternalLink, Ticket, Check, Shield, Sparkles, Copy } from 'lucide-react';
import { FEST_METADATA } from '../data/festData';
import { soundFx } from '../utils/soundEffects';

interface TickifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSegment?: string;
}

export const TickifyModal: React.FC<TickifyModalProps> = ({
  isOpen,
  onClose,
  preselectedSegment,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedPass, setSelectedPass] = useState<'standard' | 'tournament' | 'vip'>('tournament');

  if (!isOpen) return null;

  const handleCopyLink = () => {
    soundFx.playSwordClash();
    navigator.clipboard.writeText(FEST_METADATA.tickifyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const passes = [
    {
      id: 'standard',
      name: 'General Citadel Pass',
      gotName: 'Commoner’s Entry Writ',
      price: '৳ 250 BDT',
      desc: 'Full 2-day general entry to college grounds, exhibitions, and public stages.',
      perks: ['2-day general grounds access', 'Access to food court & stalls', 'View all open tournaments', 'Concert access (General lawn)'],
      color: 'border-slate-700 hover:border-violet-500'
    },
    {
      id: 'tournament',
      name: 'House Champion Pass',
      gotName: 'Knight’s Tourney Writ',
      price: '৳ 450 BDT',
      popular: true,
      desc: 'All-inclusive pass for contestants entering Debate, Science, Language, or Cultural tourneys.',
      perks: ['Free entry into 1 Major Tournament', 'Official CDCC Souvenir Kit & Badge', 'Access to contestant preparation arenas', 'Certificate of Royal Participation', 'Concert access with closer zone'],
      color: 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.25)]'
    },
    {
      id: 'vip',
      name: 'Royal Guild VIP Pass',
      gotName: 'Lord’s Golden Writ',
      price: '৳ 800 BDT',
      desc: 'The ultimate royal experience for patrons, special delegates, and music superfans.',
      perks: ['Front-Row VIP Concert zone', 'Exclusive CDCC Winter Fest Hoodie & Kit', 'Small Council VIP Lounge hospitality', 'Priority seating for all Grand Finals', 'Official House Crest Souvenir Pin'],
      color: 'border-amber-500/70 hover:border-amber-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#100c28] via-[#070e1c] to-[#040810] border-2 border-violet-500/40 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)] p-6 md:p-8 overflow-hidden text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Top medieval accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-blue-300 to-amber-400" />
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playSwordClash();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-400/40 text-violet-400 text-xs font-cinzel uppercase tracking-widest mb-2">
            <Ticket className="w-3.5 h-3.5" />
            Official Ticketing Partner: Tickify
          </div>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-wide">
            CLAIM YOUR CITADEL PASS
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {preselectedSegment
              ? `You are registering for: ${preselectedSegment}`
              : 'Secure your pass for Carnival Da Chittagong College on Tickify'}
          </p>
        </div>

        {/* Pass Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              onClick={() => {
                soundFx.playRuneChime();
                setSelectedPass(pass.id as 'standard' | 'tournament' | 'vip');
              }}
              className={`relative cursor-pointer p-4 rounded-xl border transition-all ${pass.color} ${
                selectedPass === pass.id
                  ? 'bg-violet-950/60 ring-2 ring-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-slate-900/40 hover:bg-slate-900/80'
              }`}
            >
              {pass.popular && (
                <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-violet-500 to-blue-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}
              <h3 className="font-cinzel text-sm font-bold text-slate-100">{pass.name}</h3>
              <p className="text-xs text-violet-400/80 font-cinzel italic">{pass.gotName}</p>
              <div className="font-bold text-lg text-white my-2">{pass.price}</div>
              <ul className="text-[11px] text-slate-300 space-y-1">
                {pass.perks.slice(0, 3).map((perk, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-violet-400 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={FEST_METADATA.tickifyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playRoyalHorn()}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-cinzel text-sm md:text-base font-bold text-slate-950 bg-gradient-to-r from-blue-400 via-violet-300 to-violet-400 hover:from-blue-300 hover:to-violet-200 transition-all shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-95 text-center"
          >
            <Sparkles className="w-4 h-4" />
            PROCEED TO TICKIFY (OFFICIAL CHECKOUT)
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <span className="truncate">Direct Tickify Portal: <span className="text-violet-400 underline">{FEST_METADATA.tickifyLink}</span></span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
          <Shield className="w-3.5 h-3.5 text-violet-400" />
          <span>Tickets are encrypted with Valyrian QR codes and managed by Tickify</span>
        </div>
      </div>
    </div>
  );
};
