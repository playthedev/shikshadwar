import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * Google's keyless embed endpoint — no Maps API key/billing needed, just a
 * plain address query rendered as an iframe.
 */
const mapQuery = encodeURIComponent(siteConfig.contact.address.full);
const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export function ContactMap() {
  return (
    <section className="border-t border-border py-[clamp(3rem,6vw,5rem)]">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
            <p className="text-eyebrow text-rust uppercase">Find us</p>
          </div>
          <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-(--radius) border border-border sm:aspect-[21/9]">
            <iframe
              src={mapSrc}
              title={`Map to ${siteConfig.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
