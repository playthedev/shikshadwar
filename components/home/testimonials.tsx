import { Container } from "@/components/shared/container";
import { TestimonialSlider } from "@/components/shared/testimonial-slider";
import { RevealText } from "@/components/shared/reveal-text";

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
  // Placeholder — replace with a real quote before this ships.
  {
    quote:
      "Placeholder quote. Replace with a real testimonial before launch — the counselling and mentorship gave me a sense of direction I didn't have before.",
    name: "Placeholder Name",
    role: "Student",
  },
  // Placeholder — replace with a real quote before this ships.
  {
    quote:
      "Placeholder quote. Replace with a real testimonial before launch — the vocational training helped me find steady work within a few months of finishing the course.",
    name: "Placeholder Name",
    role: "Programme Graduate",
  },
  // Placeholder — replace with a real quote before this ships.
  {
    quote:
      "Placeholder quote. Replace with a real testimonial before launch — working alongside the team here changed how I think about community outreach.",
    name: "Placeholder Name",
    role: "Volunteer",
  },
];

/**
 * Set on ink, as the one dark passage in the middle of the page. The
 * surrounding sections all sit on paper or a tint of it, so this is what
 * gives the scroll a change of pressure — and it puts the beneficiaries'
 * own words, rather than the organisation's, on the page's strongest field.
 */
export function Testimonials() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-ink py-[clamp(5rem,10vw,10rem)]">
      <div
        aria-hidden="true"
        className="animate-breathe absolute -top-40 -left-32 size-[34rem] rounded-full bg-pine opacity-40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -right-24 -bottom-40 size-[26rem] rounded-full bg-rust opacity-20 blur-3xl"
      />

      <Container className="relative">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
          <p className="text-eyebrow text-gold uppercase">In their words</p>
        </div>
        <h2 className="mt-5 max-w-2xl text-h1 font-heading text-balance text-paper">
          <RevealText text="The people we work with, on what changed." />
        </h2>

        <TestimonialSlider items={testimonials} className="mt-16" />
      </Container>
    </section>
  );
}
