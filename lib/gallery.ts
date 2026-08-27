export type GalleryCategory =
  | "education"
  | "healthcare"
  | "livelihood"
  | "youth-empowerment"
  | "sustainable-development";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  education: "Education",
  healthcare: "Healthcare",
  livelihood: "Livelihood",
  "youth-empowerment": "Youth Empowerment",
  "sustainable-development": "Environment Sustainability",
};

const educationCount = 20;
const educationImages: GalleryImage[] = Array.from({ length: educationCount }, (_, i) => ({
  src: `/images/gallery/education/edu-${String(i + 1).padStart(2, "0")}.png`,
  alt: "Students taking part in a Shikshadwar education programme activity",
  category: "education",
}));

const newEducationImages: GalleryImage[] = [
  { file: "edu-21.jpg", alt: "Children take part in a Shikshadwar non-formal education session" },
  { file: "edu-22.jpeg", alt: "Children hold hands during an outdoor activity at a Shikshadwar programme centre" },
  { file: "edu-23.jpg", alt: "A mother and her children stand together in front of a Shikshadwar Foundation banner" },
  { file: "edu-24.png", alt: "Children cheer with their fists raised in front of the Shikshadwar Foundation banner" },
  { file: "edu-25.jpg", alt: "Children hold hands in a circle during an outdoor group activity at a Shikshadwar programme centre" },
].map(({ file, alt }) => ({
  src: `/images/gallery/education/${file}`,
  alt,
  category: "education" as const,
}));

const sustainableDevelopmentImages: GalleryImage[] = [
  "SCH-ENVIRONMENT-4",
  "SCH-ENVIRONMENT-6",
  "SCH-ENVIRONMENT-7",
  "SCH-ENVIRONMENT-8",
  "SCH-ENVIRONMENT-11",
  "SCH-ENVIRONMENT-12",
  "SCH-ENVIRONMENT-13",
].map((name) => ({
  src: `/images/gallery/sustainable-development/${name}.jpeg`,
  alt: "A Shikshadwar tree-plantation and environmental-awareness session at a Delhi school",
  category: "sustainable-development" as const,
}));

const healthcareImages: GalleryImage[] = [
  "health-01.jpg",
  "health-kdliver.jpeg",
  "health-kdliver2.jpeg",
  "health-kdliver3.jpeg",
  "health-kdliver4.jpeg",
  "health-kdliver5.jpeg",
  "health-kdliver6.jpeg",
].map((file) => ({
  src: `/images/gallery/healthcare/${file}`,
  alt: "A Shikshadwar community healthcare awareness session in progress",
  category: "healthcare" as const,
}));

export const galleryImages: GalleryImage[] = [
  ...educationImages,
  ...newEducationImages,
  ...healthcareImages,
  {
    src: "/images/gallery/livelihood/live-01.jpeg",
    alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-02.jpeg",
    alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-03.jpeg",
    alt: "A community member practising embroidery skills in a Shikshadwar livelihood session",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-04.jpeg",
    alt: "An embroidery skill-training session run by Shikshadwar",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-05.jpeg",
    alt: "Raw materials being organised for a Shikshadwar livelihood programme",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-06.jpeg",
    alt: "Raw materials being organised for a Shikshadwar livelihood programme",
    category: "livelihood",
  },
  {
    src: "/images/gallery/livelihood/live-07.png",
    alt: "A Shikshadwar livelihood skilling session",
    category: "livelihood",
  },
  {
    src: "/images/gallery/youth-development/youth-01.png",
    alt: "Young people taking part in a Shikshadwar youth empowerment session",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/youth-02.jpeg",
    alt: "Young people taking part in a Shikshadwar youth empowerment session",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/youth-03.jpg",
    alt: "Youth trainees hold their SkillServ insurance-marketing certificates of completion at a Shikshadwar training programme",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/youth-04.jpg",
    alt: "A Shikshadwar youth skilling and training session",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/youth-05.jpg",
    alt: "A Shikshadwar youth skilling and training session",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/youth-06.jpg",
    alt: "A Shikshadwar trainee receives his SkillServ insurance-marketing certificate of completion",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/mentorship-01.jpeg",
    alt: "A Shikshadwar volunteer leads a Career Pathway mentorship talk for students at a government girls' school",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/mentorship-02.jpeg",
    alt: "Students listen to a Career Pathway mentorship session at a government girls' school",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/mentorship-03.jpeg",
    alt: "A large assembly of students at a Shikshadwar Career Pathway mentorship session",
    category: "youth-empowerment",
  },
  {
    src: "/images/gallery/youth-development/mentorship-04.jpeg",
    alt: "Rows of students seated for a Shikshadwar Career Pathway mentorship session at a government girls' school",
    category: "youth-empowerment",
  },
  ...sustainableDevelopmentImages,
  {
    src: "/images/gallery/sustainable-development/tree-planting-girls.jpg",
    alt: "Two students point to a sapling they planted as part of a Shikshadwar tree-plantation drive",
    category: "sustainable-development",
  },
  {
    src: "/images/gallery/sustainable-development/tree-awareness-classroom.jpg",
    alt: "A Shikshadwar volunteer teaches a classroom about plants as part of an environmental-awareness session",
    category: "sustainable-development",
  },
];
