import { Section } from "./Section";
import { Reveal } from "./Reveal";

const items = ["Licensed and insured", "Discreet, scheduled crews", "Season guarantee"];

export function PromiseSection() {
  return (
    <Section id="promise" className="border-t border-hairline">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
            Gone. And they stay gone.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            If activity returns to a treated block within the season, so do we, at no charge. No long contracts, no broadcast
            poison near your fruit. Just quiet ground.
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
