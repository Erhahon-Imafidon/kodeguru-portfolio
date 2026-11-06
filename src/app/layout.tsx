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

const title = "Kodeguru Tech Solutions — Software & automation by Erhahon Imafidon";
const description =
  "Kodeguru Tech Solutions, led by Erhahon Imafidon, builds websites, mobile apps, payments and business automation for companies in Nigeria and abroad. Read the client case studies.";

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
    "case studies",
    "web development Nigeria",
    "WordPress plugin development",
    "Stripe",
    "Paystack",
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
    siteName: "Kodeguru Tech Solutions",
    locale: "en_NG",
    title: "Kodeguru Tech Solutions — Software & automation",
    description:
      "Websites, mobile apps, payments and automation for businesses in Nigeria and abroad, led by Erhahon Imafidon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodeguru Tech Solutions — Software & automation",
    description:
      "Websites, mobile apps, payments and automation for businesses in Nigeria and abroad, led by Erhahon Imafidon.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
