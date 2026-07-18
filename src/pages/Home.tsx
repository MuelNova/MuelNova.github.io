import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SkyDust from "@/components/SkyDust";
import { chrome } from "@/data/content";
import { useDeckPaging } from "@/hooks/useDeckPaging";
import { useRevealAll } from "@/hooks/useInView";
import About from "@/sections/About";
import CliSection from "@/sections/CliSection";
import Contact from "@/sections/Contact";
import Journey from "@/sections/Journey";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import StarField from "@/sections/StarField";

export default function Home() {
  const rootRef = useRevealAll<HTMLDivElement>();
  useDeckPaging();

  return (
    <div ref={rootRef} className="relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:px-4 focus:py-2"
        style={{ background: "var(--cyan)", color: "#0b0713" }}
      >
        {chrome.skipToContent}
      </a>
      <Nav />
      {/* 星空首屏（惊艳层）：整站门面，可探索 */}
      <StarField />
      {/* 下半页：同一片天往深处走——星尘视差 + 极光余晖承托内容 */}
      <div className="relative" style={{ background: "var(--bg)" }}>
        <SkyDust />
        <main className="relative z-10">
          <About />
          <Journey />
          <Projects />
          <Skills />
          <CliSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
