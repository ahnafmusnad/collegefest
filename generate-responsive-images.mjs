import sharp from 'sharp';
import { statSync, existsSync } from 'fs';
import { join } from 'path';

/* ============================================================
   RESPONSIVE IMAGE VARIANT GENERATOR (round 2)
   ------------------------------------------------------------
   Creates width-based variants for club logos and crest.
   Source files are never deleted.
   ============================================================ */

const TARGET_WIDTHS = [480, 800];

const TARGETS = [
  'public/images/college-crest.webp',
  'public/images/club-logos/ccds-debating-society.webp',
  'public/images/club-logos/ccpac-physics-astronomy.webp',
  'public/images/club-logos/ccps-photographic-society.webp',
  'public/images/club-logos/muses-english-literature.webp',
];

function webpNameFor(file, width) {
  const base = file.replace(/\.webp$/i, '');
  return `${base}.${width}.webp`;
}

async function main() {
  let generated = 0;
  let skipped = 0;

  console.log('=== GENERATING RESPONSIVE VARIANTS (round 2) ===\n');

  for (const src of TARGETS) {
    if (!existsSync(src)) {
      console.log(`  MISSING (skipped): ${src}`);
      continue;
    }

    const meta = await sharp(src).metadata();
    const origWidth = meta.width || 0;
    const origSize = statSync(src).size;

    for (const w of TARGET_WIDTHS) {
      if (w > origWidth) {
        continue; // don't upscale
      }

      const out = webpNameFor(src, w);
      if (existsSync(out)) {
        skipped++;
        continue;
      }

      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(out);

      const outSize = statSync(out).size;
      generated++;
      const rel = src.replace('public/', '');
      console.log(
        `  ${rel} -> ${w}w  (${Math.round(origSize / 1024)}KB -> ${Math.round(outSize / 1024)}KB)`
      );
    }
  }

  console.log(`\n=== RESULT ===\n  generated: ${generated} files\n  skipped  : ${skipped} (already exist)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
