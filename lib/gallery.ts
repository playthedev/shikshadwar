export type GalleryCategory =
  | "education"
  | "healthcare"
  | "livelihood"
  | "youth-development";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  education: "Education",
  healthcare: "Healthcare",
  livelihood: "Livelihood",
  "youth-development": "Youth Development",
};

const educationCount = 20;
const educationImages: GalleryImage[] = Array.from({ length: educationCount }, (_, i) => ({
  src: `/images/gallery/education/edu-${String(i + 1).padStart(2, "0")}.png`,
  alt: "Students taking part in a Shikshadwar education programme activity",
  category: "education",
}));

export const galleryImages: GalleryImage[] = [
  ...educationImages,
  {
    src: "/images/gallery/healthcare/health-01.jpg",
    alt: "A Shikshadwar community healthcare session in progress",
    category: "healthcare",
  },
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
    alt: "Young people taking part in a Shikshadwar youth development session",
    category: "youth-development",
  },
  {
    src: "/images/gallery/youth-development/youth-02.jpeg",
    alt: "Young people taking part in a Shikshadwar youth development session",
    category: "youth-development",
  },
];
