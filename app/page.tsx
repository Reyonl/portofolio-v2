import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import TerminalShowcase from "@/sections/TerminalShowcase";
import Skills from "@/sections/Skills";
import Journey from "@/sections/Journey";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <SmoothScroll />
      <Cursor />
      <Hero />
      <Projects />
      <TerminalShowcase />
      <Skills />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
