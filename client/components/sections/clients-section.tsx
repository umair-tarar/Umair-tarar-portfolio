import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

const clientLogos: Logo[] = [
  {
    id: "cebrix-marketing",
    name: "Cebrix Marketing",
    labelLines: ["Cebrix", "Marketing"],
  },
  {
    id: "tech-hub-faisalabad",
    name: "Tech-Hub Faisalabad",
    labelLines: ["Tech-Hub", "Faisalabad"],
  },
  {
    id: "hypernexis",
    name: "HyperNexis",
    labelLines: ["Hyper", "Nexis"],
  },
  {
    id: "careerconnectly",
    name: "CareerConnectly",
    labelLines: ["Career", "Connectly"],
  },
  {
    id: "dep-llc",
    name: "DEP LLC",
    labelLines: ["DEP", "LLC"],
  },
  {
    id: "quickbid-estimating",
    name: "QuickBid Estimating",
    labelLines: ["QuickBid", "Estimating"],
  },
  {
    id: "surblund-international",
    name: "Surblund International",
    labelLines: ["Surblund", "International"],
  },
  {
    id: "global-turbo",
    name: "Global Turbo",
    labelLines: ["Global", "Turbo"],
  },
];

export const ClientsSection = () => {
  return (
    <section
      id="clients"
      className="relative border-y border-white/10 bg-black/40 py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">
            Trusted By Leading Teams
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            The best are already here
          </h2>
          <p className="mt-4 text-sm text-foreground/70">
            Category-defining startups and global operators collaborate with me
            to orchestrate momentum, compound growth, and deliver performance at
            scale.
          </p>
        </div>

        <div className="mt-12">
          <LogoCarousel logos={clientLogos} columns={3} className="gap-8" />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
