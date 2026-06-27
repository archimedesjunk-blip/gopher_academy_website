import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Stakes() {
  return (
    <Section id="stakes" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          A gopher doesn&apos;t see a reserve block. It sees lunch.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
          Pocket gophers sever vine roots, girdle young trunks, and collapse drip lines from below. One quiet season
          underground shows up later in reduced vigor, uneven ripening, and replants you did not budget for. By the time
          the mounds are obvious, the damage is done.
        </p>
      </Reveal>
    </Section>
  );
}
