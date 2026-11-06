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
                  Have something that needs building?
                </h2>
                <p className="mb-4 max-w-[44ch] text-white/88">
                  Tell us where your business is losing time or money. We will tell you plainly what
                  technology can fix, what it will cost, and what you should expect to gain.
                </p>
                <p className="mb-7 max-w-[44ch] text-[15px] text-white/75">
                  {site.name} is also open to contract and full-time engineering roles, remote or
                  based in Nigeria.
                </p>
                <dl className="grid gap-x-6 gap-y-3 text-[14px] sm:grid-cols-2">
                  {site.phones.map((p) => (
                    <div key={p.href}>
                      <dt className="font-mono text-[11px] tracking-[0.1em] text-white/65 uppercase">
                        {p.label}
                      </dt>
                      <dd>
                        <a href={p.href} className="text-white underline-offset-4 hover:underline">
                          {p.display}
                        </a>
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.1em] text-white/65 uppercase">
                      Email
                    </dt>
                    <dd>
                      <a href={`mailto:${site.email}`} className="text-white underline-offset-4 hover:underline">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
                <a
                  href={site.resumePath}
                  download
                  className="font-display mt-8 inline-block rounded-full border-[1.5px] border-white/55 px-6.5 py-3.25 text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/12"
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
              {/* self-start keeps the form's grid rows from stretching to the taller left column */}
              <div className="self-start">
                <ContactForm />
              </div>
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
