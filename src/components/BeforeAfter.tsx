// Photos here must be real before/after shots of yards we have cleared.
// Flip `flags.showBeforeAfter` in content.ts only once real photos exist in
// public/photos/. Never use stock or staged photos.
import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { content } from "@/lib/content";

export function BeforeAfter() {
  if (!content.flags.showBeforeAfter) return null;

  return (
    <Section id="results" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Before and after.
        </h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
          Real yards we have cleared in Sonoma County, gopher activity and all.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-ink">Before</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-hairline">
              <Image
                src="/photos/before-1.jpg"
                alt="A Sonoma County yard with active gopher mounds before treatment"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-ink">After</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-hairline">
              <Image
                src="/photos/after-1.jpg"
                alt="The same yard after gopher activity was cleared"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Reveal>
      {/* TODO: real photos. Drop before-1.jpg and after-1.jpg into public/photos/, then flip flags.showBeforeAfter in content.ts. */}
    </Section>
  );
}
