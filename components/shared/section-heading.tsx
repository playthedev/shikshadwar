import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/shared/reveal-text";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Animates the title in word-by-word on scroll — only works when title is a plain string. */
  animateTitle?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  animateTitle = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-sans text-sm font-semibold tracking-wide text-rust uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-heading text-ink">
        {animateTitle && typeof title === "string" ? (
          <RevealText text={title} />
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="mt-4 text-md leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
