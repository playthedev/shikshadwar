import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-(--radius) border border-dashed border-border bg-surface py-20 text-center">
      <Icon aria-hidden="true" className="size-8 text-muted-foreground" />
      <p className="mt-4 font-heading text-lg text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
