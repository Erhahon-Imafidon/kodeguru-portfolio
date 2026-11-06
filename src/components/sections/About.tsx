import Image from "next/image";
import { site } from "@/data/site";
import { roles } from "@/data/roles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  return (
    <section id="about" className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>About</SectionTitle>
        </Reveal>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <Reveal>
            <figure className="relative mx-auto w-full max-w-[380px] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] p-px grad-bg shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
                <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-bg-3">
                  <Image
                    src="/erhahon-imafidon.jpg"
                    alt={`${site.name}, founder of ${site.company}`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 380px, 90vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,13,22,.55)_100%)]"
                  />
                </div>
              </div>
              <figcaption className="mt-4 text-[14px] text-ink-soft">
                <span className="font-display font-semibold text-ink">{site.name}</span> · Founder,{" "}
                {site.company}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h2 className="font-display mb-6 text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]">
                Led by an engineer who builds the products{" "}
                <span className="grad-text">and the systems behind them</span>
              </h2>
              <div className="max-w-[62ch] space-y-[18px] text-[16.5px] leading-[1.65] text-ink-soft">
                <p>
                  {site.company} is led by {site.name}, a software engineer in Abuja, Nigeria, with
                  five years building for the web and mobile. Most of the work is in{" "}
                  <strong className="font-semibold text-ink">fintech and digital media</strong>:
                  wallets that move money, platforms that pay creators, cooperatives that lend to
                  their members.
                </p>
                <p>
                  When a business is drowning in repetitive admin, we build the automation that does
                  it instead. Every project is written up in plain language afterwards, so you can
                  see exactly what you paid for and what it changed.
                </p>
              </div>

              <div className="mt-9 max-w-[640px]">
                <p className="font-mono mb-2 text-[11.5px] tracking-[0.1em] text-ink-soft uppercase">
                  Where Erhahon has worked
                </p>
                {roles.map((r) => (
                  <div
                    key={r.company}
                    className="grid items-baseline gap-0.5 border-t border-line py-3 last:border-b sm:grid-cols-[170px_1fr_auto] sm:gap-4"
                  >
                    <span className="font-display text-[15px] font-semibold">{r.company}</span>
                    <span className="text-[14.5px] text-ink-soft">{r.title}</span>
                    <span className="font-mono text-[12px] whitespace-nowrap text-ink-soft">
                      {r.dates}
                    </span>
                  </div>
                ))}
              </div>

              <nav
                aria-label="Profiles"
                className="mt-8 flex flex-wrap gap-x-[26px] gap-y-3 text-[15px]"
              >
                <a className="link-grow text-ink" href={site.github} rel="me noopener" target="_blank">
                  GitHub
                </a>
                <a className="link-grow text-ink" href={site.linkedin} rel="me noopener" target="_blank">
                  LinkedIn
                </a>
                <a className="link-grow text-ink" href={site.resumePath} download>
                  Résumé (PDF)
                </a>
              </nav>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
