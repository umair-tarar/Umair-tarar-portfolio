import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";
import { LinkedInIcon } from "@/components/common/brand-icons";
import SectionHeading from "@/components/common/section-heading";
import { LINKEDIN_URL, RECOMMENDATIONS, type Recommendation } from "@/data/recommendations";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function RecCard({ r, className = "" }: { r: Recommendation; className?: string }) {
  return (
    <article className={`card-premium reveal tilt flex h-full flex-col p-6 sm:p-7 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-display text-base font-bold text-white">
            {initials(r.name)}
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-white">{r.name}</p>
            <p className="line-clamp-2 text-xs text-white/55" title={r.headline}>
              {r.headline}
            </p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#0A66C2]">
          <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
        </span>
      </div>

      <Quote className="mt-6 h-6 w-6 text-brand/70" />
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-white/80">
        {r.text.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <p className="mt-auto border-t border-white/10 pt-4 text-xs text-white/45">
        <span className="mt-5 block">
          {r.relation} · {r.date}
        </span>
      </p>
    </article>
  );
}

/** One card at a time: swipe, tap the arrows/dots, or let it advance on its own. */
function RecSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const n = RECOMMENDATIONS.length;

  const go = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const child = el.children[(k + n) % n] as HTMLElement;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const t = window.setInterval(() => {
      if (!paused.current) go(i + 1);
    }, 6500);
    return () => window.clearInterval(t);
  });

  return (
    <div className="lg:hidden">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          const first = el.children[0] as HTMLElement;
          const step = first.offsetWidth + 16;
          setI(Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / step))));
        }}
        onTouchStart={() => {
          paused.current = true;
        }}
        onTouchEnd={() => {
          window.setTimeout(() => {
            paused.current = false;
          }, 5000);
        }}
        className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {RECOMMENDATIONS.map((r) => (
          <div key={r.name} className="w-full shrink-0 snap-center">
            <RecCard r={r} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous recommendation"
          onClick={() => go(i - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {RECOMMENDATIONS.map((r, k) => (
            <button
              key={r.name}
              type="button"
              aria-label={`Show ${r.name}`}
              onClick={() => go(k)}
              className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-brand" : "w-2 bg-white/25"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next recommendation"
          onClick={() => go(i + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function RecommendationsSection() {
  return (
    <section id="recommendations" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Recommended on LinkedIn" title="What people say about working with me" center />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Recommendations from clients and teammates, copied word for word from my LinkedIn profile.
        </p>

        <div className="mt-14">
          <RecSlider />
          <div className="hidden gap-6 lg:grid lg:grid-cols-2">
            {RECOMMENDATIONS.map((r, i) => (
              <RecCard key={r.name} r={r} className={i === 0 ? "lg:col-span-2" : ""} />
            ))}
          </div>
        </div>

        <div className="reveal mt-10 text-center">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic btn-shimmer inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See them on LinkedIn <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
