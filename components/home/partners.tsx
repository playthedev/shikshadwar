import Image from "next/image";
import { Container } from "@/components/shared/container";

const partners = [
  { name: "Accentors Technology", src: "/images/partners/accentors.png" },
  { name: "Vidyanjali", src: "/images/partners/vidyanjali.jpg" },
];

export function Partners() {
  return (
    <section className="border-t border-border py-16">
      <Container>
        <p className="text-center text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          In partnership with
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex h-24 w-48 items-center justify-center rounded-(--radius) border border-border bg-surface p-4 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative h-full w-full">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="192px"
                  quality={92}
                  className="object-contain grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
