import Hero from "@/components/public/hero";
import Nav from "@/components/public/nav";
import Pricing from "@/components/public/pricing";
import Footer from "@/components/public/footer/footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <>
      <BackgroundBeams />
      <header className="">
        <Nav />
      </header>
      <main>
        <Hero />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
