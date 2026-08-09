export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  /** Short label used under the icon badges in the "Lives touched" band. */
  shortLabel?: string;
  /** lucide-react icon name rendered inside the badge. */
  icon?: "education" | "health" | "livelihood" | "youth" | "tree";
}

// Canonical beneficiary counts — single source of truth for both the
// homepage impact band and the about-page stats (previously two
// independently-maintained arrays that had started to disagree in shape).
export const beneficiaryStats: ImpactStat[] = [
  { value: 467, suffix: "", label: "Lives touched — Education", shortLabel: "Education", icon: "education" },
  { value: 476, suffix: "", label: "Lives touched — Healthcare", shortLabel: "Health", icon: "health" },
  { value: 59, suffix: "", label: "Lives touched — Livelihood", shortLabel: "Livelihood", icon: "livelihood" },
  { value: 100, suffix: "", label: "Lives touched — Youth Empowerment", shortLabel: "Youth Development", icon: "youth" },
  { value: 100, suffix: "", label: "Saplings planted — Environment Sustainability", shortLabel: "Tree Plantation", icon: "tree" },
];

export const reachStats: ImpactStat[] = [
  { value: 5, suffix: "", label: "States we work in" },
  { value: 6, suffix: "", label: "Programme areas" },
];
