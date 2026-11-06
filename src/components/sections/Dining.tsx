import AutoVideo from "../AutoVideo";
import DiningMenu from "../DiningMenu";
import Photo from "../Photo";
import Split from "../Split";

export default function Dining() {
  return (
    <section id="dining" className="relative bg-ink py-28 text-bone md:py-44">
      <div className="gutter mx-auto max-w-[1900px]">
        <p className="eyebrow mb-8 text-ember">Marea, the kitchen</p>
        <Split as="h2" className="t-display t-xl" text="Dinner *follows* the boat." />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div data-clip className="relative aspect-[4/3] overflow-hidden bg-ink-2">
              <AutoVideo name="dining-plates-v1" sizes="(min-width:1024px) 58vw, 100vw" alt="Plates of red prawn on a kitchen pass" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="eyebrow absolute bottom-5 left-5 md:bottom-7 md:left-7">Terrace, 38 seats, sea on three sides</p>
            </div>
            <p data-fade className="mt-8 max-w-[50ch] text-lg leading-relaxed text-mist">
              There is no printed menu. By eleven the fisherman tells the kitchen what came in, the garden answers with what
              ripened, and the day&apos;s cooking is written on a slate at the door.
            </p>
          </div>
          <div className="lg:col-span-5">
            <DiningMenu />
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:mt-10 md:gap-4 lg:grid-cols-12">
          <div data-fade className="relative aspect-[4/3] overflow-hidden bg-ink-2 lg:col-span-4 lg:aspect-auto lg:min-h-[26rem]">
            <Photo name="table-fish-v1" alt="Grilled turbot with wild fennel in a yellow broth" fill sizes="(min-width:1024px) 32vw, 94vw" className="object-cover" />
          </div>
          <figure data-fade className="on-light flex flex-col justify-between bg-bone p-7 text-ink md:p-10 lg:col-span-5">
            <blockquote className="t-display text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.05]">
              &ldquo;I do not write the menu. <em>The boat does.</em> I just draw what it brings.&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted">Marta Oliveira, head chef (fictional)</figcaption>
          </figure>
          <div data-fade className="relative aspect-[4/3] overflow-hidden bg-ink-2 lg:col-span-3 lg:aspect-auto">
            <Photo name="table-shrimp-v1" alt="Red prawn with citrus and fennel" fill sizes="(min-width:1024px) 24vw, 94vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
