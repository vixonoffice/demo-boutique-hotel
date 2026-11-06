import type { StaticImageData } from "next/image";

import roomFaro from "@/assets/photos/room-faro-v1.webp";
import roomCala from "@/assets/photos/room-cala-v1.webp";
import roomOlivo from "@/assets/photos/room-olivo-v1.webp";
import roomPietra from "@/assets/photos/room-pietra-v1.webp";
import roomAlba from "@/assets/photos/room-alba-v1.webp";
import roomBrezza from "@/assets/photos/room-brezza-v1.webp";
import tableFish from "@/assets/photos/table-fish-v1.webp";
import tableShrimp from "@/assets/photos/table-shrimp-v1.webp";
import tableWine from "@/assets/photos/table-wine-v1.webp";
import tableBar from "@/assets/photos/table-bar-v1.webp";
import seaCove from "@/assets/photos/sea-cove-v1.webp";
import seaDusk from "@/assets/photos/sea-dusk-v1.webp";
import seaPool from "@/assets/photos/sea-pool-v1.webp";
import seaCoveWide from "@/assets/photos/sea-cove-wide-v1.webp";
import landSpa from "@/assets/photos/land-spa-v1.webp";
import landOlive from "@/assets/photos/land-olive-v1.webp";
import landGrove from "@/assets/photos/land-grove-v1.webp";
import landVillage from "@/assets/photos/land-village-v1.webp";

import posterHero from "@/assets/posters/hero-cliff-poster-v1.webp";
import posterLinen from "@/assets/posters/rooms-linen-poster-v1.webp";
import posterDining from "@/assets/posters/dining-plates-poster-v1.webp";
import posterCoves from "@/assets/posters/coves-sailboat-poster-v1.webp";
import posterPool from "@/assets/posters/pool-horizon-poster-v1.webp";
import posterSunset from "@/assets/posters/contact-sunset-poster-v1.webp";

export const photos = {
  "room-faro-v1": roomFaro,
  "room-cala-v1": roomCala,
  "room-olivo-v1": roomOlivo,
  "room-pietra-v1": roomPietra,
  "room-alba-v1": roomAlba,
  "room-brezza-v1": roomBrezza,
  "table-fish-v1": tableFish,
  "table-shrimp-v1": tableShrimp,
  "table-wine-v1": tableWine,
  "table-bar-v1": tableBar,
  "sea-cove-v1": seaCove,
  "sea-dusk-v1": seaDusk,
  "sea-pool-v1": seaPool,
  "sea-cove-wide-v1": seaCoveWide,
  "land-spa-v1": landSpa,
  "land-olive-v1": landOlive,
  "land-grove-v1": landGrove,
  "land-village-v1": landVillage,
} satisfies Record<string, StaticImageData>;

export type PhotoKey = keyof typeof photos;

export type VideoKey =
  | "hero-cliff-v1"
  | "rooms-linen-v1"
  | "dining-plates-v1"
  | "coves-sailboat-v1"
  | "pool-horizon-v1"
  | "contact-sunset-v1";

export const videos: Record<VideoKey, { src: string; poster: StaticImageData }> = {
  "hero-cliff-v1": { src: "/media/video/hero-cliff-v1.mp4", poster: posterHero },
  "rooms-linen-v1": { src: "/media/video/rooms-linen-v1.mp4", poster: posterLinen },
  "dining-plates-v1": { src: "/media/video/dining-plates-v1.mp4", poster: posterDining },
  "coves-sailboat-v1": { src: "/media/video/coves-sailboat-v1.mp4", poster: posterCoves },
  "pool-horizon-v1": { src: "/media/video/pool-horizon-v1.mp4", poster: posterPool },
  "contact-sunset-v1": { src: "/media/video/contact-sunset-v1.mp4", poster: posterSunset },
};
