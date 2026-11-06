import credits from "@/data/media-credits.json";
import { nav, site } from "@/data/site";
import Split from "./Split";
import { TLink } from "./TransitionProvider";

type Credit = { type: string; id: number; author: string; authorUrl: string; url: string };

function creditList() {
  const seen = new Map<string, Credit>();
  Object.values(credits as Record<string, Credit>).forEach((c) => {
    if (!seen.has(c.authorUrl)) seen.set(c.authorUrl, c);
  });
  return Array.from(seen.values());
}

export default function Footer() {
  const people = creditList();
  return (
    <footer className="on-light relative overflow-hidden bg-clay pb-28 pt-24 text-bone md:pb-10 md:pt-32">
      <div className="gutter mx-auto max-w-[1900px]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">Stay with us</p>
            <Split as="h2" className="t-display t-lg" text="Come for one night, *leave* on the third day." />
            <TLink href="/contact#reserve" data-magnetic data-cursor="" className="btn btn-bone mt-12">
              <span data-magnetic-in>Reserve a stay</span>
            </TLink>
          </div>

          <div className="grid gap-10 text-[0.95rem] leading-relaxed sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-3">
            <div>
              <p className="eyebrow mb-4">Visit</p>
              <address className="not-italic">
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-3 block">Reception {site.reception}</span>
                <span className="block">{site.season}</span>
              </address>
            </div>
            <div>
              <p className="eyebrow mb-4">Write</p>
              <a href={`mailto:${site.email}`} className="link-line break-all">
                {site.email}
              </a>
              <p className="mt-3">We answer within a day, usually before breakfast.</p>
            </div>
            <div>
              <p className="eyebrow mb-4">Explore</p>
              <ul className="space-y-2">
                {nav.map((l) => (
                  <li key={l.href}>
                    <TLink href={l.href} className="link-line">
                      {l.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 border-t border-bone/40 pt-8 text-sm leading-relaxed md:grid-cols-12">
          <p className="md:col-span-5">
            <strong className="font-semibold">Concept site by </strong>
            <a href={site.vixon} className="link-line font-semibold" target="_blank" rel="noopener noreferrer">
              Vixon Lab
            </a>
            <strong className="font-semibold"> - fictional brand</strong>
            <span className="mt-2 block">
              Casa Vellora does not exist. Every name, room, price and address on this site is invented for a portfolio demo,
              and the forms send nothing.
            </span>
          </p>
          <div className="md:col-span-7">
            <p>
              Videos and photographs by Pexels contributors, via{" "}
              <a href={site.pexels} className="link-line" target="_blank" rel="noopener noreferrer">
                Pexels
              </a>
              .
            </p>
            <details className="mt-2">
              <summary className="link-line inline-block cursor-pointer">Media credits ({people.length})</summary>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {people.map((c) => (
                  <li key={c.authorUrl}>
                    <a href={c.authorUrl} className="link-line" target="_blank" rel="noopener noreferrer">
                      {c.author}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="mt-14 select-none whitespace-nowrap text-center text-ink md:mt-20">
        <Split as="p" className="t-display text-[clamp(4.2rem,21vw,26rem)] leading-[0.82]" text="Casa *Vellora*" />
      </div>
    </footer>
  );
}
