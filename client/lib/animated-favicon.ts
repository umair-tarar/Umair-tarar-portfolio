/**
 * Animated browser-tab icon: the owner's photo inside a blue ring. A bright
 * highlight sweeps around the ring and the little map-pin badge pulses.
 * Drawn on a canvas and swapped in as the favicon. It pauses while the tab is
 * hidden and stays still for reduced motion. The static /favicon.svg and
 * /favicon.ico remain as fallbacks.
 */
const SIZE = 64;

function drawBadge(ctx: CanvasRenderingContext2D, scale: number) {
  const cx = 51;
  const cy = 51;
  const r = 12.5 * scale;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#0A1030";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
  ctx.fillStyle = "#2F6BF0";
  ctx.fill();

  // white pin
  const pr = r * 0.42;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.24, pr, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - pr * 0.82, cy - r * 0.04);
  ctx.lineTo(cx + pr * 0.82, cy - r * 0.04);
  ctx.lineTo(cx, cy + r * 0.62);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.24, pr * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#2F6BF0";
  ctx.fill();
}

function draw(ctx: CanvasRenderingContext2D, face: HTMLImageElement, phase: number) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  // ring
  const ring = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  ring.addColorStop(0, "#60A5FA");
  ring.addColorStop(1, "#1D4ED8");
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fillStyle = ring;
  ctx.fill();

  // sweeping highlight
  const a = phase * Math.PI * 2 - Math.PI / 2;
  ctx.beginPath();
  ctx.arc(32, 32, 29.5, a, a + 1.25);
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 3.4;
  ctx.lineCap = "round";
  ctx.stroke();

  // face
  ctx.save();
  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(face, 4, 4, 56, 56);
  ctx.restore();

  // pulsing pin badge
  drawBadge(ctx, 1 + 0.09 * Math.sin(phase * Math.PI * 4));
}

export function startAnimatedFavicon(): () => void {
  let stopped = false;
  let timer = 0;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

    const face = new Image();
    face.onload = () => {
      if (stopped) return;
      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // One dynamic icon link; remove the static ones so the browser uses it.
      document
        .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
        .forEach((l) => l.remove());
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      document.head.appendChild(link);

      const CYCLE = 2600; // ms per animation loop
      const start = performance.now();
      let first = true;
      const tick = () => {
        if (document.hidden && !first) return;
        first = false;
        const phase = ((performance.now() - start) % CYCLE) / CYCLE;
        draw(ctx, face, phase);
        link.href = canvas.toDataURL("image/png");
      };
      tick();
      timer = window.setInterval(tick, 120);
    };
    face.src = "/favicon-face.png";
  } catch {
    /* keep the static icon */
  }

  return () => {
    stopped = true;
    if (timer) window.clearInterval(timer);
  };
}
