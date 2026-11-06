import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = [
  {
    name: "Understand",
    when: "First conversation",
    body: "We talk to you and the people doing the work, and look at how things run today. The goal is to find where time and money are actually being lost.",
  },
  {
    name: "Plan",
    when: "Before we build",
    body: "A written plan in plain words: what we will build, what it will cost, and what you should expect to gain, agreed before any work starts.",
  },
  {
    name: "Build",
    when: "In small steps",
    body: "You see and test working pieces as they are ready, and we adjust as we learn. The Immigrant Stories' book plugin took five rounds to get exactly right.",
  },
  {
    name: "Improve",
    when: "After launch",
    body: "We measure what changed, fix what slows you down, and hand over clear notes so your business is never stuck waiting on us.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>How a project runs</SectionTitle>
        </Reveal>
        <Reveal>
          <h2 className="font-display mb-12 max-w-[24ch] text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]">
            Understand, plan, build, improve. <span className="grad-text">Every time.</span>
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07} className="h-full">
              <article className="h-full rounded-2xl border border-line bg-bg-2 p-6">
                <p className="font-mono mb-5 text-[12px] text-teal-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mb-1 text-[21px] font-semibold tracking-[-0.02em]">
                  {s.name}
                </h3>
                <p className="font-mono mb-3 text-[11.5px] tracking-[0.08em] text-ink-soft uppercase">
                  {s.when}
                </p>
                <p className="text-[15px] leading-[1.6] text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
