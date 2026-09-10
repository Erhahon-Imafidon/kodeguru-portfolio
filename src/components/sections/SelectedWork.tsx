import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectEntry } from "./ProjectEntry";

export function SelectedWork() {
  return (
    <section className="py-21">
      <div className="wrap">
        <Reveal>
          <SectionTitle>Selected work</SectionTitle>
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
