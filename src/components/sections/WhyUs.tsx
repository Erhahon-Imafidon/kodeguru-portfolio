import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const points = [
  {
    title: "We start with the problem",
    body: "Before any code, we learn how your business actually runs: where staff repeat the same task, where customers drop off, where fees eat the margin.",
  },
  {
    title: "We explain it plainly",
    body: "You get a written plan in everyday language: what we will build, why, and what you should expect to gain. No jargon you have to take on trust.",
  },
  {
    title: "We measure the result",
    body: "Outages, page speed, hours saved, sales recovered. We report what changed with real numbers where we can get them, and say so where we cannot.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Why Kodeguru</SectionTitle>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(28px,4.2vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]">
              Anyone can generate code now.{" "}
              <span className="grad-text">Knowing what to build is the hard part.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-[18px] text-[16.5px] text-ink-soft">
              <p>
                AI tools can write an app in an afternoon. They do not know your customers, how money
                moves through your business, or which repetitive task is quietly costing you the most.
                That is why so much AI-built software looks finished and still does not help.
              </p>
              <p>
                We use AI to build faster, and an engineer stays accountable for every line. Our job
                is to point that speed at the right problem, and make sure the result survives real
                customers, real payments and real traffic.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-[30px] md:grid-cols-3 md:gap-[34px]">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <article className="border-t-2 border-line pt-5 transition-colors duration-400 hover:border-teal">
                <h3 className="font-display mb-[9px] text-[19px] font-semibold tracking-[-0.015em]">
                  {p.title}
                </h3>
                <p className="text-[15.5px] leading-[1.62] text-ink-soft">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
