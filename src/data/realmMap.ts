import { PageType } from '../types';

/**
 * THE ROYAL MAP OF CARNAVAL
 * ------------------------------------------------------------------
 * Every entry of the site navigation is rendered as a realm / seat on
 * a hand-drawn Game-of-Thrones style map of the continent. Coordinates
 * are percentages of the map artwork (public/images/realm-map.webp).
 */

export interface RealmNode {
  page: PageType;
  /** Cartographic name shown on the map */
  name: string;
  /** In-world alias tying the fantasy seat to the real section */
  alias: string;
  /** Short flavour line shown in the cartouche */
  blurb: string;
  /** lucide icon key */
  icon: string;
  x: number;
  y: number;
  /** label offset from the pin, in % of the map plane */
  lx: number;
  ly: number;
  /** where the label text sits relative to the pin */
  anchor: 'left' | 'right' | 'top' | 'bottom';
  kind: 'land' | 'sea';
}

export const REALM_NODES: RealmNode[] = [
  {
    page: 'home',
    name: "King's Landing",
    alias: 'The Throne',
    blurb:
      'Seat of the Iron Throne. The grand citadel court where the Carnaval is proclaimed and every saga begins.',
    icon: 'Crown',
    x: 58.5,
    y: 39.5,
    lx: 0,
    ly: 9,
    anchor: 'bottom',
    kind: 'land',
  },
  {
    page: 'description',
    name: 'Oldtown',
    alias: 'The Fest',
    blurb:
      'The lighthouse city of the maesters. Here the chronicle is kept — the lore, the decrees and the two-day schedule.',
    icon: 'Scroll',
    x: 55.5,
    y: 78,
    lx: -2,
    ly: -11,
    anchor: 'top',
    kind: 'land',
  },
  {
    page: 'clubs',
    name: 'The Four Keeps',
    alias: 'The 4 Houses',
    blurb:
      'Winterfell, the lake-crag hold, the western rook and the garden seat — the four great houses that vie for glory.',
    icon: 'Shield',
    x: 20.5,
    y: 31,
    lx: 3.5,
    ly: -8,
    anchor: 'top',
    kind: 'land',
  },
  {
    page: 'segments',
    name: 'Ashford Meadow',
    alias: 'Tourneys',
    blurb:
      'The list-field of pavilions and banners where eight tourneys are contested — debate, science, letters and lens.',
    icon: 'Swords',
    x: 34,
    y: 47.5,
    lx: 0,
    ly: 9.5,
    anchor: 'bottom',
    kind: 'land',
  },
  {
    page: 'sponsorships',
    name: 'Braavos',
    alias: 'Iron Bank',
    blurb:
      'Across the narrow sea, the Iron Bank receives the realm’s patrons. Pledge gold dragons and your sigil flies here.',
    icon: 'Coins',
    x: 82,
    y: 14.5,
    lx: -1,
    ly: 11,
    anchor: 'bottom',
    kind: 'sea',
  },
  {
    page: 'organizers',
    name: 'Dragonstone',
    alias: 'Small Council',
    blurb:
      'The volcanic isle where the Small Council convenes — the stewards, guards and hands who run the Carnaval.',
    icon: 'Users',
    x: 89,
    y: 45,
    lx: -3,
    ly: -10,
    anchor: 'top',
    kind: 'sea',
  },
];

/** The four great house keeps that light up when "The 4 Houses" is selected. */
export const FOUR_KEEP_MARKERS: { x: number; y: number; house: string }[] = [
  { x: 30, y: 11.5, house: 'House of the North' },
  { x: 20.5, y: 31, house: 'House of the Lake' },
  { x: 12.5, y: 40, house: 'House of the West' },
  { x: 30, y: 65, house: 'House of the Gardens' },
];

/** Traveller roads & sea routes between the realms. */
export interface RealmRoad {
  a: PageType;
  b: PageType;
  kind: 'road' | 'sea';
  /** control point offset (in % of plane) bowing the path */
  cx: number;
  cy: number;
}

export const REALM_ROADS: RealmRoad[] = [
  { a: 'home', b: 'segments', kind: 'road', cx: 46, cy: 40 },
  { a: 'segments', b: 'clubs', kind: 'road', cx: 25, cy: 37 },
  { a: 'clubs', b: 'home', kind: 'road', cx: 40, cy: 22 },
  { a: 'segments', b: 'description', kind: 'road', cx: 41, cy: 63 },
  { a: 'description', b: 'home', kind: 'road', cx: 63, cy: 60 },
  { a: 'home', b: 'sponsorships', kind: 'sea', cx: 72, cy: 22 },
  { a: 'home', b: 'organizers', kind: 'sea', cx: 76, cy: 46 },
  { a: 'sponsorships', b: 'organizers', kind: 'sea', cx: 92, cy: 28 },
];

/** Intrinsic aspect ratio (w/h) of public/images/realm-map.webp */
export const MAP_ASPECT = 2000 / 1334;

export function nodeByPage(page: PageType): RealmNode {
  return REALM_NODES.find((n) => n.page === page) ?? REALM_NODES[0];
}

/** Quadratic path between two nodes through the road control point. */
export function roadPath(
  a: RealmNode,
  b: RealmNode,
  cx: number,
  cy: number
): string {
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}
