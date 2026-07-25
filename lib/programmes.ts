import { LifeBuoy, type LucideIcon } from "lucide-react";

export type ProgrammeSlug =
  | "education"
  | "livelihood"
  | "healthcare"
  | "youth-development"
  | "emergency-relief"
  | "sustainable-development";

export type ProgrammeTag = "rust" | "pine";

export interface ProgrammeImage {
  src: string;
  alt: string;
}

export interface Programme {
  slug: ProgrammeSlug;
  title: string;
  /** Exact legacy homepage card title, e.g. "Education Programmes". */
  cardTitle: string;
  tag: ProgrammeTag;
  /** Exact legacy homepage card description. */
  summary: string;
  photoCaption: string;
  /** Present once real photography exists for this programme. */
  image?: ProgrammeImage;
  /** Thematic icon shown in the dummy placeholder illustration when no photo exists yet. */
  icon?: LucideIcon;
  /** Full body copy from the legacy programme page, paragraph by paragraph. */
  intro: string[];
  /** Named focus areas / sub-programmes, where the legacy site listed them. */
  focusAreas?: string[];
  /** Additional real photography for an "In Pictures" strip on the programme page. */
  gallery?: ProgrammeImage[];
}

export const programmes: Programme[] = [
  {
    slug: "livelihood",
    title: "Livelihood",
    cardTitle: "Livelihood Programmes",
    tag: "pine",
    summary:
      "Focused on people belonging to marginalized communities for better income and enhanced quality of life.",
    photoCaption: "Livelihood skill-training session, Kadipur",
    image: {
      src: "/images/gallery/livelihood/live-03.jpeg",
      alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    },
    intro: [
      "India has a population of over 140 crore according to the latest United Nations World Population Prospects data. With a population so large, one of the major challenges the country faces is a lack of employment opportunities — only around 40% of the population is employed or actively looking for work, a marginal figure against the country's working-age population.",
      "One of the major reasons for unemployment in India is the lack of vocational education and avenues for skill development. Vocational education helps an individual develop expertise in a particular area, giving them a real route into the job market — which is why Shikshadwar implements vocational and skill-development programmes in line with the National Skill Development Policy.",
      "One of Shikshadwar's flagship programmes is Enterprise Development, where we set up Enterprise Resource Centres equipped with trainers, machines, raw materials and other essentials. The model helps beneficiaries build new skills or upgrade existing ones, and supports them in setting up their own enterprise — tackling the lack of job opportunities while letting people work on vocations they're genuinely interested in.",
    ],
    gallery: [
      { src: "/images/gallery/livelihood/live-01.jpeg", alt: "A community member practising embroidery skills in a Shikshadwar livelihood session" },
      { src: "/images/gallery/livelihood/live-02.jpeg", alt: "A community member practising embroidery skills in a Shikshadwar livelihood session" },
      { src: "/images/gallery/livelihood/live-04.jpeg", alt: "An embroidery skill-training session run by Shikshadwar" },
      { src: "/images/gallery/livelihood/live-05.jpeg", alt: "Raw materials being organised for a Shikshadwar livelihood programme" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    cardTitle: "Education Programmes",
    tag: "rust",
    summary:
      "Holistic education model — academic excellence with emotional intelligence and life skills.",
    photoCaption: "Students in a Shikshadwar remedial classroom, Bhalaswa",
    image: {
      src: "/images/programmes/education.jpg",
      alt: "Students at a government school follow a digital lesson on a smartboard as part of Shikshadwar's education programme",
    },
    intro: [
      "Access to quality education is key to a prosperous nation. According to the 2011 Census, India's literacy rate is 73% — with a wide gender disparity: 82% of boys are literate, compared to just 65% of girls. For a developing country, education should not be limited to traditional forms of learning, but should also encompass value education, emotional intelligence and 21st-century skills.",
      "Shikshadwar has been working towards promoting the importance of education since its inception. The journey started through a small remedial education centre in the slums of Bhalaswa, Delhi, and has grown into large-scale programmes across both formal and informal education methodologies.",
    ],
    focusAreas: [
      "Holistic Education Programme",
      "Free Remedial Classes",
      "Girls Scholarship Programme",
      "Digitalization of Government Schools, Bihar",
      "Education Past Programmes",
    ],
    gallery: [
      { src: "/images/gallery/education/edu-08.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-09.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-12.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-16.png", alt: "Students taking part in a Shikshadwar education programme activity" },
    ],
  },
  {
    slug: "youth-development",
    title: "Youth Development",
    cardTitle: "Youth Development Programmes",
    tag: "pine",
    summary: "Sensitization and empowerment of youth as leaders of social change.",
    photoCaption: "Youth leadership workshop",
    image: {
      src: "/images/programmes/youth-development.png",
      alt: "Young people hold up hand-lettered English grammar flashcards during a Shikshadwar youth development session",
    },
    intro: [
      "Youth are the face and future of a country. Young people have the potential to become an asset if they're given the right support from an early age — youth development is the process that prepares a young person to meet the challenges of adulthood and achieve their full potential, securing a better future for both individuals and communities. As an organisation working with marginalised communities, youth development is one of Shikshadwar's priorities.",
    ],
    focusAreas: [
      "Webinars",
      "Adolescent Empowerment and Environment Programme",
      "Youth Development Past Programmes",
      "Inspiring Stories",
    ],
    gallery: [
      { src: "/images/gallery/youth-development/youth-01.png", alt: "Young people taking part in a Shikshadwar youth development session" },
      { src: "/images/gallery/youth-development/youth-02.jpeg", alt: "Young people taking part in a Shikshadwar youth development session" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    cardTitle: "Healthcare Programmes",
    tag: "rust",
    summary:
      "Collaboration with government and civil society for quality healthcare services.",
    photoCaption: "Community health camp",
    image: {
      src: "/images/programmes/healthcare.jpg",
      alt: "Community members set up an insecticide-treated mosquito net as part of a Shikshadwar healthcare awareness session",
    },
    intro: [
      "Alongside its work on livelihood and education, Shikshadwar has expanded into healthcare. With the belief that healthcare should be accessible to all, we work at the frontline to provide basic health services through health camps and immunisation campaigns, and run awareness drives on disease prevention — covering Kala Azar, HIV, menstrual health and hygiene, adolescent health, nutrition, and water and sanitation. We also run a large malaria programme in partnership with Malaria No More USA.",
      "We work at the community level to develop and implement quality healthcare solutions — collaborating with community groups, government departments and civil society organisations to improve health and nutrition systems, particularly for women and children.",
      "Our healthcare work spans sanitation, cleanliness, vaccination, maternal and reproductive health, and child health and nutrition. We also run free medical camps in rural and semi-urban areas, offering free treatment while teaching people to recognise the causes and symptoms of common communicable and non-communicable diseases.",
    ],
    gallery: [
      { src: "/images/gallery/healthcare/health-01.jpg", alt: "A Shikshadwar community healthcare session in progress" },
    ],
  },
  {
    slug: "emergency-relief",
    title: "Emergency Relief",
    cardTitle: "Emergency Relief Programmes",
    tag: "pine",
    summary:
      "Support during natural calamities — medicine, health camps, ration, water, essentials.",
    photoCaption: "Emergency relief distribution",
    icon: LifeBuoy,
    intro: [
      "When floods, fires or other disasters strike, the communities we work with are often the least equipped to absorb the shock. Shikshadwar's emergency relief effort exists to close that gap quickly — medicine, health camps, ration, water and other essentials delivered directly to families when they're needed most.",
    ],
  },
  {
    slug: "sustainable-development",
    title: "Sustainable Development",
    cardTitle: "Sustainable Development Programmes",
    tag: "rust",
    summary:
      "Awareness and eco-friendly household and agricultural practices in a rural context.",
    photoCaption: "Community tree-planting drive",
    image: {
      src: "/images/programmes/sustainable-development.jpg",
      alt: "A child plants a sapling on open ground as part of Shikshadwar's sustainable development programme",
    },
    intro: [
      "Long-term resilience starts at the household level. Shikshadwar runs awareness programmes on eco-friendly household and agricultural practices in the rural communities we work with, including tree-plantation drives, to build habits that outlast any single intervention.",
    ],
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}
