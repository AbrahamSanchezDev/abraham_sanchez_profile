// Converts raw media in projects_info/<slug>/ into web-friendly files in public/projects/<slug>/.
// GIF -> animated WebP + "-poster.webp" still frame. PNG/JPG -> WebP. Skips files already up to date.
// Run: npm run media
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "projects_info";
const OUT = "public/projects";

for (const slug of fs.readdirSync(SRC)) {
  const dir = path.join(SRC, slug);
  if (!fs.existsSync(path.join(dir, "project.json"))) continue;
  const outDir = path.join(OUT, slug);
  fs.mkdirSync(outDir, { recursive: true });

  for (const file of fs.readdirSync(dir)) {
    const ext = path.extname(file).toLowerCase();
    if (![".gif", ".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    const src = path.join(dir, file);
    const name = path.basename(file, path.extname(file));
    const out = path.join(outDir, `${name}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;

    const resize = { width: 960, withoutEnlargement: true };
    if (ext === ".gif") {
      await sharp(src, { animated: true }).resize(resize).webp({ quality: 55, effort: 4 }).toFile(out);
      await sharp(src).resize(resize).webp({ quality: 75 }).toFile(path.join(outDir, `${name}-poster.webp`));
    } else {
      await sharp(src).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    }
    console.log(`${slug}/${file} -> ${(fs.statSync(out).size / 1e6).toFixed(1)} MB`);
  }
}
