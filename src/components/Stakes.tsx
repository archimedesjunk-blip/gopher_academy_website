import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Stakes() {
  return (
    <Section id="stakes" className="border-t border-hairline">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Reveal>
          <div className="aspect-square overflow-hidden rounded-xl border border-hairline">
            {/* TODO: real photo - gopher mound between vine rows / exposed roots */}
            <img
              src="https://picsum.photos/seed/vine-roots-soil/800/800"
              alt="Soil and vine roots at the base of a trunk"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
            A gopher doesn&apos;t see a reserve block. It sees lunch.
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
            Pocket gophers sever vine roots, girdle young trunks, and collapse drip lines from below. One quiet season
            underground shows up later in reduced vigor, uneven ripening, and replants you did not budget for. By the time
            the mounds are obvious, the damage is done.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
