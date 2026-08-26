import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  HandHeart,
  BookOpen,
  Lightbulb,
  Wrench,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Rocket,
  TreePine,
  UserSearch,
  FileText,
  UserCheck,
  School,
  Activity,
  ThumbsUp,
  Droplets,
  Salad,
  Sparkles,
  Recycle,
  ShieldCheck,
  Scissors,
  Compass,
  Laptop,
  Users,
  Award,
} from "lucide-react";
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
  /** Overrides the default top-biased crop for this photo — e.g. "center 10%" when a head sits very close to the frame edge. */
  objectPosition?: string;
}

/** One step in a "pathway" graphic — e.g. Identification → Sponsor → School → Career. */
export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** A labelled bullet list attached to the impact narrative, e.g. "Our awareness sessions covered key topics such as". */
export interface ImpactBullets {
  label: string;
  /** Each topic, with an optional icon — e.g. Droplets for "Hand hygiene". Falls back to a plain check mark when omitted. */
  items: { text: string; icon?: LucideIcon }[];
}

/** A short pull-quote statement — e.g. "Our Vision" on Youth Empowerment, the closing tagline on Sustainable Development. */
export interface VisionStatement {
  eyebrow?: string;
  text: string;
  /** A smaller supporting line rendered under the main statement. */
  note?: string;
}

/** A named sub-programme with its own body copy, e.g. "Finding Sponsors" within Education. */
export interface SubProgramme {
  title: string;
  /** Thematic icon shown on the sub-programme card, e.g. Scissors for tailoring. */
  icon?: LucideIcon;
  paragraphs: string[];
  /** A labelled bullet list, e.g. "Sponsor Support Covers". */
  bulletsLabel?: string;
  bullets?: string[];
  /** A second labelled bullet list stacked under the first, e.g. Scholarship Programme's "Our Support Includes" under "Programme Objectives". */
  secondaryBulletsLabel?: string;
  secondaryBullets?: string[];
  /** A heading rendered above the flow line, e.g. "Our Sponsorship Process". */
  flowLabel?: string;
  /** A short left-to-right flow, e.g. "Identify Child → Assess Needs → …". */
  flow?: string[];
  closing?: string;
  /** Fills the side column with a photo instead — for items with no bullet list, so the row doesn't run half-empty. */
  image?: ProgrammeImage;
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
  /** The brand's themed icon artwork (from the client's reference icon set) — shown as a real badge on the Home programme grid and the programme's own hero, in place of a lucide glyph. */
  iconImage?: string;
  /** Full body copy from the legacy programme page, paragraph by paragraph. */
  intro: string[];
  /** The intro narrative split into named sub-sections, e.g. "Why Education" then "What We Do" — supersedes the flat `intro` rendering when present. Each section may carry its own supporting image. */
  introSections?: { heading: string; paragraphs: string[]; image?: ProgrammeImage }[];
  /** A supporting photo dropped between paragraphs of the flat "Why {title}" narrative — only used when `introSections` is absent, e.g. Healthcare's context image. */
  introImage?: ProgrammeImage;
  /** Renders `introSections` as plain left-aligned bold labels over left-aligned copy — Livelihood's "Why Skilling? / WHAT WE DO" layout — instead of Education's big centered display heading per section. */
  introSectionsPlain?: boolean;
  /** Named focus areas / sub-programmes, where the legacy site listed them. Each may carry a thematic icon. */
  focusAreas?: { text: string; icon?: LucideIcon }[];
  /** When true, renders the real sponsorship-candidate grid ("Meet Our Stars") and a "Sponsor a Child" CTA on this programme page. */
  showChildStories?: boolean;
  /** The step-by-step pathway graphic ("Identification and Registration" → … → "Scholarship Support", or "Mobilisation" → … → "Post-Placement Support"). */
  process?: ProcessStep[];
  /** Overrides the process section's default "How We Work" heading. */
  processHeading?: string;
  /** A supporting line under the process heading. */
  processDescription?: string;
  /** A closing tagline rendered under the process grid, e.g. "Empowering youth with skills, guidance, and opportunities for a better tomorrow." */
  processNote?: string;
  /** A pre-designed "How We Work" infographic rendered as a single image instead of the ProgrammeProcess icon-card grid. Needs its native pixel size so the image keeps its own aspect ratio rather than being forced into a fixed crop. */
  workImage?: ProgrammeImage & { width: number; height: number };
  /** A short pull-quote — "Our Vision" on Youth Empowerment, a closing tagline on Sustainable Development. */
  visionStatement?: VisionStatement;
  /** Where the vision statement sits relative to the process graphic — matches each brief's own layout. Defaults to "after". */
  visionPosition?: "before" | "after";
  /** Full sub-programme sections with their own copy — supersedes focusAreas when present. */
  subProgrammes?: SubProgramme[];
  /** A shared heading rendered once above subProgrammes, e.g. "Projects 2026–27". */
  subProgrammesHeading?: string;
  /** Per-item eyebrow above each subProgramme title — defaults to "Sub-programme". */
  subProgrammesEyebrow?: string;
  /** Additional real photography for an "In Pictures" strip on the programme page. */
  gallery?: ProgrammeImage[];
  /** "Impact 2025–26" figures, where the current site publishes them for this programme. */
  impactStats?: ImpactStat[];
  /** Caption rendered under the impact stat band, e.g. a per-site breakdown. */
  impactCaption?: string;
  /** When set alongside `sponsorHighlight`, renders the magazine-style two-column "Impact / Finding Sponsors" layout instead of the stat band. */
  impactImage?: ProgrammeImage;
  /** The featured sponsorship write-up shown beside the impact narrative in that same two-column layout. */
  sponsorHighlight?: SubProgramme & { image: ProgrammeImage };
  /** A labelled bullet list within the impact narrative — e.g. topics covered in awareness sessions. */
  impactBullets?: ImpactBullets;
  /** Further narrative paragraphs after the bullet list, e.g. a partnership or outcome writeup. */
  impactNote?: string[];
  /** When true, hides the "Keep exploring / Our other programmes" strip at the bottom of this programme page. */
  hideRelatedProgrammes?: boolean;
  /** The "Our Sponsorship Process" icon-card grid, rendered right before the sub-programme cards. */
  sponsorshipProcess?: ProcessStep[];
  /** Overrides the sponsorship process section's default "Our Sponsorship Process" heading. */
  sponsorshipProcessHeading?: string;
  /** Closing paragraphs rendered centered under the sponsorship process grid. */
  sponsorshipProcessNotes?: string[];
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
    icon: Briefcase,
    iconImage: "/images/icons/impact/livelihood.png",
    image: {
      src: "/images/gallery/livelihood/live-03.jpeg",
      alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    },
    intro: [
      "Skills are the bridge between education and employment. While millions of young people complete their schooling every year, many are unable to secure decent jobs due to a lack of industry-relevant skills, practical exposure, and career guidance.",
      "For youth from economically disadvantaged communities, this gap is even wider, often leading to unemployment, underemployment, and limited earning opportunities.",
      "At Shikshadwar Foundation, we believe that skill development is the key to unlocking sustainable livelihoods. By providing market-oriented vocational training, digital and financial literacy, soft skills, career counselling, and placement support, we equip young people with the competencies required to thrive in today's evolving job market.",
      "Our skilling initiatives empower youth to become financially independent, improve their quality of life, support their families, and contribute meaningfully to the growth of their communities and the nation.",
    ],
    introSections: [
      {
        heading: "Why Skilling?",
        paragraphs: [
          "Skills are the bridge between education and employment. While millions of young people complete their schooling every year, many are unable to secure decent jobs due to a lack of industry-relevant skills, practical exposure, and career guidance.",
          "For youth from economically disadvantaged communities, this gap is even wider, often leading to unemployment, underemployment, and limited earning opportunities.",
        ],
      },
      {
        heading: "WHAT WE DO",
        paragraphs: [
          "At Shikshadwar Foundation, we believe that skill development is the key to unlocking sustainable livelihoods. By providing market-oriented vocational training, digital and financial literacy, soft skills, career counselling, and placement support, we equip young people with the competencies required to thrive in today's evolving job market.",
          "Our skilling initiatives empower youth to become financially independent, improve their quality of life, support their families, and contribute meaningfully to the growth of their communities and the nation.",
        ],
        image: {
          src: "/images/gallery/livelihood/live-07.png",
          alt: "Youth and volunteers from a Shikshadwar livelihood outreach visit gathered together after a skilling session",
        },
      },
    ],
    introSectionsPlain: true,
    subProgrammesHeading: "Projects 2026–27",
    subProgrammesEyebrow: "Project",
    subProgrammes: [
      {
        title: "Women Tailoring & Entrepreneurship Training Programme",
        icon: Scissors,
        paragraphs: [
          "In April 2026, Shikshadwar Foundation launched a six-month Women Tailoring and Entrepreneurship Training Programme to empower 40 women from underserved communities with employable skills and sustainable livelihood opportunities.",
          "The programme provides comprehensive practical training in tailoring, garment stitching, measurement techniques, cutting, finishing, and basic entrepreneurship. Upon successful completion in September 2026, participants will be equipped to seek employment in the garment and apparel industry or establish their own tailoring units or boutiques, enabling them to become financially independent.",
          "To maximize livelihood outcomes, Shikshadwar Foundation is actively engaging with corporate partners, apparel manufacturers, and CSR agencies to facilitate job placements, market linkages, and entrepreneurship support for the trainees.",
        ],
        image: {
          src: "/images/gallery/livelihood/live-06.jpeg",
          alt: "A community member reviewing fabric with a shop owner as part of a Shikshadwar livelihood programme",
        },
      },
      {
        title: "IMPA Training Programme – Pathway to Careers in the Insurance Sector",
        icon: ShieldCheck,
        paragraphs: [
          "In collaboration with Rural Upliftment Foundation (RUF), Shikshadwar Foundation is implementing the Insurance Marketing Personnel (IMPA) Training Programme to create employment opportunities for unemployed and aspiring youth.",
          "Under this initiative, eligible candidates are mobilized, counselled, and enrolled in industry-recognized training that prepares them for the IRDAI certification examination. Upon successfully clearing the examination, participants become eligible for employment and self-employment opportunities in the insurance sector as certified Insurance Marketing Personnel.",
          "The programme aims to enhance employability, improve financial inclusion, and enable youth to build sustainable careers in one of India's rapidly growing service sectors.",
        ],
        image: {
          src: "/images/gallery/youth-development/youth-04.jpg",
          alt: "IMPA trainees pose with their Certificates of Completion at a Shikshadwar-run insurance marketing training batch",
        },
      },
    ],
    gallery: [
      { src: "/images/gallery/livelihood/live-01.jpeg", alt: "A community member practising embroidery skills in a Shikshadwar livelihood session" },
      { src: "/images/gallery/livelihood/live-02.jpeg", alt: "A community member practising embroidery skills in a Shikshadwar livelihood session" },
      { src: "/images/gallery/livelihood/live-04.jpeg", alt: "An embroidery skill-training session run by Shikshadwar" },
      { src: "/images/gallery/livelihood/live-05.jpeg", alt: "Raw materials being organised for a Shikshadwar livelihood programme" },
      { src: "/images/gallery/youth-development/youth-03.jpg", alt: "A smaller batch of IMPA trainees pose with their Certificates of Completion" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    cardTitle: "Education Programmes",
    heroHeadline: "Education Is Empowerment",
    tag: "rust",
    hideRelatedProgrammes: true,
    summary:
      "Holistic education model — academic excellence with emotional intelligence and life skills.",
    photoCaption: "Students in a Shikshadwar remedial classroom, Bhalaswa",
    icon: BookOpen,
    iconImage: "/images/icons/impact/education.png",
    image: {
      src: "/images/programmes/education.jpg",
      alt: "Students at a government school follow a digital lesson on a smartboard as part of Shikshadwar's education programme",
    },
    intro: [
      "If we need to address healthcare, poverty, population control, unemployment and human rights, there's no better way to start than providing education to children in need. Education not only empowers children to have a secure future but also helps them grow up as responsible national and global citizens. The Right to Education (RTE) Act, which came into force in 2010, made education free and compulsory for all children aged 6–14. But even a decade later, the learning curve has not been steady for many children in the country — the socio-economic conditions of parents and a lack of proper learning in schools remain hindrances that prevent many children from having an education.",
      "At Shikshadwar Foundation, we believe that every child deserves access to quality education and the opportunity to build a brighter future. We work with out-of-school, marginalized, and vulnerable children, helping them enroll or re-enroll in formal education while providing the academic, financial, and career support they need to succeed.",
      "Our holistic education and livelihood model nurtures children and youth through every stage of their development — from Identification and Registration, Sponsor Mobilization, School Enrollment and Back-to-School Support, Quality Education, Remedial Learning, Scholarship Assistance, Vocational and Employability Skills Training, and Career Guidance, to ultimately securing sustainable employment and achieving self-reliance.",
      "We believe that education is not just about enrolling a child in school — it is about ensuring they remain in school, excel academically, acquire relevant skills, and transition successfully into meaningful careers. Through strong partnerships with communities, schools, individual sponsors, corporate organizations, and government institutions, we create opportunities that transform lives.",
    ],
    introSections: [
      {
        heading: "Why Education",
        paragraphs: [
          "If we need to address healthcare, poverty, population control, unemployment and human rights, there's no better way to start than providing education to children in need. Education not only empowers children to have a secure future but also helps them grow up as responsible national and global citizens. The Right to Education (RTE) Act, which came into force in 2010, made education free and compulsory for all children aged 6–14. But even a decade later, the learning curve has not been steady for many children in the country — the socio-economic conditions of parents and a lack of proper learning in schools remain hindrances that prevent many children from having an education.",
        ],
      },
      {
        heading: "What We Do",
        paragraphs: [
          "At Shikshadwar Foundation, we believe that every child deserves access to quality education and the opportunity to build a brighter future. We work with out-of-school, marginalized, and vulnerable children, helping them enroll or re-enroll in formal education while providing the academic, financial, and career support they need to succeed.",
          "Our holistic education and livelihood model nurtures children and youth through every stage of their development — from Identification and Registration, Sponsor Mobilization, School Enrollment and Back-to-School Support, Quality Education, Remedial Learning, Scholarship Assistance, Vocational and Employability Skills Training, and Career Guidance, to ultimately securing sustainable employment and achieving self-reliance.",
          "We believe that education is not just about enrolling a child in school — it is about ensuring they remain in school, excel academically, acquire relevant skills, and transition successfully into meaningful careers. Through strong partnerships with communities, schools, individual sponsors, corporate organizations, and government institutions, we create opportunities that transform lives.",
        ],
        image: {
          src: "/images/how-we-work.png",
          alt: "Shikshadwar's six-step education pathway: Identification and Registration, Finding Sponsor, Access to Quality Education / Back to School, Remedial Education Support, Vocational Education, and Scholarship Support for Continued Education",
        },
      },
    ],
    impactStats: [
      { value: 467, suffix: "+", label: "Vulnerable children identified" },
      { value: 397, suffix: "", label: "Identified in Bhalaswa JJ Colony" },
      { value: 70, suffix: "", label: "Identified in Kadipur Village" },
      { value: 10, suffix: "", label: "Enrolled in government schools" },
    ],
    impactCaption:
      "These children received elementary and foundational education support to bridge learning gaps, improve literacy and numeracy skills, and prepare them for successful enrollment into formal schools. While enrollment is an important first milestone, our mission extends beyond it — we remain committed to supporting every child from identification to education, skill development, and ultimately sustainable employment, enabling them to become self-reliant and break the cycle of poverty.",
    impactImage: {
      src: "/images/gallery/education/edu-09.png",
      alt: "Children gathered for a Shikshadwar remedial learning session in Bhalaswa",
    },
    sponsorHighlight: {
      title: "Finding Sponsors",
      paragraphs: [
        "At Shikshadwar Foundation, we believe that every child deserves the opportunity to complete their education, regardless of their family's financial circumstances. After identifying and enrolling vulnerable children, we actively connect them with compassionate individuals, corporate partners, and philanthropic organizations who are willing to invest in their education and future.",
        "Our Finding Sponsors initiative bridges the gap between children in need and sponsors who can provide the financial support required for their educational journey. Each child is carefully assessed to understand their educational needs, and sponsorship is matched to ensure meaningful, long-term support.",
      ],
      bulletsLabel: "Sponsor Support Covers",
      bullets: [
        "School admission and tuition fees",
        "Uniforms, books, and stationery",
        "School bags and learning materials",
        "Transportation and other educational expenses",
        "Digital learning resources",
        "Scholarships for higher education and vocational training",
        "Mentoring and academic support",
      ],
      image: {
        src: "/images/gallery/education/edu-03.png",
        alt: "Children present a hand-built model at a Shikshadwar education centre",
      },
    },
    sponsorshipProcess: [
      { title: "Identify Child", description: "", icon: UserSearch },
      { title: "Assess Needs", description: "", icon: FileText },
      { title: "Match with Sponsor", description: "", icon: UserCheck },
      { title: "Enroll in School", description: "", icon: School },
      { title: "Monitor Progress", description: "", icon: Activity },
      { title: "Share Regular Impact Updates", description: "", icon: ThumbsUp },
    ],
    sponsorshipProcessNotes: [
      "We maintain transparency and accountability by providing regular progress reports, updates, and impact stories to sponsors, ensuring they can see the positive difference their support is making in a child's life.",
      "By connecting generous sponsors with deserving children, we create lasting opportunities for education, empowerment, and self-reliance—helping every child move confidently from learning to livelihood and toward a brighter future.",
    ],
    subProgrammes: [
      {
        title: "Holistic Education Programme",
        paragraphs: [
          "The Holistic Education Programme is designed to ensure that every child has the opportunity to learn, grow, and build a successful future. We support out-of-school, marginalized, and vulnerable children by addressing the educational, social, and economic barriers that prevent them from accessing quality education.",
          "Our programme goes beyond school enrollment — providing continuous support throughout a child's educational journey, from identification and enrollment through remedial education, scholarships, career guidance, vocational skills training, and employment support.",
        ],
        bulletsLabel: "Our Holistic Approach",
        bullets: [
          "Identification & Registration of out-of-school and vulnerable children",
          "Counselling & Community Mobilization to encourage school enrollment",
          "School Enrollment & Retention support",
          "Foundational & Remedial Education to bridge learning gaps",
          "Scholarships & Educational Assistance for deserving children",
          "Digital Literacy & Life Skills development",
          "Vocational Skills Training aligned with industry requirements",
          "Career Guidance, Placement Support & Employment Linkages",
          "Mentoring & Continuous Follow-up to ensure long-term success",
        ],
        closing:
          "Our vision is to create a seamless pathway from education to employment, enabling children and youth to become confident, skilled, self-reliant, and responsible citizens.",
      },
      {
        title: "Free Remedial Classes",
        paragraphs: [
          "Many children from underserved communities struggle with learning gaps due to poverty, irregular school attendance, school dropouts, or limited access to quality education. Our Free Remedial Classes are designed to bridge these gaps and help children build strong academic foundations.",
          "Our remedial learning centres provide free academic support to out-of-school, first-generation learners, and children enrolled in government schools who need additional assistance — strengthening foundational literacy, numeracy, and subject knowledge through small-group and individualized learning.",
        ],
        bulletsLabel: "Programme Highlights",
        bullets: [
          "Free remedial education for underprivileged and vulnerable children",
          "Foundational literacy and numeracy support",
          "Bridge courses for out-of-school children preparing for school enrollment",
          "Homework assistance and academic mentoring",
          "Regular assessments to monitor learning progress",
          "Activity-based and child-friendly teaching methods",
          "Parental engagement to encourage regular attendance and learning at home",
          "School readiness support for children returning to formal education",
        ],
        closing:
          "Our goal is not only to improve academic performance but also to ensure that every child is equipped with the knowledge, confidence, and skills needed to succeed in school and continue their journey toward higher education, employability, and a brighter future.",
      },
      {
        title: "Scholarship Programme",
        paragraphs: [
          "At Shikshadwar Foundation, we believe that no child should be denied an education because of financial hardship. Our Scholarship Programme supports children and youth from economically disadvantaged, marginalized, and vulnerable communities by providing financial assistance that enables them to continue their education and pursue their aspirations.",
          "The programme helps reduce the financial burden on families by covering essential educational expenses. In addition to financial support, beneficiaries receive mentoring, career guidance, and academic encouragement to help them stay in school, perform well, and achieve their long-term goals.",
        ],
        bulletsLabel: "Programme Objectives",
        bullets: [
          "Support children and youth from low-income families to continue their education",
          "Prevent school and college dropouts caused by financial constraints",
          "Improve access to quality education and equal learning opportunities",
          "Encourage academic excellence through mentoring and educational support",
          "Provide scholarships for school, higher education, vocational training, and professional courses",
          "Empower students to build successful careers and become self-reliant",
        ],
        secondaryBulletsLabel: "Our Support Includes",
        secondaryBullets: [
          "School and college fee assistance",
          "Books, uniforms, and stationery",
          "Examination and admission fees",
          "Digital learning support",
          "Transportation assistance (where required)",
          "Career guidance and mentorship",
          "Scholarships for vocational and skill development programmes",
        ],
        closing:
          "Together with our donors, sponsors, and corporate partners, we are transforming educational aspirations into lifelong opportunities.",
      },
    ],
    gallery: [
      { src: "/images/gallery/education/edu-24.png", alt: "Children cheer with their fists raised in front of the Shikshadwar Foundation banner" },
      { src: "/images/gallery/education/edu-25.jpg", alt: "Children hold hands in a circle during an outdoor group activity at a Shikshadwar programme centre" },
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
    icon: Rocket,
    iconImage: "/images/icons/impact/youth-empowerment.png",
    image: {
      src: "/images/programmes/youth-development.png",
      alt: "Young people hold up hand-lettered English grammar flashcards during a Shikshadwar youth empowerment session",
    },
    intro: [
      "Youth are the foundation of a nation's future. However, many young people face barriers such as limited access to quality education, inadequate skills, unemployment, financial constraints, and a lack of career guidance. Without the right opportunities, their potential remains untapped.",
      "Youth empowerment equips young people with the knowledge, skills, confidence, and resources they need to make informed decisions, secure dignified employment, become financially independent, and contribute positively to society. It fosters leadership, innovation, entrepreneurship, and active citizenship, enabling youth to become agents of sustainable social and economic development.",
      "At Shikshadwar Foundation, we believe that empowered youth are the driving force behind a prosperous and inclusive society. Our Youth Empowerment Programme equips young people with the knowledge, skills, confidence, and opportunities they need to build successful careers and become responsible citizens.",
      "We support youth through career guidance, employability training, digital literacy, financial literacy, vocational skill development, and placement assistance. Our programmes bridge the gap between education and employment by connecting young people with industry-relevant training and livelihood opportunities.",
      "We also promote leadership, communication, entrepreneurship, and life skills, enabling youth to make informed decisions, adapt to changing job markets, and contribute meaningfully to their families and communities. Through partnerships with training institutes, employers, and corporate organizations, we create pathways to sustainable employment and self-employment, helping young people achieve financial independence and long-term growth.",
    ],
    introSections: [
      {
        heading: "WHY YOUTH EMPOWERMENT?",
        paragraphs: [
          "Youth are the foundation of a nation's future. However, many young people face barriers such as limited access to quality education, inadequate skills, unemployment, financial constraints, and a lack of career guidance. Without the right opportunities, their potential remains untapped.",
          "Youth empowerment equips young people with the knowledge, skills, confidence, and resources they need to make informed decisions, secure dignified employment, become financially independent, and contribute positively to society. It fosters leadership, innovation, entrepreneurship, and active citizenship, enabling youth to become agents of sustainable social and economic development.",
        ],
        image: {
          src: "/images/gallery/youth-development/youth-01.png",
          alt: "Young people taking part in a Shikshadwar youth empowerment session",
        },
      },
      {
        heading: "WHAT WE DO",
        paragraphs: [
          "At Shikshadwar Foundation, we believe that empowered youth are the driving force behind a prosperous and inclusive society. Our Youth Empowerment Programme equips young people with the knowledge, skills, confidence, and opportunities they need to build successful careers and become responsible citizens.",
          "We support youth through career guidance, employability training, digital literacy, financial literacy, vocational skill development, and placement assistance. Our programmes bridge the gap between education and employment by connecting young people with industry-relevant training and livelihood opportunities.",
          "We also promote leadership, communication, entrepreneurship, and life skills, enabling youth to make informed decisions, adapt to changing job markets, and contribute meaningfully to their families and communities. Through partnerships with training institutes, employers, and corporate organizations, we create pathways to sustainable employment and self-employment, helping young people achieve financial independence and long-term growth.",
        ],
        image: {
          src: "/images/gallery/youth-development/youth-02.jpeg",
          alt: "Young people taking part in a Shikshadwar youth empowerment session",
        },
      },
    ],
    introSectionsPlain: true,
    focusAreas: [
      { text: "Career Counselling and Guidance", icon: Compass },
      { text: "Skill Development and Vocational Training", icon: Wrench },
      { text: "Digital and Financial Literacy", icon: Laptop },
      { text: "Employability and Soft Skills", icon: Users },
      { text: "Entrepreneurship Development", icon: Lightbulb },
      { text: "Job Placement and Apprenticeships", icon: Briefcase },
      { text: "Leadership and Life Skills", icon: Award },
      { text: "Mentorship and Career Support", icon: HandHeart },
    ],
    subProgrammesHeading: "Campaigns 2026–27",
    subProgrammesEyebrow: "Campaign",
    subProgrammes: [
      {
        title: "30-Day Youth Mentorship Campaign",
        icon: HandHeart,
        paragraphs: [
          "Every young person has potential. Sometimes, they simply need the right guidance, the right mentor, and a clear pathway to move forward. As part of our Youth Development Programme, Shikshadwar Foundation is launching a 30-Day Youth Mentorship Campaign to connect young people with experienced professionals, industry experts, mentors, and entrepreneurs.",
          "Through our recent youth training initiatives, including the IMPA Training Programme, we observed that many young people face a gap between accessing opportunities and knowing how to build a sustainable career or livelihood pathway. We identified three key groups of young people: those seeking immediate employment to support themselves and their families, those seeking direction, professional guidance and opportunities to build a better future, and young entrepreneurs who need expert guidance, industry exposure, and mentorship to overcome challenges and grow.",
          "We invite professionals, entrepreneurs, young people, and community members to join this initiative and contribute to building a stronger and more empowered generation. Let us come together to create pathways, build confidence, and empower young people to turn their ideas into action and aspirations into achievements.",
        ],
        bulletsLabel: "Who We Are Looking For",
        bullets: [
          "Mentors — experienced professionals, entrepreneurs, industry experts and subject-matter specialists willing to share their knowledge, experience and guidance with young people",
          "Mentees / Youth — young people with aspirations, ideas or career goals who need guidance and a clear pathway to achieve them",
          "Young Entrepreneurs — individuals who have started working on their business ideas and are looking for mentorship to strengthen, develop and scale their initiatives",
        ],
        closing:
          "One conversation can create direction. One mentor can change a journey. One opportunity can transform a life.",
        image: {
          src: "/images/campaigns/youth-mentorship-poster.jpg",
          alt: "30-Day Youth Mentorship Campaign poster: Guidance Today, Success Tomorrow — Shikshadwar Foundation",
        },
      },
    ],
    workImage: {
      src: "/images/how-we-work-2.png",
      alt: "Shikshadwar's seven-step Youth Empowerment pathway: Mobilisation, Enrolment, Livelihood Skills Training (3/4 months), Industry Exposure, Career Counseling, Placement Support, and Post-Placement Support",
      width: 1379,
      height: 776,
    },
    visionStatement: {
      eyebrow: "Our Vision",
      text: "To empower every young person with the skills, confidence, and opportunities needed to secure dignified employment, become financially independent, and lead positive change in society.",
    },
    gallery: [
      { src: "/images/gallery/youth-development/youth-01.png", alt: "Young people taking part in a Shikshadwar youth empowerment session" },
      { src: "/images/gallery/youth-development/youth-02.jpeg", alt: "Young people taking part in a Shikshadwar youth empowerment session" },
      { src: "/images/gallery/youth-development/mentorship-01.jpeg", alt: "A Shikshadwar volunteer leads a Career Pathway mentorship talk for students at a government girls' school" },
      { src: "/images/gallery/youth-development/mentorship-02.jpeg", alt: "Students listen to a Career Pathway mentorship session at a government girls' school" },
      { src: "/images/gallery/youth-development/mentorship-03.jpeg", alt: "A large assembly of students at a Shikshadwar Career Pathway mentorship session" },
      { src: "/images/gallery/youth-development/mentorship-04.jpeg", alt: "Rows of students seated for a Shikshadwar Career Pathway mentorship session at a government girls' school" },
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
    icon: HeartPulse,
    iconImage: "/images/icons/impact/health.png",
    image: {
      src: "/images/programmes/healthcare.jpg",
      alt: "Community members set up an insecticide-treated mosquito net as part of a Shikshadwar healthcare awareness session",
    },
    intro: [
      "India, with a population of over 1.4 billion, continues to face significant challenges in ensuring equitable access to quality healthcare, particularly for vulnerable and marginalized communities. Geographic diversity, inadequate healthcare infrastructure, and socio-economic disparities make last-mile healthcare delivery a persistent challenge.",
      "More than 65% of India's population lives in rural areas where healthcare facilities and trained professionals remain insufficient. At the same time, families living in urban slums often prioritize daily livelihoods over preventive and essential healthcare due to financial constraints, lack of awareness, and limited access to services. These barriers result in delayed treatment, poor health outcomes, and increased vulnerability among children, women, and low-income households.",
      "At Shikshadwar Foundation, we are committed to bridging these gaps by promoting community-based healthcare awareness, preventive health education, health screenings, and improved access to essential healthcare services for underserved populations. Through partnerships with government agencies, healthcare institutions, and corporate CSR initiatives, we strive to empower communities with the knowledge and resources needed to lead healthier lives.",
      "Our efforts contribute to the Government of India's vision of Ayushman Bharat and support the broader goal of achieving Universal Health Coverage by ensuring that no individual is left behind due to geography, poverty, or lack of awareness.",
    ],
    introImage: {
      src: "/images/gallery/healthcare/health-kdliver3.jpeg",
      alt: "A Shikshadwar community health awareness session in progress at the Kadipur centre",
    },
    impactStats: [{ value: 50, suffix: "+", label: "Women reached through Liver Care camps" }],
    impactCaption:
      "During FY 2025–26, Shikshadwar Foundation organized a series of community health awareness programmes to promote preventive healthcare and healthy living among children, women, and families in underserved communities. Our awareness sessions covered key topics such as:",
    impactBullets: {
      label: "Awareness sessions covered",
      items: [
        { text: "Hand hygiene and proper handwashing practices", icon: Droplets },
        { text: "Healthy lifestyle and nutrition", icon: Salad },
        { text: "Personal hygiene and cleanliness", icon: Sparkles },
        { text: "Environmental sanitation and its impact on health", icon: Recycle },
        { text: "Essential health do's and don'ts for disease prevention", icon: ShieldCheck },
      ],
    },
    impactNote: [
      "To strengthen community awareness on liver health, Shikshadwar Foundation partnered with Liver Care Foundation to organize specialized health awareness camps at our education centres in Bhalaswa and Kadipur. More than 50 women from the local community participated in these sessions.",
      "As part of the programme, participants underwent Body Mass Index (BMI) assessments, received their individual health reports, and were counselled on maintaining a healthy lifestyle through proper nutrition, regular physical activity, and preventive healthcare practices. The initiative enhanced health awareness among women and encouraged them to adopt healthier habits for themselves and their families.",
    ],
    gallery: [
      { src: "/images/gallery/healthcare/health-01.jpg", alt: "A Shikshadwar community healthcare session in progress" },
      { src: "/images/gallery/healthcare/health-kdliver2.jpeg", alt: "A Liver Care Foundation awareness session for children and volunteers at Shikshadwar's Kadipur centre" },
      { src: "/images/gallery/healthcare/health-kdliver4.jpeg", alt: "A community health awareness session at Shikshadwar's Kadipur centre" },
      { src: "/images/gallery/healthcare/health-kdliver6.jpeg", alt: "A community health awareness session at Shikshadwar's Kadipur centre" },
    ],
  },
  {
    slug: "sustainable-development",
    title: "Environment Sustainability",
    cardTitle: "Environment Sustainability Programmes",
    heroHeadline: "Green Earth Begins With One Tree",
    tag: "rust",
    summary:
      "Awareness and eco-friendly household and agricultural practices in a rural context.",
    photoCaption: "Community tree-planting drive",
    icon: TreePine,
    iconImage: "/images/icons/impact/environment-sustainability.png",
    image: {
      src: "/images/programmes/sustainable-development.jpg",
      alt: "A child plants a sapling on open ground as part of Shikshadwar's sustainable development programme",
    },
    intro: [
      "Trees are essential for sustaining life on Earth. They produce oxygen, absorb carbon dioxide, improve air quality, conserve water, prevent soil erosion, and provide habitat for wildlife. As climate change, deforestation, and rapid urbanization continue to threaten our environment, tree plantation has become one of the most effective and sustainable solutions to restore ecological balance.",
      "Tree plantation not only combats global warming by capturing carbon but also enhances biodiversity, improves groundwater recharge, reduces temperatures, and creates healthier living environments. Green spaces contribute to the physical and mental well-being of communities while ensuring a better future for generations to come.",
      "At Shikshadwar Foundation, we promote tree plantation through community participation, awareness campaigns, school and corporate plantation drives, and long-term care of planted saplings. We believe that every tree planted today is an investment in a cleaner, greener, and more sustainable tomorrow.",
    ],
    introSections: [
      {
        heading: "Why Tree Plantation?",
        paragraphs: [
          "Trees are essential for sustaining life on Earth. They produce oxygen, absorb carbon dioxide, improve air quality, conserve water, prevent soil erosion, and provide habitat for wildlife. As climate change, deforestation, and rapid urbanization continue to threaten our environment, tree plantation has become one of the most effective and sustainable solutions to restore ecological balance.",
          "Tree plantation not only combats global warming by capturing carbon but also enhances biodiversity, improves groundwater recharge, reduces temperatures, and creates healthier living environments. Green spaces contribute to the physical and mental well-being of communities while ensuring a better future for generations to come.",
        ],
      },
      {
        heading: "WHAT WE DO",
        paragraphs: [
          "At Shikshadwar Foundation, we promote tree plantation through community participation, awareness campaigns, school and corporate plantation drives, and long-term care of planted saplings. We believe that every tree planted today is an investment in a cleaner, greener, and more sustainable tomorrow.",
        ],
      },
    ],
    introSectionsPlain: true,
    workImage: {
      src: "/images/tree-plantation.jpg",
      alt: "Shikshadwar's Tree Plantation infographic: a six-step 'How We Work' pathway — Planning & Survey, Sapling Selection, Plantation Drive, Care & Maintenance, Awareness & Engagement, and Monitoring & Impact — under the banner 'A tree today, a better tomorrow.'",
      width: 1379,
      height: 919,
    },
    impactStats: [
      { value: 300, suffix: "+", label: "Fruit and native saplings distributed" },
      { value: 4, suffix: "", label: "Delhi locations reached" },
    ],
    impactCaption:
      "During 2025–26, Shikshadwar Foundation donated more than 300 fruit and native tree saplings to schools and local communities to promote environmental sustainability. Along with plantation drives, we conducted awareness sessions to inspire students, teachers, and community members to protect the environment and adopt sustainable practices.",
    gallery: [
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-4.jpeg", alt: "Volunteers and community members plant saplings as part of a Shikshadwar tree-plantation drive" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-7.jpeg", alt: "A Shikshadwar environmental-awareness session at a Delhi government school" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-11.jpeg", alt: "Students take part in a Shikshadwar environmental-awareness activity at school" },
      { src: "/images/gallery/sustainable-development/SCH-ENVIRONMENT-13.jpeg", alt: "A Shikshadwar tree-plantation drive at a Delhi school" },
      { src: "/images/gallery/sustainable-development/tree-planting-girls.jpg", alt: "Two students point to a sapling they planted as part of a Shikshadwar tree-plantation drive" },
      { src: "/images/gallery/sustainable-development/tree-awareness-classroom.jpg", alt: "A Shikshadwar volunteer teaches a classroom about plants as part of an environmental-awareness session" },
    ],
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}

/** URL-safe slug for a sub-programme's own detail page, e.g. "Finding Sponsors" → "finding-sponsors". */
export function slugifySubProgramme(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSubProgramme(
  programmeSlug: string,
  subProgrammeSlug: string,
): { programme: Programme; subProgramme: SubProgramme } | undefined {
  const programme = getProgramme(programmeSlug);
  const subProgramme = programme?.subProgrammes?.find(
    (s) => slugifySubProgramme(s.title) === subProgrammeSlug,
  );
  if (!programme || !subProgramme) return undefined;
  return { programme, subProgramme };
}
