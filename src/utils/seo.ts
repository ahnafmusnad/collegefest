import { PageType, ClubHouse, Segment } from '../types';

export interface PageSeoMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
  breadcrumbName: string;
  ogType?: 'website' | 'article';
}

export const SITE_SEO_DEFAULTS = {
  siteName: 'Carnaval da Chittagong College',
  shortName: 'CDCC Fest 2026',
  siteUrl: 'https://carnvaldacc.site',
  defaultImage: '/images/hero-castle.webp',
  defaultImageAlt: 'Carnaval da Chittagong College — The Red Citadel under a winter sky',
  locale: 'en_US',
  alternateLocale: 'bn_BD',
  winterThemeColor: '#020a0b',
  goldThemeColor: '#0e0a04',
} as const;

export const PAGE_SEO_CONFIG: Record<PageType, PageSeoMeta> = {
  home: {
    path: '/',
    title: 'Carnaval da Chittagong College 2026 | National Winter Fest | CDCC',
    description:
      'Carnaval da Chittagong College (CDCC) — the grand national winter festival on December 25–26, 2026 at Chittagong College Heritage Campus. Compete across 15 segments in Debate, Physics, English, Photography & Culture hosted by the Four Great Houses (CCPAC, CCELLC, CCDS, CCPS) for a 150,000+ BDT prize pool.',
    keywords:
      'Carnaval da Chittagong College, CDCC, CDCC Fest 2026, Chittagong College Fest, Chittagong College Winter Fest, Chittagong College, CCPAC, CCELLC, The Muses, CCDS, CCPS, National Debate Fest, Physics Olympiad Bangladesh, English Olympiad, Photography Contest Chattogram, College Festival Bangladesh',
    image: '/images/iron-throne-hero.webp',
    imageAlt: 'The Iron Throne Room — Carnaval da Chittagong College 2026',
    breadcrumbName: 'Home',
  },
  description: {
    path: '/description',
    title: 'Fest Chronicle, Schedule & Campus Map | Carnaval da Chittagong College 2026',
    description:
      'Explore the official two-day event schedule (December 25–26, 2026), heritage campus venue map, festival lore, and FAQs for Carnaval da Chittagong College at Chawkbazar, Chattogram.',
    keywords:
      'CDCC Schedule, Carnaval da Chittagong College Dates, Chittagong College Campus Map, December 25 26 2026 Fest, Chawkbazar Chittagong College Event, Parade Ground Chittagong College, CDCC FAQ',
    image: '/images/hero-castle.webp',
    imageAlt: 'The Red Citadel of Chittagong College under a winter storm',
    breadcrumbName: 'The Citadel Chronicle',
  },
  clubs: {
    path: '/clubs',
    title: 'The Four Great Houses — CCPAC, CCELLC, CCDS & CCPS | Carnaval da Chittagong College',
    description:
      'Meet the Four Great Houses co-hosting Carnaval da Chittagong College: Physics & Astronomy Club (CCPAC — House Stark), English Language & Literature Club The Muses (CCELLC — House Targaryen), Debating Society (CCDS — House Lannister), and Photographic Society (CCPS — House Baratheon).',
    keywords:
      'Chittagong College Clubs, CCPAC, Chittagong College Physics and Astronomy Club, CCELLC, The Muses Chittagong College, CCDS, Chittagong College Debating Society, CCPS, Chittagong College Photographic Society, Four Great Houses CDCC',
    image: '/images/four-houses-heraldry.webp',
    imageAlt: 'Heraldry of the Four Great Houses of Chittagong College',
    breadcrumbName: 'The Four Great Houses',
  },
  segments: {
    path: '/segments',
    title: '15 Competition Segments & Rulebooks | Carnaval da Chittagong College 2026',
    description:
      'Browse all 15 national competition segments at Carnaval da Chittagong College: National Debate Fest, Team Physics Auction, Physics Olympiad, English Olympiad, Team Quiz, Macro Photography, Treasure Hunt, Colour Hunt, Scientific Article Writing, Story Writing, Academic Meme & more.',
    keywords:
      'CDCC Segments, National Debate Fest Chittagong College, Team Physics Auction, Physics Olympiad 2026, English Olympiad 2026, Macro Photography Contest, Treasure Hunt, Colour Hunt, Scientific Article Writing, Academic Meme Contest',
    image: '/images/tour.webp',
    imageAlt: 'The Tournament Arenas of Carnaval da Chittagong College',
    breadcrumbName: 'The Tournament Arenas',
  },
  sponsorships: {
    path: '/sponsorships',
    title: 'Sponsorship Tiers & Brand Partnerships | Carnaval da Chittagong College 2026',
    description:
      'Partner with Carnaval da Chittagong College 2026. Explore Title, Platinum, and Gold sponsorship tiers reaching 1,000+ on-campus participants from 25+ institutions and 1,000,000+ digital impressions.',
    keywords:
      'CDCC Sponsorship, Sponsor Chittagong College Fest, Event Sponsorship Bangladesh, College Festival Brand Partnership Chattogram, Iron Bank CDCC',
    image: '/images/college-winter-citadel.webp',
    imageAlt: 'The Iron Bank Vault — Sponsorships at Carnaval da Chittagong College',
    breadcrumbName: 'Sponsorships & Partners',
  },
  organizers: {
    path: '/organizers',
    title: 'The Small Council & Organizing Committee | Carnaval da Chittagong College 2026',
    description:
      'Meet the Small Council, Chief Patron Prof. Mohammad Mozahidul Islam Chowdhury (Principal, Chittagong College), club presidents, convenors, and the 120+ student volunteer corps behind Carnaval da Chittagong College.',
    keywords:
      'CDCC Organizers, Chittagong College Principal, Small Council CDCC, Carnaval da Chittagong College Committee, Chittagong College Student Leaders',
    image: '/images/small-council-chamber.webp',
    imageAlt: 'The Small Council Chamber — Organizers of Carnaval da Chittagong College',
    breadcrumbName: 'Organizers & Small Council',
  },
};

function setMetaByName(name: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalLink(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_SEO_DEFAULTS.siteUrl}${normalizedPath}`;
}

export interface ApplySeoOptions {
  page: PageType;
  activeHouse?: ClubHouse | null;
  activeSegment?: Segment | null;
  goldTheme?: boolean;
}

export function applyPageSeo({
  page,
  activeHouse,
  activeSegment,
  goldTheme = false,
}: ApplySeoOptions): void {
  if (typeof document === 'undefined') return;

  const baseMeta = PAGE_SEO_CONFIG[page] ?? PAGE_SEO_CONFIG.home;
  let title = baseMeta.title;
  let description = baseMeta.description;
  let keywords = baseMeta.keywords;
  let image = baseMeta.image;
  let imageAlt = baseMeta.imageAlt;

  if (activeSegment) {
    title = `${activeSegment.title} (${activeSegment.gotTitle}) — Rules & Registration | CDCC 2026`;
    description = `${activeSegment.description} Category: ${activeSegment.category}. Format: ${activeSegment.teamSize}. Prize Pool: ${activeSegment.prizePool}. Date: ${activeSegment.date} at ${activeSegment.venue}.`;
    keywords = `${activeSegment.title}, ${activeSegment.gotTitle}, ${activeSegment.category}, ${activeSegment.tags.join(', ')}, ${baseMeta.keywords}`;
  } else if (activeHouse) {
    title = `${activeHouse.shortName} (${activeHouse.houseName}) | Carnaval da Chittagong College`;
    description = `${activeHouse.name} — ${activeHouse.houseName} ("${activeHouse.motto}"). ${activeHouse.lore}`;
    keywords = `${activeHouse.name}, ${activeHouse.shortName}, ${activeHouse.houseName}, ${activeHouse.motto}, ${baseMeta.keywords}`;
    image = activeHouse.logo || baseMeta.image;
    imageAlt = `${activeHouse.name} (${activeHouse.houseName}) official crest`;
  }

  const canonicalUrl = toAbsoluteUrl(baseMeta.path);
  const absoluteImageUrl = toAbsoluteUrl(image);
  const themeColor = goldTheme
    ? SITE_SEO_DEFAULTS.goldThemeColor
    : SITE_SEO_DEFAULTS.winterThemeColor;

  // Document title
  document.title = title;

  // Standard SEO meta tags
  setMetaByName('title', title);
  setMetaByName('description', description);
  setMetaByName('keywords', keywords);
  setMetaByName('theme-color', themeColor);

  // Canonical link
  setCanonicalLink(canonicalUrl);

  // Open Graph meta tags
  setMetaByProperty('og:type', baseMeta.ogType ?? 'website');
  setMetaByProperty('og:site_name', SITE_SEO_DEFAULTS.siteName);
  setMetaByProperty('og:locale', SITE_SEO_DEFAULTS.locale);
  setMetaByProperty('og:locale:alternate', SITE_SEO_DEFAULTS.alternateLocale);
  setMetaByProperty('og:url', canonicalUrl);
  setMetaByProperty('og:title', title);
  setMetaByProperty('og:description', description);
  setMetaByProperty('og:image', absoluteImageUrl);
  setMetaByProperty('og:image:secure_url', absoluteImageUrl);
  setMetaByProperty('og:image:alt', imageAlt);

  // Twitter / X Card meta tags
  setMetaByName('twitter:card', 'summary_large_image');
  setMetaByName('twitter:url', canonicalUrl);
  setMetaByName('twitter:title', title);
  setMetaByName('twitter:description', description);
  setMetaByName('twitter:image', absoluteImageUrl);
  setMetaByName('twitter:image:alt', imageAlt);

  // Dynamic BreadcrumbList + WebPage JSON-LD structured data for the current view
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: toAbsoluteUrl('/'),
    },
  ];

  if (page !== 'home') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: baseMeta.breadcrumbName,
      item: canonicalUrl,
    });
  }

  const dynamicSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: 'en',
        isPartOf: {
          '@id': `${toAbsoluteUrl('/')}#website`,
        },
        about: {
          '@id': `${toAbsoluteUrl('/')}#event`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteImageUrl,
          caption: imageAlt,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };

  let scriptEl = document.head.querySelector<HTMLScriptElement>('#dynamic-seo-jsonld');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'dynamic-seo-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(dynamicSchema);
}
