import { experiences } from "@/data/content";
import AutoVideo from "../AutoVideo";
import Photo from "../Photo";
import Split from "../Split";

export default function Experiences() {
  return (
    <section
      id="experiences"
      data-exp
      className="on-light relative flex flex-col justify-center overflow-hidden bg-sand py-24 text-ink md:h-[100svh] md:py-0"
    >
      <div className="gutter mx-auto flex w-full max-w-[1900px] flex-wrap items-end justify-between gap-6 pb-8 md:pb-6 md:pt-24">
        <div>
          <p className="eyebrow mb-5 text-clay">Experiences</p>
          <Split as="h2" className="t-display t-md" text="Days are for the *sea,* the grove and the stone." />
        </div>
        <div className="hidden w-64 items-center gap-4 md:flex" aria-hidden="true">
          <span className="t-display text-3xl tabular-nums" data-exp-count>01</span>
          <span className="relative h-px flex-1 bg-ink/25">
            <span data-exp-bar className="absolute inset-0 origin-left scale-x-[0.02] bg-clay" />
          </span>
          <span className="t-display text-3xl tabular-nums text-muted">{String(experiences.length).padStart(2, "0")}</span>
        </div>
        <p className="eyebrow text-muted md:hidden">Swipe along</p>
      </div>

      <div className="exp-track gap-3 px-5 pb-4 md:min-h-0 md:flex-1 md:gap-5 md:px-10 md:pb-16 xl:px-16" tabIndex={-1}>
        {experiences.map((e, i) => (
          <article
            key={e.n}
            data-exp-panel
            className={`relative h-[30rem] w-[82vw] shrink-0 overflow-hidden bg-ink text-bone md:h-auto md:w-[42vw] lg:w-[33vw] ${
              i % 2 === 0 ? "md:mb-10" : "md:mt-10"
            }`}
          >
            <div data-exp-img className="absolute inset-y-0 -left-[7%] w-[114%]">
              {e.video ? (
                <AutoVideo name={e.video} sizes="(min-width:768px) 40vw, 82vw" />
              ) : (
                <Photo name={e.photo!} alt={e.title} fill sizes="(min-width:1024px) 38vw, (min-width:768px) 48vw, 92vw" className="object-cover" />
              )}
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/25" />
            <p className="t-display absolute left-5 top-4 text-7xl leading-none md:left-7 md:top-6 md:text-8xl" aria-hidden="true">
              {e.n}
            </p>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="eyebrow mb-3 text-ember">
                {e.when} · {e.note}
              </p>
              <h3 className="t-display text-[clamp(2.1rem,3.3vw,3.6rem)]">{e.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-bone/90">{e.text}</p>
            </div>
          </article>
        ))}
        <div className="w-px shrink-0 md:w-16" aria-hidden="true" />
      </div>
    </section>
  );
}
