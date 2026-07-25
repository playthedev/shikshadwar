import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProgrammeTicker } from "@/components/home/programme-ticker";
import { ImpactBar } from "@/components/home/impact-bar";
import { MissionSection } from "@/components/home/mission-section";
import { ProgrammeGrid } from "@/components/home/programme-grid";
import { Testimonials } from "@/components/home/testimonials";
import { Partners } from "@/components/home/partners";
import { CtaCards } from "@/components/home/cta-cards";
import { TrustStrip } from "@/components/home/trust-strip";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgrammeTicker />
      <ImpactBar />
      <MissionSection />
      <ProgrammeGrid />
      <Testimonials />
      <Partners />
      <CtaCards />
      <TrustStrip />
      <FinalCta />
    </>
  );
}
