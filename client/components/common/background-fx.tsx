import { useMemo, useState } from "react";

type Variant = "aurora" | "space" | "grid";
const VARIANTS: Variant[] = ["aurora", "space", "grid"];

function pickVariant(): Variant {
  try {
    const v = new URLSearchParams(window.location.search).get("bg");
    if (v && (VARIANTS as string[]).includes(v)) return v as Variant;
  } catch {
    /* ignore */
  }
  return "aurora";
}

function stars(count: number, sizes: number[], colors: string[]) {
  return Array.from({ length: count }, () => {
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 100).toFixed(2);
    const s = sizes[Math.floor(Math.random() * sizes.length)];
    const c = colors[Math.floor(Math.random() * colors.length)];
    return `${x}vw ${y}vh 0 ${s}px ${c}`;
  }).join(", ");
}

/**
 * Site-wide animated backdrop, drawn behind all content with CSS only.
 * Preview other looks by adding ?bg=space or ?bg=grid to the site address.
 */
export default function BackgroundFX() {
  const [variant] = useState<Variant>(pickVariant);
  const layers = useMemo(
    () => ({
      a: stars(70, [0, 0, 1], ["rgba(190,215,255,0.85)", "rgba(255,255,255,0.8)"]),
      b: stars(40, [0, 1], ["rgba(125,211,252,0.9)", "rgba(165,180,255,0.9)"]),
      c: stars(18, [1, 2], ["rgba(255,255,255,0.95)"]),
    }),
    [],
  );

  return (
    <div aria-hidden className="bgfx" data-variant={variant}>
      <div className="bgfx-base" />

      {variant === "aurora" && (
        <>
          <i className="bgfx-blob bgfx-b1" />
          <i className="bgfx-blob bgfx-b2" />
          <i className="bgfx-blob bgfx-b3" />
          <i className="bgfx-blob bgfx-b4" />
          <div className="bgfx-sheen" />
        </>
      )}

      {variant === "space" && (
        <>
          <i className="bgfx-blob bgfx-neb1" />
          <i className="bgfx-blob bgfx-neb2" />
          <span className="bgfx-star bgfx-s1" style={{ boxShadow: layers.a }} />
          <span className="bgfx-star bgfx-s2" style={{ boxShadow: layers.b }} />
          <span className="bgfx-star bgfx-s3" style={{ boxShadow: layers.c }} />
        </>
      )}

      {variant === "grid" && (
        <>
          <div className="bgfx-grid" />
          <i className="bgfx-blob bgfx-g1" />
          <i className="bgfx-blob bgfx-g2" />
          <div className="bgfx-scan" />
        </>
      )}

      <div className="bgfx-noise" />
      <div className="bgfx-vignette" />
    </div>
  );
}
