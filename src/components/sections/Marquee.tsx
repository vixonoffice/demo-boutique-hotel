const words = ["salt", "stone", "olive oil", "linen", "sunrise", "silence"];

/** Big type band whose position is scrubbed by scroll (see Animations). Static when motion is reduced. */
export default function Marquee() {
  const row = (
    <span className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-10 md:gap-16">
          <span className="t-display text-[clamp(4.5rem,13vw,13rem)] leading-[0.95]">{w}</span>
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-ink md:h-5 md:w-5" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="on-light overflow-hidden bg-clay py-8 text-bone md:py-12" aria-label="Salt, stone, olive oil, linen, sunrise, silence" role="img">
      <div data-marquee className="flex w-max" aria-hidden="true">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
