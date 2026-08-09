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
  ...sustainableDevelopmentImages,
];
