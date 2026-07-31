import { PageHero } from "@/components/shared/page-hero";

export function AboutHero() {
  return (
    <PageHero
      breadcrumb="About Us"
      eyebrow="Who we are"
      title="We believe everyone deserves a future."
      description="A Public Charitable Trust that began with a handful of volunteers in the slums of Delhi, and now works across five states."
      image={{
        src: "/images/hero/slide-05.png",
        alt: "",
        objectPosition: "center 25%",
      }}
    />
  );
}
