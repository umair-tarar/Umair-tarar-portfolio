import { useState } from "react";
import { Gauge, Link2 } from "lucide-react";
import SectionHeading from "@/components/common/section-heading";
import GbpScore from "@/components/tools/gbp-score";
import ReviewLink from "@/components/tools/review-link";

const TOOLS = [
  { id: "score", label: "Profile Score", icon: Gauge, title: "Google Business Profile Score", blurb: "See how complete your profile is and what to fix first." },
  { id: "review", label: "Review Link", icon: Link2, title: "Review Link & QR Generator", blurb: "Make a one-tap review link, QR code and message for your customers." },
] as const;

export default function ToolsSection() {
  const [tab, setTab] = useState<(typeof TOOLS)[number]["id"]>("score");
  const active = TOOLS.find((t) => t.id === tab)!;
  const Icon = active.icon;

  return (
    <section id="tools" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Free Tools" title="Free tools for local businesses" center />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Two quick tools you can use right now, no sign-up needed.
        </p>

        <div className="reveal mt-10 flex justify-center">
          <div role="tablist" className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === tab}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all active:scale-95 ${
                  t.id === tab ? "bg-brand text-brand-foreground shadow-glow" : "text-white/65 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div key={tab} className="panel mt-8 animate-fade-up p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
              <Icon className="text-brand" size={22} />
            </span>
            <div>
              <h3 className="text-xl font-bold">{active.title}</h3>
              <p className="text-sm text-white/55">{active.blurb}</p>
            </div>
          </div>
          {tab === "score" ? <GbpScore /> : <ReviewLink />}
        </div>
      </div>
    </section>
  );
}
