export interface HeroSlide {
  image: string;
  alt: string;
  objectPosition: string;
  headline: string;
  subheading: string;
  ctaLabel: string;
}

// Verbatim from the legacy site's 6-slide hero, carried forward per the
// client's request to keep all existing homepage content and imagery.
export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/slide-01.png",
    alt: "Girls at a Shikshadwar community centre in Delhi throw their hands up mid-celebration, confident and smiling",
    objectPosition: "center 20%",
    headline: "Change Lives",
    subheading: "Help educate children.",
    ctaLabel: "Donate Now",
  },
  {
    image: "/images/hero/slide-02.png",
    alt: "Children raise their hands eagerly during a Shikshadwar workshop session",
    objectPosition: "center 30%",
    headline: "Make an Impact",
    subheading: "Bring a smile to their faces — they deserve to be healthy and happy.",
    ctaLabel: "Donate for Healthy Communities",
  },
  {
    image: "/images/hero/slide-03.png",
    alt: "Shikshadwar staff and community members gather for a gender-based-violence awareness session",
    objectPosition: "center 25%",
    headline: "Be the Ray of Hope",
    subheading: "Help skill them to improve their financial security.",
    ctaLabel: "Make an Impact, Donate Now",
  },
  {
    image: "/images/hero/slide-04.png",
    alt: "A young girl speaks confidently in front of a Shikshadwar Foundation banner",
    objectPosition: "center 15%",
    headline: "Be the Catalyst",
    subheading: "Help us drive sustainable development.",
    ctaLabel: "Make an Impact, Donate Now",
  },
  {
    image: "/images/hero/slide-05.png",
    alt: "Community members and Shikshadwar volunteers pose together after a youth session",
    objectPosition: "center 25%",
    headline: "Bring Them to the Forefront",
    subheading: "Underprivileged youth need you.",
    ctaLabel: "Develop Their Future, Donate Now",
  },
  {
    image: "/images/hero/slide-06.png",
    alt: "A young girl stands and speaks in front of a Shikshadwar Foundation banner during a community session",
    objectPosition: "center 15%",
    headline: "Save Them in Crisis",
    subheading: "Victims of disasters and calamities need you.",
    ctaLabel: "Don't Leave Them Behind, Donate Now",
  },
];
