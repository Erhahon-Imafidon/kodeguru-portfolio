import { roles } from "@/data/roles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function WhereIveWorked() {
  return (
    <section id="experience" className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Where I&apos;ve worked</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="max-w-[860px]">
            {roles.map((r) => (
              <div
                key={r.company}
                className="grid items-baseline gap-0.5 border-t border-line py-4 last:border-b sm:grid-cols-[200px_1fr_auto] sm:gap-5"
              >
                <span className="font-display text-base font-semibold">{r.company}</span>
                <span className="text-[15px] text-ink-soft">{r.title}</span>
                <span className="font-mono text-[12.5px] whitespace-nowrap text-ink-soft">
                  {r.dates}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
