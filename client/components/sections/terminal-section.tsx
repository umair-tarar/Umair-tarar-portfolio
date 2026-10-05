import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/common/section-heading";

const LINES = [
  { text: '$ local-seo audit --business "Your Business"', kind: "cmd" },
  { text: "✓ Google Business Profile reviewed", kind: "ok" },
  { text: "✓ Citations and NAP consistency checked", kind: "ok" },
  { text: "✓ Reviews and competitors analysed", kind: "ok" },
  { text: "✓ Website and local pages scanned", kind: "ok" },
  { text: "→ 90-day action plan ready. Let's talk.", kind: "go" },
] as const;

/** A terminal that types out how a free audit works. Loops while on screen. */
export default function TerminalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(LINES.map((l) => l.text));
      setTyping("");
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)));

    (async () => {
      while (!cancelled) {
        setShown([]);
        setTyping("");
        await wait(500);
        for (let i = 0; i < LINES.length && !cancelled; i++) {
          const line = LINES[i].text;
          const speed = LINES[i].kind === "cmd" ? 38 : 14;
          for (let c = 1; c <= line.length && !cancelled; c++) {
            setTyping(line.slice(0, c));
            await wait(speed);
          }
          setShown((s) => [...s, line]);
          setTyping("");
          await wait(LINES[i].kind === "cmd" ? 450 : 260);
        }
        await wait(3200);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [visible]);

  const color = (t: string) =>
    t.startsWith("$") ? "text-white" : t.startsWith("✓") ? "text-emerald-300" : "text-brand-light";

  return (
    <section id="behind-the-scenes" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Behind the Scenes" title="What happens in a free audit" center />

        <div ref={ref} className="reveal mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#050A1F] shadow-glow">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white/40">audit.sh</span>
          </div>
          <div className="min-h-[260px] space-y-2 p-5 font-mono text-sm sm:p-6 sm:text-base">
            {shown.map((l, i) => (
              <p key={i} className={color(l)}>
                {l}
              </p>
            ))}
            <p className={color(typing || "$")}>
              {typing}
              <span className="terminal-caret" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
