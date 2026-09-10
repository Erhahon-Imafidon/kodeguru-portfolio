"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/data/site";
import { EASE } from "@/components/ui/Reveal";

export function NavBar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const heroHeight = document.getElementById("hero")?.offsetHeight ?? 600;
    setShow(y > heroHeight - 80);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="grad-bg fixed top-0 left-0 z-60 h-[2px] w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md"
        initial={false}
        animate={{ y: show ? 0 : "-100%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="wrap flex h-[60px] items-center justify-between gap-4">
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">
            {site.name}{" "}
            <span className="hidden font-medium text-ink-soft sm:inline">— {site.role}</span>
          </span>
          <a
            href="#contact"
            className="text-[14.5px] font-medium text-teal-soft transition-colors hover:text-ink"
          >
            Get in touch
          </a>
        </div>
      </motion.div>
    </>
  );
}
