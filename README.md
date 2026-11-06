# Casa Vellora — boutique hotel concept

A fictional boutique hotel website, built by [Vixon Lab](https://vixonlab.ro) as a portfolio piece. It shows how a small hospitality brand can feel premium online: full-bleed video, editorial typography and calm scroll motion, while staying fast on a phone.

**Live demo:** https://demo-boutique-hotel.vercel.app

## Pages
- **Home**: video hero, story, rooms, dining, experiences, gallery and a reservation block
- **Rooms**: suites with details and imagery
- **Contact**: reservation request form and location

## Stack
- Next.js 16 (App Router, fully static), React 19, TypeScript
- Tailwind CSS 4
- GSAP 3 + Lenis for scroll motion
- Stock footage and photos from Pexels (free licence), compressed for mobile

## Run locally
```bash
npm install
npm run dev
```
Media is already in `public/`. To download the raw clips again: `PEXELS_API_KEY=... node scripts/fetch-media.mjs`.

## Screenshots
Desktop and mobile captures are in [`docs/screenshots`](docs/screenshots).

Casa Vellora is not a real hotel. Names, prices and copy are placeholders.
