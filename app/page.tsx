import About from "../components/About";
import Awards from "../components/Awards";
import Contact from "../components/Contact";
import Events from "../components/Events";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Impact from "../components/Impact";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Events />
        <Gallery />
        <Impact />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
