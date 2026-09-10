"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE } from "./Reveal";

type Props = { label: string; children: ReactNode };

export function Accordion({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div
      className={`overflow-hidden rounded-[10px] border bg-bg-2 transition-colors duration-300 ${
        open ? "border-teal/40" : "border-line"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="font-display flex w-full cursor-pointer items-center gap-2.5 px-[18px] py-[15px] text-left text-[14.5px] font-medium text-ink-soft transition-colors duration-200 hover:bg-bg-3 hover:text-ink"
      >
        <motion.svg
          className="h-[15px] w-[15px] shrink-0 text-teal"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </motion.svg>
        {label}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-line-soft px-[18px] pt-1 pb-[22px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
