import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    const { hash, pathname } = location;
    // If there's a hash, try to find the element and scroll to it smoothly
    if (hash) {
      const id = hash.replace("#", "");
      // slight delay to ensure target exists after route change
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
      return () => clearTimeout(t);
    }

    // If no hash, scroll to top on pathname changes for smooth page transitions
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.hash, location.pathname]);

  return null;
}
