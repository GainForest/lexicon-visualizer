import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import StatsBar from "@/components/StatsBar";
import NewLexicons from "@/components/NewLexicons";
import LexiconExplorer from "@/components/LexiconExplorer";
import BeforeAfter from "@/components/BeforeAfter";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Overview />
        <StatsBar />
        <NewLexicons />
        <LexiconExplorer />
        <BeforeAfter />
        <Footer />
      </main>
    </>
  );
}
