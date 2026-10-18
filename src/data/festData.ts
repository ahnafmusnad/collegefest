import { ClubHouse, Segment, SponsorTier, OrganizerMember, FestDaySchedule, CampusLocation } from '../types';

export const FEST_METADATA = {
  name: "Carnival Da Chittagong College",
  tagline: "When Winter Descends Upon The Citadel, Only The Victorious Endure",
  edition: "Winter 2026 Edition",
  dates: "February 27 - March 1, 2026",
  venue: "The Ancient Citadel of Chittagong College (Campus Grounds, Chawkbazar)",
  tickifyLink: "https://tickify.live",
  totalPrizePool: "150,000+ BDT",
  expectedFootfall: "6,000+ Students & Guests",
  participatingInstitutions: "45+ Colleges & Universities",
  countdownTarget: "2026-02-27T09:00:00",
};

export const FOUR_HOUSES: ClubHouse[] = [
  {
    id: 'house-veritas',
    name: 'Chittagong College Debating Club (CCDC)',
    houseName: 'House Veritas',
    motto: 'Words Cut Deeper Than Valyrian Steel',
    sigil: 'Raven & Crossed Quills',
    iconName: 'Scroll',
    colorScheme: {
      primary: '#0284c7', // Sky blue
      secondary: '#0369a1',
      border: 'border-sky-500/50',
      glow: 'shadow-sky-500/40',
      bgGradient: 'from-sky-950/80 via-slate-900/90 to-blue-950/80',
      accent: 'text-sky-400'
    },
    lore: 'Forged in the frosty chambers of the Red Citadel, House Veritas wields logic, rhetoric, and unfiltered truth. Their orators have stood undefeated against delegates across the Seven Divisions, bending royal courts with mere whispers.',
    founded: '1998',
    lords: [
      { role: 'Lord Commander (President)', name: 'Tanvir Hossain Chowdhury', batch: 'HSC 24' },
      { role: 'Master of Speech (General Sec.)', name: 'Nusrat Jahan Fariha', batch: 'HSC 25' },
      { role: 'High Inquisitor (Debate Coach)', name: 'Prof. Anisur Rahman', batch: 'Faculty Lead' }
    ],
    achievements: [
      'Champions of 14th National Inter-College Debating Championship',
      'Runners-up at Eastern Realm Parliamentary Masters 2024',
      'Produced 12 National Best Speakers across 5 years'
    ],
    keySegments: ['The Grand Barsha-Barsha Parliamentary Clash', 'Valyrian Turncoat Argument Trial', 'High Table Public Oratory'],
    memberCount: 380,
    points: 1240
  },
  {
    id: 'house-arcanum',
    name: 'Chittagong College Science & IT Club (CCSITC)',
    houseName: 'House Arcanum',
    motto: 'Knowledge Forges Empires & Slays Beasts',
    sigil: 'The Alchemical Horned Stag & Lightning',
    iconName: 'Cpu',
    colorScheme: {
      primary: '#06b6d4', // Cyan
      secondary: '#0891b2',
      border: 'border-cyan-500/50',
      glow: 'shadow-cyan-500/40',
      bgGradient: 'from-cyan-950/80 via-slate-900/90 to-teal-950/80',
      accent: 'text-cyan-400'
    },
    lore: 'The alchemists and artificers of House Arcanum master wild fire, arcane circuits, and cold-forged algorithms. In their dark laboratories, they craft mechanical automatons and solve the deepest riddles of nature.',
    founded: '2004',
    lords: [
      { role: 'Arch-Artificer (President)', name: 'Shahriar Ahmed Niloy', batch: 'HSC 24' },
      { role: 'Grand Alchemist (Gen. Sec.)', name: 'Samiha Binte Karim', batch: 'HSC 25' },
      { role: 'Lord of Automata (Robotics Head)', name: 'Rayhan Kabir', batch: 'HSC 24' }
    ],
    achievements: [
      'Top 10 Global Finalists - NASA Space Apps Challenge',
      'Grand Champions - National Robo-War Clash Chittagong',
      'Over 20+ National Science Olympiad Gold Medals'
    ],
    keySegments: ['The Alchemist’s 12-Hour Citadel Hackathon', 'Steel Behemoth Robo-Warfare', 'The Astrolabe Math Olympiad'],
    memberCount: 420,
    points: 1310
  },
  {
    id: 'house-melodia',
    name: 'Chittagong College Cultural Club (CCCC)',
    houseName: 'House Melodia',
    motto: 'In Every Chord, An Empire Awakens',
    sigil: 'Phoenix of the Frozen Dawn & Lyre',
    iconName: 'Music',
    colorScheme: {
      primary: '#ec4899', // Crimson-Rose
      secondary: '#be185d',
      border: 'border-pink-500/50',
      glow: 'shadow-pink-500/40',
      bgGradient: 'from-pink-950/80 via-purple-950/90 to-slate-900/90',
      accent: 'text-pink-400'
    },
    lore: 'When the winter winds howl at the Citadel gates, House Melodia strikes the battle drum and rings the ancient harp. Their bards, thespians, and song-weavers bring color to the icy grey, commanding the hearts of kings and commoners alike.',
    founded: '1992',
    lords: [
      { role: 'Grand Troubadour (President)', name: 'Arafat Rahman Zaki', batch: 'HSC 24' },
      { role: 'Mistress of Revels (Gen. Sec.)', name: 'Tasnim Sultana Sneha', batch: 'HSC 25' },
      { role: 'Maestro of War Drums (Band Head)', name: 'Adnan Sami', batch: 'HSC 24' }
    ],
    achievements: [
      'Gold Trophy at All-Bangladesh Youth Theatre Festival',
      'Best Original Composition at Divisional Band Carnival',
      'Staged 18 original drama productions in Chittagong'
    ],
    keySegments: ['Battle of the Citadel Bards (Underground Band War)', 'Iron Throne Cosplay & Masquerade', 'The Winter Classical & Folk Showcase'],
    memberCount: 490,
    points: 1190
  },
  {
    id: 'house-valorous',
    name: 'Chittagong College Business, MUN & Rover Guild',
    houseName: 'House Valorous',
    motto: 'Honor In Strategy, Glory In Unity',
    sigil: 'Direwolf of the High Seas & Golden Scales',
    iconName: 'Shield',
    colorScheme: {
      primary: '#f59e0b', // Amber/Gold
      secondary: '#d97706',
      border: 'border-amber-500/50',
      glow: 'shadow-amber-500/40',
      bgGradient: 'from-amber-950/80 via-slate-900/90 to-orange-950/80',
      accent: 'text-amber-400'
    },
    lore: 'Master strategists, diplomat emissaries, and forest wardens. House Valorous manages the kingdom’s grain reserves, negotiates treaties across borders, and stands guard in times of tempest with disciplined resilience.',
    founded: '2001',
    lords: [
      { role: 'Lord Treasurer & Envoy (President)', name: 'Mehedi Hasan Rifat', batch: 'HSC 24' },
      { role: 'High Emissary (Secretary General)', name: 'Mahira Binte Faruk', batch: 'HSC 25' },
      { role: 'Commander of Scouts (Rover Marshal)', name: 'Jubair Alam', batch: 'HSC 24' }
    ],
    achievements: [
      'Best Delegation Award at Chittagong Model United Nations (MUN)',
      '1st Place at National Youth Business Pitch Battle 2024',
      'President Rover Scout (PRS) Recognition for 6 cadets'
    ],
    keySegments: ['The Iron Bank Pitch Battle (Startup Case)', 'The Council of High Treaties (Mini MUN)', 'Citadel Wilderness Survival Challenge'],
    memberCount: 360,
    points: 1280
  }
];

export const FEST_SEGMENTS: Segment[] = [
  {
    id: 'seg-debate-parl',
    title: 'The Great Barsha-Barsha Parliamentary Debate',
    gotTitle: 'The Grand Tourney of Silver Tongues',
    houseId: 'house-veritas',
    category: 'Debate',
    prizePool: '25,000 BDT',
    goldDragons: 2500,
    teamSize: '3 Members',
    entryFee: '600 BDT / Team',
    venue: 'Royal Auditorium Hall',
    date: 'Day 1 - Feb 27',
    time: '10:00 AM - 04:00 PM',
    description: 'A fiercely competitive parliamentary debate tournament modeled after the Council of King’s Landing. Only the sharpest arguments will pierce through the frost.',
    rules: [
      'Asian Parliamentary format (3 vs 3).',
      'Motion preparation time: 15 minutes without electronic assistance.',
      '7 minutes substantive speeches with POIs allowed between minutes 1 and 6.',
      'Judged by a panel of accredited National Adjudicators.'
    ],
    judgingCriteria: ['Matter (40%)', 'Manner & Delivery (40%)', 'Method & Strategy (20%)'],
    tags: ['Debate', 'Speaking', 'Trophy', 'High Stakes'],
    isFeatured: true
  },
  {
    id: 'seg-robowar',
    title: 'Steel Behemoth: Robo-Warfare & Maze Runner',
    gotTitle: 'The Alchemist’s Automaton Crucible',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: '30,000 BDT',
    goldDragons: 3000,
    teamSize: '2-4 Members',
    entryFee: '800 BDT / Team',
    venue: 'Central Arena (Citadel Courtyard)',
    date: 'Day 2 - Feb 28',
    time: '11:00 AM - 05:00 PM',
    description: 'Custom combat robots fight inside a spiked, frosty perimeter. Only the machine with superior armor, kinetic weapons, and cunning pilot maneuvering will remain standing.',
    rules: [
      'Bot weight limit: Maximum 5.0 kg including weaponry and batteries.',
      'Wireless RF or Bluetooth control only; no autonomous override during battle.',
      'Destructive weapons permitted except liquid, explosive, and chemical fire hazards.',
      'Matches run for 3 rounds of 3 minutes each inside the Plexiglas arena.'
    ],
    judgingCriteria: ['Aggression (30%)', 'Damage Inflicted (40%)', 'Control & Agility (30%)'],
    tags: ['Robotics', 'Combat', 'Engineering', 'Prize Money'],
    isFeatured: true
  },
  {
    id: 'seg-battle-bands',
    title: 'Battle of the Citadel Bards: Band Wars',
    gotTitle: 'The Rains of Castamere Band Brawl',
    houseId: 'house-melodia',
    category: 'Culture & Arts',
    prizePool: '35,000 BDT',
    goldDragons: 3500,
    teamSize: '3-6 Members',
    entryFee: '1,000 BDT / Band',
    venue: 'Main Open Air Citadel Stage',
    date: 'Day 3 - Mar 1',
    time: '04:00 PM - 08:30 PM',
    description: 'Electric guitars scream through the winter chill. Top college and undergraduate rock and fusion bands fight for the Golden Harp and championship banners.',
    rules: [
      'Each band gets 18 minutes on stage (including 3 minutes line check).',
      'Minimum two songs: one original composition and one classic Bangla rock/fusion cover.',
      'Full drum kit and backline provided; bands bring their own guitars, processors, and pedals.'
    ],
    judgingCriteria: ['Musical Tightness (35%)', 'Vocal Power (25%)', 'Originality (20%)', 'Stage Presence & Crowd Heat (20%)'],
    tags: ['Music', 'Rock', 'Live Concert', 'Grand Stage'],
    isFeatured: true
  },
  {
    id: 'seg-business-pitch',
    title: 'The Iron Bank Pitch Battle: Startup Case Challenge',
    gotTitle: 'The Master of Coin’s Treasury Challenge',
    houseId: 'house-valorous',
    category: 'Business & MUN',
    prizePool: '20,000 BDT',
    goldDragons: 2000,
    teamSize: '2-3 Members',
    entryFee: '500 BDT / Team',
    venue: 'Red Keep Seminar Room 1',
    date: 'Day 2 - Feb 28',
    time: '10:30 AM - 03:00 PM',
    description: 'Pitch your disruptive venture to a fearsome Small Council of angel investors, venture capitalists, and corporate strategists. Convince them your startup can weather the financial winter.',
    rules: [
      'Case study released 48 hours prior to the festival.',
      'Presentation deck: 8 slides maximum.',
      '7 minutes pitch followed by 5 minutes intense cross-examination by the judges.'
    ],
    judgingCriteria: ['Feasibility & Scalability (35%)', 'Financial Modeling (30%)', 'Pitch Polish & Q&A Defense (35%)'],
    tags: ['Business', 'Startup', 'Case Competition', 'Venture'],
    isFeatured: false
  },
  {
    id: 'seg-cosplay',
    title: 'Iron Throne Cosplay & Masquerade Royale',
    gotTitle: 'Walk of the Seven Kingdoms Cosplay',
    houseId: 'house-melodia',
    category: 'Culture & Arts',
    prizePool: '18,000 BDT',
    goldDragons: 1800,
    teamSize: 'Solo / Duo',
    entryFee: '300 BDT / Person',
    venue: 'Grand Central Ramp Stage',
    date: 'Day 3 - Mar 1',
    time: '02:00 PM - 04:30 PM',
    description: 'Transform into Jon Snow, Daenerys Targaryen, the Night King, or any beloved fantasy, anime, or gaming character. Walk the catwalk before the Iron Throne to thunderous applause.',
    rules: [
      'Costumes can be handcrafted or modified store-bought (handcrafted gets bonus points).',
      'Prop weapons must be blunted foam, wood, or 3D printed plastic; no real steel.',
      'Each participant gets 90 seconds runway walk + monologue/skit performance.'
    ],
    judgingCriteria: ['Costume Craftsmanship (40%)', 'Character Accuracy (30%)', 'Stage Charisma (30%)'],
    tags: ['Cosplay', 'Gaming', 'Fantasy', 'Costume'],
    isFeatured: true
  },
  {
    id: 'seg-hackathon',
    title: 'Citadel 12-Hour Overnight Hackathon',
    gotTitle: 'The Grand Maester’s Code Crucible',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: '22,000 BDT',
    goldDragons: 2200,
    teamSize: '2-4 Members',
    entryFee: '600 BDT / Team',
    venue: 'Advanced Computing Fortress (ICT Lab)',
    date: 'Day 1 to Day 2',
    time: '08:00 PM - 08:00 AM (Overnight)',
    description: 'Build working web, mobile, or AI prototypes addressing real-world problems in education, climate disaster, or student life. High-speed internet and hot midnight rations provided.',
    rules: [
      'All code must be committed to fresh GitHub repositories after prompt launch.',
      'Pre-existing APIs and UI libraries are permitted; pre-built full applications are disqualified.',
      'Final deliverable requires a live working demo and 3-minute video/pitch.'
    ],
    judgingCriteria: ['Innovation (30%)', 'Technical Execution (35%)', 'Practical Impact (25%)', 'Pitch (10%)'],
    tags: ['Coding', 'Hackathon', 'AI', 'Software'],
    isFeatured: false
  },
  {
    id: 'seg-gaming',
    title: 'The Citadel Esports Tournament (Valorant & FIFA 24)',
    gotTitle: 'Trials by Combat: Virtual War Realm',
    houseId: 'house-arcanum',
    category: 'Gaming & Fun',
    prizePool: '20,000 BDT',
    goldDragons: 2000,
    teamSize: '5v5 (Valorant) / 1v1 (FIFA)',
    entryFee: '500 BDT (Valo) / 150 BDT (FIFA)',
    venue: 'Gaming Pavilion (Student Common Fortress)',
    date: 'Day 2 - Feb 28',
    time: '12:00 PM - 07:00 PM',
    description: 'Clash in tactical FPS shooter Valorant and football battleground EA FC / FIFA 24 on low-latency LAN rigs with live big-screen commentary.',
    rules: [
      'Valorant: Single elimination standard tournament mode, Best of 1 until Finals (BO3).',
      'FIFA: 5-minute halves, tactical defending, no custom formations.'
    ],
    judgingCriteria: ['Match Victories / Scoreline'],
    tags: ['Gaming', 'Esports', 'Valorant', 'FIFA'],
    isFeatured: false
  },
  {
    id: 'seg-chess-master',
    title: 'The Grand Citadel Chess Championship',
    gotTitle: 'Cyvasse: The High King’s Gambit',
    houseId: 'house-valorous',
    category: 'Gaming & Fun',
    prizePool: '10,000 BDT',
    goldDragons: 1000,
    teamSize: 'Solo (1 Member)',
    entryFee: '150 BDT',
    venue: 'The Silent Citadel Library',
    date: 'Day 1 - Feb 27',
    time: '02:00 PM - 06:00 PM',
    description: 'A test of cold nerves, positional mastery, and ruthless sacrifice. 7-round Swiss system tournament open to all college and university grandmasters.',
    rules: [
      'FIDE rapid rules: 10 minutes + 5 seconds increment per move.',
      'Clocks and regulation tournament boards provided.'
    ],
    judgingCriteria: ['Tournament Points (Swiss Tiebreak)'],
    tags: ['Chess', 'Mind Sports', 'Tactics'],
    isFeatured: false
  }
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'tier-title',
    name: 'Title Sponsor',
    gotTitle: 'The Hand of the King (Crown Benefactor)',
    price: '৳ 1,50,000 BDT',
    badge: '1 Exclusive Champion Slot',
    description: 'The supreme patron whose banner shall fly beside Carnival Da Chittagong College across all seven kingdoms. Complete dominance on all digital, print, and physical mediums.',
    slots: '1 Brand Only',
    color: 'from-amber-400 to-yellow-600',
    borderColor: 'border-amber-400',
    perks: [
      'Event named officially: "[Your Brand Name] presents Carnival Da Chittagong College"',
      'Prominent logo on main stage backdrop (18ft x 10ft) and central photo wall',
      'Co-branded Tickify online ticketing portal with exclusive link/promotional banner',
      '15-minute prime keynote slot during Grand Opening and Closing Gala',
      'Prime promotional pavilion (20x15 ft) located at the central Citadel gates',
      'Logo on 5,000+ festival souvenir kits, badges, and volunteer armor tees',
      'Broadcast across all digital live streams, reels, and university partner pages'
    ],
    currentSponsors: [
      { name: 'Apex Zenith Technologies', tagline: 'The Forgers of Tomorrow' }
    ]
  },
  {
    id: 'tier-platinum',
    name: 'Platinum Sponsors',
    gotTitle: 'High Valyrian Lords of the Realm',
    price: '৳ 80,000 BDT',
    badge: 'Limited to 3 Lords',
    description: 'Prestige partnership with dedicated tournament segment naming rights, prime exhibition space, and widespread student engagement across three days.',
    slots: '3 Brands Max',
    color: 'from-sky-300 via-blue-200 to-indigo-300',
    borderColor: 'border-sky-400',
    perks: [
      'Exclusive Segment naming rights (e.g. "[Your Brand] Battle of the Bands")',
      'High-visibility stall (12x10 ft) in prime student footfall courtyard',
      'Prominent logo on official fest posters, flyers, and digital campaigns',
      'Special token of royal gratitude presented by Principal & Convener',
      'Company promotional materials distributed inside all participant kits',
      '10 VIP Access all-access passes to concerts, debates, and award banquets'
    ],
    currentSponsors: [
      { name: 'Chittagong Bay Mercantile Bank', tagline: 'Fortresses of Financial Wisdom' },
      { name: 'Stark Beverage & Frost Elixirs', tagline: 'Quenching the Winter Thirst' }
    ]
  },
  {
    id: 'tier-gold',
    name: 'Gold Sponsors',
    gotTitle: 'The Iron Bank of Braavos',
    price: '৳ 45,000 BDT',
    badge: '5 Available Slots',
    description: 'A powerful presence offering targeted brand visibility, stall activation, and direct engagement with Chittagong’s finest young minds.',
    slots: '5 Brands Max',
    color: 'from-yellow-400 to-amber-500',
    borderColor: 'border-yellow-500',
    perks: [
      'Official Gold Partner status across all media banners and website',
      'Dedicated exhibition booth (10x8 ft) on festival grounds',
      'Logo featured on tournament certificates and award backdrop',
      'Social media promotional spotlight post reached by 20,000+ youth',
      '5 All-day festival admission passes'
    ],
    currentSponsors: [
      { name: 'Dragonstone Cyber Cafe & LAN', tagline: 'The Fastest Blades in the Grid' },
      { name: 'Winterfell Agro Foods', tagline: 'Nourishment for the Long Night' }
    ]
  },
  {
    id: 'tier-partners',
    name: 'Guild Partners',
    gotTitle: 'The Royal Guilds & Envoys',
    price: 'In-Kind / Strategic',
    badge: 'Category Exclusive',
    description: 'Strategic partners powering vital infrastructure including ticketing, media coverage, sound engineering, and refreshment.',
    slots: 'By Category',
    color: 'from-purple-400 to-slate-400',
    borderColor: 'border-purple-400',
    perks: [
      'Official Ticketing Partner: Tickify (Powered with live QR scanning & instant passes)',
      'Official Media Partner: Logo on press releases and promotional trailers',
      'Official Refreshment Guild: Exclusive beverage and snack distribution rights',
      'Certificate of Royal Guild Alliance'
    ],
    currentSponsors: [
      { name: 'Tickify', tagline: 'Official Royal Ticketing Platform of the Realm' },
      { name: 'The Daily Chittagong Tribune', tagline: 'Chronicles of the Realm' }
    ]
  }
];

export const SMALL_COUNCIL: OrganizerMember[] = [
  {
    id: 'council-1',
    name: 'Prof. Mohammad Mujibur Rahman',
    gotTitle: 'Grand Maester of the Citadel',
    modernRole: 'Honorable Principal & Chief Patron',
    category: 'advisory',
    batch: 'BCS General Education',
    department: 'Principal, Chittagong College',
    houseAllegiance: 'Protector of All Four Houses',
    quote: 'Chittagong College has held the torch of enlightenment for over 150 years. This winter, let our youth ignite the skies.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    socials: { email: 'principal@ctgcollege.gov.bd' }
  },
  {
    id: 'council-2',
    name: 'Fahim Shahriar Chowdhury',
    gotTitle: 'Hand of the King',
    modernRole: 'Fest Convener & Small Council Head',
    category: 'council',
    batch: 'HSC Batch 2024',
    department: 'Department of Science',
    houseAllegiance: 'House Veritas & Arcanum',
    quote: 'We have forged an arena worthy of legends. Bring your sharpest minds and fiercest hearts.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', facebook: '#', email: 'convener@cdccfest.org' }
  },
  {
    id: 'council-3',
    name: 'Ayesha Siddiqua',
    gotTitle: 'Master of Coin',
    modernRole: 'Chief Treasurer & Sponsorships Director',
    category: 'council',
    batch: 'HSC Batch 2024',
    department: 'Department of Business Studies',
    houseAllegiance: 'House Valorous',
    quote: 'Every coin in the Citadel is accounted for; every dragon spent will echo through festival glory.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', facebook: '#' }
  },
  {
    id: 'council-4',
    name: 'Nafis Imtiaz',
    gotTitle: 'Master of Whispers',
    modernRole: 'Head of Public Relations, Digital Media & Tickify',
    category: 'council',
    batch: 'HSC Batch 2024',
    department: 'Department of Science',
    houseAllegiance: 'House Arcanum',
    quote: 'No raven flies without our knowledge; no student in Chittagong shall remain unaware of Carnival Da Chittagong College.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', facebook: '#' }
  },
  {
    id: 'council-5',
    name: 'Rubaiyat Zaman',
    gotTitle: 'Commander of the City Watch',
    modernRole: 'Head of Operations, Logistics & Crowd Protocol',
    category: 'council',
    batch: 'HSC Batch 2024',
    department: 'Department of Humanities',
    houseAllegiance: 'House Valorous (Rover Scout Leader)',
    quote: 'The Citadel walls shall stand unbreached. Discipline and hospitality are our sacred vows.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    socials: { linkedin: '#' }
  },
  {
    id: 'council-6',
    name: 'Sadia Sultana Nova',
    gotTitle: 'Mistress of Revels',
    modernRole: 'Head of Segments & Cultural Directorship',
    category: 'council',
    batch: 'HSC Batch 2025',
    department: 'Department of Humanities',
    houseAllegiance: 'House Melodia',
    quote: 'From battle of bands to poetry under the stars, our melodies shall break the cold night.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    socials: { facebook: '#' }
  },
  {
    id: 'council-7',
    name: 'Farhan Tanvir',
    gotTitle: 'High Architect of the Citadel',
    modernRole: 'Chief Web Developer & Digital Operations',
    category: 'steward',
    batch: 'HSC Batch 2025',
    department: 'Department of Science',
    houseAllegiance: 'House Arcanum',
    quote: 'Forging pixels in Valyrian fire. Smooth code, frosted glass, zero lag.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    socials: { linkedin: '#' }
  },
  {
    id: 'council-8',
    name: 'Muntasir Billah',
    gotTitle: 'Lord Marshal of Volunteer Guild',
    modernRole: 'Volunteer Battalion Coordinator (120+ Cadets)',
    category: 'guard',
    batch: 'HSC Batch 2025',
    department: 'Department of Business Studies',
    houseAllegiance: 'House Valorous',
    quote: 'A battalion of 120 fierce college volunteers ready at every gate and every corridor.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    socials: { facebook: '#' }
  }
];

export const FEST_SCHEDULE: FestDaySchedule[] = [
  {
    day: 1,
    date: 'Friday, February 27, 2026',
    title: 'The Gathering of Banners & The Grand Debates',
    gotTitle: 'Prologue: When the Raven Sings',
    description: 'The royal opening procession, hoisting of club banners, opening debates, and the rapid chess tourney.',
    events: [
      { time: '09:00 AM', title: 'Grand Gate Unlocking & Royal March of the 4 Houses', venue: 'Main Citadel Gates', type: 'ceremony' },
      { time: '10:00 AM', title: 'Royal Proclamation by Grand Maester (Principal)', venue: 'Auditorium', type: 'ceremony' },
      { time: '11:00 AM', title: 'The Great Barsha-Barsha Parliamentary Debate - Round 1 & 2', venue: 'Academic Red Keep', type: 'competition', house: 'House Veritas' },
      { time: '02:00 PM', title: 'The Grand Citadel Chess Championship', venue: 'Citadel Library', type: 'competition', house: 'House Valorous' },
      { time: '04:30 PM', title: 'The Astrolabe Math Olympiad & Science Exhibition Opens', venue: 'Science Block Quad', type: 'competition', house: 'House Arcanum' },
      { time: '08:00 PM', title: 'Citadel 12-Hour Overnight Hackathon Commences', venue: 'Advanced IT Lab', type: 'competition', house: 'House Arcanum' }
    ]
  },
  {
    day: 2,
    date: 'Saturday, February 28, 2026',
    title: 'The Crucible of Steel, Commerce & Virtual War',
    gotTitle: 'Act II: The Clash of Kings & Alchemists',
    description: 'Robotics arena battles, corporate startup pitching, and high-intensity esports skirmishes.',
    events: [
      { time: '08:00 AM', title: 'Overnight Hackathon Code Freeze & Submissions', venue: 'ICT Fortress', type: 'competition', house: 'House Arcanum' },
      { time: '10:00 AM', title: 'The Iron Bank Pitch Battle (Startup Case Presentation)', venue: 'Red Keep Seminar Room', type: 'competition', house: 'House Valorous' },
      { time: '11:00 AM', title: 'Steel Behemoth: Robo-Warfare & Obstacle Gauntlet', venue: 'Central Courtyard Arena', type: 'competition', house: 'House Arcanum' },
      { time: '01:00 PM', title: 'Citadel Esports Arena (Valorant & EA FC 24 Playoffs)', venue: 'Student Common Fortress', type: 'competition' },
      { time: '03:30 PM', title: 'House Veritas Grand Final: Parliamentary Debate', venue: 'Main Auditorium', type: 'competition', house: 'House Veritas' },
      { time: '06:30 PM', title: 'Acoustic Bonfire & Evening Folk Recital by CCCC', venue: 'Principal’s Hillside Lawn', type: 'entertainment', house: 'House Melodia' }
    ]
  },
  {
    day: 3,
    date: 'Sunday, March 1, 2026',
    title: 'The Grand Coronation & Winter Symphony Concert',
    gotTitle: 'Epilogue: The Song of Ice and Fire',
    description: 'The coronation of House Champions, Iron Throne Cosplay walk, and the mega rock concert.',
    events: [
      { time: '10:30 AM', title: 'The Council of High Treaties (Mini-MUN Assembly)', venue: 'Conference Chamber', type: 'competition', house: 'House Valorous' },
      { time: '02:00 PM', title: 'Iron Throne Cosplay & Masquerade Royale', venue: 'Central Runway Stage', type: 'competition', house: 'House Melodia' },
      { time: '04:00 PM', title: 'Battle of the Citadel Bards: Band Wars Showcase', venue: 'Open Air Mega Stage', type: 'competition', house: 'House Melodia' },
      { time: '06:00 PM', title: 'Grand Award Ceremony & Presentation of the Valyrian Crests', venue: 'Open Air Mega Stage', type: 'ceremony' },
      { time: '07:30 PM', title: 'Winter Symphony: Guest Headline Bands Live in Concert', venue: 'Citadel Central Field', type: 'entertainment' }
    ]
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'loc-auditorium',
    name: 'Auditorium Hall',
    gotAlias: 'The Great Hall of the Red Keep',
    description: 'The ancient high-ceilinged hall where royal debates and the opening ceremony are proclaimed.',
    coordinates: { x: 35, y: 38 },
    eventsHosted: ['Grand Parliamentary Debate', 'Opening Ceremony', 'Cosplay Runway']
  },
  {
    id: 'loc-field',
    name: 'Central College Field',
    gotAlias: 'The Tourney Grounds & Mega Arena',
    description: 'The sprawling grassy plains where the open-air stage rises and thousands gather for the headline concert.',
    coordinates: { x: 65, y: 55 },
    eventsHosted: ['Winter Symphony Concert', 'Award Gala', 'Band Battles']
  },
  {
    id: 'loc-science',
    name: 'Science & ICT Complex',
    gotAlias: 'The Alchemist’s Citadel',
    description: 'Multi-story brick structure housing robotics pits, coding fortresses, and high-tech experiments.',
    coordinates: { x: 20, y: 65 },
    eventsHosted: ['12-Hour Hackathon', 'Robo-War', 'Math Olympiad']
  },
  {
    id: 'loc-library',
    name: 'Central Heritage Library',
    gotAlias: 'The Tower of the Silent Maesters',
    description: 'Chilly, quiet sanctuary containing century-old books and the high-tension chess showdowns.',
    coordinates: { x: 80, y: 30 },
    eventsHosted: ['Cyvasse Chess Championship', 'Quiet Deliberations']
  },
  {
    id: 'loc-hill',
    name: 'Principal’s Hill & Pine Groves',
    gotAlias: 'The Eyrie Hilltop Overlook',
    description: 'Scenic elevated hillside offering a cold breeze, pine trees, and sunset acoustic jam sessions.',
    coordinates: { x: 50, y: 18 },
    eventsHosted: ['Acoustic Folk Jam', 'Small Council VIP Lounge']
  }
];

export const SORTING_QUESTIONS = [
  {
    question: "When a sudden crisis threatens the festival gates, what weapon do you draw first?",
    options: [
      { text: "A razor-sharp argument and rhetorical speech that disarms every challenger.", houseId: "house-veritas" },
      { text: "A mechanical automaton and an innovative algorithm to systematically eliminate the threat.", houseId: "house-arcanum" },
      { text: "An inspiring battle anthem that stirs the courage of all five thousand souls present.", houseId: "house-melodia" },
      { text: "A disciplined tactical blueprint and alliance treaty signed in gold and honor.", houseId: "house-valorous" }
    ]
  },
  {
    question: "In the Great Library of the Citadel, which ancient scroll calls your attention?",
    options: [
      { text: "The Art of Persuasion: How Words Toppled Seven Tyrants without Bloodshed.", houseId: "house-veritas" },
      { text: "Tome of Arcane Machines, Celestial Motion, and Alchemical Secrets.", houseId: "house-arcanum" },
      { text: "The Ballads of the Frozen Sun: Chords That Awaken Empires.", houseId: "house-melodia" },
      { text: "The Ledger of the Iron Bank: Strategies for Endless Prosperity and Command.", houseId: "house-valorous" }
    ]
  },
  {
    question: "What is your greatest ideal in the college community?",
    options: [
      { text: "Truth and relentless intellectual discourse.", houseId: "house-veritas" },
      { text: "Pioneering technological progress and discovery.", houseId: "house-arcanum" },
      { text: "Pure aesthetic passion, melody, and theatrical magic.", houseId: "house-melodia" },
      { text: "Leadership, civic duty, and honorable execution.", houseId: "house-valorous" }
    ]
  }
];

export const FAQS = [
  {
    q: "Who is eligible to participate in Carnival Da Chittagong College?",
    a: "The festival invites all students of Chittagong College, along with registered delegations from high schools, colleges, and universities across Bangladesh. Pass registration via Tickify is required for entry."
  },
  {
    q: "How do I secure tickets and tournament registrations?",
    a: "All passes and tournament registrations are handled seamlessly through our official ticketing partner, Tickify. Click the 'Register (Tickify)' button in the top navigation or choose your desired segment pass."
  },
  {
    q: "Can one warrior (student) participate in multiple segments?",
    a: "Yes! As long as the tournament schedules do not directly conflict, you may register for multiple segments across different Houses."
  },
  {
    q: "Is there an entry pass required for visitors who simply wish to watch and attend concerts?",
    a: "Yes, visitors can grab the 'General Citadel Pass' on Tickify, granting entry to all exhibition zones, open-air stages, and food stalls across the three days."
  },
  {
    q: "How are the House Points calculated for the House Championship Cup?",
    a: "Each victory in a tournament awards points to the champion's affiliated house: 1st Place = 100 pts, 2nd Place = 60 pts, 3rd Place = 30 pts. Member participation also adds bonus points."
  }
];
