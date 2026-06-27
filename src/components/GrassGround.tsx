"use client";
import { motion, useTransform, useReducedMotion, type MotionValue } from "motion/react";

// Deterministic pseudo-random in [0,1) from an integer seed, so the layout is
// identical on server and client (no hydration mismatch).
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Fixed 2-decimal format. Math.sin differs in the last FP digits between the
// Node SSR runtime and the browser, so coordinates MUST be rounded to a stable
// string or the SVG paths won't match on hydration.
const f = (n: number) => n.toFixed(2);

const W = 1200;
const H = 330;
const GROUND = 140; // soil line: blades root here and grow up, roots grow down
const BLADES = 60;
const ROOTS = 15;

type Blade = { i: number; d: string; fill: string; start: number; end: number; delay: string };

const blades: Blade[] = Array.from({ length: BLADES }, (_, i) => {
  const r1 = rand(i);
  const r2 = rand(i + 91);
  const r3 = rand(i + 197);
  const x = ((i + 0.5) / BLADES) * W + (r1 - 0.5) * 12;
  const h = 46 + r1 * 74; // max < GROUND so tips stay inside the band
  const lean = (r2 - 0.5) * h * 0.9; // strong bend, proportional to height
  const w = 11 + r3 * 9; // fatter base reads as a leaf, not a spike
  const tipY = GROUND - h;
  const fill = r1 > 0.62 ? "var(--color-grass-light)" : r1 < 0.32 ? "var(--color-grass-dark)" : "var(--color-grass)";
  const start = r3 * 0.2;
  const end = Math.min(start + 0.35, 0.5); // grass mostly grown by mid-scroll
  // Curved leaf: both edges arc toward the lean direction so the blade bends.
  const d =
    `M ${f(x - w)} ${GROUND} ` +
    `C ${f(x - w + lean * 0.5)} ${f(GROUND - h * 0.4)} ${f(x + lean - w * 0.5)} ${f(GROUND - h * 0.82)} ${f(x + lean)} ${f(tipY)} ` +
    `C ${f(x + lean + w * 0.3)} ${f(GROUND - h * 0.7)} ${f(x + w + lean * 0.5)} ${f(GROUND - h * 0.35)} ${f(x + w)} ${GROUND} Z`;
  return { i, d, fill, start, end, delay: (r2 * 1.8).toFixed(2) };
});

type Root = { j: number; main: string; branch: string; start: number; end: number };

const roots: Root[] = Array.from({ length: ROOTS }, (_, j) => {
  const rx = ((j + 0.5) / ROOTS) * W + (rand(j + 11) - 0.5) * 30;
  const rlen = 80 + rand(j + 33) * 110;
  const sway = (rand(j + 57) - 0.5) * 64;
  const main =
    `M ${f(rx)} ${GROUND} ` +
    `C ${f(rx + sway * 0.3)} ${f(GROUND + rlen * 0.3)} ${f(rx + sway)} ${f(GROUND + rlen * 0.6)} ${f(rx + sway * 0.7)} ${f(GROUND + rlen)}`;
  const bx = rx + sway * 0.5;
  const by = GROUND + rlen * 0.45;
  const branch = `M ${f(bx)} ${f(by)} C ${f(bx - 16)} ${f(by + 14)} ${f(bx - 26)} ${f(by + 32)} ${f(bx - 30)} ${f(by + 52)}`;
  const start = 0.4 + rand(j + 71) * 0.25; // roots reach down through the later scroll
  const end = Math.min(start + 0.45, 1);
  return { j, main, branch, start, end };
});

function GrassBlade({ b, progress, grown }: { b: Blade; progress: MotionValue<number>; grown: boolean }) {
  const scaleY = useTransform(progress, [b.start, b.end], [0, 1], { clamp: true });
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

function RootStrand({ r, progress, grown }: { r: Root; progress: MotionValue<number>; grown: boolean }) {
  const scaleY = useTransform(progress, [r.start, r.end], [0, 1], { clamp: true });
  return (
    <motion.g style={{ scaleY: grown ? 1 : scaleY, transformBox: "fill-box", transformOrigin: "top center" }}>
      <path d={r.main} fill="none" stroke="var(--color-root)" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
      <path d={r.branch} fill="none" stroke="var(--color-root)" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
    </motion.g>
  );
}

// Cartoon gopher peeking up at the soil line, centered on `cx`. Drawn in user
// units; paws sit on GROUND, head above. Pops up via translateY as you scroll.
function Gopher({ cx, progress, grown }: { cx: number; progress: MotionValue<number>; grown: boolean }) {
  const y = useTransform(progress, [0.16, 0.32], [150, 0], { clamp: true });
  return (
    <motion.g style={{ y: grown ? 0 : y }}>
      {/* paws gripping the soil line */}
      <ellipse cx={cx - 40} cy={GROUND - 4} rx={17} ry={10} fill="var(--color-gopher)" />
      <ellipse cx={cx + 40} cy={GROUND - 4} rx={17} ry={10} fill="var(--color-gopher)" />
      {/* ears */}
      <circle cx={cx - 40} cy={GROUND - 124} r={16} fill="var(--color-gopher)" />
      <circle cx={cx + 40} cy={GROUND - 124} r={16} fill="var(--color-gopher)" />
      <circle cx={cx - 40} cy={GROUND - 124} r={8} fill="var(--color-gopher-dark)" />
      <circle cx={cx + 40} cy={GROUND - 124} r={8} fill="var(--color-gopher-dark)" />
      {/* head / body blob */}
      <ellipse cx={cx} cy={GROUND - 68} rx={60} ry={72} fill="var(--color-gopher)" />
      {/* muzzle / belly highlight */}
      <ellipse cx={cx} cy={GROUND - 44} rx={38} ry={40} fill="var(--color-gopher-light)" />
      {/* eyes */}
      <circle cx={cx - 23} cy={GROUND - 84} r={9.5} fill="#FFFFFF" />
      <circle cx={cx + 23} cy={GROUND - 84} r={9.5} fill="#FFFFFF" />
      <circle cx={cx - 21} cy={GROUND - 83} r={4.6} fill="var(--color-gopher-dark)" />
      <circle cx={cx + 25} cy={GROUND - 83} r={4.6} fill="var(--color-gopher-dark)" />
      {/* nose */}
      <ellipse cx={cx} cy={GROUND - 58} rx={9} ry={6.5} fill="var(--color-gopher-dark)" />
      {/* two buck teeth */}
      <rect x={cx - 9} y={GROUND - 53} width={8} height={18} rx={2} fill="#FFFFFF" stroke="var(--color-gopher-dark)" strokeWidth={1} />
      <rect x={cx + 1} y={GROUND - 53} width={8} height={18} rx={2} fill="#FFFFFF" stroke="var(--color-gopher-dark)" strokeWidth={1} />
    </motion.g>
  );
}

/** Cartoon grass that grows from bare dirt as `progress` (a scroll MotionValue)
 *  goes 0 -> 1: blades sprout up first, then a gopher peeks and roots reach down.
 *  Reduced motion shows the full grown scene. */
export function GrassGround({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const grown = !!reduce;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-[36vh] max-h-[330px] min-h-[230px] w-full">
        <defs>
          {/* clip the gopher to above the soil line so it hides in its hole */}
          <clipPath id="gopher-clip">
            <rect x={0} y={-H} width={W} height={GROUND + H} />
          </clipPath>
        </defs>
        {/* soil */}
        <path
          d={`M0 ${GROUND} Q ${W * 0.25} ${GROUND - 7} ${W * 0.5} ${GROUND} T ${W} ${GROUND} L ${W} ${H} L 0 ${H} Z`}
          fill="var(--color-soil)"
        />
        {/* roots reach down into the soil */}
        {roots.map((r) => (
          <RootStrand key={r.j} r={r} progress={progress} grown={grown} />
        ))}
        {/* blades */}
        {blades.map((b) => (
          <GrassBlade key={b.i} b={b} progress={progress} grown={grown} />
        ))}
        {/* gopher pops up in front of the grass, clipped to the soil line */}
        <g clipPath="url(#gopher-clip)">
          <Gopher cx={W * 0.64} progress={progress} grown={grown} />
        </g>
      </svg>
    </div>
  );
}
