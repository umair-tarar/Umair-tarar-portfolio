import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ&/+#";

/** Letters shuffle for a moment, then settle into the real text. */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 1100,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / duration));
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || c === "&" || i < settled
              ? c
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
}
