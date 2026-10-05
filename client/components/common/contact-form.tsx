import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import { WhatsAppMark } from "@/components/common/brand-icons";
import AnimatedCheck from "@/components/common/animated-check";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { deliverLead, leadSummary, type Lead } from "@/lib/deliver-lead";

export const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failedLead, setFailedLead] = useState<Lead | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    if (data._honey) return; // honeypot

    const lead: Lead = {
      name: data.name,
      email: data.email,
      business: data.business ?? "",
      link: data.link ?? "",
      message: data.message,
    };

    setSending(true);
    try {
      await deliverLead(lead, `New Local SEO audit request from ${lead.name}`);
      setSent(true);
      form.reset();
      toast.success("Thank you! Your request was sent. I will reply soon.");
    } catch {
      setFailedLead(lead); // never lose a lead
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-[20rem] flex-col items-center justify-center gap-3 text-center">
        <AnimatedCheck className="h-16 w-16" />
        <h3 className="text-xl font-bold text-white">Request received</h3>
        <p className="max-w-xs text-sm text-white/65">
          Thank you! I will review your details and reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  if (failedLead) {
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `New Local SEO audit request from ${failedLead.name}`,
    )}&body=${encodeURIComponent(leadSummary(failedLead))}`;
    const whatsapp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      `Hi Umair, I would like a free Local SEO audit.\n\n${leadSummary(failedLead)}`,
    )}`;
    return (
      <div className="space-y-4 text-center">
        <h3 className="text-lg font-bold text-white">
          One more step to send your request
        </h3>
        <p className="text-sm text-white/65">
          The automatic sender is unavailable right now, but your details are
          saved. Choose one option and your message will be pre-filled:
        </p>
        <Button
          asChild
          size="lg"
          className="w-full rounded-full bg-brand text-brand-foreground shadow-glow hover:bg-brand-dark"
        >
          <a href={mailto}>
            <Mail className="mr-2" size={16} /> Send by email
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full rounded-full border-white/20 bg-transparent text-white"
        >
          <a href={whatsapp} target="_blank" rel="noreferrer">
            <WhatsAppMark className="mr-2 h-4 w-4 text-[#25D366]" /> Send on WhatsApp
          </a>
        </Button>
        <button
          type="button"
          onClick={() => setFailedLead(null)}
          className="text-sm text-white/50 underline-offset-4 hover:underline"
        >
          Go back and edit my details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
        Request your free audit
      </h3>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={fieldClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className={fieldClass}
        />
      </div>
      <input name="business" placeholder="Business name" className={fieldClass} />
      <input
        name="link"
        placeholder="Website or Google Business Profile link (optional)"
        className={fieldClass}
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell me about your business and your goals"
        className={`${fieldClass} resize-none`}
      />
      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="w-full rounded-full bg-brand text-brand-foreground shadow-glow hover:bg-brand-dark"
      >
        {sending ? "Sending..." : "Send Request"}
        <Send className="ml-2" size={16} />
      </Button>
      <p className="text-center text-xs text-white/40">
        No spam. I usually reply within 24 hours.
      </p>
    </form>
  );
}
