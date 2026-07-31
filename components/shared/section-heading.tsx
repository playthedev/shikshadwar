import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";

type Accent = "rust" | "pine" | "gold";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Animates the title in word-by-word on scroll — only works when title is a plain string. */
  animateTitle?: boolean;
  /**
   * "stacked" runs the description under the title on one measure.
   * "split" sends it to its own column on the right of a 12-column field,
   * which is what keeps a heading from sitting alone above a wide grid.
   */
  layout?: "stacked" | "split";
  /** Heading size. "lg" is for a section that opens a page. */
  size?: "default" | "lg";
  accent?: Accent;
  /** Rendered at the end of the heading row — e.g. a "view all" link. */
  action?: ReactNode;
}

const accentRule: Record<Accent, string> = {
  rust: "bg-rust",
  pine: "bg-pine",
  gold: "bg-gold",
};

const accentText: Record<Accent, string> = {
  rust: "text-rust",
  pine: "text-pine",
  gold: "text-ink",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  animateTitle = false,
  layout = "stacked",
  size = "default",
  accent = "rust",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  const heading = (
    <>
      {eyebrow ? (
        <div className={cn("flex items-center gap-3", centered && "justify-center")}>
          {/* The rule is the site's signature on a heading — it appears on
              every eyebrow from the hero down, which is what ties sections
              on different pages together. */}
          <span aria-hidden="true" className={cn("h-px w-8 shrink-0", accentRule[accent])} />
          <p className={cn("font-sans text-eyebrow uppercase", accentText[accent])}>{eyebrow}</p>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-heading text-balance text-ink",
          size === "lg" ? "text-h1" : "text-h2",
          eyebrow && "mt-5",
        )}
      >
        {animateTitle && typeof title === "string" ? <RevealText text={title} /> : title}
      </h2>
    </>
  );

  if (layout === "split") {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
        <div className="lg:col-span-7">{heading}</div>
        {description ? (
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </Reveal>
        ) : null}
        {action ? (
          <div className={cn("lg:col-span-4 lg:col-start-9", description && "lg:hidden")}>
            {action}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        action && "flex flex-wrap items-end justify-between gap-6",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {heading}
        {description ? (
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
