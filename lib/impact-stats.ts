export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
}

// Canonical beneficiary counts — single source of truth for both the
// homepage impact band and the about-page stats (previously two
// independently-maintained arrays that had started to disagree in shape).
export const beneficiaryStats: ImpactStat[] = [
  { value: 467, suffix: "+", label: "Lives touched — Education" },
  { value: 476, suffix: "+", label: "Lives touched — Healthcare" },
  { value: 59, suffix: "+", label: "Lives touched — Livelihood" },
  { value: 100, suffix: "+", label: "Lives touched — Youth Empowerment" },
  { value: 100, suffix: "+", label: "Saplings planted — Sustainable Development" },
];

export const reachStats: ImpactStat[] = [
  { value: 5, suffix: "", label: "States we work in" },
  { value: 6, suffix: "", label: "Programme areas" },
];
