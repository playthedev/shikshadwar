import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Handshake, GraduationCap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { RevealText } from "@/components/shared/reveal-text";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { ContactForm } from "@/components/forms/contact-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Volunteer, partner or intern with Shikshadwar Foundation.",
  alternates: {
    canonical: "/join-us/",
  },
};

const ways = [
  {
    icon: HeartHandshake,
    title: "Volunteer",
    description:
      "We encourage people to be part of social and economic development in substantial and evolved ways. We provide an engaging platform where you can learn, contribute and teach — long-term and short-term associations both welcome, depending on mutual comfort and purpose.",
  },
  {
    icon: Handshake,
    title: "Partner with us",
    description:
      "Shikshadwar Foundation is a flag bearer of extensive social work for the benefit of the marginalized population of the country. We welcome partnerships and collaboration from NGOs, individuals, CBOs and institutions — mail us for any collaboration ideas.",
  },
  {
    icon: GraduationCap,
    title: "Internship",
    description:
      "Shikshadwar Foundation offers unique opportunities to interns in the form of hands-on experience and exposure to the development sector, focusing on children and youth, under the supervision of our professional team.",
  },
];

export default function JoinUsPage() {
  return (
    <>
      <section className="bg-ink pt-32 pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/60">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-paper/90">Join Us</span>
          </nav>
          <h1 className="max-w-xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-heading text-paper">
            <RevealText text="We need your help." mode="mount" />
          </h1>
          <p className="mt-4 max-w-md text-lg text-paper/75">
            Do you want to get involved?
          </p>
        </Container>
      </section>

      <section className="py-[clamp(3.5rem,7vw,6rem)]">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {ways.map((way, index) => (
              <Reveal as="li" key={way.title} delay={index * 0.06}>
                <SpotlightCard className="h-full rounded-(--radius)">
                  <div className="flex h-full flex-col rounded-(--radius) border border-border bg-surface p-7">
                    <way.icon aria-hidden="true" className="size-7 text-rust" />
                    <h2 className="mt-4 font-heading text-xl text-ink">{way.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {way.description}
                    </p>
                    <Dialog>
                      <DialogTrigger className="mt-5 self-start text-sm font-semibold text-ink underline decoration-rust decoration-2 underline-offset-4 hover:text-rust">
                        Get in touch
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Get in touch</DialogTitle>
                          <DialogDescription>
                            Send us your query and we&apos;ll get back to you soon.
                          </DialogDescription>
                        </DialogHeader>
                        <ContactForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-muted/40 py-[clamp(3.5rem,7vw,6rem)]">
        <Container className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-heading text-ink">
            We need your voice, join us!
          </h2>
          <p className="mt-3 text-md text-muted-foreground">
            Fill in the form below and you&apos;ll typically hear back from us
            within eight business days.
          </p>
          <div className="mt-8 rounded-(--radius) border border-border bg-surface p-6 md:p-8">
            <VolunteerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
