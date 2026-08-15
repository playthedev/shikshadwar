export interface HeroSlide {
  image: string;
  alt: string;
  objectPosition: string;
  headline: string;
  subheading: string;
  ctaLabel: string;
  /** Programme page this slide's banner opens on click. */
  href: string;
}

// Same five banners, headlines and click-through destinations as the
// client's reference site — one per programme, in the same order.
export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/education-banner.jpg",
    alt: "A student at a Shikshadwar education centre holds her schoolbooks in front of the Shikshadwar Foundation banner",
    objectPosition: "center 15%",
    headline: "Education is Empowerment",
    subheading:
      "Holistic education model — academic excellence with emotional intelligence and life skills.",
    ctaLabel: "Donate Now",
    href: "/education/",
  },
  {
    image: "/images/hero/livelihood-banner.jpg",
    alt: "Community members and children gather in front of a Shikshadwar Foundation banner at a non-formal education session",
    objectPosition: "center 25%",
    headline: "Empowering Youth With Skills for Sustainable Livelihoods",
    subheading:
      "Focused on people belonging to marginalized communities for better income and enhanced quality of life.",
    ctaLabel: "Donate Now",
    href: "/livelihood/",
  },
  {
    image: "/images/hero/healthcare-banner.png",
    alt: "A volunteer leads a health and hygiene awareness session for a group of young people",
    objectPosition: "center 40%",
    headline: "Healthcare Awareness for All",
    subheading:
      "Collaboration with government and civil society for quality healthcare services.",
    ctaLabel: "Donate Now",
    href: "/healthcare/",
  },
  {
    image: "/images/hero/youth-empowerment-banner.jpg",
    alt: "Community members stand together in front of a Shikshadwar Foundation registration banner",
    objectPosition: "center 30%",
    headline: "Empower. Skill. Employ. Transform.",
    subheading: "Empower. Skill. Employ. Transform. — building youth as leaders of social change.",
    ctaLabel: "Donate Now",
    href: "/youth-empowerment/",
  },
  {
    image: "/images/hero/sustainable-development-banner.png",
    alt: "Two volunteers plant a sapling together as part of a Shikshadwar tree-plantation drive",
    objectPosition: "center 30%",
    headline: "Green Earth Begins With One Tree",
    subheading:
      "Awareness and eco-friendly household and agricultural practices in a rural context.",
    ctaLabel: "Donate Now",
    href: "/sustainable-development/",
  },
];
