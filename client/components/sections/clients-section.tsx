import SectionHeading from "@/components/common/section-heading";
import { CLIENTS, type Client } from "@/data/site";

function ClientItem({ client }: { client: Client }) {
  return (
    <div className="group flex shrink-0 items-center gap-4">
      {client.logo && (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          className="h-12 w-auto max-w-[9rem] object-contain opacity-80 transition duration-300 group-hover:opacity-100"
          loading="lazy"
          draggable={false}
        />
      )}
      <span className="whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-white/55 transition-colors duration-300 group-hover:text-white sm:text-3xl">
        {client.name}
      </span>
      <span aria-hidden className="ml-8 h-1.5 w-1.5 rounded-full bg-brand/60" />
    </div>
  );
}

export const ClientsSection = () => {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section
      id="clients"
      className="relative border-y border-white/10 bg-black/40 py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Trusted By Leading Teams"
          title="The best are already here"
        />
        <p className="reveal mt-6 max-w-3xl text-sm text-foreground/70">
          Category-defining startups and global operators collaborate with me
          to orchestrate momentum, compound growth, and deliver performance at
          scale.
        </p>
      </div>

      {/* Right-to-left ticker. Hover to pause. */}
      <div className="marquee-mask mt-14 overflow-hidden py-4" aria-label="Client names">
        <div
          className="marquee-track flex w-max items-center gap-8 pr-8"
          style={{ animationDuration: `${Math.max(30, CLIENTS.length * 6)}s` }}
        >
          {items.map((client, i) => (
            <ClientItem key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
