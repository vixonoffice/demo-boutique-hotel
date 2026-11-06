import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reserve from "@/components/sections/Reserve";
import Split from "@/components/Split";
import { faq } from "@/data/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact and reservations",
  description:
    "How to reach Casa Vellora, a fictional boutique hotel: address, reception hours, getting here by sea or road, a reservation request form (demo) and answers to common questions.",
  alternates: { canonical: "/contact" },
};

const ways = [
  { t: "By sea", d: "In season the hotel boat meets the 10:40 ferry at the harbour. Twenty minutes along the coast, and the first thing you see is the house on its cliff." },
  { t: "By road", d: "55 minutes from the regional airport. The last 3 km are a single-track lane: park at the gate and a porter brings the bags down." },
  { t: "On foot", d: "A coastal path climbs from the village in about 40 minutes. We will send a pin and a bottle of water." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        video="contact-sunset-v1"
        eyebrow="Contact"
        title="Say *hello.*"
        text="Write to us, send a request below, or just tell us what kind of week you need. We answer within a day."
        objectPosition="50% 50%"
      />

      <section className="on-light bg-bone py-24 text-ink md:py-40">
        <div className="gutter mx-auto grid max-w-[1900px] gap-3 md:gap-4 lg:grid-cols-12">
          <div data-fade className="flex min-h-[18rem] flex-col justify-between bg-ink p-7 text-bone md:p-10 lg:col-span-5 lg:row-span-2">
            <p className="eyebrow text-ember">Visit</p>
            <address className="t-display text-[clamp(2.2rem,4vw,4.2rem)] not-italic leading-[1.02]">
              {site.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div data-fade className="flex min-h-[14rem] flex-col justify-between bg-sand p-7 md:p-10 lg:col-span-7">
            <p className="eyebrow text-clay">Write</p>
            <div>
              <a href={`mailto:${site.email}`} className="link-line t-display break-all text-[clamp(1.8rem,3.4vw,3.6rem)]">
                {site.email}
              </a>
              <p className="mt-4 max-w-[40ch] text-muted">This address is part of the fictional brand, so it will not reach anyone.</p>
            </div>
          </div>
          <div data-fade className="flex min-h-[12rem] flex-col justify-between bg-clay p-7 text-bone md:p-10 lg:col-span-4">
            <p className="eyebrow">Reception</p>
            <p className="t-display text-[clamp(1.8rem,2.6vw,2.8rem)] leading-[1.05]">{site.reception}</p>
          </div>
          <div data-fade className="flex min-h-[12rem] flex-col justify-between border border-ink/25 p-7 md:p-10 lg:col-span-3">
            <p className="eyebrow text-clay">Season</p>
            <p className="t-display text-[clamp(1.8rem,2.6vw,2.8rem)] leading-[1.05]">{site.season}</p>
          </div>
        </div>

        <div className="gutter mx-auto mt-24 max-w-[1900px] md:mt-40">
          <p className="eyebrow mb-8 text-clay">Getting here</p>
          <Split as="h2" className="t-display t-md max-w-[16ch]" text="Three ways *in,* all of them scenic." />
          <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {ways.map((w, i) => (
              <li key={w.t} data-fade className="border-t border-ink/30 pt-5">
                <p className="t-display text-6xl text-clay">0{i + 1}</p>
                <h3 className="t-display mt-4 text-3xl">{w.t}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">{w.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Reserve idPrefix="contact" title="Tell us the *dates,* we will find the room." />

      <section className="on-light bg-bone py-24 text-ink md:py-40">
        <div className="gutter mx-auto grid max-w-[1900px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-8 text-clay">Questions</p>
            <Split as="h2" className="t-display t-md" text="Before you *ask.*" />
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-ink/30">
              {faq.map((f) => (
                <li key={f.q} className="border-b border-ink/30">
                  <details className="group">
                    <summary className="flex min-h-[4.5rem] cursor-pointer items-center justify-between gap-6 py-5" data-cursor="">
                      <span className="t-display text-[clamp(1.5rem,2.3vw,2.4rem)] leading-tight">{f.q}</span>
                      <span aria-hidden="true" className="faq-plus t-display shrink-0 text-4xl text-clay transition-transform duration-500">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[60ch] pb-6 leading-relaxed text-muted">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
