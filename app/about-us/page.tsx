import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { ImpactBar } from "@/components/home/impact-bar";
import { AboutIntro } from "@/components/about/about-intro";
import { MissionVision } from "@/components/about/mission-vision";
import { Certificates } from "@/components/about/certificates";
import { Trustees } from "@/components/about/trustees";
import { Team } from "@/components/about/team";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Shikshadwar Foundation is a Public Charitable Trust founded in 2025 by Manish Mandal, working across education, livelihood, healthcare, youth empowerment and environment sustainability in Delhi, Bihar, Uttar Pradesh, Rajasthan and Haryana.",
  alternates: {
    canonical: "/about-us/",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <div className="pt-12 md:pt-16">
        <ImpactBar />
      </div>
      <AboutIntro />
      <MissionVision />
      <Certificates />
      <Trustees />
      <Team />
      <FinalCta />
    </>
  );
}
