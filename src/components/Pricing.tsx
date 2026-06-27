import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { content } from "@/lib/content";

const points = ["Flat per visit, not per gopher", "Quoted after we see the yard", "Free quote, no pressure"];

export function Pricing() {
  return (
    <Section id="pricing" className="border-t border-hairline">
      <Reveal>
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Pricing is a quick conversation.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
          Every yard is different, so every job is priced after we see it. We charge a flat rate per visit, not per
          gopher, and the number depends on the size of your property and how far the gophers have spread. Most jobs take
          a few visits. Activity runs heaviest in spring and fall, so that is when we are busiest. Tell us what you are
          seeing and we will send a free quote.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col divide-y divide-hairline border-y border-hairline sm:flex-row sm:divide-x sm:divide-y-0">
          {points.map((p) => (
            <p key={p} className="flex-1 px-4 py-5 text-sm font-medium text-ink">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.16}>
        <a href={content.cta.href} className="mt-10 inline-block rounded-full bg-accent px-7 py-3 font-medium text-on-accent transition-colors hover:bg-accent-hover active:scale-[0.98]">
          {content.cta.label}
        </a>
      </Reveal>
    </Section>
  );
}
