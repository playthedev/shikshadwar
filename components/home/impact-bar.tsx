import { StatBand } from "@/components/shared/stat-band";
import { beneficiaryStats, reachStats } from "@/lib/impact-stats";

export function ImpactBar() {
  // Label-agnostic so reachStats can gain entries without the copy breaking.
  const caption = reachStats
    .map((stat) => `${stat.value}${stat.suffix} ${stat.label}`)
    .join("  ·  ");

  return (
    <StatBand
      label="Our impact so far"
      eyebrow="Our impact so far"
      title="Counted one person at a time, not rounded up."
      stats={beneficiaryStats}
      tone="pine-tint"
      caption={caption}
    />
  );
}
