import type { Project } from "@/data/projects";
import { Accordion } from "@/components/ui/Accordion";
import { InlineCode } from "@/components/ui/InlineCode";
import { AutomationDiagram } from "./AutomationDiagram";

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="py-[42px]">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-[clamp(23px,3.2vw,29px)] font-semibold tracking-[-0.025em]">
          {project.title}
        </h3>
        <span className="text-[15px] text-ink-soft">{project.kind}</span>
      </div>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener"
          className="font-mono mb-4 inline-block text-[14.5px] text-teal transition-colors hover:text-teal-soft"
        >
          {project.hrefLabel ?? project.href}
        </a>
      ) : (
        <div className="h-[14px]" />
      )}

      <p className="mb-[22px] max-w-[66ch]">{project.summary}</p>

      {project.visual === "automation" && <AutomationDiagram />}

      <Accordion label="Under the hood">
        <ul className="mt-4">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="bullet-dot relative mb-[11px] pl-[19px] text-[15px] leading-[1.62]"
            >
              <InlineCode text={b} />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-[7px]">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono rounded-full border border-line bg-bg-3 px-[11px] py-1 text-xs text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
      </Accordion>
    </article>
  );
}
