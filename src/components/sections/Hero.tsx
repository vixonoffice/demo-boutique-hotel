import AutoVideo from "../AutoVideo";
import Split from "../Split";
import { TLink } from "../TransitionProvider";

export default function Hero() {
  return (
    <section data-hero className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-bone">
      <div data-hero-media className="vl-zoom absolute inset-0">
        <AutoVideo
          name="hero-montage-v2"
          eager
          objectPosition="50% 50%"
          alt="White cliffside suites with private pools above the sea at Casa Vellora"
          control="right-5 top-24 md:bottom-12 md:right-10 md:top-auto"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,16,13,.62)_0%,rgba(18,16,13,.05)_28%,rgba(18,16,13,.08)_42%,rgba(18,16,13,.9)_100%)]"
      />

      <div data-hero-content className="gutter relative z-10 mx-auto flex h-full max-w-[1900px] flex-col justify-end pb-10 pt-32 md:pb-14">
        <p className="eyebrow vl-fade mb-6 text-ember md:mb-8" style={{ ["--d" as string]: "0.45s" }}>
          Boutique hotel, Costa Vellora
        </p>
        <h1 className="t-display t-xl">
          <Split text="Sleep above" mode="css" delay={0.2} />
          <br />
          <Split text="*the sea.*" mode="css" delay={0.45} emClass="text-ember" />
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-12 md:grid-cols-12">
          <p className="vl-fade max-w-[36ch] text-base leading-relaxed text-bone/90 md:col-span-5 md:text-lg" style={{ ["--d" as string]: "0.95s" }}>
            Twenty-four rooms, one kitchen that follows the boat and a private cove, cut into a cliff. Open April to October.
          </p>
          <div className="vl-fade flex flex-col gap-3 sm:flex-row md:col-span-7 md:justify-end md:pr-16" style={{ ["--d" as string]: "1.1s" }}>
            <TLink href="/#reserve" data-magnetic data-cursor="" className="btn btn-clay">
              <span data-magnetic-in>Reserve a stay</span>
            </TLink>
            <TLink href="/rooms" data-magnetic data-cursor="" className="btn btn-ghost">
              <span data-magnetic-in>See the rooms</span>
            </TLink>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-1/2 z-10 hidden h-16 w-px -translate-x-1/2 overflow-hidden bg-bone/25 md:block">
        <span className="vl-cue block h-full w-full bg-bone" />
      </div>
    </section>
  );
}
