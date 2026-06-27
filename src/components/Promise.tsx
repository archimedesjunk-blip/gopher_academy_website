import { Section } from "./Section";
import { Reveal } from "./Reveal";

const items = ["Safe for pets, kids, and gardens", "No poison in the food chain", "Mechanical traps only"];

export function PromiseSection() {
  return (
    <Section id="promise" eyebrow="Poison-free" className="border-t border-hairline">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
            We trap gophers. We don&apos;t poison your yard.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Most gopher control leans on poison bait or gas cartridges. We do not use any of it. Gopher Academy works
            with spring traps and nothing else, set right in the active tunnels. That means nothing toxic sitting in your
            soil, nothing in the food chain for a dog or a curious kid to find, and gophers that are caught and removed
            instead of left underground.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 flex max-w-3xl flex-col divide-y divide-hairline border-y border-hairline text-center sm:flex-row sm:divide-x sm:divide-y-0">
          {items.map((t) => (
            <p key={t} className="flex-1 px-4 py-5 text-sm font-medium text-ink">
              {t}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
