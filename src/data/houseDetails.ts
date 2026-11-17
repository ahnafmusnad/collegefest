/* ============================================================
   HOUSE DETAILS — extra content for the Four Great Houses page.
   Keys MUST match the `id` of each house in festData.ts.
   ✏️ Replace every placeholder name / quote / photo with real ones.
   Photos live in /public/images/houses/<folder>/...
   If a photo is missing, the page shows a themed placeholder
   (or a monogram for people), so nothing ever looks broken.
   ============================================================ */



export interface HouseKeeper {
  /** Real name of the person */
  name: string;
  /** Real club post, e.g. "President, CCPAC" */
  role: string;
  /** Game-of-Thrones style title shown on the card frame */
  title: string;
  /** Photo path ('' = show monogram) */
  image: string;
  /** Optional short quote (shown only for the president) */
  quote?: string;
}



export interface HousePillar {
  title: string;
  text: string;
}



export interface HouseMoment {
  img: string;
  title: string;
  caption: string;
}



export interface HouseDetails {
  code: string;
  epithet: string;
  /** Overrides memberCount from festData.ts, e.g. "150+" */
  membersLabel?: string;
  foundingPurpose: string;
  pillars: HousePillar[];
  president: HouseKeeper;
  coreMembers: HouseKeeper[];
  moments: HouseMoment[];
}



export const HOUSE_DETAILS: Record<string, HouseDetails> = {
  /* ─────────────── HOUSE STARK · CCPAC ─────────────── */
  'house-arcanum': {
    code: 'CCPAC',
    epithet: 'Keepers of the Cold Stars',
    foundingPurpose:
      'CCPAC was founded in 2025 to give the young scientists of Chittagong College a home beyond the syllabus — a place to question how the universe works, to train seriously for Physics and Astronomy Olympiads, and to look up at the night sky together. Its founders wanted every curious student, not only the toppers, to have mentors, problem sets and a telescope within reach.',
    pillars: [
      {
        title: 'The Olympiad Forge',
        text: 'Regular problem-solving sessions and mock rounds that prepare members for national and international Physics and Astronomy Olympiads.'
      },
      {
        title: 'The Night Watch',
        text: 'Observation nights and sky-watching sessions where members learn to find planets, constellations and deep-sky wonders.'
      },
      {
        title: 'Workshops & Camps',
        text: 'Hands-on workshops, talks and camps that turn textbook physics into experiments, discussion and real research curiosity.'
      }
    ],
    /* ✏️ REPLACE NAMES + ADD PHOTOS */
    president: {
      name: 'President Name',
      role: 'President, CCPAC',
      title: 'Lord of Winterfell',
      image: '/images/houses/ccpac/president.webp',
      quote: 'The universe is the oldest book in the realm — we simply learn to read it together.'
    },
    coreMembers: [
      { name: 'Member Name', role: 'General Secretary', title: 'Maester of the Stars', image: '/images/houses/ccpac/member-1.webp' },
      { name: 'Member Name', role: 'Organizing Secretary', title: 'Warden of the North', image: '/images/houses/ccpac/member-2.webp' },
      { name: 'Member Name', role: 'Head, Olympiad Wing', title: 'First Ranger', image: '/images/houses/ccpac/member-3.webp' }
    ],
    moments: [
      { img: '/images/houses/ccpac/moment-1.webp', title: 'Vigil Under the Stars', caption: 'An observation night on the Citadel grounds.' },
      { img: '/images/houses/ccpac/moment-2.webp', title: 'The Olympiad Forge', caption: 'Members training for international Olympiads.' },
      { img: '/images/houses/ccpac/moment-3.webp', title: 'Hall of Experiments', caption: 'A hands-on physics workshop in session.' }
    ]
  },



  /* ─────────────── HOUSE TARGARYEN · THE MUSES ─────────────── */
  'house-melodia': {
    code: 'CCELLC',
    epithet: 'Keepers of the Dragon\'s Word',
    membersLabel: '150+',
    foundingPurpose:
      'The Muses was founded in 2025 to give Chittagong College\'s writers, readers and speakers a stage of their own. The club exists to build creativity and confidence in English — through writing, literature, public speaking and culture — so that students can carry their voice from the classroom to national platforms and beyond.',
    pillars: [
      {
        title: 'The Writing Hall',
        text: 'Creative-writing workshops, story and essay competitions, and literary evenings that sharpen every member\'s pen.'
      },
      {
        title: 'The Speaker\'s Stage',
        text: 'Public-speaking practice, Olympiad preparation and national speech representation that turn shy voices into confident ones.'
      },
      {
        title: 'Culture & Alliances',
        text: 'Cultural programmes and academic collaborations — including a session with Memorial University of Newfoundland, Canada.'
      }
    ],
    /* ✏️ REPLACE NAMES + ADD PHOTOS */
    president: {
      name: 'President Name',
      role: 'President, The Muses',
      title: 'Dragonlord of the Muses',
      image: '/images/houses/muses/president.webp',
      quote: 'A single well-chosen word can set a whole hall on fire.'
    },
    coreMembers: [
      { name: 'Member Name', role: 'Vice President', title: 'Hand of the Queen', image: '/images/houses/muses/member-1.webp' },
      { name: 'Member Name', role: 'General Secretary', title: 'Master of Scrolls', image: '/images/houses/muses/member-2.webp' },
      { name: 'Member Name', role: 'Head, Cultural Wing', title: 'Keeper of the Flame', image: '/images/houses/muses/member-3.webp' }
    ],
    moments: [
      { img: '/images/houses/muses/moment-1.webp', title: 'Keepers of the Word', caption: 'A literary evening of readings and recitations.' },
      { img: '/images/houses/muses/moment-2.webp', title: 'The Annual Fest', caption: '300+ participants, staged before the Principal.' },
      { img: '/images/houses/muses/moment-3.webp', title: 'Voices Across the Sea', caption: 'The session with Memorial University, Canada.' }
    ]
  },



  /* ─────────────── HOUSE LANNISTER · CCDS ─────────────── */
  'house-veritas': {
    code: 'CCDS',
    epithet: 'The Silver Tongues of Casterly Rock',
    foundingPurpose:
      'The Chittagong College Debating Society exists to build a culture of argument and inquiry on campus. It was raised to train students to think critically, research deeply and speak with clarity — and to carry the Citadel\'s name into national tournaments, standing shoulder to shoulder with the country\'s most established institutions.',
    pillars: [
      {
        title: 'Parliamentary Battle',
        text: 'Regular practice debates in national tournament formats, where motions are argued, rebutted and judged.'
      },
      {
        title: 'Research & Case-Building',
        text: 'Sessions on reading the world — current affairs, policy and logic — so every argument is backed by evidence.'
      },
      {
        title: 'Training the Next Banner',
        text: 'Mentoring juniors, adjudication practice and internal tournaments that keep the society\'s gold flowing to new hands.'
      }
    ],
    /* ✏️ REPLACE NAMES + ADD PHOTOS */
    president: {
      name: 'President Name',
      role: 'President, CCDS',
      title: 'Lord of Casterly Rock',
      image: '/images/houses/ccds/president.webp',
      quote: 'Every argument is a debt — and we always pay it in full.'
    },
    coreMembers: [
      { name: 'Member Name', role: 'Vice President', title: 'Hand of the Lion', image: '/images/houses/ccds/member-1.webp' },
      { name: 'Member Name', role: 'General Secretary', title: 'Master of Motions', image: '/images/houses/ccds/member-2.webp' },
      { name: 'Member Name', role: 'Head, Training Wing', title: 'Keeper of the Gold', image: '/images/houses/ccds/member-3.webp' }
    ],
    moments: [
      { img: '/images/houses/ccds/moment-1.webp', title: 'The War of Words', caption: 'CCDS debaters at a national tournament.' },
      { img: '/images/houses/ccds/moment-2.webp', title: 'Crowned Champions', caption: 'Lifting the trophy at the CUSD Nationals 2026.' },
      { img: '/images/houses/ccds/moment-3.webp', title: 'The Training Hall', caption: 'An internal practice round on campus.' }
    ]
  },



  /* ─────────────── HOUSE BARATHEON · CCPS ─────────────── */
  'house-valorous': {
    code: 'CCPS',
    epithet: 'The Storm Behind the Lens',
    foundingPurpose:
      'Established in 2026, the Chittagong College Photographic Society was born to give the campus\'s photographers a shared lens. It brings enthusiasts together to learn, compete and document college life — championing creative freedom alongside academic excellence, and making sure the Citadel\'s finest moments are captured and remembered.',
    pillars: [
      {
        title: 'Trials of Light',
        text: 'Online contests like Capture the Campus, plus weekly and monthly member-exclusive contests with expert judges and prizes.'
      },
      {
        title: 'Photo Walks & Sessions',
        text: 'Offline sessions and campus photo walks where members learn composition, light and storytelling in the field.'
      },
      {
        title: 'The Campus Archive',
        text: 'Members\' work featured in college archives and on social media, preserving the story of the Citadel frame by frame.'
      }
    ],
    /* ✏️ REPLACE NAMES + ADD PHOTOS */
    president: {
      name: 'President Name',
      role: 'President, CCPS',
      title: 'Lord of Storm\'s End',
      image: '/images/houses/ccps/president.webp',
      quote: 'Ours is the fury — and the patience to wait for the perfect light.'
    },
    coreMembers: [
      { name: 'Member Name', role: 'Vice President', title: 'Master of Light', image: '/images/houses/ccps/member-1.webp' },
      { name: 'Member Name', role: 'General Secretary', title: 'Keeper of the Archive', image: '/images/houses/ccps/member-2.webp' },
      { name: 'Member Name', role: 'Head, Contests Wing', title: 'Herald of the Stag', image: '/images/houses/ccps/member-3.webp' }
    ],
    moments: [
      { img: '/images/houses/ccps/moment-1.webp', title: 'Capture the Campus', caption: '200+ participants and 50+ expressive entries.' },
      { img: '/images/houses/ccps/moment-2.webp', title: 'The Winter Lens', caption: 'A campus photo walk through the Citadel.' },
      { img: '/images/houses/ccps/moment-3.webp', title: 'Monthly Trials', caption: 'Judging night of a monthly photography contest.' }
    ]
  }
};