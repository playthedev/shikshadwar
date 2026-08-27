export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  /** Short label used under the photo badges in the "Lives touched" band. */
  shortLabel?: string;
  /** lucide-react icon name rendered inside the badge, when no photo is set. */
  icon?: "education" | "health" | "livelihood" | "youth" | "tree";
  /** Real programme photo shown in the circular badge, in place of the icon. */
  image?: string;
}

// Canonical beneficiary counts — single source of truth for both the
// homepage impact band and the about-page stats (previously two
// independently-maintained arrays that had started to disagree in shape).
export const beneficiaryStats: ImpactStat[] = [
  {
    value: 467,
    suffix: "",
    label: "Lives touched — Education",
    shortLabel: "Education",
    icon: "education",
    image: "/images/icons/impact/education.png",
  },
  {
    value: 476,
    suffix: "",
    label: "Lives touched — Healthcare",
    shortLabel: "Health",
    icon: "health",
    image: "/images/icons/impact/health.png",
  },
  {
    value: 59,
    suffix: "",
    label: "Lives touched — Livelihood",
    shortLabel: "Livelihood",
    icon: "livelihood",
    image: "/images/icons/impact/livelihood.png",
  },
  {
    value: 100,
    suffix: "",
    label: "Lives touched — Youth Empowerment",
    shortLabel: "Youth Development",
    icon: "youth",
    image: "/images/icons/impact/youth-empowerment.png",
  },
  {
    value: 100,
    suffix: "",
    label: "Saplings planted — Environment Sustainability",
    shortLabel: "Tree Plantation",
    icon: "tree",
    image: "/images/icons/impact/environment-sustainability.png",
  },
];

export const reachStats: ImpactStat[] = [
  { value: 5, suffix: "", label: "States we work in" },
  { value: 6, suffix: "", label: "Programme areas" },
];
