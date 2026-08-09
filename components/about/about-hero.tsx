import { PageHero } from "@/components/shared/page-hero";

export function AboutHero() {
  return (
    <PageHero
      breadcrumb="About Us"
      title="We believe everyone deserves a future."
      image={{
        src: "/images/hero/slide-05.png",
        alt: "",
        objectPosition: "center 25%",
      }}
    />
  );
}
