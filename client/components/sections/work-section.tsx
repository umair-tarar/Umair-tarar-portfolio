import React, { useState } from "react";
import Lightbox from "@/components/ui/lightbox";

const platforms = [
  {
    id: "facebook",
    title: "Facebook",
    description:
      "Campaign performance, creative insights, and audience trends.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F6d06ba76753445c38e130bc1fe8d8a2d%2Fbd9de3e88f7b4a2c9b4986e5ced66c47?format=webp&width=1200",
      "https://cdn.builder.io/api/v1/image/assets%2F6d06ba76753445c38e130bc1fe8d8a2d%2Fe0643eacee324034b5354aa9ff4eb319?format=webp&width=1200",
      "https://cdn.builder.io/api/v1/image/assets%2F6d06ba76753445c38e130bc1fe8d8a2d%2F96ab48bb177d47bebf3dd76aff0ec7f9?format=webp&width=1200",
    ],
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Creative hooks, Reels performance, and engagement metrics.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2Fb270f1b6afc8426e95e39d891860ccf3?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2Fbbde38d82fef4a008520be7c87af3608?format=webp&width=800",
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2F7adbbb86fb2a49fbbef9f3b63df9e80a?format=webp&width=800",
    ],
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "B2B reach, content testing, and lead generation signals.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2F0932b4643095466693e2f8a121bde345?format=webp&width=1200",
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2Feffd7ca5f17c47468cd4cc7ecc30940a?format=webp&width=1200",
      "https://cdn.builder.io/api/v1/image/assets%2F9520530dc4ad40b69e10a60f5d1acf5b%2F17773d4a48a14d31aeff1a1d74ddfe84?format=webp&width=1200",
    ],
  },
];

export const WorkSection = () => {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  return (
    <section
      id="work"
      className="relative border-y border-white/10 bg-black/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-white">
            Work
          </span>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Insights & Case Studies
          </h2>
          <p className="text-sm text-foreground/70">
            Practical takeaways and performance snapshots across platforms.
            Below are platform-specific galleries and example creative
            placeholders.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {platforms.map((p) => (
            <div key={p.id} id={`work-${p.id}`} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{p.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
                {Array.from({ length: 3 }).map((_, index) => {
                  const imageSrc = p.images?.[index];

                  return (
                    <button
                      key={`${p.id}-image-${index}`}
                      type="button"
                      className="group relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={() =>
                        imageSrc &&
                        p.images &&
                        setLightbox({ images: p.images, index })
                      }
                    >
                      {imageSrc ? (
                        <div
                          className="flex w-full items-center justify-center"
                          style={{ padding: 0 }}
                        >
                          <div
                            style={{ width: "100%", aspectRatio: "1100 / 600" }}
                            className="max-w-full"
                          >
                            <img
                              src={imageSrc}
                              alt={`${p.title} performance insight chart ${index + 1}`}
                              className="w-full h-full object-contain rounded-xl transition duration-200"
                              loading="lazy" decoding="async"
                              draggable={false}
                            />
                          </div>
                          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                      ) : (
                        <div
                          className="flex w-full items-center justify-center"
                          style={{ aspectRatio: "1100 / 600" }}
                        >
                          <div className="text-foreground/30">
                            Image {index + 1}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default WorkSection;
