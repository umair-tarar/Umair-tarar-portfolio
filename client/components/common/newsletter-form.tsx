import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { deliverLead } from "@/lib/deliver-lead";

/** Monthly Local SEO tips signup. Signups are emailed to the site owner. */
export default function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (d._honey) return;
    setState("sending");
    try {
      await deliverLead(
        {
          name: "Newsletter subscriber",
          email: d.email,
          message: "Please add me to the monthly Local SEO tips list.",
        },
        "Newsletter signup",
      );
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
            <Mail size={22} />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">
              One Local SEO tip every month
            </h3>
            <p className="mt-1 text-sm text-white/60">
              Short, practical ideas to rank higher on Google Maps. No spam.
            </p>
          </div>
        </div>

        {state === "done" ? (
          <p className="rounded-2xl border border-brand/40 bg-brand/10 px-5 py-3 text-sm text-white">
            You're on the list. Thank you!
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email address"
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand sm:w-72"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="magnetic btn-shimmer rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand-dark disabled:opacity-60"
            >
              {state === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
      {state === "error" && (
        <p className="mt-3 text-center text-xs text-white/50">
          Could not subscribe right now. Please email {""}
          <a className="underline" href="mailto:tararu810@gmail.com">
            tararu810@gmail.com
          </a>{" "}
          instead.
        </p>
      )}
    </div>
  );
}
