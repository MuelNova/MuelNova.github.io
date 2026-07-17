import Backdrop from "@/components/Backdrop";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
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

  return (
    <div ref={rootRef} className="relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:px-4 focus:py-2"
        style={{ background: "var(--cyan)", color: "#0b0713" }}
      >
        跳到主要内容
      </a>

      <Nav />

      {/* 星空首屏（惊艳层）：整站门面，可探索 */}
      <StarField />

      {/* 传统区（信息/无障碍层）：内容与星空同源 */}
      <div className="relative" style={{ background: "var(--bg)" }}>
        <Backdrop />
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
