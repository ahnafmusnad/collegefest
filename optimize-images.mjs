/* One-shot image optimizer.
   - deletes unused + duplicate images
   - converts every PNG/JPG to WebP, max 1600px wide, aspect preserved
   - rewrites every reference in src/ so nothing breaks
   Safe to re-run: it skips files already converted. */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync, unlinkSync, existsSync, readdirSync } from 'fs';
import { join, relative, extname, basename } from 'path';


const IMG_DIR = 'public/images';
const SRC_DIRS = ['src'];
const MAX_WIDTH = 1600;


/* 1. Files to delete outright. Missing files are skipped silently,
      so this is safe whether or not you already deleted them by hand. */
const DELETE = [
  'banner-main.png',   // 6.6 MB, referenced nowhere in the codebase
  'crest_preview.png', // referenced nowhere
  'stone-1869.jpg',    // byte-identical duplicate of stone-tablet
  'stone-days.jpg',    // byte-identical duplicate of stone-tablet
  'stone-houses.jpg',  // byte-identical duplicate of stone-tablet
];


/* 2. The three deleted stone files were referenced by three CSS classes.
      Repoint those references at the single surviving image. */
const RENAME_MAP = {
  'stone-1869.jpg': 'stone-tablet.webp',
  'stone-days.jpg': 'stone-tablet.webp',
  'stone-houses.jpg': 'stone-tablet.webp',
};


function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}


/* ---------- PHASE A: delete ---------- */
console.log('\n=== DELETING ===');
let deletedBytes = 0;
for (const name of DELETE) {
  const p = join(IMG_DIR, name);
  if (existsSync(p)) {
    const sz = statSync(p).size;
    deletedBytes += sz;
    unlinkSync(p);
    console.log(`  removed ${name}  (${Math.round(sz / 1024)} KB)`);
  } else {
    console.log(`  already gone: ${name}`);
  }
}


/* ---------- PHASE B: convert ---------- */
console.log('\n=== CONVERTING ===');
const targets = walk(IMG_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
let beforeBytes = 0, afterBytes = 0;


for (const file of targets) {
  const orig = statSync(file).size;
  beforeBytes += orig;


  const out = file.slice(0, -extname(file).length) + '.webp';
  const meta = await sharp(file).metadata();
  /* Images with transparency (frames, crests, logos) get higher quality
     so edges do not get muddy. Opaque photos get 82. */
  const quality = meta.hasAlpha ? 90 : 82;


  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);


  const now = statSync(out).size;
  afterBytes += now;
  unlinkSync(file); // remove the original PNG/JPG
  console.log(
    `  ${relative(IMG_DIR, file).padEnd(44)} ${String(Math.round(orig / 1024)).padStart(6)} KB` +
    ` -> ${String(Math.round(now / 1024)).padStart(5)} KB  (q${quality}${meta.hasAlpha ? ', alpha' : ''})`
  );
}


/* ---------- PHASE C: rewrite references ---------- */
console.log('\n=== REWRITING REFERENCES ===');
const codeFiles = SRC_DIRS.flatMap(walk).filter((f) => /\.(tsx|ts|css)$/.test(f));
let edits = 0;
const touched = [];


for (const f of codeFiles) {
  let s = readFileSync(f, 'utf8');
  const original = s;
  let n = 0;


  /* C1: dedupe the three stone references onto the survivor */
  for (const [from, to] of Object.entries(RENAME_MAP)) {
    const c = s.split(from).length - 1;
    if (c) { s = s.split(from).join(to); n += c; }
  }


  /* C2: every remaining /images/....png|.jpg|.jpeg -> .webp */
  s = s.replace(/(\/images\/[A-Za-z0-9_\-./]+?)\.(png|jpe?g)\b/g, (m, base) => {
    n++;
    return base + '.webp';
  });


  if (s !== original) {
    writeFileSync(f, s);
    edits += n;
    touched.push(`  ${String(n).padStart(3)} edits  ${f}`);
  }
}
console.log(touched.join('\n') || '  none');


/* ---------- PHASE D: report ---------- */
/* totalBefore includes the deleted files, so the percentage is honest
   about the whole folder and not just the converted subset. */
const totalBefore = deletedBytes + beforeBytes;
const MB = (b) => (b / 1048576).toFixed(2);
console.log('\n=== RESULT ===');
console.log(`  deleted       : ${MB(deletedBytes)} MB  (unused + duplicate files)`);
console.log(`  converted     : ${MB(beforeBytes)} MB -> ${MB(afterBytes)} MB`);
console.log(`  TOTAL before  : ${MB(totalBefore)} MB`);
console.log(`  TOTAL after   : ${MB(afterBytes)} MB`);
if (totalBefore) {
  console.log(`  TOTAL saved   : ${(100 - (afterBytes / totalBefore) * 100).toFixed(1)}%`);
}
console.log(`  refs rewritten: ${edits}`);


/* ---------- PHASE E: safety check ---------- */
console.log('\n=== VERIFYING EVERY REFERENCE RESOLVES ===');
const refs = new Set();
for (const f of codeFiles) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\/images\/[A-Za-z0-9_\-./]+\.webp/g)) refs.add(m[0]);
}
let broken = 0;
for (const r of [...refs].sort()) {
  const p = join('public', r);
  if (!existsSync(p)) {
    /* Ignore example paths that only appear inside code comments. */
    const onlyInComment = codeFiles.every((f) => {
      const s = readFileSync(f, 'utf8');
      return s.split('\n').filter((l) => l.includes(r)).every((l) => /^\s*(\*|\/\*|\/\/)/.test(l));
    });
    if (onlyInComment) { console.log(`  (comment only, ignored) ${r}`); continue; }
    console.log(`  BROKEN -> ${r}`);
    broken++;
  }
}
console.log(broken === 0 ? '\n  ALL REFERENCES OK' : `\n  ${broken} BROKEN REFERENCE(S) - STOP AND REPORT`);
process.exit(broken === 0 ? 0 : 1);
