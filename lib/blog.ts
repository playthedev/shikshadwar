import type { LucideIcon } from "lucide-react";
import { BookOpen, HandCoins, HeartPulse, Users } from "lucide-react";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tag: "rust" | "pine";
}

/** Thematic icon shown in each post's dummy placeholder illustration, keyed by category. */
export const blogCategoryIcons: Record<string, LucideIcon> = {
  Education: BookOpen,
  Livelihood: HandCoins,
  Healthcare: HeartPulse,
  "Youth Development": Users,
};

/**
 * Placeholder posts so the Blog page isn't empty during development.
 * Replace with real field stories before launch.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "digital-classrooms-learning-outcomes",
    title: "How Digital Classrooms Are Changing Learning Outcomes",
    excerpt:
      "A look at how smartboards and low-cost digital tools are helping government-school students catch up on foundational literacy and numeracy.",
    date: "2026-06-12",
    category: "Education",
    tag: "rust",
  },
  {
    slug: "enterprise-resource-centres-one-year-on",
    title: "Enterprise Resource Centres: One Year On",
    excerpt:
      "Early results from our vocational training centres, and what beneficiaries have told us about turning a new skill into a sustainable income.",
    date: "2026-05-20",
    category: "Livelihood",
    tag: "pine",
  },
  {
    slug: "monsoon-health-camps-recap",
    title: "Monsoon Health Camps: A Season in Review",
    excerpt:
      "Notes from this year's seasonal health camps — what communities asked for most, and how our healthcare partners responded.",
    date: "2026-04-08",
    category: "Healthcare",
    tag: "rust",
  },
  {
    slug: "youth-leadership-workshop-reflections",
    title: "Reflections From Our Latest Youth Leadership Workshop",
    excerpt:
      "Young participants share what they took away from a weekend of sessions on communication, civic awareness and peer mentoring.",
    date: "2026-03-02",
    category: "Youth Development",
    tag: "pine",
  },
];
