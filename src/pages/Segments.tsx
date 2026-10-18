import React, { useState, useMemo } from 'react';
import { FEST_SEGMENTS, FOUR_HOUSES, FEST_METADATA } from '../data/festData';
import { Segment } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';
import { 
  Swords, 
  Search, 
  Trophy, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck,
  Flame,
  Filter
} from 'lucide-react';

interface SegmentsProps {
  onOpenRulesModal: (segment: Segment) => void;
  onRegisterTickify: (segmentName: string) => void;
}

export const Segments: React.FC<SegmentsProps> = ({
  onOpenRulesModal,
  onRegisterTickify
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedHouse, setSelectedHouse] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Debate', 'Science & Tech', 'Language & Literature', 'Culture & Arts', 'Gaming & Fun'];

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playRuneChime();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSegments = useMemo(() => {
    return FEST_SEGMENTS.filter(seg => {
      const matchCategory = selectedCategory === 'All' || seg.category === selectedCategory;
      const matchHouse = selectedHouse === 'All' || seg.houseId === selectedHouse;
      const matchSearch = 
        seg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seg.gotTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seg.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchHouse && matchSearch;
    });
  }, [selectedCategory, selectedHouse, searchQuery]);

  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-7xl mx-auto space-y-12">
      
      {/* Page Hero Banner */}
      <Reveal direction="zoom">
      <div className="relative rounded-3xl overflow-hidden border-2 border-crimson/30 bg-gradient-to-r from-ink via-ink-2 to-ink p-8 md:p-12 text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink-2/90 border border-gold/40 text-gold-2 text-xs font-cinzel uppercase tracking-widest">
            <Swords className="w-3.5 h-3.5" />
            The Citadel Trials of Skill
          </div>
          <h1 className="font-cinzel-dec text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider text-glow-ice">
            TOURNEYS & COMPETITIONS
          </h1>
          <p className="font-sans text-sm sm:text-base text-bone-dim leading-relaxed">
            Over 150,000+ BDT in Gold Dragons and Valyrian steel crests await the champions. Select your trial, inspect the royal rules, and register your battalion on Tickify.
          </p>

          {/* Quick Prize Banner */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-ink-3/40 border border-gold/40 text-gold-2 font-cinzel text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(201,162,39,0.2)]">
            <Trophy className="w-4 h-4 text-gold" />
            <span>Total Festival Prize Vault: <strong>150,000+ BDT</strong></span>
          </div>
        </div>
      </div>
      </Reveal>

      {/* Filter and Search Controls */}
      <Reveal>
      <div className="frost-card p-5 md:p-6 rounded-2xl border border-crimson/30 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bone-dim" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tournament name, keywords (e.g. Debate, Hackathon, Band, FIFA, Pitch)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-2/90 border border-iron focus:border-gold focus:ring-1 focus:ring-gold text-sm text-white placeholder-ash outline-none transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-cinzel text-bone-dim flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playSwordClash();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all ${
                  isSelected
                    ? 'bg-crimson/30 text-gold-2 border border-gold shadow-[0_0_12px_rgba(158,42,43,0.4)]'
                    : 'bg-ink-2/60 text-bone-dim border border-iron hover:text-white hover:border-iron'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* House Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-iron/80">
          <span className="text-xs font-cinzel text-bone-dim flex items-center gap-1 mr-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Host House:
          </span>
          <button
            onClick={() => {
              soundFx.playSwordClash();
              setSelectedHouse('All');
            }}
            className={`px-3 py-1 rounded-md text-xs font-cinzel font-semibold transition-colors ${
              selectedHouse === 'All' ? 'bg-ink-2 text-gold-2 border border-crimson/50' : 'text-bone-dim hover:text-white'
            }`}
          >
            All Houses
          </button>
          {FOUR_HOUSES.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                soundFx.playSwordClash();
                setSelectedHouse(h.id);
              }}
              className={`px-3 py-1 rounded-md text-xs font-cinzel font-semibold transition-colors ${
                selectedHouse === h.id ? 'bg-ink-2 text-gold-2 border border-crimson/50' : 'text-bone-dim hover:text-white'
              }`}
            >
              {h.houseName}
            </button>
          ))}
        </div>
      </div>
      </Reveal>

      {/* Segments Counter */}
      <Reveal>
      <div className="flex items-center justify-between text-xs font-cinzel text-bone-dim px-2">
        <span>Showing {filteredSegments.length} of {FEST_SEGMENTS.length} Tournaments</span>
        <span className="text-gold">Click any card to inspect full decrees & judging rules</span>
      </div>
      </Reveal>

      {/* Segments Cards Grid with RICH HOVER ANIMATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSegments.map((segment, idx) => {
          const house = FOUR_HOUSES.find(h => h.id === segment.houseId);
          const isBookmarked = bookmarkedIds[segment.id];

          return (
            <Reveal key={segment.id} delay={(idx % 3) * 90} className="h-full">
            <TiltCard
              onClick={() => {
                soundFx.playSwordClash();
                onOpenRulesModal(segment);
              }}
              onMouseEnter={() => soundFx.playRuneChime()}
              className="group relative h-full rounded-2xl bg-gradient-to-b from-ink-2 via-ink-2 to-ink border-2 border-iron hover:border-gold p-6 shadow-[0_10px_28px_rgba(11,9,7,0.5)] flex flex-col justify-between"
            >
              <div>
                
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold bg-ink-2/90 border border-crimson/40 text-gold-2">
                      {segment.category}
                    </span>
                    {segment.isFeatured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold bg-ink-3/80 text-gold-2 border border-gold/30">
                        <Flame className="w-2.5 h-2.5 text-gold" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => handleToggleBookmark(segment.id, e)}
                    className="p-1.5 rounded-lg text-ash hover:text-gold transition-colors"
                    title={isBookmarked ? 'Bookmarked' : 'Bookmark this segment'}
                  >
                    <Star className={`w-4 h-4 ${isBookmarked ? 'text-gold fill-gold' : ''}`} />
                  </button>
                </div>

                {/* Host House Tag */}
                {house && (
                  <div className="font-cinzel text-[11px] text-gold/90 mb-1">
                    Host: <span className="text-white font-semibold">{house.houseName}</span>
                  </div>
                )}

                {/* Segment Titles */}
                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-gold-2 transition-colors leading-snug mb-1">
                  {segment.title}
                </h3>
                <p className="font-cinzel text-xs text-gold/80 italic mb-3">
                  "{segment.gotTitle}"
                </p>

                {/* Description */}
                <p className="font-sans text-xs text-bone-dim line-clamp-2 leading-relaxed mb-4">
                  {segment.description}
                </p>

                {/* Tournament Metadata grid */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-ink-2/80 border border-iron text-[11px] mb-4">
                  <div className="flex items-center gap-1.5 text-bone-dim">
                    <Trophy className="w-3.5 h-3.5 text-gold shrink-0" />
                    <div>
                      <span className="text-ash block text-[9px] uppercase font-cinzel">Prize Vault</span>
                      <span className="font-bold text-gold-2">{segment.prizePool}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-bone-dim">
                    <Users className="w-3.5 h-3.5 text-gold shrink-0" />
                    <div>
                      <span className="text-ash block text-[9px] uppercase font-cinzel">Team Size</span>
                      <span className="font-semibold text-bone">{segment.teamSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-bone-dim">
                    <Clock className="w-3.5 h-3.5 text-ember shrink-0" />
                    <div>
                      <span className="text-ash block text-[9px] uppercase font-cinzel">Schedule</span>
                      <span className="text-bone-dim truncate">{segment.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-bone-dim">
                    <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <div>
                      <span className="text-ash block text-[9px] uppercase font-cinzel">Venue</span>
                      <span className="text-bone-dim truncate">{segment.venue}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-iron/80 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playSwordClash();
                    onOpenRulesModal(segment);
                  }}
                  className="text-xs font-cinzel font-semibold text-gold hover:text-white transition-colors"
                >
                  Rules & Criteria &rarr;
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playRoyalHorn();
                    onRegisterTickify(segment.title);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-ember to-gold hover:from-gold-2 hover:to-gold-2 text-ink font-cinzel text-[11px] font-bold shadow-[0_0_12px_rgba(158,42,43,0.4)] active:scale-95 transition-all uppercase tracking-wider"
                >
                  <span>Tickify Entry</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Hover Glow Ambient */}
              <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {filteredSegments.length === 0 && (
        <Reveal className="text-center py-16 frost-card rounded-2xl border border-crimson/20">
          <Swords className="w-12 h-12 text-ash mx-auto mb-3" />
          <h3 className="font-cinzel text-lg font-bold text-bone-dim">No Tournaments Match Your Query</h3>
          <p className="font-sans text-xs text-ash mt-1">Try resetting the filter or searching for another keyword.</p>
        </Reveal>
      )}

      {/* Global Registration Banner */}
      <Reveal direction="zoom" className="frost-card p-8 rounded-3xl border border-crimson/40 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
          READY TO ENTER THE ARENA?
        </h3>
        <p className="font-sans text-xs md:text-sm text-bone-dim">
          Every participant receives an official tournament badge, certificate of royal participation, and access to the Citadel grounds on Tickify.
        </p>
        <div className="pt-2">
          <a
            href={FEST_METADATA.tickifyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playRoyalHorn()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-cinzel text-sm font-bold text-ink bg-gradient-to-r from-ember to-gold-2 hover:from-gold-2 hover:to-gold-2 shadow-[0_0_25px_rgba(158,42,43,0.5)] active:scale-95 transition-all uppercase tracking-wider"
          >
            <span>REGISTER CONTINGENT ON TICKIFY</span>
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </Reveal>

    </div>
  );
};
