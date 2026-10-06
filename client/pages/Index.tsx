import HeroSection from "@/components/sections/hero-section";
import KeywordBand from "@/components/sections/keyword-band";
import AboutSection from "@/components/sections/about-section";
import CapabilitiesSection from "@/components/sections/capabilities-section";
import ProblemSection from "@/components/sections/problem-section";
import FunnelSection from "@/components/sections/funnel-section";
import WorkSection from "@/components/sections/work-section";
import PricingSection from "@/components/sections/pricing-section";
import ApproachSection from "@/components/sections/approach-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import RecommendationsSection from "@/components/sections/recommendations-section";
import CalculatorSection from "@/components/sections/calculator-section";
import ToolsSection from "@/components/sections/tools-section";
import ChecklistSection from "@/components/sections/checklist-section";
import FaqSection from "@/components/sections/faq-section";
import BookingSection from "@/components/sections/booking-section";
import CtaSection from "@/components/sections/cta-section";
import SectionDivider from "@/components/common/section-divider";
import WorldSection from "@/components/sections/world-section";
import MapPackDemo from "@/components/sections/map-pack-demo";
import TerminalSection from "@/components/sections/terminal-section";
import BeforeAfterSection from "@/components/sections/before-after-section";
import { SiteLayout } from "@/components/layout/site-layout";
import { useCardTilt, usePrefetch3D, useScrollReveal } from "@/hooks/use-site-effects";

export default function Index() {
  useScrollReveal();
  useCardTilt();
  usePrefetch3D();

  return (
    <SiteLayout>
      <HeroSection />
      <KeywordBand />
      <AboutSection />
      <SectionDivider />
      <CapabilitiesSection />
      <ProblemSection />
      <SectionDivider />
      <FunnelSection />
      <MapPackDemo />
      <TerminalSection />
      <WorkSection />
      <BeforeAfterSection />
      <PricingSection />
      <SectionDivider />
      <WorldSection />
      <ApproachSection />
      <RecommendationsSection />
      <TestimonialsSection />
      <CalculatorSection />
      <ToolsSection />
      <ChecklistSection />
      <FaqSection />
      <BookingSection />
      <CtaSection />
    </SiteLayout>
  );
}
