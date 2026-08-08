import { type LucideIcon } from "lucide-react";

type FooterLinkItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  icon?: LucideIcon;
  iconOnly?: boolean;
};

type FooterLinkColumn = {
  title: string;
  items: FooterLinkItem[];
};

const footerLinks: FooterLinkColumn[] = [
  {
    title: "Services",
    items: [
      { label: "Social Media Marketing", href: "/#services" },
      { label: "Meta Ads", href: "/#services" },
      { label: "On-page SEO", href: "/#services" },
      { label: "Off-page SEO", href: "/#services" },
      { label: "Local SEO", href: "/#services" },
      { label: "WordPress", href: "/#services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Approach", href: "/#approach" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    title: "Connect",
    items: [{ label: "Book a Call", href: "/#contact" }],
  },
];

export const SiteFooter = () => (
  <footer className="border-t border-white/10 bg-background/95">
    <div className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs md:text-sm text-foreground/60">
          © 2025 <span className="text-white font-semibold">M.Umair</span>. All
          rights reserved.
        </p>
        <p className="mt-1 text-xs md:text-sm text-foreground/50">
          Developed by{" "}
          <a
            href="http://alihassan-online.netlify.app/"
            className="text-white font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ali Hassan
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
