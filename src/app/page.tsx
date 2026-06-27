import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Stakes } from "@/components/Stakes";
import { PromiseSection } from "@/components/Promise";
import { Methods } from "@/components/Methods";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Consult } from "@/components/Consult";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <PromiseSection />
        <Stakes />
        <Methods />
        <Pricing />
        <About />
        <Consult />
      </main>
      <Footer />
    </>
  );
}
