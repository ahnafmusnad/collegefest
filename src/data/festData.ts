import { ClubHouse, Segment, SponsorTier, OrganizerMember, FestDaySchedule, CampusLocation } from '../types';

export const FEST_METADATA = {
  name: "Carnaval Da Chittagong College",
  tagline: "When Winter Descends Upon The Red Citadel, Four Great Houses Clash For Eternal Glory.",
  edition: "Inaugural Edition",
  dates: "December 18–19, 2026",
  venue: "Chittagong College Heritage Campus, Chawkbazar, Chittagong",
  tickifyLink: "https://tickify.live",
  totalPrizePool: "150,000+ BDT",
  expectedFootfall: "1,000+ Students, Teachers & Guardians",
  participatingInstitutions: "25+ Institutions",
  countdownTarget: "2026-12-18T09:00:00",
};

// Official Carnaval social channels.
// TODO: replace each placeholder "#" with the real profile URL.
export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com/carnavaldacc', icon: 'Facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/carnaval_da_cc/', icon: 'Instagram' },
  { name: 'YouTube', url: '#', icon: 'Youtube' },
] as const;

export const FOUR_HOUSES: ClubHouse[] = [
  {
    id: 'house-arcanum',
    name: 'Chittagong College Physics & Astronomy Club (CCPAC)',
    houseName: 'House Stark',
    motto: 'The North Remembers',
    sigil: 'The Direwolf',
    iconName: 'Cpu',
    logo: '/images/club-logos/ccpac-physics-astronomy.webp',
    colorScheme: {
      primary: '#145e62', // Teal
      secondary: '#17686e',
      border: 'border-crimson/50',
      glow: 'shadow-crimson/40',
      bgGradient: 'from-ink-3/80 via-ink-2/90 to-ink/80',
      accent: 'text-crimson-2'
    },
    lore: 'Founded in 2025, CCPAC is a leading student-led Physics and Astronomy club at Chittagong College, running workshops, competitions and camps. Its members have represented Bangladesh at international science Olympiads, carrying the banner of the Citadel to the world stage.',
    founded: '2025',
    achievements: [
      'Medals & honours at International APhO, EuPhO & IPhO',
      'Recognition at Physics Cup, OWAO & IAO',
      'Multiple national-team selections and honourable mentions'
    ],
    memberCount: 0,
    points: 1310,
    links: {
      facebook: 'https://www.facebook.com/61572631723477/',
      website: 'https://ccpac.vercel.app'
    }
  },
  {
    id: 'house-melodia',
    name: 'Chittagong College English Language & Literature Club — The Muses (CCELLC)',
    houseName: 'House Targaryen',
    motto: 'Fire & Blood',
    sigil: 'The Three-Headed Dragon',
    iconName: 'Music',
    logo: '/images/club-logos/muses-english-literature.webp',
    colorScheme: {
      primary: '#145e62', // Teal
      secondary: '#17686e',
      border: 'border-crimson/50',
      glow: 'shadow-crimson/40',
      bgGradient: 'from-ink-3/80 via-ink-2/90 to-ink/80',
      accent: 'text-crimson-2'
    },
    lore: 'Founded in 2025, The Muses is a 150+ member literary club building creativity and confidence through workshops, writing competitions, public speaking and cultural programmes. The club represents Chittagong College nationally and even collaborated with Memorial University of Newfoundland, Canada on an academic session about higher education abroad.',
    founded: '2025',
    achievements: [
      'QCEC Gold Medal',
      'National English Olympiad Finalist',
      'National representation – English Speech & National Education Week',
      'Annual Fest – 300+ participants, staged in presence of the Principal',
      'Cultural Event 2026 – vibrant programme with 150+ students'
    ],
    memberCount: 150,
    points: 1190,
    /* ✏️ PASTE THE MUSES' OFFICIAL FACEBOOK PAGE + WEBSITE URLS BELOW */
    links: { facebook: '', website: '' }
  },
  {
    id: 'house-veritas',
    name: 'Chittagong College Debating Society (CCDS)',
    houseName: 'House Lannister',
    motto: 'Lannisters Always Pay Their debt',
    sigil: 'The Golden Lion',
    iconName: 'Scroll',
    logo: '/images/club-logos/ccds-debating-society.webp',
    colorScheme: {
      primary: '#145e62', // Teal
      secondary: '#17686e',
      border: 'border-crimson/50',
      glow: 'shadow-crimson/40',
      bgGradient: 'from-ink-3/80 via-ink-2/90 to-ink/80',
      accent: 'text-crimson-2'
    },
    lore: 'Forged in the debating chambers of the Red Citadel, House Lannister exists to build a culture of argument and inquiry at Chittagong College. Its debaters have stood tall in national tournaments alongside the country’s established institutions, sharpening critical thinking, research, public speaking and communication on the way to becoming one of Bangladesh’s leading debating societies.',
    founded: '—',
    achievements: [
      'Champions – CUSD Nationals 2026',
      'Champions – CUDS Nationals 2025',
      'Runners-up – FSET 2025',
      'Semi-Finalists – CSDS, PUDS & DCU Nationals 2026',
      'Semi-Finalists – Drishty Debate Championship 2026'
    ],
    memberCount: 0,
    points: 1240,
    /* ✏️ PASTE CCDS' OFFICIAL FACEBOOK PAGE + WEBSITE URLS BELOW */
    links: { facebook: '', website: '' }
  },
  {
    id: 'house-valorous',
    name: 'Chittagong College Photographic Society (CCPS)',
    houseName: 'House Baratheon',
    motto: 'Ours Is The Fury',
    sigil: 'The Crowned Stag',
    iconName: 'Shield',
    logo: '/images/club-logos/ccps-photographic-society.webp',
    colorScheme: {
      primary: '#145e62', // Teal
      secondary: '#17686e',
      border: 'border-crimson/50',
      glow: 'shadow-crimson/40',
      bgGradient: 'from-ink-3/80 via-ink-2/90 to-ink/80',
      accent: 'text-crimson-2'
    },
    lore: 'Established in 2026, CCPS has become one of Chittagong College’s most engaging clubs, bringing hundreds of photography enthusiasts together through online contests like Capture the Campus and offline sessions, while running weekly and monthly member-exclusive contests that champion creative freedom alongside academic excellence.',
    founded: '2026',
    achievements: [
      'Capture the Campus – 200+ participants with 50+ expressive entries',
      'Monthly photography contests with 50+ photographers, expert judges & prize pools',
      'College archives and social media features amplifying student creativity'
    ],
    memberCount: 0,
    points: 1280,
    /* ✏️ PASTE CCPS' OFFICIAL FACEBOOK PAGE + WEBSITE URLS BELOW */
    links: { facebook: '', website: '' }
  }
];

export const FEST_SEGMENTS: Segment[] = [
  {
    id: 'seg-debate-fest',
    title: 'National Debate Fest',
    gotTitle: 'The Grand Tourney of Silver Tongues',
    houseId: 'house-veritas',
    category: 'Debate',
    prizePool: 'Valyrian Steel Crest & Gold Medal',
    goldDragons: 5000,
    teamSize: '3-4 Members',
    entryFee: 'Tickify Pass',
    venue: 'Academic Building',
    date: 'December 18–19, 2026',
    time: '10:00 AM onwards',
    description: 'The flagship oratory trial of the Carnaval. Teams from institutions across the nation clash in parliamentary battle, where the sharpest arguments and coldest nerves carry the crest.',
    rules: [
      'Parliamentary debate format with multiple preliminary rounds leading to the Grand Final.',
      'Motions announced on the day; preparation time as per standard national rules.',
      'Judged by an acclaimed panel of national adjudicators.'
    ],
    judgingCriteria: ['Matter & Argumentation (40%)', 'Manner & Delivery (40%)', 'Method & Strategy (20%)'],
    tags: ['Debate', 'National', 'Flagship', 'Crest'],
    isFeatured: true
  },
  {
    id: 'seg-physics-auction',
    title: 'Team Physics Auction',
    gotTitle: 'The Auction of Wonders',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: 'Valyrian Steel Crest',
    goldDragons: 3500,
    teamSize: '2-4 Members',
    entryFee: 'Tickify Pass',
    venue: 'Parade Ground',
    date: 'December 19, 2026',
    time: '11:00 AM onwards',
    description: 'Teams bid gold-dragons for physics problem lots, then solve what they win. Strategy, nerve and equations collide in the Citadel’s most thrilling open-ground spectacle.',
    rules: [
      'Teams receive a starting purse of gold-dragons to auction problem lots.',
      'Higher bids claim harder, higher-mark problems.',
      'Final score combines bidding strategy and solution accuracy.'
    ],
    judgingCriteria: ['Solution Accuracy (60%)', 'Auction Strategy (40%)'],
    tags: ['Physics', 'Auction', 'Strategy', 'Open Ground'],
    isFeatured: true
  },
  {
    id: 'seg-team-quiz',
    title: 'Team Quiz',
    gotTitle: 'The Council of Quick Minds',
    houseId: 'house-melodia',
    category: 'Language & Literature',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 3000,
    teamSize: '3 Members',
    entryFee: 'Tickify Pass',
    venue: 'Academic Building',
    date: 'December 18, 2026',
    time: '02:00 PM onwards',
    description: 'Rapid-fire general knowledge and literature rounds where three minds must think as one. Only the swiftest council claims the crest.',
    rules: [
      'Preliminary buzzer rounds followed by a grand final.',
      'Questions spanning literature, language, science and current affairs.',
      'Team of three members from the same institution.'
    ],
    judgingCriteria: ['Correctness (70%)', 'Speed (30%)'],
    tags: ['Quiz', 'Team', 'General Knowledge', 'Literature'],
    isFeatured: false
  },
  {
    id: 'seg-treasure-hunt',
    title: 'Treasure Hunt',
    gotTitle: 'The Citadel Quest',
    houseId: '',
    category: 'Gaming & Fun',
    prizePool: 'Gold Dragon Crest & Surprises',
    goldDragons: 3000,
    teamSize: '2-5 Members',
    entryFee: 'Tickify Pass',
    venue: 'Main Gate → Parade Ground',
    date: 'December 19, 2026',
    time: '01:00 PM onwards',
    description: 'Riddles, clues and hidden sigils scattered across the historic campus. Teams race from the Main Gate through the courts of the Red Citadel to unearth the hidden treasure.',
    rules: [
      'Clue trail spans the campus — each solved riddle reveals the next location.',
      'Teams must stay within campus bounds; no restricted buildings.',
      'First team to reach the final treasure wins the crest.'
    ],
    judgingCriteria: ['Completion Time (100%)'],
    tags: ['Treasure Hunt', 'Riddles', 'Campus Race', 'Adventure'],
    isFeatured: false
  },
  {
    id: 'seg-physics-olympiad',
    title: 'Physics Olympiad',
    gotTitle: 'The Trial of Cosmic Reason',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: 'Gold Dragon Crest & Medals',
    goldDragons: 4000,
    teamSize: 'Solo / Duo',
    entryFee: 'Tickify Pass',
    venue: 'Academic Building',
    date: 'December 18, 2026',
    time: '11:00 AM onwards',
    description: 'The written crucible of House Stark. SSC and HSC-level scholars battle through conceptual and problem-solving rounds modeled on international Olympiad standards.',
    rules: [
      'Written examination rounds covering core SSC/HSC physics syllabi.',
      'International Olympiad-style problem sets for the final round.',
      'OMR / structured answer scripts evaluated by faculty jurors.'
    ],
    judgingCriteria: ['Conceptual Accuracy (50%)', 'Problem Solving (30%)', 'Final Round Performance (20%)'],
    tags: ['Physics', 'Olympiad', 'Science', 'Written Round'],
    isFeatured: true
  },
  {
    id: 'seg-english-olympiad',
    title: 'English Olympiad',
    gotTitle: 'The Muses’ Written Trial',
    houseId: 'house-melodia',
    category: 'Language & Literature',
    prizePool: 'Valyrian Steel Crest & Medals',
    goldDragons: 4000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Academic Building',
    date: 'December 18, 2026',
    time: '12:30 PM onwards',
    description: 'Hosted by The Muses, this written championship tests grammar, comprehension, vocabulary and literary intuition — a true trial for the wordsmiths of the realm.',
    rules: [
      'Written rounds: grammar, comprehension, vocabulary and literature.',
      'Progressive elimination leading to a grand final.',
      'Answer scripts evaluated by language faculty.'
    ],
    judgingCriteria: ['Language Accuracy (40%)', 'Comprehension (30%)', 'Literary Insight (30%)'],
    tags: ['English', 'Olympiad', 'Literature', 'Writing'],
    isFeatured: true
  },
  {
    id: 'seg-macro-photography',
    title: 'Macro Photography Contest',
    gotTitle: 'The Art of the Lens',
    houseId: 'house-valorous',
    category: 'Culture & Arts',
    prizePool: 'Valyrian Steel Crest & Medals',
    goldDragons: 3000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Parade by Lane',
    date: 'December 18, 2026',
    time: '03:00 PM onwards',
    description: 'Presented by the Photographic Society, this on-spot contest challenges shooters to capture the smallest empires — dew, brick, light and shadow — hiding in plain sight across the Citadel.',
    rules: [
      'On-spot macro photography within the announced campus zone.',
      'One submission per participant, shot during the event window.',
      'Minimal editing allowed; EXIF may be verified.'
    ],
    judgingCriteria: ['Composition (40%)', 'Technical Skill (30%)', 'Creativity (30%)'],
    tags: ['Photography', 'Macro', 'On-Spot', 'Culture'],
    isFeatured: false
  },
  {
    id: 'seg-colour-hunt',
    title: 'Colour Hunt',
    gotTitle: 'Hues of the Citadel',
    houseId: 'house-valorous',
    category: 'Culture & Arts',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2500,
    teamSize: 'Solo / Duo',
    entryFee: 'Tickify Pass',
    venue: 'Parade by Lane',
    date: 'December 19, 2026',
    time: '02:30 PM onwards',
    description: 'A chromatic scavenger chase — participants hunt and photograph every colour of the spectrum hidden across the grounds. The most complete palette claims glory.',
    rules: [
      'A list of target colours is released at the start of the window.',
      'Each colour must be photographed on-spot within the campus.',
      'Points per unique colour; speed breaks ties.'
    ],
    judgingCriteria: ['Colour Completeness (60%)', 'Speed (40%)'],
    tags: ['Colour Hunt', 'Photography', 'Fun', 'Scavenger'],
    isFeatured: false
  },
  {
    id: 'seg-scientific-article-writing',
    title: 'Scientific Article Writing',
    gotTitle: 'The Scroll of Evidence',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Write a concise scientific article on a given theme and submit digitally. Rigorous research, clear exposition and scholarly tone decide the winner.',
    rules: [
      'Submit a written article within the event window via the online portal.',
      'Articles are checked for originality and academic integrity.',
      'Judged on content depth, clarity, and citation quality.'
    ],
    judgingCriteria: ['Content Quality (40%)', 'Originality (30%)', 'Clarity & Presentation (30%)'],
    tags: ['Online', 'Writing', 'Science', 'Article'],
    isFeatured: false
  },
  {
    id: 'seg-why-is-it-debatable',
    title: 'Why is it Debatable?',
    gotTitle: 'The Motion Unspoken',
    houseId: 'house-veritas',
    category: 'Debate',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Submit a written position piece arguing for or against a provocative motion. The most compelling, logically sound stance claims the crest.',
    rules: [
      'Submit a written argument on the announced motion within the deadline.',
      'Pieces are evaluated by faculty adjudicators on logic and rhetoric.',
      'No live debate; written submissions only.'
    ],
    judgingCriteria: ['Argument Strength (50%)', 'Clarity (30%)', 'Rhetorical Appeal (20%)'],
    tags: ['Online', 'Debate', 'Writing', 'Critical Thinking'],
    isFeatured: false
  },
  {
    id: 'seg-explaining-the-theory',
    title: 'Explaining the Theory',
    gotTitle: 'The Scholar’s Exposition',
    houseId: 'house-arcanum',
    category: 'Science & Tech',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Explain a complex scientific theory in simple terms for a general audience. Clarity and accessibility win over jargon.',
    rules: [
      'Choose or be assigned a theory to explain in a short written piece.',
      'Submissions are judged on simplicity, accuracy, and engagement.',
      'Online submission only.'
    ],
    judgingCriteria: ['Simplicity (40%)', 'Accuracy (35%)', 'Engagement (25%)'],
    tags: ['Online', 'Science', 'Explanation', 'Education'],
    isFeatured: false
  },
  {
    id: 'seg-story-writing',
    title: 'Story Writing',
    gotTitle: 'The Citadel Chronicle',
    houseId: 'house-melodia',
    category: 'Language & Literature',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Write an original short story inspired by the Carnaval theme. Imagination, narrative arc, and prose decide the champion.',
    rules: [
      'Submit an original short story within the word limit via the online portal.',
      'Plagiarism is not tolerated; submissions are screened.',
      'Judged by literary faculty on creativity and craft.'
    ],
    judgingCriteria: ['Creativity (40%)', 'Plot & Structure (30%)', 'Prose & Language (30%)'],
    tags: ['Online', 'Writing', 'Fiction', 'Literature'],
    isFeatured: false
  },
  {
    id: 'seg-beyond-the-matrics',
    title: 'Beyond the Matrics',
    gotTitle: 'The Scholar’s Horizon',
    houseId: 'house-melodia',
    category: 'Language & Literature',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'An essay-style challenge that looks beyond the syllabus — on education, society, and what comes after school.',
    rules: [
      'Submit a written essay on the given theme within the event window.',
      'Entries are evaluated by faculty on insight and expression.',
      'Online submissions only.'
    ],
    judgingCriteria: ['Insight (40%)', 'Expression (30%)', 'Coherence (30%)'],
    tags: ['Online', 'Essay', 'Education', 'Thought'],
    isFeatured: false
  },
  {
    id: 'seg-scrapbook',
    title: 'Scrapbook',
    gotTitle: 'The Memory Tome',
    houseId: 'house-valorous',
    category: 'Culture & Arts',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 2000,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Create a digital scrapbook collage themed around Carnaval memories. Layout, creativity, and visual storytelling count.',
    rules: [
      'Submit a digital scrapbook spread via the online portal.',
      'Original artwork and photography preferred.',
      'Judged on design, theme alignment, and creativity.'
    ],
    judgingCriteria: ['Design & Layout (40%)', 'Creativity (30%)', 'Theme Fit (30%)'],
    tags: ['Online', 'Design', 'Collage', 'Arts'],
    isFeatured: false
  },
  {
    id: 'seg-academic-meme',
    title: 'Academic Meme',
    gotTitle: 'The Court Jester’s Scroll',
    houseId: 'house-valorous',
    category: 'Culture & Arts',
    prizePool: 'Gold Dragon Crest',
    goldDragons: 1500,
    teamSize: 'Solo',
    entryFee: 'Tickify Pass',
    venue: 'Online',
    date: 'December 18–19, 2026',
    time: 'Submission Window',
    description: 'Create an academic-themed meme that lands with students and scholars alike. Wit, relevance, and originality win.',
    rules: [
      'Submit a meme image via the online portal within the event window.',
      'Content must be respectful and campus-appropriate.',
      'Judged on humor, originality, and relatability.'
    ],
    judgingCriteria: ['Humor & Wit (40%)', 'Originality (30%)', 'Relatability (30%)'],
    tags: ['Online', 'Meme', 'Humor', 'Fun'],
    isFeatured: false
  }
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'tier-title',
    name: 'Title Sponsor',
    gotTitle: 'The Hand of the King',
    brands: ['Braavos Financial Group'],
    badge: '1 Exclusive Slot',
    description: 'The supreme patron whose banner flies above the Carnaval across every mention of the event — in print, online, and on-ground.',
    slots: '1 Brand Only',
    color: 'from-gold-2 to-gold',
    borderColor: 'border-gold',
    perks: [
      'Official naming rights: the festival is presented as "[Your Brand] presents Carnaval Da Chittagong College"',
      'Maximum banner visibility — the most prominent placement across all event banners',
      'Leading shoutout across all official social media promotions, plus a dedicated announcement post',
      'Highest visibility in the official promo video, plus an optional dedicated promotional video for your brand',
      'Logo prominence on all official festival T-shirts and notebooks distributed to every participant',
      'Highest prize naming rights (1st Prize, sponsored by you)',
      'Featured logo placement and acknowledgment on the official event website',
      'Exclusive engagement stall to reach students directly, one-on-one',
      'Sole sponsor featured in the official letter of gratitude, distributed to all institutions and dignitaries',
      'Highest-level access to run independent promotional campaigns across the full festival',
      'Reserved stage time for your representative to address the attendees directly',
      'Dedicated leaflet placed inside every participant gift hamper',
      'Largest share of the interactive pitch segment — around 6 of ~20 participants pitch your brand on stage'
    ]
  },
  {
    id: 'tier-power',
    name: 'Power Sponsor',
    gotTitle: 'The Shield of the Realm',
    brands: ['Dragonstone Energy', 'Raven Express'],
    badge: 'Limited Slots',
    description: 'The festival carries your brand as "Powered by [Your Brand]" — a leading identity just behind the Title Sponsor across every medium.',
    slots: 'Limited Brands',
    color: 'from-crimson-2 via-gold-2 to-gold',
    borderColor: 'border-crimson',
    perks: [
      'Official naming rights: the festival carries your brand as "Powered by [Your Brand]"',
      'Prominent banner placement across all event banners, just behind the Title Sponsor',
      'Full-featured social media shoutouts, positioned right after the Title Sponsor',
      'Prominent feature in the official event promo video',
      'Prominent logo placement on official festival T-shirts and notebooks',
      'Second-highest prize naming rights (2nd Prize, sponsored by you)',
      'Strong on-ground presence with dedicated promotional activity throughout the grounds',
      'Dedicated engagement stall for direct student interaction',
      'Strong share of the audience-facing promotional segments'
    ]
  },
  {
    id: 'tier-platinum',
    name: 'Platinum Sponsor',
    gotTitle: 'High Valyrian Lords',
    brands: ['Oldtown Press', 'Winterfell Apparel', 'Citadel Stationery'],
    badge: 'Limited Slots',
    description: 'A prestigious partnership with a dedicated workshop stage, prime stall space, and priority visibility across festival media.',
    slots: 'Limited Brands',
    color: 'from-gold-2 via-bone to-gold',
    borderColor: 'border-gold',
    perks: [
      'A dedicated 20–30 minute workshop/seminar showcasing and promoting your work',
      'Leading logo placement on specific event banners, just behind the Power Sponsor',
      'Full-featured social media recognition, positioned right after the Power Sponsor',
      'Exclusive opportunity to showcase and promote your products among a large, diverse student audience',
      'Prominent logo placement on official festival T-shirts and notebooks',
      'Third-highest prize naming rights (3rd Prize, sponsored by you)',
      'Strong on-ground presence with dedicated promotional activity',
      'Dedicated engagement stall for direct student interaction',
      'Featured slot in the product promotion segment, behind the Power Sponsor',
      'Priority in future collaborations between your company and Chittagong College'
    ]
  },
  {
    id: 'tier-gold',
    name: 'Gold Sponsor',
    gotTitle: 'The Iron Bank',
    brands: ['Kingsroad Café', 'Fleabottom Prints', 'Harborview Optics', 'Seven Spices'],
    badge: 'Limited Slots',
    description: 'A powerful presence offering targeted brand visibility, stall activation, and direct engagement with Chittagong’s finest young minds.',
    slots: 'Limited Brands',
    color: 'from-gold-2 to-ember',
    borderColor: 'border-ember',
    perks: [
      'Logo inclusion across selected event banners and key promotional displays throughout the venue',
      'Exclusive stall space at the venue to distribute leaflets and engage students directly',
      'Logo placement on the official festival T-shirts distributed to participants and organizers',
      'Logo placement on official event notepads used during the debate and olympiad segments',
      'Recognition in the official event promo short film alongside top-tier sponsors',
      'Featured logo placement and acknowledgment on the official event website',
      'Optional promotional video showcasing your products across official media channels',
      'Dedicated stage time for your representative to address the audience directly'
    ]
  },
  {
    id: 'tier-cosponsor',
    name: 'Co-Sponsor',
    gotTitle: 'The Royal Guilds & Envoys',
    badge: 'In-Kind / Strategic',
    description: 'Strategic partners powering vital festival infrastructure — ticketing, media coverage, and on-ground experience.',
    slots: 'By Category',
    color: 'from-crimson-2 to-bone-dim',
    borderColor: 'border-crimson-2',
    perks: [
      'Official Ticketing Partner: branded passes, live QR scanning and instant entry management',
      'Official Media Partner: logo on press releases, promo shorts and media coverage',
      'Official Experience Guild: exclusive stall and campus activation rights',
      'Social media and website acknowledgment across official channels',
      'Certificate of Royal Guild Alliance from the Organizing Committee'
    ]
  }
];

export const SMALL_COUNCIL: OrganizerMember[] = [
  {
    id: 'council-6',
    name: 'Mehraj Tajwar',
    gotTitle: 'High Architect',
    modernRole: 'Organizer, Segments & Stage',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Builder of the Tourney Grounds',
    quote: 'From the first riddle to the final crest — we forge the trials that legends are made of.',
    image: '',
    socials: { email: 'tajwarmht@gmail.com' }
  },
  {
    id: 'council-7',
    name: 'Labib Hasan Mahmud',
    gotTitle: 'Commander of the City Watch',
    modernRole: 'Volunteer & Logistics Coordinator',
    category: 'guard',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Shield of the Realm',
    quote: 'Discipline and hospitality are our sacred vows — no warrior shall go unguided at the Citadel.',
    image: '',
    socials: { email: 'labibhasan2900@gmail.com' }
  },
  {
    id: 'council-5',
    name: 'Apurba Das Joy',
    gotTitle: 'Lord Marshal of the Citadel',
    modernRole: 'Organizer, Operations & Coordination',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Commander of the Grounds',
    quote: 'Every segment, every stall, every banner — the Citadel shall stand ready for the realm’s brightest minds.',
    image: '',
    socials: { email: 'apurbasadjoy99@gmail.com' }
  },
  {
    id: 'council-8',
    name: 'Ahnaf Azim',
    gotTitle: 'Herald of the Realm',
    modernRole: 'Head, Publicity & Outreach',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Voice that Rallies the Banners',
    quote: 'Let every raven carry the word — from the first banner raised to the last torch lit, the realm shall know of this Carnaval.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-9',
    name: 'Fariha Marium Masud',
    gotTitle: 'Maester of the Scrolls',
    modernRole: 'Registration & Records Keeper',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Keeper of Every Name Sworn',
    quote: 'Every champion begins as a name upon a scroll — and no name sworn to this tourney shall ever be misplaced.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-10',
    name: 'Rajarshi Das Gupta',
    gotTitle: 'Steward of the Lists',
    modernRole: 'Segment Scheduling & Coordination',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Keeper of the Tourney Order',
    quote: 'Sixteen trials, one grand design — every bout and every round shall fall in its appointed hour.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-11',
    name: 'Jit Chowdhury',
    gotTitle: 'Warden of the Grounds',
    modernRole: 'Venue Setup & Infrastructure',
    category: 'guard',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Forge and Framework of the Citadel',
    quote: 'Stage, gate, and ground — before the first horn sounds, the Citadel itself shall be worthy of its champions.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-4',
    name: 'Sabbir Hossain',
    gotTitle: 'Master of Coin',
    modernRole: 'Head, Sponsorship Wing',
    category: 'council',
    batch: 'Organizing Committee',
    department: 'Sponsorship Wing, Carnaval Da Chittagong College',
    houseAllegiance: 'House of Partnerships & Alliances',
    quote: 'We invite your house to join ours — let us build a partnership that empowers the leaders of tomorrow.',
    image: '',
    socials: { email: 'sabbirhossa711@gmail.com' }
  },
  {
    id: 'council-12',
    name: 'Sudhriti Paul',
    gotTitle: 'Voice of the Court',
    modernRole: 'Media & Communications',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Chronicler of the Carnaval',
    quote: 'Every victory, every song, every face in the crowd — this court shall see them written into legend.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-13',
    name: 'Khadiza Nower Namira',
    gotTitle: 'Keeper of the Coffers',
    modernRole: 'Finance & Budgeting',
    category: 'steward',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Guardian of the Citadel Treasury',
    quote: 'A realm is only as strong as its stewardship — every coin shall serve the glory of this gathering.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-14',
    name: 'Arithra Chowdhury',
    gotTitle: 'Knight of the Gate',
    modernRole: 'Crowd Control & Discipline',
    category: 'guard',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Shield at the Citadel Doors',
    quote: 'Order at the gates makes joy within the walls — every guest shall pass in peace, and leave with honor.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  },
  {
    id: 'council-15',
    name: 'Rabab Nayeem Siha',
    gotTitle: 'Steward of Hospitality',
    modernRole: 'Guest Care & Refreshments',
    category: 'guard',
    batch: 'Organizing Committee',
    department: 'Carnaval Da Chittagong College',
    houseAllegiance: 'Warmth of the Great Hall',
    quote: 'No guest of the Citadel shall want for welcome — bread, warmth, and good cheer await all who gather here.',
    image: '',
    socials: { email: 'carnavaldactgclg@gmail.com' }
  }
];

/* The High Seat — honored alone on the Organizers page, above the council reel. */
export const PROTECTOR_OF_THE_REALM: OrganizerMember = {
  id: 'protector-1',
  name: 'Prof. Mohammad Mozahidul Islam Chowdhury',
  gotTitle: 'Protector of the Realm',
  modernRole: 'Principal, Chittagong College & Chief Patron',
  category: 'advisory',
  batch: 'Government College Leadership',
  department: 'Principal, Chittagong College',
  houseAllegiance: 'Protector of All Four Houses',
  quote: 'Carnaval da Chittagong College gives today’s students the chance to write a chapter of their own.',
  image: '',
  socials: { email: 'carnavaldactgclg@gmail.com' }
};

export const FEST_SCHEDULE: FestDaySchedule[] = [
  {
    day: 1,
    date: 'Friday, December 18, 2026',
    title: 'The Gathering of Banners',
    gotTitle: 'Prologue: When the Raven Sings',
    description: 'The royal opening ceremony, the written olympiads, the National Debate Fest preliminaries, and the first frames of the photography contest.',
    events: [
      { time: '09:00 AM', title: 'Grand Opening Ceremony & Principal’s Proclamation', venue: 'Parade Ground', type: 'ceremony' },
      { time: '10:00 AM', title: 'National Debate Fest — Preliminary Rounds', venue: 'Academic Building', type: 'competition', house: 'House Lannister' },
      { time: '11:00 AM', title: 'Physics Olympiad — Written Round', venue: 'Academic Building', type: 'competition', house: 'House Stark' },
      { time: '12:30 PM', title: 'English Olympiad — Written Round', venue: 'Academic Building', type: 'competition', house: 'House Targaryen' },
      { time: '02:00 PM', title: 'Team Quiz — Preliminary Rounds', venue: 'Academic Building', type: 'competition', house: 'House Targaryen' },
      { time: '03:00 PM', title: 'Macro Photography Contest — On-Spot Window', venue: 'Parade by Lane', type: 'competition', house: 'House Baratheon' },
      { time: '05:00 PM', title: 'Day 1 Prize Distribution', venue: 'Parade Ground', type: 'ceremony' }
    ]
  },
  {
    day: 2,
    date: 'Saturday, December 19, 2026',
    title: 'The Grand Finals & Coronation',
    gotTitle: 'Act II: The Clash of Champions',
    description: 'The Grand Final of debates, the Team Physics Auction spectacle, the Treasure Hunt and Colour Hunt across campus, and the closing coronation.',
    events: [
      { time: '10:00 AM', title: 'National Debate Fest — Grand Final', venue: 'Academic Building', type: 'competition', house: 'House Lannister' },
      { time: '11:00 AM', title: 'Team Physics Auction', venue: 'Parade Ground', type: 'competition', house: 'House Stark' },
      { time: '01:00 PM', title: 'Treasure Hunt — The Citadel Quest', venue: 'Main Gate → Parade Ground', type: 'competition' },
      { time: '02:30 PM', title: 'Colour Hunt — Hues of the Citadel', venue: 'Parade by Lane', type: 'competition', house: 'House Baratheon' },
      { time: '04:00 PM', title: 'Closing Ceremony & Coronation of Champions', venue: 'Parade Ground', type: 'ceremony' }
    ]
  }
];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'loc-main-gate',
    name: 'Main Gate',
    gotAlias: 'The North Gate of the Citadel',
    description: 'The grand entrance to the Chittagong College heritage campus, where banners fly and the realm’s warriors gather each morning.',
    coordinates: { x: 50, y: 8 },
    eventsHosted: ['Treasure Hunt Starting Point', 'Sponsor Banners', 'Welcome & Registration']
  },
  {
    id: 'loc-admin-building',
    name: 'Administrative Building',
    gotAlias: 'The Red Keep',
    description: 'The historic heart of the college, where the Principal’s office presides and dignitaries are received during ceremonies.',
    coordinates: { x: 50, y: 30 },
    eventsHosted: ['Guest Reception', 'Dignitary Lounge', 'Official Ceremonies']
  },
  {
    id: 'loc-academic-building',
    name: 'Academic Building',
    gotAlias: 'The Hall of Scrolls & Science',
    description: 'The venerable academic block where the Debate Fest, both Olympiads and the Team Quiz unfold in halls of rigorous intellect.',
    coordinates: { x: 35, y: 55 },
    eventsHosted: ['National Debate Fest', 'Physics Olympiad', 'English Olympiad', 'Team Quiz']
  },
  {
    id: 'loc-parade-ground',
    name: 'Parade Ground',
    gotAlias: 'The Tourney Grounds',
    description: 'The open grounds where the Citadel gathers — opening and closing ceremonies, the Team Physics Auction, and the coronation of champions.',
    coordinates: { x: 65, y: 60 },
    eventsHosted: ['Opening Ceremony', 'Team Physics Auction', 'Closing Ceremony', 'Prize Distribution']
  },
  {
    id: 'loc-parade-lane',
    name: 'Parade by Lane',
    gotAlias: 'The Photographer’s Alley',
    description: 'A scenic lane along the parade grounds, alive with colour and light — home to the Macro Photography Contest and Colour Hunt.',
    coordinates: { x: 75, y: 40 },
    eventsHosted: ['Macro Photography Contest', 'Colour Hunt', 'Campus Photo Walks']
  }
];

export const SORTING_QUESTIONS = [
  {
    question: "When a sudden crisis threatens the festival gates, what weapon do you draw first?",
    options: [
      { text: "A razor-sharp argument that disarms every challenger.", houseId: "house-veritas" },
      { text: "A law of physics and an equation that systematically eliminates the threat.", houseId: "house-arcanum" },
      { text: "A well-turned phrase that stirs the courage of every soul present.", houseId: "house-melodia" },
      { text: "A sharp eye and a steady lens that captures the truth of the moment.", houseId: "house-valorous" }
    ]
  },
  {
    question: "In the Great Library of the Citadel, which ancient scroll calls your attention?",
    options: [
      { text: "The Art of Persuasion: How Words Toppled Tyrants without Bloodshed.", houseId: "house-veritas" },
      { text: "Tome of Celestial Motion, Orbits, and Natural Philosophy.", houseId: "house-arcanum" },
      { text: "The Ballads of the Frozen Sun: Verses That Awaken Empires.", houseId: "house-melodia" },
      { text: "The Photographer’s Codex: Light, Shadow, and the Decisive Frame.", houseId: "house-valorous" }
    ]
  },
  {
    question: "What is your greatest ideal in the college community?",
    options: [
      { text: "Truth and relentless intellectual discourse.", houseId: "house-veritas" },
      { text: "Pioneering scientific discovery and curiosity.", houseId: "house-arcanum" },
      { text: "Literature, expression, and the magic of language.", houseId: "house-melodia" },
      { text: "Creative vision and the art of seeing differently.", houseId: "house-valorous" }
    ]
  }
];

export const FAQS = [
  {
    q: "Who is eligible to participate in Carnaval Da Chittagong College?",
    a: "The festival brings together more than 1,000 SSC and HSC level students from 25+ institutions across the country, along with 40–50 accompanying teachers and 150–200 guardians. Registration is open to all eligible students through Tickify."
  },
  {
    q: "What segments can I compete in?",
    a: "The Carnaval hosts fifteen segments across language, science, debate and culture: National Debate Fest, Team Physics Auction, Team Quiz, Treasure Hunt, Physics Olympiad, English Olympiad, Macro Photography Contest, Colour Hunt, Scientific Article Writing, Why is it Debatable?, Explaining the Theory, Story Writing, Beyond the Matrics, Scrapbook, Academic Meme."
  },
  {
    q: "How do I register for the festival?",
    a: "All festival passes and segment registrations are handled through our official ticketing portal, Tickify. Click the 'Register via Tickify' button on the site or the 'Official Ticketing Partner' link in the navigation."
  },
  {
    q: "When and where is the festival held?",
    a: "Carnaval Da Chittagong College takes place on December 18–19, 2026 at the Chittagong College heritage campus in Chawkbazar — the Main Gate, Academic Building, Parade Ground and Parade by Lane host the segments."
  },
  {
    q: "How can my organization become a sponsor?",
    a: "We offer Title, Power, Platinum, Gold and Co-Sponsor tiers with naming rights, banner visibility, stalls, social media recognition and more. Contact the Sponsorship Wing at carnavaldactgclg@gmail.com or +880 1776-810739 to request the full proposal."
  }
];
