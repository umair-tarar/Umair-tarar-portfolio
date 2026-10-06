import { ExternalLink, Quote } from "lucide-react";
import { LinkedInIcon } from "@/components/common/brand-icons";
import SectionHeading from "@/components/common/section-heading";
import { LINKEDIN_URL, RECOMMENDATIONS } from "@/data/recommendations";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function RecommendationsSection() {
  return (
    <section id="recommendations" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Recommended on LinkedIn" title="What people say about working with me" center />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Recommendations from clients and teammates, copied word for word from my LinkedIn profile.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {RECOMMENDATIONS.map((r, i) => (
            <article
              key={r.name}
              className={`card-premium reveal tilt flex flex-col p-7 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
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

              <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/45">
                {r.relation} · {r.date}
              </p>
            </article>
          ))}
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
