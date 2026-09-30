import { useEffect, useState } from "react";

const KEY = "umair-intro-seen";

/** Short branded intro shown once per browser session. */
export default function Preloader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">(() => {
    try {
      if (sessionStorage.getItem(KEY)) return "gone";
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "gone";
    } catch {
      /* storage may be blocked; just show the intro */
    }
    return "show";
  });

  useEffect(() => {
    if (phase !== "show") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const t1 = setTimeout(() => setPhase("hide"), 1500);
    const t2 = setTimeout(() => setPhase("gone"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-700 ${
        phase === "hide" ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute h-72 w-72 rounded-full bg-brand/25 blur-[100px]" />
      <div className="relative flex items-baseline gap-1 font-display text-5xl font-extrabold text-white sm:text-6xl">
        {"M.Umair".split("").map((ch, i) => (
          <span
            key={i}
            className="hero-in inline-block"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {ch}
          </span>
        ))}
        <span className="text-brand">.</span>
      </div>
      <p className="relative mt-3 text-xs uppercase tracking-[0.35em] text-white/50">
        Digital Marketing &amp; Local SEO
      </p>
      <div className="relative mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div className="preload-bar h-full rounded-full bg-gradient-to-r from-brand to-accent2" />
      </div>
    </div>
  );
}
