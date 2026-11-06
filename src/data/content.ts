import type { PhotoKey, VideoKey } from "@/lib/media";

export type Experience = {
  n: string;
  title: string;
  when: string;
  note: string;
  text: string;
  photo?: PhotoKey;
  video?: VideoKey;
};

export const experiences: Experience[] = [
  {
    n: "01",
    title: "Sunrise swim",
    when: "06:30, 45 minutes",
    note: "Included",
    text: "114 steps take you down to the cove before anyone else is awake. Towels and tea are waiting on the rock.",
    photo: "sea-cove-wide-v1",
  },
  {
    n: "02",
    title: "Hidden coves by boat",
    when: "10:00, three hours",
    note: "From 60 per guest",
    text: "Our skipper knows which cove is empty today. Swim, snorkel, eat what the boat carries, be back for the siesta.",
    video: "coves-sailboat-v1",
  },
  {
    n: "03",
    title: "Lunch in the grove",
    when: "13:00, two hours",
    note: "Included for suites",
    text: "One long table between the olive trees, whatever the kitchen found at the market, and no phones on the table.",
    photo: "land-olive-v1",
  },
  {
    n: "04",
    title: "Stone and oil hammam",
    when: "16:00, ninety minutes",
    note: "From 85",
    text: "Warm stone, cold plunge, a long massage with oil pressed on the estate. The room has no windows and no clock.",
    photo: "land-spa-v1",
  },
  {
    n: "05",
    title: "Aperitivo and stars",
    when: "20:30, until late",
    note: "Included",
    text: "Lights out on the lower terrace. A spritz, a blanket, and a staff member who can name every constellation.",
    photo: "sea-dusk-v1",
  },
];

export type MenuTab = "breakfast" | "lunch" | "dinner";

export const menu: Record<MenuTab, { label: string; hours: string; items: { name: string; note: string; price: string }[] }> = {
  breakfast: {
    label: "Breakfast",
    hours: "08:00 to 11:00",
    items: [
      { name: "Warm focaccia", note: "olive oil, lemon curd", price: "9" },
      { name: "Ricotta and figs", note: "chestnut honey, toasted almonds", price: "12" },
      { name: "Eggs from the hill farm", note: "any way you like, with charred bread", price: "14" },
      { name: "Blood orange, pressed to order", note: "no sugar, ever", price: "6" },
    ],
  },
  lunch: {
    label: "Lunch",
    hours: "12:30 to 15:00",
    items: [
      { name: "Raw red prawn", note: "citrus, fennel, green olive oil", price: "24" },
      { name: "Charred octopus", note: "chickpea cream, capers, lemon", price: "26" },
      { name: "Linguine with sea urchin", note: "chilli, parsley, the cove in a bowl", price: "28" },
      { name: "Catch of the day", note: "by weight, ask at the pass", price: "market" },
    ],
  },
  dinner: {
    label: "Dinner",
    hours: "19:30 to 22:30",
    items: [
      { name: "Six-course tasting menu", note: "follows the boat and the garden", price: "92" },
      { name: "Wine pairing", note: "small growers, mostly within 80 km", price: "54" },
      { name: "Grilled turbot", note: "brown butter, wild fennel", price: "38" },
      { name: "Lemon tart, burnt", note: "from the courtyard tree", price: "11" },
    ],
  },
};

export type GalleryCategory = "rooms" | "table" | "sea" | "land";

export type GalleryItem = {
  id: string;
  photo: PhotoKey;
  title: string;
  category: GalleryCategory;
  size: "std" | "wide" | "tall";
  pos?: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", photo: "room-faro-v1", title: "Faro Suite terrace", category: "rooms", size: "tall", pos: "60% 50%" },
  { id: "g2", photo: "sea-cove-v1", title: "The morning cove", category: "sea", size: "wide" },
  { id: "g3", photo: "table-fish-v1", title: "Turbot, wild fennel", category: "table", size: "std" },
  { id: "g4", photo: "land-village-v1", title: "Steps to the village", category: "land", size: "tall", pos: "50% 60%" },
  { id: "g5", photo: "room-cala-v1", title: "Cala Suite", category: "rooms", size: "wide" },
  { id: "g6", photo: "sea-pool-v1", title: "The upper pool", category: "sea", size: "std" },
  { id: "g7", photo: "land-grove-v1", title: "The olive grove", category: "land", size: "tall" },
  { id: "g8", photo: "table-shrimp-v1", title: "Red prawn, citrus", category: "table", size: "std" },
  { id: "g9", photo: "room-pietra-v1", title: "Pietra stone bath", category: "rooms", size: "std" },
  { id: "g10", photo: "table-bar-v1", title: "Pool bar at dusk", category: "table", size: "wide" },
  { id: "g11", photo: "sea-dusk-v1", title: "The coast after dark", category: "sea", size: "std" },
  { id: "g12", photo: "land-spa-v1", title: "Hammam candles", category: "land", size: "std" },
  { id: "g13", photo: "room-olivo-v1", title: "Olivo Room", category: "rooms", size: "std" },
  { id: "g14", photo: "table-wine-v1", title: "Cellar tasting", category: "table", size: "tall", pos: "40% 50%" },
  { id: "g15", photo: "sea-cove-wide-v1", title: "Cove, midday", category: "sea", size: "wide" },
  { id: "g16", photo: "land-olive-v1", title: "Lunch light", category: "land", size: "std" },
];

export const galleryFilters: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "rooms", label: "Rooms" },
  { id: "table", label: "Table" },
  { id: "sea", label: "Sea" },
  { id: "land", label: "Land" },
];

export const faq = [
  {
    q: "How do we get to Casa Vellora?",
    a: "Fly into the regional airport (55 minutes by car) or arrive by sea. In season the hotel boat meets the morning ferry at the harbour. Tell us your arrival and we arrange a driver or the boat.",
  },
  {
    q: "Do you take children?",
    a: "Yes, from age eight. The cliff paths and the cove steps are steep, and the hotel is deliberately quiet. Younger guests are welcome in the whole-house buyouts in May and September.",
  },
  {
    q: "Is there a pool?",
    a: "There is an infinity pool on the upper terrace and a swimming ladder into the cove at the bottom of the steps. The cove is open from sunrise to sunset when the sea allows.",
  },
  {
    q: "What about dietary needs?",
    a: "Tell us when you reserve. The kitchen cooks from what arrives each morning, so it adapts easily: vegetarian, vegan, gluten-free and shellfish allergies are all part of a normal week.",
  },
  {
    q: "Can I cancel?",
    a: "Free cancellation up to 14 days before arrival, and one free date change for every stay. This is a concept site, so none of this is binding.",
  },
];
