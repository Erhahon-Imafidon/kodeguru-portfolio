import { toolkit } from "@/data/toolkit";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function HowIWork() {
  return (
    <section id="practice" className="py-21">
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
                <span className="font-display text-sm font-semibold text-teal-soft">
                  {row.label}
                </span>
                <span className="text-[14.5px] leading-[1.7] text-ink-soft">{row.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
