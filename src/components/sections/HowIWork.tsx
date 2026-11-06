import { toolkit } from "@/data/toolkit";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function HowIWork() {
  return (
    <section id="practice" className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>How we work</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="max-w-[66ch] space-y-[18px]">
            <p>
              Every project starts with how your business makes money, and where it is losing time,
              customers or margin. The technology is chosen to serve that, never the other way
              round.
            </p>
            <p>
              You deal with one accountable person from the first call to launch. You get clear
              updates in plain language, working pieces you can try as we go, and a finished product
              that does what we agreed. The engineering is our responsibility, so you can stay
              focused on running your business.
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
