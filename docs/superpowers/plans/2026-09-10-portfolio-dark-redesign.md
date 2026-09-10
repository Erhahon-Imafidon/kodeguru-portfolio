# Portfolio Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static portfolio as a componentised, dark-themed Next.js 16 single page with Motion-driven animation, real assets in place, and the content corrections from the spec.

**Architecture:** One App Router route (`src/app/page.tsx`) composes section components. Content lives in typed data files under `src/data/`; presentational components under `src/components/` (layout / sections / ui). Client components are only the ones that animate or hold state (`NavBar`, `Reveal`, `Accordion`, `HeroGraphic`, `AutomationDiagram`); everything else is a server component. Fonts via `next/font/google`; theme tokens via Tailwind v4 `@theme inline` in `globals.css`.

**Tech Stack:** Next.js 16.3 (App Router, React Compiler on), React 19, TypeScript, Tailwind CSS v4, `motion` 13 (`motion/react`), pnpm.

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-dark-redesign-design.md`

**Deviation from spec:** Next 16 docs recommend file-based metadata. Favicon and OG image therefore live at `src/app/icon.png` and `src/app/opengraph-image.png` (auto-wired) rather than `public/` + `metadata.icons`. `public/kodeguru-mark.png` is still needed for the visible logo.

**Testing approach:** The repo has no unit-test runner and the work is presentational. Each task is verified with `pnpm lint` + `pnpm build` (type errors fail the build) and, for visual tasks, a browser check. Do not add a test framework.

**Encoding note:** The source HTML you may see contains mojibake (`â€”`, `Ã©`, `â‚¦`). Every string in this plan is already corrected (—, é, ₦). Copy from this plan, not from the HTML.

---

## File structure

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Root layout, fonts, metadata |
| `src/app/page.tsx` | Section order |
| `src/app/globals.css` | Theme tokens, base styles, custom utilities, reduced motion |
| `src/app/icon.png` | Favicon (file convention) |
| `src/app/opengraph-image.png` + `.alt.txt` | Social card (file convention) |
| `src/data/site.ts` | Name, contact links, résumé path |
| `src/data/projects.ts` | `Project[]` for Selected Work |
| `src/data/roles.ts` | Work history rows |
| `src/data/toolkit.ts` | How I Work toolkit rows |
| `src/components/ui/Reveal.tsx` | Scroll-in wrapper |
| `src/components/ui/Accordion.tsx` | Accessible animated disclosure |
| `src/components/ui/SectionTitle.tsx` | Small eyebrow heading with gradient tick |
| `src/components/ui/InlineCode.tsx` | Renders `` `code` `` spans inside plain strings |
| `src/components/layout/NavBar.tsx` | Sticky bar + scroll progress |
| `src/components/layout/Footer.tsx` | Closing CTA + colophon |
| `src/components/sections/Hero.tsx` | Hero copy + contact bar |
| `src/components/sections/HeroGraphic.tsx` | Animated node network |
| `src/components/sections/WhatIDo.tsx` | Capability grid |
| `src/components/sections/SelectedWork.tsx` | Maps projects |
| `src/components/sections/ProjectEntry.tsx` | One project |
| `src/components/sections/AutomationDiagram.tsx` | Animated flow diagram |
| `src/components/sections/WhereIveWorked.tsx` | Roles |
| `src/components/sections/HowIWork.tsx` | Practice + toolkit |

---

### Task 1: Dependencies and assets

**Files:**
- Modify: `package.json` (via pnpm)
- Create: `public/kodeguru-mark.png`, `public/Erhahon-Imafidon-Resume.pdf`, `src/app/icon.png`, `src/app/opengraph-image.png`, `src/app/opengraph-image.alt.txt`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`, `src/app/favicon.ico`

- [ ] **Step 1: Install motion**

Run: `pnpm add motion`
Expected: `package.json` gains `"motion": "^13.x"`; no peer warnings for react 19.

- [ ] **Step 2: Verify the exports the plan relies on exist**

Run (Git Bash):
```bash
grep -oE "export \{[^}]*\}" node_modules/motion/dist/react.d.ts | head -3; ls node_modules/motion/dist | grep react
```
Then:
```bash
for s in "motion" "AnimatePresence" "useScroll" "useTransform" "useReducedMotion" "useMotionValueEvent" "motionValue" "animate"; do
  grep -rlw "$s" node_modules/motion/dist/react.d.ts >/dev/null && echo "ok $s" || echo "MISSING $s"
done
```
Expected: `ok` for all eight. If `react.d.ts` is not the entry, check `node_modules/motion/package.json` `exports["./react"].types` and grep that file instead.

- [ ] **Step 3: Copy real assets in**

Run (Git Bash):
```bash
cp "/c/Users/Erhahon Imafidon/Downloads/new-logo-kodeguru.png" public/kodeguru-mark.png
cp "/c/Users/Erhahon Imafidon/Downloads/new-logo-kodeguru.png" src/app/icon.png
cp "/c/Users/Erhahon Imafidon/Downloads/Erhahon-Imafidon-Resume.pdf" public/Erhahon-Imafidon-Resume.pdf
cp "/c/Users/Erhahon Imafidon/Downloads/social card.png" src/app/opengraph-image.png
printf 'Erhahon Imafidon — Software engineer: fintech, media, automation' > src/app/opengraph-image.alt.txt
```

- [ ] **Step 4: Remove boilerplate assets**

Run: `git rm -q public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg src/app/favicon.ico`

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml public/kodeguru-mark.png public/Erhahon-Imafidon-Resume.pdf src/app/icon.png src/app/opengraph-image.png src/app/opengraph-image.alt.txt
git commit -m "Add motion, real brand assets and résumé; drop boilerplate icons

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Theme, fonts, layout, empty page

**Files:**
- Modify: `src/app/globals.css` (replace whole file)
- Modify: `src/app/layout.tsx` (replace whole file)
- Modify: `src/app/page.tsx` (replace whole file)

- [ ] **Step 1: Write globals.css**

```css
@import "tailwindcss";

:root {
  --grad: linear-gradient(120deg, #12457f 0%, #1f9aa6 100%);
  color-scheme: dark;
}

@theme inline {
  --color-navy: #12457f;
  --color-teal: #1f9aa6;
  --color-teal-soft: #6fc7cf;
  --color-bg: #070d16;
  --color-bg-2: #0c1622;
  --color-bg-3: #111e2e;
  --color-ink: #eaf1f6;
  --color-ink-soft: #8fa5b5;
  --color-line: rgba(255, 255, 255, 0.08);
  --color-line-soft: rgba(255, 255, 255, 0.05);

  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", "Cascadia Mono", Menlo, monospace;

  --ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
}

@utility grad-bg {
  background-image: var(--grad);
}

@utility grad-text {
  background-image: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@utility wrap {
  margin-inline: auto;
  max-width: 1020px;
  padding-inline: 28px;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 3px;
  border-radius: 3px;
}

.link-grow {
  position: relative;
  padding-bottom: 3px;
  transition: color 0.25s var(--ease-out-soft);
}
.link-grow::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 100%;
  background-image: var(--grad);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.32s var(--ease-out-soft);
}
.link-grow:hover {
  color: var(--color-teal-soft);
}
.link-grow:hover::after {
  transform: scaleX(1);
}

.bullet-dot::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-image: var(--grad);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kodeguru-portfolio.netlify.app"),
  title: "Erhahon Imafidon — Software Engineer, Fintech & Media Platforms",
  description:
    "Erhahon Imafidon builds web and mobile products for fintech and media companies in Nigeria, and the automated systems that run the business behind them.",
  openGraph: {
    title: "Erhahon Imafidon — Software Engineer",
    description:
      "Web and mobile products for fintech and media companies, and the automated systems behind them.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Write a placeholder page.tsx**

```tsx
export default function Home() {
  return (
    <main className="wrap py-24">
      <h1 className="font-display text-5xl font-bold tracking-[-0.04em]">
        Erhahon Imafidon
      </h1>
      <p className="grad-text font-display mt-4 text-2xl font-semibold">
        Theme check
      </p>
    </main>
  );
}
```

- [ ] **Step 4: Build**

Run: `pnpm lint && pnpm build`
Expected: both succeed; build output lists `/` and `/icon.png`, `/opengraph-image.png` routes.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "Set up dark theme tokens, self-hosted fonts and site metadata

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Content data files

**Files:**
- Create: `src/data/site.ts`, `src/data/projects.ts`, `src/data/roles.ts`, `src/data/toolkit.ts`

- [ ] **Step 1: site.ts**

```ts
export const site = {
  name: "Erhahon Imafidon",
  role: "Software Engineer",
  company: "Kodeguru Tech Solutions",
  location: "Abuja, Nigeria",
  email: "imafidonerhahon@gmail.com",
  phoneDisplay: "+234 706 937 4801",
  phoneHref: "tel:+2347069374801",
  github: "https://github.com/Erhahon-Imafidon",
  linkedin: "https://www.linkedin.com/in/imafidon-erhahon-ba17921a0",
  resumePath: "/Erhahon-Imafidon-Resume.pdf",
} as const;
```

- [ ] **Step 2: projects.ts**

Bullets may contain backtick-delimited inline code; `InlineCode` (Task 4) renders it.

```ts
export type Project = {
  slug: string;
  title: string;
  kind: string;
  href?: string;
  hrefLabel?: string;
  summary: string;
  bullets: string[];
  stack: string[];
  visual?: "automation";
};

export const projects: Project[] = [
  {
    slug: "cream-platform",
    title: "CREAM Platform",
    kind: "Media platform for creators and fans",
    href: "https://creamplatform.com",
    hrefLabel: "creamplatform.com",
    summary:
      "A platform where Nigerian musicians and video creators publish their work, build a following and earn from it. I lead the frontend: the site, the media player that keeps playing while you browse, signing in, and the pages where creators upload and manage what they publish. The product has been through two generations — the original web app, and a rebuild on a new architecture once it outgrew the first one.",
    bullets: [
      "Second generation runs on Next.js 16 (App Router) as a backend-for-frontend in front of a Rust API service — the client renders, proxies and holds the session, with no business logic duplicated.",
      "Sign-in is a hand-rolled OIDC authorization-code + PKCE relying party rather than an off-the-shelf auth library, backed by an encrypted httpOnly cookie session. Because the provider rotates refresh tokens, refresh is single-flight so two concurrent requests can never present the same token and log the user out.",
      "Redirect-free silent sign-on: if a sibling CREAM app already has a session, this one adopts it via `prompt=none` with no page unload. Single sign-out is checked against the provider's session status and fails open on provider errors.",
      "One app-wide media element that survives route navigation, handling HLS and raw-file streaming, with a generation counter so a superseded async load can never clobber a newer one.",
      "Interface in six languages — English, Nigerian Pidgin, Yoruba, Igbo, Hausa and French — merged per key over English, so a partial translation degrades gracefully instead of showing blanks.",
      "First generation was a React 19 + Vite SPA. Route-level code splitting, manual vendor chunking, deferred third-party loading and BlurHash image placeholders improved page performance by around 60%.",
      "CI runs lint, typecheck and build, then deploys over SSH to a systemd service behind a reverse proxy.",
    ],
    stack: [
      "Next.js 16", "React 19", "TypeScript", "Rust API", "OIDC / PKCE", "iron-session",
      "Tailwind v4", "HLS.js", "WebSockets", "next-intl", "Sentry", "GitHub Actions",
    ],
  },
  {
    slug: "cream-pay",
    title: "CREAM Pay",
    kind: "Wallet, transfers and identity verification",
    href: "https://pay.creamplatform.com/login",
    hrefLabel: "pay.creamplatform.com",
    summary:
      "The money side of the same platform. Users verify their identity, hold a balance, send transfers and withdraw to their bank account. Because it handles real money, the security model is stricter than a normal app: being signed in is not the same as being allowed to move funds, and the app treats those as two separate permissions.",
    bullets: [
      "Two-tier auth: an ordinary session, plus a separate step-up elevation required for sensitive routes. Elevation is always re-verified server-side, never trusted from local state, and its unknown state is distinct from false so protected content never flashes before the check resolves.",
      "Idle timeout revokes elevation only, not the session — walking away costs you the unlock screen, not a full logout.",
      "OIDC/PKCE single sign-on coexists with password login and is switched entirely by whether the issuer is configured. Refresh is proactive but only while the user is active; the 401 handler tries a refresh, then a silent login, before giving up.",
      "Money-movement endpoints require a transaction PIN. Identity verification (BVN, NIN, address) is asynchronous — the API accepts and processes in the background, so the client polls and surfaces the provider's own message rather than reporting \"submitted\" as \"done\".",
      "Dashboard data loads in parallel so one failing endpoint doesn't block the rest, including a deliberate retry for the window where a verified user's wallet is still being provisioned server-side.",
      "Server-driven feature flags block onboarding actions client-side with the server's own message instead of letting requests fail. Installable as a PWA.",
    ],
    stack: [
      "React 19", "TypeScript", "Vite", "Redux Toolkit", "OIDC / PKCE", "Axios",
      "Formik + Yup", "Tailwind v4", "PWA", "KYC (BVN/NIN)", "PM2",
    ],
  },
  {
    slug: "cream-games",
    title: "CREAM Games",
    kind: "Games and rewards, on the web and as a mobile app",
    summary:
      "The games side of CREAM — trivia, a spin wheel, number draws and bidding, all paid for with wallet tokens. It exists twice: as part of the website, and as a native app on iOS and Android. Because real money buys the tokens, none of the odds or outcomes are decided in the app itself; it asks the server and shows the answer.",
    bullets: [
      "Web app on Next.js 16 and React 19, sharing sign-in with the rest of the platform through the same OIDC provider and silent cross-app SSO. Access tokens never reach the browser — route handlers attach them server-side and proxy through to the Rust API.",
      "Every game fetcher degrades to an empty state rather than throwing, so a slow or failing upstream shows an empty board instead of a 500.",
      "Fields that would leak win odds are stripped server-side before the type ever reaches the client. Pricing and scoring constants live in client-safe files for display only — the server always re-checks.",
      "On the web, top-up amounts are computed server-side from a trusted price constant, never taken from the client, across two payment providers (card/bank and airtime).",
      "Mobile app built in pure React Native CLI with TypeScript and Redux Toolkit: push notifications through FCM and APNs, and a token economy settled through Apple Pay and Google Pay — app-store policy requires the platform's own payment rails for in-app purchases, so the web gateways aren't an option there. Release pipelines to both app stores run through GitHub Actions.",
    ],
    stack: [
      "Next.js 16", "React 19", "React Native (CLI)", "TypeScript", "Redux Toolkit",
      "iron-session", "FCM / APNs", "Apple Pay / Google Pay", "Paystack", "Flutterwave",
      "Tailwind v4", "Sentry",
    ],
  },
  {
    slug: "nypd",
    title: "NYPD — Nigerian Youth Positively Driven",
    kind: "Talent platform with the UN and the Federal Government of Nigeria",
    href: "https://nypd.creamplatform.com",
    hrefLabel: "nypd.creamplatform.com",
    summary:
      "A talent competition platform built in partnership with the United Nations and the Federal Government of Nigeria. Eighty young creatives uploaded video, music and images, the public voted, and the top entries won ₦1 million each. My job was the platform the whole thing ran on — uploads, voting, live engagement counts, and a selection process transparent enough to stand up to scrutiny.",
    bullets: [
      "React with TypeScript on Vite, supporting video, image and music uploads with live engagement metrics — likes, shares and trending lists.",
      "Session-based authentication using httpOnly cookies with centralised Axios interceptors, so an expired session triggers a refresh or a login prompt rather than a broken screen.",
      "Hybrid state model: Redux Toolkit for async content actions, React Context for authentication and refresh logic.",
      "Large content feeds rendered efficiently with lazy loading, Suspense boundaries and virtualisation; skeleton loaders hold perceived performance during API-heavy operations.",
      "Upload workflows built with Formik and Yup to cut submission errors from high-volume contributors, with WCAG/ADA-compliant keyboard navigation and focus states across forms and modals.",
    ],
    stack: [
      "React", "TypeScript", "Vite", "Redux Toolkit", "React Context", "Tailwind CSS",
      "Framer Motion", "Formik + Yup",
    ],
  },
  {
    slug: "kreditek",
    title: "Kreditek Cooperative",
    kind: "Savings and loans for a Nigerian cooperative society",
    href: "https://kredicoop.ng",
    hrefLabel: "kredicoop.ng",
    summary:
      "A cooperative where members join, save regularly and borrow against what they have saved. I built the public website and the member dashboard behind it — registration and payment, recurring contributions, loan applications, transaction history and account settings.",
    bullets: [
      "Every payment path — membership fees, contributions, loan repayments and card tokenization — funnels through a single Paystack service rather than being hand-rolled per screen, so checkout behaves identically everywhere.",
      "Two deliberate state patterns kept apart: Redux Toolkit for small cross-cutting persisted state, React Context with reducers for page-scoped async domain state, with a five-minute staleness window so returning to a screen doesn't refetch unconditionally.",
      "Separate public and authenticated HTTP clients; the authenticated one injects the bearer token and, on a 401, logs the user out and redirects rather than leaving the app half signed in.",
      "One shared error formatter maps the backend's structured error shape into field-level form errors, so validation failures surface next to the input that caused them.",
      "Unit coverage on core UI components and Redux slices with Jest and React Testing Library; CI/CD through GitHub Actions.",
    ],
    stack: [
      "React 19", "TypeScript", "Vite", "React Router 7", "Redux Toolkit", "Paystack",
      "Formik + Yup", "Tailwind v4", "Jest + RTL", "Vercel",
    ],
  },
  {
    slug: "cosgrove",
    title: "Cosgrove Africa",
    kind: "Luxury smart homes and real estate",
    href: "https://cosgroveafrica.com",
    hrefLabel: "cosgroveafrica.com",
    summary:
      "A property platform showcasing luxury smart homes across Nigeria, built at 3io Studios. Buyers at this end of the market judge a developer by the website, so it had to feel expensive and still load quickly on a Nigerian connection — two goals that usually fight each other. I led the frontend.",
    bullets: [
      "Single-page app built on Inertia.js bridging a Laravel backend and a React TypeScript frontend — server-driven routing with client-side hydration, avoiding a separate REST layer, and around 40% faster load times than the previous build.",
      "Component-driven architecture with reusable page sections, cutting the build time for new pages.",
      "Contact and agent-registration workflows protected with Google reCAPTCHA v3 and honeypot fields, cutting bot submissions without adding friction for real enquiries.",
      "Media delivered through Cloudinary CDN with lazy-loaded components and Vite build optimisation; Sentry for production error monitoring.",
      "Animated interface using Lottie, AOS and Framer Motion, held to WCAG/ADA standards for contrast, focus indicators, ARIA labelling and keyboard navigation.",
      "Project metadata centralised in a single typed module so non-technical stakeholders could update listings without touching components.",
    ],
    stack: [
      "React", "TypeScript", "Laravel", "Inertia.js", "Bootstrap 5", "SASS", "Vite",
      "Cloudinary", "Framer Motion", "Sentry",
    ],
  },
  {
    slug: "deliverytrack",
    title: "DeliveryTrack",
    kind: "Personal build — live delivery tracking on mobile",
    summary:
      "A demo I built for myself rather than a client: a last-mile delivery app where a customer watches the rider move on a map in real time and gets a notification when the status changes. Nigerian delivery businesses run on phone calls asking \"where is my order\" — this was me working out how to make that question unnecessary.",
    bullets: [
      "Built with React Native and TypeScript. Frontend only — there is no production backend behind it, so treat it as a working prototype rather than a shipped product.",
      "Live location streamed onto a map view with the rider's position updating as it moves, and status changes pushed to the customer as notifications.",
      "Redux Toolkit for order and driver state, with optimistic updates so the interface responds before the round trip completes.",
    ],
    stack: ["React Native", "TypeScript", "Redux Toolkit", "Maps / geolocation", "Push notifications"],
  },
  {
    slug: "closerlook-vr",
    title: "CloserLook VR — eMedia Interactive",
    kind: "Launch site for a VR game",
    href: "https://emediainteractive.com",
    hrefLabel: "emediainteractive.com",
    summary:
      "The website for CloserLook VR: Oldways, a puzzle game you play in a virtual reality headset. A game like this lives or dies on whether someone lands on the site and reaches the store, so the whole page is built around getting a visitor to the demo — screenshots, what the game is, and one clear route out to whichever platform they own.",
    bullets: [
      "Static React single-page site built with Vite, code-split per route so the marketing page loads on its own without pulling in the rest of the bundle.",
      "Screenshot carousel and a single wishlist-and-demo call to action, routing visitors out to Steam, Meta Quest and SideQuest depending on their headset, plus the game's Discord community.",
      "Per-page metadata handled at runtime for search and social sharing, with a privacy policy route alongside the main page.",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Static hosting"],
  },
  {
    slug: "automation",
    title: "Automation systems",
    kind: "Internal tooling for small businesses",
    summary:
      "Not everything I build has a website. A growing part of my work is invisible: connecting the tools a business already uses so the repetitive parts run without anyone remembering to do them. An enquiry arrives and is captured, checked, scored and pushed to whoever should handle it. An invoice lands in an inbox and its details are read out and filed. For a small team, this is often the difference between hiring someone and not needing to.",
    bullets: [
      "Lead capture and routing in n8n: webhook intake, field normalisation, validation, a lookup against the existing record to catch duplicates, scoring, and a notification to the team — with a dedicated error-handler workflow so a failure is reported rather than silently dropped.",
      "Document pipeline triggered from email: attachments split and classified, machine-readable and scanned documents routed down separate branches, structured fields extracted with Claude and written to a spreadsheet.",
      "GoHighLevel builds covering CRM setup, calendar and booking sync, pipeline and opportunity structure, and full appointment-lifecycle automation for a service business.",
      "Webhook-driven digital delivery with payment providers, including attribution back to the marketer who made the sale.",
    ],
    stack: [
      "n8n", "GoHighLevel", "Claude API", "Google Workspace APIs", "Webhooks / OAuth",
      "Stripe", "Paystack",
    ],
    visual: "automation",
  },
];
```

- [ ] **Step 3: roles.ts**

```ts
export type Role = { company: string; title: string; dates: string };

export const roles: Role[] = [
  { company: "DKingsmen", title: "Senior Frontend Engineer — CREAM Platform, Pay, Games and NYPD", dates: "2023 — present" },
  { company: "Kreditek NG", title: "Frontend Developer — cooperative fintech platform", dates: "2024" },
  { company: "Cyber Technologies", title: "Frontend Developer — WordPress, WooCommerce, custom PHP plugins", dates: "2023 — 2024" },
  { company: "3io Studios", title: "Frontend Developer — Cosgrove Africa", dates: "2023" },
  { company: "Kodeguru Tech Solutions", title: "Founder — client web development and business automation", dates: "ongoing" },
];
```

- [ ] **Step 4: toolkit.ts** (Vercel and Netlify removed from Practice)

```ts
export type ToolkitRow = { label: string; value: string };

export const toolkit: ToolkitRow[] = [
  { label: "Languages", value: "TypeScript, JavaScript, HTML, CSS, PHP" },
  { label: "Web", value: "React 19, Next.js 16, React Router, Redux Toolkit, Tailwind CSS, Vite, SASS" },
  { label: "Mobile", value: "React Native (pure CLI), FCM and APNs push notifications, Play Store and App Store releases" },
  { label: "Platform", value: "Node, REST APIs, OIDC / OAuth 2.0, WebSockets, PWA, WordPress and WooCommerce" },
  { label: "Payments", value: "Paystack, Flutterwave, Stripe, Apple Pay and Google Pay, KYC and identity verification" },
  { label: "Automation", value: "n8n, GoHighLevel, Claude API, MCP servers" },
  { label: "Practice", value: "Git, GitHub Actions, systemd / PM2, Sentry, WCAG / ADA accessibility" },
];
```

- [ ] **Step 5: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no output (exit 0).

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "Add typed content data for projects, roles, toolkit and site links

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: UI primitives (Reveal, Accordion, SectionTitle, InlineCode)

**Files:**
- Create: `src/components/ui/Reveal.tsx`, `src/components/ui/Accordion.tsx`, `src/components/ui/SectionTitle.tsx`, `src/components/ui/InlineCode.tsx`

- [ ] **Step 1: Reveal.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Accordion.tsx**

```tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE } from "./Reveal";

type Props = { label: string; children: ReactNode };

export function Accordion({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div
      className={`overflow-hidden rounded-[10px] border bg-bg-2 transition-colors duration-300 ${
        open ? "border-teal/40" : "border-line"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="font-display flex w-full cursor-pointer items-center gap-2.5 px-[18px] py-[15px] text-left text-[14.5px] font-medium text-ink-soft transition-colors duration-200 hover:bg-bg-3 hover:text-ink"
      >
        <motion.svg
          className="h-[15px] w-[15px] shrink-0 text-teal"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </motion.svg>
        {label}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-line-soft px-[18px] pt-1 pb-[22px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: SectionTitle.tsx**

```tsx
type Props = { children: string };

export function SectionTitle({ children }: Props) {
  return (
    <h2 className="font-display mb-10 flex items-center gap-3 text-sm font-semibold text-ink-soft">
      <span aria-hidden="true" className="grad-bg h-[2px] w-[22px] rounded-[2px]" />
      {children}
    </h2>
  );
}
```

- [ ] **Step 4: InlineCode.tsx**

```tsx
type Props = { text: string };

export function InlineCode({ text }: Props) {
  const parts = text.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="font-mono rounded bg-bg-3 px-1.5 py-px text-[13.5px] text-teal-soft"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
```

- [ ] **Step 5: Typecheck and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui
git commit -m "Add Reveal, Accordion, SectionTitle and InlineCode primitives

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Hero with animated node network

**Files:**
- Create: `src/components/sections/HeroGraphic.tsx`, `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: HeroGraphic.tsx**

Node positions are MotionValues so edges follow the drift. `motion.line`/`motion.circle` accept MotionValues as attribute props.

```tsx
"use client";

import { animate, motion, motionValue, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/components/ui/Reveal";

type Tone = "navy" | "teal";
type NodeDef = { x: number; y: number; r: number; tone: Tone; faint?: boolean };

const NODES: NodeDef[] = [
  { x: 250, y: 200, r: 9, tone: "navy" },
  { x: 150, y: 95, r: 6, tone: "navy" },
  { x: 250, y: 60, r: 5, tone: "navy" },
  { x: 70, y: 150, r: 5, tone: "teal" },
  { x: 120, y: 250, r: 5, tone: "navy" },
  { x: 90, y: 350, r: 4, tone: "teal" },
  { x: 200, y: 320, r: 9, tone: "teal" },
  { x: 350, y: 240, r: 5, tone: "navy" },
  { x: 370, y: 130, r: 5, tone: "teal" },
  { x: 330, y: 340, r: 6, tone: "navy" },
  { x: 290, y: 420, r: 4, tone: "teal" },
  { x: 450, y: 60, r: 4, tone: "teal", faint: true },
  { x: 480, y: 220, r: 7, tone: "teal", faint: true },
  { x: 440, y: 330, r: 4, tone: "teal", faint: true },
  { x: 500, y: 400, r: 3, tone: "teal", faint: true },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 6], [0, 7], [0, 8],
  [1, 2], [1, 3], [4, 5], [4, 6], [6, 5], [6, 9], [7, 9], [7, 12],
  [8, 11], [8, 12], [9, 10], [9, 13], [12, 13], [13, 14], [10, 13],
];

const FILL: Record<Tone, string> = { navy: "#2B6CB0", teal: "#1F9AA6" };

type NodeMV = { x: MotionValue<number>; y: MotionValue<number> };

export function HeroGraphic() {
  const reduce = useReducedMotion();
  const [mvs] = useState<NodeMV[]>(() =>
    NODES.map((n) => ({ x: motionValue(n.x), y: motionValue(n.y) })),
  );

  useEffect(() => {
    if (reduce) return;
    const controls = mvs.flatMap((mv, i) => {
      const n = NODES[i];
      const dx = 3 + (i % 3) * 2;
      const dy = 4 + ((i + 1) % 3) * 2;
      return [
        animate(mv.x, [n.x - dx, n.x + dx], {
          duration: 7 + (i % 4),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: -i * 0.6,
        }),
        animate(mv.y, [n.y + dy, n.y - dy], {
          duration: 8 + ((i + 2) % 4),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: -i * 0.4,
        }),
      ];
    });
    return () => controls.forEach((c) => c.stop());
  }, [mvs, reduce]);

  return (
    <svg
      viewBox="0 0 520 440"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract network of connected nodes"
    >
      <defs>
        <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2B6CB0" />
          <stop offset="100%" stopColor="#1F9AA6" />
        </linearGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const faint = NODES[a].faint || NODES[b].faint;
        return (
          <motion.line
            key={i}
            x1={mvs[a].x}
            y1={mvs[a].y}
            x2={mvs[b].x}
            y2={mvs[b].y}
            stroke="url(#hero-grad)"
            strokeWidth={faint ? 1 : 1.4}
            strokeOpacity={faint ? 0.35 : 0.8}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.05 }}
          />
        );
      })}

      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={mvs[i].x}
          cy={mvs[i].y}
          fill={FILL[n.tone]}
          fillOpacity={n.faint ? 0.45 : 1}
          initial={reduce ? false : { r: 0, opacity: 0 }}
          animate={{ r: n.r, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Hero.tsx**

```tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { EASE } from "@/components/ui/Reveal";
import { HeroGraphic } from "./HeroGraphic";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="hero" className="relative overflow-hidden pt-28 pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[280px] -right-[200px] h-[640px] w-[640px] rounded-full blur-[18px]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(31,154,166,.22), rgba(18,69,127,.16) 45%, transparent 70%)",
        }}
      />

      <motion.div
        className="wrap relative"
        initial={reduce ? "show" : "hidden"}
        animate="show"
        transition={{ staggerChildren: 0.09 }}
      >
        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-11 flex items-center gap-[11px]"
        >
          <Image
            src="/kodeguru-mark.png"
            alt="Kodeguru Tech Solutions"
            width={62}
            height={38}
            className="h-[38px] w-auto"
            priority
          />
          <span className="font-display text-[13.5px] font-medium text-ink-soft">
            {site.company}
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14">
          <div>
            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display mb-[22px] text-[clamp(44px,8vw,78px)] leading-[0.98] font-bold tracking-[-0.04em]"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="grad-text font-display mb-[30px] max-w-[19ch] text-[clamp(20px,3.2vw,30px)] leading-[1.28] font-semibold tracking-[-0.02em]"
            >
              I build the products people use, and the systems that run the business behind them.
            </motion.p>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-[66ch] text-[clamp(17px,2.1vw,19.5px)] leading-[1.62] text-ink-soft"
            >
              Software engineer based in Abuja, Nigeria, with five years building for the web and
              mobile. Most of my work is in{" "}
              <strong className="font-semibold text-ink">fintech and digital media</strong> — wallets
              that move money, platforms that pay creators, cooperatives that lend to their members.
              When a business is drowning in repetitive admin, I build the automation that does it
              instead.
            </motion.p>

            <motion.nav
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              aria-label="Contact"
              className="mt-[38px] flex flex-wrap gap-x-[26px] gap-y-3 text-[15px]"
            >
              <a className="link-grow text-ink" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="link-grow text-ink" href={site.phoneHref}>{site.phoneDisplay}</a>
              <a className="link-grow text-ink" href={site.github} rel="me noopener" target="_blank">GitHub</a>
              <a className="link-grow text-ink" href={site.linkedin} rel="me noopener" target="_blank">LinkedIn</a>
              <a className="link-grow text-ink" href={site.resumePath} download>Résumé (PDF)</a>
            </motion.nav>
          </div>

          <motion.figure
            variants={rise}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto w-full max-w-[420px] lg:max-w-none"
          >
            <HeroGraphic />
          </motion.figure>
        </div>
      </motion.div>
    </header>
  );
}
```

- [ ] **Step 3: page.tsx**

```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Build and view**

Run: `pnpm lint && pnpm build`
Expected: clean. Then `pnpm dev` and open `http://localhost:3000`: logo, headline, gradient role line, contact links, and the node graphic draws in over ~2 s and then drifts. On a 390px-wide viewport the graphic stacks below the copy with no horizontal scroll.

If `motion.line` does not accept MotionValues for `x1` etc. (edges stay at 0), replace each MotionValue prop with `useTransform`-free equivalents by rendering edges inside a component that subscribes: `const x1 = useMotionValueEvent`-free approach is simpler — switch NODES to be static (remove drift `useEffect`) and put the drift on a single wrapping `<motion.g animate={{ y: [0,-6,0] }}>` instead. Note the fallback in the commit message if used.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HeroGraphic.tsx src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "Add hero with staggered entrance and animated node-network graphic

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: NavBar with scroll progress

**Files:**
- Create: `src/components/layout/NavBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: NavBar.tsx**

```tsx
"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/data/site";
import { EASE } from "@/components/ui/Reveal";

export function NavBar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const heroHeight = document.getElementById("hero")?.offsetHeight ?? 600;
    setShow(y > heroHeight - 80);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="grad-bg fixed top-0 left-0 z-60 h-[2px] w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md"
        initial={false}
        animate={{ y: show ? 0 : "-100%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="wrap flex h-[60px] items-center justify-between gap-4">
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">
            {site.name}{" "}
            <span className="hidden font-medium text-ink-soft sm:inline">— {site.role}</span>
          </span>
          <a
            href={`mailto:${site.email}`}
            className="text-[14.5px] font-medium text-teal-soft transition-colors hover:text-ink"
          >
            Get in touch
          </a>
        </div>
      </motion.div>
    </>
  );
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <div className="h-[200vh]" />
      </main>
    </>
  );
}
```
(The tall spacer is temporary so the bar can be tested; it is removed in Task 7.)

- [ ] **Step 3: Verify**

Run: `pnpm lint && pnpm build`, then in the dev server scroll past the hero: bar slides down, progress line grows; scroll back up: bar slides away.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/NavBar.tsx src/app/page.tsx
git commit -m "Add sticky nav bar with scroll progress line

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: What I do

**Files:**
- Create: `src/components/sections/WhatIDo.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: WhatIDo.tsx**

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const items = [
  {
    title: "Web and mobile products",
    body: "The part of a system people see and touch — the site, the app, the screens where someone signs in, uploads, plays or checks a balance. I take it from design to something live and maintained, on the web and on iOS and Android.",
  },
  {
    title: "Payments and identity",
    body: "Anything to do with money or proving who someone is: card payments, bank transfers, withdrawals, wallets, identity verification. Mistakes here are expensive, so this work gets built carefully and defensively.",
  },
  {
    title: "Business automation",
    body: "Connecting the tools a company already pays for so routine work happens by itself. An enquiry gets captured, sorted and assigned. An invoice arriving by email gets read and filed. Nobody has to remember to do it.",
  },
];

export function WhatIDo() {
  return (
    <section className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>What I do</SectionTitle>
        </Reveal>
        <div className="grid gap-[30px] md:grid-cols-3 md:gap-[34px]">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="group border-t-2 border-line pt-5 transition-colors duration-400 hover:border-teal">
                <h3 className="font-display mb-[9px] text-[19px] font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="text-[15.5px] leading-[1.62] text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: page.tsx** — replace the spacer

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <WhatIDo />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify** — `pnpm lint && pnpm build`; in browser the three cards rise in with a slight stagger; hover turns the top border teal.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/WhatIDo.tsx src/app/page.tsx
git commit -m "Add What I do section

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: Automation diagram

**Files:**
- Create: `src/components/sections/AutomationDiagram.tsx`

Two SVGs from one step list: horizontal (md and up) and vertical (below md). Edges draw in on view; a pulse travels the path on a loop.

- [ ] **Step 1: AutomationDiagram.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/Reveal";

const STEPS = ["Capture", "Validate", "De-duplicate", "Score", "Notify"] as const;

type Orientation = "horizontal" | "vertical";

function layout(orientation: Orientation) {
  const gap = orientation === "horizontal" ? 150 : 84;
  const pad = orientation === "horizontal" ? 60 : 40;
  const pts = STEPS.map((_, i) =>
    orientation === "horizontal"
      ? { x: pad + i * gap, y: 40 }
      : { x: 40, y: pad + i * gap },
  );
  const width = orientation === "horizontal" ? pad * 2 + gap * (STEPS.length - 1) : 260;
  const height = orientation === "horizontal" ? 96 : pad * 2 + gap * (STEPS.length - 1);
  return { pts, width, height };
}

function Diagram({ orientation }: { orientation: Orientation }) {
  const reduce = useReducedMotion();
  const { pts, width, height } = layout(orientation);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Lead capture workflow: capture, validate, de-duplicate, score, notify"
    >
      <defs>
        <linearGradient id={`auto-grad-${orientation}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2B6CB0" />
          <stop offset="100%" stopColor="#1F9AA6" />
        </linearGradient>
      </defs>

      <motion.path
        d={path}
        fill="none"
        stroke={`url(#auto-grad-${orientation})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeOpacity={0.8}
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      {!reduce && (
        <motion.circle
          r={4}
          fill="#6FC7CF"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 1.6 }}
          style={{ offsetPath: `path("${path}")` }}
        />
      )}

      {pts.map((p, i) => (
        <g key={STEPS[i]}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            fill={i % 2 === 0 ? "#2B6CB0" : "#1F9AA6"}
            initial={reduce ? false : { r: 0, opacity: 0 }}
            whileInView={{ r: 7, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.22 }}
          />
          <motion.text
            x={orientation === "horizontal" ? p.x : p.x + 22}
            y={orientation === "horizontal" ? p.y + 30 : p.y + 5}
            textAnchor={orientation === "horizontal" ? "middle" : "start"}
            fill="#8FA5B5"
            fontSize={orientation === "horizontal" ? 13 : 15}
            fontFamily="var(--font-body)"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.22 }}
          >
            {STEPS[i]}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

export function AutomationDiagram() {
  return (
    <figure className="mb-[22px] overflow-hidden rounded-[10px] border border-line bg-bg-2 shadow-[0_12px_30px_-18px_rgba(0,0,0,.6)]">
      <div className="px-4 pt-3 md:px-6 md:pt-2">
        <div className="hidden md:block">
          <Diagram orientation="horizontal" />
        </div>
        <div className="mx-auto max-w-[260px] md:hidden">
          <Diagram orientation="vertical" />
        </div>
      </div>
      <figcaption className="border-t border-line bg-bg px-[15px] py-[10px] text-[13px] text-ink-soft">
        Lead capture and routing — every enquiry validated, de-duplicated, scored and pushed to the
        team automatically
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Typecheck** — `pnpm exec tsc --noEmit && pnpm lint`. If TypeScript rejects `offsetDistance`/`offsetPath` on the motion style/animate objects, cast: `style={{ offsetPath: ... } as React.CSSProperties}` and `animate={{ offsetDistance: "100%", opacity: [0,1,1,0] } as never}` is **not** acceptable — instead import `type TargetAndTransition` from `motion/react` and type the object; if still rejected, drop the pulse circle (the draw-in alone meets the spec).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AutomationDiagram.tsx
git commit -m "Add animated automation flow diagram

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Selected work

**Files:**
- Create: `src/components/sections/ProjectEntry.tsx`, `src/components/sections/SelectedWork.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: ProjectEntry.tsx**

```tsx
import type { Project } from "@/data/projects";
import { Accordion } from "@/components/ui/Accordion";
import { InlineCode } from "@/components/ui/InlineCode";
import { AutomationDiagram } from "./AutomationDiagram";

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="border-t border-line py-[42px] first:border-t-0 first:pt-0">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-[clamp(23px,3.2vw,29px)] font-semibold tracking-[-0.025em]">
          {project.title}
        </h3>
        <span className="text-[15px] text-ink-soft">{project.kind}</span>
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener"
          className="font-mono mb-4 inline-block text-[14.5px] text-teal transition-colors hover:text-teal-soft"
        >
          {project.hrefLabel ?? project.href}
        </a>
      ) : (
        <div className="h-[14px]" />
      )}

      <p className="mb-[22px] max-w-[66ch]">{project.summary}</p>

      {project.visual === "automation" && <AutomationDiagram />}

      <Accordion label="Under the hood">
        <ul className="mt-4">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="bullet-dot relative mb-[11px] pl-[19px] text-[15px] leading-[1.62]"
            >
              <InlineCode text={b} />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-[7px]">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono rounded-full border border-line bg-bg-3 px-[11px] py-1 text-xs text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </Accordion>
    </article>
  );
}
```

- [ ] **Step 2: SelectedWork.tsx**

```tsx
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectEntry } from "./ProjectEntry";

export function SelectedWork() {
  return (
    <section className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Selected work</SectionTitle>
        </Reveal>
        {projects.map((p) => (
          <Reveal key={p.slug}>
            <ProjectEntry project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

Note: `first:border-t-0` on the article will not fire because each article is wrapped by `Reveal`'s div. Fix by moving the border to the wrapper: in `SelectedWork.tsx` use `<Reveal key={p.slug} className="border-t border-line first:border-t-0 first:[&>article]:pt-0">` and in `ProjectEntry.tsx` change the article className to `"py-[42px]"`. Apply this variant, not the one above.

- [ ] **Step 3: page.tsx**

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <WhatIDo />
        <SelectedWork />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify** — `pnpm lint && pnpm build`. In the browser: nine entries; every "Under the hood" opens and closes smoothly with the chevron rotating; the CREAM Platform bullet shows `prompt=none` as inline code; NYPD shows ₦1 million; the automation entry shows the diagram drawing in; keyboard: Tab to a trigger, Enter toggles, `aria-expanded` flips (check in DevTools).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProjectEntry.tsx src/components/sections/SelectedWork.tsx src/app/page.tsx
git commit -m "Add Selected work section driven by project data

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: Where I've worked and How I work

**Files:**
- Create: `src/components/sections/WhereIveWorked.tsx`, `src/components/sections/HowIWork.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: WhereIveWorked.tsx**

```tsx
import { roles } from "@/data/roles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function WhereIveWorked() {
  return (
    <section className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Where I&apos;ve worked</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="max-w-[860px]">
            {roles.map((r) => (
              <div
                key={r.company}
                className="grid items-baseline gap-0.5 border-t border-line py-4 last:border-b sm:grid-cols-[200px_1fr_auto] sm:gap-5"
              >
                <span className="font-display text-base font-semibold">{r.company}</span>
                <span className="text-[15px] text-ink-soft">{r.title}</span>
                <span className="font-mono text-[12.5px] whitespace-nowrap text-ink-soft">{r.dates}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: HowIWork.tsx**

```tsx
import { toolkit } from "@/data/toolkit";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function HowIWork() {
  return (
    <section className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>How I work</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="max-w-[66ch] space-y-[18px]">
            <p>
              I work in production codebases where the cost of a mistake is real, so most of my
              habits are about making changes safe rather than fast: architecture written down where
              the next person will find it, every change logged, nothing reaching the main branch
              without review.
            </p>
            <p>
              I use AI coding tools heavily and deliberately. Every repository I work in carries its
              own instruction file explaining the architecture and the decisions that look wrong but
              aren&apos;t, so an assistant doesn&apos;t &ldquo;fix&rdquo; something deliberate. Agents
              log what they changed and never commit — I review and commit myself. It is the same
              discipline you would apply to a junior engineer, which is roughly what these tools are.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-[38px]">
            {toolkit.map((row) => (
              <div
                key={row.label}
                className="grid gap-[3px] border-t border-line py-[14px] last:border-b sm:grid-cols-[150px_1fr] sm:gap-5"
              >
                <span className="font-display text-sm font-semibold text-teal-soft">{row.label}</span>
                <span className="text-[14.5px] leading-[1.7] text-ink-soft">{row.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx**

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhereIveWorked } from "@/components/sections/WhereIveWorked";
import { HowIWork } from "@/components/sections/HowIWork";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <WhatIDo />
        <SelectedWork />
        <WhereIveWorked />
        <HowIWork />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify** — `pnpm lint && pnpm build`; Practice row reads "Git, GitHub Actions, systemd / PM2, Sentry, WCAG / ADA accessibility"; roles collapse to one column below 640px.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/WhereIveWorked.tsx src/components/sections/HowIWork.tsx src/app/page.tsx
git commit -m "Add Where I've worked and How I work sections

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: Footer with closing CTA and résumé download

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Footer.tsx**

```tsx
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const btn =
  "font-display inline-block rounded-full px-[26px] py-[13px] text-[15px] font-semibold transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Reveal>
          <div className="grad-bg mt-21 mb-5 rounded-2xl p-[clamp(38px,6vw,60px)] text-white">
            <h2 className="font-display mb-4 text-[clamp(28px,4.6vw,40px)] leading-[1.1] font-bold tracking-[-0.03em]">
              Let&apos;s build something
            </h2>
            <p className="mb-[30px] max-w-[52ch] text-white/88">
              Available for contract and full-time work, remote or based in Nigeria. If you have
              something that needs building — or something manual that shouldn&apos;t be — send me a
              note.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${site.email}`}
                className={`${btn} bg-white text-navy hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,.45)]`}
              >
                Email me
              </a>
              <a
                href={site.resumePath}
                download
                className={`${btn} border-[1.5px] border-white/55 text-white hover:bg-white/12`}
              >
                Download résumé
              </a>
            </div>
          </div>
        </Reveal>
        <p className="pb-18 text-[13.5px] text-ink-soft">
          {site.name} · {site.company} · {site.location}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: page.tsx** — final assembly

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhereIveWorked } from "@/components/sections/WhereIveWorked";
import { HowIWork } from "@/components/sections/HowIWork";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <WhatIDo />
        <SelectedWork />
        <WhereIveWorked />
        <HowIWork />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify** — `pnpm lint && pnpm build`. In the browser click "Download résumé": the PDF downloads as `Erhahon-Imafidon-Resume.pdf`. Also confirm the hero "Résumé (PDF)" link does the same.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/page.tsx
git commit -m "Add closing CTA footer with résumé download

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12: Final verification and README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Full checks**

Run: `pnpm lint && pnpm exec tsc --noEmit && pnpm build`
Expected: all clean; build shows `/` as static.

- [ ] **Step 2: Browser pass** (use the chrome-devtools MCP or a real browser against `pnpm dev`)

Check each and note results:
1. Widths 360, 768, 1280: no horizontal scrollbar (`document.documentElement.scrollWidth === window.innerWidth`).
2. Hero entrance plays; graphic draws in and drifts.
3. Scroll: progress line grows to full at bottom; nav bar appears after hero.
4. Every accordion toggles; `aria-expanded` flips.
5. Automation diagram draws in; vertical variant below 768px.
6. Both résumé links download the PDF.
7. Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering): all content visible immediately, no drift, no pulse.
8. Console: zero errors, zero React warnings.
9. Lighthouse (optional): performance and accessibility ≥ 95.

Fix anything found; commit fixes as `"Fix <thing> found in browser verification"`.

- [ ] **Step 3: README.md**

Replace the create-next-app README with:

```md
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
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "Document project structure in README

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```
