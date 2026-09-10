import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const items = [
  {
    title: "Web and mobile products",
    body: "The part of a system people see and touch — the site, the app, the screens where someone signs in, uploads, plays or checks a balance. I take it from design to something live and maintained, on the web and on iOS and Android.",
  },
  {
    title: "Payments and identity",
    body: "Anything to do with money or proving who someone is: card payments, bank transfers, withdrawals, wallets, identity verification. Mistakes here are expensive, so this work gets built carefully and defensively.",
  },
  {
    title: "Business automation",
    body: "Connecting the tools a company already pays for so routine work happens by itself. An enquiry gets captured, sorted and assigned. An invoice arriving by email gets read and filed. Nobody has to remember to do it.",
  },
];

export function WhatIDo() {
  return (
    <section id="services" className="border-y border-line bg-bg-2 py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>What I do</SectionTitle>
        </Reveal>
        <div className="grid gap-[30px] md:grid-cols-3 md:gap-[34px]">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="border-t-2 border-line pt-5 transition-colors duration-400 hover:border-teal">
                <h3 className="font-display mb-[9px] text-[19px] font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="text-[15.5px] leading-[1.62] text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
