import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { content } from "@/lib/content";

export function Proof() {
  const [featured, ...rest] = content.testimonials;
  return (
    <Section id="proof" className="border-t border-hairline">
      <Reveal>
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Quiet ground, happy growers.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal delay={0}>
          <figure className="flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface p-7">
            <blockquote className="text-xl leading-relaxed text-ink">{featured.quote}</blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              {featured.name}, {featured.role}
              <br />
              {featured.estate}, {featured.region}
            </figcaption>
          </figure>
        </Reveal>
        <div className="flex flex-col gap-6">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={(i + 1) * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface p-7">
                <blockquote className="line-clamp-3 leading-relaxed text-ink">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  {t.name}, {t.role}
                  <br />
                  {t.estate}, {t.region}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
