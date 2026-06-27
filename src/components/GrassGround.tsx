"use client";
import { motion, useTransform, useReducedMotion, type MotionValue } from "motion/react";

// Deterministic pseudo-random in [0,1) from an integer seed, so the blade
// layout is identical on server and client (no hydration mismatch).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Fixed 2-decimal format. Math.sin differs in the last FP digits between the
// Node SSR runtime and the browser, so coordinates MUST be rounded to a stable
// string or the SVG path `d` won't match on hydration.
const f = (n: number) => n.toFixed(2);

const W = 1200; // viewBox width
const H = 160; // viewBox height
const GROUND = 138; // y of the soil line where blades root
const COUNT = 64;

type BladeData = {
  i: number;
  d: string;
  fill: string;
  start: number;
  end: number;
  delay: string;
};

const blades: BladeData[] = Array.from({ length: COUNT }, (_, i) => {
  const r1 = rand(i);
  const r2 = rand(i + 91);
  const r3 = rand(i + 197);
  const x = ((i + 0.5) / COUNT) * W + (r1 - 0.5) * 10;
  const h = 50 + r1 * 84; // blade height
  const lean = (r2 - 0.5) * 36; // tip horizontal offset (the bend)
  const w = 6 + r3 * 5; // base half-width
  const tipY = GROUND - h;
  const fill =
    r1 > 0.62 ? "var(--color-grass-light)" : r1 < 0.32 ? "var(--color-grass-dark)" : "var(--color-grass)";
  const start = r3 * 0.35; // scroll progress where this blade starts growing
  const end = Math.min(start + 0.55, 1);
  const d = `M ${f(x - w)} ${GROUND} Q ${f(x + lean * 0.4)} ${f(GROUND - h * 0.55)} ${f(x + lean)} ${f(tipY)} Q ${f(x + lean * 0.4)} ${f(GROUND - h * 0.45)} ${f(x + w)} ${GROUND} Z`;
  return { i, d, fill, start, end, delay: (r2 * 1.8).toFixed(2) };
});

function Blade({ b, progress, grown }: { b: BladeData; progress: MotionValue<number>; grown: boolean }) {
  const scaleY = useTransform(progress, [b.start, b.end], [0.03, 1], { clamp: true });
  return (
    <g className="grass-blade" style={{ "--sway-delay": `${b.delay}s` } as React.CSSProperties}>
      <motion.path
        d={b.d}
        fill={b.fill}
        style={{ scaleY: grown ? 1 : scaleY, transformBox: "fill-box", transformOrigin: "bottom center" }}
      />
    </g>
  );
}

/** Cartoon grass rooted along a soil line. Blades grow from dirt to full as
 *  `progress` (a scroll MotionValue) goes 0 -> 1. Reduced motion = full grass. */
export function GrassGround({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block h-[32vh] max-h-[210px] min-h-[120px] w-full"
      >
        <path
          d={`M0 ${GROUND} Q ${W * 0.25} ${GROUND - 7} ${W * 0.5} ${GROUND} T ${W} ${GROUND} L ${W} ${H} L 0 ${H} Z`}
          fill="var(--color-soil)"
        />
        {blades.map((b) => (
          <Blade key={b.i} b={b} progress={progress} grown={!!reduce} />
        ))}
      </svg>
    </div>
  );
}
