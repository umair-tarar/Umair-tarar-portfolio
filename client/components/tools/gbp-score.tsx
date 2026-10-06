import { FormEvent, useMemo, useState } from "react";
import { Check, RotateCcw, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/common/contact-form";
import { deliverLead } from "@/lib/deliver-lead";

type Item = { id: string; label: string; weight: number; tip: string };

const ITEMS: Item[] = [
  { id: "verified", label: "My Google Business Profile is claimed and verified", weight: 15, tip: "Claim and verify your profile first. Almost everything else depends on it." },
  { id: "category", label: "My primary category matches my main service exactly", weight: 12, tip: "Choose the most specific primary category, then add secondary ones for other services." },
  { id: "nap", label: "My name, address and phone match my website and other listings", weight: 12, tip: "Make your name, address and phone number identical everywhere online." },
  { id: "reviews", label: "I get new reviews regularly", weight: 10, tip: "Ask every happy customer for a review with a direct link, and do it consistently." },
  { id: "services", label: "I have listed my services or products with descriptions", weight: 8, tip: "Add each service with a short, clear description." },
  { id: "photos", label: "I have added real photos (logo, cover, team, my work)", weight: 8, tip: "Upload real photos of your place and your work, and add new ones often." },
  { id: "website", label: "My profile links to a website with pages for my services and location", weight: 8, tip: "Create a page for each main service and area you serve, and link to it." },
  { id: "hours", label: "My opening hours (including holidays) are correct", weight: 6, tip: "Keep hours accurate, and update special hours for holidays." },
  { id: "posts", label: "I post updates, offers or events on my profile", weight: 6, tip: "Post a short update, offer or event every week." },
  { id: "replies", label: "I reply to reviews, good and bad", weight: 6, tip: "Reply to every review politely, ideally within a couple of days." },
  { id: "description", label: "I have written a clear business description", weight: 5, tip: "Write a clear description of what you do and who you serve, without keyword stuffing." },
  { id: "contact", label: "Customers can call, message or book straight from my profile", weight: 4, tip: "Turn on messaging or add a booking link so customers can act in one tap." },
];

function tier(score: number) {
  if (score >= 75) return { label: "Strong foundation", note: "You have the basics covered. Now it is about consistency and standing out from competitors.", color: "#34d399" };
  if (score >= 45) return { label: "Getting there", note: "There are clear gaps. Fixing the top items below can make a real difference.", color: "#fbbf24" };
  return { label: "Needs attention", note: "Your profile is missing key things that Google and customers look for. The good news is that these are fixable.", color: "#f87171" };
}

export default function GbpScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const score = useMemo(
    () => ITEMS.reduce((sum, it) => sum + (answers[it.id] ? it.weight : 0), 0),
    [answers],
  );
  const missing = useMemo(
    () => ITEMS.filter((it) => !answers[it.id]).sort((a, b) => b.weight - a.weight),
    [answers],
  );
  const result = tier(score);
  const answered = Object.keys(answers).length;

  const circumference = 2 * Math.PI * 52;

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
          business: d.business,
          message: "Requested the full action plan after the Google Business Profile score tool.",
          extra: {
            "GBP score": `${score}/100 (${result.label})`,
            "Top missing items": missing.slice(0, 5).map((m) => m.label).join("; ") || "None",
          },
        },
        `GBP score lead: ${d.name} (${score}/100)`,
      );
      setSent(true);
      form.reset();
      toast.success("Thank you! I will send your action plan soon.");
    } catch {
      toast.error("Could not send right now. Please use the Book a Slot form below.");
    } finally {
      setSending(false);
    }
  }

  if (!done) {
    return (
      <div>
        <p className="text-sm text-white/60">
          Tick everything that is true for your business. It takes about a minute.
        </p>
        <ul className="mt-5 space-y-2.5">
          {ITEMS.map((it) => {
            const on = !!answers[it.id];
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [it.id]: !a[it.id] }))}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200 active:scale-[0.99] ${
                    on
                      ? "border-brand/60 bg-brand/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      on ? "border-brand bg-brand text-brand-foreground" : "border-white/25 text-transparent"
                    }`}
                  >
                    <Check size={14} />
                  </span>
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-white/45">{answered} of {ITEMS.length} answered</p>
          <Button
            type="button"
            onClick={() => setDone(true)}
            className="magnetic btn-shimmer rounded-full bg-brand px-7 text-brand-foreground hover:bg-brand-dark"
          >
            Show my score
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-36 w-36 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={result.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - score / 100)}
              style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.2,0.8,0.2,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-extrabold text-white">{score}</span>
            <span className="text-xs text-white/50">out of 100</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl font-bold" style={{ color: result.color }}>
            {result.label}
          </p>
          <p className="mt-2 text-sm text-white/65">{result.note}</p>
        </div>
      </div>

      {missing.length > 0 && (
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Fix these first</p>
          <ul className="mt-3 space-y-2.5">
            {missing.slice(0, 4).map((m) => (
              <li key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-sm font-semibold text-white">{m.label}</p>
                <p className="mt-1 text-xs text-white/60">{m.tip}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-white/10 bg-background/60 p-5">
        {sent ? (
          <p className="text-sm text-white">Thank you! I will email you a personal action plan soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <p className="text-sm font-semibold text-white">Want a personal action plan for your profile?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Your name" className={fieldClass} />
              <input name="email" type="email" required placeholder="Email address" className={fieldClass} />
            </div>
            <input name="business" placeholder="Business name (optional)" className={fieldClass} />
            <Button
              type="submit"
              disabled={sending}
              className="magnetic btn-shimmer w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-dark"
            >
              {sending ? "Sending..." : "Send me the plan"} <Send className="ml-2" size={15} />
            </Button>
          </form>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setAnswers({});
          setDone(false);
          setSent(false);
        }}
        className="mt-5 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"
      >
        <RotateCcw size={14} /> Start again
      </button>
    </div>
  );
}
