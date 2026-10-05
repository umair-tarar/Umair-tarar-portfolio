import { Suspense, lazy, useEffect, useState } from "react";
import { Check } from "lucide-react";
import InView from "@/components/common/in-view";
import { canRender3D } from "@/hooks/use-site-effects";

const Funnel3D = lazy(() => import("@/components/common/funnel-3d"));
import SectionHeading from "@/components/common/section-heading";
import { FUNNEL_STAGES } from "@/data/site";

/** Animated funnel graphic: dots flow from searches down to customers. */
function FunnelGraphic() {
  const layers = [
    { pts: "40,10 360,10 328,100 72,100", id: "fn1", name: "Awareness", sub: "They search nearby", y: 52 },
    { pts: "76,108 324,108 292,198 108,198", id: "fn2", name: "Consideration", sub: "They compare you", y: 150 },
    { pts: "110,206 290,206 268,296 132,296", id: "fn3", name: "Decision", sub: "They choose you", y: 248 },
    { pts: "132,304 268,304 248,384 152,384", id: "fn4", name: "Action", sub: "They call or book", y: 340 },
  ];
  const strokes = ["0.5", "0.6", "0.8", "1"];

  return (
    <svg
      viewBox="0 0 400 440"
      role="img"
      aria-label="Search funnel from awareness to action"
      className="mx-auto w-full max-w-md"
    >
      <defs>
        {[0.25, 0.42, 0.62, 0.95].map((o, i) => (
          <linearGradient key={i} id={`fn${i + 1}`} x1="0" x2="1">
            <stop offset="0%" stopColor="rgb(var(--brand))" stopOpacity={o} />
            <stop
              offset="100%"
              stopColor={i === 3 ? "rgb(var(--brand-light))" : "rgb(var(--accent2))"}
              stopOpacity={i === 3 ? o : o * 0.9}
            />
          </linearGradient>
        ))}
        <path id="flow-a" d="M110 20 C 125 110, 170 170, 200 250 S 200 340, 200 384" />
        <path id="flow-b" d="M200 20 C 200 110, 200 170, 200 250 S 200 340, 200 384" />
        <path id="flow-c" d="M290 20 C 275 110, 230 170, 200 250 S 200 340, 200 384" />
      </defs>

      {layers.map((l, i) => (
        <g key={l.id} className="funnel-layer" style={{ "--i": i } as React.CSSProperties}>
          <polygon
            points={l.pts}
            fill={`url(#${l.id})`}
            stroke={`rgb(var(--brand) / ${strokes[i]})`}
          />
        </g>
      ))}

      <text x="200" y="420" textAnchor="middle" fill="rgb(var(--brand))" fontSize="14" fontWeight="700">
        Calls · Directions · Bookings
      </text>

      {["flow-a", "flow-b", "flow-c"].map((id, k) =>
        [0, 1, 2].map((n) => (
          <circle key={`${id}-${n}`} r="4" fill="#fff" opacity="0.9">
            <animateMotion
              dur="5s"
              begin={`${k * 0.5 + n * 1.6}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
        )),
      )}
      {layers.map((l, i) => (
        <g key={`t-${l.id}`} className="funnel-layer" style={{ "--i": i } as React.CSSProperties}>
          <text
            x="200"
            y={l.y}
            textAnchor="middle"
            fill={i === 3 ? "rgb(var(--brand-fg))" : "#fff"}
            fontSize={i === 3 ? "14" : "15"}
            fontWeight="700"
          >
            {l.name}
          </text>
          <text
            x="200"
            y={l.y + (i === 3 ? 17 : 19)}
            textAnchor="middle"
            fill={i === 3 ? "rgb(var(--brand-fg))" : "#fff"}
            fontSize={i === 3 ? "10" : "11"}
            opacity="0.8"
          >
            {l.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FunnelVisual() {
  const [ok3D, setOk3D] = useState(false);
  useEffect(() => setOk3D(canRender3D()), []);
  if (!ok3D) return <FunnelGraphic />;
  return (
    <InView className="min-h-[500px]" fallback={<FunnelGraphic />}>
      {(active) => (
        <Suspense fallback={<FunnelGraphic />}>
          <Funnel3D active={active} />
        </Suspense>
      )}
    </InView>
  );
}

export default function Funnel() {
  return (
    <section id="funnel" className="border-t border-white/10 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="The System"
          title="Full-funnel means every stage, not just the top"
          center
        />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          I map what people search to what they are ready to do, then build the
          profile, pages and reviews that catch them at each stage, from "who
          is nearby" all the way to "call now".
        </p>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <FunnelVisual />
          </div>

          <div className="space-y-5">
            {FUNNEL_STAGES.map((s) => (
              <div key={s.name} className="card-premium reveal tilt p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {s.stage} · {s.name}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">{s.lead}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {s.text}
                </p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/80">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
