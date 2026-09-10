import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhereIveWorked } from "@/components/sections/WhereIveWorked";
import { HowIWork } from "@/components/sections/HowIWork";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <WhatIDo />
        <SelectedWork />
        <WhereIveWorked />
        <HowIWork />
      </main>
      <Footer />
    </>
  );
}
