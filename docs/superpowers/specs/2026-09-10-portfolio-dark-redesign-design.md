# Portfolio dark redesign — design spec

Date: 2026-09-10
Status: approved

## Goal

Rebuild the static single-file portfolio (`index_1.html` skeleton) as a componentised
Next.js 16 App Router site with a committed dark navy/teal theme and Motion-driven
animation, at a quality level that reads as a senior frontend engineer's own work.

Two readers, one page: a non-technical reader gets the plain-English summary under each
project; a technical reader opens "Under the hood". This split is preserved in every entry.

## Decisions (confirmed with the user)

- **Dark-only.** One palette, no light mode, no theme toggle.
- **Hero visual is code, not an image.** An animated SVG node-network (navy/teal) replaces
  `hero-img.png`. No raster hero asset ships.
- **Automation section uses an animated diagram**, same node/line visual language, in place
  of the missing n8n screenshot. No fabricated screenshot.
- **Animation library:** `motion` (import from `motion/react`).
- **Content edits:**
  - eMedia Interactive entry uses the resolved "CloserLook VR — eMedia Interactive" copy.
  - CREAM Games mobile bullet: payments are Apple Pay / Google Pay (app-store policy), not
    Paystack/Flutterwave WebView.
  - "Practice" toolkit row in How I Work drops Vercel and Netlify. Per-project stack tags are
    untouched.
  - All encoding artifacts (â€”, Ã©, â‚¦ …) are corrected to proper characters (—, é, ₦).

## Architecture

```
src/
  app/
    layout.tsx        root layout: next/font (Space Grotesk, Inter), metadata, dark <html>
    page.tsx          assembles sections in order
    globals.css       Tailwind v4 @theme tokens (dark palette), base styles, reduced-motion
  components/
    layout/
      NavBar.tsx      sticky bar that appears after the hero + scroll progress line
      Footer.tsx      closing CTA (gradient panel) + colophon
    sections/
      Hero.tsx        headline, role line, standfirst, contact links, HeroGraphic
      HeroGraphic.tsx animated SVG node network (client)
      WhatIDo.tsx     three-column capability grid
      SelectedWork.tsx maps projects data -> ProjectEntry
      ProjectEntry.tsx one project: head, live link, plain summary, optional visual, Accordion
      AutomationDiagram.tsx animated capture→validate→dedupe→score→notify flow (client)
      WhereIveWorked.tsx roles table
      HowIWork.tsx    practice paragraphs + toolkit grid
    ui/
      Reveal.tsx      whileInView wrapper (fade + rise), honours reduced motion
      Accordion.tsx   button + aria-expanded/aria-controls, Motion height animation
  data/
    projects.ts       typed Project[] (title, kind, href?, summary, bullets, stack, visual?)
    roles.ts          work history rows
    toolkit.ts        How I Work toolkit rows
    site.ts           name, email, phone, links, résumé path
public/
  kodeguru-mark.png              logo mark (from Downloads/new-logo-kodeguru.png)
  og-image.png                   social card (from Downloads/social card.png)
  Erhahon-Imafidon-Resume.pdf    real résumé (from Downloads)
```

Default create-next-app SVGs in `public/` are removed. `src/app/favicon.ico` is replaced by
metadata `icons` pointing at the logo mark.

## Theme

Tokens defined in `globals.css` under `@theme`:

- `--color-navy: #12457F`, `--color-teal: #1F9AA6` (brand, unchanged)
- Background scale: `--color-bg: #070D16`, `--color-bg-2: #0C1622`, `--color-bg-3: #111E2E`
- Text: `--color-ink: #EAF1F6`, `--color-ink-soft: #8FA5B5`
- Lines: `--color-line: rgba(255,255,255,0.08)`, `--color-line-soft: rgba(255,255,255,0.05)`
- Gradient `--grad: linear-gradient(120deg, navy, teal)` is the only loud element. It appears
  on: role line text, bullet dots, scroll progress line, section-title tick, closing panel,
  and the hero/automation node graphics. Nowhere else.
- Fonts: `--font-display: Space Grotesk`, `--font-body: Inter`, `--font-mono: ui-monospace`.

## Motion

All via `motion/react`. `useReducedMotion()` short-circuits every entrance to a static state.

- **Hero entrance:** staggered fade + rise on mark, h1, role, standfirst, contact bar, graphic.
- **HeroGraphic:** ~14 nodes, ~18 edges. Edges animate `pathLength` 0→1 on mount (staggered);
  nodes scale in; then a slow looping `y`/`x` drift (±4–8px, 6–10s, mirrored) per node.
  Edges are drawn from node positions so they move with them. Gradient stroke navy→teal.
- **Reveal:** `whileInView` once, `initial {opacity:0, y:18}` → `{opacity:1, y:0}`,
  0.7s, custom ease. Sections and project entries wrap in it.
- **NavBar:** `useScroll` → `scrollY` compared to hero height toggles a translateY.
  Progress line is `scaleX` bound to `scrollYProgress` via `useTransform`.
- **Accordion:** `AnimatePresence` + `motion.div` animating `height: 0 ↔ auto` and
  opacity, 0.42s. Chevron rotates 90°. Trigger is a `<button>` with `aria-expanded` and
  `aria-controls`.
- **AutomationDiagram:** five labelled nodes in a row (wrapping on mobile), edges draw in
  sequence on view, a small pulse travels along the edges on a loop.
- **Micro-interactions:** contact links underline-grow, buttons translateY(-2px) on hover,
  "What I do" cards border-top highlight on hover. Kept from the original.

## Content

All copy is ported from `index_1.html` with the edits listed under Decisions. Order of
Selected Work: CREAM Platform, CREAM Pay, CREAM Games, NYPD, Kreditek Cooperative,
Cosgrove Africa, DeliveryTrack, CloserLook VR — eMedia Interactive, Automation systems.

## Metadata

- title: "Erhahon Imafidon — Software Engineer, Fintech & Media Platforms"
- description, openGraph (title, description, image `/og-image.png`, type website),
  twitter card `summary_large_image`, icons → `/kodeguru-mark.png`.

## Accessibility

Semantic headings preserved (h1 → h2 sections → h3 entries). Focus-visible ring in teal.
Accordion uses proper button semantics. Reduced motion respected. Contrast: ink on bg ≥ 12:1,
ink-soft on bg ≥ 5:1.

## Out of scope

Deployment configuration, `_headers`, Lighthouse tuning beyond what the build gives for free,
a light theme, a blog or additional routes.

## Testing

- `pnpm build` passes with zero type or lint errors.
- Manual browser check: hero entrance plays; every accordion opens/closes; résumé link
  downloads the PDF; no horizontal scroll at 360px, 768px, 1280px; reduced-motion renders
  content statically with nothing hidden.
