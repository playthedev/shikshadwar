import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  caption: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  tag?: "rust" | "pine";
  /** Thematic icon shown as the dummy illustration; defaults to a generic image glyph. */
  icon?: LucideIcon;
  className?: string;
}

const aspectClass: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * Stands in for a real photograph until the client supplies actual
 * programme/beneficiary photography. Never render invented stock photos of
 * people here — this placeholder is deliberately abstract so nothing on the
 * live site is ever mistaken for a real person who didn't consent to it.
 */
export function PhotoPlaceholder({
  caption,
  aspect = "landscape",
  tag = "rust",
  icon: Icon = ImageIcon,
  className,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-(--radius) border border-border p-4 text-center",
        aspectClass[aspect],
        tag === "rust"
          ? "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--rust),white_88%),color-mix(in_oklch,var(--rust),white_78%))]"
          : "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--pine),white_88%),color-mix(in_oklch,var(--pine),white_78%))]",
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-10",
          tag === "rust" ? "text-rust/40" : "text-pine/40",
        )}
      />
      <p className="max-w-[80%] font-sans text-xs leading-snug text-ink/55">{caption}</p>
    </div>
  );
}
