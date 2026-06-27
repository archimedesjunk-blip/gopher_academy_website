import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { MagnifyingGlass, Path, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const steps = [
  { icon: MagnifyingGlass, title: "Walk the property", body: "We come out, read the yard, and find the active tunnels. Fresh mounds tell us where the gopher is actually working." },
  { icon: Path, title: "Set the traps", body: "Mechanical spring traps go straight into the active runs. No bait scattered around, nothing toxic near your beds or your pets." },
  { icon: CheckCircle, title: "Return and clear", body: "We come back to check the traps, clear what we have caught, and reset until the activity stops. Not just treated once, actually quiet." },
];

export function Methods() {
  return (
    <Section id="methods" eyebrow="How we work" className="border-t border-hairline">
      <Reveal>
        <h2 className="max-w-[18ch] text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          How we clear a yard.
        </h2>
      </Reveal>
      <div className="mt-14 flex flex-col">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="flex gap-6 border-t border-hairline py-8">
              <s.icon size={28} weight="light" className="mt-1 shrink-0 text-accent" />
              <div>
                <h3 className="text-xl font-medium text-ink">{s.title}</h3>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
