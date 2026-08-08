import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#clients", label: "Clients" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    label?: string,
  ) => {
    if (href.includes("#")) {
      e.preventDefault();
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // update URL and attempt to scroll after brief delay
        window.history.pushState(
          {},
          "",
          href.startsWith("/") ? href : `/${href}`,
        );
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
      if (label === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto relative flex max-w-6xl items-center justify-between px-6 py-3 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md">
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          M.Umair
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium text-foreground/80 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href.startsWith("#") ? `/${item.href}` : item.href}
              className="rounded-3xl px-4 py-2 transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
              onClick={(e) => handleNavClick(e, item.href, item.label)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/#contact"
            className="hidden rounded-3xl bg-gradient-to-br from-primary/60 to-primary/40 px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition transform hover:-translate-y-0.5 md:inline-flex"
            onClick={(e) => handleNavClick(e, "/#contact")}
          >
            Book a call
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-3xl border border-white/10 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-50 flex pointer-events-none transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sliding panel */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className={`relative ml-auto w-full max-w-xs bg-background/95 border-l border-white/5 p-6 text-sm transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-3xl border border-white/10 bg-background/80 text-foreground/80 transition hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  className="block rounded-3xl px-4 py-2 transition-colors duration-200 hover:bg-white/5"
                  onClick={(e) => {
                    handleNavClick(e, item.href, item.label);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/#contact"
                className="block mt-2 rounded-3xl bg-primary px-4 py-2 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                onClick={(e) => {
                  handleNavClick(e, "/#contact");
                  setIsMenuOpen(false);
                }}
              >
                Book a call
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
