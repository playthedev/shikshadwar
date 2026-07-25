import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

interface PersonCardProps {
  name: string;
  role: string;
  image?: string;
  delay?: number;
}

export function PersonCard({ name, role, image, delay = 0 }: PersonCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="text-center">
        <div className="relative mx-auto aspect-square w-full max-w-[11rem] overflow-hidden rounded-full border border-border bg-muted">
          {image ? (
            <Image
              src={image}
              alt={`Portrait of ${name}`}
              fill
              sizes="176px"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-[color-mix(in_oklch,var(--pine),white_85%)] font-heading text-3xl text-pine"
            >
              {name.charAt(0)}
            </div>
          )}
        </div>
        <p className="mt-4 font-heading text-base text-ink">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Reveal>
  );
}
