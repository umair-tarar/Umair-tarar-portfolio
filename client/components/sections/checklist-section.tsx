import { FormEvent, useState } from "react";
import { CheckCircle2, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/common/contact-form";
import { deliverLead } from "@/lib/deliver-lead";

const INCLUDES = [
  "Google Business Profile setup, step by step",
  "Citation and NAP consistency checks",
  "A simple review-getting system",
  "Website and on-page essentials",
  "Monthly tracking routine",
];

export default function ChecklistSection() {
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (d._honey) return;
    setSending(true);
    try {
      await deliverLead(
        {
          name: d.name,
          email: d.email,
          message: "Downloaded the free Local SEO checklist (PDF).",
        },
        `Checklist download: ${d.name}`,
      );
    } catch {
      // Never block the download because the notification failed.
    } finally {
      setSending(false);
      setUnlocked(true);
      toast.success("Your checklist is ready to download.");
    }
  }

  return (
    <section id="checklist" className="relative border-y border-white/10 bg-black/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="card-premium reveal grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <FileText size={14} /> Free PDF
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              The Local SEO Checklist
            </h2>
            <p className="mt-4 max-w-lg text-white/65">
              A simple, printable checklist to help your business show up on
              Google Maps. The same steps I follow when I optimize a profile.
            </p>
            <ul className="mt-6 space-y-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-background/60 p-6">
            {unlocked ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Download size={26} />
                </div>
                <h3 className="text-lg font-bold text-white">Your checklist is ready</h3>
                <Button
                  asChild
                  size="lg"
                  className="magnetic btn-shimmer w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-dark"
                >
                  <a href="/Local-SEO-Checklist.pdf" download>
                    <Download className="mr-2" size={18} /> Download the PDF
                  </a>
                </Button>
                <p className="text-xs text-white/40">
                  Tip: print it and tick each box as you go.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <h3 className="text-lg font-bold text-white">Get your free copy</h3>
                <p className="text-sm text-white/55">Enter your details to unlock the download.</p>
                <input name="name" required placeholder="Your name" className={fieldClass} />
                <input name="email" type="email" required placeholder="Email address" className={fieldClass} />
                <Button
                  type="submit"
                  disabled={sending}
                  size="lg"
                  className="magnetic btn-shimmer w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-dark"
                >
                  {sending ? "Please wait..." : "Unlock the free checklist"}
                </Button>
                <p className="text-center text-xs text-white/40">No spam. I will only use your email to send the checklist and reply to you.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
