import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectEntry } from "./ProjectEntry";

export function SelectedWork() {
  return (
    <section id="projects" className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Engineering portfolio</SectionTitle>
        </Reveal>
        <Reveal>
          <p className="mb-10 max-w-[62ch] text-[16.5px] text-ink-soft">
            For technical readers: the products Erhahon has built and led, with the engineering
            detail behind each one under &ldquo;Under the hood&rdquo;.
          </p>
        </Reveal>
        <div>
          {projects.map((p) => (
            <Reveal
              key={p.slug}
              className="border-t border-line first:border-t-0 [&:first-child>article]:pt-0"
            >
              <ProjectEntry project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
