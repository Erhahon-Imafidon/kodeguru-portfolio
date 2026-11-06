import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyCard } from "@/components/sections/CaseStudies";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import "../case-studies.css";

// Only the case studies listed in src/data/caseStudies.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  const title = `${study.client} case study — ${site.company}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title,
      description: study.summary,
      images: [{ url: study.image.src, width: study.image.width, height: study.image.height }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  // Our own generated content (see src/content/case-studies), read once at build time.
  const html = await readFile(
    path.join(process.cwd(), "src/content/case-studies", `${slug}.html`),
    "utf8",
  );

  return (
    <>
      <NavBar />
      <main className="pt-[96px]">
        <div className="wrap mb-6 flex flex-wrap items-center justify-between gap-3 text-[14.5px]">
          <Link href="/#case-studies" className="link-grow text-ink-soft hover:text-ink">
            <span aria-hidden="true">&larr;</span> All case studies
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {study.site && (
              <a href={study.site.href} target="_blank" rel="noopener" className="link-grow text-teal-soft">
                Visit {study.site.label}
              </a>
            )}
            <a href={study.pdf} download className="link-grow text-teal-soft">
              Download as PDF
            </a>
          </div>
        </div>

        <article
          className={`cs-${slug}`}
          dangerouslySetInnerHTML={{ __html: `<div class="page">${html}</div>` }}
        />

        <section aria-labelledby="next-study" className="wrap mt-16">
          <p id="next-study" className="font-mono mb-4 text-[12px] tracking-[0.1em] text-ink-soft uppercase">
            Next case study
          </p>
          <div className="max-w-[560px]">
            <CaseStudyCard study={next} headingLevel={2} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
