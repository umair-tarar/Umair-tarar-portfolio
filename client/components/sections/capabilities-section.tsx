import {
  BarChart3,
  Megaphone,
  Sparkles,
  Globe,
  MapPin,
  Code,
  Search,
  Link,
} from "lucide-react";

const capabilities = [
  {
    title: "Social Media Marketing",
    description:
      "Content strategy, community management, and feed-to-funnel creative that drives engagement and conversions.",
    icon: Megaphone,
    highlights: [
      "Content calendars",
      "Community growth",
      "Performance content",
    ],
  },
  {
    title: "Meta Ads",
    description:
      "Targeted Facebook & Instagram advertising with creative testing and budget optimization for ROAS.",
    icon: BarChart3,
    highlights: [
      "Creative testing",
      "Budget optimization",
      "Pixel & conversion setup",
    ],
  },
  {
    title: "On-page SEO",
    description:
      "Technical audits, schema, meta optimization, and content tuning to improve SERP visibility.",
    icon: Search,
    highlights: ["Technical SEO", "Schema markup", "Content optimization"],
  },
  {
    title: "Off-page SEO",
    description:
      "Link-building strategies, outreach, and PR-driven authority building to increase domain strength.",
    icon: Link,
    highlights: ["Link acquisition", "Digital PR", "Content amplification"],
  },
  {
    title: "Local SEO",
    description:
      "Google Business Profile optimization, local citations, and geo-targeted content to win local searches.",
    icon: MapPin,
    highlights: ["GBP optimization", "Local citations", "Localized content"],
  },
  {
    title: "WordPress",
    description:
      "Site builds, migrations, and performance tuning to ensure scalable, secure WordPress experiences.",
    icon: Globe,
    highlights: [
      "Migrations & builds",
      "Performance tuning",
      "Plugin & security audits",
    ],
  },
];

export const CapabilitiesSection = () => {
  return (
    <section
      id="services"
      className="relative border-y border-white/10 bg-black/40 py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-white">
              Offerings
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Everything your growth squad needs, plugged into one crew.
            </h2>
            <p className="max-w-xl text-sm text-foreground/70">
              From the first spark to scaled performance, I embed with your team
              to deliver conversion-obsessed strategy, unmistakable creative,
              and systemized execution.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm text-primary-foreground shadow-inner shadow-primary/30">
            <p className="font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
              What sets me apart
            </p>
            <p className="mt-3 text-primary-foreground/70">
              Transparent sprints, high-velocity experiment design, and a
              performance narrative that keeps leadership obsessed with the
              data.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article
                key={capability.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl transition duration-300 group-hover:opacity-100" />
                <div className="relative space-y-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {capability.description}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-white">
                    {capability.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
