import { useState } from "react";
import { GraduationCap, MapPin, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/section-heading";
import { CONTACT } from "@/data/site";

const FOCUS = [
  "Local SEO",
  "Google Business Profile",
  "Meta Ads",
  "Social Media",
  "Lead Generation",
  "WordPress",
];

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  const isFile = /\.(mp4|webm)(\?|$)/i.test(url);
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white"
        >
          <X size={18} />
        </button>
        <div className="aspect-video">
          {isFile ? (
            <video src={url} controls autoPlay className="h-full w-full" />
          ) : (
            <iframe
              src={url}
              title="Intro video"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [video, setVideo] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Photo */}
          <div data-parallax="0.07" className="reveal tilt relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand/25 blur-3xl" />
            <div className="rounded-[2rem] bg-gradient-to-br from-brand via-accent2/60 to-brand-dark p-[2px] shadow-glow-lg">
              <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-background">
                <img
                  src="/umair.webp"
                  alt="Muhammad Umair Tarar, Digital Marketer and Local SEO Specialist"
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xl font-bold text-white">
                    Muhammad Umair Tarar
                  </p>
                  <p className="text-sm text-white/70">
                    Digital Marketer &amp; Local SEO Specialist
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass absolute -left-4 top-10 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-glow sm:flex"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <MapPin size={14} className="text-brand" /> Local SEO
            </div>
            <div
              className="glass absolute -right-4 top-1/2 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-glow sm:flex"
              style={{ animation: "float 6s ease-in-out 1.5s infinite" }}
            >
              Meta Ads
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionHeading eyebrow="About Me" title="Helping local businesses get found and chosen" />
            <div className="reveal mt-8 space-y-5 text-foreground/70">
              <p>
                I'm <span className="font-semibold text-white">Muhammad Umair Tarar</span>, a
                results-driven Digital Marketer and Local SEO Specialist. I help
                local businesses rank on Google Maps, and I back that up with
                social media, Meta Ads and lead generation, so the people who
                find you are also the people who buy.
              </p>
              <p>
                My background spans social media marketing, SEO campaigns,
                WordPress sites and business development in construction and
                estimation. That mix means I think about the whole journey, from
                the first search to the final phone call.
              </p>
            </div>

            <div className="reveal mt-6 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span
                  key={f}
                  className="glass rounded-full px-4 py-1.5 text-xs font-medium text-white/85"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="reveal mt-6 space-y-2 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-brand" />
                Bachelor of Computer Science, Riphah International University
              </div>
            </div>

            <div className="reveal mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="magnetic btn-shimmer rounded-full bg-brand px-7 text-brand-foreground shadow-glow-lg hover:bg-brand-dark"
              >
                <a href="#book">Book a Free Call</a>
              </Button>
              {CONTACT.introVideoUrl && (
                <button
                  type="button"
                  onClick={() => setVideo(true)}
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-white"
                >
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
                    <Play size={18} className="relative text-white" fill="currentColor" />
                  </span>
                  Watch my 1-minute intro
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {video && CONTACT.introVideoUrl && (
        <VideoModal url={CONTACT.introVideoUrl} onClose={() => setVideo(false)} />
      )}
    </section>
  );
}
