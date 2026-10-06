import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { fieldClass } from "@/components/common/contact-form";

const PLACE_ID_HELP =
  "https://developers.google.com/maps/documentation/places/web-service/place-id";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          toast.success(`${label} copied`);
          setTimeout(() => setOk(false), 1600);
        } catch {
          toast.error("Could not copy. Please select the text and copy it.");
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-brand hover:text-brand active:scale-95"
    >
      {ok ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
      {ok ? "Copied" : `Copy ${label}`}
    </button>
  );
}

export default function ReviewLink() {
  const [business, setBusiness] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [customer, setCustomer] = useState("");
  const [qr, setQr] = useState("");

  const id = placeId.trim();
  const valid = /^[A-Za-z0-9_-]{10,}$/.test(id);
  const link = valid ? `https://search.google.com/local/writereview?placeid=${id}` : "";
  const biz = business.trim() || "our business";

  const message = useMemo(
    () =>
      `Hi${customer.trim() ? ` ${customer.trim()}` : ""}, thank you for choosing ${biz}! If you were happy with our service, could you take 30 seconds to leave us a Google review? It really helps small businesses like ours.\n\n${link || "[your review link]"}\n\nThank you so much!`,
    [customer, biz, link],
  );

  useEffect(() => {
    let cancelled = false;
    if (!link) {
      setQr("");
      return;
    }
    import("qrcode")
      .then((QR) =>
        QR.toDataURL(link, { margin: 2, width: 512, color: { dark: "#0A1030", light: "#FFFFFF" } }),
      )
      .then((url) => {
        if (!cancelled) setQr(url);
      })
      .catch(() => {
        if (!cancelled) setQr("");
      });
    return () => {
      cancelled = true;
    };
  }, [link]);

  return (
    <div>
      <p className="text-sm text-white/60">
        Make a direct link (and printable QR code) that opens your Google review box in one tap.
        More reviews help you rank and win trust.
      </p>

      <div className="mt-5 space-y-3">
        <input
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="Your business name"
          className={fieldClass}
          maxLength={60}
        />
        <div>
          <input
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Your Google Place ID (looks like ChIJ...)"
            className={fieldClass}
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-white/45">
            Don't know it?{" "}
            <a
              href={PLACE_ID_HELP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand underline-offset-2 hover:underline"
            >
              Find your Place ID <ExternalLink size={11} />
            </a>{" "}
            (search your business name, then copy the Place ID).
          </p>
          {placeId && !valid && (
            <p className="mt-2 text-xs text-amber-300">
              That does not look like a Place ID yet. It is a long code made of letters and numbers.
            </p>
          )}
        </div>
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Customer's first name (optional, for the message)"
          className={fieldClass}
          maxLength={30}
        />
      </div>

      {valid && (
        <div className="mt-7 grid gap-6 sm:grid-cols-[auto_1fr]">
          <div className="mx-auto w-44 shrink-0">
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-glow">
              {qr ? (
                <img src={qr} alt="QR code for your Google review link" className="h-full w-full" />
              ) : (
                <div className="flex aspect-square items-center justify-center text-xs text-black/50">Making QR...</div>
              )}
            </div>
            {qr && (
              <a
                href={qr}
                download={`${biz.replace(/\s+/g, "-").toLowerCase()}-review-qr.png`}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-brand hover:text-brand"
              >
                <Download size={14} /> Download QR
              </a>
            )}
          </div>

          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Your review link</p>
              <p className="mt-2 break-all rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/80">
                {link}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton text={link} label="link" />
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-brand hover:text-brand active:scale-95"
                >
                  <ExternalLink size={14} /> Test it
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Ready-to-send message</p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 font-sans text-xs leading-relaxed text-white/80">
                {message}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton text={message} label="message" />
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1fb958] active:scale-95"
                >
                  <MessageCircle size={14} /> Send on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {!valid && (
        <p className="mt-6 text-center text-xs text-white/40">
          Add your Place ID above to create your link, QR code and message.
        </p>
      )}
    </div>
  );
}
