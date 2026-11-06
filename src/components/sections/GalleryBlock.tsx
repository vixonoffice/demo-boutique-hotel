import Gallery from "../Gallery";
import Split from "../Split";

export default function GalleryBlock() {
  return (
    <section id="gallery" className="relative bg-bone py-28 md:py-44">
      <div className="gutter mx-auto max-w-[1900px]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-8 text-clay">Gallery</p>
            <Split as="h2" className="t-display t-lg" text="The house, *in frames.*" />
          </div>
          <p data-fade className="max-w-[32ch] leading-relaxed text-muted">
            Filter by what you care about, open any frame to see it large. Arrow keys and Escape work too.
          </p>
        </div>
        <Gallery />
      </div>
    </section>
  );
}
