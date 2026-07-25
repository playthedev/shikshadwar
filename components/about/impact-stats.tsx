import { Container } from "@/components/shared/container";
import { CountingNumber } from "@/components/shared/counting-number";
import { aboutStats } from "@/lib/about-data";

export function ImpactStats() {
  return (
    <section aria-label="Lives touched by programme" className="border-y border-border bg-surface">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-5 md:py-12">
        {aboutStats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-rust/30 pl-4">
            <p className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] text-ink">
              <CountingNumber value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
