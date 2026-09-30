import {
  ArrowUpRight,
  Facebook,
  MessageSquare,
  Instagram,
  Linkedin,
} from "lucide-react";

export const CtaSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/30 via-black/60 to-secondary/40 p-10 shadow-[0_28px_90px_rgba(8,81,192,0.35)]">
          <div className="absolute -top-10 right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-5 text-white">
              <span className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70">
                Let’s create the next breakout campaign
              </span>
              <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
                Ready for performance that feels inevitable?
              </h2>
              <p className="text-sm text-white/70">
                Follow and connect with me for social updates, creative
                previews, and quick responses.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/923116302186"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/6 transition hover:bg-white/10"
                  title="WhatsApp"
                >
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M20.52 3.48A11.91 11.91 0 0 0 12 0C5.37 0 .04 5.33.04 12c0 2.12.56 4.08 1.54 5.78L0 24l6.39-1.69A11.94 11.94 0 0 0 12 24c6.63 0 11.96-5.33 11.96-12 0-1.97-.46-3.84-1.44-5.52zM12 21.6c-1.2 0-2.37-.32-3.38-.93l-.24-.14-3.79 1 1.02-3.71-.16-.25A8.4 8.4 0 0 1 3.6 12c0-4.64 3.76-8.4 8.4-8.4 4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4z" />
                    <path
                      d="M17.6 14.2c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.78.96-.96 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2 0-.37-.02-.52-.02-.15-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.51-.17 0-.37-.02-.57-.02s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.2 3.08.14.2 2.07 3.16 5.02 4.43 2.95 1.27 2.95.85 3.48.8.53-.05 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/tararmuhammadumair"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/6 transition hover:bg-white/10"
                  title="Facebook"
                >
                  <Facebook className="h-6 w-6 text-white" />
                </a>

                <a
                  href="https://www.instagram.com/muhammad.umair.tarar/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/6 transition hover:bg-white/10"
                  title="Instagram"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </a>

                <a
                  href="https://www.linkedin.com/in/muhammad-umair-tarar/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/6 transition hover:bg-white/10"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 lg:justify-end">
              <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_24px_rgba(8,8,20,0.6)]">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                  Highlights
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Quick wins
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-foreground/70">
                      <span>Engagement</span>
                      <span className="font-semibold text-primary">+78%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/6">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm text-foreground/70">
                      <span>ROAS</span>
                      <span className="font-semibold text-primary">2.4x</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/6">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm text-foreground/70">
                      <span>CTR</span>
                      <span className="font-semibold text-primary">+12%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/6">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: "45%" }}
                      />
                    </div>
                  </div>
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
