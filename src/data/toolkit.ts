export type ToolkitRow = { label: string; value: string };

export const toolkit: ToolkitRow[] = [
  { label: "Languages", value: "TypeScript, JavaScript, HTML, CSS, PHP" },
  {
    label: "Web",
    value: "React 19, Next.js 16, React Router, Redux Toolkit, Tailwind CSS, Vite, SASS",
  },
  {
    label: "Mobile",
    value:
      "React Native (pure CLI), FCM and APNs push notifications, Play Store and App Store releases",
  },
  {
    label: "Platform",
    value: "Node, REST APIs, OIDC / OAuth 2.0, WebSockets, PWA, WordPress and WooCommerce",
  },
  {
    label: "Payments",
    value:
      "Paystack, Flutterwave, Stripe, Apple Pay and Google Pay, KYC and identity verification",
  },
  { label: "Automation", value: "n8n, GoHighLevel, Claude API, MCP servers" },
  {
    label: "Practice",
    value: "Git, GitHub Actions, systemd / PM2, Sentry, WCAG / ADA accessibility",
  },
];
