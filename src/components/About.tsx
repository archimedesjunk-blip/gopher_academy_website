import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Serious about vines. Lighthearted about gophers.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
          We are a small crew that treats your rows the way we would treat our own. The name is a joke. The work is not.
          We know vine roots, we know how gophers move through a block, and we leave a property quieter than we found it.
        </p>
      </Reveal>
    </Section>
  );
}
