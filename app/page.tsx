import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CurrentEvents } from "@/components/home/current-events";
import { ProgrammeTicker } from "@/components/home/programme-ticker";
import { ImpactBar } from "@/components/home/impact-bar";
import { MissionSection } from "@/components/home/mission-section";
import { ProgrammeGrid } from "@/components/home/programme-grid";
import { SupportACause } from "@/components/home/support-a-cause";
import { HowToHelp } from "@/components/home/how-to-help";
import { Testimonials } from "@/components/home/testimonials";
import { Credibility } from "@/components/home/credibility";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { FinalCta } from "@/components/home/final-cta";
import { EnquiryPopup } from "@/components/home/enquiry-popup";
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
      <EnquiryPopup />
      <Hero />
      <ProgrammeTicker />
      <CurrentEvents />
      <SupportACause />
      <MissionSection />
      <ImpactBar />
      <Credibility />
      <ProgrammeGrid />
      <HowToHelp />
      <Testimonials />
      <NewsletterSignup />
      <FinalCta />
    </>
  );
}
