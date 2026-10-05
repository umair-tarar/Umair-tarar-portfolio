import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Play, RotateCcw, Search } from "lucide-react";
import SectionHeading from "@/components/common/section-heading";
import InView from "@/components/common/in-view";
import { canRender3D } from "@/hooks/use-site-effects";

const PodiumScene = lazy(() => import("@/components/common/podium-scene"));

const COMPETITORS = ["Competitor A", "Competitor B", "Competitor C", "Competitor D", "Competitor E", "Competitor F"];

const STEPS = [
  { label: "Optimize Google Business Profile", rank: 5 },
  { label: "Clean up citations and NAP", rank: 3 },
  { label: "Build a review system", rank: 2 },
  { label: "Add service and location pages", rank: 1 },
];

const START_RANK = 7;

export default function MapPackDemo() {
  const [name, setName] = useState("Your Business");
  const [rank, setRank] = useState(START_RANK);
  const [done, setDone] = useState(0); // steps completed
  const [running, setRunning] = useState(false);
  const [ok3D, setOk3D] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => setOk3D(canRender3D()), []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const businessName = name.trim() || "Your Business";

  const rows = (() => {
    const list = COMPETITORS.slice(0, 6).map((c) => ({ id: c, label: c, you: false }));
    list.splice(rank - 1, 0, { id: "you", label: businessName, you: true });
    return list;
  })();

  function run() {
    if (running) return;
    reset(false);
    setRunning(true);
    STEPS.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setRank(s.rank);
          setDone(i + 1);
          if (i === STEPS.length - 1) setRunning(false);
        }, 900 * (i + 1)),
      );
    });
  }

  function reset(clearRunning = true) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRank(START_RANK);
    setDone(0);
    if (clearRunning) setRunning(false);
  }

  return (
    <section id="map-pack" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Interactive Demo"
          title="Watch a business climb the Map Pack"
          center
        />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-foreground/60">
          Type your business name, press the button, and see how the four core
          local SEO steps move a business from hidden to the top of Google
          Maps.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Mock search results */}
          <div className="panel reveal p-5 sm:p-7">
            <label className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
              <Search size={16} className="text-white/50" />
              <span className="text-sm text-white/60">best local service near me</span>
            </label>

            <div className="mt-5 space-y-2.5">
              {rows.map((r, idx) => (
                <motion.div
                  key={r.id}
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                    r.you
                      ? "border-brand/60 bg-brand/15 shadow-glow"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      r.you ? "bg-brand text-brand-foreground" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <MapPin size={16} className={r.you ? "text-brand" : "text-white/35"} />
                  <span className={`truncate text-sm font-semibold ${r.you ? "text-white" : "text-white/55"}`}>
                    {r.label}
                  </span>
                  {r.you && idx < 3 && (
                    <span className="ml-auto rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
                      Map Pack
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={32}
                placeholder="Your business name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand sm:flex-1"
              />
              <button
                type="button"
                onClick={run}
                disabled={running}
                className="magnetic btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand-dark disabled:opacity-60"
              >
                <Play size={15} /> {running ? "Optimizing..." : "Optimize my ranking"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                aria-label="Reset demo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Steps + podium */}
          <div className="space-y-6">
            <div className="card-premium reveal p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                What changes
              </p>
              <ul className="mt-4 space-y-3">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="flex items-center gap-3 text-sm">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        i < done
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-white/20 text-transparent"
                      }`}
                    >
                      <Check size={14} />
                    </span>
                    <span className={i < done ? "text-white" : "text-white/50"}>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel reveal overflow-hidden px-2 pt-2">
              {ok3D ? (
                <InView className="h-[340px]">
                  {(active) => (
                    <Suspense fallback={null}>
                      <PodiumScene rank={rank} active={active} />
                    </Suspense>
                  )}
                </InView>
              ) : (
                <p className="p-6 text-center text-sm text-white/55">
                  {rank <= 3 ? `${businessName} is now in the top 3.` : `${businessName} is not in the top 3 yet.`}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="reveal mt-8 text-center text-xs text-foreground/40">
          This is an illustration of how local rankings can improve. It is not
          a real ranking, a guarantee, or a prediction of results.
        </p>
      </div>
    </section>
  );
}
