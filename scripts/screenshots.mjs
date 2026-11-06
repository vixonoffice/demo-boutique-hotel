// Captures README screenshots (desktop + mobile) and reports console errors.
// Usage: BASE_URL=http://localhost:3000 node scripts/screenshots.mjs
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = path.resolve(import.meta.dirname, "../docs/screenshots");
fs.mkdirSync(out, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return chromium.launch({ channel: "chrome" });
  }
};

const shots = [
  { page: "/", name: "home-hero", y: 0, wait: 2400 },
  { page: "/", name: "home-story", sel: "#story", wait: 1800 },
  { page: "/", name: "home-rooms", sel: "#rooms", offset: 140, wait: 2200 },
  { page: "/", name: "home-experiences", sel: "[data-exp]", progress: 0.45, wait: 1600 },
  { page: "/", name: "home-dining", sel: "#dining", wait: 2000 },
  { page: "/", name: "home-gallery", sel: "#gallery", offset: 140, wait: 2200 },
  { page: "/", name: "home-reserve", sel: "#reserve", wait: 2200 },
  { page: "/rooms", name: "rooms", y: 0, wait: 2400 },
  { page: "/contact", name: "contact", y: 0, wait: 2400 },
];

const errors = [];
const browser = await launch();

for (const [label, ctxOpts] of [
  ["desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ["mobile", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push(`[${label}] ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`[${label}] pageerror ${e.message}`));

  let current = "";
  for (const s of shots) {
    if (s.page !== current) {
      await page.goto(base + s.page, { waitUntil: "load" });
      await page.waitForTimeout(1800);
      // scroll through once so lazy media and reveals are primed
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 700) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
      current = s.page;
    }
    await page.evaluate(
      ({ sel, y, offset, progress }) => {
        if (sel) {
          const el = document.querySelector(sel);
          const top = el.getBoundingClientRect().top + window.scrollY;
          let target = top - (offset ?? 0);
          if (progress != null) target = top + progress * (window.innerWidth > 767 ? 3200 : 0);
          window.scrollTo(0, target);
        } else {
          window.scrollTo(0, y ?? 0);
        }
      },
      { sel: s.sel, y: s.y, offset: s.offset, progress: s.progress },
    );
    await page.waitForTimeout(s.wait);
    await page.screenshot({ path: path.join(out, `${s.name}-${label}.jpg`), type: "jpeg", quality: 78 });
    console.log("shot", `${s.name}-${label}`);
  }
  await ctx.close();
}

await browser.close();
if (errors.length) {
  console.log("\nCONSOLE ERRORS:");
  errors.forEach((e) => console.log(" ", e));
} else {
  console.log("\nNo console errors.");
}
