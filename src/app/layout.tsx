import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/data/site";
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

const title = "Erhahon Imafidon — Software Engineer, Fintech & Media Platforms";
const description =
  "Erhahon Imafidon builds web and mobile products for fintech and media companies in Nigeria, and the automated systems that run the business behind them.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: "Erhahon Imafidon — Portfolio",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.company,
  keywords: [
    "Erhahon Imafidon",
    "software engineer",
    "frontend engineer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "fintech",
    "payments",
    "OIDC",
    "business automation",
    "n8n",
    "Abuja",
    "Nigeria",
    "Kodeguru Tech Solutions",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Erhahon Imafidon",
    locale: "en_NG",
    title: "Erhahon Imafidon — Software Engineer",
    description:
      "Web and mobile products for fintech and media companies, and the automated systems behind them.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erhahon Imafidon — Software Engineer",
    description:
      "Web and mobile products for fintech and media companies, and the automated systems behind them.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
