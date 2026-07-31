import type { LucideIcon } from "lucide-react";
import type { ImpactStat } from "@/lib/impact-stats";

export type ProgrammeSlug =
  | "education"
  | "livelihood"
  | "healthcare"
  | "youth-empowerment"
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
  /** Declarative hero headline, matching the legacy site's per-programme banner line. */
  heroHeadline: string;
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
  /** "Impact 2025–26" figures, where the current site publishes them for this programme. */
  impactStats?: ImpactStat[];
  /** Caption rendered under the impact stat band, e.g. a per-site breakdown. */
  impactCaption?: string;
}

export const programmes: Programme[] = [
  {
    slug: "livelihood",
    title: "Livelihood",
    cardTitle: "Livelihood Programmes",
    heroHeadline: "Empowering Youth With Skills for Sustainable Livelihoods",
    tag: "pine",
    summary:
      "Focused on people belonging to marginalized communities for better income and enhanced quality of life.",
    photoCaption: "Livelihood skill-training session, Kadipur",
    image: {
      src: "/images/gallery/livelihood/live-03.jpeg",
      alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    },
    intro: [
      "India has a population of over 140 crore according to the latest United Nations World Population Prospects data. With a population so large, one of the major challenges the country faces is a lack of employment opportunities — only around 40% of the population is employed or actively looking for work, a marginal figure against the country's working-age population. Millions complete their schooling every year without industry-relevant skills, a gap that hits economically disadvantaged youth hardest and leaves them joblessness or stuck earning far below their potential.",
      "One of the major reasons for unemployment in India is the lack of vocational education and avenues for skill development. Vocational education helps an individual develop expertise in a particular area, giving them a real route into the job market — which is why Shikshadwar implements market-oriented vocational training, digital and financial literacy, soft skills, career counselling and placement support, in line with the National Skill Development Policy.",
      "One of Shikshadwar's flagship programmes is Enterprise Development, where we set up Enterprise Resource Centres equipped with trainers, machines, raw materials and other essentials. The model helps beneficiaries build new skills or upgrade existing ones, and supports them in setting up their own enterprise — tackling the lack of job opportunities while letting people work on vocations they're genuinely interested in.",
    ],
    focusAreas: [
      "Women Tailoring & Entrepreneurship Training Programme",
      "IMPA Training Programme",
      "Enterprise Development",
    ],
    impactCaption:
      "Current projects, 2026–27: a Women Tailoring & Entrepreneurship Training Programme with 40 participants (launched April 2026, running six months) covering tailoring, garment stitching, measurement, cutting, finishing and entrepreneurship basics, with corporate partnerships supporting job placement or independent boutique setup — and, in partnership with the Rural Upliftment Foundation, an IMPA Training Programme preparing unemployed and aspiring youth for the IRDAI Insurance Marketing Personnel examination.",
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
    heroHeadline: "Education Is Empowerment",
    tag: "rust",
    summary:
      "Holistic education model — academic excellence with emotional intelligence and life skills.",
    photoCaption: "Students in a Shikshadwar remedial classroom, Bhalaswa",
    image: {
      src: "/images/programmes/education.jpg",
      alt: "Students at a government school follow a digital lesson on a smartboard as part of Shikshadwar's education programme",
    },
    intro: [
      "Access to quality education is key to a prosperous nation. According to the 2011 Census, India's literacy rate is 73% — with a wide gender disparity: 82% of boys are literate, compared to just 65% of girls. If we need to address healthcare, poverty, population control, unemployment and human rights, there's no better way to start than providing education. Despite the Right to Education Act (2010), many children still face barriers to school because of their socio-economic conditions and inadequate learning environments.",
      "Shikshadwar has been working towards promoting the importance of education since its inception. The journey started through a small remedial education centre in the slums of Bhalaswa, Delhi, and has grown into large-scale programmes across both formal and informal education methodologies — spanning identification, enrolment, academic support and career guidance for out-of-school and marginalised children, leading toward sustainable employment.",
    ],
    focusAreas: [
      "Holistic Education Programme",
      "Free Remedial Classes",
      "Girls Scholarship Programme",
      "Sponsor Mobilization Initiative",
    ],
    impactStats: [
      { value: 467, suffix: "+", label: "Vulnerable children identified" },
      { value: 397, suffix: "", label: "Identified in Bhalaswa JJ Colony" },
      { value: 70, suffix: "", label: "Identified in Kadipur Village" },
      { value: 10, suffix: "", label: "Enrolled in government schools" },
    ],
    impactCaption:
      "Impact 2025–26: sponsorship covers tuition, uniforms, books, materials, transportation, digital resources and mentoring support for every child on the programme.",
    gallery: [
      { src: "/images/gallery/education/edu-08.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-09.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-12.png", alt: "Students taking part in a Shikshadwar education programme activity" },
      { src: "/images/gallery/education/edu-16.png", alt: "Students taking part in a Shikshadwar education programme activity" },
    ],
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    cardTitle: "Youth Empowerment Programmes",
    heroHeadline: "Empower. Skill. Employ. Transform.",
    tag: "pine",
    summary: "Empower. Skill. Employ. Transform. — building youth as leaders of social change.",
    photoCaption: "Youth leadership workshop",
    image: {
      src: "/images/programmes/youth-development.png",
      alt: "Young people hold up hand-lettered English grammar flashcards during a Shikshadwar youth empowerment session",
    },
    intro: [
      "Youth are the face and future of a country. Young people have the potential to become an asset if they're given the right support from an early age — youth empowerment is the process that prepares a young person to meet the challenges of adulthood and achieve their full potential, securing a better future for both individuals and communities. Many young people face limited access to education, inadequate skills, unemployment and a lack of career guidance; Shikshadwar's work equips them with the knowledge, skills, confidence and resources to make informed decisions and become financially independent.",
      "We provide career guidance, employability training, digital literacy, financial literacy and vocational skill development, bridging the gap between education and employment through industry partnerships and placement assistance — while promoting leadership and entrepreneurship among the young people we work with.",
    ],
    focusAreas: [
      "Career Counselling and Guidance",
      "Skill Development and Vocational Training",
      "Digital and Financial Literacy",
      "Employability and Soft Skills",
      "Entrepreneurship Development",
      "Job Placement and Apprenticeships",
      "Leadership and Life Skills",
      "Mentorship and Career Support",
    ],
    impactCaption:
      "Our vision: to empower every young person with the skills, confidence and opportunities needed to secure dignified employment, become financially independent, and lead positive change in society.",
    gallery: [
      { src: "/images/gallery/youth-development/youth-01.png", alt: "Young people taking part in a Shikshadwar youth empowerment session" },
      { src: "/images/gallery/youth-development/youth-02.jpeg", alt: "Young people taking part in a Shikshadwar youth empowerment session" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    cardTitle: "Healthcare Programmes",
    heroHeadline: "Healthcare Awareness for All",
    tag: "rust",
    summary:
      "Collaboration with government and civil society for quality healthcare services.",
    photoCaption: "Community health camp",
    image: {
      src: "/images/programmes/healthcare.jpg",
      alt: "Community members set up an insecticide-treated mosquito net as part of a Shikshadwar healthcare awareness session",
    },
    intro: [
      "India's population of over 1.4 billion faces significant healthcare access barriers, particularly in rural and urban poor communities — more than 65% of India's population lives in rural areas, where healthcare facilities and trained professionals remain insufficient. Alongside its work on livelihood and education, Shikshadwar addresses these gaps through community-based healthcare awareness, preventive health education, health screenings and improved access to essential healthcare services.",
      "We work at the frontline to provide basic health services through health camps and immunisation campaigns, and run awareness drives on disease prevention — covering Kala Azar, HIV, menstrual health and hygiene, adolescent health, nutrition, and water and sanitation. We also run a large malaria programme in partnership with Malaria No More USA.",
      "We work at the community level to develop and implement quality healthcare solutions — collaborating with community groups, government departments and civil society organisations to improve health and nutrition systems, particularly for women and children. Our work spans sanitation, cleanliness, vaccination, maternal and reproductive health, and child health and nutrition, alongside free medical camps in rural and semi-urban areas that offer free treatment while teaching people to recognise the causes and symptoms of common communicable and non-communicable diseases.",
    ],
    focusAreas: [
      "Community Health Awareness Sessions",
      "Specialised Health Camps",
      "Disease Prevention Programmes",
      "Vaccination and Immunisation Campaigns",
      "Maternal, Child and Nutrition Services",
    ],
    impactCaption:
      "Impact 2025–26: in partnership with the Liver Care Foundation, we ran health camps at our education centres in Bhalaswa and Kadipur, with over 50 women receiving BMI assessments and personalised health counselling.",
    gallery: [
      { src: "/images/gallery/healthcare/health-01.jpg", alt: "A Shikshadwar community healthcare session in progress" },
      { src: "/images/gallery/healthcare/health-kdliver2.jpeg", alt: "A Liver Care Foundation awareness session for children and volunteers at Shikshadwar's Kadipur centre" },
      { src: "/images/gallery/healthcare/health-kdliver4.jpeg", alt: "A community health awareness session at Shikshadwar's Kadipur centre" },
      { src: "/images/gallery/healthcare/health-kdliver6.jpeg", alt: "A community health awareness session at Shikshadwar's Kadipur centre" },
    ],
  },
  {
    slug: "sustainable-development",
    title: "Sustainable Development",
    cardTitle: "Sustainable Development Programmes",
    heroHeadline: "Green Earth Begins With One Tree",
    tag: "rust",
    summary:
      "Awareness and eco-friendly household and agricultural practices in a rural context.",
    photoCaption: "Community tree-planting drive",
    image: {
      src: "/images/programmes/sustainable-development.jpg",
      alt: "A child plants a sapling on open ground as part of Shikshadwar's sustainable development programme",
    },
    intro: [
      "Trees are essential for sustaining life on Earth — they produce oxygen, absorb carbon dioxide, improve air quality, conserve water, prevent soil erosion, and provide habitat for wildlife. With climate change and deforestation among the defining environmental challenges of our time, tree planting is one of the most effective and sustainable solutions to restore ecological balance, capture carbon, enhance biodiversity, recharge groundwater and support healthier communities.",
      "Long-term resilience starts at the household level. Shikshadwar runs awareness programmes on eco-friendly household and agricultural practices in the rural communities we work with — implementing tree planting through community engagement, school and corporate drives, and ongoing sapling maintenance — because sustainable development begins with empowering communities through education, healthcare and awareness of the environment they depend on.",
    ],
    focusAreas: [
      "Community Tree Plantation Drives",
      "School and Corporate Plantation Partnerships",
      "Sapling Care and Maintenance",
      "Environmental Awareness Campaigns",
    ],
    impactStats: [
      { value: 300, suffix: "+", label: "Fruit and native saplings distributed" },
      { value: 4, suffix: "", label: "Delhi locations reached" },
    ],
    impactCaption:
      "Impact 2025–26: 100 saplings and an environmental awareness session at GBSSS Bhalaswa, 100 saplings and an awareness programme at GGSSS Bhalaswa, 50 saplings for a World Environment Day campaign at MCD Primary School, Shalimar Bagh, and 50 saplings for an Earth Day awareness drive with Kadipur Welfare Society.",
    gallery: [
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-4.jpeg", alt: "Volunteers and community members plant saplings as part of a Shikshadwar tree-plantation drive" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-7.jpeg", alt: "A Shikshadwar environmental-awareness session at a Delhi government school" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-11.jpeg", alt: "Students take part in a Shikshadwar environmental-awareness activity at school" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-13.jpeg", alt: "A Shikshadwar tree-plantation drive at a Delhi school" },
    ],
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}
