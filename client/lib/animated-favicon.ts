/**
 * Animated browser-tab icon: a glowing map pin that gently floats while
 * ripples pulse beneath it. Drawn on a canvas and swapped in as the favicon.
 * It pauses while the tab is hidden and stays still for reduced motion.
 * The static /favicon.svg and /favicon.ico remain as fallbacks.
 */
const SIZE = 64;

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function draw(ctx: CanvasRenderingContext2D, phase: number) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  // background tile
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, "#2A52C9");
  bg.addColorStop(1, "#0A1030");
  roundedRect(ctx, 0, 0, SIZE, SIZE, 16);
  ctx.fillStyle = bg;
  ctx.fill();
  roundedRect(ctx, 0.75, 0.75, SIZE - 1.5, SIZE - 1.5, 15.3);
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ripples
  for (const off of [0, 0.5]) {
    const q = (phase + off) % 1;
    const rx = 5 + 13 * q;
    ctx.beginPath();
    ctx.ellipse(32, 55, rx, rx * 0.28, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(125,211,252,${(1 - q) * 0.95})`;
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  // pin
  const dy = Math.sin(phase * Math.PI * 2) * 1.4;
  const pin = ctx.createLinearGradient(0, 8.3 + dy, 0, 52 + dy);
  pin.addColorStop(0, "#B6E0FF");
  pin.addColorStop(1, "#2F6BF0");
  ctx.fillStyle = pin;
  ctx.beginPath();
  ctx.arc(32, 24.8 + dy, 16.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(17.4, 30.6 + dy);
  ctx.lineTo(46.6, 30.6 + dy);
  ctx.lineTo(32, 52 + dy);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(32, 24.5 + dy, 6.4, 0, Math.PI * 2);
  ctx.fillStyle = "#0A1030";
  ctx.fill();

  // twinkling sparkle
  const sc = 0.65 + 0.35 * Math.sin(phase * Math.PI * 4);
  const s = 5 * sc;
  const m = 1.3 * sc;
  const sx = 50;
  const sy = 13.5;
  ctx.beginPath();
  ctx.moveTo(sx, sy - s);
  ctx.lineTo(sx + m, sy - m);
  ctx.lineTo(sx + s, sy);
  ctx.lineTo(sx + m, sy + m);
  ctx.lineTo(sx, sy + s);
  ctx.lineTo(sx - m, sy + m);
  ctx.lineTo(sx - s, sy);
  ctx.lineTo(sx - m, sy - m);
  ctx.closePath();
  ctx.fillStyle = "#E0F2FE";
  ctx.fill();
}

export function startAnimatedFavicon(): () => void {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    // One dynamic icon link; remove the static ones so the browser uses it.
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
      .forEach((l) => l.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    // Start from the static icon so there is never a blank tab icon.
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    document.head.appendChild(link);

    const CYCLE = 2400; // ms per animation loop
    const start = performance.now();
    let first = true;
    const tick = () => {
      if (document.hidden && !first) return;
      first = false;
      const phase = ((performance.now() - start) % CYCLE) / CYCLE;
      draw(ctx, phase);
      link.type = "image/png";
      link.href = canvas.toDataURL("image/png");
    };
    tick();
    const id = window.setInterval(tick, 120);
    return () => window.clearInterval(id);
  } catch {
    return () => {};
  }
}
