import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CurrentEvents } from "@/components/home/current-events";
import { ProgrammeTicker } from "@/components/home/programme-ticker";
import { ImpactBar } from "@/components/home/impact-bar";
import { MissionSection } from "@/components/home/mission-section";
import { ProgrammeGrid } from "@/components/home/programme-grid";
import { SupportACause } from "@/components/home/support-a-cause";
import { HowToHelp } from "@/components/home/how-to-help";
import { ProgrammeGalleryStrip } from "@/components/programme/programme-gallery-strip";
import { Testimonials } from "@/components/home/testimonials";
import { Credibility } from "@/components/home/credibility";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { FinalCta } from "@/components/home/final-cta";
import { EnquiryPopup } from "@/components/home/enquiry-popup";
import { siteConfig } from "@/lib/site-config";

const inTheFieldImages = [
  { src: "/images/gallery/education/edu-05.png", alt: "Students taking part in a Shikshadwar education programme activity" },
  { src: "/images/gallery/healthcare/health-kdliver2.jpeg", alt: "A Liver Care Foundation awareness session for children and volunteers at Shikshadwar's Kadipur centre" },
  { src: "/images/gallery/livelihood/live-03.jpeg", alt: "A community member practising embroidery skills in a Shikshadwar livelihood session" },
  { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-7.jpeg", alt: "A Shikshadwar environmental-awareness session at a Delhi government school" },
  { src: "/images/gallery/education/edu-12.png", alt: "Students taking part in a Shikshadwar education programme activity" },
  { src: "/images/gallery/youth-development/youth-01.png", alt: "Young people taking part in a Shikshadwar youth empowerment session" },
  { src: "/images/gallery/livelihood/live-06.jpeg", alt: "Raw materials being organised for a Shikshadwar livelihood programme" },
  { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-4.jpeg", alt: "Volunteers and community members plant saplings as part of a Shikshadwar tree-plantation drive" },
];

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
      <ProgrammeGalleryStrip images={inTheFieldImages} />
      <HowToHelp />
      <Testimonials />
      <NewsletterSignup />
      <FinalCta />
    </>
  );
}
