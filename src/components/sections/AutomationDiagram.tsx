"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/ui/Reveal";

const STEPS = ["Capture", "Validate", "De-duplicate", "Score", "Notify"] as const;

type Orientation = "horizontal" | "vertical";

function layout(orientation: Orientation) {
  const gap = orientation === "horizontal" ? 150 : 84;
  const pad = orientation === "horizontal" ? 60 : 40;
  const pts = STEPS.map((_, i) =>
    orientation === "horizontal" ? { x: pad + i * gap, y: 40 } : { x: 40, y: pad + i * gap },
  );
  const width = orientation === "horizontal" ? pad * 2 + gap * (STEPS.length - 1) : 260;
  const height = orientation === "horizontal" ? 96 : pad * 2 + gap * (STEPS.length - 1);
  return { pts, width, height };
}

function Diagram({ orientation }: { orientation: Orientation }) {
  const reduce = useReducedMotion();
  const { pts, width, height } = layout(orientation);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const gradId = `auto-grad-${orientation}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Lead capture workflow: capture, validate, de-duplicate, score, notify"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2B6CB0" />
          <stop offset="100%" stopColor="#1F9AA6" />
        </linearGradient>
      </defs>

      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeOpacity={0.8}
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      {!reduce && (
        <motion.circle
          r={4}
          fill="#6FC7CF"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 1.6 }}
          style={{ offsetPath: `path("${path}")` }}
        />
      )}

      {pts.map((p, i) => (
        <g key={STEPS[i]}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            fill={i % 2 === 0 ? "#2B6CB0" : "#1F9AA6"}
            initial={reduce ? false : { r: 0, opacity: 0 }}
            whileInView={{ r: 7, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.22 }}
          />
          <motion.text
            x={orientation === "horizontal" ? p.x : p.x + 22}
            y={orientation === "horizontal" ? p.y + 30 : p.y + 5}
            textAnchor={orientation === "horizontal" ? "middle" : "start"}
            fill="#8FA5B5"
            fontSize={orientation === "horizontal" ? 13 : 15}
            fontFamily="var(--font-body)"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.22 }}
          >
            {STEPS[i]}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

export function AutomationDiagram() {
  return (
    <figure className="mb-[22px] overflow-hidden rounded-[10px] border border-line bg-bg-2 shadow-[0_12px_30px_-18px_rgba(0,0,0,.6)]">
      <div className="px-4 pt-3 md:px-6 md:pt-2">
        <div className="hidden md:block">
          <Diagram orientation="horizontal" />
        </div>
        <div className="mx-auto max-w-[260px] md:hidden">
          <Diagram orientation="vertical" />
        </div>
      </div>
      <figcaption className="border-t border-line bg-bg px-[15px] py-[10px] text-[13px] text-ink-soft">
        Lead capture and routing — every enquiry validated, de-duplicated, scored and pushed to the
        team automatically
      </figcaption>
    </figure>
  );
}
