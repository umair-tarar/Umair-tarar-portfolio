import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Mounts heavy content (3D scenes) a long way before it scrolls into view, so
 * it is ready by the time you get there, and then only reports whether it is
 * on screen (`active`) so the content can pause itself when it is not.
 */
export default function InView({
  children,
  fallback = null,
  preload = "1500px",
  className,
}: {
  children: ReactNode | ((active: boolean) => ReactNode);
  fallback?: ReactNode;
  preload?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      setActive(true);
      return;
    }
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: preload },
    );
    const onScreen = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "80px",
    });
    near.observe(el);
    onScreen.observe(el);
    return () => {
      near.disconnect();
      onScreen.disconnect();
    };
  }, [preload]);

  return (
    <div ref={ref} className={className}>
      {mounted ? (typeof children === "function" ? children(active) : children) : fallback}
    </div>
  );
}
