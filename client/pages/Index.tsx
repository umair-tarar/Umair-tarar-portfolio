import HeroSection from "@/components/sections/hero-section";
import CapabilitiesSection from "@/components/sections/capabilities-section";
import WorkSection from "@/components/sections/work-section";
import ApproachSection from "@/components/sections/approach-section";
import ClientsSection from "@/components/sections/clients-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CtaSection from "@/components/sections/cta-section";
import { SiteLayout } from "@/components/layout/site-layout";

export default function Index() {
  return (
    <SiteLayout>
      <HeroSection />
      <CapabilitiesSection />
      <WorkSection />
      <ApproachSection />
      <ClientsSection />
      <TestimonialsSection />
      <CtaSection />
    </SiteLayout>
  );
}
