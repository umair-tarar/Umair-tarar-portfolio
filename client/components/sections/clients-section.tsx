import SectionHeading from "@/components/common/section-heading";
import { CLIENTS, type Client } from "@/data/site";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="card-premium group flex w-64 shrink-0 flex-col items-center gap-4 rounded-3xl px-6 pb-6 pt-7 text-center">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-3 shadow-lg shadow-black/30 ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-105">
        {client.logo ? (
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark font-display text-2xl font-bold text-white">
            {initials(client.name)}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-lg font-semibold tracking-wide text-white">
          {client.name}
        </p>
        {client.category && (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            {client.category}
          </p>
        )}
      </div>
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

      {/* Right-to-left scrolling logos. Hover to pause. */}
      <div className="marquee-mask mt-14 overflow-hidden" aria-label="Client logos">
        <div
          className="marquee-track flex w-max gap-6 pr-6"
          style={{ animationDuration: `${Math.max(30, CLIENTS.length * 6)}s` }}
        >
          {items.map((client, i) => (
            <ClientCard key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
