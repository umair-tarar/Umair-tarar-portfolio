import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  className?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  onClose,
  className,
}) => {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), images.length - 1),
  );
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const count = images.length;
  const current = useMemo(() => images[index] ?? null, [images, index]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // Trackpad/Mouse horizontal wheel support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      // Only consider horizontal intent
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      accum += e.deltaX;
      const threshold = 80; // pixels
      if (accum > threshold) {
        next();
        accum = 0;
      } else if (accum < -threshold) {
        prev();
        accum = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    deltaXRef.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current == null) return;
    const dx = e.touches[0].clientX - startXRef.current;
    deltaXRef.current = dx;
  };
  const onTouchEnd = () => {
    setIsDragging(false);
    const dx = deltaXRef.current;
    const threshold = 50;
    if (dx > threshold) {
      prev();
    } else if (dx < -threshold) {
      next();
    }
    startXRef.current = null;
    deltaXRef.current = 0;
  };

  if (!current) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm",
        className,
      )}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Content wrapper to stop propagation so clicking the image toggles close as requested */}
      <div className="relative mx-auto h-full w-full max-w-6xl select-none px-8">
        <button
          aria-label="Close"
          className="absolute right-6 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-white/10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              aria-label="Previous"
              className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-3xl bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next"
              className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-3xl bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image area */}
        <div className="flex h-screen w-full items-center justify-center">
          <img
            src={current}
            alt={`Preview ${index + 1} of ${count}`}
            className={cn(
              "max-h-[85vh] max-w-full cursor-zoom-out rounded-xl shadow-2xl",
              isDragging
                ? "transition-none"
                : "transition-transform duration-200",
            )}
            onClick={onClose}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
