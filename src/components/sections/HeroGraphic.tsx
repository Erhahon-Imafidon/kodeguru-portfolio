"use client";

import {
  animate,
  motion,
  motionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/components/ui/Reveal";

type Tone = "navy" | "teal";
type NodeDef = { x: number; y: number; r: number; tone: Tone; faint?: boolean };

const NODES: NodeDef[] = [
  { x: 250, y: 200, r: 9, tone: "navy" },
  { x: 150, y: 95, r: 6, tone: "navy" },
  { x: 250, y: 60, r: 5, tone: "navy" },
  { x: 70, y: 150, r: 5, tone: "teal" },
  { x: 120, y: 250, r: 5, tone: "navy" },
  { x: 90, y: 350, r: 4, tone: "teal" },
  { x: 200, y: 320, r: 9, tone: "teal" },
  { x: 350, y: 240, r: 5, tone: "navy" },
  { x: 370, y: 130, r: 5, tone: "teal" },
  { x: 330, y: 340, r: 6, tone: "navy" },
  { x: 290, y: 420, r: 4, tone: "teal" },
  { x: 450, y: 60, r: 4, tone: "teal", faint: true },
  { x: 480, y: 220, r: 7, tone: "teal", faint: true },
  { x: 440, y: 330, r: 4, tone: "teal", faint: true },
  { x: 500, y: 400, r: 3, tone: "teal", faint: true },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 6], [0, 7], [0, 8],
  [1, 2], [1, 3], [4, 5], [4, 6], [6, 5], [6, 9], [7, 9], [7, 12],
  [8, 11], [8, 12], [9, 10], [9, 13], [12, 13], [13, 14], [10, 13],
];

const FILL: Record<Tone, string> = { navy: "#2B6CB0", teal: "#1F9AA6" };

type NodeMV = { x: MotionValue<number>; y: MotionValue<number> };

export function HeroGraphic() {
  const reduce = useReducedMotion();
  const [mvs] = useState<NodeMV[]>(() =>
    NODES.map((n) => ({ x: motionValue(n.x), y: motionValue(n.y) })),
  );

  useEffect(() => {
    if (reduce) return;
    const controls = mvs.flatMap((mv, i) => {
      const n = NODES[i];
      const dx = 3 + (i % 3) * 2;
      const dy = 4 + ((i + 1) % 3) * 2;
      return [
        animate(mv.x, [n.x - dx, n.x + dx], {
          duration: 7 + (i % 4),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: -i * 0.6,
        }),
        animate(mv.y, [n.y + dy, n.y - dy], {
          duration: 8 + ((i + 2) % 4),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: -i * 0.4,
        }),
      ];
    });
    return () => controls.forEach((c) => c.stop());
  }, [mvs, reduce]);

  return (
    <svg
      viewBox="0 0 520 440"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract network of connected nodes"
    >
      <defs>
        <linearGradient id="hero-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="520" y2="440">
          <stop offset="0%" stopColor="#2B6CB0" />
          <stop offset="100%" stopColor="#1F9AA6" />
        </linearGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const faint = NODES[a].faint || NODES[b].faint;
        return (
          <motion.line
            key={i}
            x1={mvs[a].x}
            y1={mvs[a].y}
            x2={mvs[b].x}
            y2={mvs[b].y}
            stroke="url(#hero-grad)"
            strokeWidth={faint ? 1 : 1.4}
            strokeOpacity={faint ? 0.35 : 0.8}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.05 }}
          />
        );
      })}

      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={mvs[i].x}
          cy={mvs[i].y}
          fill={FILL[n.tone]}
          fillOpacity={n.faint ? 0.45 : 1}
          initial={reduce ? false : { r: 0, opacity: 0 }}
          animate={{ r: n.r, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
