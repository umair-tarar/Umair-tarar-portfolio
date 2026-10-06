import { ReactNode } from "react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import SiteEffects from "@/components/common/site-effects";
import Preloader from "@/components/common/preloader";
import ParticleNetwork from "@/components/common/particle-network";
import BackgroundFX from "@/components/common/background-fx";

interface SiteLayoutProps {
  children: ReactNode;
}

export const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      <BackgroundFX />
      <Preloader />
      <ParticleNetwork />
      <SiteEffects />
      <SiteHeader />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
