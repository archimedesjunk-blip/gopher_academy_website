import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Stakes() {
  return (
    <Section id="stakes" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          You know the mounds. You know what&apos;s under them.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
          Pocket gophers work below the surface, chewing through roots and pulling whole plants down into their tunnels.
          You see the fan-shaped mounds across the lawn, the wilting beds, the vegetable starts that vanish overnight.
          Left alone, one gopher turns into a network of runs, and the damage spreads through everything you have planted.
        </p>
      </Reveal>
    </Section>
  );
}
