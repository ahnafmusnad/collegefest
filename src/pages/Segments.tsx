import React from 'react';
import { FEST_SEGMENTS, FEST_METADATA, FOUR_HOUSES } from '../data/festData';
import { Segment } from '../types';
import { Reveal } from '../components/Reveal';
import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import {
  Trophy,
  Users,
  User,
  Globe,
  MapPin,
  CalendarDays,
  Clock,
  ShieldHalf,
  ScrollText,
  Gem,
} from 'lucide-react';

/** The real club hosting a trial — its familiar abbreviation when it has one. */
const hostLabel = (houseId: string): string => {
  const house = FOUR_HOUSES.find((h) => h.id === houseId);
  if (!house) return 'Organizing Committee';
  const abbr = house.name.match(/\(([^)]+)\)/)?.[1];
  return abbr ?? house.shortName;
};

interface SegmentsProps {
  onOpenRulesModal: (segment: Segment) => void;
  onRegisterTickify: (segmentName: string) => void;
}

interface SegmentGroup {
  key: string;
  numeral: string;
  title: string;
  gotTitle: string;
  blurb: string;
  icon: React.ReactNode;
  formatLabel: string;
  venueSummary: string;
  segmentIds: string[];
}

const SEGMENT_GROUPS: SegmentGroup[] = [
  {
    key: 'group',
    numeral: 'I',
    title: 'Group Segments',
    gotTitle: 'Banners That March Together',
    blurb: 'Team trials on the Citadel grounds — bring your battalion.',
    icon: <Users className="h-4 w-4" />,
    formatLabel: 'Teams of 2–5',
    venueSummary: 'Academic Building · Parade Ground · Campus Trail',
    segmentIds: [
      'seg-debate-fest',
      'seg-physics-auction',
      'seg-team-quiz',
      'seg-treasure-hunt',
    ],
  },
  {
    key: 'solo',
    numeral: 'II',
    title: 'Solo Segments',
    gotTitle: 'One Name Upon The Crest',
    blurb: 'Single champions forged in science, language and the lens.',
    icon: <User className="h-4 w-4" />,
    formatLabel: 'Solo / Duo',
    venueSummary: 'Academic Building · Parade by Lane',
    segmentIds: [
      'seg-physics-olympiad',
      'seg-english-olympiad',
      'seg-macro-photography',
    ],
  },
  {
    key: 'online',
    numeral: 'III',
    title: 'Online Segments',
    gotTitle: 'Ravens Across The Realm',
    blurb: 'Submit from anywhere — the realm judges by scroll and screen.',
    icon: <Globe className="h-4 w-4" />,
    formatLabel: 'Solo · Online Entry',
    venueSummary: 'Tickify Portal · Parade by Lane',
    segmentIds: [
      'seg-colour-hunt',
      'seg-scientific-article-writing',
      'seg-why-is-it-debatable',
      'seg-explaining-the-theory',
      'seg-story-writing',
      'seg-beyond-the-matrics',
      'seg-scrapbook',
      'seg-academic-meme',
    ],
  },
];

const resolveSegments = (ids: string[]): Segment[] =>
  ids
    .map((id) => FEST_SEGMENTS.find((s) => s.id === id))
    .filter((s): s is Segment => Boolean(s));

const GroupFrameCard: React.FC<{
  group: SegmentGroup;
  onOpenRulesModal: (segment: Segment) => void;
}> = ({ group, onOpenRulesModal }) => {
  const segments = resolveSegments(group.segmentIds);
  const totalDragons = segments.reduce((sum, s) => sum + s.goldDragons, 0);
  const venueSummary = group.venueSummary;
  const dateSummary = FEST_METADATA.dates;

  return (
    <article className={`seg-frame seg-frame--${group.key}`}>
      <div className="seg-frame-body">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 font-cinzel text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] text-[#5bc9d6]">
            <span className="h-px w-8 bg-[#5bc9d6]/40" />
            Trial Group {group.numeral}
            <span className="h-px w-8 bg-[#5bc9d6]/40" />
          </div>

          <h3 className="font-got text-2xl sm:text-3xl md:text-4xl lg:text-[1.5rem] text-gold-2 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
            {group.title}
          </h3>

          <p className="font-cinzel text-[10px] sm:text-xs italic text-bone-dim">
            &ldquo;{group.gotTitle}&rdquo; &mdash; {group.blurb}
          </p>

          <div className="flex items-center justify-center gap-2 pt-0.5 font-cinzel text-[9px] uppercase tracking-[0.28em] text-bone-dim">
            <span className="text-[#5bc9d6]">{group.icon}</span>
            <span>{group.formatLabel}</span>
          </div>
        </header>

        {/* ── Roster ─────────────────────────────────────────── */}
        <div className="mt-5 grid gap-3.5 md:grid-cols-2 lg:mt-4 lg:grid-cols-1">
          {segments.map((seg) => (
            <button
              key={seg.id}
              type="button"
              onClick={() => onOpenRulesModal(seg)}
              className="group/row flex min-w-0 items-center gap-2 text-left px-3 py-2 rounded-lg border border-[#5bc9d6]/20 bg-ink/50 hover:bg-ink-2/85 hover:border-[#8ce8f2]/60 transition-all duration-300"
            >
              <Gem className="h-2.5 w-2.5 shrink-0 text-[#5bc9d6]/80 group-hover/row:text-[#8ce8f2] group-hover/row:drop-shadow-[0_0_6px_rgba(140,232,242,0.8)] transition-all" />

              <span className="min-w-0 flex-1">
                <span className="block font-cinzel text-xs sm:text-[13px] font-bold text-bone group-hover/row:text-gold-2 transition-colors truncate">
                  {seg.title}
                </span>
                <span className="block font-cinzel text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#8ce8f2]/80 truncate">
                  Hosted by {hostLabel(seg.houseId)}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="flex items-center justify-end gap-1 font-cinzel text-[9px] sm:text-[10px] font-bold text-gold-2 tabular-nums">
                  <Clock className="h-3 w-3 text-[#5bc9d6]" />
                  {seg.time}
                </span>
                <span className="mt-0.5 block font-cinzel text-[7px] uppercase tracking-[0.18em] text-ash">
                  {seg.venue}
                </span>
              </span>

              <ScrollText className="h-3.5 w-3.5 shrink-0 text-ash opacity-0 -translate-x-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 group-hover/row:text-[#8ce8f2] transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* ── Condensed decree: prize / venue / dates / format ─ */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 border-t border-[#5bc9d6]/20 pt-4">
          <div className="flex items-start gap-2">
            <Trophy className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#5bc9d6]" />
            <div className="min-w-0">
              <span className="block font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">
                Prize Vault
              </span>
              <span className="block text-[11px] sm:text-xs font-bold text-gold-2">
                {totalDragons.toLocaleString()} BDT
              </span>
              <span className="block text-[9px] text-bone-dim">Crests &amp; Medals</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#5bc9d6]" />
            <div className="min-w-0">
              <span className="block font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">
                Venue
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-bone leading-snug">
                {venueSummary}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CalendarDays className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#5bc9d6]" />
            <div className="min-w-0">
              <span className="block font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">
                Dates
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-bone leading-snug">
                {dateSummary}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ShieldHalf className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#5bc9d6]" />
            <div className="min-w-0">
              <span className="block font-cinzel text-[8px] uppercase tracking-[0.2em] text-ash">
                Format
              </span>
              <span className="block text-[11px] sm:text-xs font-semibold text-bone leading-snug">
                {group.formatLabel}
              </span>
              <span className="block text-[9px] text-bone-dim">
                {segments.length} trials &middot; entry via Tickify
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Segments: React.FC<SegmentsProps> = ({ onOpenRulesModal }) => {
  return (
    <div className="pt-24 pb-20 px-4 text-bone max-w-6xl mx-auto space-y-32">
      {/* Page Hero */}
      <PageHero
        image="/images/tour.webp"
        eyebrow="The Citadel Trials of Skill"
        title="Tourneys & Competitions"
        description="Fifteen trials, three banners of contest. Choose your ground — group, solo or online — read the royal decrees, and register your name on Tickify."
      >
        <div className="inline-flex items-center gap-3 rounded-2xl border border-gold/40 bg-ink-3/40 px-5 py-2.5 font-cinzel text-xs font-bold text-gold-2 backdrop-blur-md sm:text-sm">
          <Trophy className="h-4 w-4 text-gold" />
          <span>
            Total Festival Prize Vault: <strong>{FEST_METADATA.totalPrizePool}</strong>
          </span>
        </div>
      </PageHero>

      {/* Hint line */}
      <Reveal>
        <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-bone-dim">
          <ScrollText className="w-3.5 h-3.5 text-[#5bc9d6]" />
          <span>Select any trial to inspect its full decrees &amp; judging rules</span>
        </div>
      </Reveal>

      {/* Three framed group banners — stacked on mobile, all three
          abreast on desktop, each keeping its compact mobile shape. */}
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-3 lg:items-start lg:gap-6">
        {SEGMENT_GROUPS.map((group, idx) => (
          <Reveal key={group.key} delay={idx * 80}>
            <GroupFrameCard group={group} onOpenRulesModal={onOpenRulesModal} />
          </Reveal>
        ))}
      </div>

      {/* Global Registration Banner */}
      <Reveal
        direction="zoom"
        className="tickify-frame relative overflow-hidden p-7 md:p-9 text-center max-w-3xl mx-auto space-y-3"
      >
        <h3 className="font-cinzel text-lg md:text-xl font-bold text-white">
          READY TO ENTER THE ARENA?
        </h3>
        <p className="font-sans text-[11px] md:text-xs text-bone-dim max-w-md mx-auto">
          Every participant receives an official tournament badge, certificate of royal
          participation, and access to the Citadel grounds on Tickify.
        </p>
        <div className="pt-2">
          <Button href={FEST_METADATA.tickifyLink} external>
            REGISTER CONTINGENT ON TICKIFY
          </Button>
        </div>
      </Reveal>
    </div>
  );
};

export default Segments;
