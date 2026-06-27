import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Serious about your yard. Lighthearted about gophers.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
          Gopher Academy is a small Sonoma County operation, started and still run by the person who does the trapping.
          No franchise, no call center, no crew of subcontractors. The name is a joke. The work is not. We know how
          gophers move through a yard, we use traps instead of poison, and we leave your lawn quieter than we found it.
        </p>
      </Reveal>
    </Section>
  );
}
