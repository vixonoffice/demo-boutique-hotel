import type { PhotoKey } from "@/lib/media";

export type RoomTag = "suite" | "sea" | "garden";

export type Room = {
  slug: string;
  name: string;
  kicker: string;
  photo: PhotoKey;
  size: number;
  sleeps: number;
  bed: string;
  view: string;
  from: number;
  tags: RoomTag[];
  blurb: string;
  amenities: string[];
};

export const rooms: Room[] = [
  {
    slug: "faro",
    name: "Faro Suite",
    kicker: "Top floor, private terrace",
    photo: "room-faro-v1",
    size: 68,
    sleeps: 3,
    bed: "King bed and daybed",
    view: "Open sea, 180 degrees",
    from: 640,
    tags: ["suite", "sea"],
    blurb:
      "The corner of the house that catches the first light. A terrace you do not share, an outdoor plunge bath and a bed made for staying in.",
    amenities: ["Plunge bath on the terrace", "Espresso machine", "Linen from the village loom", "Sunrise breakfast, served in the suite"],
  },
  {
    slug: "cala",
    name: "Cala Suite",
    kicker: "Glass wall, soaking tub",
    photo: "room-cala-v1",
    size: 52,
    sleeps: 2,
    bed: "King bed",
    view: "Sea, from the side",
    from: 520,
    tags: ["suite", "sea"],
    blurb: "Floor-to-ceiling glass, cedar panelling and a tub that faces the water. The curtains are for the evenings only.",
    amenities: ["Soaking tub facing the sea", "Walk-in rain shower", "Honesty bar", "Reading nook"],
  },
  {
    slug: "olivo",
    name: "Olivo Room",
    kicker: "Linen, stone, a grove outside",
    photo: "room-olivo-v1",
    size: 34,
    sleeps: 2,
    bed: "Queen bed",
    view: "Olive terraces",
    from: 290,
    tags: ["garden"],
    blurb: "Sheer curtains, cool stone floors and the olive grove right at the window. Small, calm, and very good value.",
    amenities: ["Garden terrace", "Rain shower", "Fan and shutters, no air conditioning", "Tea and local olive oil"],
  },
  {
    slug: "pietra",
    name: "Pietra Suite",
    kicker: "Carved-stone bath, courtyard",
    photo: "room-pietra-v1",
    size: 46,
    sleeps: 2,
    bed: "King bed",
    view: "Walled courtyard",
    from: 430,
    tags: ["suite", "garden"],
    blurb: "A bath carved from a single block of local stone, cedar walls and a courtyard with a lemon tree of its own.",
    amenities: ["Stone bath", "Private courtyard", "Outdoor shower", "Daily fruit from the courtyard tree"],
  },
  {
    slug: "alba",
    name: "Alba Room",
    kicker: "East-facing, the quiet one",
    photo: "room-alba-v1",
    size: 28,
    sleeps: 2,
    bed: "Queen bed",
    view: "Hillside and morning sun",
    from: 240,
    tags: ["garden"],
    blurb: "The smallest room and the one people book again. It faces east, so the morning arrives gently and early.",
    amenities: ["East-facing window seat", "Rain shower", "Blackout shutters", "Quiet corridor"],
  },
  {
    slug: "brezza",
    name: "Brezza Terrace Room",
    kicker: "Pergola, rooftops, a sea breeze",
    photo: "room-brezza-v1",
    size: 36,
    sleeps: 3,
    bed: "Queen bed and sofa bed",
    view: "Sea and terracotta roofs",
    from: 360,
    tags: ["sea"],
    blurb: "A shaded pergola terrace and a breeze off the water that does the air conditioning for you. Sleeps a third guest.",
    amenities: ["Pergola terrace", "Sofa bed for a third guest", "Hammock", "Cold-pressed juice at 11:00"],
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);

export const roomFilters: { id: "all" | RoomTag; label: string }[] = [
  { id: "all", label: "All six" },
  { id: "suite", label: "Suites" },
  { id: "sea", label: "Sea view" },
  { id: "garden", label: "Garden" },
];
