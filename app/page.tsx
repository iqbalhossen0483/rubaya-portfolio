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
import {
  getAboutData,
  getAwardData,
  getContactData,
  getEventData,
  getExperienceData,
  getGalleryData,
  getHeroData,
  getImpactData,
  getSettings,
} from "../lib/directDatabaseAccess";

export const revalidate = 0;

export default async function Home() {
  const [
    heroData,
    aboutData,
    experienceData,
    eventData,
    galleryData,
    impactData,
    awardData,
    contactData,
    settings,
  ] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getExperienceData(),
    getEventData(),
    getGalleryData(),
    getImpactData(),
    getAwardData(),
    getContactData(),
    getSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero heroData={heroData.data} />
        <About aboutData={aboutData.data} />
        <Experience experienceData={experienceData} />
        <Events eventData={eventData} settings={settings.data} />
        <Gallery galleryData={galleryData} />
        <Impact impactData={impactData} settings={settings.data} />
        <Awards awardData={awardData} />
        <Contact contactData={contactData.data} settings={settings.data} />
      </main>
      <Footer />
    </>
  );
}
