/**
 * One-off: shrink oversized source photos in public/photos.
 * next/image optimizes delivery, but multi-MB originals bloat the repo and
 * every cold build. Run with: node scripts/compress-images.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/photos";
const MAX_WIDTH = 2200;
const THRESHOLD = 400 * 1024; // only touch files over 400 KB

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const files = walk(ROOT).filter((f) => /\.(jpe?g|png)$/i.test(f));
console.log(`scanning ${files.length} images…`);

let saved = 0;
for (const f of files) {
  const before = fs.statSync(f).size;
  if (before < THRESHOLD) continue;

  const tmp = f + ".tmp";
  const pipeline = sharp(f).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (/\.png$/i.test(f)) {
    await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(tmp);
  }

  const after = fs.statSync(tmp).size;
  if (after < before) {
    fs.renameSync(tmp, f);
    saved += before - after;
    console.log(
      `${f.padEnd(42)} ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`
    );
  } else {
    fs.unlinkSync(tmp);
  }
}
console.log(`--- saved ${(saved / 1048576).toFixed(1)} MB ---`);
