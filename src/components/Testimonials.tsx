// Quotes here come only from the real post-service survey. Flip
// `flags.showTestimonials` in content.ts after adding real ones. Never
// invent a testimonial, name, or town.
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { content } from "@/lib/content";

export function Testimonials() {
  if (!content.flags.showTestimonials || content.testimonials.length === 0) return null;

  return (
    <Section id="testimonials" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          What neighbors say.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {content.testimonials.map((t, i) => (
          <Reveal key={t.name + t.town} delay={i * 0.08}>
            <figure className="border-t border-hairline pt-6">
              <blockquote className="text-lg leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ink">
                {t.name}, {t.town}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
