import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shikshadwar Foundation.",
  alternates: {
    canonical: "/contact-us/",
  },
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.contact.address.full,
    href: undefined,
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
];

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact Us"
        eyebrow="Contact"
        title="Get in touch."
        description="Give a helping hand to support the underprivileged."
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <ul className="border-t border-border">
                  {contactInfo.map((item, index) => (
                    <Reveal as="li" key={item.label} delay={index * 0.06}>
                      <div className="group border-b border-border py-6">
                        <div className="flex items-center gap-3">
                          <item.icon
                            aria-hidden="true"
                            className="size-4 shrink-0 text-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover:-translate-y-0.5"
                          />
                          <p className="text-eyebrow text-muted-foreground uppercase">
                            {item.label}
                          </p>
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-3 block font-heading text-h4 text-ink transition-colors hover:text-rust"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-3 font-heading text-h4 leading-snug text-ink">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Send a message</p>
                </div>
                <h2 className="mt-5 font-heading text-h3 text-balance text-ink">
                  We would love to hear from you.
                </h2>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ContactMap />
    </>
  );
}
