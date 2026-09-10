# Erhahon Imafidon — portfolio

Single-page portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and Motion.

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Structure

- `src/app` — layout, page, theme (`globals.css`), file-based icon and OG image
- `src/components` — `layout/` (nav, footer), `sections/` (one per page section), `ui/` (Reveal, Accordion, SectionTitle, InlineCode)
- `src/data` — all copy and links; edit content here, not in components
- `public` — logo mark and résumé PDF

Design spec and implementation plan live in `docs/superpowers/`.
