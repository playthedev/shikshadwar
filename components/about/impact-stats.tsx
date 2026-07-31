import { StatBand } from "@/components/shared/stat-band";
import { beneficiaryStats, reachStats } from "@/lib/impact-stats";

export function ImpactStats() {
  const caption = reachStats
    .map((stat) => `${stat.value}${stat.suffix} ${stat.label}`)
    .join("  ·  ");

  return (
    <StatBand
      label="Lives touched by programme"
      eyebrow="By the numbers"
      title="What the work has added up to."
      stats={beneficiaryStats}
      tone="surface"
      caption={caption}
      className="border-y border-border"
    />
  );
}
