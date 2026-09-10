import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const btn =
  "font-display inline-block rounded-full px-[26px] py-[13px] text-[15px] font-semibold transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5";

export function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <Reveal>
          <div className="grad-bg mt-21 mb-5 rounded-2xl p-[clamp(38px,6vw,60px)] text-white">
            <h2 className="font-display mb-4 text-[clamp(28px,4.6vw,40px)] leading-[1.1] font-bold tracking-[-0.03em]">
              Let&apos;s build something
            </h2>
            <p className="mb-[30px] max-w-[52ch] text-white/88">
              Available for contract and full-time work, remote or based in Nigeria. If you have
              something that needs building — or something manual that shouldn&apos;t be — send me a
              note.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${site.email}`}
                className={`${btn} bg-white text-navy hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,.45)]`}
              >
                Email me
              </a>
              <a
                href={site.resumePath}
                download
                className={`${btn} border-[1.5px] border-white/55 text-white hover:bg-white/12`}
              >
                Download résumé
              </a>
            </div>
          </div>
        </Reveal>
        <p className="pb-18 text-[13.5px] text-ink-soft">
          {site.name} · {site.company} · {site.location}
        </p>
      </div>
    </footer>
  );
}
