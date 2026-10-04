# Reyon Lau Jiemin — Portfolio V2

A dark, motion-first single-page portfolio built from scratch with Next.js
(App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis. One
accent color (`#FF8A3D`), strong display type (Bricolage Grotesque), minimal
copy, and honest content — nothing is fabricated. Missing artifacts are
marked with explicit `TODO` placeholders instead of invented links or metrics.

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build + local check:

```bash
npm run build
npm run start    # serves the production build
```

Static checks:

```bash
npm run lint     # ESLint (eslint-config-next)
npx tsc --noEmit # type check
```

## Structure

```
app/
  layout.tsx            fonts (next/font), metadata, OG base
  page.tsx              section assembly (Hero → Projects → Skills → Journey → Contact)
  work/[slug]/page.tsx  project detail pages (static, generateStaticParams)
  globals.css           design tokens (@theme), Lenis CSS, mask-line, reduced-motion guard
  sitemap.ts / robots.ts  SEO files, base URL from env
components/
  Nav.tsx               sticky nav, scroll state, mobile toggle
  MaskReveal.tsx        line-mask reveal (mode="load" | "view")
  Reveal.tsx            RevealGroup / RevealItem / RevealFade (scroll entrances)
  Cursor.tsx            custom cursor (desktop only)
  SmoothScroll.tsx      Lenis wrapper (disabled on touch + reduced motion)
  Magnetic.tsx          pointer-attraction wrapper (desktop only)
  ProjectHeader.tsx     detail page: shared-element plate + gallery
  Icons.tsx             inline SVG brand marks (paths from simple-icons, CC0)
sections/
  Hero.tsx  Projects.tsx  Skills.tsx  Journey.tsx  Contact.tsx  Footer.tsx
data/                     ALL COPY LIVES HERE (English-first, typed)
  site.ts                 profile, nav, contact links, footer
  projects.ts             4 projects: slug, blurb ≤15 words, stack, image, repo, TODO
  skills.ts               primary (Laravel/PHP…) vs leveling (React/Next.js…)
  timeline.ts             2022 → now milestones, one short line each
lib/
  motion.ts                       ONE shared animation config: EASE, durations, springs, variants
  useInViewOnce.ts                IntersectionObserver + scroll/rect fallback — content can never
                                  stay trapped invisible when the observer is throttled
  usePrefersReducedMotion.ts      deterministic reduced-motion flag
public/images/                    project screenshots (verified real, from the V1 registry)
public/icons/                     source SVGs (simple-icons, CC0)
assets/fonts/                     TTFs used by the generated Open Graph image
```

## Editing content

Everything a recruiter sees lives in `data/`:

- **Add / change a project** → `data/projects.ts`. Set `image.width` and
  `image.height` to the real pixel size of the screenshot — the card and
  detail plate use that natural ratio, so screenshots are never cropped
  sideways. Keep `blurb` under ~15 words. For a link you cannot publish yet,
  set `todo: "TODO: …"`; the card and detail page render it as a clearly
  marked placeholder.
- **Skills** → `data/skills.ts` (`primarySkills` = "at home", `levelingSkills`
  = "currently leveling up"). The visible marquee has a matching `sr-only`
  list so screen readers get the full inventory.
- **Journey** → `data/timeline.ts` — one short line per milestone.
- **Name / contact / footer** → `data/site.ts`.

To add a screenshot, drop it in `public/images/` and reference it from the
project entry with its true dimensions.

## Motion system

- All easing / duration / spring tokens live in `lib/motion.ts` — nothing is
  hardcoded at call sites.
- Above the fold, the hero reveals on mount (`MaskReveal mode="load"`). Below
  the fold, reveals trigger through `useInViewOnce`: an IntersectionObserver
  plus a passive scroll/resize rect check, so content that was already
  scrolled past — or is waiting on a throttled observer — still shows.
- Shared-element transition: each card plate (`layoutId`) morphs into the
  project detail hero and back.
- `prefers-reduced-motion: reduce`: animations never run. The CSS guard in
  `globals.css` neutralizes inline animation styles that came from SSR, JS
  branches render plain static elements, marquees stop, and Lenis is off.

## SEO / accessibility

- Metadata, generated Open Graph image (`app/opengraph-image.tsx`), favicon,
  sitemap, robots. Set `NEXT_PUBLIC_SITE_URL` once the real domain exists —
  until then generated URLs use `https://example.invalid` on purpose.
- Semantic landmarks (`header/nav/main/section/footer`), one `h1`, visible
  focus states, alt text on every image, strong contrast, keyboard operable.
- Responsive at 375 / 768 / 1440 with zero horizontal overflow, verified in a
  real browser.

## Known TODOs (real data needed — do not invent)

| Item | Where | Status |
| --- | --- | --- |
| CV PDF | `data/site.ts` | TODO until the PDF is provided |
| LinkedIn URL | `data/site.ts` | TODO until verified |
| Live app URLs (Warung Lupi, Daily-Co) | `data/projects.ts` | production domains are user-owned; add when you want them public |
| Hermes DevOps repo link | `data/projects.ts` | repo is private — marked placeholder by design |

Honesty rules for this project: no fabricated stars, metrics, clients, or job
history; no "no known vulnerabilities" claims; every number in the copy must
come from verified registry data.

## Deployment

Not wired yet by design (domain pending). The build is plain Next.js with
static output — any `next start` host works. Set `NEXT_PUBLIC_SITE_URL` to the
final origin before deploying so metadata, OG, and sitemap pick it up:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.dev npm run build
```
