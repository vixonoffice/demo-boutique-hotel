import AutoVideo from "../AutoVideo";
import BookingForm from "../BookingForm";
import Split from "../Split";

export default function Reserve({ idPrefix = "home", title = "Dates, a view, a table at *sunset.*" }: { idPrefix?: string; title?: string }) {
  return (
    <section id="reserve" className="relative scroll-mt-0 bg-ink py-24 text-bone md:py-40">
      <div className="gutter mx-auto grid max-w-[1900px] gap-4 lg:grid-cols-12 lg:gap-6">
        <div data-clip className="relative min-h-[28rem] overflow-hidden bg-ink-2 lg:col-span-5 lg:min-h-[44rem]">
          <AutoVideo name="pool-horizon-v1" sizes="(min-width:1024px) 40vw, 100vw" objectPosition="30% 50%" alt="An infinity pool reflecting the evening sky" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="eyebrow mb-5 text-ember">Reserve</p>
            <Split as="h2" className="t-display t-md" text={title} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <BookingForm idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}
