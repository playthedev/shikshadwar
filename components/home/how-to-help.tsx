import { Search, ClipboardList, HandHeart, LineChart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  {
    icon: Search,
    title: "Identify needs",
    description:
      "We start on the ground — visiting communities to understand which gaps in education, health and livelihood matter most where we work.",
  },
  {
    icon: ClipboardList,
    title: "Plan & strategise",
    description:
      "Every need becomes a programme built for that specific community, not a template applied everywhere the same way.",
  },
  {
    icon: HandHeart,
    title: "Implement programmes",
    description:
      "Volunteers, community mobilisers and partner organisations run the work — classrooms, health camps, skilling sessions — on the ground.",
  },
  {
    icon: LineChart,
    title: "Monitor & create impact",
    description:
      "We track outcomes against what we set out to change, and use what we learn to make the next cycle of work better.",
  },
];

/**
 * The four-stage process behind every programme, set as a numbered
 * horizontal sequence rather than four disconnected cards — the point is
 * that each stage feeds the next.
 */
export function HowToHelp() {
  return (
    <section className="border-t border-border py-[clamp(4rem,8vw,8rem)]">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="From identifying a need to measuring its impact"
          animateTitle
          layout="split"
          description="The same four-stage process runs behind every programme on this site, whichever community or focus area it's in."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.08}>
              <div className="flex items-center gap-4">
                <span className="font-heading text-h2 tabular-nums text-ink/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <step.icon aria-hidden="true" className="size-6 text-rust" />
              </div>
              <p className="mt-4 font-heading text-h4 text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
