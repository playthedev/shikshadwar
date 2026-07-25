"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";

const testimonials = [
  {
    quote:
      "The focus on soft skills in the classes was something which we didn't get in our school and homes. I have learnt how to face people with confidence. The counselling sessions helped me a lot, both professionally and personally.",
    name: "Niharika",
    role: "Student",
  },
  {
    quote:
      "I am the first person in my family working in the formal sector. If I hadn't attended the skill development course at Shikshadwar, I would have been working informally with no sense of security — just like my parents.",
    name: "Devanti",
    role: "Student",
  },
  {
    quote:
      "Shikshadwar is the first NGO that came forward for the transgender community, offering skill training in a field we love — beauty and fashion. We're all looking forward to an economically independent life.",
    name: "Geeta Yadav",
    role: "Volunteer & Community Mobiliser, Kadipur",
  },
];

export function Testimonials() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="In Their Words"
          title="What they say about us"
          align="center"
          className="mx-auto"
          animateTitle
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.06}>
              <motion.div
                initial={false}
                whileHover={{ y: -6, rotate: -0.5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <SpotlightCard className="h-full rounded-(--radius)">
                  <figure className="flex h-full flex-col rounded-(--radius) border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                    <Quote aria-hidden="true" className="size-6 text-rust/50" />
                    <blockquote className="mt-4 flex-1 text-md leading-relaxed text-ink">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption className="mt-5 border-t border-border pt-4">
                      <p className="font-heading text-base text-ink">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </figcaption>
                  </figure>
                </SpotlightCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
