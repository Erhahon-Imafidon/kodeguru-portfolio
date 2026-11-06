import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Service = {
  title: string;
  body: string;
  example?: { label: string; href: string };
};

const services: Service[] = [
  {
    title: "Websites and web apps",
    body: "Sites and platforms that load fast on mobile data, can be found on Google, and stay online when traffic spikes.",
    example: { label: "CREAM: outages from weekly to none", href: "/work/cream" },
  },
  {
    title: "Payments and fintech",
    body: "Card, bank transfer, direct debit, airtime and wallets, with identity checks built in. Money handled carefully, every naira recorded.",
    example: { label: "CREAM: direct payments that keep more of each sale", href: "/work/cream" },
  },
  {
    title: "Business automation",
    body: "The repetitive admin done for you: order updates, follow-ups, invoices, lead routing. Your team keeps the judgement, the software does the typing.",
    example: { label: "Kreditek: monthly savings that collect themselves", href: "/work/kreditek" },
  },
  {
    title: "Custom plugins and integrations",
    body: "When nothing off the shelf fits, we build exactly what you need: WordPress plugins, payment webhooks, and connections between the tools you already pay for.",
    example: { label: "The Immigrant Stories: a book that cannot be passed around", href: "/work/the-immigrant-stories" },
  },
  {
    title: "Mobile apps",
    body: "iOS and Android apps with push notifications and in-app payments, released to both app stores.",
    example: { label: "CREAM Games on iOS and Android", href: "#projects" },
  },
  {
    title: "Speed and reliability tune-ups",
    body: "Already have a product? We measure it, fix what slows it down or keeps it from working for everyone, and show you the before and after.",
    example: { label: "CREAM: 90% less data to open a song page", href: "/work/cream" },
  },
];

export function Services() {
  return (
    <section id="services" className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>What we build</SectionTitle>
        </Reveal>
        <Reveal>
          <p className="mb-12 max-w-[60ch] text-[clamp(18px,2.4vw,22px)] leading-[1.45] text-ink">
            Pick one, or let us combine them. Each piece is built to fit the rest of your business,
            not bolted on afterwards.
          </p>
        </Reveal>
        <div className="grid gap-x-10 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.06}>
              <article className="group grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 border-t border-line py-7">
                <span className="font-mono pt-[3px] text-[13px] text-teal-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display mb-2 text-[20px] font-semibold tracking-[-0.015em]">
                    {s.title}
                  </h3>
                  <p className="mb-3 text-[15.5px] leading-[1.62] text-ink-soft">{s.body}</p>
                  {s.example && (
                    <Link
                      href={s.example.href}
                      className="link-grow text-[14px] font-medium text-teal-soft"
                    >
                      {s.example.label} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
