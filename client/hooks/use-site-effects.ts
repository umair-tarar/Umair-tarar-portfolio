import { useEffect } from "react";

/** Fades sections in as they scroll into view (adds .is-visible to .reveal). */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Gentle 3D tilt on elements with the "tilt" class (mouse devices only). */
export function useCardTilt() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reset = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--ty", "0px");
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".tilt");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${x * 8}deg`);
      el.style.setProperty("--rx", `${-y * 8}deg`);
      el.style.setProperty("--ty", "-4px");
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".tilt");
      if (el && !el.contains(e.relatedTarget as Node)) reset(el);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);
}

/** True when the browser can run the 3D hero (WebGL, no reduced-motion). */
export function canRender3D() {
  try {
    if (new URLSearchParams(location.search).has("no3d")) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
