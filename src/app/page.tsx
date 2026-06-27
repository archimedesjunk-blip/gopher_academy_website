import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Stakes } from "@/components/Stakes";
import { PromiseSection } from "@/components/Promise";
import { Methods } from "@/components/Methods";
import { Pricing } from "@/components/Pricing";
import { Proof } from "@/components/Proof";
import { About } from "@/components/About";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Stakes />
        <PromiseSection />
        <Methods />
        <Pricing />
        <Proof />
        <About />
      </main>
      <Footer />
    </>
  );
}
