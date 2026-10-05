import { useState } from "react";
import SectionHeading from "@/components/common/section-heading";
import { BEFORE_AFTER } from "@/data/site";

function Slider({ before, after, title }: { before: string; after: string; title: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="card-premium p-4 sm:p-5">
      <div className="relative select-none overflow-hidden rounded-2xl">
        <img src={after} alt={`${title}: after`} className="block w-full" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${title}: before`} className="block h-full w-full object-cover" draggable={false} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-glow" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            ⇆
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${title} comparison`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-white">{title}</p>
    </div>
  );
}

/** Shows only when BEFORE_AFTER in data/site.ts has entries. */
export default function BeforeAfterSection() {
  if (BEFORE_AFTER.length === 0) return null;
  return (
    <section id="results" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Results" title="Before and after" center />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BEFORE_AFTER.map((item) => (
            <Slider key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
