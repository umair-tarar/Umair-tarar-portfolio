import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CarouselItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
};

/**
 * CSS 3D carousel: cards sit on a ring that slowly turns. Drag, swipe or use
 * the arrows to rotate; it pauses while the pointer is over it.
 */
export default function ServicesCarousel({ items }: { items: CarouselItem[] }) {
  const n = items.length;
  const step = 360 / n;
  const radius = 430;
  const angleRef = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const apply = () => {
    if (ringRef.current) {
      ringRef.current.style.transform = `translateZ(-${radius}px) rotateY(${angleRef.current}deg)`;
    }
  };
  const paused = useRef(false);
  const drag = useRef<{ x: number; start: number } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!reduce && !paused.current && !drag.current) {
        angleRef.current -= dt * 0.006;
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rotateBy = (deg: number) => {
    angleRef.current += deg;
    apply();
  };

  return (
    <div
      className="relative hidden select-none lg:block"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="relative mx-auto h-[400px] cursor-grab active:cursor-grabbing"
        style={{ perspective: "1600px" }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, start: angleRef.current };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          angleRef.current = drag.current.start + (e.clientX - drag.current.x) * 0.25;
          apply();
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(0deg)`,
          }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="card-premium absolute -left-[150px] -top-[170px] flex h-[340px] w-[300px] flex-col rounded-3xl p-7"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
                <ul className="mt-auto space-y-1.5 text-sm text-white">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous service"
          onClick={() => rotateBy(step)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-brand hover:text-brand"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Drag or use the arrows</p>
        <button
          type="button"
          aria-label="Next service"
          onClick={() => rotateBy(-step)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-brand hover:text-brand"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
