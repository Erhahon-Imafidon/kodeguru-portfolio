import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { HowIWork } from "@/components/sections/HowIWork";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <NavBar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <CaseStudies />
        <Process />
        <About />
        <SelectedWork />
        <HowIWork />
      </main>
      <Footer />
    </>
  );
}
