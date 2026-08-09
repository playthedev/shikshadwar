import type { Metadata } from "next";
import { HeartHandshake, Handshake, GraduationCap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
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
      <PageHero
        breadcrumb="Join Us"
        title="We need your help."
        image={{ src: "/images/hero/slide-03.png", alt: "", objectPosition: "center 25%" }}
      />

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <SectionHeading
            eyebrow="Ways in"
            title="Three ways to work with us"
            description="Whichever route fits, the form at the bottom of this page reaches the same team."
            animateTitle
            layout="split"
          />

          {/* A numbered index, not three cards. These entries are long-form
              paragraphs — boxing each one made three tall, unequal walls of
              text; hanging them off a rule lets them run at their natural
              length and keeps the reading order obvious. */}
          <ul className="mt-14 border-t border-border">
            {ways.map((way, index) => (
              <Reveal as="li" key={way.title} delay={index * 0.06}>
                <div className="group grid gap-5 border-b border-border py-10 lg:grid-cols-12 lg:gap-10">
                  <div className="flex items-start gap-5 lg:col-span-4">
                    <span className="font-heading text-sm tabular-nums text-ink/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <way.icon
                        aria-hidden="true"
                        className="size-7 text-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover:-translate-y-0.5"
                      />
                      <h3 className="mt-4 font-heading text-h3 text-ink">{way.title}</h3>
                    </div>
                  </div>

                  <div className="lg:col-span-7 lg:col-start-6">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {way.description}
                    </p>
                    <Dialog>
                      <DialogTrigger className="group/cta mt-5 inline-flex items-center gap-3 text-sm font-semibold text-ink">
                        <span className="relative">
                          Get in touch
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-rust transition-transform duration-500 ease-(--ease-out-custom) group-hover/cta:origin-left group-hover/cta:scale-x-100"
                          />
                        </span>
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
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-[#eef2f4] py-[clamp(4rem,8vw,8rem)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
                  <p className="text-eyebrow text-rust uppercase">Volunteer</p>
                </div>
                <h2 className="mt-5 font-heading text-h2 text-balance text-ink">
                  We need your voice, join us.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  Fill in the form and you&apos;ll typically hear back from us within eight
                  business days.
                </p>
              </div>
            </div>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <div className="rounded-(--radius) border border-border bg-surface p-6 md:p-9">
                <VolunteerForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
