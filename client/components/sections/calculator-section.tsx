import { FormEvent, useMemo, useState } from "react";
import { Calculator, Send, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/section-heading";
import { fieldClass } from "@/components/common/contact-form";
import { CALCULATOR, CONTACT } from "@/data/site";
import { deliverLead } from "@/lib/deliver-lead";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function CalculatorSection() {
  const [searches, setSearches] = useState(CALCULATOR.defaultSearches);
  const [value, setValue] = useState(CALCULATOR.defaultValue);
  const [closeRate, setCloseRate] = useState(CALCULATOR.defaultCloseRate);
  const [position, setPosition] = useState("none");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const result = useMemo(() => {
    const pos = CALCULATOR.positions.find((p) => p.id === position)!;
    const now = searches * pos.share;
    const top = searches * CALCULATOR.targetShare;
    const missedContacts = Math.max(0, top - now);
    const missedCustomers = missedContacts * (closeRate / 100);
    return {
      now,
      top,
      missedContacts,
      missedCustomers,
      missedRevenue: missedCustomers * value,
      posLabel: pos.label,
    };
  }, [searches, value, closeRate, position]);

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
          message: "Requested the full missed-customers report from the calculator.",
          extra: {
            "Monthly local searches": String(searches),
            "Current position": result.posLabel,
            "Value per customer": `$${value}`,
            "Close rate": `${closeRate}%`,
            "Estimated missed customers/month": fmt(result.missedCustomers),
            "Estimated missed revenue/month": `$${fmt(result.missedRevenue)}`,
          },
        },
        `Calculator lead: ${d.name}`,
      );
      setSent(true);
      form.reset();
      toast.success("Thank you! I will send your report soon.");
    } catch {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        "Missed customers report request",
      )}&body=${encodeURIComponent(
        `Name: ${d.name}\nEmail: ${d.email}\nBusiness: ${d.business || "-"}\nSearches: ${searches}\nPosition: ${result.posLabel}\nEstimated missed customers/month: ${fmt(result.missedCustomers)}`,
      )}`;
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="calculator" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Free Tool"
          title="How many customers are you missing?"
          center
        />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Enter a few numbers about your business and get a quick estimate of
          the local customers you may be losing to competitors on Google Maps.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* inputs */}
          <div className="card-premium reveal space-y-6 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
                <Calculator className="text-brand" size={22} />
              </span>
              <h3 className="text-xl font-bold">Your numbers</h3>
            </div>

            <label className="block space-y-2">
              <span className="flex justify-between text-sm text-white/75">
                Monthly local searches for your service
                <span className="font-semibold text-white">{fmt(searches)}</span>
              </span>
              <input
                type="range"
                min={100}
                max={20000}
                step={100}
                value={searches}
                onChange={(e) => setSearches(Number(e.target.value))}
                className="w-full accent-[rgb(var(--brand))]"
              />
              <span className="text-xs text-white/40">
                e.g. searches like "dentist near me" in your city
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-white/75">Where do you show on Google Maps today?</span>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`${fieldClass} bg-background`}
              >
                {CALCULATOR.positions.map((p) => (
                  <option key={p.id} value={p.id} className="bg-background">
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 items-end gap-4">
              <label className="block space-y-2">
                <span className="block text-sm text-white/75">Customer value ($)</span>
                <input
                  type="number"
                  min={1}
                  value={value}
                  onChange={(e) => setValue(Math.max(1, Number(e.target.value) || 1))}
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-2">
                <span className="block text-sm text-white/75" title="Share of contacts that become paying customers">Close rate (%)</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={closeRate}
                  onChange={(e) =>
                    setCloseRate(Math.min(100, Math.max(1, Number(e.target.value) || 1)))
                  }
                  className={fieldClass}
                />
              </label>
            </div>
          </div>

          {/* result */}
          <div className="panel reveal relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
                  <TrendingUp className="text-brand" size={22} />
                </span>
                <h3 className="text-xl font-bold">Your estimate</h3>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50">Contacts now</p>
                  <p className="mt-1 text-3xl font-extrabold text-white">{fmt(result.now)}</p>
                  <p className="text-xs text-white/40">per month</p>
                </div>
                <div className="rounded-2xl border border-brand/40 bg-brand/10 p-4">
                  <p className="text-xs uppercase tracking-wider text-white/60">At the top spot</p>
                  <p className="mt-1 text-3xl font-extrabold text-brand">{fmt(result.top)}</p>
                  <p className="text-xs text-white/40">per month</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/60">You could be missing about</p>
                <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">
                  {fmt(result.missedCustomers)}{" "}
                  <span className="text-lg font-semibold text-white/60">customers / month</span>
                </p>
                <p className="mt-2 text-lg font-semibold text-brand">
                  ≈ ${fmt(result.missedRevenue)} in monthly revenue
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/40">
                This is an estimate using illustrative averages, not a guarantee
                or a prediction of results. Real numbers depend on your city,
                competition and industry.
              </p>

              {sent ? (
                <p className="mt-6 rounded-2xl border border-brand/40 bg-brand/10 p-4 text-sm text-white">
                  Thank you! I will send your detailed report by email shortly.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-3">
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <p className="text-sm font-semibold text-white">
                    Want the full report for your business?
                  </p>
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
                    {sending ? "Sending..." : "Send me the report"}
                    <Send className="ml-2" size={16} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
