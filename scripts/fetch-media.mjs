// Downloads and optimises the Pexels media used by the site.
// Usage: PEXELS_API_KEY=... node scripts/fetch-media.mjs
// Sources are cached in .media-src/ (gitignored). Outputs:
//   public/media/video/*.mp4          (720p, no audio, faststart, versioned names)
//   src/assets/posters/*.webp         (video posters)
//   src/assets/photos/*.webp          (photos, imported statically by the components)
//   src/data/media-credits.json       (author + Pexels link for every asset)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const key = process.env.PEXELS_API_KEY;
if (!key) throw new Error("PEXELS_API_KEY is required");
const root = path.resolve(import.meta.dirname, "..");
const dirs = {
  src: path.join(root, ".media-src"),
  video: path.join(root, "public/media/video"),
  poster: path.join(root, "src/assets/posters"),
  photo: path.join(root, "src/assets/photos"),
};
Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

// name -> [pexels id, start (s), duration (s), maxrate (kbit/s)]
const videos = {
  "hero-cliff-v1": [26057993, 1, 12, 1300],
  "rooms-linen-v1": [10608105, 3, 10, 1500],
  "contact-sunset-v1": [36024161, 2, 10, 1400],
  "dining-plates-v1": [19049694, Number(process.env.DINING_START ?? 6), 10, 1500],
  "coves-sailboat-v1": [17027765, 1, 11, 1400],
  "pool-horizon-v1": [8514931, 2, 10, 1400],
};

// name -> pexels photo id
const photos = {
  "room-faro-v1": 10611843,
  "room-cala-v1": 31817153,
  "room-olivo-v1": 12277300,
  "room-pietra-v1": 2134224,
  "room-alba-v1": 37098141,
  "room-brezza-v1": 24807137,
  "table-fish-v1": 36563571,
  "table-shrimp-v1": 28052916,
  "table-wine-v1": 5490196,
  "table-bar-v1": 25358051,
  "sea-cove-v1": 28536753,
  "sea-dusk-v1": 16832021,
  "sea-pool-v1": 29702293,
  "sea-cove-wide-v1": 8633909,
  "land-spa-v1": 1926811,
  "land-olive-v1": 14515702,
  "land-grove-v1": 38928225,
  "land-village-v1": 9111683,
};

const credits = {};
const api = async (url) => {
  const r = await fetch(url, { headers: { Authorization: key } });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
};
const download = async (url, file) => {
  if (fs.existsSync(file)) return;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
};

for (const [name, [id, ss, dur, maxrate]] of Object.entries(videos)) {
  const meta = await api(`https://api.pexels.com/videos/videos/${id}`);
  const files = meta.video_files.filter((f) => f.file_type === "video/mp4" && f.width >= 1280 && f.width <= 2000);
  const pick = files.sort((a, b) => a.width - b.width)[0] ?? meta.video_files.sort((a, b) => b.width - a.width)[0];
  const raw = path.join(dirs.src, `v-${id}.mp4`);
  await download(pick.link, raw);
  const out = path.join(dirs.video, `${name}.mp4`);
  const ff = spawnSync("ffmpeg", [
    "-y", "-ss", String(ss), "-i", raw, "-t", String(dur),
    "-vf", "scale=1280:-2,fps=25", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "29",
    "-maxrate", `${maxrate}k`, "-bufsize", `${maxrate * 2}k`, "-pix_fmt", "yuv420p", "-movflags", "+faststart", out,
  ], { stdio: "pipe" });
  if (ff.status !== 0) throw new Error(ff.stderr.toString());
  const frame = path.join(dirs.src, `${name}.png`);
  const fr = spawnSync("ffmpeg", ["-y", "-ss", String(Math.min(1.2, dur / 2)), "-i", out, "-frames:v", "1", frame], { stdio: "pipe" });
  if (fr.status !== 0) throw new Error(fr.stderr.toString());
  await sharp(frame).resize({ width: 1280 }).webp({ quality: 68 }).toFile(path.join(dirs.poster, `${name.replace("-v1", "")}-poster-v1.webp`));
  credits[name] = { type: "video", id, author: meta.user.name, authorUrl: meta.user.url, url: meta.url };
  console.log(name, (fs.statSync(out).size / 1048576).toFixed(2), "MB");
}

for (const [name, id] of Object.entries(photos)) {
  const meta = await api(`https://api.pexels.com/v1/photos/${id}`);
  const raw = path.join(dirs.src, `p-${id}.jpg`);
  await download(meta.src.large2x, raw);
  await sharp(raw).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(dirs.photo, `${name}.webp`));
  credits[name] = { type: "photo", id, author: meta.photographer, authorUrl: meta.photographer_url, url: meta.url };
}

fs.mkdirSync(path.join(root, "src/data"), { recursive: true });
fs.writeFileSync(path.join(root, "src/data/media-credits.json"), JSON.stringify(credits, null, 2));
console.log("done", Object.keys(credits).length, "assets");
