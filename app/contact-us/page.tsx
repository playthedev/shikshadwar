import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { ContactForm } from "@/components/forms/contact-form";
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
      <section className="bg-ink pt-32 pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/60">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-paper/90">Contact Us</span>
          </nav>
          <h1 className="max-w-xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-heading text-paper">
            <RevealText text="Get in touch." mode="mount" />
          </h1>
          <p className="mt-4 max-w-md text-lg text-paper/75">
            Give a helping hand to support the underprivileged.
          </p>
        </Container>
      </section>

      <section className="py-[clamp(3.5rem,7vw,6rem)]">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06}>
                <div className="flex gap-4">
                  <item.icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-rust" />
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block text-md text-ink hover:text-rust">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-md text-ink">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-8">
              <p className="mb-6 font-heading text-xl text-ink">We would love to hear from you.</p>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
