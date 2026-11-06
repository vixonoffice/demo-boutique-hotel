import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import Animations from "@/components/Animations";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/TransitionProvider";
import { site } from "@/data/site";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const title = "Casa Vellora | Boutique hotel on a Mediterranean cliff (concept site)";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Casa Vellora" },
  description: site.description,
  applicationName: "Casa Vellora",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Casa Vellora (concept by Vixon Lab)",
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#12100d",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Casa Vellora (fictional concept)",
  description: site.description,
  url: site.url,
  email: site.email,
  starRating: { "@type": "Rating", ratingValue: "5" },
  numberOfRooms: 24,
  priceRange: "EUR 240 - 640",
  address: { "@type": "PostalAddress", streetAddress: "Via del Faro 12", addressLocality: "Cala Vellora", addressCountry: "Fictional" },
  creator: { "@type": "Organization", name: "Vixon Lab", url: site.vixon },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[130] -translate-y-24 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
          <SmoothScroll />
          <Animations />
        </TransitionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
