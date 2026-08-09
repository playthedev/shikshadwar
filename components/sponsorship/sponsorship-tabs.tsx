import Link from "next/link";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Sponsor a Child", slug: "sponsor-a-child" },
  { label: "Meet our Stars", slug: "meet-our-stars" },
  { label: "Support Us", slug: "support-us" },
] as const;

type TabSlug = (typeof tabs)[number]["slug"];

/**
 * A pill switcher across the three sponsorship-adjacent pages, sitting
 * directly under the hero on each — sponsoring, meeting the children waiting
 * for a sponsor, and supporting the foundation another way are one decision
 * with three doors, and a reader landing on any one of them should be able
 * to reach the other two without hunting through the main nav.
 */
export function SponsorshipTabs({ active }: { active: TabSlug }) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="flex flex-wrap items-center gap-3 py-6">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <Link
              key={tab.slug}
              href={`/${tab.slug}/`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-rust text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-ink",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
