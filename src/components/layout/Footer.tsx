import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <Reveal>
          <div className="grad-bg relative mt-21 mb-5 rounded-2xl p-[clamp(28px,5vw,56px)] text-white">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <div>
                <h2 className="font-display mb-4 text-[clamp(28px,4.6vw,40px)] leading-[1.1] font-bold tracking-[-0.03em]">
                  Let&apos;s build something
                </h2>
                <p className="mb-7 max-w-[44ch] text-white/88">
                  Available for contract and full-time work, remote or based in Nigeria. If you
                  have something that needs building — or something manual that shouldn&apos;t be —
                  send me a note.
                </p>
                <a
                  href={site.resumePath}
                  download
                  className="font-display inline-block rounded-full border-[1.5px] border-white/55 px-6.5 py-3.25 md:mt-12 text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Download résumé
                </a>
                {/* <p className="mt-6 text-[14px] text-white/75">
                  Prefer your own mail app?{" "}
                  <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">
                    {site.email}
                  </a>
                </p> */}
              </div>
              <ContactForm />
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
