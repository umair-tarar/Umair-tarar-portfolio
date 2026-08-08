const stages = [
  {
    title: "Discover & Decode",
    description:
      "Channel audits, audience mapping, and creative testing uncover the whitespace that powers scalable growth.",
    outcome: "Opportunity intelligence framework",
  },
  {
    title: "Design & Prototype",
    description:
      "Creative sprints align message, offer, and funnel. I prototype ads, landing pages, and content concepts in parallel.",
    outcome: "Full-funnel campaign blueprint",
  },
  {
    title: "Launch & Accelerate",
    description:
      "Paid, lifecycle and content pods launch in synchronized cycles with tracking layered for fast feedback and iteration.",
    outcome: "Integrated performance dashboard",
  },
  {
    title: "Optimize & Scale",
    description:
      "Weekly media councils prioritize experimentation. I tune creative velocity, retention levers, and efficient channel spend.",
    outcome: "Predictable acquisition efficiency",
  },
];

export const ApproachSection = () => {
  return (
    <section
      id="approach"
      className="relative border-y border-white/10 bg-black/50 py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-white">
            My Method
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            A sprint-based operating system engineered for momentum.
          </h2>
          <p className="text-sm text-foreground/70">
            The M.Umair media marketing system aligns experimentation, channel
            velocity, and conversion goals across your brand. Every stage is
            measurable, collaborative, and built for performance.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <article
              key={stage.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/20 transition duration-300 hover:border-accent/50 hover:bg-accent/5 h-full flex flex-col"
            >
              <div className="flex-1">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                    Phase {index + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                    {stage.title === "Optimize & Scale" ? (
                      <>
                        Optimize &amp; <span className="block">Scale</span>
                      </>
                    ) : (
                      stage.title
                    )}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-xs uppercase tracking-[0.2em] text-foreground/60">
                <p className="text-[0.65rem] text-foreground/40">Key Output</p>
                <p className="mt-1 text-foreground/80">{stage.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
