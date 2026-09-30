import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/section-heading";
import { PRICING } from "@/data/site";

/** Counts the price up from 0 whenever a plan appears. */
function AnimatedNumber({ value }: { value: number }) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 800);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}

export default function Pricing() {
  const [tabId, setTabId] = useState(PRICING[0].id);
  const tab = PRICING.find((t) => t.id === tabId) ?? PRICING[0];

  return (
    <section id="pricing" className="border-t border-white/10 py-24">
      <div className="container">
        <SectionHeading eyebrow="Pricing" title="Clear plans. No lock-in contracts." center />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Every plan is grouped by exactly what you get: profile work, website
          and on-page, content, off-page links and reporting. Not sure which
          fits? Book a free slot and I'll recommend the right one.
        </p>

        <div className="reveal mt-10 flex justify-center">
          <div
            role="tablist"
            className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
          >
            {PRICING.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === tabId}
                onClick={() => setTabId(t.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  t.id === tabId
                    ? "bg-brand text-brand-foreground shadow-glow"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          key={tab.id}
          className="mt-14 grid animate-fade-up gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          {tab.plans.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card relative flex flex-col p-8 ${
                plan.featured ? "plan-card-featured" : ""
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-foreground">
                  Most popular
                </span>
              )}
              {plan.premium && (
                <span className="mb-3 w-fit rounded-full border border-brand/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                  Premium
                </span>
              )}
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 min-h-[2.5rem] text-sm text-white/55">{plan.blurb}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">
                  $<AnimatedNumber value={plan.price} />
                </span>
                <span className="text-sm text-white/50">{plan.unit}</span>
              </p>
              <p className="mt-1 text-xs text-white/45">{plan.meta}</p>

              <div className="mt-7 flex-1 space-y-5">
                {plan.groups.map((g) => (
                  <div key={g.title}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                      {g.title}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-white/75"
                        >
                          <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`mt-8 rounded-full ${
                  plan.featured
                    ? "magnetic btn-shimmer bg-brand text-brand-foreground hover:bg-brand-dark"
                    : "border border-white/20 bg-transparent text-white hover:bg-white/10"
                }`}
              >
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-center text-sm text-white/50">
          Monthly plans are billed at the start of each month and can be cancelled
          any time. One-time projects are a fixed scope for a fixed price.
        </p>
      </div>
    </section>
  );
}
