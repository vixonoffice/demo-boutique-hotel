export const site = {
  name: "Casa Vellora",
  short: "Vellora",
  tagline: "A twenty-four room boutique hotel cut into a Mediterranean cliff.",
  description:
    "Casa Vellora is a fictional twenty-four room boutique hotel on a sea cliff: terrace suites, a kitchen that cooks the morning catch, a private cove and a reception that closes at midnight. Concept site by Vixon Lab.",
  url: "https://demo-boutique-hotel.vercel.app",
  email: "stay@casavellora.example",
  address: ["Via del Faro 12", "Cala Vellora", "Costa Vellora"],
  reception: "07:00 to midnight, every day",
  season: "Open April to October",
  vixon: "https://vixonlab.ro",
  pexels: "https://www.pexels.com",
} as const;

export const nav = [
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Dining", href: "/#dining" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
] as const;
