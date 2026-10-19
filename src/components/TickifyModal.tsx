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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-ink-2 via-ink-2 to-ink border-2 border-crimson/40 p-6 md:p-8 overflow-hidden text-bone max-h-[92vh] overflow-y-auto">
        
        {/* Top medieval accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-crimson via-gold-2 to-gold" />
        
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-bone-dim hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
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
          <Shield className="w-3.5 h-3.5 text-gold" />
          <span>Tickets are encrypted with Valyrian QR codes and managed by Tickify</span>
        </div>
      </div>
    </div>
  );
};
