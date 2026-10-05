import { useEffect, useRef, useState } from "react";
import { ArrowUp, ClipboardCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/brand-icons";
import Lenis from "lenis";
import ChatWidget from "@/components/common/chat-widget";
import { CONTACT } from "@/data/site";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Site-wide polish: smooth scrolling, scroll progress bar, cursor spotlight,
 * card spotlights, magnetic buttons, hero parallax, plus the floating WhatsApp
 * button (desktop) and the sticky action bar (mobile).
 * Pointer effects are skipped on touch devices and for reduced motion.
 */
export default function SiteEffects() {
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- smooth scrolling ----
    let lenis: Lenis | null = null;
    let lenisRaf = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: false });
      window.__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        lenisRaf = requestAnimationFrame(loop);
      };
      lenisRaf = requestAnimationFrame(loop);
    }

    // ---- scroll progress, parallax, back-to-top ----
    let raf = 0;
    const auroras = Array.from(document.querySelectorAll<HTMLElement>(".aurora"));
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        setShowTop(window.scrollY > 700);
        if (!reduce) {
          auroras.forEach((el, i) => {
            el.style.translate = `0 ${window.scrollY * (i ? -0.08 : 0.14)}px`;
          });
          // Depth: elements drift at their own speed as they cross the screen.
          parallaxEls.forEach((el) => {
            const speed = Number(el.dataset.parallax) || 0.06;
            const prev = Number(el.dataset.py) || 0;
            const r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
            const center = r.top - prev + r.height / 2 - window.innerHeight / 2;
            const off = Math.max(-90, Math.min(90, -center * speed));
            el.dataset.py = String(off);
            el.style.translate = `0 ${off}px`;
          });
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- pointer effects ----
    let active: HTMLElement | null = null;
    const resetMag = (el: HTMLElement | null) => {
      if (el) el.style.transform = "";
    };
    const onMove = (e: PointerEvent) => {
      if (glow.current) {
        glow.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        glow.current.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;

      const card = t.closest<HTMLElement>(".card-premium, .plan-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const mag = t.closest<HTMLElement>(".magnetic");
      if (mag !== active) {
        resetMag(active);
        active = mag;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        mag.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const onLeave = () => {
      if (glow.current) glow.current.style.opacity = "0";
      resetMag(active);
      active = null;
    };
    if (fine && !reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (lenisRaf) cancelAnimationFrame(lenisRaf);
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);

  const goTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goAudit = () => {
    const el = document.getElementById("book");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Umair, I would like a free Local SEO audit.",
  )}`;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-brand-light to-accent2"
        ref={bar}
      />
      <div
        aria-hidden
        ref={glow}
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[5] opacity-0"
      />

      {/* Desktop floating buttons */}
      <div className="fixed bottom-24 right-5 z-50 hidden flex-col items-end gap-3 md:flex">
        <button
          type="button"
          aria-label="Back to top"
          onClick={goTop}
          className={`glass flex h-11 w-11 items-center justify-center rounded-full text-white shadow-glow transition-all duration-300 hover:border-brand hover:text-brand ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <ChatWidget />

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/90 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2 text-xs font-semibold">
          <a
            href={CONTACT.phoneHref}
            className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 py-2 text-white"
          >
            <Phone size={18} className="text-brand" /> Call
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 py-2 text-white"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={goAudit}
            className="flex flex-col items-center gap-1 rounded-2xl bg-brand py-2 text-brand-foreground shadow-glow"
          >
            <ClipboardCheck size={18} /> Free Audit
          </button>
        </div>
      </div>
    </>
  );
}
