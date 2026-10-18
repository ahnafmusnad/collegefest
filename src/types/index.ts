export type PageType = 
  | 'home' 
  | 'description' 
  | 'clubs' 
  | 'segments' 
  | 'sponsorships' 
  | 'organizers';

export interface ClubHouse {
  id: string;
  name: string;
  houseName: string;
  motto: string;
  sigil: string;
  iconName: string;
  colorScheme: {
    primary: string;
    secondary: string;
    border: string;
    glow: string;
    bgGradient: string;
    accent: string;
  };
  lore: string;
  founded: string;
  lords: {
    role: string;
    name: string;
    batch: string;
  }[];
  achievements: string[];
  keySegments: string[];
  memberCount: number;
  points: number;
}

export interface Segment {
  id: string;
  title: string;
  gotTitle: string;
  houseId: string;
  category: 'Debate' | 'Science & Tech' | 'Culture & Arts' | 'Business & MUN' | 'Gaming & Fun';
  prizePool: string;
  goldDragons: number; // GoT currency flair
  teamSize: string;
  entryFee: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  rules: string[];
  judgingCriteria: string[];
  tags: string[];
  isFeatured?: boolean;
}

export interface SponsorTier {
  id: string;
  name: string;
  gotTitle: string;
  price: string;
  badge: string;
  description: string;
  slots: string;
  perks: string[];
  color: string;
  borderColor: string;
  currentSponsors?: {
    name: string;
    logoUrl?: string;
    tagline: string;
  }[];
}

export interface OrganizerMember {
  id: string;
  name: string;
  gotTitle: string;
  modernRole: string;
  category: 'council' | 'steward' | 'guard' | 'advisory';
  batch: string;
  department: string;
  houseAllegiance: string;
  quote: string;
  image: string;
  socials: {
    linkedin?: string;
    facebook?: string;
    email?: string;
  };
}

export interface FestDaySchedule {
  day: number;
  date: string;
  title: string;
  gotTitle: string;
  description: string;
  events: {
    time: string;
    title: string;
    venue: string;
    type: 'ceremony' | 'competition' | 'entertainment' | 'banquet';
    house?: string;
  }[];
}

export interface CampusLocation {
  id: string;
  name: string;
  gotAlias: string;
  description: string;
  coordinates: { x: number; y: number };
  eventsHosted: string[];
}
