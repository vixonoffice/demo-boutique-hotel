import type { VideoKey } from "@/lib/media";
import AutoVideo from "./AutoVideo";
import Split from "./Split";

type Props = {
  video: VideoKey;
  eyebrow: string;
  title: string;
  text: string;
  objectPosition?: string;
};

/** Inner-page hero: full-bleed autoplay video, giant serif title, CSS-only entrance. */
export default function PageHero({ video, eyebrow, title, text, objectPosition }: Props) {
  return (
    <section data-hero className="relative h-[82svh] min-h-[540px] w-full overflow-hidden bg-ink text-bone">
      <div data-hero-media className="vl-zoom absolute inset-0">
        <AutoVideo name={video} eager objectPosition={objectPosition} control="right-5 top-24 md:bottom-10 md:right-10 md:top-auto" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,16,13,.6)_0%,rgba(18,16,13,.05)_30%,rgba(18,16,13,.1)_45%,rgba(18,16,13,.88)_100%)]"
      />
      <div data-hero-content className="gutter relative z-10 mx-auto flex h-full max-w-[1900px] flex-col justify-end pb-10 pt-32 md:pb-14">
        <p className="eyebrow vl-fade mb-6 text-ember" style={{ ["--d" as string]: "0.35s" }}>
          {eyebrow}
        </p>
        <h1 className="t-display t-xl max-w-[14ch]">
          <Split text={title} mode="css" delay={0.15} />
        </h1>
        <p className="vl-fade mt-8 max-w-[44ch] text-base leading-relaxed text-bone/90 md:text-lg" style={{ ["--d" as string]: "0.8s" }}>
          {text}
        </p>
      </div>
    </section>
  );
}
