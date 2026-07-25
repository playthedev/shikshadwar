import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
  preload?: boolean;
  sizes?: string;
  quality?: number;
  objectPosition?: string;
}

const aspectClass: Record<NonNullable<PhotoProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function Photo({
  src,
  alt,
  aspect = "landscape",
  className,
  preload = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  quality = 85,
  objectPosition,
}: PhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-(--radius) border border-border",
        aspectClass[aspect],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        sizes={sizes}
        quality={quality}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover"
      />
    </div>
  );
}
