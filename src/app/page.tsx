import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Stakes } from "@/components/Stakes";
import { Promise } from "@/components/Promise";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Stakes />
        <Promise />
        {/* sections added in Tasks 5-7 */}
      </main>
      <Footer />
    </>
  );
}
