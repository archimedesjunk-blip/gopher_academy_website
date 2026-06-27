import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" className="border-t border-hairline">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <Reveal>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
            Serious about vines. Lighthearted about gophers.
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
            We are a small crew that treats your rows the way we would treat our own. The name is a joke. The work is not.
            We know vine roots, we know how gophers move through a block, and we leave a property quieter than we found it.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-hairline">
            {/* TODO: real photo - crew walking a vineyard block */}
            <img src="https://picsum.photos/seed/vineyard-crew-field/800/1000" alt="A field crew walking a vineyard block" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
