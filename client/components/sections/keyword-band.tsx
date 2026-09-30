const WORDS = [
  "Local SEO",
  "Google Maps",
  "Map Pack",
  "Digital Marketing",
  "Meta Ads",
  "Reviews",
  "More Calls",
  "More Customers",
];

/** Large outlined keywords that slide across the page as a visual divider. */
export default function KeywordBand() {
  const items = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden
      className="marquee-mask overflow-hidden border-y border-white/10 py-6"
    >
      <div
        className="marquee-track flex w-max items-center gap-10 pr-10"
        style={{ animationDuration: "55s" }}
      >
        {items.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-10">
            <span className="outline-text font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
              {w}
            </span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
