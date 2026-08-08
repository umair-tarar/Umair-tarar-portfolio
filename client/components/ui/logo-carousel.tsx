import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type Logo = {
  id: string | number;
  name: string;
  src?: string | null;
  labelLines?: string[];
};

interface LogoColumnProps {
  logos: Logo[];
  columnIndex: number;
  currentTime: number;
  cycleDuration: number;
}

const COLUMN_DELAY = 200;
const LogoColumn = ({
  logos,
  columnIndex,
  currentTime,
  cycleDuration,
}: LogoColumnProps) => {
  if (logos.length === 0) {
    return null;
  }

  const cycleLength = cycleDuration * logos.length;
  const adjustedTime =
    (((currentTime + columnIndex * COLUMN_DELAY) % cycleLength) + cycleLength) %
    cycleLength;
  const currentIndex = Math.floor(adjustedTime / cycleDuration);
  const currentLogo = logos[currentIndex];
  const hasImage = Boolean(currentLogo.src);
  const labelLines = currentLogo.labelLines?.length
    ? currentLogo.labelLines
    : [currentLogo.name];

  return (
    <motion.div
      className="relative flex h-20 w-[9rem] items-center justify-center overflow-visible p-3 md:h-24 md:w-[11rem]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: columnIndex * 0.08,
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "15%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 26,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            transition: { duration: 0.25, ease: "easeInOut" },
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full bg-card/60 backdrop-blur-md ring-1 ring-white/5 rounded-2xl px-4 py-3 shadow-sm flex items-center justify-center overflow-hidden">
              {hasImage ? (
                <motion.img
                  src={currentLogo.src ?? undefined}
                  alt={currentLogo.name}
                  className="h-full w-full object-contain"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  initial={false}
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                  {labelLines.map((line) => (
                    <span
                      key={line}
                      className="tracking-wide text-white font-bold text-lg md:text-xl"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

interface LogoCarouselProps {
  logos: Logo[];
  columns?: number;
  className?: string;
  cycleDuration?: number;
}

const DEFAULT_CYCLE_DURATION = 2200;
const TICK_INTERVAL = 120;

export function LogoCarousel({
  logos,
  columns = 3,
  className,
  cycleDuration = DEFAULT_CYCLE_DURATION,
}: LogoCarouselProps) {
  const sanitizedLogos = useMemo(() => {
    return logos
      .map((logo, index) => {
        if (!logo) {
          return null;
        }

        const name = typeof logo.name === "string" ? logo.name.trim() : "";
        const src =
          typeof logo.src === "string" && logo.src.trim().length > 0
            ? logo.src.trim()
            : undefined;
        const labelLines = Array.isArray(logo.labelLines)
          ? logo.labelLines
              .map((line) =>
                typeof line === "string" ? line.trim() : undefined,
              )
              .filter((line): line is string => Boolean(line))
          : undefined;

        if (!name) {
          return null;
        }

        return {
          id: logo.id ?? index,
          name,
          src,
          labelLines,
        } satisfies Logo;
      })
      .filter((logo): logo is Logo => Boolean(logo));
  }, [logos]);

  const [logoColumns, setLogoColumns] = useState<Logo[][]>([]);
  const [time, setTime] = useState(0);

  const [effectiveColumns, setEffectiveColumns] = useState<number>(() => {
    if (typeof window === "undefined") return columns;
    const w = window.innerWidth;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return columns;
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      let c = columns;
      if (w < 768) c = 2;
      else if (w < 1024) c = 3;
      else c = columns;
      setEffectiveColumns(Math.max(1, Math.min(c, sanitizedLogos.length)));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [columns, sanitizedLogos.length]);

  const distributeLogos = useCallback(() => {
    if (sanitizedLogos.length === 0) {
      return [];
    }

    const effective = Math.max(
      1,
      Math.min(effectiveColumns, sanitizedLogos.length),
    );

    const shuffled = [...sanitizedLogos];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const result: Logo[][] = Array.from({ length: effective }, () => []);

    shuffled.forEach((logo, index) => {
      result[index % effective].push(logo);
    });

    // Do not pad columns with duplicates; keep columns naturally unbalanced to avoid
    // showing the same logo multiple times at once.
    return result;
  }, [sanitizedLogos, effectiveColumns]);

  useEffect(() => {
    setLogoColumns(distributeLogos());
    setTime(0);
  }, [distributeLogos]);

  useEffect(() => {
    if (sanitizedLogos.length === 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTime((prev) => prev + TICK_INTERVAL);
    }, TICK_INTERVAL);

    return () => window.clearInterval(interval);
  }, [sanitizedLogos.length]);

  if (sanitizedLogos.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 md:gap-10 md:flex-nowrap",
        className,
      )}
    >
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={`column-${index}`}
          logos={columnLogos}
          columnIndex={index}
          currentTime={time}
          cycleDuration={cycleDuration}
        />
      ))}
    </div>
  );
}
