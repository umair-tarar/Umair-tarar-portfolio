import { CalendarCheck, ClipboardCheck } from "lucide-react";
import { WhatsAppMark } from "@/components/common/brand-icons";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/common/contact-form";
import SectionHeading from "@/components/common/section-heading";
import { CONTACT } from "@/data/site";

const AUDIT_ITEMS = [
  "Google Business Profile review",
  "Local ranking and competitor snapshot",
  "Citation and NAP consistency check",
  "Review strategy recommendations",
  "A prioritized action plan",
];

export default function BookingSection() {
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi Umair, I would like to book a free 30-minute call.",
  )}`;

  return (
    <section id="book" className="relative border-y border-white/10 bg-black/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Book a Slot"
          title="Book a free 30-minute call"
          center
        />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          A free, no-pressure conversation. We review your profile and
          competitors together, and you leave with an action plan whether you
          hire me or not.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="card-premium reveal p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15">
                <CalendarCheck className="text-brand" size={22} />
              </span>
              <h3 className="text-xl font-bold">Pick a time that suits you</h3>
            </div>

            {CONTACT.bookingUrl ? (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white">
                <iframe
                  title="Book a call"
                  src={`${CONTACT.bookingUrl}${CONTACT.bookingUrl.includes("?") ? "&" : "?"}hide_gdpr_banner=1&primary_color=3b82f6`}
                  className="h-[640px] w-full"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="text-sm leading-relaxed text-white/65">
                  Send the short form and I will reply with available times,
                  or message me directly and we will fix a slot together.
                </p>
                <ul className="space-y-3">
                  {AUDIT_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <ClipboardCheck
                        size={18}
                        className="mt-0.5 shrink-0 text-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="magnetic btn-shimmer w-full rounded-full bg-[#25D366] text-white hover:bg-[#1fb958]"
                >
                  <a href={waLink} target="_blank" rel="noreferrer">
                    <WhatsAppMark className="mr-2 h-5 w-5" />
                    Book on WhatsApp
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="panel reveal p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
