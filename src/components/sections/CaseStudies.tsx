import Image from "next/image";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function CaseStudyCard({ study, headingLevel = 3 }: { study: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-teal/60"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg-3">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          fill
          sizes="(min-width: 768px) 480px, 92vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-[clamp(20px,3vw,28px)]">
        <p className="font-mono mb-2 text-[11.5px] tracking-[0.1em] text-teal-soft uppercase">
          {study.industry}
        </p>
        <Heading className="font-display mb-1 text-[22px] font-semibold tracking-[-0.02em]">
          {study.client}
        </Heading>
        <p className="mb-4 text-[16px] leading-[1.45] text-ink">{study.headline}</p>
        <ul className="mb-6 space-y-[7px]">
          {study.results.map((r) => (
            <li key={r} className="bullet-dot relative pl-[18px] text-[14.5px] leading-[1.55] text-ink-soft">
              {r}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 text-[14.5px] font-semibold text-teal-soft">
          Read the case study
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="border-y border-line bg-bg-2/60 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Client results</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <h2 className="font-display max-w-[22ch] text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]">
              Some of the projects we have worked on
            </h2>
            <p className="max-w-[44ch] text-[15.5px] text-ink-soft">
              A selection of our work, written for business owners: the problem, what we built, and
              what changed. There is more we can walk you through on a call.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07} className="h-full">
              <CaseStudyCard study={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
