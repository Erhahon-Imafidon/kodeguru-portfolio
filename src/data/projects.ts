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
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Rust API",
      "OIDC / PKCE",
      "iron-session",
      "Tailwind v4",
      "HLS.js",
      "WebSockets",
      "next-intl",
      "Sentry",
      "GitHub Actions",
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
      'Money-movement endpoints require a transaction PIN. Identity verification (BVN, NIN, address) is asynchronous — the API accepts and processes in the background, so the client polls and surfaces the provider\'s own message rather than reporting "submitted" as "done".',
      "Dashboard data loads in parallel so one failing endpoint doesn't block the rest, including a deliberate retry for the window where a verified user's wallet is still being provisioned server-side.",
      "Server-driven feature flags block onboarding actions client-side with the server's own message instead of letting requests fail. Installable as a PWA.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "OIDC / PKCE",
      "Axios",
      "Formik + Yup",
      "Tailwind v4",
      "PWA",
      "KYC (BVN/NIN)",
      "PM2",
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
      "Next.js 16",
      "React 19",
      "React Native (CLI)",
      "TypeScript",
      "Redux Toolkit",
      "iron-session",
      "FCM / APNs",
      "Apple Pay / Google Pay",
      "Paystack",
      "Flutterwave",
      "Tailwind v4",
      "Sentry",
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
      "React",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "React Context",
      "Tailwind CSS",
      "Framer Motion",
      "Formik + Yup",
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
      "React 19",
      "TypeScript",
      "Vite",
      "React Router 7",
      "Redux Toolkit",
      "Paystack",
      "Formik + Yup",
      "Tailwind v4",
      "Jest + RTL",
      "Vercel",
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
      "React",
      "TypeScript",
      "Laravel",
      "Inertia.js",
      "Bootstrap 5",
      "SASS",
      "Vite",
      "Cloudinary",
      "Framer Motion",
      "Sentry",
    ],
  },
  {
    slug: "deliverytrack",
    title: "DeliveryTrack",
    kind: "Personal build — live delivery tracking on mobile",
    summary:
      'A demo I built for myself rather than a client: a last-mile delivery app where a customer watches the rider move on a map in real time and gets a notification when the status changes. Nigerian delivery businesses run on phone calls asking "where is my order" — this was me working out how to make that question unnecessary.',
    bullets: [
      "Built with React Native and TypeScript. Frontend only — there is no production backend behind it, so treat it as a working prototype rather than a shipped product.",
      "Live location streamed onto a map view with the rider's position updating as it moves, and status changes pushed to the customer as notifications.",
      "Redux Toolkit for order and driver state, with optimistic updates so the interface responds before the round trip completes.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Maps / geolocation",
      "Push notifications",
    ],
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
      "n8n",
      "GoHighLevel",
      "Claude API",
      "Google Workspace APIs",
      "Webhooks / OAuth",
      "Stripe",
      "Paystack",
    ],
    visual: "automation",
  },
];
