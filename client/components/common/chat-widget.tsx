import { FormEvent, useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { ChatBotIcon } from "@/components/common/brand-icons";
import { CONTACT } from "@/data/site";
import { deliverLead } from "@/lib/deliver-lead";

type Msg = { from: "bot" | "me"; text: string; link?: { href: string; label: string } };

const INTRO: Msg[] = [
  { from: "bot", text: "Hi! I'm Umair. How can I help you today?" },
];

const QUICK: { label: string; reply: Msg }[] = [
  {
    label: "Free Local SEO audit",
    reply: {
      from: "bot",
      text: "Great choice! Leave your details below and I will send you a free audit of your Google Business Profile.",
    },
  },
  {
    label: "Pricing",
    reply: {
      from: "bot",
      text: "Local SEO plans start from $125/month, and one-time projects from $65. You can see everything here:",
      link: { href: "#pricing", label: "View pricing" },
    },
  },
  {
    label: "I have a question",
    reply: {
      from: "bot",
      text: "Sure, type your question below along with your email and I will reply personally.",
    },
  },
];

/**
 * Chat-style contact box. It is not a live agent: messages are emailed to
 * CONTACT.email and answered by email or WhatsApp, usually within 24 hours.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INTRO);
  const [quickUsed, setQuickUsed] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open, done]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pick(q: (typeof QUICK)[number]) {
    setQuickUsed(true);
    setMsgs((m) => [...m, { from: "me", text: q.label }, q.reply]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (d._honey) return;
    setMsgs((m) => [...m, { from: "me", text: d.message }]);
    setSending(true);
    try {
      await deliverLead(
        { name: d.name, email: d.email, message: d.message },
        `Chat message from ${d.name}`,
      );
      setDone(true);
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: "Thank you! I got your message and will reply to your email soon, usually within 24 hours.",
        },
      ]);
      form.reset();
    } catch {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: "Sorry, I could not send that automatically. Please message me on WhatsApp instead:",
          link: {
            href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(d.message)}`,
            label: "Open WhatsApp",
          },
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat with Umair"
        aria-hidden={!open}
        className={`fixed bottom-24 right-3 z-[70] flex w-[calc(100vw-1.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-white/10 bg-background/95 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 md:bottom-24 md:right-5 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-brand-dark to-brand p-4 text-white">
          <img
            src="/umair.webp"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white/40 object-cover object-top"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-semibold leading-tight">Muhammad Umair</p>
            <p className="text-xs text-white/80">Replies within 24 hours</p>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <X size={16} />
          </button>
        </div>

        <div ref={bodyRef} className="max-h-72 space-y-3 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.from === "me"
                    ? "rounded-br-sm bg-brand text-brand-foreground"
                    : "rounded-bl-sm bg-white/10 text-white/90"
                }`}
              >
                {m.text}
                {m.link && (
                  <a
                    href={m.link.href}
                    target={m.link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={() => !m.link!.href.startsWith("http") && setOpen(false)}
                    className="mt-2 block font-semibold text-brand-light underline underline-offset-2"
                  >
                    {m.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}

          {!quickUsed && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => pick(q)}
                  className="rounded-full border border-brand/50 px-3 py-1.5 text-xs font-medium text-brand-light transition hover:bg-brand/15"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {!done && (
          <form onSubmit={onSubmit} className="space-y-2 border-t border-white/10 p-3">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid grid-cols-2 gap-2">
              <input
                name="name"
                required
                placeholder="Your name"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand"
              />
            </div>
            <div className="flex items-end gap-2">
              <textarea
                name="message"
                required
                rows={2}
                placeholder="Type your message..."
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition hover:bg-brand-dark disabled:opacity-60"
              >
                <Send size={17} />
              </button>
            </div>
          </form>
        )}
        {done && (
          <div className="border-t border-white/10 p-3 text-center">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-brand-light underline underline-offset-2"
            >
              Prefer WhatsApp? Chat there
            </a>
          </div>
        )}
      </div>

      {/* Launcher */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="chat-fab fixed bottom-24 right-3 z-[71] flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-glow-lg transition-transform hover:scale-110 md:bottom-5 md:right-5"
        style={open ? { display: "none" } : undefined}
      >
        <ChatBotIcon className="h-8 w-8 text-white drop-shadow" />
      </button>
    </>
  );
}
