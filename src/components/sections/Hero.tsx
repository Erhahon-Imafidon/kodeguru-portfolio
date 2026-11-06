"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/Reveal";
import { HeroGraphic } from "./HeroGraphic";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const facts = [
  { label: "Clients", value: "Nigeria · United Kingdom · worldwide" },
  { label: "Experience", value: "5 years on web and mobile" },
  { label: "Industries", value: "Fintech, media, real estate and publishing" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="hero" className="relative overflow-hidden pt-[124px] pb-20 lg:pt-[140px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[280px] -right-[200px] h-[640px] w-[640px] rounded-full blur-[18px]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(31,154,166,.22), rgba(18,69,127,.16) 45%, transparent 70%)",
        }}
      />

      <motion.div
        className="wrap relative"
        initial={reduce ? "show" : "hidden"}
        animate="show"
        transition={{ staggerChildren: 0.09 }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-14">
          <div>
            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono mb-6 text-[12.5px] tracking-[0.12em] text-teal-soft uppercase"
            >
              Software &amp; automation studio · Abuja, Nigeria
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display mb-[26px] text-[clamp(38px,5.4vw,58px)] leading-[1.04] font-bold tracking-[-0.035em]"
            >
              Software that does the work, <span className="grad-text">so your business can grow</span>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-[58ch] text-[clamp(17px,2.1vw,19.5px)] leading-[1.62] text-ink-soft"
            >
              Kodeguru Tech Solutions builds websites, mobile apps, payments and automation for
              businesses in Nigeria and abroad. We find the work your team repeats every day, the
              sales slipping away and the fees eating your margin, then build the software that
              fixes it, and explain every step in plain language.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-[34px] flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="font-display grad-bg inline-flex items-center gap-2 rounded-full px-[26px] py-[13px] text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a conversation <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="#case-studies"
                className="font-display inline-flex items-center rounded-full border-[1.5px] border-line px-[26px] py-[13px] text-[15px] font-semibold text-ink transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-teal"
              >
                See client results
              </a>
            </motion.div>

            <motion.dl
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-11 grid gap-5 border-t border-line pt-6 sm:grid-cols-3"
            >
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono mb-1 text-[11.5px] tracking-[0.1em] text-ink-soft uppercase">
                    {f.label}
                  </dt>
                  <dd className="text-[14.5px] leading-[1.45] text-ink">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.figure
            variants={rise}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[14%] -top-[12%] -bottom-[8%] opacity-45"
            >
              <HeroGraphic />
            </div>

            {/* Photo by @disruptxn on Unsplash (unsplash.com/photos/kwzWjTnDPLk), Unsplash License. */}
            <div className="relative aspect-square overflow-hidden rounded-[26px] p-px grad-bg shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
              <div className="relative h-full w-full overflow-hidden rounded-[25px] bg-bg-2">
                <Image
                  src="/hero-team.jpg"
                  alt="Two engineers reviewing code together on a laptop"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 520px, 90vw"
                  className="object-cover object-[88%_center]"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,22,.05)_40%,rgba(7,13,22,.6)_100%)]"
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </motion.div>
    </header>
  );
}
