import { type LucideIcon } from "lucide-react";
import NewsletterForm from "@/components/common/newsletter-form";

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
      { label: "Local SEO", href: "/#services" },
      { label: "Social Media Marketing", href: "/#services" },
      { label: "Meta Ads", href: "/#services" },
      { label: "On-page SEO", href: "/#services" },
      { label: "Off-page SEO", href: "/#services" },
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
    <NewsletterForm />
    <div className="border-t border-white/10 px-6 py-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs md:text-sm text-foreground/60">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">M.Umair</span>. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
