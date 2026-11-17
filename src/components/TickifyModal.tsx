import React, { useState } from 'react';
import { X, Ticket, Check, Shield, Copy } from 'lucide-react';
import { FEST_METADATA } from '../data/festData';
import Button from './ui/Button';
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
      color: 'border-iron hover:border-crimson'
    },
    {
      id: 'tournament',
      name: 'House Champion Pass',
      gotName: 'Knight’s Tourney Writ',
      price: '৳ 450 BDT',
      popular: true,
      desc: 'All-inclusive pass for contestants entering Debate, Science, Language, or Cultural tourneys.',
      perks: ['Free entry into 1 Major Tournament', 'Official CDCC Souvenir Kit & Badge', 'Access to contestant preparation arenas', 'Certificate of Royal Participation', 'Concert access with closer zone'],
      color: 'border-crimson'
    },
    {
      id: 'vip',
      name: 'Royal Guild VIP Pass',
      gotName: 'Lord’s Golden Writ',
      price: '৳ 800 BDT',
      desc: 'The ultimate royal experience for patrons, special delegates, and music superfans.',
      perks: ['Front-Row VIP Concert zone', 'Exclusive CDCC Winter Fest Hoodie & Kit', 'Small Council VIP Lounge hospitality', 'Priority seating for all Grand Finals', 'Official House Crest Souvenir Pin'],
      color: 'border-gold/70 hover:border-gold'
    }
  ];

  return (
    /* Outer layer owns the scroll — on phones the pass hall always starts
       at the top instead of being shoved above the viewport. */
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
      <div className="trial-stone relative m-auto w-full max-w-2xl p-5 text-bone sm:p-8">

        {/* Top medieval accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#17686e] via-[#8ce8f2] to-[#17686e]" />

        {/* diamond sigil close button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="sigil-close absolute top-4 right-4 z-20 flex h-9 w-9 rotate-45 items-center justify-center border border-[#5bc9d6]/50 bg-ink-2/85 text-bone-dim hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 -rotate-45" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-2/80 border border-gold/40 text-gold text-xs font-cinzel uppercase tracking-widest mb-2">
            <Ticket className="w-3.5 h-3.5" />
            Official Ticketing Partner: Tickify
          </div>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-wide">
            CLAIM YOUR CITADEL PASS
          </h2>
          <p className="text-sm text-bone-dim mt-1">
            {preselectedSegment
              ? `You are registering for: ${preselectedSegment}`
              : 'Secure your pass for Carnaval Da Chittagong College on Tickify'}
          </p>
        </div>

        {/* Pass Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              onClick={() => {
                setSelectedPass(pass.id as 'standard' | 'tournament' | 'vip');
              }}
              className={`relative cursor-pointer p-4 border transition-all ${pass.color} ${
                selectedPass === pass.id
                  ? 'bg-ink-2/60 ring-2 ring-gold'
                  : 'bg-ink-2/40 hover:bg-ink-2/80'
              }`}
            >
              {pass.popular && (
                <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-crimson to-ember text-ink text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Most Popular
                </div>
              )}
              <h3 className="font-cinzel text-sm font-bold text-bone">{pass.name}</h3>
              <p className="text-xs text-gold/80 font-cinzel italic">{pass.gotName}</p>
              <div className="font-bold text-lg text-white my-2">{pass.price}</div>
              <ul className="text-[11px] text-bone-dim space-y-1">
                {pass.perks.slice(0, 3).map((perk, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-gold shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            href={FEST_METADATA.tickifyLink}
            external
            className="w-full"
          >
            PROCEED TO TICKIFY (OFFICIAL CHECKOUT)
          </Button>

          <div className="flex items-center justify-between gap-3 p-2.5 bg-ink-2/60 border border-iron text-xs text-bone-dim">
            <span className="truncate">Direct Tickify Portal: <span className="text-gold underline">{FEST_METADATA.tickifyLink}</span></span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-ink-3 hover:bg-ink-3 text-white shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-gold-2" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-bone-dim">
          <Shield className="w-3.5 h-3.5 text-[#5bc9d6]" />
          <span>Tickets are encrypted with Valyrian QR codes and managed by Tickify</span>
        </div>
      </div>
      </div>
    </div>
  );
};
