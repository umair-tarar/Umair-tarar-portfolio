import { Suspense, lazy, useEffect, useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROTATING_WORDS } from "@/data/site";
import { canRender3D } from "@/hooks/use-site-effects";

const HeroScene = lazy(() => import("@/components/common/hero-scene"));

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span key={i} className="word-swap brand-gradient inline-block whitespace-nowrap">
      {ROTATING_WORDS[i]}
    </span>
  );
}

const CHIPS = [
  { icon: MapPin, label: "Google Maps", pos: "left-0 top-4 sm:-left-2", delay: "0s" },
  { icon: Star, label: "More reviews", pos: "right-0 top-16 sm:-right-2", delay: "1.2s" },
  { icon: Phone, label: "More calls", pos: "left-2 bottom-12 sm:-left-4", delay: "2.1s" },
  { icon: Navigation, label: "Directions", pos: "right-2 bottom-4", delay: "0.6s" },
];

const HeroSection = () => {
  const [show3D, setShow3D] = useState(false);
  useEffect(() => setShow3D(canRender3D()), []);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-bg">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="hero-grid" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pt-16">
        <div>
          <span
            style={{ animationDelay: "0ms" }}
            className="hero-in glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Booking new clients this month
          </span>

          <p
            style={{ animationDelay: "120ms" }}
            className="hero-in mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-brand"
          >
            Digital Marketer &amp; Local SEO Specialist
          </p>

          <h1
            style={{ animationDelay: "240ms" }}
            className="hero-in mt-3 text-balance text-4xl font-semibold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
          >
            Get found on <RotatingWord />
            <span className="block text-white/95">and turn searches into customers.</span>
          </h1>

          <p
            style={{ animationDelay: "380ms" }}
            className="hero-in mt-6 max-w-xl text-base text-foreground/70 sm:text-lg"
          >
            I'm Muhammad Umair Tarar. I help local businesses rank higher on
            Google Maps and grow with SEO, social media and Meta Ads, turning
            attention into calls, bookings and loyal customers.
          </p>

          <div
            style={{ animationDelay: "520ms" }}
            className="hero-in mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#book"
              className="magnetic btn-shimmer group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-brand-foreground shadow-glow-lg transition hover:bg-brand-dark"
            >
              Book a Free Audit
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/resume"
              className="magnetic inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              View Resume
            </Link>
          </div>

          <div
            style={{ animationDelay: "660ms" }}
            className="hero-in mt-8 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
          >
            <p className="font-semibold text-foreground">
              "Muhammad Umair elevated our social performance in no time."
            </p>
            <p className="mt-1 text-xs text-foreground/50">— Azka Khan</p>
          </div>
        </div>

        {/* 3D scene + timeline */}
        <div className="space-y-6">
          <div className="relative mx-auto h-[300px] w-full max-w-md sm:h-[340px]">
            <div className="absolute inset-6 -z-10 rounded-full bg-brand/20 blur-3xl" />
            <div className="hero-orbit" aria-hidden />
            {show3D ? (
              <div className="absolute inset-0">
                <Suspense fallback={null}>
                  <HeroScene />
                </Suspense>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="animate-float text-brand" size={120} strokeWidth={1.2} />
              </div>
            )}
            {CHIPS.map(({ icon: Icon, label, pos, delay }) => (
              <div
                key={label}
                className={`glass absolute ${pos} flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow`}
                style={{ animation: `float 6s ease-in-out ${delay} infinite` }}
              >
                <Icon size={13} className="text-brand" />
                {label}
              </div>
            ))}
          </div>

          <article className="card-premium reveal px-8 pb-8 pt-7">
            <div className="space-y-6 text-sm text-foreground/70">
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                Timeline
              </span>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent2" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Digital Marketer &amp; Local SEO Specialist
                    </p>
                    <p className="text-xs text-foreground/60">
                      Managed client acquisition, local and on-page SEO
                      campaigns, WordPress sites, and social media growth
                      strategies across channels.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/80" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Business Development Manager
                    </p>
                    <p className="text-xs text-foreground/60">
                      Led construction and estimation pipelines, refined
                      strategies, optimized leads, and strengthened industry
                      network.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_18px_rgba(8,81,192,0.15)]" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Lead Generation Expert
                    </p>
                    <p className="text-xs text-foreground/60">
                      Targeted architects and estimation services, building
                      campaigns, optimizing outreach, and improving conversion
                      metrics.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
