import Hero from "@/components/hero";
import Nav from "@/components/nav";
import PricingSection from "@/components/pricing";
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
        <PricingSection />
      </main>
    </>
  );
}
