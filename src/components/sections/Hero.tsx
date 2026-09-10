"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { EASE } from "@/components/ui/Reveal";
import { HeroGraphic } from "./HeroGraphic";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="hero" className="relative overflow-hidden pt-28 pb-20">
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
        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-11 flex items-center gap-[11px]"
        >
          <Image
            src="/kodeguru-mark.png"
            alt="Kodeguru Tech Solutions"
            width={57}
            height={38}
            className="h-[38px] w-auto"
            priority
          />
          <span className="font-display text-[13.5px] font-medium text-ink-soft">
            {site.company}
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14">
          <div>
            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display mb-[22px] text-[clamp(44px,8vw,78px)] leading-[0.98] font-bold tracking-[-0.04em]"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="grad-text font-display mb-[30px] max-w-[19ch] text-[clamp(20px,3.2vw,30px)] leading-[1.28] font-semibold tracking-[-0.02em]"
            >
              I build the products people use, and the systems that run the business behind them.
            </motion.p>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-[66ch] text-[clamp(17px,2.1vw,19.5px)] leading-[1.62] text-ink-soft"
            >
              Software engineer based in Abuja, Nigeria, with five years building for the web and
              mobile. Most of my work is in{" "}
              <strong className="font-semibold text-ink">fintech and digital media</strong> — wallets
              that move money, platforms that pay creators, cooperatives that lend to their members.
              When a business is drowning in repetitive admin, I build the automation that does it
              instead.
            </motion.p>

            <motion.nav
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              aria-label="Contact"
              className="mt-[38px] flex flex-wrap gap-x-[26px] gap-y-3 text-[15px]"
            >
              <a className="link-grow text-ink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <a className="link-grow text-ink" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
              <a
                className="link-grow text-ink"
                href={site.github}
                rel="me noopener"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="link-grow text-ink"
                href={site.linkedin}
                rel="me noopener"
                target="_blank"
              >
                LinkedIn
              </a>
              <a className="link-grow text-ink" href={site.resumePath} download>
                Résumé (PDF)
              </a>
            </motion.nav>
          </div>

          <motion.figure
            variants={rise}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto w-full max-w-[420px] lg:max-w-none"
          >
            <HeroGraphic />
          </motion.figure>
        </div>
      </motion.div>
    </header>
  );
}
