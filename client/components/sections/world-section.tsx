import { Suspense, lazy, useEffect, useState } from "react";
import { Globe2, MapPin } from "lucide-react";
import SectionHeading from "@/components/common/section-heading";
import InView from "@/components/common/in-view";
import { canRender3D } from "@/hooks/use-site-effects";

const GlobeScene = lazy(() => import("@/components/common/globe-scene"));

const MARKETS = ["United Kingdom", "United States", "UAE", "Canada", "Australia"];

export default function WorldSection() {
  const [ok3D, setOk3D] = useState(false);
  useEffect(() => setOk3D(canRender3D()), []);

  return (
    <section id="world" className="relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Remote &amp; Worldwide"
            title="Based in Faisalabad. Working with businesses worldwide."
          />
          <p className="reveal mt-6 max-w-lg text-foreground/70">
            Local SEO is local everywhere. I work remotely with businesses in
            any country, and I research each market's local search results
            before we start, so your strategy fits your city and your
            competitors.
          </p>

          <div className="reveal mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-white">
              <MapPin size={14} className="text-brand" /> Home base: Faisalabad, Pakistan
            </span>
            {MARKETS.map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/75"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="reveal mt-4 text-xs text-foreground/45">
            Drag the globe to rotate it.
          </p>
        </div>

        <div className="reveal relative mx-auto h-[380px] w-full max-w-lg sm:h-[440px]">
          <div className="absolute inset-10 -z-10 rounded-full bg-brand/20 blur-3xl" />
          {ok3D ? (
            <InView className="h-full w-full">
              <Suspense fallback={null}>
                <GlobeScene />
              </Suspense>
            </InView>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Globe2 className="animate-float text-brand" size={150} strokeWidth={1} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
