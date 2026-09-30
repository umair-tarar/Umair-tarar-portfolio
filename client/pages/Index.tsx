import HeroSection from "@/components/sections/hero-section";
import KeywordBand from "@/components/sections/keyword-band";
import AboutSection from "@/components/sections/about-section";
import CapabilitiesSection from "@/components/sections/capabilities-section";
import ProblemSection from "@/components/sections/problem-section";
import FunnelSection from "@/components/sections/funnel-section";
import WorkSection from "@/components/sections/work-section";
import PricingSection from "@/components/sections/pricing-section";
import ApproachSection from "@/components/sections/approach-section";
import ClientsSection from "@/components/sections/clients-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CalculatorSection from "@/components/sections/calculator-section";
import ChecklistSection from "@/components/sections/checklist-section";
import FaqSection from "@/components/sections/faq-section";
import BookingSection from "@/components/sections/booking-section";
import CtaSection from "@/components/sections/cta-section";
import { SiteLayout } from "@/components/layout/site-layout";
import { useCardTilt, useScrollReveal } from "@/hooks/use-site-effects";

export default function Index() {
  useScrollReveal();
  useCardTilt();

  return (
    <SiteLayout>
      <HeroSection />
      <KeywordBand />
      <AboutSection />
      <CapabilitiesSection />
      <ProblemSection />
      <FunnelSection />
      <WorkSection />
      <PricingSection />
      <ApproachSection />
      <ClientsSection />
      <TestimonialsSection />
      <CalculatorSection />
      <ChecklistSection />
      <FaqSection />
      <BookingSection />
      <CtaSection />
    </SiteLayout>
  );
}
