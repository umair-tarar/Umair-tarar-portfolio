import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

const quoteClampStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  const initials = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return initials.toUpperCase();
};

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    rating?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollerRef = React.useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      // use valid animation-direction values: 'normal' or 'reverse'
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "normal",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      } else {
        // slow
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative flex h-[140px] w-[260px] max-w-full flex-shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 sm:h-[160px] sm:w-[320px] md:h-[200px] md:w-[420px] lg:w-[480px] dark:border-white/6 dark:bg-card"
            key={`${item.name}-${idx}`}
          >
            <blockquote className="relative z-10 flex h-full flex-col overflow-hidden">
              <div
                aria-hidden
                className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl opacity-80 pointer-events-none"
              />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-foreground/60">{item.title}</p>
                </div>
                <div className="flex items-center gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const pattern = [5, 4.5, 4] as const;
                    const rating = pattern[idx % pattern.length];
                    const full = rating >= i + 1;
                    const half = !full && rating >= i + 0.5;
                    if (full) {
                      return (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          strokeWidth={1}
                        />
                      );
                    }
                    if (half) {
                      return (
                        <StarHalf
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          strokeWidth={1}
                        />
                      );
                    }
                    return (
                      <Star
                        key={i}
                        className="h-4 w-4 text-foreground/30"
                        strokeWidth={1}
                      />
                    );
                  })}
                </div>
              </div>

              <p
                className="relative z-20 mt-4 text-sm leading-relaxed text-foreground/80 italic"
                style={quoteClampStyle}
              >
                “{item.quote}”
              </p>
            </blockquote>
          </li>
        ))}
        ​
      </ul>

      <style>{`\n        .scroller ul{ display:flex; }\n        @keyframes scroll { \n          from { transform: translateX(0); }\n          to { transform: translateX(calc(-50%)); }\n        }\n        .animate-scroll{ animation: scroll var(--animation-duration,40s) linear infinite var(--animation-direction,forwards); }\n      `}</style>
    </div>
  );
};

const testimonials = [
  // Social Media & SMM Reviews
  {
    quote:
      "I worked with Muhammad Umair Tarar for Social Media Marketing and I’m very satisfied. He understood my brand style and created content that felt natural and engaging. My audience response improved noticeably.",
    name: "Azka Khan",
    title: "Client",
    rating: 5,
  },
  {
    quote:
      "Umair handled our social media with creativity and consistency. From designing posts to running campaigns, everything was done in a professional way. Our online presence looks much stronger now.",
    name: "Cebrix Marketing",
    title: "Company",
    rating: 5,
  },
  {
    quote:
      "I hired Umair for SMM and he did a great job. His posts were consistent and engaging, and he managed the accounts with proper attention. Very reliable service.",
    name: "Hamza Sheikh",
    title: "Client",
    rating: 5,
  },
  {
    quote:
      "Umair managed my pages with a clear plan. The growth in interaction was natural and steady. He is easy to work with and very professional.",
    name: "Laiba Asghar",
    title: "Client",
    rating: 5,
  },
  {
    quote:
      "Thanks to Umair, my social media looks more organized and professional. The content feels relevant and the audience is more active now.",
    name: "Hassan Malik",
    title: "Client",
    rating: 5,
  },
  {
    quote:
      "Umair’s way of handling SMM is practical and results-focused. Within two months, my business visibility improved and I could see more customer engagement.",
    name: "Sana Khalid",
    title: "Client",
    rating: 5,
  },

  // Digital Media Marketing Reviews
  {
    quote:
      "We worked with Muhammad Umair Tarar for Digital Media Marketing. His campaigns helped us reach more people and improved our online visibility. The reporting was clear and the work was professional.",
    name: "Tech-Hub Faisalabad",
    title: "Organization — Digital Media Marketing",
    rating: 5,
  },
  {
    quote:
      "Umair managed my brand’s digital presence from the ground up. He took care of content and campaigns with great attention. I’m happy with the steady growth I’ve seen.",
    name: "Fatima Tarar",
    title: "Client — Digital Media Marketing",
    rating: 5,
  },
  {
    quote:
      "Umair’s digital marketing work has been very effective. He used the right strategies to bring more relevant visitors and leads to my business.",
    name: "Bilal Zafar",
    title: "Client — Digital Media Marketing",
    rating: 5,
  },
  {
    quote:
      "He is professional and knows how to run campaigns that bring genuine customers. My business started to reach the right audience online.",
    name: "Hira Imtiaz",
    title: "Client — Digital Media Marketing",
    rating: 5,
  },
  {
    quote:
      "Umair understands digital marketing well. His approach is both data-based and creative. I noticed real improvements in my online presence.",
    name: "Ahmed Raza",
    title: "Client — Digital Media Marketing",
    rating: 5,
  },
  {
    quote:
      "Our digital marketing was handled very smoothly by Umair. He provided regular updates and worked with full commitment. I highly recommend him.",
    name: "Mariam Khalid",
    title: "Client — Digital Media Marketing",
    rating: 5,
  },

  // Local SEO Reviews
  {
    quote:
      "Umair managed our Local SEO and Social Media together. We started showing up in Google Maps, and the number of inquiries increased. His work was very effective and professional.",
    name: "HyperNexis",
    title: "Company — Local SEO",
    rating: 5,
  },
  {
    quote:
      "I hired Umair for Local SEO and within a few months, my business appeared in the top 3 results for important keywords. This brought more calls and customers.",
    name: "Saad Farooq",
    title: "Client — Local SEO",
    rating: 5,
  },
  {
    quote:
      "Umair worked on my Google Business Profile and improved our local search visibility. The results were clear and helpful for my business.",
    name: "Ayesha Noman",
    title: "Client — Local SEO",
    rating: 5,
  },
  {
    quote:
      "Umair handled SEO for my business in a very transparent way. He explained the steps, shared reports, and achieved good results in a reasonable time.",
    name: "Salman Javed",
    title: "Client — Local SEO",
    rating: 5,
  },
  {
    quote:
      "He is professional, responsive, and result-oriented. Umair helped me improve my local search presence and attract more customers.",
    name: "Nida Shah",
    title: "Client — Local SEO",
    rating: 5,
  },
  {
    quote:
      "Local SEO was new to me but Umair made the process easy to understand. Thanks to his work, my business now gets regular calls through Google Maps.",
    name: "Danish Ali",
    title: "Client — Local SEO",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-black/60 via-background to-background py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-white">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Growth leaders trust M.Umair with their most audacious goals.
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />

          {/* Additional row moving in opposite direction */}
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="mt-2 [&_ul>li]:w-[260px] sm:[&_ul>li]:w-[320px] md:[&_ul>li]:w-[420px] lg:[&_ul>li]:w-[480px]"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
