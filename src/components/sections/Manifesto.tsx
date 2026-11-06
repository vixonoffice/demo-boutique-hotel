import { parseWords } from "@/lib/words";
import Photo from "../Photo";

const text =
  "Twenty-four rooms cut into a *cliff.* One kitchen that cooks only what the morning boat brings in. No televisions, no lobby music, *no rush.*";

function ScrubWords({ value }: { value: string }) {
  return (
    <>
      {parseWords(value).map((w, i) => (
        <span key={i} className="sc-w inline-block">
          {w.em ? <em className="t-it text-clay">{w.text}</em> : w.text}
          {" "}
        </span>
      ))}
    </>
  );
}

const stats = [
  { n: "24", l: "rooms and suites" },
  { n: "1", l: "kitchen, one menu a day" },
  { n: "0", l: "televisions" },
];

export default function Manifesto() {
  return (
    <section id="story" className="relative bg-bone py-28 md:py-44">
      <div className="gutter mx-auto grid max-w-[1900px] gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-10 text-clay md:mb-14">The house</p>
          <p data-scrub-words className="t-display text-[clamp(2.3rem,5.6vw,6rem)] leading-[1.02]">
            <ScrubWords value={text} />
          </p>
          <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-ink/25 pt-6 md:mt-24 md:gap-8">
            {stats.map((s) => (
              <div key={s.l} data-fade>
                <dt className="t-display text-[clamp(3.2rem,7vw,7rem)] leading-none text-clay">{s.n}</dt>
                <dd className="mt-3 text-[0.8rem] leading-snug text-muted md:text-sm">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <div data-clip className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden bg-sand">
            <div data-parallax="0.07" data-inner className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Photo name="sea-cove-v1" alt="A turquoise cove below the hotel cliff" fill sizes="(min-width:1024px) 36vw, 82vw" className="object-cover" style={{ objectPosition: "40% 50%" }} />
            </div>
          </div>
          <div className="mt-5 flex items-end gap-5 md:mt-6 md:gap-6">
            <div data-clip className="relative aspect-[4/3] w-[58%] shrink-0 overflow-hidden bg-sand">
              <div data-parallax="0.09" data-inner className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Photo name="land-grove-v1" alt="Olive trees in low evening light" fill sizes="(min-width:1024px) 22vw, 58vw" className="object-cover" />
              </div>
            </div>
            <p data-fade className="max-w-[28ch] pb-1 text-sm leading-relaxed text-muted">
              The cove at the foot of the cliff, and the grove behind the kitchen. Both are ours, neither is crowded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
