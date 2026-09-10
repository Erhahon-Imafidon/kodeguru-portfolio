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
