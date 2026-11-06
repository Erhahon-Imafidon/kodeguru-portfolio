"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/data/site";

// Links use "/#id" so they work from the case-study pages as well as the home page.
const links = [
  { href: "/#services", label: "Services" },
  { href: "/#case-studies", label: "Case studies" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
];

export function NavBar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="grad-bg fixed top-0 left-0 z-60 h-[2px] w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div
        className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Main" className="wrap flex h-[64px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-[10px]" aria-label={`${site.company} home`}>
            <Image
              src="/kodeguru-mark.png"
              alt=""
              width={45}
              height={30}
              className="h-[30px] w-auto"
              priority
            />
            <span className="font-display hidden text-[15px] font-semibold tracking-[-0.01em] sm:inline">
              {site.company}
            </span>
          </Link>

          <ul className="hidden items-center gap-7 text-[14.5px] text-ink-soft md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-grow transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="font-display rounded-full bg-ink px-[18px] py-[9px] text-[14px] font-semibold text-bg transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-teal-soft"
          >
            Start a conversation
          </Link>
        </nav>
      </div>
    </>
  );
}
