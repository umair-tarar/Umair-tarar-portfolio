import { ReactNode } from "react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import SiteEffects from "@/components/common/site-effects";
import Preloader from "@/components/common/preloader";
import ParticleNetwork from "@/components/common/particle-network";

interface SiteLayoutProps {
  children: ReactNode;
}

export const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[160px]" />
        <div className="absolute right-[-12rem] top-1/4 h-[22rem] w-[22rem] rounded-full bg-accent/25 blur-[140px]" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[20rem] w-[20rem] rounded-full bg-secondary/30 blur-[130px]" />
      </div>
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
