import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://carnavaldacc.site";

interface RouteSeoSpec {
  route: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
}

const SUBROUTE_SEO: RouteSeoSpec[] = [
  {
    route: "description",
    title: "Fest Chronicle, Schedule & Campus Map | Carnaval da Chittagong College 2026",
    description:
      "Explore the official two-day event schedule (December 25–26, 2026), heritage campus venue map, festival lore, and FAQs for Carnaval da Chittagong College at Chawkbazar, Chattogram.",
    keywords:
      "CDCC Schedule, Carnaval da Chittagong College Dates, Chittagong College Campus Map, December 25 26 2026 Fest, Chawkbazar Chittagong College Event, Parade Ground Chittagong College, CDCC FAQ",
    image: "/images/hero-castle.webp",
    imageAlt: "The Red Citadel of Chittagong College under a winter storm",
  },
  {
    route: "clubs",
    title:
      "Chittagong College Clubs — CCPAC, CCELLC (The Muses), CCDS & CCPS | Carnaval da Chittagong College",
    description:
      "Official page of the Four Great Clubs of Chittagong College hosting Carnaval da Chittagong College: Chittagong College Physics & Astronomy Club (CCPAC), Chittagong College English Language & Literature Club — The Muses (CCELLC), Chittagong College Debating Society (CCDS), and Chittagong College Photographic Society (CCPS). Explore club lore, achievements, leadership & events.",
    keywords:
      "Chittagong College Clubs, Chittagong College Physics and Astronomy Club, CCPAC, Chittagong College English Language and Literature Club, The Muses Chittagong College, CCELLC, Chittagong College Debating Society, CCDS, Chittagong College Photographic Society, CCPS, Chittagong College Student Organizations, Four Great Houses CDCC",
    image: "/images/four-houses-heraldry.webp",
    imageAlt: "The Four Great Clubs of Chittagong College — CCPAC, CCELLC, CCDS & CCPS",
  },
  {
    route: "segments",
    title: "15 Competition Segments & Rulebooks | Carnaval da Chittagong College 2026",
    description:
      "Browse all 15 national competition segments at Carnaval da Chittagong College: National Debate Fest, Team Physics Auction, Physics Olympiad, English Olympiad, Team Quiz, Macro Photography, Treasure Hunt, Colour Hunt, Scientific Article Writing, Story Writing, Academic Meme & more.",
    keywords:
      "CDCC Segments, National Debate Fest Chittagong College, Team Physics Auction, Physics Olympiad 2026, English Olympiad 2026, Macro Photography Contest, Treasure Hunt, Colour Hunt, Scientific Article Writing, Academic Meme Contest",
    image: "/images/tour.webp",
    imageAlt: "The Tournament Arenas of Carnaval da Chittagong College",
  },
  {
    route: "sponsorships",
    title: "Sponsorship Tiers & Brand Partnerships | Carnaval da Chittagong College 2026",
    description:
      "Partner with Carnaval da Chittagong College 2026. Explore Title, Platinum, and Gold sponsorship tiers reaching 1,000+ on-campus participants from 25+ institutions and 1,000,000+ digital impressions.",
    keywords:
      "CDCC Sponsorship, Sponsor Chittagong College Fest, Event Sponsorship Bangladesh, College Festival Brand Partnership Chattogram, Iron Bank CDCC",
    image: "/images/college-winter-citadel.webp",
    imageAlt: "The Iron Bank Vault — Sponsorships at Carnaval da Chittagong College",
  },
  {
    route: "organizers",
    title: "The Small Council & Organizing Committee | Carnaval da Chittagong College 2026",
    description:
      "Meet the Small Council, Chief Patron Prof. Mohammad Mozahidul Islam Chowdhury (Principal, Chittagong College), club presidents, convenors, and the 120+ student volunteer corps behind Carnaval da Chittagong College.",
    keywords:
      "CDCC Organizers, Chittagong College Principal, Small Council CDCC, Carnaval da Chittagong College Committee, Chittagong College Student Leaders",
    image: "/images/small-council-chamber.webp",
    imageAlt: "The Small Council Chamber — Organizers of Carnaval da Chittagong College",
  },
];

const escapeHtmlAttr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function generateRouteStaticHtmlPlugin(): Plugin {
  return {
    name: "generate-route-static-html",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const baseIndexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(baseIndexPath)) return;

      const baseHtml = fs.readFileSync(baseIndexPath, "utf8");

      for (const spec of SUBROUTE_SEO) {
        const canonicalUrl = `${SITE_URL}/${spec.route}`;
        const imageUrl = `${SITE_URL}${spec.image}`;
        const safeTitle = escapeHtmlAttr(spec.title);
        const safeDesc = escapeHtmlAttr(spec.description);
        const safeKeywords = escapeHtmlAttr(spec.keywords);
        const safeImageAlt = escapeHtmlAttr(spec.imageAlt);

        let routeHtml = baseHtml
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
          .replace(
            /<meta name="title" content="[^"]*"\s*\/?>/,
            `<meta name="title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${safeDesc}" />`
          )
          .replace(
            /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
            `<meta name="keywords" content="${safeKeywords}" />`
          )
          .replace(
            /<link rel="canonical" href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${canonicalUrl}" />`
          )
          .replace(
            /<meta property="og:url" content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${canonicalUrl}" />`
          )
          .replace(
            /<meta property="og:title" content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${safeDesc}" />`
          )
          .replace(
            /<meta property="og:image" content="[^"]*"\s*\/?>/,
            `<meta property="og:image" content="${imageUrl}" />`
          )
          .replace(
            /<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/,
            `<meta property="og:image:secure_url" content="${imageUrl}" />`
          )
          .replace(
            /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
            `<meta property="og:image:alt" content="${safeImageAlt}" />`
          )
          .replace(
            /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:url" content="${canonicalUrl}" />`
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:title" content="${safeTitle}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="twitter:description" content="${safeDesc}" />`
          )
          .replace(
            /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:image" content="${imageUrl}" />`
          )
          .replace(
            /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:image:alt" content="${safeImageAlt}" />`
          );

        const routeDir = path.join(distDir, spec.route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf8");
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), generateRouteStaticHtmlPlugin()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
    port: 5173,
    host: "0.0.0.0",
  },
});
