import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MousePointerClick, Target, TrendingUp } from "lucide-react";
import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/common/brand-icons";
import { CONTACT } from "@/data/site";

const SOCIALS = [
  {
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    icon: GmailIcon,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${CONTACT.whatsapp}`,
    icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tararmuhammadumair",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/muhammad.umair.tarar/",
    icon: InstagramIcon,
  },
];

const HIGHLIGHTS = [
  { label: "Engagement", icon: TrendingUp, to: 78, prefix: "+", suffix: "%", decimals: 0, width: 78 },
  { label: "ROAS", icon: Target, to: 2.4, prefix: "", suffix: "x", decimals: 1, width: 60 },
  { label: "CTR", icon: MousePointerClick, to: 12, prefix: "+", suffix: "%", decimals: 0, width: 45 },
];

function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setV(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export const CtaSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal rounded-[2rem] bg-gradient-to-br from-brand/70 via-white/10 to-accent2/50 p-px shadow-glow-lg">
          <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-background/95 p-8 sm:p-12">
            {/* decorative glows and grid */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent2/20 blur-[100px]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 30% 40%, #000 10%, transparent 70%)",
                maskImage:
                  "radial-gradient(ellipse at 30% 40%, #000 10%, transparent 70%)",
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-6 text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  Let&rsquo;s create the next breakout campaign
                </span>

                <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-5xl">
                  Ready for performance that feels{" "}
                  <span className="brand-gradient">inevitable</span>?
                </h2>

                <p className="max-w-xl text-white/65">
                  Follow and connect with me for social updates, creative
                  previews, and quick responses.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#book"
                    className="magnetic btn-shimmer group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-brand-foreground shadow-glow transition hover:bg-brand-dark"
                  >
                    Book a Free Call
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="magnetic inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
                  >
                    <Mail className="h-4 w-4" /> Email me
                  </a>
                </div>

                <div className="pt-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
                    Find me on
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {SOCIALS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-lg shadow-black/30 ring-1 ring-white/40 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-glow"
                      >
                        <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                      Highlights
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                      Quick wins
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-7 space-y-6">
                  {HIGHLIGHTS.map(({ label, icon: Icon, width, ...num }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2.5 text-sm text-white/75">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                            <Icon className="h-4 w-4 text-brand" />
                          </span>
                          {label}
                        </span>
                        <span className="font-display text-xl font-semibold text-white">
                          <CountUp {...num} />
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="bar-fill h-full rounded-full bg-gradient-to-r from-brand-dark via-brand to-accent2 shadow-[0_0_14px_rgb(var(--brand)/0.6)]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
