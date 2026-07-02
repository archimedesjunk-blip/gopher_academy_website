# Gopher Academy — Handoff

Context for an agent picking this up cold. Read this first.

## What this is

Marketing one-pager for **Gopher Academy**, a small, owner-run, poison-free
gopher-control service in **Sonoma County, California**. It rebuilds the
owner's homemade site (gopheracademy.biz). The site's only job is
**credibility**: get a local homeowner to trust a small operator enough to
request a quote. Not a lead-gen funnel, no online booking — capacity is ~1–2
jobs/week.

- **Audience:** Sonoma County residential homeowners with gophers in the
  lawn/garden/yard. Landscaping-minded, often pet owners and families,
  environmentally conscious (wine country).
- **The one selling point:** mechanical traps only (cinch traps, Gopher
  Hawk). No poison, bait, or gas. Safe around pets, kids, gardens. This leads
  the page.
- **Voice:** warm, local, plainspoken, lightly playful. The headline "We
  teach gophers a lesson." and "The name is a joke. The work is not." set the
  tone. Not salesy, not fear-mongering.

The full source brief lives in the git history / the conversation that
produced commit `6106f18`. The hard rules from it are reproduced below — do
not violate them.

## HARD CONSTRAINTS (legal / trust — do not break)

- **No "licensed / insured / bonded / certified" claims.** The business
  currently carries none. Any such claim is false today. (One insurance line
  can be added later once it's real — that's a flagged open item.)
- **No fixed prices published.** Pricing is quote-based, flat per visit,
  varies by property + severity. Point to a free quote.
- **No fabricated testimonials, reviews, credentials, "years in business",
  or "#1 rated".** A real post-service survey exists; real quotes can be
  dropped in later. Invent nothing.
- **No absolute guarantees** ("100% gopher-free forever"). Honest, reasonable
  promises only.
- **No instant booking / same-day / large-capacity implications.** CTA is
  "Request a free quote."
- **Don't expose internal operating details** (who the trapper is, how work
  or money is split). Public face = "Gopher Academy, Sonoma County gopher
  control."
- **Don't use "humane" or "no-kill."** Traps kill quickly. Accurate framing:
  "poison-free," "no toxic bait," "safe for pets and gardens."
- **Owner style:** prose over hype, **no em-dashes in running website copy.**

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind v4** (`@tailwindcss/postcss`, `@theme` tokens in
  `src/app/globals.css`, `@import "tailwindcss"`)
- **Motion** (`motion/react`) for animation — scroll-driven + mount
- **Geist** fonts (`geist`), **Phosphor** icons (`@phosphor-icons/react`)
- **Vitest** for tests (one file: `validateConsult.test.ts`)
- Light-locked (no dark mode — the dark line-art logo needs a light bg).

Scripts: `npm run dev` | `build` | `start` | `lint` | `test`.

## Layout / file map

Page section order is set in `src/app/page.tsx`:

`Hero → PromiseSection (poison-free) → Stakes (the problem) → Methods (how it
works) → BeforeAfter (flag-off, renders nothing) → Pricing (quote-based) →
About → Testimonials (flag-off, renders nothing) → Consult (quote form) →
Footer`

- `src/lib/content.ts` — shared copy: nav, CTA label/href, service area,
  email, phone, the `flags` layer, and `testimonials`. **`email` and `phone`
  are placeholders.** See "Flags layer" below.
- `src/components/Hero.tsx` — `"use client"`. Mount intro animation (`rise()`
  helper, opacity/y), `useScroll` on the section, renders `<GrassGround>`.
- `src/components/GrassGround.tsx` — the cartoon SVG hero animation (see
  below). Most of the complexity in the project is here.
- `src/components/Consult.tsx` — `"use client"` quote form (name, email,
  phone, property location, message). Posts to `/api/consult`.
- `src/app/api/consult/route.ts` — validates name+email, **just
  `console.log`s the submission.** Not wired to email/CRM yet.
- `src/lib/validateConsult.ts` (+ `.test.ts`) — validates name + email only.
- `Section.tsx` (wrapper + eyebrow), `Reveal.tsx` (scroll-in fade),
  `Nav.tsx`, `Footer.tsx`, `Stakes/Promise/Methods/Pricing/About.tsx`,
  `Testimonials.tsx` (flag-gated), `BeforeAfter.tsx` (flag-gated).

## Flags layer (`src/lib/content.ts`)

`src/lib/content.ts` is the single owner-editable file for contact info,
flags, and testimonials. `content.flags` gates copy that must not appear
until it is true:

- `showPhone`: the placeholder phone number is intentionally visible
  pre-launch; swap `content.phone` for the real number before launch.
- `showTestimonials`: stays `false`, and `Testimonials.tsx` renders `null`,
  until real quotes from the post-service survey are added to
  `content.testimonials` (never invent one).
- `showBeforeAfter`: stays `false`, and `BeforeAfter.tsx` renders `null`,
  until real photos exist at `public/photos/before-1.jpg` and
  `public/photos/after-1.jpg` (see `public/photos/README.txt`).
- `showInsuredLine`: stays `false` until liability insurance is actually in
  force (hard constraint, see below).

Nothing fake renders while a flag is off: both `Testimonials` and
`BeforeAfter` are server components whose first line of logic is the flag
(and, for testimonials, empty-data) check. Nav links for `#testimonials` and
`#results` can be added to `content.nav` once their flags flip; both
sections are reachable by scroll in the meantime.

## The grass animation (GrassGround.tsx) — read before touching

Scroll-driven cartoon scene at the bottom of the hero. As you scroll the
hero (`scrollYProgress` 0→1): bare dirt → grass grows up out of the soil →
gopher pops up → roots draw downward. Current, user-approved behavior:

- **Blades** emerge **tip-first**: each blade starts a full blade-height
  below the ground line and slides up (`translateY`), clipped at the ground
  line (`above-soil` clip) so the underground part stays hidden behind the
  darker dirt lip. They also **`scaleX` from 0.3 → 1** (slim sliver → full
  width) as they rise. CSS keyframe `grass-sway` adds idle sway.
- **Roots** draw downward via Motion `pathLength` on open stroked paths
  (taproot first, then branches). `butt` linecaps (round caps left stray
  dots).
- **Gopher** pops up via `translateY`, clipped to above the soil line.
- **Soil** has static small "spec stones" (`SPECKS`) for texture — all small,
  no large rocks (user removed those).
- Color tokens (`--color-grass*`, `--color-soil*`, `--color-root`,
  `--color-rock*`, `--color-gopher*`) live in `globals.css`.

### CRITICAL gotcha: SSR hydration + Math.sin

Blade/root/speck geometry is generated deterministically with a
`rand(seed)` = `Math.sin(...)` helper. **`Math.sin` returns different
last-digit floats in Node (SSR) vs the browser.** If any of those floats
reach the rendered SVG/transform as a raw number, the SSR and client strings
differ → **React hydration mismatch**. That mismatch silently **freezes the
Hero's mount animation** (headline renders at `opacity:0` and never
animates). It is the #1 recurring bug in this file.

Rules to keep it from happening:
- All SVG coordinate strings go through `f(n) = n.toFixed(2)`.
- Any value fed to a Motion `style` transform (e.g. a `translateY` endpoint)
  must be rounded to a stable value — blades use `Math.round(b.h)`. Constants
  (like the `scaleX` 0.3→1 endpoints, or the gopher's integer `[150,0]`) are
  safe as-is.
- If you add new random geometry, round it the same way.

Note: with ~120 motion components, the Hero intro animation completes a beat
later than a fast probe — if you check `h1` opacity right after load it may
still read 0 mid-animation. Wait ~3s (or screenshot) before concluding it's
"frozen." A genuine freeze shows the red "1 Issue" hydration badge in the
Next dev overlay.

## Dev workflow notes

- `npm run build` clobbers the dev server's `.next`. After a build, the
  reliable reset is: kill `next dev`, `rm -rf .next`, restart `npm run dev`.
- Rapid HMR edits + repeated reloads can leave the dev client in a stale
  state. A fully clean restart (above) clears it.
- Visual verification was done via the Chrome browser-automation tools
  (screenshot at scroll positions). Check the Next dev overlay badge for
  hydration issues.

## Git / remote

- Branch: `master`. Remote: `git@github.com:tyler-grimes/gopher_academy_website.git`.
- Working pattern this project: commit each iteration and push to `master`
  (user asks for pushes). Currently clean and pushed (HEAD `7223372`).

## Status / open items

Site is content-complete against the brief and visually approved. Before
launch, confirm with the owner (Archie):

1. **Where quote submissions should go.** `/api/consult` currently only
   `console.log`s. Needs wiring to email/CRM (Resend, Formspree, SMTP) and a
   real inbox.
2. **Phone and email are both placeholders in `content.ts`.** Swap
   `content.phone` and `content.email` for the real values before launch.
3. **Real photos needed for BeforeAfter.** Drop `before-1.jpg` and
   `after-1.jpg` into `public/photos/`, then flip `flags.showBeforeAfter`.
   The section renders nothing until then.
4. **Real survey quotes needed for Testimonials.** Add real quotes from the
   post-service survey to `content.testimonials`, then flip
   `flags.showTestimonials`. None may be invented; the section renders
   nothing until then.
5. **Insurance status.** If/when insurance is in force, flip
   `flags.showInsuredLine` to add the "insured" line, until then it stays
   off entirely (hard constraint above).

No work is mid-flight; the last session ended on a clean, pushed state.
Recent visual iteration was all on the grass animation — if the user wants
more grass/scene tweaks, that's `GrassGround.tsx` (mind the hydration rule).
