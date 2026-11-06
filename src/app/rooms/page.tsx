import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import RoomsExplorer from "@/components/RoomsExplorer";
import Split from "@/components/Split";
import { TLink } from "@/components/TransitionProvider";

export const metadata: Metadata = {
  title: "Rooms and suites",
  description:
    "Six rooms and suites at Casa Vellora, a fictional boutique hotel on a Mediterranean cliff. Filter by sea view, garden or suite, and flip each card for sizes and rates.",
  alternates: { canonical: "/rooms" },
};

const included = [
  { t: "Breakfast from the hill farm", d: "Eggs, ricotta, focaccia and blood orange, served on the terrace until eleven.", cls: "bg-clay text-bone lg:col-span-5 lg:row-span-2", big: true },
  { t: "The cove, before anyone else", d: "114 steps, a swimming ladder and towels waiting on the rock.", cls: "bg-sand text-ink lg:col-span-4" },
  { t: "Boat from the harbour", d: "We meet the morning ferry.", cls: "bg-ink-2 text-bone lg:col-span-3" },
  { t: "Quiet, on purpose", d: "No televisions, no lobby music. Reception closes at midnight.", cls: "bg-bone text-ink border border-ink/20 lg:col-span-3" },
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        video="rooms-linen-v1"
        eyebrow="Rooms and suites"
        title="Six rooms, *one* view."
        text="From a 28 m² room that faces the morning to a 68 m² suite with its own terrace and plunge bath."
        objectPosition="50% 55%"
      />

      <section className="bg-ink py-24 text-bone md:py-40">
        <div className="gutter mx-auto max-w-[1900px]">
          <div className="mb-14 grid gap-8 lg:grid-cols-12 md:mb-20">
            <Split as="h2" className="t-display t-lg lg:col-span-8" text="Pick the *view,* we handle the rest." />
            <p data-fade className="max-w-[36ch] leading-relaxed text-mist lg:col-span-4 lg:self-end">
              Rates are per room per night, breakfast included. Tap or press Enter on a card to turn it over.
            </p>
          </div>
          <RoomsExplorer />
        </div>
      </section>

      <section className="on-light bg-bone py-24 text-ink md:py-40">
        <div className="gutter mx-auto max-w-[1900px]">
          <p className="eyebrow mb-8 text-clay">Included with every stay</p>
          <Split as="h2" className="t-display t-lg" text="Small things we *refuse* to charge for." />

          <div className="mt-14 grid gap-3 md:mt-20 md:gap-4 lg:auto-rows-[15rem] lg:grid-cols-12">
            {included.map((i) => (
              <div key={i.t} data-fade className={`flex min-h-[13rem] flex-col justify-between p-6 md:p-8 ${i.cls}`}>
                <p className="eyebrow opacity-80">Included</p>
                <div>
                  <p className={`t-display ${i.big ? "text-[clamp(2.4rem,4.4vw,4.8rem)]" : "text-[clamp(1.7rem,2.4vw,2.6rem)]"} leading-[1.02]`}>{i.t}</p>
                  <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed opacity-85">{i.d}</p>
                </div>
              </div>
            ))}
            <div data-clip className="relative min-h-[16rem] overflow-hidden bg-sand lg:col-span-4">
              <div data-parallax="0.08" data-inner className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Photo name="sea-pool-v1" alt="The upper pool and loungers above the sea" fill sizes="(min-width:1024px) 32vw, 94vw" className="object-cover" />
              </div>
            </div>
            <div data-clip className="relative min-h-[16rem] overflow-hidden bg-sand lg:col-span-5">
              <div data-parallax="0.08" data-inner className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Photo name="room-pietra-v1" alt="A carved stone bath in a cedar-panelled room" fill sizes="(min-width:1024px) 40vw, 94vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="on-light bg-clay py-24 text-bone md:py-36">
        <div className="gutter mx-auto flex max-w-[1900px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <Split as="h2" className="t-display t-lg max-w-[12ch]" text="Found *yours?*" />
          <TLink href="/contact#reserve" data-magnetic data-cursor="" className="btn btn-bone btn-block-sm">
            <span data-magnetic-in>Check dates</span>
          </TLink>
        </div>
      </section>
    </>
  );
}
